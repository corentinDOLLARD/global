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
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice, cn } from "@/lib/utils";
import toast from "react-hot-toast";

const steps = ["Livraison", "Paiement", "Confirmation"];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [processing, setProcessing] = useState(false);

  const [address, setAddress] = useState({
    firstName: "", lastName: "", email: "", street: "", city: "", zipCode: "",
  });

  const shipping = totalPrice() >= 50 ? 0 : 4.99;
  const total = totalPrice() + shipping;

  const handlePlaceOrder = async () => {
    setProcessing(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
            color: item.selectedColor,
            size: item.selectedSize,
          })),
          shipping,
          address,
        }),
      });
      const data = await res.json();
      setOrderId(data.orderId);
      setCurrentStep(2);
      setOrderComplete(true);
      clearCart();
      toast.success("Commande confirmée !");
    } catch {
      toast.error("Erreur lors de la commande");
    } finally {
      setProcessing(false);
    }
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="pt-28 pb-24 flex flex-col items-center justify-center min-h-screen">
        <Package className="h-16 w-16 text-gray-200 mb-4" />
        <p className="text-xl font-bold mb-2">Votre panier est vide</p>
        <Link href="/products" className="text-accent font-medium hover:underline">
          Retour à la boutique
        </Link>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="pt-28 pb-24 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
          className="w-24 h-24 bg-success rounded-full flex items-center justify-center mb-8"
        >
          <Check className="h-12 w-12 text-white" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
          <h1 className="text-3xl font-bold font-display mb-3">Commande confirmée !</h1>
          <p className="text-muted text-lg mb-2">Merci pour votre achat</p>
          <p className="text-sm text-muted mb-8">Commande #{orderId.slice(0, 8).toUpperCase()}</p>
          <div className="flex gap-4 justify-center">
            <Link href="/orders" className="inline-flex items-center gap-2 bg-surface text-primary px-6 py-4 rounded-2xl font-semibold hover:bg-surface-dark transition-colors">
              <Package className="h-4 w-4" /> Mes commandes
            </Link>
            <Link href="/products" className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-2xl font-semibold hover:bg-accent-light transition-colors">
              <Sparkles className="h-4 w-4" /> Continuer le shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center gap-1 text-sm text-muted hover:text-primary transition-colors mb-8">
          <ChevronLeft className="h-4 w-4" /> Retour à la boutique
        </Link>
        <h1 className="text-3xl font-bold font-display mb-8">Paiement</h1>

        <div className="flex items-center gap-4 mb-12">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors", i <= currentStep ? "bg-accent text-white" : "bg-surface-dark text-muted")}>
                  {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn("text-sm font-medium hidden sm:block", i <= currentStep ? "text-primary" : "text-muted")}>{step}</span>
              </div>
              {i < steps.length - 1 && <div className={cn("w-12 h-0.5 rounded-full", i < currentStep ? "bg-accent" : "bg-gray-200")} />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 0 && (
                <motion.div key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-bold">Adresse de livraison</h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Prénom</label>
                      <input type="text" value={address.firstName} onChange={(e) => setAddress({ ...address, firstName: e.target.value })} className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="Jean" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Nom</label>
                      <input type="text" value={address.lastName} onChange={(e) => setAddress({ ...address, lastName: e.target.value })} className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="Dupont" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email</label>
                    <input type="email" value={address.email} onChange={(e) => setAddress({ ...address, email: e.target.value })} className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="jean@email.com" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Adresse</label>
                    <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="123 rue de la Paix" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Code postal</label>
                      <input type="text" value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="75001" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium mb-1.5 block">Ville</label>
                      <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="Paris" />
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-sm font-semibold mb-3 flex items-center gap-2"><Truck className="h-4 w-4" /> Mode de livraison</h3>
                    <div className="space-y-3">
                      {[
                        { label: "Standard (3-5 jours)", price: "Gratuit", selected: true },
                        { label: "Express (1-2 jours)", price: "9,99 €", selected: false },
                      ].map((opt) => (
                        <label key={opt.label} className={cn("flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all", opt.selected ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300")}>
                          <div className="flex items-center gap-3">
                            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", opt.selected ? "border-accent" : "border-gray-300")}>
                              {opt.selected && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                            </div>
                            <span className="text-sm font-medium">{opt.label}</span>
                          </div>
                          <span className="text-sm font-semibold">{opt.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setCurrentStep(1)} className="w-full bg-accent hover:bg-accent-light text-white py-4 rounded-2xl font-semibold transition-colors mt-4">
                    Continuer vers le paiement
                  </button>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-bold">Informations de paiement</h2>
                  </div>
                  <div className="flex items-center gap-2 bg-success/10 text-success p-3 rounded-xl text-sm">
                    <Lock className="h-4 w-4" /> Paiement 100% sécurisé avec chiffrement SSL
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Numéro de carte</label>
                    <input type="text" className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="4242 4242 4242 4242" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Date d&apos;expiration</label>
                      <input type="text" className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="MM/AA" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">CVC</label>
                      <input type="text" className="w-full bg-surface rounded-xl px-4 py-3 outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow" placeholder="123" />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => setCurrentStep(0)} className="px-6 py-4 rounded-2xl font-semibold border-2 border-gray-200 hover:bg-surface-dark transition-colors">
                      Retour
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={processing}
                      className="flex-1 bg-accent hover:bg-accent-light text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {processing ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><Lock className="h-4 w-4" /> Payer {formatPrice(total)}</>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface rounded-3xl p-6 sticky top-28">
              <h3 className="font-bold text-lg mb-6">Résumé</h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-surface-dark flex-shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-accent font-semibold mt-0.5">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Sous-total</span>
                  <span className="font-medium">{formatPrice(totalPrice())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Livraison</span>
                  <span className="font-medium">{shipping === 0 ? <span className="text-success">Gratuit</span> : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
