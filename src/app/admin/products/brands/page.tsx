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
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm">
        <h1 className="text-sm font-black text-gray-800 uppercase tracking-widest">Brands</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: List & Forms */}
        <div className="flex-1 space-y-6 w-full">
          {/* List & Filters Card */}
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
              <div className="relative group w-full sm:w-48">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all"
                >
                  <option>Select Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none group-hover:text-green-500" />
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
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider w-16 text-center">S/L</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider text-center">Active</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider w-24 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredBrands.map((b, i) => (
                    <tr key={b.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-4 py-4 text-[11px] font-bold text-gray-500 text-center">{i + 1}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-sm bg-gray-50 border border-gray-100 flex items-center justify-center text-lg overflow-hidden shrink-0">
                            {b.logo}
                          </div>
                          <span className="text-[11px] font-black text-gray-800">{b.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button 
                          onClick={() => toggleStatus(b.id)}
                          className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none ${b.active ? 'bg-green-500' : 'bg-gray-200'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${b.active ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center relative action-menu-container">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === b.id ? null : b.id)}
                          className="p-1 hover:bg-gray-100 rounded-sm text-gray-400 hover:text-gray-800 transition-colors"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>

                        {openMenuId === b.id && (
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-32 bg-white rounded-md shadow-2xl z-10 py-1.5 animate-in slide-in-from-right-2 duration-200 border border-gray-50/50">
                            <button 
                              onClick={() => handleEdit(b)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors group text-left"
                            >
                              <PencilIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                setShowDeleteModal(true);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 transition-colors group text-left"
                            >
                              <TrashIcon className="h-4 w-4 text-red-300 group-hover:text-red-500" />
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

            <div className="mt-8 pt-4 border-t border-gray-50">
               <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Showing 1-{filteredBrands.length} of {brands.length} results</p>
            </div>
          </div>

          {/* Add New Brand Card */}
          <div id="add-brand-form" className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
              <h2 className="text-[13px] font-black text-gray-800 uppercase tracking-widest">{editingId ? "Update Brand" : "Add New Brand"}</h2>
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
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Brand Name</label>
                <input 
                  type="text" 
                  placeholder="Type brand name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-100 rounded-sm text-xs font-medium focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-bold text-gray-800"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Brand Image</label>
                <div className="border-2 border-dashed border-gray-100 rounded-sm p-8 flex flex-col items-center justify-center gap-4 bg-gray-50/30 hover:bg-gray-50/50 transition-all cursor-pointer group">
                   <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-300 group-hover:text-green-500 group-hover:scale-110 transition-all">
                      <PlusIcon className="h-6 w-6" />
                   </div>
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Choose Brand Thumbnail</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO Meta Configuration Card */}
          <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-[13px] font-black text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">SEO Meta Configuration</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Title</label>
                <input 
                  type="text" 
                  placeholder="Type meta title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-100 rounded-sm text-xs font-medium focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-bold text-gray-800"
                />
                <p className="text-[10px] text-gray-400 font-bold">Set a meta tag title. Recommended to be simple and unique.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Description</label>
                <textarea 
                  placeholder="Type your meta description"
                  rows={4}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-100 rounded-sm text-xs font-medium focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-bold text-gray-800 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Image</label>
                <div className="border-2 border-dashed border-gray-100 rounded-sm p-8 flex flex-col items-center justify-center gap-4 bg-gray-50/30 hover:bg-gray-50/50 transition-all cursor-pointer group">
                   <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-300 group-hover:text-green-500 group-hover:scale-110 transition-all">
                      <PlusIcon className="h-6 w-6" />
                   </div>
                   <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Choose Meta Image</p>
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
          <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
             <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 mb-6">
                Brand Information
             </h3>
             <nav className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gray-100">
                {[
                  { id: "all", label: "All Brands", active: true },
                  { id: "add", label: "Add New Brand", active: false },
                  { id: "seo", label: "Add Brand SEO", active: false }
                ].map((nav) => (
                  <div 
                    key={nav.id} 
                    className="flex items-center gap-4 text-[11px] font-bold transition-all group relative z-10 cursor-pointer"
                  >
                    <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                      nav.active ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-100 text-gray-300"
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${nav.active ? "bg-white" : "bg-gray-200"}`} />
                    </div>
                    <span className={`${nav.active ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}`}>{nav.label}</span>
                  </div>
                ))}
             </nav>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200">
          <div className="bg-white rounded-md shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/30">
              <h3 className="text-sm font-black text-gray-800 tracking-tight">Delete Confirmation</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
                <XCircleIcon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[15px] font-black text-gray-800">Are you sure to delete this?</h4>
                <p className="text-[11px] font-bold text-slate-400">All data related to this may get deleted.</p>
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
                className="flex-1 px-6 py-2.5 bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 text-[11px] font-black rounded-sm transition-all uppercase tracking-widest"
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
