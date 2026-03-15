"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { 
  XMarkIcon, 
  HomeIcon, 
  ChevronRightIcon 
} from "@heroicons/react/24/outline";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [shippingMethod, setShippingMethod] = useState("flat");

  if (cart.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <section className="bg-secondary py-16 text-center">
          <div className="container-custom">
            <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Cart</h1>
            <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                 <HomeIcon className="h-3 w-3" /> Home
              </Link>
              <ChevronRightIcon className="h-2 w-2" />
              <span className="text-white">Cart</span>
            </nav>
          </div>
        </section>
        <div className="container-custom py-32 text-center">
          <h2 className="text-2xl font-black text-secondary uppercase mb-4">O seu carrinho está vazio</h2>
          <p className="text-muted mb-10">Parece que você ainda não adicionou produtos ao seu carrinho.</p>
          <Link 
            href="/shop" 
            className="bg-primary hover:bg-secondary text-white px-10 py-4 text-xs font-black uppercase tracking-widest transition-all"
          >
            Voltar para a Loja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Page Header (Breadcrumbs) */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Cart</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">Cart</span>
          </nav>
        </div>
      </section>

      {/* 2. Cart Content Area */}
      <section className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Table Area */}
          <div className="lg:col-span-8">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-4 text-[10px] font-black uppercase text-secondary tracking-widest text-left w-12"></th>
                    <th className="pb-4 text-[10px] font-black uppercase text-secondary tracking-widest text-left">Product</th>
                    <th className="pb-4 text-[10px] font-black uppercase text-secondary tracking-widest text-center">Price</th>
                    <th className="pb-4 text-[10px] font-black uppercase text-secondary tracking-widest text-center">Quantity</th>
                    <th className="pb-4 text-[10px] font-black uppercase text-secondary tracking-widest text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cart.map((item) => {
                    const variationId = item.variation ? `${item.variation.size}-${item.variation.color}` : undefined;
                    return (
                      <tr key={`${item.id}-${variationId}`} className="group">
                        <td className="py-8 align-middle">
                          <button 
                            onClick={() => removeFromCart(item.id, variationId)}
                            className="text-muted hover:text-primary transition-colors border border-border rounded-full p-1"
                          >
                            <XMarkIcon className="h-3 w-3" />
                          </button>
                        </td>
                        <td className="py-8 flex items-center gap-4">
                          <div className="relative w-20 h-20 bg-bg-gray shrink-0 border border-border/50">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                          </div>
                          <div>
                            <Link href={`/produto/${item.slug}`} className="text-sm font-black text-primary hover:text-secondary uppercase tracking-tight line-clamp-2">
                              {item.name}
                            </Link>
                            {item.variation && (
                              <p className="text-[10px] font-bold text-muted uppercase mt-1">
                                {item.variation.size} / {item.variation.color}
                              </p>
                            )}
                            <p className="text-[9px] font-medium text-muted uppercase mt-1">Vendor: <span className="text-accent underline">Online Store</span></p>
                          </div>
                        </td>
                        <td className="py-8 text-center">
                          <span className="text-sm font-bold text-muted">${item.price.toFixed(2)}</span>
                        </td>
                        <td className="py-8 px-4">
                          <div className="flex items-center justify-center border border-border w-16 mx-auto h-10">
                            <input 
                              type="number" 
                              value={item.quantity} 
                              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value), variationId)}
                              className="w-full text-center text-xs font-bold outline-none bg-transparent"
                            />
                          </div>
                        </td>
                        <td className="py-8 text-right font-black text-secondary text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Actions area below table */}
            <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Coupon code" 
                  className="bg-white border border-border p-3 text-xs font-medium text-muted w-full md:w-48 outline-none focus:border-primary transition-all"
                />
                <button className="bg-primary hover:bg-secondary text-white text-[10px] font-black uppercase px-8 py-3 transition-all">
                  Apply coupon
                </button>
              </div>
              <button 
                disabled
                className="bg-primary/50 text-white text-[10px] font-black uppercase px-10 py-3 cursor-not-allowed"
              >
                Update cart
              </button>
            </div>
          </div>

          {/* Cart Totals Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border-2 border-bg-gray p-8 h-fit shadow-sm">
              <h2 className="text-xl font-black text-secondary uppercase tracking-tighter mb-8 pb-4 border-b border-border">Cart Totals</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-secondary uppercase">Subtotal</span>
                  <span className="text-sm font-black text-secondary">${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-4 border-y border-border py-6">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-black text-secondary uppercase">Shipping</span>
                    <div className="flex flex-col items-end gap-3">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-[10px] font-bold text-muted uppercase group-hover:text-secondary">Flat rate</span>
                        <input 
                          type="radio" 
                          name="shipping" 
                          value="flat" 
                          checked={shippingMethod === "flat"}
                          onChange={() => setShippingMethod("flat")}
                          className="accent-primary" 
                        />
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-[10px] font-bold text-muted uppercase group-hover:text-secondary">Free shipping</span>
                        <input 
                          type="radio" 
                          name="shipping" 
                          value="free" 
                          checked={shippingMethod === "free"}
                          onChange={() => setShippingMethod("free")}
                          className="accent-primary" 
                        />
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <span className="text-[10px] font-bold text-muted uppercase group-hover:text-secondary">Local pickup</span>
                        <input 
                          type="radio" 
                          name="shipping" 
                          value="pickup" 
                          checked={shippingMethod === "pickup"}
                          onChange={() => setShippingMethod("pickup")}
                          className="accent-primary" 
                        />
                      </label>
                      <p className="text-[10px] text-muted text-right mt-2 italic font-medium">Shipping to <span className="text-secondary font-bold">Brazil</span>.</p>
                      <button className="text-[10px] font-black text-primary hover:text-secondary uppercase underline transition-colors">Change address</button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs font-black text-secondary uppercase">Total</span>
                  <span className="text-2xl font-black text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Link 
                href="/checkout" 
                className="mt-10 block w-full bg-primary hover:bg-secondary text-white text-center py-4 text-[10px] font-black uppercase tracking-widest transition-all shadow-md"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
