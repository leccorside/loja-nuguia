"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/hooks/useCart";
import { WishlistProvider } from "@/hooks/useWishlist";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <WishlistProvider>
      <CartProvider>
        {!isAdminPage && <Header />}
        <main>{children}</main>
        {!isAdminPage && <Footer />}
      </CartProvider>
    </WishlistProvider>
  );
}
