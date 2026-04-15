// ============ PRODUCT TYPES ============
export type ProductCategory =
  | "kits"
  | "ouate"
  | "consommables";

export interface ProductVariant {
  id: string;
  name: string;       // ex: "12 unités", "24 unités"
  price: number;      // en centimes (ex: 1999 = 19.99€)
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  short_description: string;
  category: ProductCategory;
  subcategory?: string;
  images: string[];   // URLs
  variants: ProductVariant[];
  price: number;      // prix de base en centimes
  tags: string[];
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============ CART TYPES ============
export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// ============ ORDER TYPES ============
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface ShippingAddress {
  company?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: string;
  user_id?: string;
  status: OrderStatus;
  items: OrderItem[];
  shipping_address: ShippingAddress;
  subtotal: number;
  shipping_cost: number;
  total: number;
  stripe_payment_intent_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// ============ USER TYPES ============
export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
  phone?: string;
  default_address?: ShippingAddress;
  created_at: string;
}

// ============ CATEGORY MAP ============
export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  kits: "Kits",
  ouate: "Produits 100% Ouate",
  consommables: "Consommables",
};

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  kits: "Kits prêts à l'emploi pour vos hébergements",
  ouate: "Papier toilette, essuie-tout et mouchoirs premium",
  consommables: "Sacs poubelles, capsules café et produits d'entretien",
};
