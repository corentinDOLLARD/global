"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Twitter } from "lucide-react";
import toast from "react-hot-toast";

const footerLinks = {
  Boutique: [
    { label: "Nouveautés", href: "/products" },
    { label: "Best-sellers", href: "/products" },
    { label: "Promotions", href: "/products" },
    { label: "Toutes les catégories", href: "/products" },
  ],
  Aide: [
    { label: "FAQ", href: "#" },
    { label: "Livraison", href: "#" },
    { label: "Retours", href: "#" },
    { label: "Contact", href: "#" },
  ],
  "À propos": [
    { label: "Notre histoire", href: "#" },
    { label: "Engagements", href: "#" },
    { label: "Presse", href: "#" },
    { label: "Carrières", href: "#" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Veuillez entrer un email valide");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setEmail("");
      } else {
        toast.error(data.error || "Erreur lors de l'inscription");
      }
    } catch {
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold font-display mb-3">
              Restez dans la boucle
            </h3>
            <p className="text-white/60 mb-6">
              Inscrivez-vous pour recevoir nos dernières offres et nouveautés en exclusivité.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 bg-white/10 rounded-xl px-5 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent placeholder:text-white/40 transition-all"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "..." : "S'inscrire"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xs">P</span>
              </div>
              <span className="text-xl font-bold font-display">
                Preny<span className="text-accent-light">Preny</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Shopping premium, design moderne, expérience exceptionnelle.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2026 PrenyPreny. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">CGV</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
