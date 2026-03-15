"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Squares2X2Icon, 
  ShoppingBagIcon, 
  TicketIcon, 
  UsersIcon, 
  DocumentTextIcon, 
  PhotoIcon, 
  EnvelopeIcon,
  TagIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  BellIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  ArrowTopRightOnSquareIcon,
  SunIcon,
  MoonIcon,
  Bars3Icon,
  XMarkIcon,
  CircleStackIcon
} from "@heroicons/react/24/outline";

const menuItems = [
  { label: "Dashboard", icon: Squares2X2Icon, href: "/admin", color: "text-green-600" },
  { 
    label: "Products", 
    icon: ShoppingBagIcon, 
    href: "/admin/products",
    subItems: [
      { label: "All Products", href: "/admin/products/all" },
      { label: "All Categories", href: "/admin/products/categories" },
      { label: "All Variations", href: "/admin/products/variations" },
      { label: "All Brands", href: "/admin/products/brands" },
      { label: "All Units", href: "/admin/products/units" },
      { label: "All Taxes", href: "/admin/products/taxes" },
    ]
  },
  { label: "Pos System", icon: TicketIcon, href: "/admin/pos" },
  { label: "Orders", icon: ShoppingBagIcon, href: "/admin/orders", badge: "New" },
  { 
    label: "Stocks", 
    icon: CircleStackIcon, 
    href: "/admin/stocks",
    subItems: [
      { label: "Add Stock", href: "/admin/stocks/add" },
      { label: "All Locations", href: "/admin/stocks/locations" },
    ]
  },
  { 
    label: "Refunds", 
    icon: ArrowPathIcon, 
    href: "/admin/refunds",
    subItems: [
      { label: "Refund Configurations", href: "/admin/refunds/configurations" },
      { label: "Refund Requests", href: "/admin/refunds/requests" },
      { label: "Approved Refunds", href: "/admin/refunds/approved" },
      { label: "Rejected Refunds", href: "/admin/refunds/rejected" },
    ]
  },
  { label: "Rewards & Wallet", icon: ShoppingBagIcon, href: "/admin/rewards", hasChevron: true },
];

const userMenuItems = [
  { label: "Customers", icon: UsersIcon, href: "/admin/customers" },
  { label: "Employee Staffs", icon: UsersIcon, href: "/admin/staffs" },
  { label: "Delivery Men", icon: UsersIcon, href: "/admin/delivery", hasChevron: true },
];

const contentMenuItems = [
  { label: "Tags", icon: TagIcon, href: "/admin/tags" },
  { label: "Pages", icon: DocumentTextIcon, href: "/admin/pages" },
  { label: "Blogs", icon: DocumentTextIcon, href: "/admin/blogs", hasChevron: true },
  { label: "Media Manager", icon: PhotoIcon, href: "/admin/media" },
];

const promotionMenuItems = [
  { label: "Newsletters", icon: EnvelopeIcon, href: "/admin/newsletters", hasChevron: true },
  { label: "Coupons", icon: TicketIcon, href: "/admin/coupons" },
  { label: "Campaigns", icon: ArrowPathIcon, href: "/admin/campaigns" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const pathname = usePathname();

  // Definir estado inicial baseado na tela
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setIsSidebarOpen(true);
    }
  }, []);

  // Se estiver na página de login, não mostra o layout do admin
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.href;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedMenus.includes(item.label);
    const Icon = item.icon;

    const toggleExpand = (e: React.MouseEvent) => {
      if (hasSubItems) {
        e.preventDefault();
        setExpandedMenus(prev => 
          prev.includes(item.label) 
            ? prev.filter(i => i !== item.label) 
            : [...prev, item.label]
        );
      }
    };

    return (
      <div>
        <Link 
          href={hasSubItems ? "#" : item.href}
          onClick={(e) => {
            if (hasSubItems) {
              toggleExpand(e);
            } else if (window.innerWidth < 1024) {
              setIsSidebarOpen(false);
            }
          }}
          className={`flex items-center justify-between px-6 py-3 text-[11px] font-bold transition-all group ${
            isActive && !hasSubItems
              ? "bg-green-50 text-green-600 border-r-4 border-green-600" 
              : "text-gray-500 hover:text-green-600 hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`h-5 w-5 ${isActive && !hasSubItems ? "text-green-600" : "text-gray-400 group-hover:text-green-600"}`} />
            <span>{item.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="bg-orange-500 text-[10px] text-white px-1.5 py-0.5 rounded font-black uppercase italic">
                {item.badge}
              </span>
            )}
            {(item.hasChevron || hasSubItems) && (
              <ChevronRightIcon className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
            )}
          </div>
        </Link>
        
        {/* Sub Items */}
        {hasSubItems && isExpanded && (
          <div className="bg-gray-50/30 pb-2">
            {item.subItems.map((sub: any) => (
              <Link
                key={sub.label}
                href={sub.href}
                onClick={() => {
                  if (window.innerWidth < 1024) setIsSidebarOpen(false);
                }}
                className={`flex items-center gap-3 pl-14 py-2.5 text-[11px] font-bold transition-colors ${
                  pathname === sub.href ? "text-green-600" : "text-gray-400 hover:text-green-600"
                }`}
              >
                <span className="opacity-40">-</span>
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Overlay para Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-white border-r border-gray-100 transition-all duration-300 z-[70] 
        ${isSidebarOpen ? "translate-x-0 w-64 shadow-xl lg:shadow-none" : "-translate-x-full w-64 lg:translate-x-0 lg:w-0"} 
        lg:static flex flex-col h-screen overflow-hidden`}>
        {/* Logo */}
        <div className="p-6 flex items-center justify-between shrink-0">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-200">
               <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" /></svg>
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">Grostore</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 p-1 hover:text-green-500 transition-colors">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* User Profile Info */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/10 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-green-500 shrink-0 shadow-sm">
             <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div className="truncate">
            <p className="text-sm font-black text-gray-800 leading-tight">Admin User</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Super Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto pt-4 pb-10 scrollbar-hide">
          <div className="space-y-0.5">
            {menuItems.map((item) => <NavItem key={item.label} item={item} />)}
          </div>

          <div className="mt-8">
            <p className="px-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4 leading-none">Users</p>
            <div className="space-y-0.5">
              {userMenuItems.map((item) => <NavItem key={item.label} item={item} />)}
            </div>
          </div>

          <div className="mt-8">
            <p className="px-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4 leading-none">Contents</p>
            <div className="space-y-0.5">
              {contentMenuItems.map((item) => <NavItem key={item.label} item={item} />)}
            </div>
          </div>

          <div className="mt-8">
            <p className="px-6 text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-4 leading-none">Promotions</p>
            <div className="space-y-0.5">
              {promotionMenuItems.map((item) => <NavItem key={item.label} item={item} />)}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Topbar compacta como na imagem */}
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-green-500 hover:bg-green-50 p-1.5 rounded-sm transition-colors"
            >
              <Bars3Icon className="h-6 w-6 stroke-2" />
            </button>
            <Link href="/admin" className="flex items-center gap-2">
               <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center text-white scale-90 translate-y-0.5 shadow-md shadow-green-100 lg:hidden">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" /></svg>
               </div>
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 h-full">
            <Link href="/" className="flex items-center gap-1.5 px-2 py-1 hover:bg-gray-50 rounded-sm text-[11px] font-bold text-gray-600 transition-colors uppercase tracking-tight whitespace-nowrap">
               <ArrowTopRightOnSquareIcon className="h-4 w-4 text-gray-400" />
               <span className="hidden sm:inline">Visit Store</span>
            </Link>
            
            <div className="h-4 w-[1px] bg-gray-100 hidden sm:block"></div>

            <button className="p-1.5 text-gray-600 hover:text-green-600 transition-colors">
              <MoonIcon className="h-5 w-5" />
            </button>
            
            <button className="relative p-1.5 text-gray-600 hover:text-green-600 transition-colors group">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-400 border-2 border-white rounded-full scale-90 animate-pulse"></span>
            </button>

            <div className="relative cursor-pointer group px-1 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 relative">
                 <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" className="w-full h-full object-cover" />
                 <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Dash Page Content Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 scroll-smooth overflow-x-hidden">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
          
          {/* Footer Admin agora dentro do scroll */}
          <footer className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-400 border-t border-gray-100 mt-12 uppercase tracking-widest text-center sm:text-left">
            <p>© All Designed, Developed and ❤️ by <span className="text-orange-500">ThemeTags</span></p>
            <p>Grostore Online Store <span className="text-gray-600">v4.6.0</span></p>
          </footer>
        </main>
      </div>
    </div>
  );
}
