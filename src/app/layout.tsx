import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";

export const metadata: Metadata = {
  title: {
    default: "Mon Petit Parfait — Kits & Consommables pour Hébergements",
    template: "%s | Mon Petit Parfait",
  },
  description:
    "Spécialiste des kits d'accueil et consommables pour hôtels, conciergeries et hébergements. Livraison offerte sans minimum d'achat.",
  keywords: [
    "kits hébergement",
    "kits hôtel",
    "capsules café",
    "kit salle de bain",
    "kit entretien",
    "conciergerie",
    "consommables hôtel",
  ],
  openGraph: {
    title: "Mon Petit Parfait — Kits & Consommables pour Hébergements",
    description:
      "Spécialiste des kits et consommables pour hôtels, conciergeries et hébergements professionnels.",
    locale: "fr_FR",
    type: "website",
    siteName: "Mon Petit Parfait",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </AuthProvider>
      </body>
    </html>
  );
}
