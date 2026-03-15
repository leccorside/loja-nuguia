"use client";

import { use } from "react";
import { 
  PrinterIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";

interface OrderDetailsProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailsPage({ params }: OrderDetailsProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-20">
      {/* Header Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-sm font-black text-gray-800 uppercase tracking-widest">Order Details</h1>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-900 border border-slate-800 text-white text-[11px] font-black rounded-sm transition-colors uppercase tracking-widest">
            <PrinterIcon className="h-4 w-4" />
            Print
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-black rounded-sm transition-colors shadow-sm shadow-green-100 uppercase tracking-widest">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download Invoice
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content Column */}
        <div className="flex-1 space-y-6">
          {/* Detailed Info Card */}
          <div className="bg-white p-6 sm:p-10 rounded-sm border border-gray-100 shadow-sm space-y-12">
            {/* Invoice Meta */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-50 pb-8">
              <div className="space-y-1">
                <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">
                  INVOICE <span className="text-orange-500 ml-1">#G-Store:{orderId}</span>
                </h2>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Order Date: 13 Mar, 2026</p>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-200" /> 
                  Default Location
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="space-y-1.5 min-w-[180px]">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assign Deliveryman</label>
                  <div className="relative group">
                    <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-100 rounded-sm text-[11px] font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer">
                      <option>Assign Deliveryman</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none group-hover:text-green-500" />
                  </div>
                </div>

                <div className="space-y-1.5 min-w-[180px]">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Status</label>
                  <div className="relative group">
                    <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-100 rounded-sm text-[11px] font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer">
                      <option>Unpaid</option>
                      <option>Paid</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none group-hover:text-green-500" />
                  </div>
                </div>

                <div className="space-y-1.5 min-w-[180px]">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Delivery Status</label>
                  <div className="relative group">
                    <select className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-100 rounded-sm text-[11px] font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer">
                      <option>Order Placed</option>
                      <option>Processing</option>
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none group-hover:text-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[11px]">
              <div className="space-y-4">
                <h3 className="text-[12px] font-black text-gray-800 uppercase tracking-widest border-l-4 border-green-500 pl-3">Customer Info</h3>
                <div className="space-y-2 font-bold text-gray-500">
                  <p className="flex items-center gap-2">Name: <span className="text-gray-800">Customer</span></p>
                  <p className="flex items-center gap-2">Email: <span className="text-gray-800 underline decoration-gray-200 underline-offset-4">customer@themetags.com</span></p>
                  <p className="flex items-center gap-2">Phone: <span className="text-gray-800">123456789</span></p>
                  <p className="flex items-center gap-2">Delivery Type: <span className="px-2 py-0.5 bg-green-500 text-white text-[9px] font-black rounded-[2px] uppercase">Regular</span></p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[12px] font-black text-gray-800 uppercase tracking-widest border-l-4 border-green-500 pl-3">Shipping Address</h3>
                <div className="space-y-1 font-bold text-gray-500 leading-relaxed">
                  <p>test, Uttara,</p>
                  <p>Dhaka,</p>
                  <p>Bangladesh</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[12px] font-black text-gray-800 uppercase tracking-widest border-l-4 border-green-500 pl-3">Billing Address</h3>
                <div className="space-y-1 font-bold text-gray-500 leading-relaxed">
                  <p>2/5 kolkata, Bombuflat, Andaman</p>
                  <p>and Nicobar Islands, India</p>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="overflow-x-auto border border-gray-50 rounded-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest w-16">S/L</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Products</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Unit Price</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest text-center">Qty</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  <tr className="group">
                    <td className="px-6 py-6 text-[10px] font-bold text-gray-400">1</td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-center p-1.5">
                           <img src="https://placehold.co/100x100?text=Beef" alt="Product" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[11px] font-black text-gray-800 uppercase tracking-tight">Agcd Beef Steak Beef</span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-[11px] font-black text-gray-500">$8,500.00</td>
                    <td className="px-6 py-6 text-[11px] font-black text-gray-800 text-center">1</td>
                    <td className="px-6 py-6 text-[11px] font-black text-orange-500 text-right">$8,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="bg-gray-50/50 rounded-sm p-6 md:p-8">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Payment Method</p>
                     <p className="text-[11px] font-black text-gray-800 uppercase">Cod</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Logistic</p>
                     <p className="text-[11px] font-black text-gray-800 uppercase">Bd logistic</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none text-right md:text-left">Sub Total</p>
                     <p className="text-[11px] font-black text-gray-800 text-right md:text-left">$8,500.00</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none text-right md:text-left">Tips</p>
                     <p className="text-[11px] font-black text-gray-800 text-right md:text-left">$0.00</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none text-right md:text-left">Shipping Cost</p>
                     <p className="text-[11px] font-black text-gray-800 text-right md:text-left">$0.00</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none text-right md:text-left">Grand Total</p>
                     <p className="text-[11px] font-black text-orange-500 text-right md:text-left">$8,500.00</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Logs Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm relative h-full min-h-[400px]">
             <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">
                Order Logs
             </h3>
             <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-sm mb-4" />
                <p className="text-[11px] font-bold text-green-600">No logs found</p>
             </div>
             
             {/* Timeline background line decoration */}
             <div className="absolute left-[39px] top-24 bottom-10 w-[1.5px] bg-gray-50 opacity-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
