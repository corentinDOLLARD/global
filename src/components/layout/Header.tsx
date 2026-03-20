"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useWishlistStore } from "@/store/wishlist";
import { cn, formatPrice } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Boutique" },
  { href: "/products?category=electronics", label: "Électronique" },
  { href: "/products?category=fashion", label: "Mode" },
  { href: "/products?category=home", label: "Maison" },
  { href: "/products?category=sport", label: "Sport" },
];

interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const wishlistItems = useWishlistStore((s) => s.items);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = useCallback(async (q: string) => {
    setSearchQuery(q);
    if (q.length < 2) {
      setSearchResults([]);
      return;
    }
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setSearchResults(data);
  }, []);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-lg shadow-black/5 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-2xl font-bold tracking-tight font-display">
                Preny<span className="gradient-text">Preny</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-muted hover:text-primary transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-3/4" />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-black/5 transition-colors"
              >
                <Search className="h-5 w-5" />
              </motion.button>

              <Link
                href="/wishlist"
                className="hidden sm:flex relative p-2.5 rounded-full hover:bg-black/5 transition-colors"
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.size > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-pink-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.size}
                  </span>
                )}
              </Link>

              <Link
                href="/account"
                className="hidden sm:flex p-2.5 rounded-full hover:bg-black/5 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="relative p-2.5 rounded-full hover:bg-black/5 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {totalItems()}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-full hover:bg-black/5 transition-colors"
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
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-[12vh]"
            onClick={() => { setSearchOpen(false); setSearchResults([]); setSearchQuery(""); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl mx-4"
            >
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                  placeholder="Rechercher un produit..."
                  className="w-full bg-white rounded-2xl pl-14 pr-14 py-5 text-lg shadow-2xl outline-none ring-2 ring-accent/20 focus:ring-accent/40 transition-shadow"
                />
                <button
                  onClick={() => { setSearchOpen(false); setSearchResults([]); setSearchQuery(""); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[50vh] overflow-y-auto"
                >
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      href={`/products/${result.id}`}
                      onClick={() => { setSearchOpen(false); setSearchResults([]); setSearchQuery(""); }}
                      className="flex items-center gap-4 p-4 hover:bg-surface transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-surface-dark flex-shrink-0">
                        <Image src={result.image} alt={result.name} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{result.name}</p>
                        <p className="text-accent font-bold text-sm">{formatPrice(result.price)}</p>
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full p-3 text-center text-sm font-medium text-accent hover:bg-accent/5 transition-colors"
                  >
                    Voir tous les résultats pour &ldquo;{searchQuery}&rdquo;
                  </button>
                </motion.div>
              )}
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
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
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
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold font-display">Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 rounded-xl text-base font-medium hover:bg-surface-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-3" />
                  <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium hover:bg-surface-dark transition-colors flex items-center gap-3">
                    <Heart className="h-5 w-5" /> Favoris
                  </Link>
                  <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium hover:bg-surface-dark transition-colors flex items-center gap-3">
                    <User className="h-5 w-5" /> Mon compte
                  </Link>
                  <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-base font-medium hover:bg-surface-dark transition-colors flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5" /> Commandes
                  </Link>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
