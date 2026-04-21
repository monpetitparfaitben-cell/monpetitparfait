import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

interface ImportRow {
  email: string;
  prenom: string;
  nom: string;
  entreprise: string;
  telephone: string;
  prices: Record<string, number>;
}

export async function POST(req: NextRequest) {
  try {
    const { rows } = await req.json() as { rows: ImportRow[] };

    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: "Aucune ligne à importer" }, { status: 400 });
    }

    const adminSupabase = createSupabaseAdmin();
    const errors: string[] = [];
    let successCount = 0;

    // Créer une map SKU → variant_id et product_id
    const skuMap: Record<string, { variantId: string; productId: string }> = {};
    for (const product of PRODUCTS) {
      for (const variant of product.variants) {
        skuMap[variant.sku] = {
          variantId: variant.id,
          productId: product.id,
        };
      }
    }

    // Traiter chaque ligne
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      try {
        // 1. Créer ou récupérer le profil utilisateur
        let userId: string | null = null;

        // Chercher si l'email existe déjà
        const { data: existingProfile } = await adminSupabase
          .from("profiles")
          .select("id")
          .eq("email", row.email)
          .maybeSingle();

        if (existingProfile) {
          userId = existingProfile.id;
        } else {
          // Créer un nouvel utilisateur Supabase Auth
          const { data: authData, error: authError } = await adminSupabase.auth.admin.inviteUserByEmail(
            row.email,
            {
              data: {
                first_name: row.prenom,
                last_name: row.nom,
              },
            }
          );

          if (authError || !authData.user?.id) {
            throw new Error(`Erreur création compte: ${authError?.message || "ID manquant"}`);
          }

          userId = authData.user.id;

          // Créer le profil
          const { error: profileError } = await adminSupabase.from("profiles").insert({
            id: userId,
            email: row.email,
            first_name: row.prenom,
            last_name: row.nom,
            company: row.entreprise,
            phone: row.telephone,
            account_status: "pending",
          });

          if (profileError) {
            throw new Error(`Erreur création profil: ${profileError.message}`);
          }
        }

        // 2. Créer ou mettre à jour le profil si existant
        const { error: updateError } = await adminSupabase
          .from("profiles")
          .update({
            first_name: row.prenom,
            last_name: row.nom,
            company: row.entreprise,
            phone: row.telephone,
          })
          .eq("id", userId);

        if (updateError) {
          throw new Error(`Erreur mise à jour profil: ${updateError.message}`);
        }

        // 3. Créer un contrat
        const { data: contract, error: contractError } = await adminSupabase
          .from("contracts")
          .insert({
            user_id: userId,
            name: `Contrat ${row.entreprise}`,
            is_active: true,
          })
          .select("id")
          .single();

        if (contractError || !contract?.id) {
          throw new Error(`Erreur création contrat: ${contractError?.message || "ID manquant"}`);
        }

        // 4. Insérer les prix contractuels
        const priceInserts = [];
        for (const [sku, price] of Object.entries(row.prices)) {
          if (!skuMap[sku]) {
            // Ignorer les SKU inconnus silencieusement
            continue;
          }

          const { variantId, productId } = skuMap[sku];
          // Convertir euros en centimes
          const priceInCents = Math.round(price * 100);

          priceInserts.push({
            contract_id: contract.id,
            variant_id: variantId,
            product_id: productId,
            custom_price: priceInCents,
          });
        }

        if (priceInserts.length > 0) {
          const { error: pricesError } = await adminSupabase
            .from("contract_prices")
            .insert(priceInserts);

          if (pricesError) {
            throw new Error(`Erreur insertion prix: ${pricesError.message}`);
          }
        }

        successCount++;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Erreur inconnue";
        errors.push(`Ligne ${i + 1} (${row.email}): ${message}`);
      }
    }

    return NextResponse.json({
      success: successCount,
      errors,
    });
  } catch (err: unknown) {
    console.error("Erreur import:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Erreur serveur" },
      { status: 500 }
    );
  }
}
