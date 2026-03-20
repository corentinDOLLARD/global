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
} from "lucide-react";
import { getProductById, products } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice, cn } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const product = getProductById(params.id as string);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWished } = useWishlistStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product?.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="pt-28 pb-24 flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-bold mb-4">Produit non trouvé</p>
        <Link href="/products" className="text-accent font-medium hover:underline">Retour à la boutique</Link>
      </div>
    );
  }

  const wished = isWished(product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedColor, selectedSize);
    }
    setAddedToCart(true);
    toast.success(`${product.name} ajouté au panier`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleWishlist = async () => {
    await toggle(product.id);
    toast.success(wished ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  return (
    <div className="pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm text-muted mb-8">
          <button onClick={() => router.back()} className="flex items-center gap-1 hover:text-primary transition-colors">
            <ChevronLeft className="h-4 w-4" /> Retour
          </button>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Boutique</Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-surface-dark mb-4">
              <AnimatePresence mode="wait">
                <motion.div key={selectedImage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="relative w-full h-full">
                  <Image src={product.images[selectedImage]} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
                </motion.div>
              </AnimatePresence>
              {product.badge && (
                <div className="absolute top-6 left-6 bg-accent text-white text-sm font-bold px-4 py-2 rounded-full">{product.badge}</div>
              )}
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={cn("relative w-20 h-20 rounded-xl overflow-hidden transition-all", selectedImage === i ? "ring-2 ring-accent ring-offset-2" : "opacity-60 hover:opacity-100")}>
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200")} />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted">({product.reviewCount.toLocaleString()} avis)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">{product.name}</h1>

            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted line-through">{formatPrice(product.originalPrice)}</span>
                  <span className="bg-danger/10 text-danger text-sm font-bold px-3 py-1 rounded-full">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

            {product.colors && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-3">Couleur</h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button key={color} onClick={() => setSelectedColor(color)} className={cn("w-10 h-10 rounded-full transition-all", selectedColor === color ? "ring-2 ring-accent ring-offset-2 scale-110" : "hover:scale-105")} style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold mb-3">Taille</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all", selectedSize === size ? "bg-primary text-white" : "bg-surface-dark hover:bg-gray-200")}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-surface-dark rounded-2xl px-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-semibold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className={cn("flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-white transition-all duration-300", addedToCart ? "bg-success" : "bg-accent hover:bg-accent-light")}
              >
                {addedToCart ? (<><Check className="h-5 w-5" /> Ajouté au panier !</>) : (<><ShoppingBag className="h-5 w-5" /> Ajouter au panier</>)}
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleWishlist}
                className={cn("p-4 rounded-2xl border-2 transition-colors", wished ? "border-pink-500 bg-pink-50 text-pink-500" : "border-gray-200 hover:border-accent hover:text-accent")}
              >
                <Heart className={cn("h-5 w-5", wished && "fill-pink-500")} />
              </motion.button>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Livraison 24-48h" },
                { icon: Shield, label: "Garantie 2 ans" },
                { icon: RefreshCw, label: "Retour 30 jours" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl bg-surface">
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="text-xs font-medium text-muted">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-24">
            <h2 className="text-2xl font-bold font-display mb-8">Vous aimerez aussi</h2>
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
