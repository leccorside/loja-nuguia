"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  MagnifyingGlassIcon, 
  PlusIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
  XMarkIcon as XIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

const mockBlogs = [
  { 
    id: 1, 
    title: "Healthy Eating: Tips for a Better Life", 
    category: "Health", 
    tags: ["Healthy", "Food", "Lifestyle"], 
    active: true 
  },
  { 
    id: 2, 
    title: "The Future of Online Grocery Shopping", 
    category: "Ecommerce", 
    tags: ["Tech", "Grocery", "Future"], 
    active: false 
  },
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [blogs, setBlogs] = useState(mockBlogs);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
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

  const toggleActive = (id: number) => {
    setBlogs(prev => prev.map(blog => 
      blog.id === id ? { ...blog, active: !blog.active } : blog
    ));
  };

  const handleDelete = () => {
    if (deleteId) {
      setBlogs(prev => prev.filter(b => b.id !== deleteId));
      setDeleteId(null);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Select Status" ||
                         (statusFilter === "Active" && blog.active) ||
                         (statusFilter === "Inactive" && !blog.active);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <h1 className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-[2px]">Blogs</h1>
        <Link 
          href="/admin/blogs/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[10px] font-black rounded-sm transition-colors shadow-lg shadow-green-100 dark:shadow-none uppercase tracking-widest"
        >
          <PlusIcon className="h-4 w-4" />
          Add Blog
        </Link>
      </div>

      {/* Filter Area */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 transition-colors">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 font-medium text-gray-700 dark:text-slate-200"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-[11px] font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none min-w-[140px]"
          >
            <option>Select Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-bold rounded-sm transition-colors uppercase tracking-widest shrink-0 shadow-lg shadow-green-100 dark:shadow-none">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      {/* List Card */}
      <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-800">
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest w-12 text-center">S/L</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest min-w-[200px]">Title</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Category</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Tags</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center w-24">Active</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog, i) => (
                  <tr key={blog.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group">
                    <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center">{i + 1}</td>
                    <td className="px-4 py-4">
                      <span className="text-[11px] font-black text-gray-800 dark:text-slate-100 line-clamp-1">{blog.title}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-500 text-[9px] font-black uppercase rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.map(tag => (
                          <span key={tag} className="px-1.5 py-0.5 bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-slate-500 text-[8px] font-bold uppercase rounded-sm border border-gray-100 dark:border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => toggleActive(blog.id)}
                        className={`w-8 h-4 rounded-full relative transition-colors ${blog.active ? "bg-green-500" : "bg-gray-200 dark:bg-slate-700"}`}
                      >
                        <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${blog.active ? "left-4.5" : "left-0.5"}`}></span>
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === blog.id ? null : blog.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-sm text-gray-400 dark:text-slate-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>

                      {openMenuId === blog.id && (
                        <div 
                          ref={menuRef}
                          className="absolute right-full mr-2 top-0 w-40 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-sm shadow-xl z-50 animate-in fade-in slide-in-from-right-2 duration-200"
                        >
                          <div className="p-1.5 space-y-0.5">
                            <Link 
                              href={`/admin/blogs/${blog.id}/edit`}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-green-500 rounded-sm transition-colors group/item"
                            >
                              <PencilSquareIcon className="h-4 w-4 text-gray-400 group-hover/item:text-green-500" />
                              Edit
                            </Link>
                            <Link 
                              href={`/admin/blogs/${blog.id}`}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-500 rounded-sm transition-colors group/item"
                            >
                              <EyeIcon className="h-4 w-4 text-gray-400 dark:text-slate-500 group-hover/item:text-blue-500" />
                              View
                            </Link>
                            <div className="h-px bg-gray-50 dark:bg-slate-800 my-1"></div>
                            <button 
                              onClick={() => {
                                setDeleteId(blog.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-sm transition-colors group/item"
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={6} className="px-4 py-20 text-center">
                    <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">No results</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Info */}
        <div className="px-6 py-4 bg-gray-50/10 dark:bg-slate-800/10 border-t border-gray-50 dark:border-slate-800 transition-colors">
          <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest text-center sm:text-left">
            Showing {filteredBlogs.length > 0 ? `1-${filteredBlogs.length}` : "0"} of {blogs.length} results
          </p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setDeleteId(null)}></div>
          <div className="bg-white dark:bg-slate-900 rounded-md shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight">Delete Confirmation</h3>
              <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-2">
                <XCircleIcon className="h-8 w-8" />
              </div>
              <p className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight">Are you sure to delete this?</p>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-400 leading-relaxed">
                All data related to this may get deleted.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-6 bg-gray-50/30 dark:bg-slate-800/30 flex items-center justify-center gap-3 border-t border-gray-50 dark:border-slate-800">
              <button 
                onClick={handleDelete}
                className="px-8 py-2.5 bg-[#e44626] hover:bg-red-700 text-white text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors shadow-lg shadow-red-100 dark:shadow-none"
              >
                Proceed
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                className="px-8 py-2.5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors"
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
