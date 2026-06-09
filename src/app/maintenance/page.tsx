export default function MaintenancePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: "#F7F5F0" }}
    >
      {/* Logo MP */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
        style={{ backgroundColor: "#18223b" }}
      >
        <span
          className="font-black text-2xl tracking-tight"
          style={{ color: "#e67e22" }}
        >
          MP
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-extrabold mb-4"
        style={{ color: "#18223b" }}
      >
        Site en maintenance
      </h1>

      <p
        className="text-base md:text-lg opacity-70 max-w-md leading-relaxed mb-2"
        style={{ color: "#18223b" }}
      >
        Nous effectuons quelques améliorations pour vous offrir une meilleure expérience.
      </p>

      <p
        className="text-sm opacity-50 mb-10"
        style={{ color: "#18223b" }}
      >
        Nous serons de retour très prochainement.
      </p>

      {/* Séparateur décoratif */}
      <div
        className="w-12 h-1 rounded-full mb-10"
        style={{ backgroundColor: "#e67e22" }}
      />

      <p className="text-sm font-medium" style={{ color: "#18223b" }}>
        Pour toute urgence, contactez-nous à{" "}
        <a
          href="mailto:contact@monpetitparfait.fr"
          className="underline underline-offset-2"
          style={{ color: "#e67e22" }}
        >
          contact@monpetitparfait.fr
        </a>
      </p>
    </div>
  );
}
