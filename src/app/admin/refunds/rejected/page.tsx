"use client";

import { 
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export default function RejectedRefundsPage() {
  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm">
        <h1 className="text-lg font-black text-gray-800 tracking-tight">Rejected Refunds</h1>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest w-12 text-center">S/L</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest min-w-[120px]">User</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Order Code</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest min-w-[200px]">Product</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Amount</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-4 py-20 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                     <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                        <ArrowPathIcon className="h-6 w-6" />
                     </div>
                     <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">No results</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination Area / Footer Info */}
        <div className="px-6 py-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Showing - of 0 results</p>
           <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-100 rounded-sm text-gray-200 cursor-not-allowed" disabled>
              <ChevronLeftIcon className="h-4 w-4 stroke-2" />
            </button>
            <button className="p-2 border border-gray-100 rounded-sm text-gray-200 cursor-not-allowed" disabled>
              <ChevronRightIcon className="h-4 w-4 stroke-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
