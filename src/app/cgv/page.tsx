import Link from "next/link";

export const metadata = {
  title: "Conditions Générales de Vente — Mon Petit Parfait",
  description: "Conditions Générales de Vente de Mon Petit Parfait SAS – RCS 990 126 385.",
};

const articles = [
  {
    num: 1,
    title: "IDENTIFICATION DE LA SOCIÉTÉ",
    content: (
      <>
        <p>
          Les présentes Conditions Générales de Vente (ci-après « CGV ») régissent les relations
          contractuelles entre :
        </p>
        <div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: "#F7F5F0" }}>
          <p className="font-bold" style={{ color: "#18223b" }}>MON PETIT PARFAIT</p>
          <p>Société par Actions Simplifiée (SAS)</p>
          <p>Immatriculée au RCS de Paris sous le numéro <strong>990 126 385</strong></p>
          <p>Siège social : 40 rue Alexandre Dumas – 75011 Paris</p>
          <p>Adresse électronique : <a href="mailto:monpetitparfait@gmail.com" style={{ color: "#e67e22" }}>monpetitparfait@gmail.com</a></p>
        </div>
        <p className="mt-4">
          Ci-après désignée « la Société » — et toute personne procédant à un achat via son site
          internet, ci-après désignée « le Client ».
        </p>
      </>
    ),
  },
  {
    num: 2,
    title: "OBJET",
    content: (
      <>
        <p>
          Les présentes CGV définissent l'ensemble des conditions applicables aux ventes de produits
          commercialisés par MON PETIT PARFAIT via son site internet. Elles encadrent notamment :
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Les modalités de commande</li>
          <li>Les conditions tarifaires</li>
          <li>Les règles de paiement</li>
          <li>Les modalités de livraison</li>
          <li>Les responsabilités respectives</li>
        </ul>
      </>
    ),
  },
  {
    num: 3,
    title: "ACCEPTATION DES CONDITIONS",
    content: (
      <>
        <p>
          Toute commande passée sur le site implique l'acceptation pleine, entière et sans réserve
          des présentes CGV. Le Client reconnaît en avoir pris connaissance avant validation de sa
          commande. Les CGV applicables sont celles en vigueur à la date de la commande.
        </p>
      </>
    ),
  },
  {
    num: 4,
    title: "PRODUITS",
    content: (
      <>
        <p>
          Les produits proposés à la vente sont ceux figurant sur le site au moment de la
          consultation. Chaque produit fait l'objet d'une description détaillée présentant ses
          caractéristiques essentielles. Les photographies et visuels sont fournis à titre indicatif
          et ne constituent pas un engagement contractuel. Les produits sont proposés dans la limite
          des stocks disponibles.
        </p>
      </>
    ),
  },
  {
    num: 5,
    title: "TARIFS",
    content: (
      <>
        <p>Les prix sont exprimés en euros. Ils sont indiqués :</p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Hors taxes (HT) pour les clients professionnels</li>
          <li>Toutes taxes comprises (TTC) pour les clients particuliers</li>
        </ul>
        <p className="mt-3">
          La Société se réserve le droit de modifier ses tarifs à tout moment. Toutefois, le prix
          applicable sera celui affiché lors de la validation définitive de la commande. Les frais
          de livraison sont précisés avant confirmation.
        </p>
      </>
    ),
  },
  {
    num: 6,
    title: "COMMANDE",
    content: (
      <>
        <p>La commande est validée après :</p>
        <ol className="mt-3 space-y-1 list-decimal list-inside">
          <li>Sélection des produits</li>
          <li>Validation du panier</li>
          <li>Acceptation des CGV</li>
          <li>Paiement intégral</li>
        </ol>
        <p className="mt-3">
          La validation définitive vaut engagement ferme et irrévocable. La Société se réserve le
          droit d'annuler toute commande en cas :
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>de défaut de paiement</li>
          <li>d'informations inexactes</li>
          <li>de suspicion de fraude</li>
          <li>de litige antérieur non résolu</li>
        </ul>
      </>
    ),
  },
  {
    num: 7,
    title: "PAIEMENT",
    content: (
      <>
        <p>Le règlement s'effectue par :</p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Carte bancaire</li>
          <li>Virement bancaire</li>
          <li>Ou tout autre moyen proposé sur le site</li>
        </ul>
        <p className="mt-3">
          Le paiement est exigible en totalité au moment de la commande. En cas de retard de
          paiement (clients professionnels) :
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Des pénalités calculées au taux légal majoré seront appliquées</li>
          <li>Une indemnité forfaitaire de 40 € pour frais de recouvrement sera due</li>
        </ul>
      </>
    ),
  },
  {
    num: 8,
    title: "RÉSERVE DE PROPRIÉTÉ",
    content: (
      <>
        <p>
          Les produits demeurent la propriété exclusive de MON PETIT PARFAIT jusqu'au paiement
          intégral du prix. En cas de non-paiement, la Société pourra exiger la restitution des
          marchandises aux frais du Client.
        </p>
      </>
    ),
  },
  {
    num: 9,
    title: "LIVRAISON",
    content: (
      <>
        <p>
          Les produits sont livrés à l'adresse indiquée lors de la commande. Les délais indiqués
          sont estimatifs et peuvent varier selon la destination et les contraintes logistiques. Le
          transfert des risques intervient dès remise des marchandises au transporteur. À réception,
          le Client doit vérifier l'état des produits et signaler toute anomalie sous 48 heures.
        </p>
      </>
    ),
  },
  {
    num: 10,
    title: "DROIT DE RÉTRACTATION (Clients particuliers uniquement)",
    content: (
      <>
        <p>
          Conformément au Code de la consommation, le Client particulier dispose d'un délai de{" "}
          <strong>14 jours</strong> pour exercer son droit de rétractation à compter de la réception
          des produits. Les produits doivent être retournés :
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Dans leur état d'origine</li>
          <li>Non utilisés</li>
          <li>Dans leur emballage intact</li>
        </ul>
        <p className="mt-3">
          Les frais de retour restent à la charge du Client sauf défaut avéré.
        </p>
      </>
    ),
  },
  {
    num: 11,
    title: "RÉCLAMATIONS",
    content: (
      <>
        <p>
          Toute réclamation relative à un défaut ou une non-conformité doit être formulée par écrit
          dans un délai maximum de <strong>2 jours ouvrés</strong> pour les professionnels et{" "}
          <strong>14 jours</strong> pour les particuliers. Passé ce délai, la commande sera réputée
          acceptée.
        </p>
      </>
    ),
  },
  {
    num: 12,
    title: "RESPONSABILITÉ",
    content: (
      <>
        <p>
          La responsabilité de MON PETIT PARFAIT ne saurait être engagée pour :
        </p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Les dommages indirects</li>
          <li>Les pertes d'exploitation</li>
          <li>Les pertes financières</li>
        </ul>
        <p className="mt-3">
          En tout état de cause, la responsabilité est limitée au montant de la commande concernée.
        </p>
      </>
    ),
  },
  {
    num: 13,
    title: "FORCE MAJEURE",
    content: (
      <>
        <p>
          La Société ne pourra être tenue responsable d'un retard ou d'une inexécution résultant
          d'un événement extérieur, imprévisible et irrésistible.
        </p>
      </>
    ),
  },
  {
    num: 14,
    title: "DONNÉES PERSONNELLES",
    content: (
      <>
        <p>Les données collectées sont utilisées exclusivement pour :</p>
        <ul className="mt-3 space-y-1 list-disc list-inside">
          <li>Le traitement des commandes</li>
          <li>La facturation</li>
          <li>La gestion de la relation client</li>
        </ul>
        <p className="mt-3">
          Le Client dispose d'un droit d'accès, de rectification et de suppression conformément à
          la réglementation en vigueur.
        </p>
      </>
    ),
  },
  {
    num: 15,
    title: "DROIT APPLICABLE ET LITIGES",
    content: (
      <>
        <p>
          Les présentes CGV sont soumises au droit français. Tout litige sera soumis aux tribunaux
          compétents du ressort du siège social de la Société, sauf disposition légale contraire.
        </p>
      </>
    ),
  },
];

export default function CGVPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: "#F7F5F0" }}>
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium mb-6 opacity-50 hover:opacity-80 transition-opacity"
            style={{ color: "#18223b" }}
          >
            ← Accueil
          </Link>
          <h1 className="text-3xl font-bold mb-2" style={{ color: "#18223b" }}>
            Conditions Générales de Vente
          </h1>
          <p className="text-sm opacity-50" style={{ color: "#18223b" }}>
            MON PETIT PARFAIT SAS · Dernière mise à jour : avril 2026
          </p>
        </div>

        {/* Articles */}
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.num}
              className="rounded-2xl p-6"
              style={{ backgroundColor: "white" }}
            >
              <h2 className="text-base font-bold mb-4" style={{ color: "#18223b" }}>
                <span
                  className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white mr-3"
                  style={{ backgroundColor: "#e67e22" }}
                >
                  {article.num}
                </span>
                ARTICLE {article.num} – {article.title}
              </h2>
              <div className="text-sm leading-relaxed opacity-80" style={{ color: "#18223b" }}>
                {article.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer card */}
        <div
          className="mt-8 p-6 rounded-2xl text-sm text-center"
          style={{ backgroundColor: "#18223b", color: "white" }}
        >
          <p className="font-bold mb-1">MON PETIT PARFAIT SAS</p>
          <p className="opacity-70">40 rue Alexandre Dumas · 75011 Paris</p>
          <p className="opacity-70">RCS Paris 990 126 385</p>
          <a
            href="mailto:monpetitparfait@gmail.com"
            className="mt-2 inline-block font-semibold"
            style={{ color: "#e67e22" }}
          >
            monpetitparfait@gmail.com
          </a>
        </div>

      </div>
    </div>
  );
}
