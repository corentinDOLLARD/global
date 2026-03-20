"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import ToastProvider from "@/components/ui/Toast";
import { useWishlistStore } from "@/store/wishlist";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const loadWishlist = useWishlistStore((s) => s.load);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return (
    <>
      <Header />
      <CartSidebar />
      <ToastProvider />
      <main>{children}</main>
      <Footer />
    </>
  );
}
