"use client";

import Link from "next/link";
import { Instagram, Twitter, ArrowRight } from "lucide-react";

const footerLinks = {
  Collections: [
    { label: "Haute Couture", href: "/products?category=fashion" },
    { label: "Joaillerie", href: "/products?category=jewelry" },
    { label: "Accessoires", href: "/products?category=accessories" },
    { label: "Beauté", href: "/products?category=beauty" },
  ],
  "L'Expérience": [
    { label: "Personal Shopper", href: "#" },
    { label: "Sur-Mesure", href: "#" },
    { label: "Livraison VIP", href: "#" },
    { label: "Conciergerie", href: "#" },
  ],
  "La Maison": [
    { label: "Notre Héritage", href: "#" },
    { label: "Savoir-Faire", href: "#" },
    { label: "Engagements", href: "#" },
    { label: "Carrières", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              L&apos;excellence dans votre bo&icirc;te mail
            </h3>
            <p className="text-white/50 mb-8 leading-relaxed">
              Recevez en avant-premi&egrave;re nos nouvelles collections,
              invitations priv&eacute;es et offres exclusives.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 bg-white/10 rounded-xl px-5 py-3.5 text-sm outline-none ring-1 ring-white/10 focus:ring-gold placeholder:text-white/30 transition-all duration-300"
              />
              <button className="bg-gold hover:bg-gold-light text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-colors duration-200 flex items-center gap-2 cursor-pointer">
                S&apos;inscrire
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-1 mb-6 cursor-pointer">
              <span className="font-heading text-2xl font-bold">
                LUXE<span className="text-gold">.</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              L&apos;art du luxe contemporain.
              <br />
              Depuis 2020.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2.5 rounded-full bg-white/10 hover:bg-gold transition-colors duration-200 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-full bg-white/10 hover:bg-gold transition-colors duration-200 cursor-pointer"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-5 text-xs uppercase tracking-[0.2em] text-white/70">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/40 hover:text-gold text-sm transition-colors duration-200 cursor-pointer"
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
          <p className="text-white/30 text-sm">
            &copy; 2026 LUXE. Tous droits r&eacute;serv&eacute;s.
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">
              CGV
            </a>
            <a href="#" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">
              Confidentialit&eacute;
            </a>
            <a href="#" className="hover:text-white/60 transition-colors duration-200 cursor-pointer">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
