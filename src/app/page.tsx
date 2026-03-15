"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const TRENDING_PRODUCTS = [
  { id: "1", name: "Zec O'Far Womens T-Shirt", slug: "zec-ofar", price: 100.16, imageUrl: "/tshirt-1.png", category: "T-Shirts" },
  { id: "2", name: "The Mountain Adult Long Sleeve", slug: "mountain-long", price: 104.84, imageUrl: "/tshirt-1.png", category: "Clothing" },
  { id: "3", name: "The Mountain Adult Unisex T-Shirt", slug: "mountain-unisex", price: 112.18, imageUrl: "/tshirt-1.png", category: "T-Shirts" },
  { id: "4", name: "The Mountain Adult Long Sleeve Black", slug: "mountain-black", price: 121.47, imageUrl: "/tshirt-1.png", category: "Clothing" },
  { id: "5", name: "Kyrie 6 EP 'Chinese New Year'", slug: "kyrie-6", price: 167.72, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "6", name: "Nike Air Force 1 '07 LV8", slug: "nike-af1", price: 107.18, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "7", name: "Nike Air Max 97", slug: "nike-am97", price: 121.47, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "8", name: "Air Jordan 1 Mid SE", slug: "jordan-mid", price: 100.16, imageUrl: "/shoes-1.png", category: "Shoes" },
];

const FEATURED_ITEMS = TRENDING_PRODUCTS.slice(0, 3);

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [timeLeft, setTimeLeft] = useState({ days: 30, hrs: 23, mins: 58, secs: 46 });

  // Simple countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hrs > 0) return { ...prev, hrs: prev.hrs - 1, mins: 59, secs: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hrs: 23, mins: 59, secs: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Hero Section */}
      <section className="relative w-full aspect-[21/9] min-h-[500px] overflow-hidden bg-[#78d1d8]">
        {/* Abstract Background Shapes (Simplified) */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full border-[10px] border-white/20"></div>
        <div className="absolute bottom-20 right-40 w-48 h-48 rounded-full bg-white/10"></div>
        
        <Image
          src="/hero-banner.png"
          alt="Exclusive Designs Banner"
          fill
          className="object-cover"
          priority
        />
        
        {/* Banner Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center container-custom">
          <div className="relative">
             {/* 30% Badge */}
            <div className="absolute -top-16 -right-16 md:-top-20 md:-right-20 h-24 w-24 md:h-32 md:w-32 bg-primary rounded-full flex flex-col items-center justify-center text-white shadow-xl transform rotate-12 z-20">
              <span className="text-xl md:text-2xl font-black">30%</span>
              <span className="text-[10px] md:text-sm font-bold uppercase tracking-tighter">OFF</span>
            </div>

            <span className="text-xs md:text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-4 block">New Season Is In</span>
            <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter mb-8 drop-shadow-md">
              EXCLUSIVE<br />DESIGNS
            </h1>
            <button className="bg-white text-secondary px-10 py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all shadow-lg">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* 2. Trending This Week */}
      <section className="container-custom py-20">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">Trending This Week</h2>
          
          {/* Tabs */}
          <div className="flex gap-6 mt-8 overflow-x-auto pb-2 w-full justify-center scrollbar-hide">
            {["All", "Apparel", "Hat", "Accessories", "Glasses", "Bag"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors ${
                  activeTab === tab ? "text-primary border-b-2 border-primary" : "text-muted hover:text-secondary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {TRENDING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* 4. Special Offer Banner with Countdown */}
      <section className="relative w-full min-h-[450px] bg-primary overflow-hidden flex items-center">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -translate-x-1/2 translate-y-1/2"></div>

        <div className="container-custom grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div className="relative aspect-square max-h-[400px] md:max-h-full">
            <Image src="/tshirt-1.png" alt="Promo T-Shirt" fill className="object-contain" />
          </div>
          <div className="text-white space-y-6 md:pb-0 pb-10">
            <span className="text-sm font-bold uppercase tracking-[0.3em]">Special Discount</span>
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter">40% OFF</h2>
            <p className="text-xl md:text-2xl font-bold opacity-90 uppercase">On All Premium T-Shirts</p>
            
            {/* Countdown */}
            <div className="flex gap-4 md:gap-8 pt-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black">{timeLeft.days}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black">{timeLeft.hrs}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Hrs</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black">{timeLeft.mins}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Mins</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-black">{timeLeft.secs}</span>
                <span className="text-[10px] uppercase font-bold opacity-70">Secs</span>
              </div>
            </div>

            <button className="bg-white text-secondary px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all mt-8">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* 5. Featured Items */}
      <section className="container-custom py-20">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary uppercase tracking-tight">Featured Items</h2>
          <p className="mt-2 text-muted text-sm">Our most exclusive and limited edition items picked for you.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10 md:px-20">
          {FEATURED_ITEMS.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      {/* 6. Footer Promo Links */}
      <section className="border-y border-border py-6">
        <div className="container-custom flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-[11px] font-bold uppercase tracking-[0.1em]">
          <span className="text-muted">Where can I find the famous t-shirt trend?</span>
          <Link href="/blog" className="text-primary underline underline-offset-4 hover:text-secondary">Go Here</Link>
        </div>
      </section>
    </div>
  );
}
