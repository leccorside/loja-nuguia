"use client";

import { use, useState } from "react";
import { 
  PlusIcon,
  CheckCircleIcon,
  ArrowLeftIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface EditLocationPageProps {
  params: Promise<{ id: string }>;
}

export default function EditLocationPage({ params }: EditLocationPageProps) {
  const resolvedParams = use(params);
  const locationId = resolvedParams.id;

  const [formData, setFormData] = useState({
    name: "USA", // Mocking data as per design screenshot
    address: "13th Street, 47 W 13th St, New York, USA"
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-20">
      {/* Header Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2 transition-colors">
        <div className="flex items-center gap-4">
          <Link href="/admin/stocks/locations" className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-500 hover:text-green-500 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Update Location</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Column */}
        <div className="flex-1 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <h2 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest border-l-4 border-green-500 pl-3 transition-colors">Basic Information</h2>
            
            <div className="space-y-4 transition-colors">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest leading-none transition-colors">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-800 dark:text-slate-200 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 transition-colors"
                />
              </div>

              <div className="space-y-2 transition-colors">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest leading-none transition-colors">Address</label>
                <textarea 
                  rows={4}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-800 dark:text-slate-200 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 resize-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <h2 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest border-l-4 border-green-500 pl-3 transition-colors">Images</h2>
            
            <div className="space-y-4 transition-colors">
               <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest leading-none transition-colors">Banner</label>
               <div className="border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-md py-16 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-all group transition-colors">
                  <p className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Choose Location Banner</p>
                  <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-slate-600 group-hover:bg-green-100 dark:group-hover:bg-green-900/30 group-hover:text-green-500 transition-all transition-colors">
                    <PlusIcon className="h-6 w-6" />
                  </div>
               </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-black rounded-sm transition-all shadow-lg shadow-green-100 dark:shadow-none transition-all uppercase tracking-widest">
            <CheckCircleIcon className="h-4 w-4" />
            Save Location
          </button>
        </div>

        {/* Sidebar Info Column */}
        <div className="w-full lg:w-80 transition-colors">
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="p-5 border-b border-gray-50 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/30 transition-colors">
              <h3 className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Location Information</h3>
            </div>
            
            <div className="p-8 transition-colors">
               <div className="relative space-y-10 transition-colors">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 relative z-10 transition-colors">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center p-0.5 ring-4 ring-white dark:ring-slate-900 transition-colors">
                        <div className="w-full h-full rounded-full border-2 border-white transition-colors" />
                      </div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1.5px] h-10 bg-gray-100 dark:bg-slate-800 transition-colors" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-green-600 dark:text-green-500 uppercase tracking-widest transition-colors">Basic Information</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 transition-colors">
                    <div className="w-4 h-4 rounded-full bg-gray-200 dark:bg-slate-800 ring-4 ring-white dark:ring-slate-900 transition-colors" />
                    <div>
                      <span className="text-[11px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Banner Image</span>
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
