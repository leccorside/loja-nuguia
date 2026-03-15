"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

// Mock Data for Categories
const categoriesData = [
  { id: 1, name: "Fresh Chicken", icon: "🍗", baseCategory: "N/A", brands: "N/A", priority: 1, themes: ["Halal Food", "Organic"] },
  { id: 2, name: "Chair", icon: "🪑", baseCategory: "N/A", brands: "N/A", priority: 1, themes: ["Furniture"] },
  { id: 3, name: "Cleaning", icon: "🧹", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 4, name: "Breakfast", icon: "🍳", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 5, name: "Baby Care", icon: "🍼", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 6, name: "Pet Care", icon: "🐕", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 7, name: "Jam & Jelly", icon: "🍯", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 8, name: "Honey", icon: "🐝", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 9, name: "Cold Drinks", icon: "🥤", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 10, name: "Fress Organic", icon: "🌿", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery", "Organic"] },
  { id: 11, name: "Fress Fruits", icon: "🍎", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery"] },
  { id: 12, name: "Coffee Drinks", icon: "☕", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery"] },
  { id: 13, name: "Vegetables", icon: "🥦", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery"] },
  { id: 14, name: "Butter", icon: "🧈", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery"] },
  { id: 15, name: "Parent key", icon: "🔑", baseCategory: "N/A", brands: "N/A", priority: 0, themes: ["Grocery"] },
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".action-menu-container")) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const filteredCategories = categoriesData.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-sm font-black text-gray-800 uppercase tracking-widest">Categories</h1>
        <Link 
          href="/admin/products/categories/add"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold rounded-sm transition-colors shadow-sm shadow-green-100 uppercase tracking-widest"
        >
          <PlusIcon className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      {/* Filter & Search Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-500 text-[11px] font-bold rounded-sm transition-colors uppercase tracking-widest shrink-0 w-full sm:w-auto">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* Categories Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider w-16 text-center">S/L</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider">Category Name</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider">Base Category</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider">Brands</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider text-center">Priority</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider">Theme</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCategories.map((cat, i) => (
                <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-4 text-[11px] font-bold text-gray-500 text-center">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-lg shadow-sm border border-red-100/50">
                         {cat.icon}
                      </div>
                      <span className="text-[11px] font-bold text-gray-800">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-sm border border-gray-100">
                      {cat.baseCategory}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-0.5 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-sm border border-gray-100">
                      {cat.brands}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[11px] font-bold text-gray-500 text-center">
                    {cat.priority}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {cat.themes.map((theme, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-sm border border-gray-100">
                          &quot;{theme}&quot;
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center relative action-menu-container">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === cat.id ? null : cat.id)}
                      className="p-1 hover:bg-gray-100 rounded-sm text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>

                    {openMenuId === cat.id && (
                      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-36 bg-white rounded-md shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] z-10 py-1.5 animate-in slide-in-from-right-2 duration-200 border border-gray-50/50">
                        <Link 
                          href={`/admin/products/categories/edit/${cat.id}`}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors group"
                        >
                          <PencilIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                          Edit
                        </Link>
                        <button 
                          onClick={() => {
                            setSelectedCategoryId(cat.id);
                            setShowDeleteModal(true);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[12px] font-medium text-slate-600 hover:bg-slate-50 transition-colors group"
                        >
                          <TrashIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Area */}
        <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[11px] font-bold text-gray-400">Showing 1-{filteredCategories.length} of {categoriesData.length} results</p>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-100 rounded-sm text-gray-400 hover:text-green-500 hover:bg-green-50 transition-all disabled:opacity-30" disabled>
              <ChevronLeftIcon className="h-4 w-4 stroke-2" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white text-[11px] font-black rounded-sm shadow-sm shadow-green-100">1</button>
            <button className="w-8 h-8 flex items-center justify-center bg-white border border-gray-100 text-gray-500 text-[11px] font-black rounded-sm hover:border-green-500 hover:text-green-500 transition-all">2</button>
            <button className="p-2 border border-gray-100 rounded-sm text-gray-400 hover:text-green-500 hover:bg-green-50 transition-all">
              <ChevronRightIcon className="h-4 w-4 stroke-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="bg-white w-full max-w-lg rounded-md shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
              <h3 className="text-[15px] font-black text-slate-800 tracking-tight">Delete Confirmation</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-all"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-10 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                <XCircleIcon className="h-8 w-8" />
              </div>
              <h4 className="text-[17px] font-black text-slate-800 mb-2">Are you sure to delete this?</h4>
              <p className="text-[13px] font-medium text-slate-400">All data related to this may get deleted.</p>
            </div>

            {/* Modal Footer */}
            <div className="px-8 pb-10 flex items-center justify-center gap-3">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 max-w-[140px] py-2.5 bg-red-500 hover:bg-red-600 text-white text-[13px] font-black rounded-md shadow-lg shadow-red-100 transition-all"
              >
                Proceed
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 max-w-[140px] py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 text-[13px] font-black rounded-md border border-slate-100 transition-all"
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
