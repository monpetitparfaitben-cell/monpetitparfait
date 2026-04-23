import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: "#F7F5F0", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <Link href="/" className="text-sm opacity-50 hover:opacity-80 transition-opacity" style={{ color: "#18223b" }}>
          ← Accueil
        </Link>

        <h1 className="text-3xl font-bold mt-6 mb-4" style={{ color: "#18223b" }}>
          Nous contacter
        </h1>
        <p className="text-base opacity-70 mb-12" style={{ color: "#18223b" }}>
          Notre équipe est disponible pour répondre à toutes vos questions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#e67e2215" }}>
              <Mail size={20} style={{ color: "#e67e22" }} />
            </div>
            <h3 className="font-bold mb-1" style={{ color: "#18223b" }}>Email</h3>
            <a
              href="mailto:contact@monpetitparfait.fr"
              className="text-sm hover:opacity-80 transition-opacity"
              style={{ color: "#e67e22" }}
            >
              contact@monpetitparfait.fr
            </a>
          </div>

          <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: "#e67e2215" }}>
              <Clock size={20} style={{ color: "#e67e22" }} />
            </div>
            <h3 className="font-bold mb-1" style={{ color: "#18223b" }}>Horaires</h3>
            <p className="text-sm opacity-70" style={{ color: "#18223b" }}>
              Lundi – Vendredi<br />9h – 18h
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-8" style={{ backgroundColor: "white" }}>
          <h2 className="text-lg font-bold mb-6" style={{ color: "#18223b" }}>Envoyer un message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-60" style={{ color: "#18223b" }}>Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5 opacity-60" style={{ color: "#18223b" }}>Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5 opacity-60" style={{ color: "#18223b" }}>Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ border: "1.5px solid #ede9e0", color: "#18223b", backgroundColor: "white" }}
                placeholder="Votre message..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl text-sm font-bold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#e67e22" }}
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
