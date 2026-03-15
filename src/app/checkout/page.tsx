"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { ChevronLeftIcon, LockClosedIcon } from "@heroicons/react/24/solid";

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container-custom section-padding text-center">
        <h1 className="text-2xl font-bold uppercase mb-4">Your cart is empty</h1>
        <Link href="/shop" className="text-accent font-bold underline">Go back to shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold text-secondary uppercase tracking-tight mb-6">Shipping Information</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-bold uppercase text-muted">First Name</label>
                  <input type="text" className="border border-border p-3 text-sm focus:border-accent outline-none" required />
                </div>
                <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                  <label className="text-[10px] font-bold uppercase text-muted">Last Name</label>
                  <input type="text" className="border border-border p-3 text-sm focus:border-accent outline-none" required />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] font-bold uppercase text-muted">Email Address</label>
                  <input type="email" className="border border-border p-3 text-sm focus:border-accent outline-none" required />
                </div>
                <div className="flex flex-col gap-1 col-span-2">
                  <label className="text-[10px] font-bold uppercase text-muted">Shipping Address</label>
                  <input type="text" className="border border-border p-3 text-sm focus:border-accent outline-none" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-muted">City</label>
                  <input type="text" className="border border-border p-3 text-sm focus:border-accent outline-none" required />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase text-muted">Postal Code</label>
                  <input type="text" className="border border-border p-3 text-sm focus:border-accent outline-none" required />
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-bold text-secondary uppercase tracking-tight mb-6">Payment Method</h2>
              <div className="border-2 border-accent p-6 flex items-center justify-between bg-accent/5">
                <div className="flex items-center gap-4">
                  <div className="h-6 w-10 bg-secondary rounded flex items-center justify-center text-[8px] text-white font-bold">MERCADO</div>
                  <span className="text-sm font-bold text-secondary">Mercado Pago</span>
                </div>
                <span className="text-[10px] font-bold text-accent uppercase">Selected</span>
              </div>
              <p className="text-[10px] text-muted italic mt-2">You will be redirected to Mercado Pago to complete your purchase securely.</p>
            </div>
            
            <button className="w-full bg-secondary text-white py-4 font-bold uppercase tracking-widest text-xs hover:bg-accent transition-all flex items-center justify-center gap-2">
              <LockClosedIcon className="h-4 w-4" />
              Complete Purchase (${cartTotal.toFixed(2)})
            </button>
          </div>

          {/* Order Summary Side */}
          <div className="bg-bg-gray p-8 h-fit">
            <h2 className="text-xl font-bold text-secondary uppercase tracking-tight mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
              {cart.map((item) => (
                <div key={`${item.id}-${item.variation?.size}-${item.variation?.color}`} className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <div className="relative h-16 w-16 bg-white border border-border overflow-hidden">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-bold text-secondary truncate max-w-[150px]">{item.name}</span>
                      <span className="text-[10px] text-muted font-bold uppercase">QTY: {item.quantity}</span>
                      {item.variation?.size && <span className="text-[10px] text-muted font-bold uppercase">SIZE: {item.variation.size}</span>}
                    </div>
                  </div>
                  <span className="text-xs font-bold text-secondary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-xs text-muted uppercase font-bold">Subtotal</span>
                <span className="text-xs font-bold text-secondary">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted uppercase font-bold">Shipping</span>
                <span className="text-xs font-bold text-secondary">FREE</span>
              </div>
              <div className="flex justify-between border-t border-border pt-4">
                <span className="text-sm font-bold uppercase text-secondary">Total</span>
                <span className="text-lg font-bold text-primary">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/carrinho" className="mt-8 flex justify-center items-center gap-2 text-[10px] font-bold uppercase text-muted hover:text-secondary">
              <ChevronLeftIcon className="h-3 w-3" />
              Back to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
