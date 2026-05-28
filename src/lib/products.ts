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
    name: "Kit Salle de Bain",
    description:
      "Un kit essentiel, simple et efficace\nPensé spécialement pour les locations courte durée, ce kit contient tout le nécessaire pour que vos voyageurs se sentent immédiatement à l'aise dès leur arrivée.\n\nIl comprend :\n• **Gel douche 30 ml** x1\n• **Shampoing 30 ml** x1\n• **Vanity kit** x1\n• **Savon 20 g** x1\n\n|||\n\nChaque élément est sélectionné pour répondre aux besoins réels d'un séjour, qu'il soit court ou prolongé.\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être déposés dans votre salle de bain. Aucune préparation supplémentaire n'est nécessaire : vous gagnez du temps tout en garantissant un accueil professionnel et soigné.\n\nOffrez une première impression irréprochable\nUn voyageur remarque toujours la salle de bain en premier. Propreté, praticité, petites attentions… Ce sont ces détails qui rassurent et marquent les esprits.\nAvec notre Kit Salle de Bain Mon Petit Parfait, vous assurez à vos hôtes un accueil soigné, professionnel et confortable dès leur arrivée.",
    short_description: "• 1 Gel douche 30 ml · • 1 Shampoing 30 ml · • 1 Vanity Kit · • 1 Savon 20 g",
    category: "kits",
    subcategory: "Kit Salle de Bain",
    images: [
      "/images/produits/kit-sdb.jpg",
      "/images/produits/kit-sdb-2.jpg",
      "/images/produits/kit-sdb-3.jpg",
      "/images/produits/kit-sdb-4.jpg",
      "/images/produits/kit-sdb-5.jpg",
    ],
    variants: [
      { id: "kit-sdb-100", name: "100 kits", price: 11900, stock: 500, sku: "KIT-SDB-100" },
      { id: "kit-sdb-200", name: "200 kits", price: 17800, stock: 300, sku: "KIT-SDB-200" },
      { id: "kit-sdb-500", name: "500 kits", price: 34500, stock: 200, sku: "KIT-SDB-500" },
    ],
    price: 11900,
    tags: ["salle de bain", "savon", "shampoing", "vanity", "toilette", "accueil"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-salle-de-bain-2",
    slug: "kit-salle-de-bain-2",
    name: "Kit Salle de Bain — Gamme 2",
    description: "",
    short_description: "",
    category: "kits",
    subcategory: "Kit Salle de Bain",
    images: ["/images/produits/sdb-gamme2.jpeg"],
    variants: [{ id: "kit-sdb2-100", name: "100 kits", price: 0, stock: 0, sku: "KIT-SDB2-100" }],
    price: 0,
    tags: [],
    is_featured: false,
    is_active: false,
    coming_soon: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-salle-de-bain-3",
    slug: "kit-salle-de-bain-3",
    name: "Kit Salle de Bain — Gamme 3",
    description: "",
    short_description: "",
    category: "kits",
    subcategory: "Kit Salle de Bain",
    images: ["/images/produits/sdb-gamme3.jpeg"],
    variants: [{ id: "kit-sdb3-100", name: "100 kits", price: 0, stock: 0, sku: "KIT-SDB3-100" }],
    price: 0,
    tags: [],
    is_featured: false,
    is_active: false,
    coming_soon: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-capsule-cafe",
    slug: "kit-capsule-cafe",
    name: "Kit Capsule Café",
    description:
      "Le petit geste qui fait toujours plaisir\nAprès un trajet parfois long, quoi de plus agréable qu'un café prêt à déguster ? Avec notre Kit Capsules de Café Mon Petit Parfait, vous offrez à vos voyageurs une attention simple mais particulièrement appréciée.\nUn détail qui crée immédiatement une sensation d'accueil chaleureux et attentionné.\n\nUn indispensable pour bien commencer la journée\nCe kit comprend :\n• **Capsules de café** x3\n\n|||\n\nIl permet à vos hôtes de profiter d'un moment de détente dès leur arrivée ou au réveil, sans avoir à courir au supermarché.\n\nPourquoi proposer un kit café ?\n• Apporte une touche conviviale à votre accueil\n• Crée un effet \"comme à la maison\"\n• Valorise votre logement à moindre coût\n• Encourage des avis positifs\nCe sont souvent les petites attentions qui marquent le plus.\n\nPrêt à déposer, prêt à savourer\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être installés dans votre cuisine. Aucune organisation supplémentaire : vous les recevez, vous les disposez, et l'accueil est prêt.\nSimple, efficace et toujours apprécié.",
    short_description: "• 3 capsules de café",
    category: "kits",
    subcategory: "Kit Capsule Café",
    images: [
      "/images/produits/kit-cafe.jpg",
      "/images/produits/kit-cafe-2.jpg",
      "/images/produits/kit-cafe-3.jpg",
    ],
    variants: [
      { id: "kit-caf-100", name: "100 kits", price: 10900, stock: 500, sku: "KIT-CAF-100" },
      { id: "kit-caf-300", name: "300 kits", price: 28200, stock: 300, sku: "KIT-CAF-300" },
      { id: "kit-caf-500", name: "500 kits", price: 39500, stock: 200, sku: "KIT-CAF-500" },
    ],
    price: 10900,
    tags: ["capsules", "café", "accueil", "boisson"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-1",
    slug: "kit-gourmand-formule-1",
    name: "Kit Gourmand — L'Instant Douceur",
    description:
      "La touche qui transforme un simple séjour en belle expérience\nUn petit geste peut créer une grande différence. Avec notre Kit Gourmand Mon Petit Parfait, vous offrez à vos voyageurs une attention délicate qui marque les esprits dès leur arrivée.\nC'est ce détail inattendu qui crée un effet de surprise et donne immédiatement le sentiment d'être attendu.\n\nUn accueil chaleureux et attentionné\nNotre kit gourmand est soigneusement préparé pour offrir un moment de détente et de convivialité. Il contient :\n• **Café soluble** x2\n• **Thé vert** x1\n• **Thé noir** x1\n• **Sucre** x2\n• **Touillette** x2\n• **Biscuit Lotus** x2\n\n|||\n\nUn assortiment simple, efficace et apprécié, parfait pour accompagner une pause café ou thé après un trajet.\n\nPourquoi proposer un kit gourmand ?\n• Crée un effet \"waouh\" dès l'entrée\n• Apporte une touche conviviale et soignée\n• Renforce l'image professionnelle de votre logement\n• Favorise les avis positifs\nCes petites attentions font souvent toute la différence dans l'expérience globale du séjour.\n\nPrêt à déposer, prêt à savourer\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être disposés dans votre logement. Aucune préparation nécessaire : vous les installez et l'accueil est immédiatement valorisé.\nUn petit plus simple… qui laisse un grand souvenir.",
    short_description: "• 2 cafés solubles · • 1 thé vert · • 1 thé noir · • 2 sucres · • 2 touillettes · • 2 gâteaux",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      "/images/produits/kit-gourmand-1.jpg",
    ],
    variants: [
      { id: "kit-grm1-108", name: "108 kits", price: 12852, stock: 500, sku: "KIT-GRM1-108" },
      { id: "kit-grm1-216", name: "216 kits", price: 21384, stock: 300, sku: "KIT-GRM1-216" },
      { id: "kit-grm1-432", name: "432 kits", price: 34128, stock: 200, sku: "KIT-GRM1-432" },
    ],
    price: 12852,
    tags: ["café soluble", "thé", "biscuits", "gourmand", "accueil", "welcome"],
    is_featured: true,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-2",
    slug: "kit-gourmand-formule-2",
    name: "Kit Gourmand — Le Raffiné",
    description:
      "La touche qui transforme un simple séjour en belle expérience\nUn petit geste peut créer une grande différence. Avec notre Kit Gourmand Mon Petit Parfait, vous offrez à vos voyageurs une attention délicate qui marque les esprits dès leur arrivée.\nC'est ce détail inattendu qui crée un effet de surprise et donne immédiatement le sentiment d'être attendu.\n\nUn accueil chaleureux et attentionné\nNotre kit gourmand est soigneusement préparé pour offrir un moment de détente et de convivialité. Il contient :\n• **Capsule de café** x2\n• **Thé noir** x1\n• **Thé vert** x1\n• **Sucre** x2\n• **Touillette** x2\n• **Gâteau** x2\n\n|||\n\nUn assortiment simple, efficace et apprécié, parfait pour accompagner une pause café ou thé après un trajet.\n\nPourquoi proposer un kit gourmand ?\n• Crée un effet \"waouh\" dès l'entrée\n• Apporte une touche conviviale et soignée\n• Renforce l'image professionnelle de votre logement\n• Favorise les avis positifs\nCes petites attentions font souvent toute la différence dans l'expérience globale du séjour.\n\nPrêt à déposer, prêt à savourer\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être disposés dans votre logement. Aucune préparation nécessaire : vous les installez et l'accueil est immédiatement valorisé.\nUn petit plus simple… qui laisse un grand souvenir.",
    short_description: "• 2 capsules de café · • 1 thé noir · • 1 thé vert · • 2 sucres · • 2 touillettes · • 2 gâteaux",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      "/images/produits/kit-gourmand-2.jpg",
    ],
    variants: [
      { id: "kit-grm2-108", name: "108 kits", price: 13932, stock: 500, sku: "KIT-GRM2-108" },
      { id: "kit-grm2-216", name: "216 kits", price: 24624, stock: 300, sku: "KIT-GRM2-216" },
      { id: "kit-grm2-432", name: "432 kits", price: 38448, stock: 200, sku: "KIT-GRM2-432" },
    ],
    price: 13932,
    tags: ["capsules café", "thé", "biscuits", "gourmand", "accueil"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-3",
    slug: "kit-gourmand-formule-3",
    name: "Kit Gourmand — Le Barista",
    description:
      "La touche qui transforme un simple séjour en belle expérience\nUn petit geste peut créer une grande différence. Avec notre Kit Gourmand Mon Petit Parfait, vous offrez à vos voyageurs une attention délicate qui marque les esprits dès leur arrivée.\nC'est ce détail inattendu qui crée un effet de surprise et donne immédiatement le sentiment d'être attendu.\n\nUn accueil chaleureux et attentionné\nNotre kit gourmand est soigneusement préparé pour offrir un moment de détente et de convivialité. Il contient :\n• **Capsule de café** x4\n• **Thé noir** x1\n• **Thé vert** x1\n• **Sucre** x2\n• **Touillette** x2\n\n|||\n\nUn assortiment simple, efficace et apprécié, parfait pour accompagner une pause café ou thé après un trajet.\n\nPourquoi proposer un kit gourmand ?\n• Crée un effet \"waouh\" dès l'entrée\n• Apporte une touche conviviale et soignée\n• Renforce l'image professionnelle de votre logement\n• Favorise les avis positifs\nCes petites attentions font souvent toute la différence dans l'expérience globale du séjour.\n\nPrêt à déposer, prêt à savourer\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être disposés dans votre logement. Aucune préparation nécessaire : vous les installez et l'accueil est immédiatement valorisé.\nUn petit plus simple… qui laisse un grand souvenir.",
    short_description: "• 4 capsules de café · • 1 thé noir · • 1 thé vert · • 2 sucres · • 2 touillettes",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      "/images/produits/kit-gourmand-3.jpg",
    ],
    variants: [
      { id: "kit-grm3-108", name: "108 kits", price: 15012, stock: 500, sku: "KIT-GRM3-108" },
      { id: "kit-grm3-216", name: "216 kits", price: 27000, stock: 300, sku: "KIT-GRM3-216" },
      { id: "kit-grm3-432", name: "432 kits", price: 50544, stock: 200, sku: "KIT-GRM3-432" },
    ],
    price: 15012,
    tags: ["capsules café", "thé", "gourmand", "accueil", "sans gâteaux"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-gourmand-4",
    slug: "kit-gourmand-formule-4",
    name: "Kit Gourmand — Le Gourmet",
    description:
      "La touche qui transforme un simple séjour en belle expérience\nUn petit geste peut créer une grande différence. Avec notre Kit Gourmand Mon Petit Parfait, vous offrez à vos voyageurs une attention délicate qui marque les esprits dès leur arrivée.\nC'est ce détail inattendu qui crée un effet de surprise et donne immédiatement le sentiment d'être attendu.\n\nUn accueil chaleureux et attentionné\nNotre kit gourmand est soigneusement préparé pour offrir un moment de détente et de convivialité. Il contient :\n• **Capsule de café** x4\n• **Thé vert** x1\n• **Thé noir** x1\n• **Touillette** x2\n• **Gâteau** x2\n\n|||\n\nUn assortiment simple, efficace et apprécié, parfait pour accompagner une pause café ou thé après un trajet.\n\nPourquoi proposer un kit gourmand ?\n• Crée un effet \"waouh\" dès l'entrée\n• Apporte une touche conviviale et soignée\n• Renforce l'image professionnelle de votre logement\n• Favorise les avis positifs\nCes petites attentions font souvent toute la différence dans l'expérience globale du séjour.\n\nPrêt à déposer, prêt à savourer\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être disposés dans votre logement. Aucune préparation nécessaire : vous les installez et l'accueil est immédiatement valorisé.\nUn petit plus simple… qui laisse un grand souvenir.",
    short_description: "• 4 capsules de café · • 1 thé vert · • 1 thé noir · • 2 touillettes · • 2 gâteaux",
    category: "kits",
    subcategory: "Kit Gourmand",
    images: [
      "/images/produits/kit-gourmand-4.jpg",
    ],
    variants: [
      { id: "kit-grm4-108", name: "108 kits", price: 16092, stock: 500, sku: "KIT-GRM4-108" },
      { id: "kit-grm4-216", name: "216 kits", price: 30024, stock: 300, sku: "KIT-GRM4-216" },
      { id: "kit-grm4-432", name: "432 kits", price: 52704, stock: 200, sku: "KIT-GRM4-432" },
    ],
    price: 16092,
    tags: ["capsules café", "thé", "biscuits", "gourmand", "sans sucre", "accueil"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-1",
    slug: "kit-entretien-formule-1",
    name: "Kit Entretien — L'Essentiel",
    description:
      "La propreté comme signature de votre accueil\nUn logement impeccable rassure immédiatement vos voyageurs. Avec notre Kit Entretien Mon Petit Parfait, vous garantissez praticité et confort dès le premier jour.\nPensé pour les locations courte durée, ce kit regroupe les essentiels pour maintenir un espace propre et agréable tout au long du séjour. Il permet à vos hôtes de se sentir autonomes et à l'aise, comme chez eux. Un environnement bien entretenu contribue directement à une expérience positive et à des avis favorables.\n\nIl comprend :\n• **Éponge** x1\n• **Liquide vaisselle** x1\n• **Sac poubelle 10 L** x1\n• **Sac poubelle 50 L** x1\n\n|||\n\nChaque élément est sélectionné pour répondre aux besoins quotidiens de vos hôtes, sans superflu.\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être déposés dans la cuisine ou l'espace ménage. Aucune préparation supplémentaire : vous gagnez du temps tout en assurant un accueil professionnel.\nUn détail discret, mais essentiel pour valoriser votre logement et améliorer durablement l'expérience client.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      "/images/produits/kit-entretien-1.jpg",
    ],
    variants: [
      { id: "kit-ent1-100", name: "100 kits", price: 11900, stock: 500, sku: "KIT-ENT1-100" },
      { id: "kit-ent1-200", name: "200 kits", price: 17800, stock: 300, sku: "KIT-ENT1-300" },
      { id: "kit-ent1-500", name: "500 kits", price: 34500, stock: 200, sku: "KIT-ENT1-600" },
    ],
    price: 11900,
    tags: ["entretien", "éponge", "vaisselle", "sacs poubelle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-2",
    slug: "kit-entretien-formule-2",
    name: "Kit Entretien — Le Complet",
    description:
      "La propreté comme signature de votre accueil\nUn logement impeccable rassure immédiatement vos voyageurs. Avec notre Kit Entretien Mon Petit Parfait, vous garantissez praticité et confort dès le premier jour.\nPensé pour les locations courte durée, ce kit regroupe les essentiels pour maintenir un espace propre et agréable tout au long du séjour. Il permet à vos hôtes de se sentir autonomes et à l'aise, comme chez eux. Un environnement bien entretenu contribue directement à une expérience positive et à des avis favorables.\n\nIl comprend :\n• **Éponge** x1\n• **Liquide vaisselle** x1\n• **Sac poubelle 10 L** x1\n• **Sac poubelle 50 L** x1\n• **Tablette lave-vaisselle** x1\n• **Tablette linge** x1\n\n|||\n\nChaque élément est sélectionné pour répondre aux besoins quotidiens de vos hôtes, sans superflu.\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être déposés dans la cuisine ou l'espace ménage. Aucune préparation supplémentaire : vous gagnez du temps tout en assurant un accueil professionnel.\nUn détail discret, mais essentiel pour valoriser votre logement et améliorer durablement l'expérience client.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L · • 1 tablette lave-vaisselle · • 1 tablette linge",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      "/images/produits/kit-entretien-2.jpg",
    ],
    variants: [
      { id: "kit-ent2-100", name: "100 kits", price: 13900, stock: 500, sku: "KIT-ENT2-100" },
      { id: "kit-ent2-200", name: "200 kits", price: 21800, stock: 300, sku: "KIT-ENT2-300" },
      { id: "kit-ent2-500", name: "500 kits", price: 49500, stock: 200, sku: "KIT-ENT2-600" },
    ],
    price: 13900,
    tags: ["entretien", "éponge", "vaisselle", "linge", "tablettes", "sacs poubelle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-3",
    slug: "kit-entretien-formule-3",
    name: "Kit Entretien — Le Confort +",
    description:
      "La propreté comme signature de votre accueil\nUn logement impeccable rassure immédiatement vos voyageurs. Avec notre Kit Entretien Mon Petit Parfait, vous garantissez praticité et confort dès le premier jour.\nPensé pour les locations courte durée, ce kit regroupe les essentiels pour maintenir un espace propre et agréable tout au long du séjour. Il permet à vos hôtes de se sentir autonomes et à l'aise, comme chez eux. Un environnement bien entretenu contribue directement à une expérience positive et à des avis favorables.\n\nIl comprend :\n• **Éponge** x1\n• **Liquide vaisselle** x1\n• **Sac poubelle 10 L** x1\n• **Sac poubelle 50 L** x1\n• **Tablette lave-vaisselle** x2\n• **Tablette lessive** x2\n\n|||\n\nChaque élément est sélectionné pour répondre aux besoins quotidiens de vos hôtes, sans superflu.\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être déposés dans la cuisine ou l'espace ménage. Aucune préparation supplémentaire : vous gagnez du temps tout en assurant un accueil professionnel.\nUn détail discret, mais essentiel pour valoriser votre logement et améliorer durablement l'expérience client.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L · • 2 tablettes lave-vaisselle · • 2 tablettes lessive",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      "/images/produits/kit-entretien-3.jpg",
    ],
    variants: [
      { id: "kit-ent3-100", name: "100 kits", price: 18900, stock: 500, sku: "KIT-ENT3-100" },
      { id: "kit-ent3-200", name: "200 kits", price: 29800, stock: 300, sku: "KIT-ENT3-300" },
      { id: "kit-ent3-500", name: "500 kits", price: 64500, stock: 200, sku: "KIT-ENT3-600" },
    ],
    price: 18900,
    tags: ["entretien", "éponge", "vaisselle", "linge", "tablettes", "sacs poubelle"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "kit-entretien-4",
    slug: "kit-entretien-formule-4",
    name: "Kit Entretien — Le Premium",
    description:
      "La propreté comme signature de votre accueil\nUn logement impeccable rassure immédiatement vos voyageurs. Avec notre Kit Entretien Mon Petit Parfait, vous garantissez praticité et confort dès le premier jour.\nPensé pour les locations courte durée, ce kit regroupe les essentiels pour maintenir un espace propre et agréable tout au long du séjour. Il permet à vos hôtes de se sentir autonomes et à l'aise, comme chez eux. Un environnement bien entretenu contribue directement à une expérience positive et à des avis favorables.\n\nIl comprend :\n• **Éponge** x1\n• **Liquide vaisselle** x1\n• **Sac poubelle 10 L** x1\n• **Sac poubelle 50 L** x1\n• **Pods vaisselle** x1\n• **Pods linge** x1\n\n|||\n\nChaque élément est sélectionné pour répondre aux besoins quotidiens de vos hôtes, sans superflu.\nNos kits sont préparés avec soin, conditionnés et livrés prêts à être déposés dans la cuisine ou l'espace ménage. Aucune préparation supplémentaire : vous gagnez du temps tout en assurant un accueil professionnel.\nUn détail discret, mais essentiel pour valoriser votre logement et améliorer durablement l'expérience client.",
    short_description: "• 1 éponge · • 1 liquide vaisselle · • 1 sac 50 L · • 1 sac 10 L · • 1 pods vaisselle · • 1 pods linge",
    category: "kits",
    subcategory: "Kit Entretien",
    images: [
      "/images/produits/kit-entretien-4.jpg",
    ],
    variants: [
      { id: "kit-ent4-100", name: "100 kits", price: 14900, stock: 500, sku: "KIT-ENT4-100" },
      { id: "kit-ent4-200", name: "200 kits", price: 23800, stock: 300, sku: "KIT-ENT4-300" },
      { id: "kit-ent4-500", name: "500 kits", price: 54500, stock: 200, sku: "KIT-ENT4-600" },
    ],
    price: 14900,
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
      "L'essuie-tout PP x4 est conçu pour répondre efficacement aux besoins du quotidien grâce à sa texture 2 plis alliant résistance et pouvoir absorbant. Pratique et polyvalent, il convient aussi bien à un usage domestique qu'aux espaces professionnels nécessitant un nettoyage rapide et efficace.\n\nAvec son format de 220 mm x 210 mm et sa qualité de fabrication soignée, il permet d'absorber facilement liquides, éclaboussures et salissures tout en offrant une bonne tenue à l'utilisation.",
    short_description: "PAMP x4 — Qualité domestique, 2 plis, 39 g, 220 mm x 210 mm",
    category: "ouate",
    subcategory: "Essuie-tout",
    images: [
      "/images/produits/essuie-tout-1.jpg",
    ],
    variants: [
      { id: "oua-ess1-48",   name: "48 unités",   price: 4272,  stock: 500, sku: "OUA-ESS1-48" },
      { id: "oua-ess1-96",   name: "96 unités",   price: 6624,  stock: 500, sku: "OUA-ESS1-96" },
      { id: "oua-ess1-240",  name: "240 unités",  price: 14160, stock: 300, sku: "OUA-ESS1-240" },
      { id: "oua-ess1-1152", name: "1152 unités", price: 63360, stock: 200, sku: "OUA-ESS1-1152" },
    ],
    price: 4272,
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
      "Conçue pour les environnements exigeants, cette bobine d'essuie-main 2 plis offre une solution fiable et économique pour un usage professionnel intensif. Grâce à sa grande longueur de 200 mètres, elle garantit une excellente autonomie et réduit la fréquence de remplacement dans les espaces à forte utilisation.\n\nAvec son grammage de 400 g, elle assure une bonne résistance ainsi qu'un pouvoir absorbant efficace pour le séchage des mains et le nettoyage rapide des surfaces. Idéale pour les ateliers, cuisines professionnelles, collectivités, sanitaires ou espaces industriels.",
    short_description: "Essuie-main bobine — 2 plis, 200 m",
    category: "ouate",
    subcategory: "Essuie-tout",
    images: [
      "/images/produits/essuie-tout-2.jpg",
    ],
    variants: [
      { id: "oua-ess2-330", name: "330 unités", price: 59070, stock: 300, sku: "OUA-ESS2-330" },
    ],
    price: 59070,
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
      "Cette bobine individuelle à dévidage central est conçue pour offrir une distribution rapide et efficace dans les environnements professionnels à forte fréquentation. Son système de dévidage central facilite l'utilisation tout en améliorant l'hygiène et la praticité au quotidien.\n\nAvec une longueur de 200 mètres, un grammage de 410 g et une conception 2 plis, elle garantit une excellente capacité d'absorption ainsi qu'une bonne résistance à l'usage. Composée de 280 feuilles, elle convient parfaitement aux cuisines professionnelles, ateliers, sanitaires, collectivités et espaces nécessitant un essuyage fréquent.",
    short_description: "Bobine individuelle à dévidage central — 200 m",
    category: "ouate",
    subcategory: "Essuie-tout",
    images: [
      "/images/produits/essuie-tout-3.jpg",
    ],
    variants: [
      { id: "oua-ess3-336", name: "336 unités", price: 66864, stock: 300, sku: "OUA-ESS3-336" },
    ],
    price: 66864,
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
      "/images/produits/essuie-tout-4.jpg",
    ],
    variants: [
      { id: "oua-ess4-100", name: "100 unités", price: 4200, stock: 500, sku: "OUA-ESS4-100" },
      { id: "oua-ess4-300", name: "300 unités", price: 11500, stock: 300, sku: "OUA-ESS4-300" },
      { id: "oua-ess4-600", name: "600 unités", price: 21500, stock: 200, sku: "OUA-ESS4-600" },
    ],
    price: 4200,
    tags: ["essuie-tout", "pli en V", "distributeur", "professionnel"],
    is_featured: false,
    is_active: false,
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
      "Offrez à vos espaces sanitaires une solution fiable et agréable avec le papier toilette JL+ 2 plis. Conçu pour un usage régulier, il associe douceur, résistance et praticité afin de répondre aux besoins des professionnels comme des collectivités.\n\nGrâce à son format économique de 120 mm x 87 m et sa conception de qualité, il convient parfaitement aux établissements accueillant du public, aux bureaux, hôtels, restaurants ou espaces communs recherchant confort et performance au quotidien.",
    short_description: "Papier toilette JL+ — 2 plis, 120 mm x 87 m, 11,4 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      "/images/produits/papier-toilette-1.jpg",
    ],
    variants: [
      { id: "oua-ptt1-144",  name: "144 rouleaux",  price: 3600,  stock: 500, sku: "OUA-PTT1-144" },
      { id: "oua-ptt1-864",  name: "864 rouleaux",  price: 18144, stock: 300, sku: "OUA-PTT1-864" },
      { id: "oua-ptt1-1440", name: "1440 rouleaux", price: 28800, stock: 200, sku: "OUA-PTT1-1440" },
      { id: "oua-ptt1-3024", name: "3024 rouleaux", price: 57456, stock: 100, sku: "OUA-PTT1-3024" },
    ],
    price: 3600,
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
      "Le papier toilette S24 2 plis a été conçu pour les environnements à forte fréquentation nécessitant une solution pratique et durable. Avec son rouleau longue durée de 120 mm x 87 m et ses 13,4 mètres par rouleau, il permet de limiter les remplacements fréquents et d'optimiser la gestion des consommables.\n\nÀ la fois doux et résistant, il convient parfaitement aux hébergements touristiques, locations saisonnières, hôtels, bureaux ou établissements recevant un grand nombre d'utilisateurs au quotidien.",
    short_description: "Papier toilette S24 — 2 plis, 120 mm x 87 m, 13,4 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      "/images/produits/papier-toilette-2.jpg",
    ],
    variants: [
      { id: "oua-ptt2-144",  name: "144 rouleaux",  price: 4176,  stock: 500, sku: "OUA-PTT2-144" },
      { id: "oua-ptt2-864",  name: "864 rouleaux",  price: 21600, stock: 300, sku: "OUA-PTT2-864" },
      { id: "oua-ptt2-1440", name: "1440 rouleaux", price: 33120, stock: 200, sku: "OUA-PTT2-1440" },
      { id: "oua-ptt2-2880", name: "2880 rouleaux", price: 60480, stock: 100, sku: "OUA-PTT2-2880" },
    ],
    price: 4176,
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
      "Le papier toilette XXL+ 2 plis est spécialement conçu pour les établissements nécessitant une grande autonomie et une gestion simplifiée des consommables. Avec ses rouleaux de 30 mètres, il réduit considérablement la fréquence de remplacement tout en garantissant confort et résistance au quotidien.\n\nIdéal pour les hôtels, résidences, conciergeries et structures disposant de nombreux logements, ce format économique permet d'optimiser l'entretien des sanitaires tout en assurant une expérience agréable aux utilisateurs.",
    short_description: "Papier toilette XXL+ — 2 plis, 120 mm x 87 m, 30 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      "/images/produits/papier-toilette-3.jpg",
    ],
    variants: [
      { id: "oua-ptt3-2691", name: "2691 rouleaux", price: 107640, stock: 500, sku: "OUA-PTT3-2691" },
    ],
    price: 107640,
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
      "Apportez une touche de confort supplémentaire à vos espaces sanitaires avec le papier toilette Aloe Vera 3 plis. Conçu pour offrir une sensation de douceur exceptionnelle, il est enrichi à l'Aloe Vera afin d'assurer une utilisation agréable et plus délicate au quotidien.\n\nAvec son format de 136 mm x 90 et ses rouleaux de 23 mètres, il convient parfaitement aux établissements souhaitant proposer une expérience plus qualitative à leurs clients, notamment les hôtels, locations haut de gamme, maisons d'hôtes ou espaces premium.",
    short_description: "Papier toilette Aloe Vera — 3 plis, 136 mm x 90, 23 m/rouleau",
    category: "ouate",
    subcategory: "Papier toilette",
    images: [
      "/images/produits/papier-toilette-4.jpg",
    ],
    variants: [
      { id: "oua-ptt4-1807", name: "1807 rouleaux", price: 88543, stock: 500, sku: "OUA-PTT4-1807" },
    ],
    price: 88543,
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
    name: "Sacs poubelle blancs 10 L Haute Densité — Solides, Étanches et Pratiques",
    description: "Points forts :\n• **Capacité : 10 litres**\n• **Matière : polyéthylène haute densité (HD)**\n• **Couleur : blanc**\n• **Bonne résistance aux déchirures et perforations**\n• **Étanches et fiables au quotidien**\n• **Adaptés aux déchets non coupants et légers**\n• **Compatibles avec la majorité des petites poubelles et modèles à pédale**\n• **Utilisation professionnelle ou domestique**\n\nConditionnement :\n• **Colis de 1 000 sacs**\n• **Présentation en rouleaux : 20 rouleaux de 50 sacs**\n\n|||\n\nConçus pour les petites poubelles du quotidien, ces sacs poubelle 10 litres en haute densité offrent une solution fiable pour l'évacuation des déchets légers. Grâce à leur bonne résistance à la perforation et aux déchirures, ils conviennent parfaitement aux espaces sanitaires, bureaux, chambres d'hôtel ou salles de bain.\nFabriqués en polyéthylène haute densité (PEHD), ils combinent finesse, robustesse et excellente étanchéité afin d'éviter les fuites et les ruptures pendant l'utilisation. Leur coloris blanc apporte une finition propre et discrète, idéale pour les environnements professionnels comme domestiques.\nPolyvalents et faciles à utiliser, ces sacs sont adaptés aux corbeilles et petites poubelles de 3 à 10 litres.\n\nUtilisations recommandées :\n• Salles de bain\n• Toilettes\n• Bureaux\n• Hôtels\n• Cabinets médicaux\n• Espaces de restauration\n• Corbeilles à papier\n\nCompatibilité\nLeur format universel permet de les utiliser avec la plupart des poubelles à pédale ou petites corbeilles allant de 3 L à 10 L. Leur taille offre suffisamment d'aisance pour maintenir le sac correctement et faciliter la fermeture.",
    short_description: "10 L · Blanc · PEHD · 1 000 sacs/colis · 20 rouleaux de 50",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-10l-blanc.png',
    ],
    variants: [
      { id: "sac-10lb-1000", name: "1000 sacs", price: 3000, stock: 9999, sku: "SAC-10LB-1000" },
    ],
    price: 3000,
    tags: ["sacs poubelle", "10L", "blanc"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-30l-noir",
    slug: "sac-poubelle-30l-noir",
    name: "Sacs poubelle noirs 30 L — Résistants et pratiques au quotidien",
    description: "Caractéristiques :\n• **Capacité : 30 litres**\n• **Couleur : noir**\n• **Épaisseur : 12 microns**\n• **Conditionnement : 500 sacs par colis**\n• **Présentation : 20 rouleaux de 25 sacs**\n• **Bonne résistance à la perforation et aux déchirures**\n• **Adaptés aux usages professionnels et domestiques**\n\nIdéal pour :\n• **Hôtels et établissements d'accueil**\n• **Bureaux et espaces professionnels**\n• **Sanitaires et espaces communs**\n• **Usage quotidien à domicile**\n\n|||\n\nConçus pour une utilisation régulière, nos sacs poubelle noirs de 30 litres offrent une solution fiable pour la gestion des déchets en entreprise comme à la maison. Leur format polyvalent convient parfaitement aux bureaux, sanitaires, chambres d'hôtel ou espaces collectifs nécessitant un sac compact et robuste.\nFabriqués avec une épaisseur de 12 microns, ils assurent une bonne tenue face aux petits déchets du quotidien tout en limitant les risques de déchirure ou de fuite. Leur matière en polyéthylène garantit une excellente imperméabilité ainsi qu'une résistance renforcée lors de la manipulation et du transport.\nChaque carton contient 500 sacs conditionnés en rouleaux pratiques de 25 unités, pour une distribution simple et un stockage optimisé.",
    short_description: "30 L · Noir · 12 microns · 500 sacs/colis · 20 rouleaux de 25",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-30l-noir.png',
    ],
    variants: [
      { id: "sac-30ln-1000", name: "1000 sacs", price: 6000, stock: 9999, sku: "SAC-30LN-1000" },
    ],
    price: 6000,
    tags: ["sacs poubelle", "30L", "noir"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-50l-blanc",
    slug: "sac-poubelle-50l-blanc",
    name: "Sacs poubelle blancs 50 L — Performance et fiabilité pour un usage professionnel",
    description: "Caractéristiques :\n• **Capacité : 50 litres**\n• **Couleur : blanc**\n• **Matière : polyéthylène haute densité (PEHD)**\n• **Conditionnement : carton de 500 sacs**\n• **Bonne résistance à la perforation et à l'usure**\n• **Fermeture solide et utilisation simple**\n• **Conçus pour les déchets légers du quotidien**\n\nUtilisations recommandées :\n• **Cabinets médicaux et laboratoires**\n• **Restaurants et cuisines professionnelles**\n• **Bureaux et espaces administratifs**\n• **Collectivités et espaces communs**\n\n|||\n\nNos sacs poubelle blancs de 50 litres sont conçus pour répondre aux besoins des environnements exigeants tels que les cuisines, espaces de travail, établissements médicaux ou collectivités. Leur conception en polyéthylène haute densité offre un excellent compromis entre légèreté, résistance et efficacité au quotidien.\nGrâce à leur structure renforcée, ces sacs assurent une très bonne résistance aux perforations et aux déchirures, même lors des manipulations fréquentes. Leur forte étanchéité limite les risques de fuite, tandis que leur lien de fermeture robuste permet une fermeture rapide et sécurisée.\nParfaits pour la collecte des déchets légers, ils représentent une solution économique et pratique pour les professionnels souhaitant optimiser la gestion de leurs déchets sans compromettre la qualité.\n\nUne solution fiable, hygiénique et économique pour assurer la propreté de vos espaces professionnels jour après jour.",
    short_description: "50 L · Blanc · PEHD · 500 sacs/carton · Résistant et étanche",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-50l-blanc.png',
    ],
    variants: [
      { id: "sac-50lb-500", name: "500 sacs", price: 4500, stock: 9999, sku: "SAC-50LB-500" },
    ],
    price: 4500,
    tags: ["sacs poubelle", "50L", "blanc"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-50l-noir",
    slug: "sac-poubelle-50l-noir",
    name: "Sacs poubelle noirs 50 L — Grande capacité et résistance renforcée",
    description: "Caractéristiques :\n• **Capacité : 50 litres**\n• **Couleur : noir**\n• **Conditionnement : 500 sacs par colis**\n• **Présentation en rouleaux pratiques**\n• **Haute résistance à la perforation et aux déchirures**\n• **Bonne étanchéité pour limiter les fuites**\n• **Fermeture solide pour une manipulation facilitée**\n\nConvient parfaitement pour :\n• **Bureaux et espaces professionnels**\n• **Lieux publics et collectivités**\n• **Usage domestique**\n• **Gestion des déchets courants**\n\n|||\n\nPensés pour un usage quotidien intensif, nos sacs poubelle noirs de 50 litres offrent une solution pratique et fiable pour la collecte des déchets dans les espaces professionnels comme domestiques. Leur format standard s'adapte parfaitement aux poubelles de taille moyenne utilisées dans les bureaux, collectivités, lieux publics ou habitations.\nConçus pour supporter les déchets légers à moyennement lourds, ces sacs bénéficient d'une excellente résistance aux perforations, aux déchirures et aux risques de fuite. Leur matière robuste assure une étanchéité optimale, tandis que leur lien de fermeture solide facilite la manipulation et le transport des déchets en toute sécurité.\nConditionnés en rouleaux pour une utilisation simple et rapide, ils représentent une solution efficace pour maintenir vos espaces propres au quotidien.\n\nDes sacs poubelle fiables et résistants, conçus pour simplifier la gestion de vos déchets au quotidien.",
    short_description: "50 L · Noir · 500 sacs/colis · Rouleaux · Haute résistance",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-50l-noir.png',
    ],
    variants: [
      { id: "sac-50ln-500", name: "500 sacs", price: 6000, stock: 9999, sku: "SAC-50LN-500" },
    ],
    price: 6000,
    tags: ["sacs poubelle", "50L", "noir"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-100l-noir",
    slug: "sac-poubelle-100l-noir",
    name: "Sacs poubelle 100 L — Usage professionnel et haute résistance",
    description: "Caractéristiques :\n• **Capacité : 100 litres**\n• **Épaisseur : 32 microns**\n• **Adaptés aux déchets ménagers et alimentaires**\n• **Grande résistance aux étirements et perforations**\n• **Qualité professionnelle**\n• **Conditionnement : 200 sacs par carton**\n• **Présentation : 8 rouleaux de 25 sacs**\n\nUtilisations recommandées :\n• **Collectivités et établissements publics**\n• **Entreprises de nettoyage**\n• **Restaurants et cuisines professionnelles**\n• **Locaux professionnels et espaces communs**\n\n|||\n\nNos sacs poubelle de 100 litres sont spécialement conçus pour répondre aux besoins des professionnels exigeant solidité, praticité et grande capacité de stockage. Avec leur épaisseur de 32 microns, ils conviennent parfaitement à la collecte des déchets courants ainsi qu'aux déchets alimentaires.\nAppréciés dans les collectivités, entreprises de nettoyage, cuisines professionnelles ou espaces à fort passage, ces sacs offrent une excellente résistance aux chocs, aux étirements et aux manipulations répétées. Leur conception robuste permet de limiter les risques de déchirure tout en garantissant une bonne étanchéité pendant le transport des déchets.\nGrâce à leur grand format, ils facilitent la gestion quotidienne des volumes importants tout en assurant un excellent compromis entre performance et coût.\n\nUne solution fiable et économique pour optimiser la collecte et le transport de vos déchets au quotidien.",
    short_description: "100 L · Noir · 32 microns · 200 sacs/carton · 8 rouleaux de 25",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-100l-noir.png',
    ],
    variants: [
      { id: "sac-100ln-100", name: "100 sacs", price: 1700, stock: 9999, sku: "SAC-100LN-100" },
    ],
    price: 1700,
    tags: ["sacs poubelle", "100L", "noir"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-110l-blanc",
    slug: "sac-poubelle-110l-blanc",
    name: "Sacs poubelle 110 L — Grande capacité et usage professionnel",
    description: "Caractéristiques :\n• **Capacité : 110 litres**\n• **Haute résistance à la perforation et aux déchirures**\n• **Étanchéité renforcée**\n• **Fermeture solide et pratique**\n• **Qualité professionnelle**\n• **Conditionnement : 200 sacs par carton**\n• **Présentation : 8 rouleaux de 25 sacs**\n\nUtilisations recommandées :\n• **Bureaux et locaux professionnels**\n• **Collectivités et espaces publics**\n• **Entrepôts et zones de stockage**\n• **Usage domestique et grands volumes de déchets**\n\n|||\n\nConçus pour la collecte des déchets légers, nos sacs poubelle de 110 litres offrent une solution pratique, résistante et adaptée aux besoins des professionnels comme des particuliers. Leur grand format permet de gérer efficacement des volumes importants tout en garantissant une manipulation simple et sécurisée.\nFabriqués dans une qualité professionnelle, ces sacs disposent d'une excellente résistance aux déchirures et aux perforations afin de limiter les incidents lors du remplissage ou du transport. Leur conception étanche associée à un lien de fermeture robuste assure un maintien fiable des déchets au quotidien.\nPolyvalents, ils conviennent aussi bien aux environnements professionnels à forte utilisation qu'aux besoins domestiques nécessitant une grande capacité de stockage ou de collecte.\n\nDes sacs robustes et fiables pour une gestion des déchets efficace, même en utilisation intensive.",
    short_description: "110 L · Blanc · 200 sacs/carton · 8 rouleaux de 25 · Qualité pro",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-100l-blanc.png',
    ],
    variants: [
      { id: "sac-110lb-100", name: "100 sacs", price: 1900, stock: 9999, sku: "SAC-110LB-100" },
    ],
    price: 1900,
    tags: ["sacs poubelle", "110L", "blanc"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-130l-noir-44",
    slug: "sac-poubelle-130l-noir-44",
    name: "Sacs poubelle 130 L — Ultra résistants pour usage intensif",
    description: "Caractéristiques :\n• **Capacité : 130 litres**\n• **Épaisseur : 44 microns**\n• **Haute résistance à la déchirure et à la perforation**\n• **Étanchéité renforcée**\n• **Fermeture solide et pratique**\n• **Qualité professionnelle**\n• **Conditionnement : 100 sacs par carton**\n\nIdéal pour :\n• **Sociétés de nettoyage**\n• **Restaurants et cuisines professionnelles**\n• **Entreprises et collectivités**\n• **Utilisation domestique intensive**\n\n|||\n\nNos sacs poubelle de 130 litres sont conçus pour répondre aux besoins des professionnels recherchant une solution fiable, robuste et adaptée aux volumes importants de déchets. Avec leur épaisseur de 44 microns, ils assurent une excellente résistance pour une utilisation intensive au quotidien.\nParfaits pour les déchets courants et alimentaires, ces sacs offrent une grande capacité de contenance tout en résistant efficacement aux perforations, aux déchirures et aux contraintes liées au transport. Leur conception étanche permet de limiter les risques de fuite, tandis que leur lien de fermeture renforcé garantit une fermeture simple et sécurisée.\nAdaptés aussi bien aux entreprises, restaurants, sociétés de nettoyage qu'aux particuliers exigeants, ils représentent une solution durable et performante pour une gestion optimale des déchets.\n\nDes sacs poubelle robustes et fiables, conçus pour simplifier la collecte des déchets tout en offrant une résistance optimale.",
    short_description: "130 L · Noir · 44 microns · 100 sacs/carton · Ultra résistant",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-130l-noir-44.png',
    ],
    variants: [
      { id: "sac-130ln44-100", name: "100 sacs", price: 3400, stock: 9999, sku: "SAC-130LN44-100" },
    ],
    price: 3400,
    tags: ["sacs poubelle", "130L", "noir", "44 microns"],
    is_featured: false,
    is_active: true,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "sac-130l-noir-33",
    slug: "sac-poubelle-130l-noir-33",
    name: "Sacs poubelle 130 L — Résistance professionnelle et grande capacité",
    description: "Caractéristiques :\n• **Capacité : 130 litres**\n• **Épaisseur : 33 microns**\n• **Convient aux déchets courants et alimentaires**\n• **Excellente résistance à la perforation et à la déchirure**\n• **Soudure renforcée pour limiter les fuites**\n• **Lien de fermeture solide**\n• **Conditionnement : 200 sacs par carton**\n• **Présentation : 10 rouleaux de 20 sacs**\n\n|||\n\nPensés pour les usages intensifs, nos sacs poubelle de 130 litres offrent un excellent équilibre entre robustesse, praticité et prix compétitif. Grâce à leur épaisseur de 33 microns, ils conviennent parfaitement à la collecte des déchets courants et alimentaires dans les environnements professionnels exigeants.\nFabriqués à partir d'un polyéthylène de qualité, ces sacs assurent une très bonne résistance aux déchirures, aux perforations et aux charges importantes. Leur fond renforcé limite les risques de fuite, même en présence de liquides ou de déchets humides, pour une utilisation plus propre et sécurisée.\nLeur format de 130 litres s'adapte facilement aux conteneurs et poubelles grand volume, ce qui en fait une solution idéale pour les restaurants, sociétés de nettoyage, cuisines collectives, entrepôts ou collectivités.",
    short_description: "130 L · Noir · 33 microns · 200 sacs/carton · 10 rouleaux de 20",
    category: "consommables",
    subcategory: "Sac poubelle",
    images: [
      '/images/produits/sac-130l-noir-33.png',
    ],
    variants: [
      { id: "sac-130ln33-100", name: "100 sacs", price: 3200, stock: 9999, sku: "SAC-130LN33-100" },
    ],
    price: 3200,
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
    subcategory: "Tablette & Pastille",
    images: [
      "/images/produits/tablette-lave-vaisselle.jpg",
    ],
    variants: [
      { id: "con-tab-lv-500", name: "500 tablettes", price: 1900, stock: 500, sku: "CON-TAB-LV-500" },
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
    subcategory: "Tablette & Pastille",
    images: [
      "/images/produits/tablette-linge.jpg",
    ],
    variants: [
      { id: "con-tab-lin-500", name: "500 tablettes", price: 2100, stock: 500, sku: "CON-TAB-LIN-500" },
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
    subcategory: "Tablette & Pastille",
    images: [
      "/images/produits/tablette-lave-vaisselle.jpg",
    ],
    variants: [
      { id: "con-pas-lv-500", name: "500 pastilles", price: 1800, stock: 500, sku: "CON-PAS-LV-500" },
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
    subcategory: "Tablette & Pastille",
    images: [
      "/images/produits/tablette-linge.jpg",
    ],
    variants: [
      { id: "con-pas-lin-500", name: "500 pastilles", price: 2000, stock: 500, sku: "CON-PAS-LIN-500" },
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
      "/images/produits/capsule.jpg",
    ],
    variants: [
      { id: "con-cap-alu-500",  name: "500 capsules",  price: 9500,  stock: 9999, sku: "CON-CAP-ALU-500" },
      { id: "con-cap-alu-1000", name: "1000 capsules", price: 16000, stock: 9999, sku: "CON-CAP-ALU-1000" },
      { id: "con-cap-alu-5000", name: "5000 capsules", price: 55000, stock: 9999, sku: "CON-CAP-ALU-5000" },
    ],
    price: 9500,
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
      `${IMG}/capsule%20fond%20blanc.jpg`,
      `${IMG}/capsule%20.png`,
    ],
    variants: [
      { id: "con-cap-pla-100", name: "100 capsules", price: 3200, stock: 500, sku: "CON-CAP-PLA-100" },
      { id: "con-cap-pla-300", name: "300 capsules", price: 8900, stock: 300, sku: "CON-CAP-PLA-300" },
      { id: "con-cap-pla-600", name: "600 capsules", price: 16500, stock: 200, sku: "CON-CAP-PLA-600" },
    ],
    price: 3200,
    tags: ["capsules", "café", "plastique"],
    is_featured: false,
    is_active: false,
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
    subcategory: "Éponge standard",
    images: [
      "/images/produits/eponge-simple.png",
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
    subcategory: "Éponge emballage individuel",
    images: [
      "/images/produits/eponge-emballage.png",
    ],
    variants: [
      { id: "con-epo-ind-100", name: "100 éponges", price: 3500, stock: 500, sku: "CON-EPO-IND-100" },
      { id: "con-epo-ind-300", name: "300 éponges", price: 9500, stock: 300, sku: "CON-EPO-IND-300" },
      { id: "con-epo-ind-600", name: "600 éponges", price: 17500, stock: 200, sku: "CON-EPO-IND-600" },
    ],
    price: 3500,
    tags: ["éponges", "individuel", "hygiénique", "vaisselle"],
    is_featured: false,
    is_active: false,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  // CONSOMMABLES — Thé (placeholder)
  {
    id: "con-the-001",
    name: "Sélection de Thés",
    slug: "selection-thes",
    short_description: "Assortiment de thés premium pour vos hébergements",
    description: "Sélection de thés premium à venir.",
    category: "consommables",
    subcategory: "Thé",
    images: ["/images/produits/PHOTO-2026-02-03-14-59-07.jpg"],
    variants: [
      { id: "con-the-x10", name: "10 sachets", price: 2000, stock: 500, sku: "CON-THE-X10" },
      { id: "con-the-x50", name: "50 sachets", price: 4900, stock: 300, sku: "CON-THE-X50" },
    ],
    price: 2000,
    tags: ["thé", "boisson", "accueil"],
    is_featured: false,
    is_active: false,
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
