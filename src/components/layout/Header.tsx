"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Heart,
  User,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Collections" },
  { href: "/products?category=fashion", label: "Haute Couture" },
  { href: "/products?category=jewelry", label: "Joaillerie" },
  { href: "/products?category=electronics", label: "Électronique" },
  { href: "/products?category=home", label: "Maison" },
  { href: "/products?category=sport", label: "Sport" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-4 right-4 z-50 rounded-2xl transition-all duration-500",
          scrolled
            ? "liquid-glass shadow-lg shadow-black/5 py-3"
            : "bg-transparent py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group cursor-pointer">
              <span className="font-heading text-3xl font-bold tracking-tight">
                LUXE<span className="text-gold">.</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted hover:text-primary transition-colors duration-200 group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="hidden sm:flex p-2.5 rounded-full hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                aria-label="Favoris"
              >
                <Heart className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                className="hidden sm:flex p-2.5 rounded-full hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                aria-label="Mon compte"
              >
                <User className="h-5 w-5" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2.5 rounded-full hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                aria-label="Panier"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-gold text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems()}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-full hover:bg-black/5 transition-colors duration-200 cursor-pointer"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-md flex items-start justify-center pt-[15vh]"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl mx-4"
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Rechercher un produit d'exception..."
                  className="w-full bg-white rounded-2xl pl-14 pr-14 py-5 text-lg shadow-2xl outline-none ring-2 ring-gold/20 focus:ring-gold/40 transition-shadow font-body"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-surface-dark transition-colors duration-200 cursor-pointer"
                  aria-label="Fermer la recherche"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-md lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                  <span className="font-heading text-2xl font-bold">
                    LUXE<span className="text-gold">.</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-surface-dark transition-colors duration-200 cursor-pointer"
                    aria-label="Fermer le menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3.5 rounded-xl text-base font-medium hover:bg-surface-dark transition-colors duration-200 cursor-pointer"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
