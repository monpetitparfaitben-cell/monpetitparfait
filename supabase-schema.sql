-- ============================================================
-- SCHÉMA SUPABASE — Mon Petit Parfait (B2B avec prix sur mesure)
-- Exécuter dans le SQL Editor de Supabase
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE PROFILES (liée à auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  company TEXT,
  phone TEXT,
  is_admin BOOLEAN DEFAULT FALSE,
  -- Statut du compte B2B
  account_status TEXT DEFAULT 'pending' CHECK (account_status IN ('pending', 'approved', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger pour créer le profil automatiquement à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TABLE CONTRACTS (contrats clients B2B)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.contracts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,           -- ex: "Contrat Hôtel Lumière 2025"
  valid_from DATE,
  valid_to DATE,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,                   -- notes internes (non visibles client)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE CONTRACT_PRICES (prix sur mesure par variante)
-- ============================================================
-- Chaque ligne = un prix spécifique pour un produit/variante dans un contrat
CREATE TABLE IF NOT EXISTS public.contract_prices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  contract_id UUID REFERENCES public.contracts(id) ON DELETE CASCADE NOT NULL,
  variant_id TEXT NOT NULL,       -- correspond à ProductVariant.id dans le code
  product_id TEXT NOT NULL,       -- correspond à Product.id
  custom_price INTEGER NOT NULL,  -- prix en centimes (ex: 1999 = 19,99€)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(contract_id, variant_id)
);

-- ============================================================
-- TABLE ORDERS (commandes)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  contract_id UUID REFERENCES public.contracts(id) ON DELETE SET NULL,

  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
  )),

  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,

  -- Adresse livraison
  shipping_first_name TEXT NOT NULL,
  shipping_last_name TEXT NOT NULL,
  shipping_email TEXT NOT NULL,
  shipping_phone TEXT,
  shipping_company TEXT,
  shipping_address TEXT NOT NULL,
  shipping_address2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_country TEXT DEFAULT 'FR',

  -- Totaux (en centimes)
  subtotal INTEGER NOT NULL,
  shipping_cost INTEGER DEFAULT 0,
  total INTEGER NOT NULL,

  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE ORDER_ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  variant_id TEXT NOT NULL,
  variant_name TEXT NOT NULL,
  sku TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price INTEGER NOT NULL,   -- prix appliqué (contractuel ou standard)
  total_price INTEGER NOT NULL,
  was_contract_price BOOLEAN DEFAULT FALSE, -- indique si prix contractuel
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TABLE SHIPPING_ADDRESSES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.shipping_addresses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  label TEXT DEFAULT 'Mon adresse',
  company TEXT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'FR',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles: lecture personnelle" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles: mise à jour personnelle" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles: admin tout" ON public.profiles
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Contracts: le client voit son contrat, l'admin voit tout
ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Contracts: lecture personnelle" ON public.contracts
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Contracts: admin CRUD" ON public.contracts
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Contract prices: le client voit ses prix, l'admin gère tout
ALTER TABLE public.contract_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ContractPrices: lecture via contrat" ON public.contract_prices
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.contracts c
      WHERE c.id = contract_prices.contract_id AND c.user_id = auth.uid() AND c.is_active = TRUE
    )
  );
CREATE POLICY "ContractPrices: admin CRUD" ON public.contract_prices
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Orders: accès personnel" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Orders: admin tout" ON public.orders
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = TRUE));

-- Order items
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "OrderItems: via order" ON public.order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.orders WHERE id = order_items.order_id AND user_id = auth.uid())
  );

-- Shipping addresses
ALTER TABLE public.shipping_addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Addresses: personnelles" ON public.shipping_addresses
  USING (auth.uid() = user_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_contracts_user_id ON public.contracts(user_id);
CREATE INDEX IF NOT EXISTS idx_contracts_active ON public.contracts(is_active);
CREATE INDEX IF NOT EXISTS idx_contract_prices_contract ON public.contract_prices(contract_id);
CREATE INDEX IF NOT EXISTS idx_contract_prices_variant ON public.contract_prices(variant_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- ============================================================
-- FONCTION: récupérer les prix contractuels d'un utilisateur
-- Utilisée côté API pour vérifier les prix au moment du paiement
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_user_contract_prices(p_user_id UUID)
RETURNS TABLE(variant_id TEXT, product_id TEXT, custom_price INTEGER) AS $$
BEGIN
  RETURN QUERY
  SELECT cp.variant_id, cp.product_id, cp.custom_price
  FROM public.contract_prices cp
  JOIN public.contracts c ON c.id = cp.contract_id
  WHERE c.user_id = p_user_id
    AND c.is_active = TRUE
    AND (c.valid_to IS NULL OR c.valid_to >= CURRENT_DATE)
    AND (c.valid_from IS NULL OR c.valid_from <= CURRENT_DATE);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
