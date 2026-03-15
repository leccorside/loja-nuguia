"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* 1. Page Header */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Page Not Found</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">Error 404: Page not found</span>
          </nav>
        </div>
      </section>

      {/* 2. Content Section */}
      <div className="container-custom py-24 flex flex-col items-center text-center">
        {/* Illustration */}
        <div className="relative w-full max-w-lg aspect-video mb-12">
          <Image 
            src="/404.png" 
            alt="404 Illustration" 
            fill 
            className="object-contain"
          />
        </div>

        {/* Text */}
        <h2 className="text-5xl font-black text-secondary uppercase tracking-tight mb-6">
          Oop, that link is broken.
        </h2>
        
        <p className="text-sm font-medium text-muted max-w-md leading-relaxed">
          Page doesn't exist or some other error occurred. Go to our{" "}
          <button 
            onClick={() => window.history.back()}
            className="text-primary hover:text-secondary underline underline-offset-4 transition-colors"
          >
            Previous page
          </button>{" "}
          or go back to{" "}
          <Link href="/" className="text-primary hover:text-secondary underline underline-offset-4 transition-colors">
            Home page
          </Link>
        </p>
      </div>
    </div>
  );
}
