"use client";

import { useState, useEffect } from "react";
import { 
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  XMarkIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

// Mock Data for Brands
interface Brand {
  id: number;
  name: string;
  logo: string;
  active: boolean;
}

const brandsData: Brand[] = [
  { id: 1, name: "Biofuel", logo: "🧪", active: true },
  { id: 2, name: "simplegraph", logo: "📈", active: true },
  { id: 3, name: "Bird Wings", logo: "🐦", active: true },
  { id: 4, name: "Nexover", logo: "🌐", active: true },
  { id: 5, name: "Color Love", logo: "🎨", active: true },
];

export default function BrandsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [brands, setBrands] = useState<Brand[]>(brandsData);

  // Form States
  const [brandName, setBrandName] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleEdit = (b: Brand) => {
    setEditingId(b.id);
    setBrandName(b.name);
    setOpenMenuId(null);
    // Scroll to form
    document.getElementById("add-brand-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setBrandName("");
    setMetaTitle("");
    setMetaDescription("");
  };

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

  const toggleStatus = (id: number) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, active: !b.active } : b));
  };

  const filteredBrands = brands.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Select Status" || 
                         (statusFilter === "Active" && b.active) || 
                         (statusFilter === "Inactive" && !b.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-20">
      {/* Header Area */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <h1 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Brands</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: List & Forms */}
        <div className="flex-1 space-y-6 w-full">
          {/* List & Filters Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 relative w-full transition-colors">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-600 font-bold text-gray-800 dark:text-gray-100 transition-colors"
                />
              </div>
              <div className="relative group w-full sm:w-48 transition-colors">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer"
                >
                  <option className="dark:bg-slate-900">Select Status</option>
                  <option className="dark:bg-slate-900">Active</option>
                  <option className="dark:bg-slate-900">Inactive</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-600 pointer-events-none group-hover:text-green-500 transition-colors" />
              </div>
              <button className="flex items-center justify-center gap-2 px-8 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-black rounded-sm transition-colors shadow-sm shadow-green-100 uppercase tracking-widest shrink-0 w-full sm:w-auto">
                <MagnifyingGlassIcon className="h-4 w-4" />
                Search
              </button>
            </div>

            {/* Brands Table */}
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-slate-800 transition-colors">
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider w-16 text-center">S/L</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-center">Active</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {filteredBrands.map((b, i) => (
                    <tr key={b.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group">
                      <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center transition-colors">{i + 1}</td>
                      <td className="px-4 py-4 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center text-lg overflow-hidden shrink-0 transition-colors">
                            {b.logo}
                          </div>
                          <span className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase transition-colors">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center transition-colors">
                        <button 
                          onClick={() => toggleStatus(b.id)}
                          className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none ${b.active ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-700'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${b.active ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center relative action-menu-container transition-colors">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === b.id ? null : b.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-500 hover:text-gray-800 dark:hover:text-slate-200 transition-colors"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>

                        {openMenuId === b.id && (
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-32 bg-white dark:bg-slate-900 rounded-sm shadow-2xl z-10 py-1.5 animate-in slide-in-from-right-2 duration-200 border border-gray-50/50 dark:border-slate-800 transition-colors">
                            <button 
                              onClick={() => handleEdit(b)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-black text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group text-left"
                            >
                              <PencilIcon className="h-4 w-4 text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                setShowDeleteModal(true);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors group text-left"
                            >
                              <TrashIcon className="h-4 w-4 text-red-300 dark:text-red-900/50 group-hover:text-red-500 transition-colors" />
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

            <div className="mt-8 pt-4 border-t border-gray-50 dark:border-slate-800 transition-colors">
               <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Showing 1-{filteredBrands.length} of {brands.length} results</p>
            </div>
          </div>

          {/* Add New Brand Card */}
          <div id="add-brand-form" className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-slate-800 pb-4 transition-colors">
              <h2 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">{editingId ? "Update Brand" : "Add New Brand"}</h2>
              {editingId && (
                <button 
                  onClick={cancelEdit}
                  className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Brand Name</label>
                <input 
                  type="text" 
                  placeholder="Type brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 text-gray-800 dark:text-gray-100 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Brand Image</label>
                <div className="border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-sm p-8 flex flex-col items-center justify-center gap-4 bg-gray-50/30 dark:bg-slate-800/30 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
                   <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full shadow-sm flex items-center justify-center text-gray-300 dark:text-slate-600 group-hover:text-green-500 group-hover:scale-110 transition-all">
                      <PlusIcon className="h-6 w-6" />
                   </div>
                   <p className="text-[11px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Choose Brand Thumbnail</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Meta Configuration Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <h2 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest border-b border-gray-50 dark:border-slate-800 pb-4 transition-colors">SEO Meta Configuration</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Meta Title</label>
                <input 
                  type="text" 
                  placeholder="Type meta title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 text-gray-800 dark:text-gray-100 transition-colors"
                />
                <p className="text-[10px] text-gray-400 dark:text-slate-600 font-bold transition-colors">Set a meta tag title. Recommended to be simple and unique.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Meta Description</label>
                <textarea 
                  placeholder="Type your meta description"
                  rows={4}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 text-gray-800 dark:text-gray-100 resize-none transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Meta Image</label>
                <div className="border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-sm p-8 flex flex-col items-center justify-center gap-4 bg-gray-50/30 dark:bg-slate-800/30 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
                   <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full shadow-sm flex items-center justify-center text-gray-300 dark:text-slate-600 group-hover:text-green-500 group-hover:scale-110 transition-all">
                      <PlusIcon className="h-6 w-6" />
                   </div>
                   <p className="text-[11px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Choose Meta Image</p>
                </div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm shadow-lg shadow-green-100 transition-all uppercase tracking-widest">
            < PhotoIcon className="h-4 w-4" />
            Save Brand
          </button>
        </div>

        {/* Right Column: Navigation */}
        <div className="w-full lg:w-72 sticky top-28 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
             <h3 className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest flex items-center gap-2 mb-6 transition-colors font-black">
                Brand Information
             </h3>
             <nav className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gray-100 dark:before:bg-slate-800 transition-colors">
                {[
                  { id: "all", label: "All Brands", active: true },
                  { id: "add", label: "Add New Brand", active: false },
                  { id: "seo", label: "Add Brand SEO", active: false }
                ].map((nav) => (
                  <div 
                    key={nav.id} 
                    className="flex items-center gap-4 text-[11px] font-black transition-all group relative z-10 cursor-pointer"
                  >
                    <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                      nav.active ? "bg-green-500 border-green-500 text-white" : "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-600"
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${nav.active ? "bg-white" : "bg-gray-200 dark:bg-slate-700"}`} />
                    </div>
                    <span className={`transition-colors uppercase tracking-wider ${nav.active ? "text-green-600" : "text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300"}`}>{nav.label}</span>
                  </div>
                ))}
             </nav>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200 transition-colors">
          <div className="bg-white dark:bg-slate-900 rounded-md shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800 transition-colors">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/30 transition-colors">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight transition-colors">Delete Confirmation</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center text-center space-y-4 transition-colors">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-500 mb-2 transition-colors">
                <XCircleIcon className="h-7 w-7" />
              </div>
              <div className="space-y-1 transition-colors">
                <h4 className="text-[15px] font-black text-gray-800 dark:text-gray-100 transition-colors">Are you sure to delete this?</h4>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-600 transition-colors">All data related to this may get deleted.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-3 pb-8 px-8">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-[11px] font-black rounded-sm transition-all shadow-lg shadow-red-100 uppercase tracking-widest"
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
