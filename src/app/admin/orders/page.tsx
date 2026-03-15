"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EyeIcon,
  PrinterIcon,
  TrashIcon,
  XMarkIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

// Mock Data for Orders
interface Order {
  id: number;
  code: string;
  customerName: string;
  customerPhone: string;
  customerAvatar: string;
  placedOn: string;
  items: number;
  paymentStatus: "Unpaid" | "Paid";
  status: "Order Placed" | "Processing" | "Delivered" | "Cancelled";
  type: string;
  location: string;
}

const ordersData: Order[] = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  code: `#G-Store:${238 - i}`,
  customerName: "Customer",
  customerPhone: "123456789",
  customerAvatar: `https://i.pravatar.cc/150?u=${i}`,
  placedOn: `${25 - i} Mar, 2026`,
  items: Math.floor(Math.random() * 5) + 1,
  paymentStatus: "Unpaid",
  status: "Order Placed",
  type: "Regular",
  location: "Default Location"
}));

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("Payment Status");
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState("Delivery Status");
  const [locationFilter, setLocationFilter] = useState("Location");
  const [orders, setOrders] = useState<Order[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Generate data on client side to avoid hydration mismatch
    const data: Order[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      code: `${238 - i}`, // Removing #G-Store prefix from the data itself to simplify routing
      customerName: "Customer",
      customerPhone: "123456789",
      customerAvatar: `https://i.pravatar.cc/150?u=${i}`,
      placedOn: `${25 - i} Mar, 2026`,
      items: Math.floor(Math.random() * 5) + 1,
      paymentStatus: "Unpaid",
      status: "Order Placed",
      type: "Regular",
      location: "Default Location"
    }));
    setOrders(data);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPayment = paymentStatusFilter === "Payment Status" || order.paymentStatus === paymentStatusFilter;
    const matchesDelivery = deliveryStatusFilter === "Delivery Status" || order.status === deliveryStatusFilter;
    const matchesLocation = locationFilter === "Location" || order.location === locationFilter;

    return matchesSearch && matchesPayment && matchesDelivery && matchesLocation;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Header Area */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
        <h1 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Orders</h1>
      </div>

      {/* Filters Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <div className="lg:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pr-2 bg-gray-50 dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 rounded-l-sm">
               <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-tight">#G-Store:</span>
            </div>
            <input 
              type="text" 
              placeholder="Code" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-24 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-800 dark:text-slate-200 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-500"
            />
          </div>
          
          <div className="relative group">
            <select 
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer"
            >
              <option>Payment Status</option>
              <option>Paid</option>
              <option>Unpaid</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500 pointer-events-none group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" />
          </div>

          <div className="relative group">
            <select 
              value={deliveryStatusFilter}
              onChange={(e) => setDeliveryStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer"
            >
              <option>Delivery Status</option>
              <option>Order Placed</option>
              <option>Processing</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500 pointer-events-none group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" />
          </div>

          <div className="relative group">
            <select 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer"
            >
              <option>Location</option>
              <option>Default Location</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500 pointer-events-none group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors" />
          </div>

          <button className="flex items-center justify-center gap-2 px-8 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-black rounded-sm transition-colors shadow-sm shadow-green-100 dark:shadow-none uppercase tracking-widest shrink-0">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* Orders Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800">
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest w-16 text-center">S/L</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Order Code</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Customer</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Placed On</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center">Items</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center">Payment</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center">Status</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center">Type</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center">Location</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filteredOrders.map((order, i) => (
                <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group">
                  <td className="px-4 py-4 text-[10px] font-bold text-gray-500 dark:text-slate-400 text-center">{i + 1}</td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-black text-gray-800 dark:text-slate-100 tracking-tight">#G-Store:{order.code}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 overflow-hidden shrink-0 shadow-sm transition-colors">
                        <img src={order.customerAvatar} alt={order.customerName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-700 dark:text-slate-200 leading-tight">{order.customerName}</span>
                        <span className="text-[9px] font-bold text-gray-400 dark:text-slate-500 leading-tight">{order.customerPhone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[10px] font-bold text-gray-500 dark:text-slate-400">{order.placedOn}</td>
                  <td className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-slate-100 text-center">{order.items}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-500 text-[9px] font-black uppercase rounded-[2px] tracking-widest shadow-sm shadow-orange-50 dark:shadow-none transition-colors">
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 text-[9px] font-black uppercase rounded-[2px] tracking-widest shadow-sm shadow-blue-50 dark:shadow-none transition-colors">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center text-[10px] font-bold text-gray-500 dark:text-slate-400">{order.type}</td>
                  <td className="px-4 py-4 text-center text-[10px] font-bold text-gray-500 dark:text-slate-400">{order.location}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                       <Link 
                        href={`/admin/orders/${order.code}`}
                        className="p-1 text-gray-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                       >
                          <EyeIcon className="h-4 w-4" />
                       </Link>
                       <button className="p-1 text-gray-400 dark:text-slate-500 hover:text-green-500 transition-colors">
                          <PrinterIcon className="h-4 w-4" />
                       </button>
                       <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="p-1 text-gray-400 dark:text-slate-500 hover:text-red-500 transition-colors"
                       >
                          <TrashIcon className="h-4 w-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Results Info */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-50/50 dark:bg-slate-800/50 p-4 rounded-sm gap-4 transition-colors">
          <p className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">
            Showing 1-15 of 89 results
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400 transition-colors">
               <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="w-8 h-8 rounded-sm bg-green-500 text-white text-[10px] font-black shadow-lg shadow-green-100 dark:shadow-none">1</button>
            <button className="w-8 h-8 rounded-sm bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[10px] font-black hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">2</button>
            <button className="w-8 h-8 rounded-sm bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[10px] font-black hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">3</button>
            <button className="w-8 h-8 rounded-sm bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[10px] font-black hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">4</button>
            <button className="w-8 h-8 rounded-sm bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[10px] font-black hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">5</button>
            <button className="w-8 h-8 rounded-sm bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[10px] font-black hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">6</button>
            <button className="p-2 text-gray-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400 transition-colors">
               <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-md shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800 transition-colors">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/30 transition-colors">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight">Delete Confirmation</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-2 transition-colors">
                <XCircleIcon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[15px] font-black text-gray-800 dark:text-gray-100">Are you sure to delete this?</h4>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500">All data related to this may get deleted.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-3 pb-8 px-8">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-[11px] font-black rounded-sm transition-all shadow-lg shadow-red-100 dark:shadow-none uppercase tracking-widest"
              >
                Proceed
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 text-[11px] font-black rounded-sm transition-all uppercase tracking-widest"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
