"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { 
  HomeIcon, 
  ChevronRightIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Mock data if empty for demonstration as per design
  const displayWishlist = wishlist.length > 0 ? wishlist : [
    { id: "1", name: "The Mountain Adult Unisex T-Shirt - Fire Reaper", price: 165.67, imageUrl: "/tshirt-1.png", slug: "fire-reaper", dateAdded: "March 14, 2026" },
    { id: "2", name: "The Mountain Adult Unisex T-Shirt - Asian Lion", price: 145.27, imageUrl: "/tshirt-1.png", slug: "asian-lion", dateAdded: "March 14, 2026" },
    { id: "3", name: "Nike React Metcon AMP", price: 180.22, imageUrl: "/shoes-1.png", slug: "nike-react", dateAdded: "March 14, 2026" },
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Page Header (Breadcrumbs) */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Wishlist</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">Wishlist</span>
          </nav>
        </div>
      </section>

      {/* 2. Wishlist Table Section */}
      <section className="container-custom py-20">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border">
            <tbody>
              {displayWishlist.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-bg-gray/20 transition-colors">
                  {/* Remove Column */}
                  <td className="p-4 w-12 text-center border-r border-border">
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-muted hover:text-primary transition-colors"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </td>
                  
                  {/* Image Column */}
                  <td className="p-4 w-32 border-r border-border">
                    <div className="relative aspect-square bg-bg-gray overflow-hidden rounded-sm">
                      <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                  </td>

                  {/* Info Column */}
                  <td className="p-6 border-r border-border">
                    <div className="space-y-1">
                      <Link href={`/produto/${item.slug}`} className="text-sm font-black text-primary hover:text-secondary transition-colors uppercase tracking-tight">
                        {item.name}
                      </Link>
                      <p className="text-sm font-bold text-secondary">${item.price.toFixed(2)}</p>
                      <p className="text-[10px] font-medium text-muted uppercase">{item.dateAdded}</p>
                    </div>
                  </td>

                  {/* Action Column */}
                  <td className="p-6 text-right w-48">
                    {item.slug.includes("nike") ? (
                      <Link 
                        href={`/produto/${item.slug}`}
                        className="inline-block bg-primary hover:bg-secondary text-white text-[10px] font-black uppercase px-8 py-3 transition-all rounded-sm shadow-sm"
                      >
                        Read more
                      </Link>
                    ) : (
                      <button 
                        onClick={() => addToCart({
                          id: item.id,
                          name: item.name,
                          price: item.price,
                          imageUrl: item.imageUrl,
                          slug: item.slug,
                          quantity: 1,
                          variation: { size: "M", color: "Teal" }
                        })}
                        className="bg-primary hover:bg-secondary text-white text-[10px] font-black uppercase px-8 py-3 transition-all rounded-sm shadow-sm"
                      >
                        Add to cart
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Wishlist Link Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Wishlist link:</span>
          <div className="flex w-full md:w-auto">
            <input 
              type="text" 
              readOnly 
              value="https://lojanuguia.vercel.app/wishlist/share-7x2" 
              className="bg-white border border-border p-3 text-[10px] font-medium text-muted w-full md:w-80 outline-none"
            />
            <button className="bg-primary hover:bg-secondary text-white text-[10px] font-black uppercase px-6 py-3 transition-all">
              Copy
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
