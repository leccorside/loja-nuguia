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
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/admin/stocks/locations" className="p-2 hover:bg-gray-50 rounded-sm text-gray-400 hover:text-green-500 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-sm font-black text-gray-800 uppercase tracking-widest">Update Location</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Column */}
        <div className="flex-1 space-y-6">
          {/* Basic Information Card */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-[13px] font-black text-gray-800 uppercase tracking-widest border-l-4 border-green-500 pl-3">Basic Information</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-sm text-xs font-bold text-gray-800 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Address</label>
                <textarea 
                  rows={4}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-gray-100 rounded-sm text-xs font-bold text-gray-800 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white p-6 sm:p-8 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-[13px] font-black text-gray-800 uppercase tracking-widest border-l-4 border-green-500 pl-3">Images</h2>
            
            <div className="space-y-4">
               <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Banner</label>
               <div className="border-2 border-dashed border-gray-100 rounded-md py-16 flex flex-col items-center justify-center space-y-4 cursor-pointer hover:bg-gray-50/50 transition-all group">
                  <p className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Choose Location Banner</p>
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-green-100 group-hover:text-green-500 transition-all">
                    <PlusIcon className="h-6 w-6" />
                  </div>
               </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-black rounded-sm transition-all shadow-lg shadow-green-100 uppercase tracking-widest">
            <CheckCircleIcon className="h-4 w-4" />
            Save Location
          </button>
        </div>

        {/* Sidebar Info Column */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-50 bg-gray-50/30">
              <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Location Information</h3>
            </div>
            
            <div className="p-8">
               <div className="relative space-y-10">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="relative">
                      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center p-0.5">
                        <div className="w-full h-full rounded-full border-2 border-white" />
                      </div>
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[1.5px] h-10 bg-gray-100" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black text-green-600 uppercase tracking-widest">Basic Information</span>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                    <div>
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Banner Image</span>
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
