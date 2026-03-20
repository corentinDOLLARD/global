"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import type { Product } from "@/data/products";

export default function WishlistPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wishlist")
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.map((item: { product: Product }) => item.product));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="pt-28 pb-24 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-display">
            Mes favoris
          </h1>
          <p className="mt-3 text-muted text-lg">
            {products.length} article{products.length !== 1 ? "s" : ""} sauvegardé{products.length !== 1 ? "s" : ""}
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart className="h-16 w-16 text-gray-200 mb-4" />
            <p className="text-xl font-bold mb-2">Aucun favori</p>
            <p className="text-muted mb-6">Parcourez notre boutique et sauvegardez vos coups de cœur</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-2xl font-semibold hover:bg-accent-light transition-colors group"
            >
              Explorer la boutique
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
