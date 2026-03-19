"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid3X3, LayoutGrid, X } from "lucide-react";
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
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [sortBy, setSortBy] = useState("featured");
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const filtered = useMemo(() => {
    let result = selectedCategory
      ? products.filter((p) => p.category === selectedCategory)
      : [...products];

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
  }, [selectedCategory, sortBy]);

  return (
    <div className="pt-32 pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            {selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name ||
                "Collections"
              : "Toutes les collections"}
          </h1>
          <p className="mt-3 text-muted text-lg">
            {filtered.length} pi&egrave;ce{filtered.length !== 1 ? "s" : ""} d&apos;exception
          </p>
        </motion.div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          {/* Category Pills */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
              !selectedCategory
                ? "bg-primary text-white"
                : "bg-surface-dark text-muted hover:bg-stone-200"
            )}
          >
            Tout
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(
                  cat.id === selectedCategory ? null : cat.id
                )
              }
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-surface-dark text-muted hover:bg-stone-200"
              )}
            >
              {cat.name}
            </button>
          ))}

          <div className="flex-1" />

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface-dark text-sm font-medium px-4 py-2.5 rounded-full outline-none cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          {/* Grid Toggle */}
          <div className="hidden lg:flex items-center gap-1 bg-surface-dark rounded-full p-1">
            <button
              onClick={() => setGridCols(3)}
              className={cn(
                "p-1.5 rounded-full transition-colors duration-200 cursor-pointer",
                gridCols === 3 ? "bg-white shadow-sm" : ""
              )}
              aria-label="Grille 3 colonnes"
            >
              <Grid3X3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setGridCols(4)}
              className={cn(
                "p-1.5 rounded-full transition-colors duration-200 cursor-pointer",
                gridCols === 4 ? "bg-white shadow-sm" : ""
              )}
              aria-label="Grille 4 colonnes"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            <span className="text-sm text-muted">Filtre actif:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-1.5 bg-gold/10 text-gold text-sm font-medium px-3 py-1 rounded-full cursor-pointer"
            >
              {categories.find((c) => c.id === selectedCategory)?.name}
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        )}

        {/* Product Grid */}
        <motion.div
          layout
          className={cn(
            "grid gap-6",
            gridCols === 3
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          )}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl font-heading font-bold">
              Aucune pi&egrave;ce trouv&eacute;e
            </p>
            <p className="text-muted mt-2">
              Essayez de modifier vos filtres
            </p>
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
        <div className="pt-32 pb-28 flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
