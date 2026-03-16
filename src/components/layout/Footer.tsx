"use client";

import Link from "next/link";
import { Sparkles, Instagram, Twitter } from "lucide-react";

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
  return (
    <footer className="bg-primary text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">
              Restez dans la boucle
            </h3>
            <p className="text-white/60 mb-6">
              Inscrivez-vous pour recevoir nos dernières offres et nouveautés en
              exclusivité.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-white/10 rounded-xl px-5 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-accent placeholder:text-white/40 transition-all"
              />
              <button className="bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
                S&apos;inscrire
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Sparkles className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">
                LUXE<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Shopping premium, design moderne, expérience exceptionnelle.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-accent transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 LUXE. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">
              CGV
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Confidentialité
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
