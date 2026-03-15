"use client";

import { 
  PlusIcon, 
  ShoppingBagIcon, 
  EyeIcon, 
  ArrowUpIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ShoppingCartIcon,
  ScaleIcon,
  UserGroupIcon,
  VideoCameraIcon,
  RectangleStackIcon,
  ArrowPathIcon,
  EnvelopeIcon,
  Squares2X2Icon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

// Mock Data para a Tabela de Pedidos
const recentOrders = [
  { id: "#G-Store:239", customer: "Customer", phone: "123456789", date: "15 Mar, 2026", items: 1, payment: "Paid", delivery: "Delivered", type: "Regular" },
  { id: "#G-Store:238", customer: "Customer", phone: "123456789", date: "13 Mar, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: "#G-Store:237", customer: "Customer", phone: "123456789", date: "12 Mar, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: "#G-Store:236", customer: "Customer", phone: "123456789", date: "12 Mar, 2026", items: 7, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: "#G-Store:235", customer: "-", phone: "", date: "12 Mar, 2026", items: 2, payment: "Paid", delivery: "Delivered", type: "Regular" },
  { id: "#G-Store:234", customer: "Customer", phone: "123456789", date: "06 Mar, 2026", items: 1, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: "#G-Store:233", customer: "Customer", phone: "123456789", date: "03 Mar, 2026", items: 2, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: "#G-Store:232", customer: "-", phone: "", date: "02 Mar, 2026", items: 1, payment: "Paid", delivery: "Delivered", type: "Regular" },
  { id: "#G-Store:231", customer: "Customer", phone: "123456789", date: "01 Mar, 2026", items: 3, payment: "Unpaid", delivery: "Order Placed", type: "Regular" },
  { id: "#G-Store:230", customer: "Jordan Castillo", phone: "+1 (179) 3242633", date: "28 Feb, 2026", items: 1, payment: "Paid", delivery: "Delivered", type: "Regular" },
];

// Mock Data para Top Selling Products
const topProducts = [
  { name: "Chicken Meat Buffalo Wing", brand: "Bird Wings", price: "59", sales: 59 },
  { name: "Aged Beef Steak Beef", brand: "Nexover", price: "37", sales: 37 },
  { name: "Audi Sheesham Wood Dining...", brand: "Bird Wings", price: "34", sales: 34 },
  { name: "Black Grapes", brand: "Bird Wings", price: "33", sales: 33 },
  { name: "Steak Cattle Meat", brand: "Bird Wings", price: "32", sales: 32 },
  { name: "Aged Beef Steak Beef", brand: "Bird Wings", price: "24", sales: 24 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* 1. Header do Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-sm border border-gray-200">
        <h1 className="text-xl font-black text-gray-800 uppercase tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-border text-[10px] font-bold text-gray-500 uppercase rounded hover:bg-gray-50 transition-colors">
            <ShoppingCartIcon className="h-4 w-4" />
            Manage Sales
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-[10px] font-bold text-white uppercase rounded hover:bg-green-700 transition-colors">
            <PlusIcon className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* 2. Top Stats Grid (Charts) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Earning Chart Card */}
        <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-200">
           <div className="flex justify-between items-center mb-4">
             <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Earning</p>
             <div className="flex items-center gap-1 cursor-pointer">
                <span className="text-[10px] text-gray-400 font-bold">Last 7 days</span>
                <ChevronRightIcon className="h-3 w-3 rotate-90 text-gray-400" />
             </div>
           </div>
           <p className="text-2xl font-black text-gray-800 tracking-tight">$84,320.01</p>
           {/* Mini Line Chart Placeholder */}
           <div className="h-24 mt-4 flex items-end">
             <svg className="w-full h-full" preserveAspectRatio="none">
               <path 
                d="M 0 80 Q 20 20 40 40 T 80 10 T 120 50 T 160 30 T 200 60 L 200 100 L 0 100 Z" 
                fill="url(#gradient-earn)" 
                stroke="#f97316" 
                strokeWidth="2"
              />
               <defs>
                 <linearGradient id="gradient-earn" x1="0" x2="0" y1="0" y2="1">
                   <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                   <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                 </linearGradient>
               </defs>
             </svg>
           </div>
        </div>

        {/* Categories Pie Card */}
        <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-200">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Top 5 Category Sales</p>
           <p className="text-2xl font-black text-gray-800 tracking-tight mb-4">1685</p>
           <div className="flex items-center gap-6">
             <div className="relative h-28 w-28 shrink-0">
               <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                 <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="4" />
                 <circle cx="18" cy="18" r="16" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="30, 100" strokeDashoffset="0" />
                 <circle cx="18" cy="18" r="16" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="20, 100" strokeDashoffset="-30" />
                 <circle cx="18" cy="18" r="16" fill="none" stroke="#f97316" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-50" />
                 <circle cx="18" cy="18" r="16" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="10, 100" strokeDashoffset="-65" />
               </svg>
             </div>
             <ul className="text-[9px] font-bold text-gray-500 uppercase space-y-2">
               <li className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Fresh Chicken</li>
               <li className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Duck Meat</li>
               <li className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Chair</li>
               <li className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Jam & Jelly</li>
             </ul>
           </div>
        </div>

        {/* Orders Bar Card */}
        <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-200">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Last 30 Days Orders</p>
           <p className="text-2xl font-black text-gray-800 tracking-tight mb-8">21</p>
           <div className="flex items-end gap-1.5 h-20">
             {[20, 40, 30, 60, 45, 15, 35, 70, 40, 30, 20, 80, 50, 60, 25, 40, 10, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500 rounded-t-[1px]" style={{ height: `${h}%` }}></div>
             ))}
           </div>
        </div>

        {/* Top Selling Products Card */}
        <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-200 lg:row-span-2">
           <p className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1">Top Selling Products</p>
           <p className="text-[10px] font-bold text-gray-400 mb-6 italic">We have listed 44 total products.</p>
           <div className="space-y-6">
             {topProducts.map((p, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-1 -m-1 rounded-sm transition-colors">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-50 rounded-sm overflow-hidden flex items-center justify-center border border-gray-100 p-1.5">
                         <img src={`https://picsum.photos/seed/prod${i}/100`} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-gray-800 line-clamp-1">{p.name}</p>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Brand: {p.brand}</p>
                      </div>
                   </div>
                   <span className="text-[10px] font-black text-gray-800">({p.sales})</span>
                </div>
             ))}
           </div>
        </div>

        {/* Sales This Month Large Chart Card */}
        <div className="md:col-span-2 lg:col-span-3 bg-white p-4 sm:p-6 rounded-sm border border-gray-200">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Sales This Months</p>
           <p className="text-xl font-black text-gray-800 tracking-tight mb-8">$156,485.03</p>
           <div className="h-64 relative flex flex-col pt-4">
              {/* Y-Axis Labels as in image */}
              <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] font-bold text-gray-300 leading-none">
                 <span>800.000000000000</span>
                 <span>600.000000000000</span>
                 <span>400.000000000000</span>
                 <span>200.000000000000</span>
                 <span>0.000000000000</span>
              </div>
              <div className="flex-1 ml-28 border-l border-gray-50 relative">
                  <svg className="w-full h-full" preserveAspectRatio="none">
                    <path 
                        d="M 0 150 L 50 140 L 100 160 L 150 110 L 200 130 L 250 80 L 300 110 L 350 40 L 400 90 L 450 120 L 500 145 L 800 145" 
                        fill="none" 
                        stroke="#22c55e" 
                        strokeWidth="3"
                        className="animate-draw-path"
                    />
                    <path 
                        d="M 0 150 L 50 140 L 100 160 L 150 110 L 200 130 L 250 80 L 300 110 L 350 40 L 400 90 L 450 120 L 500 145 L 800 145 L 800 240 L 0 240 Z" 
                        fill="url(#gradient-sales-main)" 
                    />
                    <defs>
                        <linearGradient id="gradient-sales-main" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Horizontal Grid Lines */}
                    {[20, 60, 100, 140, 180, 220].map((y) => (
                       <line key={y} x1="0" y1={y} x2="100%" y2={y} stroke="#f8f9fa" strokeWidth="1.5" />
                    ))}
                  </svg>
              </div>
           </div>
        </div>
      </div>

      {/* 3. Order Status Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Orders", val: "239", icon: ShoppingBagIcon, color: "text-green-600", light: "bg-green-50" },
          { label: "Order Pending", val: "103", icon: ClockIcon, color: "text-orange-600", light: "bg-orange-50" },
          { label: "Order Processing", val: "0", icon: ArrowPathIcon, color: "text-blue-600", light: "bg-blue-50" },
          { label: "Total Delivered", val: "136", icon: CheckCircleIcon, color: "text-green-600", light: "bg-green-50" },
        ].map((c, i) => (
          <div key={i} className="bg-white p-5 flex items-center gap-6 rounded-sm border border-gray-200">
            <div className={`p-4 rounded-sm ${c.light}`}>
               <c.icon className={`h-6 w-6 ${c.color}`} />
            </div>
            <div>
               <p className="text-xl font-black text-gray-800 tracking-tight">{c.val}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Recent Orders Table */}
      <div className="bg-white rounded-sm border border-gray-200">
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div>
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-tight mb-1">Recent Orders</h2>
            <p className="text-[10px] font-semibold text-gray-400 italic">Your 10 Most Recent Orders</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-green-600 text-[10px] font-bold text-white uppercase rounded hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
            <EyeIcon className="h-4 w-4" />
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f8f9fa] border-b border-gray-200">
              <tr className="text-left">
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Order Code</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Customer</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Placed On</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Items</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Payment Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Delivery Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Delivery Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-600">
              {recentOrders.map((order, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-500">{order.id}</td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2">
                        {order.customer !== "-" && (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                             <img src={`https://i.pravatar.cc/100?u=${order.id}`} className="w-full h-full rounded-full" />
                          </div>
                        )}
                        <div>
                           <p className="text-[10px] font-bold text-gray-800">{order.customer}</p>
                           {order.phone && <p className="text-[9px] text-gray-400">{order.phone}</p>}
                        </div>
                     </div>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 text-center font-black">{order.items}</td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-0.5 rounded-sm text-[8px] font-black uppercase italic ${
                       order.payment === "Paid" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"
                     }`}>
                       {order.payment}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <span className={`px-2 py-0.5 rounded-sm text-[8px] font-black uppercase italic ${
                       order.delivery === "Delivered" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-500"
                     }`}>
                       {order.delivery}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-[10px] font-bold text-gray-400">{order.type}</td>
                  <td className="px-6 py-4 group">
                     <button className="text-gray-400 hover:text-green-600">
                        <EyeIcon className="h-4 w-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Metrics Grid (16 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Picked Up Orders", val: "0", icon: ArrowUpIcon, color: "text-blue-500", bg: "bg-blue-50" },
          { label: "Cancelled Orders", val: "0", icon: XCircleIcon, color: "text-orange-500", bg: "bg-orange-50" },
          { label: "Out For Delivery", val: "0", icon: TruckIcon, color: "text-yellow-500", bg: "bg-yellow-50" },
          { label: "Paid Orders", val: "151", icon: CurrencyDollarIcon, color: "text-green-500", bg: "bg-green-50" },
          
          { label: "Unpaid Orders", val: "88", icon: RectangleStackIcon, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Today's Earning", val: "$17,000.00", icon: ClockIcon, color: "text-orange-600", bg: "bg-orange-100" },
          { label: "Today's Pending Earning", val: "$0.00", icon: BanknotesIcon, color: "text-yellow-600", bg: "bg-yellow-100" },
          { label: "This Year Earning", val: "$1,426,895.10", icon: ScaleIcon, color: "text-green-600", bg: "bg-green-100" },

          { label: "Total Earning", val: "$5,968,263.46", icon: CurrencyDollarIcon, color: "text-blue-700", bg: "bg-blue-50" },
          { label: "Total Product Sale", val: "551", icon: ShoppingCartIcon, color: "text-orange-700", bg: "bg-orange-50" },
          { label: "Today's Product Sale", val: "1", icon: ShoppingBagIcon, color: "text-yellow-700", bg: "bg-yellow-50" },
          { label: "This Month's Product Sale", val: "20", icon: CheckCircleIcon, color: "text-green-700", bg: "bg-green-50" },

          { label: "This Year's Product Sale", val: "115", icon: ArrowPathIcon, color: "text-blue-800", bg: "bg-blue-100" },
          { label: "Total Customers", val: "32", icon: UserGroupIcon, color: "text-orange-800", bg: "bg-orange-100" },
          { label: "Total Subscribers", val: "3", icon: EnvelopeIcon, color: "text-yellow-800", bg: "bg-yellow-100" },
          { label: "Total Categories", val: "22", icon: Squares2X2Icon, color: "text-green-800", bg: "bg-green-100" },
        ].map((m, i) => (
          <div key={i} className="bg-white p-5 flex items-center gap-6 rounded-sm border border-gray-200">
            <div className={`p-4 rounded-full ${m.bg}`}>
               <m.icon className={`h-6 w-6 ${m.color}`} />
            </div>
            <div>
               <p className="text-xl font-black text-gray-800 tracking-tight leading-none mb-1">{m.val}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{m.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
