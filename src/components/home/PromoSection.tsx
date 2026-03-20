"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Truck, Shield, RefreshCw } from "lucide-react";

const features = [
  { icon: Truck, title: "Livraison express", description: "Gratuite dès 50€ d'achat" },
  { icon: Shield, title: "Paiement sécurisé", description: "Vos données sont protégées" },
  { icon: RefreshCw, title: "Retour gratuit", description: "30 jours pour changer d'avis" },
  { icon: Zap, title: "Service client 24/7", description: "Toujours à votre écoute" },
];

export default function PromoSection() {
  return (
    <>
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[2rem] overflow-hidden bg-primary p-12 sm:p-16 lg:p-20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-accent)_0%,_transparent_60%)] opacity-30" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/10 to-transparent" />

            <div className="relative max-w-xl">
              <span className="inline-block bg-accent/20 text-accent-light text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                Offre limitée
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-display">
                Jusqu&apos;à{" "}
                <span className="gradient-text">-40%</span>
                <br />
                sur la sélection
              </h2>
              <p className="mt-6 text-white/60 text-lg max-w-md">
                Profitez de nos promotions exceptionnelles sur une sélection de
                produits premium. Offre valable jusqu&apos;à épuisement des stocks.
              </p>
              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-semibold hover:bg-accent hover:text-white transition-all duration-300 group"
              >
                En profiter
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-surface border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 text-accent mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-muted text-sm mt-1">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
