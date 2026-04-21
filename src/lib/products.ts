import { Product } from "@/types";

const IMG = "/images/products";

// PRIX EN CENTIMES (ex: 14900 = 149,00 €) — À CONFIRMER
export const PRODUCTS: Product[] = [

  // =========================================================
  // KITS
  // =========================================================

  {
    id: "kit-salle-de-bains",
    slug: "kit-salle-de-bains",
    name: "Kit Salle de Bains",
    description:
      "Un kit essentiel, simple et efficace.\n\nPensé spécialement pour les locations courte durée, ce kit contient tout le nécessaire pour que vos voyageurs se sentent immédiatement à l'aise dès leur arrivée. Il comprend :\n• Savon 30 ml\n• Shampoing 30 ml\n• Vanity kit (accessoires essentiels)\n• Savonnette pour les mains\n\nChaque élément est sélectionné pour répondre aux besoins réels d'un séjour, qu'il soit court ou prolongé. Nos kits sont préparés avec soin, conditionnés et livrés prêts à être déposés dans votre salle de bain. Aucune préparation supplémentaire n'est nécessaire : vous gagnez du temps tout en garantissant un accueil professionnel et soigné.\n\nUn voyageur remarque toujours la salle de bain en premier. Propreté, praticité, petites attentions… Ce sont ces détails qui rassurent et marquent les esprits. Avec notre Kit Salle de Bains Mon Petit Parfait, vous assurez à vos hôtes un accueil soigné, professionnel et confortable dès leur arrivée.",
    short_description: "• 1 Shampoo 30 ml · • 1 Shower Gel 30 ml · • 1 Vanity Kit · • 1 Savonnette 20 gr",
    category: "kits",
    subcategory: "Kit Salle de Bains",
    images: [
      `${IMG}/carre_12-scaled.jpg`,
      `${IMG}/HD_carre12-scaled.jpg`,
      `${IMG}/HD_carre11-scaled.jpg`,
    ],
    variants: [
      { id: "kit-sdb-100", name: "100 kits", price: 9900, stock: 500, sku: "KIT-SDB-100" },
      { id: "kit-sdb-300", name: "300 kits", price: 27900, stock: 300, sku: "KIT-SDB-300" },
      { id: "kit-sdb-600", name: "600 kits", price: 52900, stock: 200, sku: "KIT-SDB-600" },
    ],
    price: 9900,
    tags: ["salle de bain", "savon", "shampoing", "vanity", "toilette", "accueil"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-capsule-cafe",
    slug: "kit-capsule-cafe",
    name: "Kit Capsule Café",
    description:
      "Le petit geste qui fait toujours plaisir.\n\nAprès un trajet parfois long, quoi de plus agréable qu'un café prêt à déguster ? Avec notre Kit Capsules de Café Mon Petit Parfait, vous offrez à vos voyageurs une attention simple mais particulièrement appréciée. Un détail qui crée immédiatement une sensation d'accueil chaleureux et attentionné.\n\nCe kit comprend une sélection de 3 capsules de café prêtes à l'emploi, compatibles avec les machines standards (à adapter selon ton modèle si besoin). Il permet à vos hôtes de profiter d'un moment de détente dès leur arrivée ou au réveil, sans avoir à courir au supermarché.\n\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être installés dans votre cuisine. Aucune organisation supplémentaire : vous les recevez, vous les disposez, et l'accueil est prêt. Simple, efficace et toujours apprécié.",
    short_description: "• 3 capsules de café",
    category: "kits",
    subcategory: "Kit Capsule Café",
    images: [
      `${IMG}/HD_6-scaled.jpg`,
      `${IMG}/HD_4-scaled.jpg`,
      `${IMG}/HD_3-scaled.jpg`,
    ],
    variants: [
      { id: "kit-caf-100", name: "100 kits", price: 8900, stock: 500, sku: "KIT-CAF-100" },
      { id: "kit-caf-300", name: "300 kits", price: 24900, stock: 300, sku: "KIT-CAF-300" },
      { id: "kit-caf-600", name: "600 kits", price: 45900, stock: 200, sku: "KIT-CAF-600" },
    ],
    price: 8900,
    tags: ["capsules", "café", "accueil", "boisson"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-1",
    slug: "kit-gourmand-formule-1",
    name: "Kit Gourmand — Formule 1",
    description:
      "La touche qui transforme un simple séjour en belle expérience.\n\nUn petit geste peut créer une grande différence. Avec notre Kit Gourmand Mon Petit Parfait, vous offrez à vos voyageurs une attention délicate qui marque les esprits dès leur arrivée. C'est ce détail inattendu qui crée un effet de surprise et donne immédiatement le sentiment d'être attendu.\n\nNotre kit gourmand contient :\n• 2 sachets de café soluble\n• 1 thé vert\n• 1 thé noir\n• 2 sucres\n• 2 touillettes\n• 2 biscuits Lotus\n\nUn assortiment simple, efficace et apprécié, parfait pour accompagner une pause café ou thé après un trajet. Nos kits sont préparés avec soin, conditionnés et livrés prêts à être disposés dans votre logement. Aucune préparation nécessaire : vous les installez et l'accueil est immédiatement valorisé. Un petit plus simple… qui laisse un grand souvenir.",
    short_description: "• 2 cafés solubles · • 1 thé vert · • 1 thé noir · • 2 sucres · • 2 touillettes · • 2 gâteaux",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      `${IMG}/HD_8-scaled.jpg`,
      `${IMG}/HD_5-scaled.jpg`,
    ],
    variants: [
      { id: "kit-grm1-100", name: "100 kits", price: 14900, stock: 500, sku: "KIT-GRM1-100" },
      { id: "kit-grm1-300", name: "300 kits", price: 41900, stock: 300, sku: "KIT-GRM1-300" },
      { id: "kit-grm1-600", name: "600 kits", price: 78900, stock: 200, sku: "KIT-GRM1-600" },
    ],
    price: 14900,
    tags: ["café soluble", "thé", "biscuits", "gourmand", "accueil", "welcome"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-2",
    slug: "kit-gourmand-formule-2",
    name: "Kit Gourmand — Formule 2",
    description:
      "La version capsules de notre Kit Gourmand.\n\nComposition : 2 capsules de café, 1 thé noir, 1 thé vert, 2 sucres, 2 touillettes, 2 gâteaux. Idéal pour les logements équipés d'une machine à capsules. Préparé avec soin, livré prêt à déposer.",
    short_description: "• 2 capsules de café · • 1 thé noir · • 1 thé vert · • 2 sucres · • 2 touillettes · • 2 gâteaux",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      `${IMG}/HD_8-scaled.jpg`,
      `${IMG}/HD_5-scaled.jpg`,
    ],
    variants: [
      { id: "kit-grm2-100", name: "100 kits", price: 15900, stock: 500, sku: "KIT-GRM2-100" },
      { id: "kit-grm2-300", name: "300 kits", price: 44900, stock: 300, sku: "KIT-GRM2-300" },
      { id: "kit-grm2-600", name: "600 kits", price: 84900, stock: 200, sku: "KIT-GRM2-600" },
    ],
    price: 15900,
    tags: ["capsules café", "thé", "biscuits", "gourmand", "accueil"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-3",
    slug: "kit-gourmand-formule-3",
    name: "Kit Gourmand — Formule 3",
    description:
      "La formule café renforcée, sans gâteaux.\n\nComposition : 4 capsules de café, 1 thé noir, 1 thé vert, 2 sucres, 2 touillettes. Pour les voyageurs qui apprécient avant tout un bon café. Préparé avec soin, livré prêt à déposer.",
    short_description: "• 4 capsules de café · • 1 thé noir · • 1 thé vert · • 2 sucres · • 2 touillettes",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      `${IMG}/HD_8-scaled.jpg`,
      `${IMG}/HD_5-scaled.jpg`,
    ],
    variants: [
      { id: "kit-grm3-100", name: "100 kits", price: 13900, stock: 500, sku: "KIT-GRM3-100" },
      { id: "kit-grm3-300", name: "300 kits", price: 38900, stock: 300, sku: "KIT-GRM3-300" },
      { id: "kit-grm3-600", name: "600 kits", price: 72900, stock: 200, sku: "KIT-GRM3-600" },
    ],
    price: 13900,
    tags: ["capsules café", "thé", "gourmand", "accueil", "sans gâteaux"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-4",
    slug: "kit-gourmand-formule-4",
    name: "Kit Gourmand — Formule 4",
    description:
      "La formule sans sucre pour les hôtes attentifs.\n\nComposition : 4 capsules de café, 1 thé vert, 1 thé noir, 2 touillettes, 2 gâteaux. Sans sucre ajouté — pensé pour les voyageurs qui font attention à leur consommation. Préparé avec soin, livré prêt à déposer.",
    short_description: "• 4 capsules de café · • 1 thé vert · • 1 thé noir · • 2 touillettes · • 2 gâteaux",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      `${IMG}/HD_8-scaled.jpg`,
      `${IMG}/HD_5-scaled.jpg`,
    ],
    variants: [
      { id: "kit-grm4-100", name: "100 kits", price: 14900, stock: 500, sku: "KIT-GRM4-100" },
      { id: "kit-grm4-300", name: "300 kits", price: 41900, stock: 300, sku: "KIT-GRM4-300" },
      { id: "kit-grm4-600", name: "600 kits", price: 78900, stock: 200, sku: "KIT-GRM4-600" },
    ],
    price: 14900,
    tags: ["capsules café", "thé", "biscuits", "gourmand", "sans sucre", "accueil"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-1",
    slug: "kit-entretien-formule-1",
    name: "Kit Entretien — Formule 1",
    description:
      "L'essentiel pour un logement propre.\n\nFormule Basique : 1 éponge, 1 liquide vaisselle, 1 sac 50 L, 1 sac 10 L. Tout ce qu'il faut pour assurer la propreté du quotidien. Préparé avec soin, livré prêt à déposer dans la cuisine ou l'espace ménage.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      `${IMG}/HD_9-scaled.jpg`,
      `${IMG}/HD_7-scaled.jpg`,
    ],
    variants: [
      { id: "kit-ent1-100", name: "100 kits", price: 6500, stock: 500, sku: "KIT-ENT1-100" },
      { id: "kit-ent1-300", name: "300 kits", price: 17900, stock: 300, sku: "KIT-ENT1-300" },
      { id: "kit-ent1-600", name: "600 kits", price: 32900, stock: 200, sku: "KIT-ENT1-600" },
    ],
    price: 6500,
    tags: ["entretien", "éponge", "vaisselle", "sacs poubelle"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-2",
    slug: "kit-entretien-formule-2",
    name: "Kit Entretien — Formule 2",
    description:
      "La formule Intermédiaire pour un accueil complet.\n\nComposition : 1 éponge, 1 liquide vaisselle, 1 sac 50 L, 1 sac 10 L, 1 tablette lave-vaisselle, 1 tablette linge. Tout inclus pour le ménage et la lessive. Préparé avec soin, livré prêt à déposer.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L · • 1 tablette lave-vaisselle · • 1 tablette linge",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      `${IMG}/HD_9-scaled.jpg`,
      `${IMG}/HD_7-scaled.jpg`,
    ],
    variants: [
      { id: "kit-ent2-100", name: "100 kits", price: 8500, stock: 500, sku: "KIT-ENT2-100" },
      { id: "kit-ent2-300", name: "300 kits", price: 23900, stock: 300, sku: "KIT-ENT2-300" },
      { id: "kit-ent2-600", name: "600 kits", price: 44900, stock: 200, sku: "KIT-ENT2-600" },
    ],
    price: 8500,
    tags: ["entretien", "éponge", "vaisselle", "linge", "tablettes", "sacs poubelle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-3",
    slug: "kit-entretien-formule-3",
    name: "Kit Entretien — Formule 3",
    description:
      "La formule Premium pour les établissements exigeants.\n\nComposition : 1 éponge, 1 liquide vaisselle, 1 sac 50 L, 1 sac 10 L, 2 tablettes lave-vaisselle, 2 tablettes lessive. La dose doublée pour plusieurs jours d'autonomie. Préparé avec soin, livré prêt à déposer.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L · • 2 tablettes lave-vaisselle · • 2 tablettes lessive",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      `${IMG}/HD_9-scaled.jpg`,
      `${IMG}/HD_7-scaled.jpg`,
    ],
    variants: [
      { id: "kit-ent3-100", name: "100 kits", price: 9900, stock: 500, sku: "KIT-ENT3-100" },
      { id: "kit-ent3-300", name: "300 kits", price: 27900, stock: 300, sku: "KIT-ENT3-300" },
      { id: "kit-ent3-600", name: "600 kits", price: 52900, stock: 200, sku: "KIT-ENT3-600" },
    ],
    price: 9900,
    tags: ["entretien", "éponge", "vaisselle", "linge", "tablettes", "sacs poubelle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-4",
    slug: "kit-entretien-formule-4",
    name: "Kit Entretien — Formule 4",
    description:
      "La Version pods pour plus de praticité.\n\nComposition : 1 éponge, 1 liquide vaisselle, 1 sac 50 L, 1 sac 10 L, 1 pods vaisselle, 1 pods linge. Version pods ultra-pratiques, dosés et prêts à l'emploi. Préparé avec soin, livré prêt à déposer.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L · • 1 pods vaisselle · • 1 pods linge",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      `${IMG}/HD_9-scaled.jpg`,
      `${IMG}/HD_7-scaled.jpg`,
    ],
    variants: [
      { id: "kit-ent4-100", name: "100 kits", price: 9500, stock: 500, sku: "KIT-ENT4-100" },
      { id: "kit-ent4-300", name: "300 kits", price: 26900, stock: 300, sku: "KIT-ENT4-300" },
      { id: "kit-ent4-600", name: "600 kits", price: 50900, stock: 200, sku: "KIT-ENT4-600" },
    ],
    price: 9500,
    tags: ["entretien", "pods", "vaisselle", "linge", "sacs poubelle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // =========================================================
  // 100% OUATE — Essuie-tout
  // =========================================================

  {
    id: "essuie-tout-gamme-1",
    slug: "essuie-tout-gamme-1",
    name: "Essuie-tout — Gamme 1",
    description:
      "PAMP x4 — Qualité domestique, 2 plis, 39 g, 220 mm x 210 mm. Un essuie-tout solide et absorbant pour la cuisine et la salle de bain. Livré par lot prêt à l'emploi.",
    short_description: "PAMP x4 — Qualité domestique, 2 plis, 39 g, 220 mm x 210 mm",
    category: "ouate",
    subcategory: "Essuie-tout",
    images: [
      `${IMG}/HD_carre5-scaled.jpg`,
      `${IMG}/HD_carre6-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ess1-100", name: "100 unités", price: 3900, stock: 500, sku: "OUA-ESS1-100" },
      { id: "oua-ess1-300", name: "300 unités", price: 10900, stock: 300, sku: "OUA-ESS1-300" },
      { id: "oua-ess1-600", name: "600 unités", price: 19900, stock: 200, sku: "OUA-ESS1-600" },
    ],
    price: 3900,
    tags: ["essuie-tout", "ouate", "cuisine", "2 plis"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "essuie-tout-gamme-2",
    slug: "essuie-tout-gamme-2",
    name: "Essuie-tout — Gamme 2",
    description:
      "Essuie-main bobine — 2 plis, 200 m. La bobine professionnelle pour un usage intensif. Idéale pour les cuisines et salles de bain à fort passage. Économique et pratique.",
    short_description: "Essuie-main bobine — 2 plis, 200 m",
    category: "ouate",
    subcategory: "Essuie-tout",
    images: [
      `${IMG}/HD_carre5-scaled.jpg`,
      `${IMG}/HD_carre6-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ess2-100", name: "100 unités", price: 4500, stock: 500, sku: "OUA-ESS2-100" },
      { id: "oua-ess2-300", name: "300 unités", price: 12500, stock: 300, sku: "OUA-ESS2-300" },
      { id: "oua-ess2-600", name: "600 unités", price: 22900, stock: 200, sku: "OUA-ESS2-600" },
    ],
    price: 4500,
    tags: ["essuie-tout", "bobine", "ouate", "professionnel"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "essuie-tout-gamme-3",
    slug: "essuie-tout-gamme-3",
    name: "Essuie-tout — Gamme 3",
    description:
      "Bobine individuelle à dévidage central — 200 m. Format compact, distributeur propre, zéro gaspillage. Idéale pour les espaces professionnels.",
    short_description: "Bobine individuelle à dévidage central — 200 m",
    category: "ouate",
    subcategory: "Essuie-tout",
    images: [
      `${IMG}/HD_carre5-scaled.jpg`,
      `${IMG}/HD_carre6-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ess3-100", name: "100 unités", price: 5200, stock: 500, sku: "OUA-ESS3-100" },
      { id: "oua-ess3-300", name: "300 unités", price: 14500, stock: 300, sku: "OUA-ESS3-300" },
      { id: "oua-ess3-600", name: "600 unités", price: 26900, stock: 200, sku: "OUA-ESS3-600" },
    ],
    price: 5200,
    tags: ["essuie-tout", "dévidage central", "bobine", "professionnel"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "essuie-tout-gamme-4",
    slug: "essuie-tout-gamme-4",
    name: "Essuie-tout — Gamme 4",
    description:
      "Essuie-mains double pli en V — 200 x 15. Format idéal pour les distributeurs muraux. Hygiénique, économique, conçu pour les usages professionnels.",
    short_description: "Essuie-mains double pli en V — 200 x 15",
    category: "ouate",
    subcategory: "Essuie-tout",
    images: [
      `${IMG}/HD_carre5-scaled.jpg`,
      `${IMG}/HD_carre6-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ess4-100", name: "100 unités", price: 4200, stock: 500, sku: "OUA-ESS4-100" },
      { id: "oua-ess4-300", name: "300 unités", price: 11500, stock: 300, sku: "OUA-ESS4-300" },
      { id: "oua-ess4-600", name: "600 unités", price: 21500, stock: 200, sku: "OUA-ESS4-600" },
    ],
    price: 4200,
    tags: ["essuie-tout", "pli en V", "distributeur", "professionnel"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // =========================================================
  // 100% OUATE — Papier toilette
  // =========================================================

  {
    id: "papier-toilette-gamme-1",
    slug: "papier-toilette-gamme-1",
    name: "Papier toilette — Gamme 1",
    description:
      "Papier toilette JL+ — 2 plis, 120 mm x 87 m, 11,4 m/rouleau. La valeur sûre pour un usage quotidien. Doux, résistant, adapté à tous les établissements.",
    short_description: "Papier toilette JL+ — 2 plis, 120 mm x 87 m, 11,4 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      `${IMG}/HD_carre3-scaled.jpg`,
      `${IMG}/HD_carre4-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ptt1-100", name: "100 rouleaux", price: 3200, stock: 500, sku: "OUA-PTT1-100" },
      { id: "oua-ptt1-300", name: "300 rouleaux", price: 8900, stock: 300, sku: "OUA-PTT1-300" },
      { id: "oua-ptt1-600", name: "600 rouleaux", price: 16500, stock: 200, sku: "OUA-PTT1-600" },
    ],
    price: 3200,
    tags: ["papier toilette", "ouate", "2 plis", "JL+"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "papier-toilette-gamme-2",
    slug: "papier-toilette-gamme-2",
    name: "Papier toilette — Gamme 2",
    description:
      "Papier toilette S24 — 2 plis, 120 mm x 87 m, 13,4 m/rouleau. Un rouleau plus long pour réduire la fréquence des remplacements. Idéal pour les locations avec un fort taux d'occupation.",
    short_description: "Papier toilette S24 — 2 plis, 120 mm x 87 m, 13,4 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      `${IMG}/HD_carre3-scaled.jpg`,
      `${IMG}/HD_carre4-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ptt2-100", name: "100 rouleaux", price: 3600, stock: 500, sku: "OUA-PTT2-100" },
      { id: "oua-ptt2-300", name: "300 rouleaux", price: 9900, stock: 300, sku: "OUA-PTT2-300" },
      { id: "oua-ptt2-600", name: "600 rouleaux", price: 18500, stock: 200, sku: "OUA-PTT2-600" },
    ],
    price: 3600,
    tags: ["papier toilette", "ouate", "2 plis", "S24"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "papier-toilette-gamme-3",
    slug: "papier-toilette-gamme-3",
    name: "Papier toilette — Gamme 3",
    description:
      "Papier toilette XXL+ — 2 plis, 120 mm x 87 m, 30 m/rouleau. Le rouleau qui dure. Parfait pour les hôtels, résidences et conciergeries avec un grand nombre de logements.",
    short_description: "Papier toilette XXL+ — 2 plis, 120 mm x 87 m, 30 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      `${IMG}/HD_carre3-scaled.jpg`,
      `${IMG}/HD_carre4-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ptt3-100", name: "100 rouleaux", price: 4200, stock: 500, sku: "OUA-PTT3-100" },
      { id: "oua-ptt3-300", name: "300 rouleaux", price: 11500, stock: 300, sku: "OUA-PTT3-300" },
      { id: "oua-ptt3-600", name: "600 rouleaux", price: 21500, stock: 200, sku: "OUA-PTT3-600" },
    ],
    price: 4200,
    tags: ["papier toilette", "ouate", "XXL", "grand volume"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "papier-toilette-gamme-4",
    slug: "papier-toilette-gamme-4",
    name: "Papier toilette — Gamme 4",
    description:
      "Papier toilette Aloe Vera — 3 plis, 136 mm x 90, 23 m/rouleau. Extra-doux grâce à l'Aloe Vera. Idéal pour les établissements qui souhaitent offrir une expérience haut de gamme à leurs hôtes.",
    short_description: "Papier toilette Aloe Vera — 3 plis, 136 mm x 90, 23 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      `${IMG}/HD_carre3-scaled.jpg`,
      `${IMG}/HD_carre4-scaled.jpg`,
    ],
    variants: [
      { id: "oua-ptt4-100", name: "100 rouleaux", price: 5500, stock: 500, sku: "OUA-PTT4-100" },
      { id: "oua-ptt4-300", name: "300 rouleaux", price: 15500, stock: 300, sku: "OUA-PTT4-300" },
      { id: "oua-ptt4-600", name: "600 rouleaux", price: 28900, stock: 200, sku: "OUA-PTT4-600" },
    ],
    price: 5500,
    tags: ["papier toilette", "ouate", "aloe vera", "3 plis", "premium"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // =========================================================
  // CONSOMMABLES — Sac poubelle
  // =========================================================

  {
    id: "sac-10l-blanc",
    slug: "sac-poubelle-10l-blanc",
    name: "Sac poubelle — 10 L — Blanc, 10 microns",
    description: "10 L — Blanc, 10 microns. Idéal pour les petites poubelles de salle de bain ou bureau.",
    short_description: "10 L — Blanc, 10 microns",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-10lb-100", name: "100 sacs", price: 1900, stock: 500, sku: "SAC-10LB-100" },
      { id: "sac-10lb-300", name: "300 sacs", price: 4900, stock: 300, sku: "SAC-10LB-300" },
      { id: "sac-10lb-600", name: "600 sacs", price: 8900, stock: 200, sku: "SAC-10LB-600" },
    ],
    price: 1900,
    tags: ["sacs poubelle", "10L", "blanc"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-30l-noir",
    slug: "sac-poubelle-30l-noir",
    name: "Sac poubelle — 30 L — Noir, 12 microns",
    description: "30 L — Noir, 12 microns. Format pratique pour cuisine et séjour.",
    short_description: "30 L — Noir, 12 microns",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-30ln-100", name: "100 sacs", price: 2200, stock: 500, sku: "SAC-30LN-100" },
      { id: "sac-30ln-300", name: "300 sacs", price: 5900, stock: 300, sku: "SAC-30LN-300" },
      { id: "sac-30ln-600", name: "600 sacs", price: 10900, stock: 200, sku: "SAC-30LN-600" },
    ],
    price: 2200,
    tags: ["sacs poubelle", "30L", "noir"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-50l-blanc",
    slug: "sac-poubelle-50l-blanc",
    name: "Sac poubelle — 50 L — Blanc",
    description: "50 L — Blanc. Format grande capacité pour cuisines et parties communes.",
    short_description: "50 L — Blanc",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-50lb-100", name: "100 sacs", price: 2500, stock: 500, sku: "SAC-50LB-100" },
      { id: "sac-50lb-300", name: "300 sacs", price: 6900, stock: 300, sku: "SAC-50LB-300" },
      { id: "sac-50lb-600", name: "600 sacs", price: 12900, stock: 200, sku: "SAC-50LB-600" },
    ],
    price: 2500,
    tags: ["sacs poubelle", "50L", "blanc"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-50l-noir",
    slug: "sac-poubelle-50l-noir",
    name: "Sac poubelle — 50 L — Noir, 27 microns",
    description: "50 L — Noir, 27 microns. Résistant, idéal pour les déchets lourds.",
    short_description: "50 L — Noir, 27 microns",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-50ln-100", name: "100 sacs", price: 2800, stock: 500, sku: "SAC-50LN-100" },
      { id: "sac-50ln-300", name: "300 sacs", price: 7500, stock: 300, sku: "SAC-50LN-300" },
      { id: "sac-50ln-600", name: "600 sacs", price: 13900, stock: 200, sku: "SAC-50LN-600" },
    ],
    price: 2800,
    tags: ["sacs poubelle", "50L", "noir"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-100l-noir",
    slug: "sac-poubelle-100l-noir",
    name: "Sac poubelle — 100 L — Noir, 32 microns",
    description: "100 L — Noir, 32 microns. Pour les grandes poubelles collectives et locaux professionnels.",
    short_description: "100 L — Noir, 32 microns",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-100ln-100", name: "100 sacs", price: 3500, stock: 500, sku: "SAC-100LN-100" },
      { id: "sac-100ln-300", name: "300 sacs", price: 9500, stock: 300, sku: "SAC-100LN-300" },
      { id: "sac-100ln-600", name: "600 sacs", price: 17900, stock: 200, sku: "SAC-100LN-600" },
    ],
    price: 3500,
    tags: ["sacs poubelle", "100L", "noir"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-110l-blanc",
    slug: "sac-poubelle-110l-blanc",
    name: "Sac poubelle — 110 L — Blanc",
    description: "110 L — Blanc. Grand format pour les containers et bacs collectifs.",
    short_description: "110 L — Blanc",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-110lb-100", name: "100 sacs", price: 3800, stock: 500, sku: "SAC-110LB-100" },
      { id: "sac-110lb-300", name: "300 sacs", price: 10500, stock: 300, sku: "SAC-110LB-300" },
      { id: "sac-110lb-600", name: "600 sacs", price: 19500, stock: 200, sku: "SAC-110LB-600" },
    ],
    price: 3800,
    tags: ["sacs poubelle", "110L", "blanc"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-130l-noir-44",
    slug: "sac-poubelle-130l-noir-44",
    name: "Sac poubelle — 130 L — Noir, 44 microns",
    description: "130 L — Noir, 44 microns. Le plus résistant de la gamme, pour les usages les plus exigeants.",
    short_description: "130 L — Noir, 44 microns",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-130ln44-100", name: "100 sacs", price: 4500, stock: 500, sku: "SAC-130LN44-100" },
      { id: "sac-130ln44-300", name: "300 sacs", price: 12500, stock: 300, sku: "SAC-130LN44-300" },
      { id: "sac-130ln44-600", name: "600 sacs", price: 22900, stock: 200, sku: "SAC-130LN44-600" },
    ],
    price: 4500,
    tags: ["sacs poubelle", "130L", "noir", "44 microns"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-130l-noir-33",
    slug: "sac-poubelle-130l-noir-33",
    name: "Sac poubelle — 130 L — Noir, 33 microns",
    description: "130 L — Noir, 33 microns. Grand format résistant pour containers et bacs professionnels.",
    short_description: "130 L — Noir, 33 microns",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-37-47-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-37-47.jpg`,
    ],
    variants: [
      { id: "sac-130ln33-100", name: "100 sacs", price: 4200, stock: 500, sku: "SAC-130LN33-100" },
      { id: "sac-130ln33-300", name: "300 sacs", price: 11500, stock: 300, sku: "SAC-130LN33-300" },
      { id: "sac-130ln33-600", name: "600 sacs", price: 21500, stock: 200, sku: "SAC-130LN33-600" },
    ],
    price: 4200,
    tags: ["sacs poubelle", "130L", "noir", "33 microns"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // =========================================================
  // CONSOMMABLES — Tablette
  // =========================================================

  {
    id: "tablette-lave-vaisselle",
    slug: "tablette-lave-vaisselle",
    name: "Tablette lave-vaisselle",
    description: "Tablette lave-vaisselle tout-en-un. Action dégraissante puissante, compatible tous appareils. Parfaite pour les locations avec cuisine équipée.",
    short_description: "Tablette lave-vaisselle",
    category: "consommables",
    subcategory: "Tablette",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-51-51-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-51-51.jpg`,
    ],
    variants: [
      { id: "con-tab-lv-100", name: "100 tablettes", price: 1900, stock: 500, sku: "CON-TAB-LV-100" },
      { id: "con-tab-lv-300", name: "300 tablettes", price: 4900, stock: 300, sku: "CON-TAB-LV-300" },
      { id: "con-tab-lv-600", name: "600 tablettes", price: 8900, stock: 200, sku: "CON-TAB-LV-600" },
    ],
    price: 1900,
    tags: ["tablettes", "lave-vaisselle", "entretien"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "tablette-linge",
    slug: "tablette-linge-lessive",
    name: "Tablette linge (lessive)",
    description: "Tablette linge (lessive). Dosage précis, efficace dès 30°C, compatible tous types de linge. Idéale pour les appartements et hôtels avec lave-linge.",
    short_description: "Tablette linge (lessive)",
    category: "consommables",
    subcategory: "Tablette",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-51-51-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-51-51.jpg`,
    ],
    variants: [
      { id: "con-tab-lin-100", name: "100 tablettes", price: 2100, stock: 500, sku: "CON-TAB-LIN-100" },
      { id: "con-tab-lin-300", name: "300 tablettes", price: 5500, stock: 300, sku: "CON-TAB-LIN-300" },
      { id: "con-tab-lin-600", name: "600 tablettes", price: 9900, stock: 200, sku: "CON-TAB-LIN-600" },
    ],
    price: 2100,
    tags: ["tablettes", "linge", "lessive", "entretien"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // =========================================================
  // CONSOMMABLES — Pastille
  // =========================================================

  {
    id: "pastille-lave-vaisselle",
    slug: "pastille-lave-vaisselle",
    name: "Pastille lave-vaisselle",
    description: "Pastille lave-vaisselle. Format compact, dissolution rapide, action dégraissante efficace. Compatible tous appareils.",
    short_description: "Pastille lave-vaisselle",
    category: "consommables",
    subcategory: "Pastille",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-51-51-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-51-51.jpg`,
    ],
    variants: [
      { id: "con-pas-lv-100", name: "100 pastilles", price: 1800, stock: 500, sku: "CON-PAS-LV-100" },
      { id: "con-pas-lv-300", name: "300 pastilles", price: 4700, stock: 300, sku: "CON-PAS-LV-300" },
      { id: "con-pas-lv-600", name: "600 pastilles", price: 8500, stock: 200, sku: "CON-PAS-LV-600" },
    ],
    price: 1800,
    tags: ["pastilles", "lave-vaisselle", "entretien"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "pastille-linge",
    slug: "pastille-linge-lessive",
    name: "Pastille linge (lessive)",
    description: "Pastille linge (lessive). Pratique, pré-dosée, efficace sur toutes les taches. Idéale pour les locations avec lave-linge.",
    short_description: "Pastille linge (lessive)",
    category: "consommables",
    subcategory: "Pastille",
    images: [
      `${IMG}/PHOTO-2026-02-03-09-51-51-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-09-51-51.jpg`,
    ],
    variants: [
      { id: "con-pas-lin-100", name: "100 pastilles", price: 2000, stock: 500, sku: "CON-PAS-LIN-100" },
      { id: "con-pas-lin-300", name: "300 pastilles", price: 5200, stock: 300, sku: "CON-PAS-LIN-300" },
      { id: "con-pas-lin-600", name: "600 pastilles", price: 9500, stock: 200, sku: "CON-PAS-LIN-600" },
    ],
    price: 2000,
    tags: ["pastilles", "linge", "lessive", "entretien"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // =========================================================
  // CONSOMMABLES — Capsule café
  // =========================================================

  {
    id: "capsule-cafe-aluminium",
    slug: "capsule-cafe-aluminium",
    name: "Capsule café aluminium",
    description: "Capsule café aluminium. Conservation optimale des arômes, compatibles avec les machines standards. La qualité pour vos hôtes.",
    short_description: "Capsule café aluminium",
    category: "consommables",
    subcategory: "Capsule café",
    images: [
      `${IMG}/PHOTO-2026-02-03-11-23-06-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-11-23-06.jpg`,
    ],
    variants: [
      { id: "con-cap-alu-100", name: "100 capsules", price: 3900, stock: 500, sku: "CON-CAP-ALU-100" },
      { id: "con-cap-alu-300", name: "300 capsules", price: 10900, stock: 300, sku: "CON-CAP-ALU-300" },
      { id: "con-cap-alu-600", name: "600 capsules", price: 19900, stock: 200, sku: "CON-CAP-ALU-600" },
    ],
    price: 3900,
    tags: ["capsules", "café", "aluminium"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "capsule-cafe-plastique",
    slug: "capsule-cafe-plastique",
    name: "Capsule café plastique",
    description: "Capsule café plastique. Compatible avec les machines standards, rapport qualité-prix optimal. Idéale pour les commandes en grand volume.",
    short_description: "Capsule café plastique",
    category: "consommables",
    subcategory: "Capsule café",
    images: [
      `${IMG}/PHOTO-2026-02-03-11-23-06-removebg-preview.png`,
      `${IMG}/PHOTO-2026-02-03-11-23-06.jpg`,
    ],
    variants: [
      { id: "con-cap-pla-100", name: "100 capsules", price: 3200, stock: 500, sku: "CON-CAP-PLA-100" },
      { id: "con-cap-pla-300", name: "300 capsules", price: 8900, stock: 300, sku: "CON-CAP-PLA-300" },
      { id: "con-cap-pla-600", name: "600 capsules", price: 16500, stock: 200, sku: "CON-CAP-PLA-600" },
    ],
    price: 3200,
    tags: ["capsules", "café", "plastique"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // =========================================================
  // CONSOMMABLES — Éponge
  // =========================================================

  {
    id: "eponge-standard",
    slug: "eponge-standard",
    name: "Éponge standard",
    description: "Éponge standard double face — côté doux / côté grattant. Résistante et efficace pour la vaisselle et le nettoyage des surfaces.",
    short_description: "Éponge standard",
    category: "consommables",
    subcategory: "Éponge",
    images: [
      `${IMG}/PHOTO-2026-02-03-14-59-07.jpg`,
      `${IMG}/HD_carre9-scaled.jpg`,
    ],
    variants: [
      { id: "con-epo-std-100", name: "100 éponges", price: 2900, stock: 500, sku: "CON-EPO-STD-100" },
      { id: "con-epo-std-300", name: "300 éponges", price: 7900, stock: 300, sku: "CON-EPO-STD-300" },
      { id: "con-epo-std-600", name: "600 éponges", price: 14900, stock: 200, sku: "CON-EPO-STD-600" },
    ],
    price: 2900,
    tags: ["éponges", "vaisselle", "nettoyage"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "eponge-individuelle",
    slug: "eponge-emballage-individuel",
    name: "Éponge avec emballage individuel",
    description: "Éponge avec emballage individuel. Hygiénique, propre à la pose, idéale pour les locations courte durée où l'hygiène est primordiale.",
    short_description: "Éponge avec emballage individuel",
    category: "consommables",
    subcategory: "Éponge",
    images: [
      `${IMG}/PHOTO-2026-02-03-14-59-07.jpg`,
      `${IMG}/HD_carre9-scaled.jpg`,
    ],
    variants: [
      { id: "con-epo-ind-100", name: "100 éponges", price: 3500, stock: 500, sku: "CON-EPO-IND-100" },
      { id: "con-epo-ind-300", name: "300 éponges", price: 9500, stock: 300, sku: "CON-EPO-IND-300" },
      { id: "con-epo-ind-600", name: "600 éponges", price: 17500, stock: 200, sku: "CON-EPO-IND-600" },
    ],
    price: 3500,
    tags: ["éponges", "individuel", "hygiénique", "vaisselle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

// =========================================================
// HELPERS
// =========================================================

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
