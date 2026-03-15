"use client";

import Link from "next/link";
import { 
  HomeIcon, 
  ChevronRightIcon, 
  CreditCardIcon, 
  TruckIcon, 
  HomeModernIcon, 
  GlobeAltIcon,
  MapPinIcon
} from "@heroicons/react/24/outline";

export default function DeliveryInformationPage() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* 1. Page Header */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Shipping method</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">Shipping method</span>
          </nav>
        </div>
      </section>

      <section className="container-custom py-24 space-y-32">
        
        {/* Section 1: Cash & Carry */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-64 w-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-bg-gray rounded-full opacity-50 scale-90 translate-x-4 -translate-y-4"></div>
              <div className="relative z-10 p-12 bg-white rounded-full border-2 border-border shadow-2xl">
                <CreditCardIcon className="h-24 w-24 text-secondary stroke-[1.5]" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight leading-none">Cash & Carry</h2>
            <div className="space-y-4 text-xs font-medium text-muted leading-relaxed italic">
              <p>
                Items purchased at full price within 5 days of being moved to the Choose What You Pay collection 
                are eligible for a store credit refund for the difference in price. Refunds will be issued 
                in the form of a store credit, and cannot be applied retroactively. Your store credit 
                never expires, and will automatically deduct from your next purchase at checkout.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  Standard orders take up to 14 business days to arrive.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  Expedited orders are shipped via DHL Express.
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  Expedited shipping takes up to 5 business days to arrive.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: Pick-up-Point Locator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight leading-none">Pick-up-Point Locator</h2>
            <div className="space-y-4 text-xs font-medium text-muted leading-relaxed italic">
              <p>
                We offer some items for sale before they actually arrive. When you preorder these items, 
                we'll ship them out 1-2 business days after they become available at our warehouse.
              </p>
              <p>
                You can tell if you're purchasing an item that is a preorder item on both the product 
                page and at checkout. Once you've placed your order, you can double-check our 
                estimated restock date on the product page, and we'll make sure to send you a shipping 
                confirmation email once the item leaves our warehouse.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative h-64 w-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/10 rounded-full opacity-60 scale-105 translate-x-2 translate-y-2"></div>
              <div className="relative z-10 p-12 bg-white rounded-sm border-2 border-secondary shadow-2xl overflow-hidden group">
                <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/20 rounded-full group-hover:scale-125 transition-transform duration-500"></div>
                <TruckIcon className="relative z-20 h-24 w-24 text-secondary stroke-[1.5]" />
                <MapPinIcon className="absolute top-8 right-8 h-8 w-8 text-primary animate-bounce decoration-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Door-to-door shipping service */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative h-64 w-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-bg-gray rounded-full opacity-50 -translate-x-4 translate-y-4"></div>
              <div className="relative z-10 p-12 bg-white rounded-full border-2 border-border shadow-2xl">
                <HomeModernIcon className="h-24 w-24 text-secondary stroke-[1.5]" />
                <div className="absolute bottom-10 right-10 flex flex-col gap-1">
                  <div className="w-8 h-6 bg-primary/20 border border-primary/40 rounded-sm"></div>
                  <div className="w-8 h-6 bg-primary/40 border border-primary/60 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight leading-none">Door-to-door shipping service</h2>
            <div className="space-y-4 text-xs font-medium text-muted leading-relaxed italic">
              <p>
                For orders shipping to Australia, Canada, Hong Kong and countries in the European 
                Union (excluding Switzerland), we offer standard shipping for a flat fee of $15 per order 
                and expedited shipping for a flat fee of $75 per order.
              </p>
              <p>
                Orders over $250 USD (excluding duties, taxes, and shipping) will receive free standard 
                shipping.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: International Parcel Delivery */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left lg:text-left">
          <div className="order-2 lg:order-1 space-y-6">
            <h2 className="text-3xl font-black text-secondary uppercase tracking-tight leading-none">International Parcel Delivery</h2>
            <div className="space-y-4 text-xs font-medium text-muted leading-relaxed italic">
              <p>
                For all other international countries, we offer expedited shipping for a flat fee of $25 per 
                order. Orders over $500 USD (excluding duties, taxes, and shipping) will receive free 
                standard shipping.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  All in-stock orders (both standard and expedited) are processed within 1-2 business days.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  First time orders and orders with two or more items receive free economy US Shipping.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                  Express U.S. Shipping costs between $14.95 and $19.95 based on your location and the weight of your order.
                </li>
              </ul>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative h-64 w-64 flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[10%] w-[120%] h-[50%] bg-primary/20 rounded-full -rotate-12"></div>
              <div className="relative z-10 p-12 bg-white rounded-full border-2 border-secondary shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 h-1/2 w-full bg-primary/10 transition-all duration-700"></div>
                <GlobeAltIcon className="relative z-20 h-24 w-24 text-secondary stroke-[1.5]" />
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
