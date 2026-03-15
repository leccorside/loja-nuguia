"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { 
  Squares2X2Icon, 
  ListBulletIcon,
  ChevronRightIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

const PRODUCTS = [
  { id: "1", name: "Air Jordan 1 Mid SE", slug: "jordan-mid", price: 100.16, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "2", name: "Brown Velvet Coat", slug: "velvet-coat", price: 104.84, imageUrl: "/tshirt-1.png", category: "Clothing" },
  { id: "3", name: "Business Leather Bag", slug: "leather-bag", price: 144.36, imageUrl: "/tshirt-1.png", category: "Clothing" },
  { id: "4", name: "Fabric Patterned Bag", slug: "patterned-bag", price: 123.66, imageUrl: "/tshirt-1.png", category: "Clothing" },
  { id: "5", name: "Jordan 'Why Not?' Zer0.3 PF", slug: "jordan-zero", price: 191.23, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "6", name: "Kyrie 6 By You", slug: "kyrie-6-by-you", price: 190.85, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "7", name: "Kyrie 6 EP 'Chinese New Year'", slug: "kyrie-cny", price: 167.72, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "8", name: "Nike Air Force 1 '07 LV8", slug: "nike-af1", price: 107.18, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "9", name: "Nike Air Max 97", slug: "nike-am97", price: 121.47, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "10", name: "Nike Daybreak", slug: "nike-daybreak", price: 145.93, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "11", name: "Nike Free RN Flyknit 3.0", slug: "nike-free", price: 107.18, imageUrl: "/shoes-1.png", category: "Shoes" },
  { id: "12", name: "Nike MX-720-818", slug: "nike-mx", price: 193.97, imageUrl: "/shoes-1.png", category: "Shoes" },
];

const CATEGORIES = [
  "Beauty & Health", "Clothing", "Electronics & Computers", "Food & Grocery", 
  "Furniture", "Garden & Kitchen", "Jewelry", "Marketplace", "Shoes", 
  "Sports & Outdoors", "T-Shirts", "Tools & Parts", "Toys", "Uncategorized", "Watch"
];

const COLORS = [
  { name: "Black", class: "bg-black" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Green", class: "bg-green-500" },
  { name: "Light Green", class: "bg-green-300" },
  { name: "Orange", class: "bg-orange-500" },
  { name: "Purple", class: "bg-purple-500" },
  { name: "Red", class: "bg-red-500" },
  { name: "White", class: "bg-white border border-border" },
  { name: "Yellow", class: "bg-yellow-400" },
];

const SIZES = ["L", "M", "S", "XL"];

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Dark Header / Breadcrumbs */}
      <section className="bg-secondary py-12 text-center">
        <div className="container-custom">
          <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Products</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">Shop</span>
          </nav>
        </div>
      </section>

      {/* 2. Shop Main Content */}
      <section className="container-custom py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar FILTERS */}
          <aside className="w-full lg:w-1/4 space-y-12">
            
            {/* Categories */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Product categories</h3>
              <ul className="space-y-3">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button className="text-xs font-medium text-muted hover:text-accent transition-colors">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filter by Price */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Filter by price</h3>
              <div className="px-2">
                <div className="h-1 bg-primary rounded-full relative mb-6">
                  <div className="absolute -left-1 -top-1 w-3 h-3 bg-white border-2 border-primary rounded-full cursor-pointer"></div>
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-white border-2 border-primary rounded-full cursor-pointer"></div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-primary text-white text-[10px] font-bold uppercase px-6 py-2 rounded-sm hover:bg-secondary transition-all">Filter</button>
                  <span className="text-[10px] font-bold text-muted uppercase">Price: <span className="text-secondary">$40 — $420</span></span>
                </div>
              </div>
            </div>

            {/* Filter by Color */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Filter by Color</h3>
              <div className="flex flex-wrap gap-3">
                {COLORS.map(color => (
                  <button 
                    key={color.name}
                    className={`w-6 h-6 rounded-full ${color.class} hover:scale-110 transition-transform shadow-sm`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Filter by Size */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Filter by Size</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map(size => (
                  <button 
                    key={size}
                    className="w-10 h-10 border border-border flex items-center justify-center text-[10px] font-bold text-muted hover:border-accent hover:text-accent transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Product Grid Area */}
          <main className="w-full lg:w-3/4">
            
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-border gap-4">
              <span className="text-xs text-muted font-medium">Showing 1–12 of 15 results</span>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={`p-1 transition-colors ${viewMode === "grid" ? "text-secondary" : "text-border"}`}
                  >
                    <Squares2X2Icon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={`p-1 transition-colors ${viewMode === "list" ? "text-secondary" : "text-border"}`}
                  >
                    <ListBulletIcon className="h-5 w-5" />
                  </button>
                </div>

                <select className="text-xs font-bold text-muted bg-white outline-none border-none cursor-pointer">
                  <option>Default sorting</option>
                  <option>Sort by popularity</option>
                  <option>Sort by average rating</option>
                  <option>Sort by latest</option>
                  <option>Sort by price: low to high</option>
                  <option>Sort by price: high to low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {PRODUCTS.map(product => (
                <div key={product.id}>
                   <ProductCard {...product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-20">
              <button className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded-full bg-white border border-border text-muted text-xs font-bold hover:border-primary hover:text-primary transition-all">2</button>
              <button className="flex items-center gap-1 text-[10px] font-bold uppercase text-secondary hover:text-accent transition-colors ml-2">
                Next <ChevronRightIcon className="h-3 w-3" />
              </button>
            </div>

          </main>

        </div>
      </section>
    </div>
  );
}
