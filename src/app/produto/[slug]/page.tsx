"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HeartIcon, 
  ShoppingBagIcon,
  ChevronRightIcon,
  StarIcon
} from "@heroicons/react/24/outline";
import { 
  StarIcon as StarSolidIcon,
  HeartIcon as HeartSolidIcon
} from "@heroicons/react/24/solid";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock data for a single product with variations
const PRODUCT = {
  id: "44",
  name: "Animal Spirit Circle Womens T-Shirt",
  price: 197.79,
  description: "Experience premium comfort with our Animal Spirit Circle T-Shirt. Made from 100% organic cotton, this t-shirt features a unique spiritual design printed with eco-friendly inks. Perfect for casual wear or as a statement piece.",
  category: "T-Shirts",
  images: ["/tshirt-1.png", "/tshirt-1.png", "/tshirt-1.png"],
  variations: {
    size: ["S", "M", "L", "XL"],
    color: [
      { name: "Teal", hex: "#4db8c4" },
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" }
    ]
  },
  sku: "T-AS-001",
  rating: 4.8,
  reviewsCount: 15
};

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(PRODUCT.variations.color[0]);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(PRODUCT.images[0]);

  const isFavorited = isInWishlist(PRODUCT.id);

  const handleWishlist = () => {
    if (isFavorited) {
      removeFromWishlist(PRODUCT.id);
    } else {
      addToWishlist({
        id: PRODUCT.id,
        name: PRODUCT.name,
        price: PRODUCT.price,
        imageUrl: PRODUCT.images[0],
        slug: slug,
        dateAdded: ""
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      imageUrl: PRODUCT.images[0],
      slug: slug,
      quantity: quantity,
      variation: {
        size: selectedSize,
        color: selectedColor.name
      }
    });
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-bg-gray py-4">
        <div className="container-custom flex items-center gap-2 text-xs text-muted uppercase tracking-widest font-bold">
          <Link href="/">Home</Link>
          <ChevronRightIcon className="h-3 w-3" />
          <Link href="/shop">Shop</Link>
          <ChevronRightIcon className="h-3 w-3" />
          <span className="text-secondary">{PRODUCT.name}</span>
        </div>
      </div>

      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square bg-bg-gray overflow-hidden">
              <Image 
                src={mainImage} 
                alt={PRODUCT.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {PRODUCT.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={cn(
                    "relative aspect-square bg-bg-gray overflow-hidden border-2",
                    mainImage === img ? "border-accent" : "border-transparent"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                i < Math.floor(PRODUCT.rating) ? (
                  <StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarIcon key={i} className="h-4 w-4 text-muted" />
                )
              ))}
              <span className="text-xs text-muted ml-2">({PRODUCT.reviewsCount} customer reviews)</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-secondary uppercase tracking-tight mb-4">
              {PRODUCT.name}
            </h1>

            <span className="text-2xl font-bold text-primary mb-6">
              ${PRODUCT.price.toFixed(2)}
            </span>

            <p className="text-muted text-sm leading-relaxed mb-8 border-b border-border pb-8">
              {PRODUCT.description}
            </p>

            {/* Variations */}
            <div className="space-y-6 mb-8">
              {/* Size */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Size: <span className="text-muted">{selectedSize}</span></h4>
                <div className="flex gap-2">
                  {PRODUCT.variations.size.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-10 w-10 text-xs font-bold flex items-center justify-center border transition-all",
                        selectedSize === size 
                          ? "bg-secondary text-white border-secondary" 
                          : "bg-white text-secondary border-border hover:border-accent"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-3">Color: <span className="text-muted">{selectedColor.name}</span></h4>
                <div className="flex gap-3">
                  {PRODUCT.variations.color.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 transition-all p-0.5",
                        selectedColor.name === color.name ? "border-accent" : "border-transparent"
                      )}
                    >
                      <div className="w-full h-full rounded-full" style={{ backgroundColor: color.hex }}></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart Area */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-border">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:text-accent"
                >
                  -
                </button>
                <span className="px-4 font-bold text-sm w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:text-accent"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-accent text-white font-bold uppercase tracking-widest text-xs py-4 px-8 hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBagIcon className="h-5 w-5" />
                Add to Cart
              </button>
              <button 
                onClick={handleWishlist}
                className={cn(
                  "border border-border p-4 transition-colors",
                  isFavorited ? "text-primary border-primary" : "hover:border-primary hover:text-primary"
                )}
              >
                {isFavorited ? <HeartSolidIcon className="h-5 w-5" /> : <HeartIcon className="h-5 w-5" />}
              </button>
            </div>

            {/* Metadata */}
            <div className="pt-8 border-t border-border space-y-2 text-xs font-bold uppercase tracking-widest">
              <p>SKU: <span className="text-muted font-normal">{PRODUCT.sku}</span></p>
              <p>Category: <span className="text-muted font-normal">{PRODUCT.category}</span></p>
              <p>Share: <span className="text-muted font-normal">FB, TW, PI, WA</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Link mock just for the component to compile without needing a full shop route yet
// function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
//   return <a href={href} className={className}>{children}</a>;
// }
