"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Save, Trash2, CheckCircle } from "lucide-react";
import { createSupabaseBrowserClient, DBProfile, DBContract, DBContractPrice } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { PRODUCTS, formatPrice } from "@/lib/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AdminClientDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { isAdmin, loading } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [client, setClient] = useState<DBProfile | null>(null);
  const [contract, setContract] = useState<DBContract | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({}); // variantId → prix
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Formulaire nouveau contrat
  const [contractName, setContractName] = useState("");
  const [contractValidTo, setContractValidTo] = useState("");
  const [creatingContract, setCreatingContract] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) router.push("/");
  }, [isAdmin, loading, router]);

  useEffect(() => {
    async function loadData() {
      // Charger le profil client
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (profileData) setClient(profileData as DBProfile);

      // Charger le contrat actif
      const { data: contractData } = await supabase
        .from("contracts")
        .select("*")
        .eq("user_id", id)
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (contractData) {
        setContract(contractData as DBContract);

        // Charger les prix existants
        const { data: pricesData } = await supabase
          .from("contract_prices")
          .select("variant_id, custom_price")
          .eq("contract_id", contractData.id);

        if (pricesData) {
          const map: Record<string, number> = {};
          (pricesData as Pick<DBContractPrice, "variant_id" | "custom_price">[]).forEach((p) => {
            map[p.variant_id] = p.custom_price;
          });
          setPrices(map);
        }
      }
      setFetching(false);
    }
    if (isAdmin) loadData();
  }, [isAdmin, id, supabase]);

  const createContract = async () => {
    if (!contractName.trim()) return;
    setCreatingContract(true);

    const { data } = await supabase
      .from("contracts")
      .insert({
        user_id: id,
        name: contractName,
        valid_to: contractValidTo || null,
        is_active: true,
      })
      .select()
      .single();

    if (data) {
      setContract(data as DBContract);
      // Approuver automatiquement le client
      await supabase.from("profiles").update({ account_status: "approved" }).eq("id", id);
      setClient((prev) => prev ? { ...prev, account_status: "approved" } : prev);
    }
    setCreatingContract(false);
  };

  const updatePrice = (variantId: string, value: string) => {
    const numValue = value === "" ? 0 : Math.round(parseFloat(value) * 100);
    if (isNaN(numValue)) return;
    setPrices((prev) => ({ ...prev, [variantId]: numValue }));
  };

  const removePrice = (variantId: string) => {
    setPrices((prev) => {
      const next = { ...prev };
      delete next[variantId];
      return next;
    });
  };

  const savePrices = async () => {
    if (!contract) return;
    setSaving(true);

    // Supprimer tous les prix existants
    await supabase.from("contract_prices").delete().eq("contract_id", contract.id);

    // Réinsérer les prix non nuls
    const entries = Object.entries(prices).filter(([, p]) => p > 0);
    if (entries.length > 0) {
      const product_map: Record<string, string> = {};
      PRODUCTS.forEach((p) => p.variants.forEach((v) => { product_map[v.id] = p.id; }));

      await supabase.from("contract_prices").insert(
        entries.map(([variantId, customPrice]) => ({
          contract_id: contract.id,
          variant_id: variantId,
          product_id: product_map[variantId] ?? "",
          custom_price: customPrice,
        }))
      );
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F7F5F0" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#e67e22" }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/clients" className="inline-flex items-center gap-2 text-sm font-medium mb-6 opacity-60 hover:opacity-100 transition-opacity" style={{ color: "#18223b" }}>
          <ArrowLeft size={16} /> Clients
        </Link>

        {/* Header client */}
        {client && (
          <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "#18223b" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg" style={{ backgroundColor: "#e67e22" }}>
                  {(client.first_name?.[0] ?? client.email[0]).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {client.first_name ? `${client.first_name} ${client.last_name ?? ""}` : client.email}
                  </p>
                  <p className="text-white opacity-60 text-sm">{client.email}</p>
                  {client.company && <p className="text-white opacity-50 text-xs">{client.company}</p>}
                </div>
              </div>
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: client.account_status === "approved" ? "#27ae6030" : "#e67e2230",
                  color: client.account_status === "approved" ? "#27ae60" : "#e67e22",
                }}
              >
                {client.account_status === "approved" ? "✓ Approuvé" : "⏳ En attente"}
              </span>
            </div>
          </div>
        )}

        {/* Créer un contrat si pas de contrat */}
        {!contract && (
          <div className="rounded-2xl p-6 mb-6" style={{ backgroundColor: "white" }}>
            <h2 className="font-bold mb-4" style={{ color: "#18223b" }}>
              <Plus size={16} className="inline mr-2" />
              Créer un contrat
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                  Nom du contrat *
                </label>
                <input
                  value={contractName}
                  onChange={(e) => setContractName(e.target.value)}
                  placeholder="Contrat Hôtel Lumière 2025"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-70" style={{ color: "#18223b" }}>
                  Date d&apos;expiration (optionnel)
                </label>
                <input
                  type="date"
                  value={contractValidTo}
                  onChange={(e) => setContractValidTo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b" }}
                />
              </div>
            </div>
            <button
              onClick={createContract}
              disabled={creatingContract || !contractName.trim()}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: "#e67e22" }}
            >
              {creatingContract ? "Création..." : "Créer le contrat"}
            </button>
          </div>
        )}

        {/* Grille des prix — seulement si contrat existe */}
        {contract && (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-bold text-lg" style={{ color: "#18223b" }}>
                  🤝 {contract.name}
                </h2>
                <p className="text-sm opacity-60" style={{ color: "#18223b" }}>
                  Saisir les prix contractuels (laisser vide = prix catalogue)
                </p>
              </div>
              <button
                onClick={savePrices}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-60"
                style={{ backgroundColor: saved ? "#27ae60" : "#18223b" }}
              >
                {saved ? <><CheckCircle size={15} /> Sauvegardé !</> : saving ? "Sauvegarde..." : <><Save size={15} /> Enregistrer</>}
              </button>
            </div>

            <div className="space-y-4">
              {PRODUCTS.filter((p) => p.is_active).map((product) => (
                <div key={product.id} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "white" }}>
                  <div className="px-6 py-3 border-b flex items-center gap-3" style={{ borderColor: "#F7F5F0", backgroundColor: "#F7F5F0" }}>
                    <span className="text-lg">
                      {product.category === "kits" ? "🎁" : product.category === "ouate" ? "🧻" : "☕"}
                    </span>
                    <p className="font-bold text-sm" style={{ color: "#18223b" }}>{product.name}</p>
                  </div>

                  <div className="divide-y" style={{ borderColor: "#F7F5F0" }}>
                    {product.variants.map((variant) => {
                      const myPrice = prices[variant.id];
                      const hasPrice = myPrice !== undefined && myPrice > 0;

                      return (
                        <div key={variant.id} className="px-6 py-3 flex items-center gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-medium" style={{ color: "#18223b" }}>{variant.name}</p>
                            <p className="text-xs opacity-50" style={{ color: "#18223b" }}>
                              Prix catalogue : {formatPrice(variant.price)}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder={`${(variant.price / 100).toFixed(2)}`}
                                value={hasPrice ? (myPrice / 100).toFixed(2) : ""}
                                onChange={(e) => updatePrice(variant.id, e.target.value)}
                                className="w-28 pl-3 pr-6 py-2 rounded-xl text-sm outline-none text-right"
                                style={{
                                  border: `1.5px solid ${hasPrice ? "#e67e22" : "#ede9e0"}`,
                                  color: "#18223b",
                                  backgroundColor: hasPrice ? "#e67e2208" : "white",
                                }}
                              />
                              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs opacity-40" style={{ color: "#18223b" }}>€</span>
                            </div>

                            {hasPrice && (
                              <button
                                onClick={() => removePrice(variant.id)}
                                className="text-xs opacity-40 hover:opacity-70 transition-opacity"
                                style={{ color: "#e74c3c" }}
                                title="Supprimer ce prix"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}

                            {hasPrice && myPrice < variant.price && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: "#27ae6015", color: "#27ae60" }}>
                                -{Math.round(((variant.price - myPrice) / variant.price) * 100)}%
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={savePrices}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-base font-bold text-white transition-all disabled:opacity-60"
                style={{ backgroundColor: saved ? "#27ae60" : "#18223b" }}
              >
                {saved ? <><CheckCircle size={16} /> Sauvegardé !</> : saving ? "Sauvegarde..." : <><Save size={16} /> Enregistrer tous les prix</>}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
