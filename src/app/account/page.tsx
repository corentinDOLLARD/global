"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  { icon: Package, label: "Mes commandes", href: "/orders", description: "Suivez vos commandes en cours" },
  { icon: Heart, label: "Mes favoris", href: "/wishlist", description: "Vos produits sauvegardés" },
  { icon: MapPin, label: "Adresses", href: "#", description: "Gérez vos adresses de livraison" },
  { icon: Settings, label: "Paramètres", href: "#", description: "Préférences et notifications" },
];

export default function AccountPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold tracking-tight font-display mb-8">Mon compte</h1>

          {/* Profile Card */}
          <div className="bg-gradient-to-br from-accent to-accent-dark rounded-3xl p-8 text-white mb-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display">Jean Dupont</h2>
                <p className="text-white/70">demo@prenypreny.com</p>
              </div>
            </div>
            <div className="mt-6 flex gap-8">
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-white/60 text-sm">Commandes</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-white/60 text-sm">Note moyenne</div>
              </div>
              <div>
                <div className="text-2xl font-bold">VIP</div>
                <div className="text-white/60 text-sm">Statut</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-surface hover:bg-surface-dark transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.label}</h3>
                    <p className="text-muted text-xs mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            ))}
          </div>

          <button className="mt-8 flex items-center gap-3 text-muted hover:text-danger transition-colors text-sm font-medium">
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </button>
        </motion.div>
      </div>
    </div>
  );
}
