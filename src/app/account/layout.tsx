"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HomeIcon, 
  ChevronRightIcon,
  Squares2X2Icon,
  ShoppingBagIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon
} from "@heroicons/react/24/outline";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/account", icon: Squares2X2Icon },
  { label: "Orders", href: "/account/orders", icon: ShoppingBagIcon },
  { label: "Addresses", href: "/account/address", icon: MapPinIcon },
  { label: "Account details", href: "/account/details", icon: UserIcon },
  { label: "Logout", href: "/logout", icon: ArrowLeftOnRectangleIcon },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Page Header (Breadcrumbs) */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">My account</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">My account</span>
          </nav>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <section className="container-custom py-20">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-1/4">
            <nav className="border border-border">
              <ul className="divide-y divide-border">
                {MENU_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.label}>
                      <Link 
                        href={item.href}
                        className={`flex items-center justify-between px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
                          isActive ? "text-primary bg-bg-gray/50" : "text-secondary hover:text-primary hover:bg-bg-gray/30"
                        }`}
                      >
                        {item.label}
                        <item.icon className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted/50"}`} />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Page Content */}
          <main className="w-full lg:w-3/4">
            {children}
          </main>

        </div>
      </section>
    </div>
  );
}
