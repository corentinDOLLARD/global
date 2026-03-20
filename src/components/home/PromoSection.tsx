"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Gem,
  Truck,
  Shield,
  Clock,
  CreditCard,
  Headphones,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Livraison signature",
    description: "Gratuite d\u00e8s 50\u20ac d\u2019achat",
  },
  {
    icon: Shield,
    title: "Authenticit\u00e9 garantie",
    description: "Certificat d\u2019origine inclus",
  },
  {
    icon: Clock,
    title: "Retour sous 30 jours",
    description: "Satisfait ou rembours\u00e9",
  },
  {
    icon: CreditCard,
    title: "Paiement s\u00e9curis\u00e9",
    description: "Cryptage SSL avanc\u00e9",
  },
  {
    icon: Headphones,
    title: "Service client VIP",
    description: "Assistance 7j/7",
  },
  {
    icon: Gem,
    title: "Conciergerie VIP",
    description: "Personal shopper d\u00e9di\u00e9",
  },
];

export default function PromoSection() {
  return (
    <>
      {/* Luxury Promo Banner */}
      <section className="py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden bg-primary p-12 sm:p-16 lg:p-20"
          >
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(202,138,4,0.2)_0%,_transparent_60%)]" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />

            {/* Decorative morph blob */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-gold/10 rounded-full blur-[60px] animate-morph" />

            <div className="relative max-w-xl">
              <span className="inline-flex items-center gap-2 bg-gold/15 text-gold text-sm font-semibold px-4 py-2 rounded-full mb-8">
                <Sparkles className="h-3.5 w-3.5" />
                Ventes Priv&eacute;es
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight">
                Jusqu&apos;&agrave;{" "}
                <span className="text-gold-gradient">-40%</span>
                <br />
                sur la s&eacute;lection
              </h2>
              <p className="mt-6 text-white/40 text-lg max-w-md leading-relaxed">
                Mode, tech, maison, sport &mdash; profitez de nos ventes priv&eacute;es
                sur une s&eacute;lection de pi&egrave;ces d&apos;exception dans tous nos univers.
              </p>
              <Link
                href="/products"
                className="mt-10 inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 group shadow-lg shadow-gold/20 cursor-pointer"
              >
                D&eacute;couvrir
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface border-y border-stone-200/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold/10 text-gold mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-muted text-sm mt-1">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
