"use client";

import { useState, use } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { 
  Squares2X2Icon, 
  ListBulletIcon,
  ChevronRightIcon,
  HomeIcon
} from "@heroicons/react/24/outline";

// Mock Data (Sync with Shop Page or move to a central file later in Phase 2)
const ALL_PRODUCTS = [
  { id: "1", name: "Air Jordan 1 Mid SE", slug: "jordan-mid", price: 100.16, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "2", name: "Brown Velvet Coat", slug: "velvet-coat", price: 104.84, imageUrl: "/tshirt-1.png", category: "Clothing", internalCat: "moda-masculino" },
  { id: "3", name: "Business Leather Bag", slug: "leather-bag", price: 144.36, imageUrl: "/tshirt-1.png", category: "Bags", internalCat: "bolsas" },
  { id: "4", name: "Fabric Patterned Bag", slug: "patterned-bag", price: 123.66, imageUrl: "/tshirt-1.png", category: "Bags", internalCat: "bolsas" },
  { id: "5", name: "Jordan 'Why Not?' Zer0.3 PF", slug: "jordan-zero", price: 191.23, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "6", name: "Kyrie 6 By You", slug: "kyrie-6-by-you", price: 190.85, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "7", name: "Kyrie 6 EP 'Chinese New Year'", slug: "kyrie-cny", price: 167.72, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "8", name: "Nike Air Force 1 '07 LV8", slug: "nike-af1", price: 107.18, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "9", name: "Nike Air Max 97", slug: "nike-am97", price: 121.47, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "10", name: "Nike Daybreak", slug: "nike-daybreak", price: 145.93, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "11", name: "Nike Free RN Flyknit 3.0", slug: "nike-free", price: 107.18, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
  { id: "12", name: "Nike MX-720-818", slug: "nike-mx", price: 193.97, imageUrl: "/shoes-1.png", category: "Shoes", internalCat: "calcados" },
];

const CATEGORIES_SIDEBAR = [
  "Bolsas", "Calçados", "Moda Feminina", "Moda Masculina", "Acessórios", "Promoções"
];

const COLORS = [
  { name: "Black", class: "bg-black" },
  { name: "Blue", class: "bg-blue-500" },
  { name: "Red", class: "bg-red-500" },
  { name: "White", class: "bg-white border border-border" },
];

const SIZES = ["L", "M", "S", "XL"];

const SLUG_TO_TITLE: Record<string, string> = {
  "bolsas": "Bolsas",
  "calcados": "Calçados",
  "moda-feminina": "Moda Feminina",
  "moda-masculino": "Moda Masculina"
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const categoryTitle = SLUG_TO_TITLE[slug] || slug.replace("-", " ");
  const filteredProducts = ALL_PRODUCTS.filter(p => p.internalCat === slug);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Hero */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
            {categoryTitle}
          </h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">{categoryTitle}</span>
          </nav>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="container-custom py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 space-y-12">
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Categorias</h3>
              <ul className="space-y-3">
                {CATEGORIES_SIDEBAR.map(cat => (
                  <li key={cat}>
                    <button className="text-xs font-medium text-muted hover:text-accent transition-colors">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Filtrar por Preço</h3>
              <div className="px-2">
                <div className="h-1 bg-primary rounded-full relative mb-6">
                  <div className="absolute -left-1 -top-1 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
                  <div className="absolute -right-1 -top-1 w-3 h-3 bg-white border-2 border-primary rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="bg-primary text-white text-[10px] font-bold uppercase px-6 py-2 rounded-sm">Filtrar</button>
                  <span className="text-[10px] font-bold text-muted uppercase">Preço: <span className="text-secondary">$0 — $500</span></span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="w-full lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-4 border-b border-border gap-4">
              <span className="text-xs text-muted font-medium">
                Showing {filteredProducts.length} results for "{categoryTitle}"
              </span>
              
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
                  <option>Ordenação padrão</option>
                  <option>Preço: menor para maior</option>
                  <option>Preço: maior para menor</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map(product => (
                <div key={product.id}>
                   <ProductCard {...product} />
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full py-20 text-center">
                  <p className="text-muted text-sm font-medium">Nenhum produto encontrado nesta categoria no momento.</p>
                </div>
              )}
            </div>
          </main>

        </div>
      </section>
    </div>
  );
}
