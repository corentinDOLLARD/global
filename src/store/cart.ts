"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  wishlist: string[];
  isOpen: boolean;
  addItem: (product: Product, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isOpen: false,

      addItem: (product, color, size) => {
        const items = get().items;
        const existing = items.find(
          (i) =>
            i.product.id === product.id &&
            i.selectedColor === color &&
            i.selectedSize === size
        );
        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id &&
              i.selectedColor === color &&
              i.selectedSize === size
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...items,
              {
                product,
                quantity: 1,
                selectedColor: color,
                selectedSize: size,
              },
            ],
            isOpen: true,
          });
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      setCartOpen: (open) => set({ isOpen: open }),

      toggleWishlist: (productId) => {
        const wishlist = get().wishlist;
        set({
          wishlist: wishlist.includes(productId)
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId],
        });
      },

      isInWishlist: (productId) => get().wishlist.includes(productId),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: "luxe-cart" }
  )
);
