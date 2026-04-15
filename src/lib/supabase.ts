import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client navigateur (pour les composants client)
export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Client simple (pour les API routes server-side)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin (service role, pour les opérations admin)
export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Types base de données
export interface DBProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  phone: string | null;
  is_admin: boolean;
  account_status: "pending" | "approved" | "suspended";
  created_at: string;
}

export interface DBContract {
  id: string;
  user_id: string;
  name: string;
  valid_from: string | null;
  valid_to: string | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
}

export interface DBContractPrice {
  id: string;
  contract_id: string;
  variant_id: string;
  product_id: string;
  custom_price: number;
}

// Map des prix contractuels : variantId → prix en centimes
export type ContractPriceMap = Record<string, number>;
