"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import {
  createSupabaseBrowserClient,
  DBProfile,
  DBContract,
  ContractPriceMap,
} from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: DBProfile | null;
  contract: DBContract | null;
  contractPrices: ContractPriceMap; // variantId → prix en centimes
  loading: boolean;
  isAdmin: boolean;
  isApproved: boolean;

  // Prix résolu pour une variante (retourne contractuel ou null)
  getContractPrice: (variantId: string) => number | null;

  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (data: SignUpData) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company: string;
  phone?: string;
  address?: string;
  address2?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  siret?: string;
  typeEtablissement?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = createSupabaseBrowserClient();

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<DBProfile | null>(null);
  const [contract, setContract] = useState<DBContract | null>(null);
  const [contractPrices, setContractPrices] = useState<ContractPriceMap>({});
  const [loading, setLoading] = useState(true);

  // Charger le profil + contrat + prix
  const loadUserData = useCallback(
    async (userId: string) => {
      try {
        // 1. Charger le profil
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (profileData) setProfile(profileData as DBProfile);

        // 2. Charger le contrat actif
        const today = new Date().toISOString().split("T")[0];
        const { data: contractData } = await supabase
          .from("contracts")
          .select("*")
          .eq("user_id", userId)
          .eq("is_active", true)
          .or(`valid_to.is.null,valid_to.gte.${today}`)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (contractData) {
          setContract(contractData as DBContract);

          // 3. Charger les prix contractuels
          const { data: pricesData } = await supabase
            .from("contract_prices")
            .select("variant_id, custom_price")
            .eq("contract_id", contractData.id);

          if (pricesData && pricesData.length > 0) {
            const priceMap: ContractPriceMap = {};
            pricesData.forEach((p: { variant_id: string; custom_price: number }) => {
              priceMap[p.variant_id] = p.custom_price;
            });
            setContractPrices(priceMap);
          }
        }
      } catch (err) {
        console.error("Erreur chargement données utilisateur:", err);
      }
    },
    [supabase]
  );

  // Initialisation et écoute des changements d'auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserData(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        setProfile(null);
        setContract(null);
        setContractPrices({});
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase, loadUserData]);

  // Connexion
  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  // Inscription
  const signUp = async (data: SignUpData) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.firstName,
          last_name: data.lastName,
        },
      },
    });

    if (error) return { error: error.message };

    // Compléter le profil
    if (authData.user) {
      await supabase.from("profiles").upsert({
        id: authData.user.id,
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        company: data.company,
        phone: data.phone || null,
        address: data.address || null,
        address2: data.address2 || null,
        city: data.city || null,
        postal_code: data.postalCode || null,
        country: data.country || "FR",
        siret: data.siret || null,
        type_etablissement: data.typeEtablissement || null,
        account_status: "pending",
      });
    }

    return { error: null };
  };

  // Déconnexion
  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
    setContract(null);
    setContractPrices({});
  };

  // Rafraîchir le profil manuellement
  const refreshProfile = async () => {
    if (user) await loadUserData(user.id);
  };

  // Obtenir le prix contractuel d'une variante
  const getContractPrice = (variantId: string): number | null => {
    return contractPrices[variantId] ?? null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        contract,
        contractPrices,
        loading,
        isAdmin: profile?.is_admin ?? false,
        isApproved: profile?.account_status === "approved",
        getContractPrice,
        signIn,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return ctx;
}
