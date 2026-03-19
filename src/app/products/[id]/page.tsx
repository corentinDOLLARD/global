"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCw,
  ChevronLeft,
  Check,
  Gem,
} from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { formatPrice, cn, getDiscountPercent } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const isInWishlist = useCartStore((s) => s.isInWishlist);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 pb-28 flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-heading font-bold mb-4">
          Pi&egrave;ce non trouv&eacute;e
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

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedSize);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-32 pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-sm text-muted mb-10"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1 hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
            Retour
          </button>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            Collections
          </Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-dark mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {product.badge && (
                <div className="absolute top-6 left-6 bg-primary text-white text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2">
                  <Gem className="h-3.5 w-3.5 text-gold" />
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer",
                    selectedImage === i
                      ? "ring-2 ring-gold ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < Math.floor(product.rating)
                        ? "fill-gold text-gold"
                        : "text-stone-200"
                    )}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted">
                ({product.reviewCount.toLocaleString()} avis)
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight">
              {product.name}
            </h1>

            {product.material && (
              <p className="text-sm text-gold font-medium mt-2">
                {product.material}
              </p>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-heading font-bold">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-gold/10 text-gold text-sm font-bold px-3 py-1 rounded-full">
                    -{getDiscountPercent(product.originalPrice, product.price)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-muted leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-3">Coloris</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-full transition-all duration-200 cursor-pointer",
                        selectedColor === color
                          ? "ring-2 ring-gold ring-offset-2 scale-110"
                          : "hover:scale-105"
                      )}
                      style={{ backgroundColor: color }}
                      aria-label={`Couleur ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-3">Taille</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer",
                        selectedSize === size
                          ? "bg-primary text-white"
                          : "bg-surface-dark hover:bg-stone-200"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Add to Cart */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-surface-dark rounded-2xl px-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-stone-200 rounded-lg transition-colors duration-200 cursor-pointer"
                  aria-label="Diminuer la quantité"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-stone-200 rounded-lg transition-colors duration-200 cursor-pointer"
                  aria-label="Augmenter la quantité"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-white transition-all duration-300 cursor-pointer",
                  addedToCart
                    ? "bg-success"
                    : "bg-gold hover:bg-gold-light shadow-lg shadow-gold/20"
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Ajouté au panier
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Ajouter au panier
                  </>
                )}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => toggleWishlist(product.id)}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-colors duration-200 cursor-pointer",
                  isInWishlist(product.id)
                    ? "border-gold text-gold bg-gold/5"
                    : "border-stone-200 hover:border-gold hover:text-gold"
                )}
                aria-label="Ajouter aux favoris"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isInWishlist(product.id) ? "fill-gold" : ""
                  )}
                />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Livraison signature" },
                { icon: Shield, label: "Certificat d'authenticité" },
                { icon: RefreshCw, label: "Retour 30 jours" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl liquid-glass-gold"
                >
                  <Icon className="h-5 w-5 text-gold" />
                  <span className="text-xs font-medium text-muted">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-28">
            <h2 className="text-3xl font-heading font-bold mb-10">
              Vous aimerez aussi
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
