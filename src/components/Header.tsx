"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { 
  MagnifyingGlassIcon, 
  UserIcon, 
  HeartIcon, 
  ShoppingBagIcon,
  PhoneIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import SearchModal from "@/components/SearchModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  return (
    <header className="w-full bg-white">
      {/* Top Bar */}
      <div className="hidden border-b border-border py-2 text-xs md:block">
        <div className="container-custom flex justify-between items-center text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <PhoneIcon className="h-4 w-4" />
              CALL US: +55 11 9999-9999
            </span>
            <span>FREE shipping on domestic orders over $150</span>
          </div>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-accent">About Us</Link>
            <Link href="/contact" className="hover:text-accent">Contact</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border py-4 md:py-6">
        <div className="container-custom flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter text-secondary">
            ekommart<span className="text-accent underline decoration-2 underline-offset-4">.</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 text-sm font-medium uppercase md:flex md:items-center">
            <Link href="/" className="hover:text-accent">Home</Link>
            <Link href="/shop" className="hover:text-accent">Shop</Link>
            
            {/* Categories with Dropdown */}
            <div className="relative group flex items-center">
              <button className="flex items-center gap-1 hover:text-accent uppercase">
                Categories
                <ChevronDownIcon className="h-3 w-3" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-64 bg-white shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <ul className="flex flex-col py-2">
                  {[
                    { label: "Bolsas", href: "/category/bolsas" },
                    { label: "Calçados", href: "/category/calcados" },
                    { label: "Moda Feminina", href: "/category/moda-feminina" },
                    { label: "Moda Masculina", href: "/category/moda-masculino" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link 
                        href={item.href} 
                        className="block px-6 py-3 text-xs font-medium text-secondary hover:text-accent hover:bg-bg-gray transition-colors border-b border-border/50 last:border-0"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Link href="/blog" className="hover:text-accent">Blog</Link>
            <Link href="/contact" className="hover:text-accent">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-secondary hover:text-accent"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            {/* User Account Dropdown */}
            <div className="relative group/user hidden md:block">
              <button className="text-secondary hover:text-accent">
                <UserIcon className="h-6 w-6" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-4 w-56 bg-white shadow-xl border border-border opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible transition-all duration-300 z-50 border-t-2 border-primary">
                <ul className="flex flex-col py-4">
                  {[
                    { label: "Dashboard", href: "/account" },
                    { label: "Orders", href: "/account/orders" },
                    { label: "Edit Address", href: "/account/address" },
                    { label: "Account Details", href: "/account/details" },
                    { label: "Log Out", href: "/logout" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link 
                        href={item.href} 
                        className="block px-8 py-3 text-sm font-medium text-secondary hover:text-accent transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/wishlist" className="relative hidden text-secondary hover:text-accent md:block">
              <HeartIcon className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/carrinho" className="relative text-secondary hover:text-accent">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-b border-border bg-white md:hidden">
          <nav className="flex flex-col p-4 space-y-4 text-sm font-medium uppercase">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link href="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
