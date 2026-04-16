import { Product } from "@/types";

const IMG = "/images/products";

export const PRODUCTS: Product[] = [
  // ===== KITS =====
  {
    id: "kit-welcome-cafe",
    slug: "kit-welcome-cafe",
    name: "Kit Welcome",
    description:
      "La touche qui transforme un simple séjour en belle expérience.\n\nUn petit geste peut créer une grande différence. Avec notre Kit Gourmand Mon Petit Parfait, vous offrez à vos voyageurs une attention délicate qui marque les esprits dès leur arrivée. C'est ce détail inattendu qui crée un effet de surprise et donne immédiatement le sentiment d'être attendu.\n\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être disposés dans votre logement. Aucune préparation nécessaire.\n\nUn petit plus simple… qui laisse un grand souvenir.",
    short_description: "2 sachets café soluble, 1 thé vert, 1 thé noir, 2 sucres, 2 touillettes, 2 biscuits Lotus",
    category: "kits",
    subcategory: "welcome",
    images: [
      `${IMG}/HD_8-scaled.jpg`,
      `${IMG}/HD_5-scaled.jpg`,
    ],
    variants: [
      { id: "kit-welcome-100", name: "100 kits", price: 14900, stock: 100, sku: "KIT-WELCOME-100" },
      { id: "kit-welcome-200", name: "200 kits", price: 25800, stock: 80, sku: "KIT-WELCOME-200" },
      { id: "kit-welcome-300", name: "300 kits", price: 35700, stock: 60, sku: "KIT-WELCOME-300" },
    ],
    price: 14900,
    tags: ["café", "welcome", "accueil", "thé", "biscuits", "lotus"],
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
      "Le petit geste qui fait toujours plaisir.\n\nAprès un trajet parfois long, quoi de plus agréable qu'un café prêt à déguster ? Avec notre Kit Capsules de Café Mon Petit Parfait, vous offrez à vos voyageurs une attention simple mais particulièrement appréciée. Un détail qui crée immédiatement une sensation d'accueil chaleureux et attentionné.\n\nCe kit comprend une sélection de 3 capsules de café prêtes à l'emploi, compatibles avec les machines standards. Il permet à vos hôtes de profiter d'un moment de détente dès leur arrivée ou au réveil, sans avoir à courir au supermarché.\n\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être installés dans votre cuisine. Aucune organisation supplémentaire.",
    short_description: "3 capsules de café compatibles, prêtes à l'emploi",
    category: "kits",
    subcategory: "capsules",
    images: [
      `${IMG}/HD_6-scaled.jpg`,
      `${IMG}/HD_4-scaled.jpg`,
      `${IMG}/HD_3-scaled.jpg`,
    ],
    variants: [
      { id: "kit-cap-100", name: "100 kits", price: 8900, stock: 150, sku: "KIT-CAP-100" },
      { id: "kit-cap-300", name: "300 kits", price: 25500, stock: 100, sku: "KIT-CAP-300" },
      { id: "kit-cap-500", name: "500 kits", price: 39500, stock: 80, sku: "KIT-CAP-500" },
    ],
    price: 8900,
    tags: ["capsules", "café", "compatible", "accueil"],
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
      "La propreté comme signature de votre accueil.\n\nUn logement impeccable rassure immédiatement les voyageurs. Ce kit garantit praticité et confort dès le premier jour. Pensé pour les locations courte durée, il regroupe les essentiels pour maintenir un espace propre et agréable tout au long du séjour. Il permet aux hôtes de se sentir autonomes et à l'aise, comme chez eux.\n\nUn environnement bien entretenu contribue directement à une expérience positive et à des avis favorables.\n\nPréparés avec soin, conditionnés et livrés prêts à être déposés dans la cuisine ou l'espace ménage. Aucune préparation supplémentaire requise.",
    short_description: "Liquide vaisselle, éponge, sacs poubelles petit et grand format",
    category: "kits",
    subcategory: "entretien",
    images: [
      `${IMG}/HD_9-scaled.jpg`,
      `${IMG}/HD_7-scaled.jpg`,
    ],
    variants: [
      { id: "kit-ent-50", name: "50 kits", price: 6250, stock: 150, sku: "KIT-ENT-50" },
      { id: "kit-ent-200", name: "200 kits", price: 19800, stock: 100, sku: "KIT-ENT-200" },
      { id: "kit-ent-400", name: "400 kits", price: 31600, stock: 60, sku: "KIT-ENT-400" },
    ],
    price: 6250,
    tags: ["entretien", "ménage", "vaisselle", "éponge", "sacs poubelle"],
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
      "Un kit essentiel, simple et efficace.\n\nPensé spécialement pour les locations courte durée, ce kit contient tout le nécessaire pour que vos voyageurs se sentent immédiatement à l'aise dès leur arrivée. Chaque élément est sélectionné pour répondre aux besoins réels d'un séjour, qu'il soit court ou prolongé.\n\nUn voyageur remarque toujours la salle de bain en premier. Propreté, praticité, petites attentions… Ce sont ces détails qui rassurent et marquent les esprits.\n\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être déposés dans votre salle de bain. Aucune préparation supplémentaire n'est nécessaire.",
    short_description: "Savon 30ml, shampoing 30ml, vanity kit, savonnette — prêt à déposer",
    category: "kits",
    subcategory: "salle-de-bain",
    images: [
      `${IMG}/carre_12-scaled.jpg`,
      `${IMG}/HD_carre12-scaled.jpg`,
      `${IMG}/HD_carre11-scaled.jpg`,
    ],
    variants: [
      { id: "kit-sdb-50", name: "50 kits", price: 6000, stock: 100, sku: "KIT-SDB-50" },
      { id: "kit-sdb-150", name: "150 kits", price: 12000, stock: 80, sku: "KIT-SDB-150" },
      { id: "kit-sdb-300", name: "300 kits", price: 22800, stock: 60, sku: "KIT-SDB-300" },
      { id: "kit-sdb-600", name: "600 kits", price: 41400, stock: 40, sku: "KIT-SDB-600" },
    ],
    price: 6000,
    tags: ["salle de bain", "savon", "shampoing", "vanity", "toilette"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // ===== PRODUITS 100% OUATE =====
  {
    id: "essuie-tout",
    slug: "essuie-tout",
    name: "Essuie-Tout",
    description: "Essuie-tout 100% ouate de cellulose, ultra-absorbant et résistant. Format compact idéal pour vos cuisines et salles de bain. Certifié FSC®.",
    short_description: "100% ouate de cellulose, ultra-absorbant, certifié FSC®",
    category: "ouate",
    subcategory: "essuie-tout",
    images: [
      `${IMG}/HD_carre5-scaled.jpg`,
      `${IMG}/HD_carre6-scaled.jpg`,
    ],
    variants: [
      { id: "et-6", name: "6 rouleaux", price: 590, stock: 500, sku: "OUA-ET-6" },
      { id: "et-12", name: "12 rouleaux", price: 1090, stock: 300, sku: "OUA-ET-12" },
      { id: "et-24", name: "24 rouleaux", price: 1990, stock: 200, sku: "OUA-ET-24" },
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
    name: "Papier Toilette",
    description: "Papier toilette 3 épaisseurs, 100% ouate de cellulose vierge. Doux, résistant et certifié FSC®. Idéal pour les établissements souhaitant offrir un confort premium.",
    short_description: "3 épaisseurs, 100% ouate de cellulose vierge, certifié FSC®",
    category: "ouate",
    subcategory: "papier-toilette",
    images: [
      `${IMG}/HD_carre3-scaled.jpg`,
      `${IMG}/HD_carre4-scaled.jpg`,
    ],
    variants: [
      { id: "pt-12", name: "12 rouleaux", price: 690, stock: 500, sku: "OUA-PT-12" },
      { id: "pt-24", name: "24 rouleaux", price: 1290, stock: 300, sku: "OUA-PT-24" },
      { id: "pt-48", name: "48 rouleaux", price: 2390, stock: 200, sku: "OUA-PT-48" },
      { id: "pt-96", name: "96 rouleaux", price: 4390, stock: 100, sku: "OUA-PT-96" },
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
    description: "Mouchoirs en papier 100% ouate, 3 épaisseurs, extra-doux. Boîtes de 80 mouchoirs, idéales pour chambres d'hôtel et appartements.",
    short_description: "3 épaisseurs extra-doux, boîtes de 80 mouchoirs",
    category: "ouate",
    subcategory: "mouchoirs",
    images: [
      `${IMG}/HD_carre7-scaled.jpg`,
      `${IMG}/HD_carre8-scaled.jpg`,
    ],
    variants: [
      { id: "mou-6", name: "6 boîtes", price: 490, stock: 300, sku: "OUA-MOU-6" },
      { id: "mou-12", name: "12 boîtes", price: 890, stock: 200, sku: "OUA-MOU-12" },
      { id: "mou-24", name: "24 boîtes", price: 1690, stock: 150, sku: "OUA-MOU-24" },
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
    name: "Sacs Poubelles",
    description: "Sacs poubelle résistants disponibles en plusieurs tailles. Excellente résistance aux déchirures pour cuisines, salles de bain et parties communes.",
    short_description: "Résistants aux déchirures, plusieurs tailles disponibles",
    category: "consommables",
    subcategory: "sacs-poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sp-10l-50", name: "10L — 50 sacs", price: 390, stock: 500, sku: "CON-SP-10-50" },
      { id: "sp-30l-50", name: "30L — 50 sacs", price: 590, stock: 400, sku: "CON-SP-30-50" },
      { id: "sp-50l-50", name: "50L — 50 sacs", price: 790, stock: 300, sku: "CON-SP-50-50" },
      { id: "sp-30l-200", name: "30L — 200 sacs", price: 1990, stock: 200, sku: "CON-SP-30-200" },
    ],
    price: 390,
    tags: ["sacs poubelle", "cuisine", "nettoyage"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "tablettes-vaisselle",
    slug: "tablette-vaisselle-linge",
    name: "Tablette Vaisselle / Linge",
    description: "Tablettes lave-vaisselle et lessive tout-en-un, action dégraissante puissante. Adaptées à tous les appareils. Parfaites pour les locations avec cuisine ou lave-linge.",
    short_description: "Tout-en-un, action dégraissante, tous appareils compatibles",
    category: "consommables",
    subcategory: "tablettes",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-51-51-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-51-51.jpg`,
    ],
    variants: [
      { id: "tab-25", name: "25 tablettes", price: 490, stock: 300, sku: "CON-TAB-25" },
      { id: "tab-50", name: "50 tablettes", price: 890, stock: 200, sku: "CON-TAB-50" },
      { id: "tab-100", name: "100 tablettes", price: 1690, stock: 150, sku: "CON-TAB-100" },
    ],
    price: 490,
    tags: ["tablettes", "vaisselle", "linge", "entretien"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "capsules-cafe",
    slug: "capsules-cafe",
    name: "Capsules Café",
    description: "Capsules café compatibles — sélection soigneuse pour satisfaire tous les palais. Intensités variées du doux au très corsé.",
    short_description: "Capsules compatibles, intensités variées",
    category: "consommables",
    subcategory: "capsules",
    images: [
      `${IMG}/PHOTO-2026-02-03-11-23-06-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-11-23-06.jpg`,
    ],
    variants: [
      { id: "cap-10", name: "10 capsules", price: 390, stock: 500, sku: "CON-CAP-10" },
      { id: "cap-30", name: "30 capsules", price: 990, stock: 300, sku: "CON-CAP-30" },
      { id: "cap-60", name: "60 capsules", price: 1890, stock: 200, sku: "CON-CAP-60" },
      { id: "cap-100", name: "100 capsules", price: 2990, stock: 150, sku: "CON-CAP-100" },
    ],
    price: 390,
    tags: ["capsules", "café", "compatible"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "eponges",
    slug: "eponges",
    name: "Éponges",
    description: "Éponges double face côté doux / côté grattant. Résistantes et durables pour la vaisselle et le nettoyage des surfaces.",
    short_description: "Double face doux/grattant, résistantes et durables",
    category: "consommables",
    subcategory: "eponges",
    images: [
      `${IMG}/PHOTO-2026-02-03-14-59-07.jpg`,
      `${IMG}/HD_carre9-scaled.jpg`,
    ],
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

export function formatUnitPrice(totalCents: number, quantity: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(totalCents / quantity / 100);
}
