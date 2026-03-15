"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "KBETHOS Comfortable Soft Slouchy Beanie Collection", price: 184.95, imageUrl: "/product-shoes-1.png", slug: "beanie-collection" },
  { id: "2", name: "Mountain Adult Unisex T-Shirt - Asian Lion", price: 145.27, imageUrl: "/tshirt-1.png", slug: "asian-lion-tshirt" },
  { id: "3", name: "Elegant Summer Handbag", price: 89.00, imageUrl: "/product-shoes-1.png", slug: "summer-handbag" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const filtered = MOCK_PRODUCTS.filter(p => 
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 500); // Simulate API call
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-32 bg-white/95 backdrop-blur-md animate-in fade-in duration-300">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-secondary hover:text-primary transition-all p-2 border border-border rounded-full hover:rotate-90"
      >
        <XMarkIcon className="h-8 w-8" />
      </button>

      <div className="w-full max-w-2xl px-6 animate-in slide-in-from-top-4 duration-500">
        {/* Search Input Area */}
        <div className="relative group">
          <div className="flex items-center bg-white border-2 border-[#3ba1da] shadow-lg overflow-hidden transition-all focus-within:ring-4 focus-within:ring-[#3ba1da]/20">
            <div className="pl-4 flex items-center">
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-[#3ba1da] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <MagnifyingGlassIcon className="h-5 w-5 text-[#3ba1da]" />
              )}
            </div>
            <input 
              ref={inputRef}
              type="text" 
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-4 pl-3 outline-none text-secondary font-medium tracking-tight"
            />
            <button className="bg-[#3ba1da] hover:bg-secondary text-white px-8 h-full min-h-[56px] text-xs font-black uppercase tracking-widest transition-all">
              Search
            </button>
          </div>

          {/* Results Dropdown */}
          {query.length > 1 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-2xl mt-1 border border-border animate-in fade-in slide-in-from-top-2 duration-300 z-10 max-h-[400px] overflow-y-auto">
              {results.length > 0 ? (
                <div className="divide-y divide-border">
                  {results.map((product) => (
                    <Link 
                      key={product.id}
                      href={`/produto/${product.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 p-4 hover:bg-bg-gray transition-colors group/item"
                    >
                      <div className="relative h-16 w-16 bg-bg-gray overflow-hidden">
                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-secondary uppercase tracking-tight group-hover/item:text-primary transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs font-bold text-[#3ba1da] mt-1">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : !isLoading && (
                <div className="p-10 text-center text-muted text-xs font-bold uppercase tracking-widest">
                  No products found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
