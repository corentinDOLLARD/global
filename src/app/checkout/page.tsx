"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  CreditCard,
  Lock,
  Truck,
  Check,
  Package,
  MapPin,
  Diamond,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, cn } from "@/lib/utils";

const steps = ["Livraison", "Paiement", "Confirmation"];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);

  const shipping = 0; // Free signature shipping
  const total = totalPrice() + shipping;

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="pt-32 pb-28 flex flex-col items-center justify-center min-h-screen">
        <Package className="h-16 w-16 text-stone-200 mb-4" />
        <p className="text-xl font-heading font-bold mb-2">
          Votre panier est vide
        </p>
        <Link
          href="/products"
          className="text-gold font-medium hover:underline cursor-pointer"
        >
          Retour aux collections
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="pt-32 pb-28 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-8 glow-gold"
        >
          <Check className="h-12 w-12 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl font-heading font-bold mb-3">
            Commande confirm&eacute;e
          </h1>
          <p className="text-muted text-lg mb-2">
            Merci pour votre confiance
          </p>
          <p className="text-sm text-muted mb-8">
            Commande #LX-
            {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gold-light transition-colors duration-200 shadow-lg shadow-gold/20 cursor-pointer"
          >
            <Diamond className="h-4 w-4" />
            Continuer le shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors duration-200 mb-8 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux collections
        </Link>

        <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-10">
          Paiement
        </h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-14">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-200",
                    i <= currentStep
                      ? "bg-gold text-white"
                      : "bg-surface-dark text-muted"
                  )}
                >
                  {i < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium hidden sm:block",
                    i <= currentStep ? "text-primary" : "text-muted"
                  )}
                >
                  {step}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "w-12 h-0.5 rounded-full",
                    i < currentStep ? "bg-gold" : "bg-stone-200"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-5 w-5 text-gold" />
                    <h2 className="text-xl font-heading font-bold">
                      Adresse de livraison
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Pr&eacute;nom
                      </label>
                      <input
                        type="text"
                        className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                        placeholder="Jean"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Nom
                      </label>
                      <input
                        type="text"
                        className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                        placeholder="Dupont"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                      placeholder="jean@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Adresse
                    </label>
                    <input
                      type="text"
                      className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                      placeholder="123 avenue Montaigne"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Code postal
                      </label>
                      <input
                        type="text"
                        className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                        placeholder="75008"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium mb-1.5 block">
                        Ville
                      </label>
                      <input
                        type="text"
                        className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                        placeholder="Paris"
                      />
                    </div>
                  </div>

                  {/* Shipping options */}
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gold" />
                      Mode de livraison
                    </h3>
                    <div className="space-y-3">
                      {[
                        {
                          label: "Livraison Signature (2-3 jours)",
                          price: "Offert",
                          selected: true,
                        },
                        {
                          label: "Express VIP (Lendemain)",
                          price: "29,00 \u20AC",
                          selected: false,
                        },
                      ].map((opt) => (
                        <label
                          key={opt.label}
                          className={cn(
                            "flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200",
                            opt.selected
                              ? "border-gold bg-gold/5"
                              : "border-stone-200 hover:border-stone-300"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                opt.selected
                                  ? "border-gold"
                                  : "border-stone-300"
                              )}
                            >
                              {opt.selected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                              )}
                            </div>
                            <span className="text-sm font-medium">
                              {opt.label}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "text-sm font-semibold",
                              opt.selected ? "text-gold" : ""
                            )}
                          >
                            {opt.price}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-full bg-gold hover:bg-gold-light text-white py-4 rounded-2xl font-semibold transition-colors duration-200 mt-4 cursor-pointer shadow-lg shadow-gold/20"
                  >
                    Continuer vers le paiement
                  </button>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-5 w-5 text-gold" />
                    <h2 className="text-xl font-heading font-bold">
                      Informations de paiement
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 bg-gold/10 text-gold p-3 rounded-xl text-sm font-medium">
                    <Lock className="h-4 w-4" />
                    Paiement 100% s&eacute;curis&eacute; avec chiffrement SSL
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Num&eacute;ro de carte
                    </label>
                    <input
                      type="text"
                      className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Date d&apos;expiration
                      </label>
                      <input
                        type="text"
                        className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                        placeholder="MM/AA"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        CVC
                      </label>
                      <input
                        type="text"
                        className="w-full bg-surface rounded-xl px-4 py-3.5 outline-none ring-1 ring-stone-200 focus:ring-gold transition-shadow duration-200"
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => setCurrentStep(0)}
                      className="px-6 py-4 rounded-2xl font-semibold border-2 border-stone-200 hover:bg-surface-dark transition-colors duration-200 cursor-pointer"
                    >
                      Retour
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(2);
                        setOrderComplete(true);
                        clearCart();
                      }}
                      className="flex-1 bg-gold hover:bg-gold-light text-white py-4 rounded-2xl font-semibold transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-gold/20"
                    >
                      <Lock className="h-4 w-4" />
                      Payer {formatPrice(total)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="liquid-glass-gold rounded-3xl p-6 sticky top-32">
              <h3 className="font-heading font-bold text-lg mb-6">
                R&eacute;sum&eacute;
              </h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-dark flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gold font-semibold mt-0.5">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-200/50 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Sous-total</span>
                  <span className="font-medium">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Livraison Signature</span>
                  <span className="font-medium text-gold">Offert</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-stone-200/50">
                  <span className="font-heading font-bold">Total</span>
                  <span className="font-heading font-bold text-xl">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
