"use client";

import Link from "next/link";

export default function OrdersPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#3ba1da] text-white p-4 px-6 rounded-sm shadow-sm gap-4">
        <span className="text-sm font-medium tracking-tight">
          No order has been made yet.
        </span>
        <Link 
          href="/shop" 
          className="bg-[#2c89bc] hover:bg-secondary text-white px-6 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm"
        >
          Browse products
        </Link>
      </div>
    </div>
  );
}
