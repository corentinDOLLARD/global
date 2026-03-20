"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, LayoutGrid, X, Search } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "featured", label: "Recommandés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
  { value: "newest", label: "Nouveautés" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const searchParam = searchParams.get("search");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [searchQuery, setSearchQuery] = useState(searchParam || "");

  const filtered = useMemo(() => {
    let result = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name || "Boutique"
              : searchQuery
              ? `Résultats pour "${searchQuery}"`
              : "Tous les produits"}
          </h1>
          <p className="mt-3 text-muted text-lg">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filtrer les produits..."
            className="w-full bg-surface rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none ring-1 ring-gray-200 focus:ring-accent transition-shadow"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 transition-colors">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all", !selectedCategory ? "bg-primary text-white" : "bg-surface-dark text-muted hover:bg-gray-200")}
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
              className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all", selectedCategory === cat.id ? "bg-primary text-white" : "bg-surface-dark text-muted hover:bg-gray-200")}
            >
              {cat.name}
            </button>
          ))}

          <div className="flex-1" />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-dark text-sm font-medium px-4 py-2 rounded-full outline-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          <div className="hidden lg:flex items-center gap-1 bg-surface-dark rounded-full p-1">
            <button onClick={() => setGridCols(3)} className={cn("p-1.5 rounded-full transition-colors", gridCols === 3 ? "bg-white shadow-sm" : "")}>
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button onClick={() => setGridCols(4)} className={cn("p-1.5 rounded-full transition-colors", gridCols === 4 ? "bg-white shadow-sm" : "")}>
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {(selectedCategory || searchQuery) && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-muted">Filtres actifs:</span>
            {selectedCategory && (
              <button onClick={() => setSelectedCategory(null)} className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
                {categories.find((c) => c.id === selectedCategory)?.name}
                <X className="h-3 w-3" />
              </button>
            )}
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="inline-flex items-center gap-1.5 bg-accent/10 text-accent text-sm font-medium px-3 py-1 rounded-full">
                &ldquo;{searchQuery}&rdquo;
                <X className="h-3 w-3" />
              </button>
            )}
          </motion.div>
        )}

        <motion.div
          layout
          className={cn("grid gap-6", gridCols === 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4")}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-semibold">Aucun produit trouvé</p>
            <p className="text-muted mt-2">Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 pb-24 flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
