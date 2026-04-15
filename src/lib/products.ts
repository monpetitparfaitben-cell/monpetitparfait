import { Product } from "@/types";

// Données produits mock (à remplacer par Supabase)
export const PRODUCTS: Product[] = [
  // ===== KITS =====
  {
    id: "kit-welcome-cafe",
    slug: "kit-welcome-cafe",
    name: "Kit Welcome Café",
    description:
      "Le kit idéal pour accueillir vos clients avec une touche chaleureuse. Inclut des capsules café de qualité, du sucre et des agitateurs, le tout présenté dans un packaging soigné prêt à déposer dans chaque chambre ou appartement.",
    short_description: "Kit d'accueil café complet pour vos hébergements",
    category: "kits",
    subcategory: "welcome",
    images: ["/images/kit-cafe.jpg"],
    variants: [
      { id: "kit-cafe-10", name: "10 kits", price: 2490, stock: 50, sku: "KIT-CAFE-10" },
      { id: "kit-cafe-25", name: "25 kits", price: 5490, stock: 30, sku: "KIT-CAFE-25" },
      { id: "kit-cafe-50", name: "50 kits", price: 9990, stock: 20, sku: "KIT-CAFE-50" },
      { id: "kit-cafe-100", name: "100 kits", price: 17990, stock: 15, sku: "KIT-CAFE-100" },
    ],
    price: 2490,
    tags: ["café", "welcome", "accueil", "capsules"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "kit-capsule",
    slug: "kit-capsule",
    name: "Kit Capsule",
    description:
      "Un assortiment de capsules café compatibles Nespresso® et Dolce Gusto® pour satisfaire tous les goûts. Café corsé, doux, décaféiné — tout y est pour une expérience premium.",
    short_description: "Assortiment de capsules café premium",
    category: "kits",
    subcategory: "capsules",
    images: ["/images/kit-capsule.jpg"],
    variants: [
      { id: "capsule-24", name: "24 capsules", price: 1290, stock: 100, sku: "KIT-CAP-24" },
      { id: "capsule-48", name: "48 capsules", price: 2390, stock: 80, sku: "KIT-CAP-48" },
      { id: "capsule-96", name: "96 capsules", price: 4490, stock: 60, sku: "KIT-CAP-96" },
    ],
    price: 1290,
    tags: ["capsules", "café", "nespresso", "dolce gusto"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "kit-salle-de-bain",
    slug: "kit-salle-de-bain",
    name: "Kit Salle De Bain",
    description:
      "Tout ce qu'il faut pour une salle de bain irréprochable : gel douche, shampoing, après-shampoing et crème hydratante en formats miniature. Idéal pour les hôtels, Airbnb et conciergeries.",
    short_description: "Kit complet pour salle de bain hôtelière",
    category: "kits",
    subcategory: "salle-de-bain",
    images: ["/images/kit-sdb.jpg"],
    variants: [
      { id: "sdb-10", name: "10 kits", price: 3490, stock: 40, sku: "KIT-SDB-10" },
      { id: "sdb-25", name: "25 kits", price: 7990, stock: 25, sku: "KIT-SDB-25" },
      { id: "sdb-50", name: "50 kits", price: 14990, stock: 15, sku: "KIT-SDB-50" },
    ],
    price: 3490,
    tags: ["salle de bain", "gel douche", "shampoing", "hôtel"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "kit-entretien",
    slug: "kit-entretien",
    name: "Kit Entretien",
    description:
      "Le kit entretien professionnel pour garder vos espaces impeccables. Inclut tablettes lave-vaisselle, liquide vaisselle, nettoyant multi-surfaces et éponge — tout ce qu'il faut pour une rotation rapide entre les séjours.",
    short_description: "Kit entretien complet entre deux séjours",
    category: "kits",
    subcategory: "entretien",
    images: ["/images/kit-entretien.jpg"],
    variants: [
      { id: "entretien-5", name: "5 kits", price: 1990, stock: 60, sku: "KIT-ENT-5" },
      { id: "entretien-10", name: "10 kits", price: 3490, stock: 40, sku: "KIT-ENT-10" },
      { id: "entretien-25", name: "25 kits", price: 7990, stock: 20, sku: "KIT-ENT-25" },
    ],
    price: 1990,
    tags: ["entretien", "nettoyage", "ménage", "vaisselle"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // ===== PRODUITS 100% OUATE =====
  {
    id: "essuie-tout",
    slug: "essuie-tout",
    name: "Essuie-Tout Premium",
    description:
      "Essuie-tout 100% ouate de cellulose, ultra-absorbant et résistant. Format compact pour vos cuisines et salles de bain. Certifié FSC®.",
    short_description: "Essuie-tout 100% ouate ultra-absorbant FSC®",
    category: "ouate",
    subcategory: "essuie-tout",
    images: ["/images/essuie-tout.jpg"],
    variants: [
      { id: "et-6", name: "6 rouleaux", price: 590, stock: 200, sku: "OUA-ET-6" },
      { id: "et-12", name: "12 rouleaux", price: 1090, stock: 150, sku: "OUA-ET-12" },
      { id: "et-24", name: "24 rouleaux", price: 1990, stock: 100, sku: "OUA-ET-24" },
    ],
    price: 590,
    tags: ["essuie-tout", "ouate", "cuisine", "FSC"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "papier-toilette",
    slug: "papier-toilette",
    name: "Papier Toilette Premium",
    description:
      "Papier toilette 3 épaisseurs, 100% ouate de cellulose vierge. Doux, résistant et certifié FSC®. Idéal pour les établissements hôteliers souhaitant offrir un confort premium à leurs clients.",
    short_description: "Papier toilette 3 épaisseurs 100% ouate FSC®",
    category: "ouate",
    subcategory: "papier-toilette",
    images: ["/images/papier-toilette.jpg"],
    variants: [
      { id: "pt-12", name: "12 rouleaux", price: 690, stock: 300, sku: "OUA-PT-12" },
      { id: "pt-24", name: "24 rouleaux", price: 1290, stock: 200, sku: "OUA-PT-24" },
      { id: "pt-48", name: "48 rouleaux", price: 2390, stock: 150, sku: "OUA-PT-48" },
      { id: "pt-96", name: "96 rouleaux", price: 4490, stock: 80, sku: "OUA-PT-96" },
    ],
    price: 690,
    tags: ["papier toilette", "ouate", "3 épaisseurs", "FSC"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "mouchoirs",
    slug: "mouchoirs-en-papier",
    name: "Mouchoirs en Papier",
    description:
      "Mouchoirs en papier 100% ouate, 3 épaisseurs, extra-doux. Boîtes de 80 mouchoirs, idéales pour les chambres d'hôtel, appartements et espaces de réception.",
    short_description: "Mouchoirs 3 épaisseurs extra-doux en boîte",
    category: "ouate",
    subcategory: "mouchoirs",
    images: ["/images/mouchoirs.jpg"],
    variants: [
      { id: "mou-6", name: "6 boîtes", price: 490, stock: 200, sku: "OUA-MOU-6" },
      { id: "mou-12", name: "12 boîtes", price: 890, stock: 150, sku: "OUA-MOU-12" },
      { id: "mou-24", name: "24 boîtes", price: 1690, stock: 100, sku: "OUA-MOU-24" },
    ],
    price: 490,
    tags: ["mouchoirs", "ouate", "boîte", "chambre"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // ===== CONSOMMABLES =====
  {
    id: "sacs-poubelle",
    slug: "sacs-poubelle",
    name: "Sacs Poubelle",
    description:
      "Sacs poubelle résistants, disponibles en plusieurs tailles (10L, 30L, 50L). Idéaux pour les cuisines, salles de bain et parties communes. Excellente résistance aux déchirures.",
    short_description: "Sacs poubelle résistants en plusieurs tailles",
    category: "consommables",
    subcategory: "sacs-poubelle",
    images: ["/images/sacs-poubelle.jpg"],
    variants: [
      { id: "sp-10l-50", name: "10L - 50 sacs", price: 390, stock: 500, sku: "CON-SP-10-50" },
      { id: "sp-30l-50", name: "30L - 50 sacs", price: 590, stock: 400, sku: "CON-SP-30-50" },
      { id: "sp-50l-50", name: "50L - 50 sacs", price: 790, stock: 300, sku: "CON-SP-50-50" },
      { id: "sp-30l-200", name: "30L - 200 sacs", price: 1990, stock: 200, sku: "CON-SP-30-200" },
    ],
    price: 390,
    tags: ["sacs poubelle", "nettoyage", "cuisine", "poubelle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "tablettes-vaisselle",
    slug: "tablettes-vaisselle",
    name: "Tablettes Lave-Vaisselle",
    description:
      "Tablettes lave-vaisselle tout-en-un, action dégraissante puissante et rinçage brillant. Adaptées à tous les lave-vaisselles. Parfaites pour les locations avec cuisine équipée.",
    short_description: "Tablettes lave-vaisselle tout-en-un puissantes",
    category: "consommables",
    subcategory: "tablettes",
    images: ["/images/tablettes.jpg"],
    variants: [
      { id: "tab-25", name: "25 tablettes", price: 490, stock: 300, sku: "CON-TAB-25" },
      { id: "tab-50", name: "50 tablettes", price: 890, stock: 200, sku: "CON-TAB-50" },
      { id: "tab-100", name: "100 tablettes", price: 1690, stock: 150, sku: "CON-TAB-100" },
    ],
    price: 490,
    tags: ["tablettes", "vaisselle", "lave-vaisselle", "entretien"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "capsules-cafe",
    slug: "capsules-cafe",
    name: "Capsules Café",
    description:
      "Capsules café compatibles Nespresso® — sélection de cafés 100% Arabica, torréfaction artisanale. Intensités variées pour satisfaire tous les palais, du doux au très corsé.",
    short_description: "Capsules Nespresso® compatibles, 100% Arabica",
    category: "consommables",
    subcategory: "capsules",
    images: ["/images/capsules.jpg"],
    variants: [
      { id: "cap-10", name: "10 capsules", price: 390, stock: 500, sku: "CON-CAP-10" },
      { id: "cap-30", name: "30 capsules", price: 990, stock: 300, sku: "CON-CAP-30" },
      { id: "cap-60", name: "60 capsules", price: 1890, stock: 200, sku: "CON-CAP-60" },
      { id: "cap-100", name: "100 capsules", price: 2990, stock: 150, sku: "CON-CAP-100" },
    ],
    price: 390,
    tags: ["capsules", "café", "nespresso", "arabica"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "eponges",
    slug: "eponges",
    name: "Éponges Grattantes",
    description:
      "Éponges double face avec côté doux et côté grattant. Résistantes et durables. Parfaites pour la vaisselle et le nettoyage des surfaces en cuisine.",
    short_description: "Éponges double face résistantes et durables",
    category: "consommables",
    subcategory: "eponges",
    images: ["/images/eponges.jpg"],
    variants: [
      { id: "epo-5", name: "5 éponges", price: 290, stock: 400, sku: "CON-EPO-5" },
      { id: "epo-10", name: "10 éponges", price: 490, stock: 300, sku: "CON-EPO-10" },
      { id: "epo-20", name: "20 éponges", price: 890, stock: 200, sku: "CON-EPO-20" },
    ],
    price: 290,
    tags: ["éponges", "vaisselle", "nettoyage", "cuisine"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category && p.is_active);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.is_featured && p.is_active);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}
