"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Heart, Star, Eye } from "lucide-react";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import type { Product } from "@/data/products";

export default function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) => s.isInWishlist);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden bg-surface-dark aspect-square mb-4">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">
            {product.badge}
          </div>
        )}

        {/* Discount */}
        {product.originalPrice && (
          <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{getDiscountPercent(product.originalPrice, product.price)}%
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="flex-1 bg-white text-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            Ajouter
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className="bg-white/90 p-3 rounded-xl hover:bg-white transition-colors duration-200 cursor-pointer"
            aria-label="Ajouter aux favoris"
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(product.id)
                  ? "fill-gold text-gold"
                  : "text-primary"
              }`}
            />
          </motion.button>
          <Link
            href={`/products/${product.id}`}
            className="bg-white/90 p-3 rounded-xl hover:bg-white transition-colors duration-200 cursor-pointer"
            aria-label="Voir le produit"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <Link href={`/products/${product.id}`} className="block cursor-pointer">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span className="text-xs font-medium">{product.rating}</span>
          <span className="text-xs text-muted">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        <h3 className="font-semibold text-sm leading-tight group-hover:text-gold transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>
        {product.material && (
          <p className="text-xs text-muted mt-1">{product.material}</p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-base">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {product.colors.map((color) => (
              <span
                key={color}
                className="w-3.5 h-3.5 rounded-full border border-stone-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
