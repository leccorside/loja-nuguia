"use client";

import { useState, useRef, useEffect } from "react";
import { 
  MagnifyingGlassIcon, 
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  TagIcon,
  DocumentPlusIcon,
  XMarkIcon as XIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

const initialTags = [
  { id: 1, name: "Food" },
  { id: 2, name: "Grocery" },
  { id: 3, name: "Fresh Food" },
  { id: 4, name: "Organic Food" },
  { id: 5, name: "All Fruits" },
  { id: 6, name: "Ecommerce" },
  { id: 7, name: "Healthy Diet" },
];

export default function TagsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState(initialTags);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editingTag, setEditingTag] = useState<any | null>(null);
  const [tagName, setTagName] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setOpenMenuId(null);
    // Smooth scroll to the form
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingTag(null);
    setTagName("");
  };

  const handleDelete = () => {
    if (deleteId) {
      setTags(prev => prev.filter(t => t.id !== deleteId));
      setDeleteId(null);
    }
  };

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors">
        <h1 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight uppercase">Tags</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List + Add Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* List Card */}
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex gap-2 transition-colors">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 dark:text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-500 font-medium text-gray-700 dark:text-slate-200"
                />
              </div>
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm transition-colors uppercase tracking-widest shadow-lg shadow-green-100 dark:shadow-none">
                Search
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-slate-800 border-y border-gray-100 dark:border-slate-800">
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest w-20">S/L</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Name</th>
                    <th className="px-6 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-right w-32">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
                  {filteredTags.map((tag, index) => (
                    <tr key={tag.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group">
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400">{index + 1}</td>
                      <td className="px-6 py-4 text-[11px] font-bold text-gray-800 dark:text-slate-200">{tag.name}</td>
                      <td className="px-6 py-4 text-right relative">
                        <button 
                          onClick={() => setOpenMenuId(openMenuId === tag.id ? null : tag.id)}
                          className="p-1 text-gray-400 dark:text-slate-500 hover:text-green-500 transition-colors"
                        >
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>
                        
                        {openMenuId === tag.id && (
                          <div 
                            ref={menuRef}
                            className="absolute right-6 top-10 w-32 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-sm shadow-xl z-50 py-1.5 transition-colors"
                          >
                            <button 
                              onClick={() => handleEdit(tag)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] font-black text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-green-500 uppercase tracking-widest transition-colors"
                            >
                              <PencilSquareIcon className="h-4 w-4" />
                              Edit
                            </button>
                            <button 
                              onClick={() => {
                                setDeleteId(tag.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[10px] font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 uppercase tracking-widest transition-colors"
                            >
                              <TrashIcon className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filteredTags.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-10 text-center text-gray-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">
                        No tags found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination Info */}
            <div className="px-6 py-4 bg-gray-50/10 dark:bg-slate-800/10 border-t border-gray-50 dark:border-slate-800 transition-colors">
              <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                Showing 1-{filteredTags.length} of {tags.length} results
              </p>
            </div>
          </div>

          {/* Add/Update Tag Card */}
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="px-6 py-4 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between transition-colors">
              <h2 className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">
                {editingTag ? "Update Tag" : "Add New Tag"}
              </h2>
              {editingTag && (
                <button 
                  onClick={handleCancel}
                  className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
                >
                  Cancel
                </button>
              )}
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Tag Name</label>
                <input 
                  type="text" 
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  placeholder="Type tag name" 
                  className="w-full px-4 py-3 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-500 font-medium text-gray-700 dark:text-slate-200"
                />
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white text-[10px] font-black rounded-sm transition-all uppercase tracking-widest shadow-lg shadow-green-100 dark:shadow-none">
                <DocumentPlusIcon className="h-4 w-4" />
                {editingTag ? "Update Tag" : "Save Tag"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Information Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden sticky top-24 transition-colors">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-slate-800 transition-colors">
              <h3 className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Tag Information</h3>
            </div>
            <div className="p-6">
               <div className="relative pl-8 space-y-10">
                {/* Stepper Line */}
                <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gray-100 dark:bg-slate-800 transition-colors"></div>

                {/* Step 1 */}
                <div className="relative flex items-center group">
                  <div className="absolute -left-8 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-green-500 uppercase tracking-widest leading-none">All Tags</h4>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center group opacity-50">
                  <div className="absolute -left-8 w-7 h-7 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest leading-none">Add New Tag</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={() => setDeleteId(null)}></div>
          <div className="bg-white dark:bg-slate-900 rounded-md shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800 transition-colors">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 transition-colors">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight">Delete Confirmation</h3>
              <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center text-center space-y-4 transition-colors">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-2">
                <XCircleIcon className="h-8 w-8" />
              </div>
              <p className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight">Are you sure to delete this?</p>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 leading-relaxed">
                All data related to this may get deleted.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-6 bg-gray-50/30 dark:bg-slate-800/30 border-t border-gray-100 dark:border-slate-800 flex items-center justify-center gap-3 transition-colors">
              <button 
                onClick={handleDelete}
                className="px-8 py-2.5 bg-[#e44626] hover:bg-red-700 text-white text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors shadow-lg shadow-red-100 dark:shadow-none"
              >
                Proceed
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                className="px-8 py-2.5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400 text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors"
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
