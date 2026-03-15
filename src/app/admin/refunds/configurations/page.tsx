"use client";

import { useState } from "react";
import { 
  ArrowPathIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

export default function RefundConfigurationsPage() {
  const [formData, setFormData] = useState({
    refundDays: "",
    enableSystem: "disable"
  });

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 pb-20">
      {/* Header Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm mb-2">
        <h1 className="text-lg font-black text-gray-800 tracking-tight">Refund Configurations</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Main Column: Form */}
        <div className="flex-1 space-y-6 w-full">
          
          {/* Section: Basic Information */}
          <section id="basic-info" className="bg-white p-6 sm:p-8 rounded-sm border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
              <div className="p-2 bg-green-50 rounded-sm">
                <Cog6ToothIcon className="h-5 w-5 text-green-500" />
              </div>
              <h2 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">Basic Information</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {/* Refund Days Input */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-[1.5px] block mb-1">
                  Allow Refund Within Days <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  value={formData.refundDays}
                  onChange={(e) => setFormData({ ...formData, refundDays: e.target.value })}
                  placeholder="Type refund days"
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-800 focus:ring-1 focus:ring-green-500 outline-none transition-all focus:bg-white placeholder:text-gray-300"
                />
              </div>

              {/* Enable Refund System Select */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-gray-500 uppercase tracking-[1.5px] block mb-1">
                  Enable Refund System <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <select 
                    value={formData.enableSystem}
                    onChange={(e) => setFormData({ ...formData, enableSystem: e.target.value })}
                    className="w-full pl-4 pr-10 py-3 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-800 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all focus:bg-white"
                  >
                    <option value="disable">Disable</option>
                    <option value="enable">Enable</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-hover:text-green-500 transition-colors" />
                </div>
              </div>
            </div>
          </section>

          {/* Action Button */}
          <div className="pt-2">
            <button className="flex items-center gap-2 px-10 py-3.5 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm shadow-xl shadow-green-100 transition-all uppercase tracking-[2px] w-full sm:w-auto">
              <CheckCircleIcon className="h-4 w-4" />
              Save Configurations
            </button>
          </div>
        </div>

        {/* Sidebar Info Column */}
        <div className="w-full lg:w-80 sticky top-28">
           <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-50 bg-gray-50/30">
                 <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Refund Information</h3>
              </div>
              
              <div className="p-8">
                 <div className="relative">
                    {/* Stepper Line (Short as it's only one step) */}
                    <div className="absolute left-[7px] top-2 h-2 w-[1.5px] bg-gray-100" />

                    {/* Step 1: Active */}
                    <div className="flex items-center gap-4 relative z-10">
                       <div className="relative">
                          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-green-500">
                             <div className="w-1.5 h-1.5 rounded-full bg-white transition-all transform scale-100" />
                          </div>
                       </div>
                       <div>
                          <span className="text-[11px] font-black text-green-600 uppercase tracking-widest">Refund Information</span>
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
