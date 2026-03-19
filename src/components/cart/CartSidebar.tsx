"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";

export default function CartSidebar() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalPrice } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-primary/40 backdrop-blur-md"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-heading font-bold">Panier</h2>
                <span className="text-sm text-muted">
                  ({items.length} article{items.length !== 1 ? "s" : ""})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-full hover:bg-surface-dark transition-colors duration-200 cursor-pointer"
                aria-label="Fermer le panier"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-16 w-16 text-stone-200 mb-4" />
                  <p className="text-lg font-heading font-bold mb-2">Panier vide</p>
                  <p className="text-sm text-muted mb-6">
                    D&eacute;couvrez nos pi&egrave;ces d&apos;exception
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setCartOpen(false)}
                    className="bg-primary text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors duration-200 cursor-pointer"
                  >
                    Explorer les collections
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.product.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-4"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-dark flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm leading-tight line-clamp-2">
                            {item.product.name}
                          </h3>
                          <p className="text-gold font-bold text-sm mt-1">
                            {formatPrice(item.product.price)}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-1 rounded-md hover:bg-surface-dark transition-colors duration-200 cursor-pointer"
                              aria-label="Diminuer la quantit&eacute;"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 rounded-md hover:bg-surface-dark transition-colors duration-200 cursor-pointer"
                              aria-label="Augmenter la quantit&eacute;"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 h-fit rounded-full hover:bg-red-50 text-stone-400 hover:text-danger transition-colors duration-200 cursor-pointer"
                          aria-label="Supprimer l'article"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-stone-100 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Sous-total</span>
                  <span className="text-xl font-heading font-bold">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <p className="text-xs text-muted">
                  Livraison signature offerte pour toute commande
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-light text-white py-4 rounded-2xl font-semibold transition-colors duration-200 group cursor-pointer"
                >
                  Passer commande
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
