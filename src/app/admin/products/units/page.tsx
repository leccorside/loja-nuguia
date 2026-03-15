"use client";

import { useState, useEffect } from "react";
import { 
  MagnifyingGlassIcon,
  EllipsisVerticalIcon,
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

// Mock Data for Units
interface Unit {
  id: number;
  name: string;
  active: boolean;
}

const unitsData: Unit[] = [
  { id: 1, name: "pcs", active: true },
  { id: 2, name: "ml", active: true },
  { id: 3, name: "pack", active: true },
];

export default function UnitsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [units, setUnits] = useState<Unit[]>(unitsData);
  const [unitName, setUnitName] = useState("");

  const handleEdit = (u: Unit) => {
    setEditingId(u.id);
    setUnitName(u.name);
    setOpenMenuId(null);
    // Scroll to form
    document.getElementById("add-unit-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setUnitName("");
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
    setUnits(prev => prev.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  const filteredUnits = units.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Select Status" || 
                         (statusFilter === "Active" && u.active) || 
                         (statusFilter === "Inactive" && !u.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header Area */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
        <h1 className="text-sm font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Units</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column */}
        <div className="flex-1 space-y-6 w-full">
          {/* Table Card */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 relative w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-slate-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 font-medium text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="relative group w-full sm:w-48">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer"
                >
                  <option className="dark:bg-slate-900">Select Status</option>
                  <option className="dark:bg-slate-900">Active</option>
                  <option className="dark:bg-slate-900">Inactive</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 dark:text-slate-500 pointer-events-none group-hover:text-green-500 transition-colors" />
              </div>
              <button className="flex items-center justify-center gap-2 px-8 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-black rounded-sm transition-colors shadow-sm shadow-green-100 dark:shadow-none uppercase tracking-widest shrink-0 w-full sm:w-auto">
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
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider text-center transition-colors">Active</th>
                    <th className="px-4 py-4 text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-wider w-24 text-center transition-colors">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {filteredUnits.map((u, i) => (
                    <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group px-4">
                      <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center transition-colors font-mono">{i + 1}</td>
                      <td className="px-4 py-4 transition-colors">
                        <span className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase transition-colors">{u.name}</span>
                      </td>
                      <td className="px-4 py-4 text-center transition-colors">
                        <button 
                          onClick={() => toggleStatus(u.id)}
                          className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none ${u.active ? 'bg-green-500 shadow-sm shadow-green-100 dark:shadow-none' : 'bg-gray-200 dark:bg-slate-700'}`}
                        >
                          <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${u.active ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                        </button>
                      </td>
                      <td className="px-4 py-4 text-center relative action-menu-container transition-colors">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === u.id ? null : u.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-500 hover:text-gray-800 dark:hover:text-slate-200 transition-colors"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>
                        <div key={u.id} className="transition-all">

                         {openMenuId === u.id && (
                          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-32 bg-white dark:bg-slate-900 rounded-sm shadow-2xl z-10 py-1.5 animate-in slide-in-from-right-2 duration-200 border border-gray-50/50 dark:border-slate-800 transition-colors">
                            <button 
                              onClick={() => handleEdit(u)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group text-left transition-colors"
                            >
                              <PencilIcon className="h-4 w-4 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                setShowDeleteModal(true);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors group text-left transition-colors"
                            >
                              <TrashIcon className="h-4 w-4 text-red-300 group-hover:text-red-500" />
                              Delete
                            </button>
                          </div>
                        )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-50 dark:border-slate-800 transition-colors">
               <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Showing 1-{filteredUnits.length} of {units.length} results</p>
            </div>
          </div>

          {/* Add Form Card */}
          <div id="add-unit-form" className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <div className="flex items-center justify-between border-b border-gray-50 dark:border-slate-800 pb-4 transition-colors">
              <h2 className="text-[13px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">{editingId ? "Update Unit" : "Add New Unit"}</h2>
              {editingId && (
                <button 
                  onClick={cancelEdit}
                  className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest"
                >
                  Cancel Edit
                </button>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-700 dark:text-slate-300 uppercase tracking-wider transition-colors">Unit Name</label>
              <input 
                type="text" 
                placeholder="Type unit name"
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-sm text-xs font-medium focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-bold text-gray-800 dark:text-gray-100 transition-colors"
              />
            </div>
            <button className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm shadow-lg shadow-green-100 dark:shadow-none transition-all uppercase tracking-widest">
              {editingId ? "Update Unit" : "Save Unit"}
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-72 sticky top-28 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
             <h3 className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest flex items-center gap-2 mb-6 transition-colors">
                Unit Information
             </h3>
             <nav className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gray-100 dark:before:bg-slate-800 transition-colors">
                {[
                  { id: "all", label: "All Units", active: true },
                  { id: "add", label: "Add New Unit", active: false }
                ].map((nav) => (
                  <div 
                    key={nav.id} 
                    className="flex items-center gap-4 text-[11px] font-bold transition-all group relative z-10 cursor-pointer"
                  >
                    <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                      nav.active ? "bg-green-500 border-green-500 text-white" : "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-300 dark:text-slate-600"
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${nav.active ? "bg-white" : "bg-gray-200"}`} />
                    </div>
                    <span className={`transition-colors ${nav.active ? "text-green-600" : "text-gray-400 dark:text-slate-400 group-hover:text-gray-600 dark:group-hover:text-slate-300 transition-colors"}`}>{nav.label}</span>
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
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/30 transition-colors">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight transition-colors">Delete Confirmation</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-8 flex flex-col items-center text-center space-y-4 transition-colors">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center text-red-500 mb-2 transition-colors">
                <XCircleIcon className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-[15px] font-black text-gray-800 dark:text-gray-100 transition-colors">Are you sure to delete this?</h4>
                <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 transition-colors">All data related to this may get deleted.</p>
              </div>
            </div>

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
