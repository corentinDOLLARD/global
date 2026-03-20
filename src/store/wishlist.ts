"use client";

import { create } from "zustand";

interface WishlistState {
  items: Set<string>;
  loaded: boolean;
  toggle: (productId: string) => Promise<void>;
  isWished: (productId: string) => boolean;
  load: () => Promise<void>;
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
  items: new Set<string>(),
  loaded: false,

  toggle: async (productId: string) => {
    const current = new Set(get().items);
    const wasWished = current.has(productId);

    if (wasWished) {
      current.delete(productId);
    } else {
      current.add(productId);
    }
    set({ items: current });

    await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
  },

  isWished: (productId: string) => get().items.has(productId),

  load: async () => {
    if (get().loaded) return;
    const res = await fetch("/api/wishlist");
    const data = await res.json();
    set({
      items: new Set(data.map((item: { productId: string }) => item.productId)),
      loaded: true,
    });
  },
}));
