import Image from "next/image";
import Link from "next/link";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
}

export default function ProductCard({
  id,
  name,
  slug,
  price,
  oldPrice,
  imageUrl,
  category,
  isNew
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorited = isInWishlist(id);

  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorited) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, imageUrl, slug, dateAdded: "" });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      name,
      price,
      imageUrl,
      slug,
      quantity: 1
    });
  };

  return (
    <div className="group relative flex flex-col items-center bg-white p-2">
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-gray">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-primary px-2 py-1 text-[10px] font-bold text-white uppercase">
              -{discount}%
            </span>
          )}
          {isNew && (
            <span className="bg-accent px-2 py-1 text-[10px] font-bold text-white uppercase">
              NEW
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-4 right-4 z-10 flex translate-x-12 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <button 
            onClick={handleWishlist}
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-secondary hover:text-white transition-colors ${isFavorited ? "text-primary" : "text-secondary"}`}
          >
            {isFavorited ? <HeartSolidIcon className="h-5 w-5" /> : <HeartIcon className="h-5 w-5" />}
          </button>
          <button 
            onClick={handleAddToCart}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md hover:bg-secondary hover:text-white transition-colors text-secondary"
          >
            <ShoppingBagIcon className="h-5 w-5" />
          </button>
        </div>

        <Link href={`/produto/${slug}`} className="block h-full w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col items-center text-center">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
          {category}
        </span>
        <Link href={`/produto/${slug}`} className="mt-1 block">
          <h3 className="text-sm font-bold text-secondary hover:text-accent transition-colors truncate max-w-[200px]">
            {name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          {oldPrice && (
            <span className="text-xs text-muted line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
          <span className="text-sm font-bold text-primary">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
