"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MagnifyingGlassIcon, 
  ArrowUpTrayIcon, 
  ArrowDownTrayIcon, 
  PlusIcon,
  EllipsisVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

// Mock Data for Products
const products = [
  { id: 1, name: "Audi Sheesham Wood Dining Chair", brand: "-", categories: ["Chair", "Sofa", "Bed"], price: 19975.00, published: true, themes: ["Furniture", "Organic"], featured: false },
  { id: 2, name: "Molina Teakwood Dining Chair", brand: "-", categories: ["Chair", "Sofa", "Bed"], price: 3740.00, published: true, themes: ["Furniture"], featured: false },
  { id: 3, name: "Rigo Wooden Dining Chair", brand: "-", categories: ["Chair", "Table", "Dining Chair"], price: 7225.00, published: true, themes: ["Furniture"], featured: false },
  { id: 4, name: "Lexus Marble Dining Chair", brand: "-", categories: ["Chair", "Sofa", "Bed"], price: 8415.00, published: true, themes: ["Furniture"], featured: false },
  { id: 5, name: "New York American Wooden Dining Chair", brand: "-", categories: ["Chair", "Table", "Dining Chair"], price: 5950.00, published: true, themes: ["Furniture"], featured: false },
  { id: 6, name: "Royaloak Terance Wooden Dining Chair", brand: "-", categories: ["Chair", "Sofa", "Bed"], price: 4675.00, published: true, themes: ["Furniture"], featured: false },
  { id: 7, name: "Wooden Showpiece Chair", brand: "-", categories: ["Chair", "Table", "Dining Chair"], price: 12750.00, published: true, themes: ["Furniture"], featured: false },
  { id: 8, name: "Lamb & Mutton Back Bacon", brand: "Bird Wings", categories: ["Fresh Chicken", "Fresh Mutton", "Duck Meat"], price: 0.00, published: true, themes: ["Grocery", "Halal Food", "Furniture", "Organic"], featured: true },
  { id: 9, name: "Aged Beef Steak Beef", brand: "Bird Wings", categories: ["Fresh Chicken", "Fresh Beef", "Duck Meat"], price: 17000.00, published: true, themes: ["Halal Food"], featured: false },
  { id: 10, name: "Steak Cattle Meat", brand: "Bird Wings", categories: ["Fresh Chicken", "Fresh Beef", "Duck Meat"], price: 8415.00, published: true, themes: ["Halal Food", "Organic"], featured: true },
  { id: 11, name: "Aged Beef Steak Beef", brand: "Biofuel", categories: ["Fresh Chicken", "Fresh Mutton", "Fresh Beef"], price: 7480.00, published: true, themes: ["Halal Food", "Organic"], featured: true },
  { id: 12, name: "Aged Beef Steak Beef", brand: "Nexover", categories: ["Fresh Chicken", "Fresh Mutton", "Duck Meat"], price: 8500.00, published: true, themes: ["Halal Food", "Organic"], featured: true },
  { id: 13, name: "Ribs Lamb & Mutton Meat", brand: "Bird Wings", categories: ["Fresh Chicken"], price: 5100.00, published: true, themes: ["Halal Food", "Organic"], featured: true },
  { id: 14, name: "Chicken Meat Buffalo Wing", brand: "Bird Wings", categories: ["Fresh Beef", "Duck Meat", "Fresh Chicken"], price: 1445.00, published: true, themes: ["Halal Food", "Organic"], featured: true },
  { id: 15, name: "Aged Beef Steak Beef", brand: "Nexover", categories: ["Fresh Chicken"], price: 3740.00, published: true, themes: ["Halal Food"], featured: false },
];

export default function AllProductsPage() {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  
  // Dynamic Filtering States
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("Select Brand");
  const [statusFilter, setStatusFilter] = useState("Select Status");

  // Filtered Products Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === "Select Brand" || p.brand === brandFilter;
    const matchesStatus = statusFilter === "Select Status" || 
                         (statusFilter === "Published" && p.published) || 
                         (statusFilter === "Unpublished" && !p.published);
    
    return matchesSearch && matchesBrand && matchesStatus;
  });

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <h1 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight">Products</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold rounded-sm transition-colors shadow-sm shadow-red-100 dark:shadow-none">
            <ArrowUpTrayIcon className="h-4 w-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-[11px] font-bold rounded-sm transition-colors shadow-sm shadow-green-100 dark:shadow-none">
            <ArrowDownTrayIcon className="h-4 w-4" />
            Import
          </button>
          <Link 
            href="/admin/products/add"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-bold rounded-sm transition-colors shadow-sm shadow-green-100 dark:shadow-none"
          >
            <PlusIcon className="h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filter Area */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-4 transition-colors">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600 font-bold text-gray-800 dark:text-gray-100 transition-colors"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-3">
          <select 
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-[11px] font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none w-full lg:w-40 transition-colors cursor-pointer"
          >
            <option className="dark:bg-slate-900">Select Brand</option>
            <option className="dark:bg-slate-900">Bird Wings</option>
            <option className="dark:bg-slate-900">Nexover</option>
            <option className="dark:bg-slate-900">Biofuel</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-[11px] font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none w-full lg:w-40 transition-colors cursor-pointer"
          >
            <option className="dark:bg-slate-900">Select Status</option>
            <option className="dark:bg-slate-900">Published</option>
            <option className="dark:bg-slate-900">Unpublished</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[11px] font-bold rounded-sm transition-colors uppercase tracking-widest shrink-0 transition-colors">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-800">
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest w-12 text-center">S/L</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest min-w-[250px]">Product Name</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Brand</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Categories</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-right">Price</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center">Published</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Themes</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center">Is Featured</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filteredProducts.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group">
                  <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center transition-colors font-mono">{p.id}</td>
                  <td className="px-4 py-4 transition-colors">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 dark:bg-slate-800 rounded-sm border border-gray-100 dark:border-slate-700 flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-all">
                           <img src={`https://picsum.photos/seed/prod${i+20}/100`} alt="" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-colors" />
                        </div>
                        <p className="text-[11px] font-black text-gray-800 dark:text-slate-100 line-clamp-2">{p.name}</p>
                     </div>
                  </td>
                  <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400 transition-colors uppercase">{p.brand}</td>
                  <td className="px-4 py-4 transition-colors">
                    <div className="flex flex-wrap gap-1">
                      {p.categories.map((c, ci) => (
                        <span key={ci} className="px-1.5 py-0.5 bg-gray-50 dark:bg-slate-800 text-[9px] font-black text-gray-400 dark:text-slate-500 rounded-sm uppercase tracking-tighter border border-gray-100 dark:border-slate-700 transition-colors">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[11px] font-black text-orange-500 dark:text-orange-400 text-right whitespace-nowrap transition-colors">
                    ${p.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-4 text-center transition-colors">
                    <button className={`w-8 h-4 rounded-full relative transition-colors ${p.published ? "bg-green-500 shadow-sm shadow-green-100 dark:shadow-none" : "bg-gray-300 dark:bg-slate-700"}`}>
                      <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${p.published ? "left-4.5" : "left-0.5"}`}></span>
                    </button>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-[10px] font-black text-gray-400 dark:text-slate-600 capitalize whitespace-normal max-w-[150px] transition-colors">
                      {p.themes.map(t => `"${t}"`).join(", ")}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-center transition-colors">
                    <button className={`w-8 h-4 rounded-full relative transition-colors ${p.featured ? "bg-green-500 shadow-sm shadow-green-100 dark:shadow-none" : "bg-gray-300 dark:bg-slate-700"}`}>
                      <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${p.featured ? "left-4.5" : "left-0.5"}`}></span>
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center relative transition-colors">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === p.id ? null : p.id);
                      }}
                      className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-600 hover:text-gray-800 dark:hover:text-slate-200 transition-colors"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>

                    {/* Action Dropdown (Toast Style) */}
                    {openMenuId === p.id && (
                      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-50 bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-xl py-1 min-w-[140px] animate-in fade-in zoom-in duration-150 transition-colors">
                        <Link 
                          href={`/admin/products/edit/${p.id}`}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors transition-colors"
                        >
                          <PencilSquareIcon className="h-4 w-4 text-gray-400 dark:text-slate-500" />
                          Edit
                        </Link>
                        <Link 
                          href={`/produto/${p.id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-black text-gray-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50/50 dark:hover:bg-green-900/10 transition-colors border-y border-gray-50 dark:border-slate-800"
                        >
                          <EyeIcon className="h-4 w-4 text-gray-400 dark:text-slate-600 group-hover:text-green-500" />
                          View Details
                        </Link>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProductId(p.id);
                            setShowDeleteModal(true);
                            setOpenMenuId(null);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors transition-colors"
                        >
                          <TrashIcon className="h-4 w-4 text-gray-400 dark:text-slate-500" />
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
        <div className="px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900 border-t border-gray-50 dark:border-slate-800 transition-colors">
          <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500">Showing {filteredProducts.length} of {products.length} results</p>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-100 dark:border-slate-700 rounded-sm text-gray-400 dark:text-slate-600 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 disabled:opacity-30 transition-colors" disabled>
              <ChevronLeftIcon className="h-4 w-4 stroke-2" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-green-500 text-white text-[11px] font-black rounded-sm shadow-sm shadow-green-100 dark:shadow-none transition-colors">1</button>
            <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[11px] font-black rounded-sm hover:border-green-500 hover:text-green-500 transition-colors">2</button>
            <button className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-[11px] font-black rounded-sm hover:border-green-500 hover:text-green-500 transition-colors">3</button>
            <button className="p-2 border border-gray-100 dark:border-slate-700 rounded-sm text-gray-400 dark:text-slate-600 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 transition-colors">
              <ChevronRightIcon className="h-4 w-4 stroke-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-[440px] rounded-sm shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden border border-gray-100 dark:border-slate-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
              <h3 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Delete Confirmation</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-sm text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-10 flex flex-col items-center text-center transition-colors">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110">
                <XCircleIcon className="h-8 w-8 text-red-500 transition-colors" />
              </div>
              <h4 className="text-sm font-black text-gray-800 dark:text-gray-100 mb-1 transition-colors">Are you sure to delete this?</h4>
              <p className="text-[11px] font-bold text-gray-400 dark:text-slate-600 transition-colors">All data related to this may get deleted.</p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-6 bg-gray-50/50 dark:bg-slate-800/50 flex items-center justify-center gap-3 border-t border-gray-100 dark:border-slate-800">
              <button 
                onClick={() => {
                  console.log("Deleting product:", selectedProductId);
                  setShowDeleteModal(false);
                }}
                className="flex-1 max-w-[100px] py-2 bg-red-500 hover:bg-red-600 text-white text-[11px] font-black rounded-sm shadow-lg shadow-red-100 dark:shadow-none transition-all uppercase tracking-widest"
              >
                Proceed
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 max-w-[100px] py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 text-[11px] font-black rounded-sm transition-all uppercase tracking-widest"
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
