"use client";

import { useState } from "react";
import { 
  ArrowLeftIcon, 
  ChevronDownIcon,
  CircleStackIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddStockPage() {
  const [formData, setFormData] = useState({
    location: "",
    product: ""
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-20">
      {/* Header Area */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 transition-colors">
        <div className="flex items-center gap-4">
          <Link href="/admin/stocks/locations" className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-500 hover:text-green-500 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight transition-colors">Add Stock</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Column: Form */}
        <div className="flex-1 space-y-6 w-full">
          
          {/* Section: Basic Information */}
          <section id="basic-info" className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-8 transition-colors">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50 dark:border-slate-800 transition-colors">
              <div className="p-2 bg-green-50 dark:bg-green-900/10 rounded-sm transition-colors">
                <CircleStackIcon className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {/* Location Select */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-500 dark:text-slate-500 uppercase tracking-[1.5px] block mb-1">
                  Location <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <select 
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-800 dark:text-slate-200 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all focus:bg-white dark:focus:bg-slate-800"
                  >
                    <option value="" disabled className="text-gray-300 dark:bg-slate-900">USA</option>
                    <option value="usa" className="dark:bg-slate-900">USA</option>
                    <option value="brazil" className="dark:bg-slate-900">Brazil</option>
                    <option value="uk" className="dark:bg-slate-900">UK</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500 pointer-events-none group-hover:text-green-500 transition-colors" />
                </div>
              </div>

              {/* Product Select */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-500 dark:text-slate-500 uppercase tracking-[1.5px] block mb-1">
                  Select Product <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <select 
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-800 dark:text-slate-200 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all focus:bg-white dark:focus:bg-slate-800"
                  >
                    <option value="" disabled className="dark:bg-slate-900">Select Product</option>
                    <option value="p1" className="dark:bg-slate-900">Organic Apple</option>
                    <option value="p2" className="dark:bg-slate-900">Fresh Milk</option>
                    <option value="p3" className="dark:bg-slate-900">Arabica Coffee</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500 pointer-events-none group-hover:text-green-500 transition-colors" />
                </div>
              </div>
            </div>
          </section>

          {/* Action Button */}
          <div className="pt-2">
            <button className="flex items-center gap-2 px-10 py-3.5 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm shadow-xl shadow-green-100 dark:shadow-none transition-all uppercase tracking-[2px] w-full sm:w-auto">
              <CheckCircleIcon className="h-4 w-4" />
              Save Stock
            </button>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="w-full lg:w-80 sticky top-28">
           <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
              <div className="p-5 border-b border-gray-50 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/30 transition-colors">
                 <h3 className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Stock Information</h3>
              </div>
              
              <div className="p-8">
                 <div className="relative">
                    {/* Stepper Line */}
                    <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-gray-100 dark:bg-slate-800 transition-colors" />

                    {/* Step 1: Active */}
                    <div className="flex items-center gap-4 relative z-10">
                       <div className="relative">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm ring-1 ring-green-500 transition-colors">
                             <div className="w-1.5 h-1.5 rounded-full bg-white transition-all transform scale-100" />
                          </div>
                       </div>
                       <div>
                          <span className="text-[11px] font-black text-green-600 uppercase tracking-widest">Stock Information</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
