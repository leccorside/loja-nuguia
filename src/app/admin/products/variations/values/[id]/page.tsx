"use client";

import { useState, useEffect, use } from "react";
import { 
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

interface VariationValue {
  id: number;
  name: string;
  code?: string;
  active: boolean;
}

const mockValues: Record<string, { name: string, data: VariationValue[] }> = {
  "1": { 
    name: "Size", 
    data: [
      { id: 1, name: "S", active: true },
      { id: 2, name: "M", active: true },
      { id: 3, name: "L", active: true },
      { id: 4, name: "XL", active: true },
      { id: 5, name: "XXL", active: true },
    ]
  },
  "2": { 
    name: "Color", 
    data: [
      { id: 1, name: "Black", code: "#030303", active: true },
      { id: 2, name: "Red", code: "#ed0707", active: true },
      { id: 3, name: "Green", code: "#5c7a5e", active: true },
    ]
  },
  "3": { 
    name: "Weight", 
    data: [
      { id: 1, name: "100gm", active: true },
      { id: 2, name: "500gm", active: true },
      { id: 3, name: "1kg", active: true },
    ]
  },
  "4": { 
    name: "Volume", 
    data: [
      { id: 1, name: "1L", active: true },
      { id: 2, name: "2L", active: true },
    ]
  },
  "5": { 
    name: "Package", 
    data: [
      { id: 1, name: "1", active: true },
      { id: 2, name: "2", active: true },
      { id: 3, name: "3", active: true },
      { id: 4, name: "4", active: true },
    ]
  },
};

export default function VariationValuesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const variation = mockValues[id] || { name: "Unknown", data: [] };
  const isColor = variation.name.toLowerCase() === "color";
  
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [valueName, setValueName] = useState("");
  const [colorCode, setColorCode] = useState("#000000");
  const [values, setValues] = useState<VariationValue[]>(variation.data);

  const handleEdit = (v: VariationValue) => {
    setEditingId(v.id);
    setValueName(v.name);
    if (v.code) setColorCode(v.code);
    setOpenMenuId(null);
    // Scroll to form
    document.getElementById("add-value-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setValueName("");
    setColorCode("#000000");
  };

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
    setValues(prev => prev.map(v => v.id === id ? { ...v, active: !v.active } : v));
  };

  const filteredValues = values.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header Area */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
        <div className="flex items-center gap-4">
          <Link href="/admin/products/variations" className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Values - {variation.name}</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column */}
        <div className="flex-1 space-y-6 w-full">
          {/* Table Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>
              <button className="flex items-center justify-center gap-2 px-8 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-black rounded-sm transition-colors shadow-sm shadow-green-100 dark:shadow-none uppercase tracking-widest shrink-0">
                <MagnifyingGlassIcon className="h-4 w-4" />
                Search
              </button>
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-slate-800 transition-colors">
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider w-16 text-center transition-colors">S/L</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider transition-colors">Name</th>
                    {isColor && <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider transition-colors">Code</th>}
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-center transition-colors">Active</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider w-24 text-center transition-colors">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {filteredValues.map((v, i) => (
                    <tr key={v.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group">
                      <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center transition-colors font-mono">{i + 1}</td>
                      <td className="px-4 py-4 transition-colors">
                        <span className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase transition-colors">{v.name}</span>
                      </td>
                      {isColor && (
                        <td className="px-4 py-4 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border border-gray-100 dark:border-slate-700 transition-colors" style={{ backgroundColor: v.code }} />
                            <span className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase transition-colors">{v.code}</span>
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-4 text-center transition-colors">
                        <button 
                          onClick={() => toggleStatus(v.id)}
                          className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none ${v.active ? 'bg-green-500 shadow-sm shadow-green-100 dark:shadow-none' : 'bg-gray-200 dark:bg-slate-700 transition-colors'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${v.active ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center relative action-menu-container transition-colors">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === v.id ? null : v.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-500 hover:text-gray-800 dark:hover:text-slate-200 transition-colors"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>

                        {openMenuId === v.id && (
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-32 bg-white dark:bg-slate-900 rounded-sm shadow-2xl z-10 py-1.5 animate-in slide-in-from-right-2 duration-200 border border-gray-50/50 dark:border-slate-800 transition-colors">
                            <button 
                              onClick={() => handleEdit(v)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group text-left transition-colors"
                            >
                              <PencilIcon className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                setShowDeleteModal(true);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors group text-left transition-colors"
                            >
                              <TrashIcon className="h-4 w-4 text-red-300 group-hover:text-red-500 transition-colors" />
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
               <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Showing 1-{filteredValues.length} of {values.length} results</p>
            </div>
          </div>

          {/* Add Form Card */}
          <div id="add-value-form" className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-slate-800 pb-4 transition-colors">
              <h2 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">{editingId ? "Update Variation Value" : "Add New Variation Value"}</h2>
              {editingId && (
                <button 
                  onClick={cancelEdit}
                  className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Variation Value Name</label>
                <input 
                  type="text" 
                  placeholder="Type variation value name"
                  value={valueName}
                  onChange={(e) => setValueName(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-medium focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-bold text-gray-800 dark:text-gray-100 transition-colors"
                />
              </div>
              {isColor && (
                <div className="space-y-2 transition-colors">
                  <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Color Code</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="#000000"
                      value={colorCode}
                      onChange={(e) => setColorCode(e.target.value)}
                      className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-medium focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-bold text-gray-800 dark:text-gray-100 Transition-colors uppercase"
                    />
                    <input 
                      type="color" 
                      value={colorCode}
                      onChange={(e) => setColorCode(e.target.value)}
                      className="h-9 w-9 p-0.5 border border-gray-100 dark:border-slate-700 rounded-sm cursor-pointer bg-white dark:bg-slate-800 transition-colors" 
                    />
                  </div>
                </div>
              )}
            </div>
            <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm shadow-lg shadow-green-100 dark:shadow-none transition-all uppercase tracking-widest">
              {editingId ? "Update Value" : "Save Value"}
            </button>
          </div>
        </div>

        {/* Right Column: Sidebar Navigation */}
        <div className="w-full lg:w-72 sticky top-28 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
             <h3 className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest flex items-center gap-2 mb-6 transition-colors">
                Variation Value Information
             </h3>
             <nav className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gray-100 dark:before:bg-slate-800 transition-colors">
                {[
                  { id: "all", label: "All Variation Values", active: true },
                  { id: "add", label: "Add New Variation Value", active: false }
                ].map((nav) => (
                  <div 
                    key={nav.id} 
                    className="flex items-center gap-4 text-[11px] font-bold transition-all group relative z-10 cursor-pointer"
                  >
                    <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                      nav.active ? "bg-green-500 border-green-500 text-white" : "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-600 transition-colors"
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${nav.active ? "bg-white" : "bg-gray-200 dark:bg-slate-700 transition-colors"}`} />
                    </div>
                    <span className={`transition-colors ${nav.active ? "text-green-600" : "text-gray-400 dark:text-slate-500 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors"}`}>{nav.label}</span>
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
              <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center text-red-500 mb-2 transition-colors">
                <XCircleIcon className="h-7 w-7" />
              </div>
              <div className="space-y-1 transition-colors">
                <h4 className="text-[15px] font-black text-gray-800 dark:text-gray-100 transition-colors">Are you sure to delete this?</h4>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 transition-colors">All data related to this may get deleted.</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-center gap-3 pb-8 px-8 transition-colors">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-[11px] font-black rounded-sm transition-all shadow-lg shadow-red-100 dark:shadow-none uppercase tracking-widest"
              >
                Proceed
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-2.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700 text-[11px] font-black rounded-sm transition-all uppercase tracking-widest shadow-sm shadow-gray-100 dark:shadow-none"
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
