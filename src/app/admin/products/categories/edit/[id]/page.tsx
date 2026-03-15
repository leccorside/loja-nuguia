"use client";

import { useState } from "react";
import { 
  ArrowLeftIcon, 
  PlusIcon,
  XMarkIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  PhotoIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  // Mock initial data based on the design
  const [themes, setThemes] = useState(["Organic", "Halal Food"]);
  const [newTheme, setNewTheme] = useState("");
  const [categoryName, setCategoryName] = useState("Fresh Chicken");
  const [categoryDescription, setCategoryDescription] = useState("Collaboratively procrastinate client-centered intellectual capital whereas out-of-the-box \"outside the box\" thinking.");
  const [sortingPriority, setSortingPriority] = useState(1);

  const addTheme = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTheme.trim()) {
      e.preventDefault();
      if (!themes.includes(newTheme.trim())) {
        setThemes([...themes, newTheme.trim()]);
      }
      setNewTheme("");
    }
  };

  const removeTheme = (themeToRemove: string) => {
    setThemes(themes.filter(t => t !== themeToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/admin/products/categories" className="p-2 hover:bg-gray-50 rounded-sm text-gray-400 hover:text-green-500 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-black text-gray-800 tracking-tight">Update Category</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Column: Form */}
        <div className="flex-1 space-y-6 w-full">
          
          {/* Section: Basic Information */}
          <section id="basic-info" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Basic Information</h2>
            </div>
            
            <div className="space-y-6">
              {/* Themes / Tags */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Themes <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 p-2 bg-gray-50/50 border border-gray-100 rounded-sm focus-within:ring-1 focus-within:ring-green-500 min-h-[40px]">
                  {themes.map((theme) => (
                    <span key={theme} className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-100 rounded text-[10px] font-bold text-gray-600 shadow-sm">
                      {theme}
                      <button onClick={() => removeTheme(theme)} className="hover:text-red-500">
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input 
                    type="text"
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value)}
                    onKeyDown={addTheme}
                    placeholder="Type and press enter"
                    className="flex-1 bg-transparent outline-none text-xs min-w-[120px]"
                  />
                </div>
              </div>

              {/* Category Name */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-bold text-gray-800"
                />
              </div>

              {/* Category Description */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Category Description
                </label>
                <textarea 
                  rows={3}
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  placeholder="Enter category description"
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-bold text-gray-800 resize-none"
                />
              </div>

              {/* Base Category */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Base Category
                </label>
                <div className="relative group">
                  <select className="w-full pl-4 pr-10 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-400 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all">
                    <option>—</option>
                    <option>Electronic</option>
                    <option>Grocery</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-hover:text-green-500" />
                </div>
              </div>

              {/* Brands */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Brands
                </label>
                <div className="relative group">
                   <div className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs min-h-[40px] flex items-center">
                      <span className="text-gray-300 font-medium">Select brands</span>
                   </div>
                   <div className="absolute right-3 top-2.5 text-gray-400 group-hover:text-green-500 transition-colors">
                      <ChevronDownIcon className="h-4 w-4" />
                   </div>
                </div>
              </div>

              {/* Sorting Priority Number */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Sorting Priority Number
                </label>
                <input 
                  type="number" 
                  value={sortingPriority}
                  onChange={(e) => setSortingPriority(parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-800 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                />
              </div>
            </div>
          </section>

          {/* Section: Images */}
          <section id="images" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
              <PhotoIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Images</h2>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Thumbnail</label>
              <div className="w-full py-16 border-2 border-dashed border-gray-100 rounded-sm flex flex-col items-center justify-center gap-3 hover:border-green-500 cursor-pointer transition-colors bg-gray-50/10">
                <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mb-2">Choose Category Thumbnail</p>
                <div className="relative">
                   <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-3xl shadow-sm border border-red-100/50 relative">
                      🍗
                      <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 text-gray-300">
                         <PlusIcon className="h-5 w-5" />
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: SEO Meta Configuration */}
          <section id="seo" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
              <GlobeAltIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">SEO Meta Configuration</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Title</label>
                <input 
                  type="text" 
                  placeholder="Type meta title"
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-medium text-gray-800 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300"
                />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Set a meta tag title. Recommended to be simple and unique.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Description</label>
                <textarea 
                  rows={4}
                  placeholder="Type your meta description"
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-medium text-gray-800 focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Image</label>
                <div className="w-full py-12 border-2 border-dashed border-gray-100 rounded-sm flex flex-col items-center justify-center gap-4 hover:border-green-500 cursor-pointer transition-colors bg-gray-50/10">
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Choose Meta Image</p>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100 text-gray-300">
                     <PlusIcon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[12px] font-black rounded-sm shadow-xl shadow-green-100 transition-all uppercase tracking-[2px] w-full sm:w-auto">
              Save Changes
            </button>
          </div>
        </div>

        {/* Right Column: Sticky Navigation */}
        <div className="w-full lg:w-72 sticky top-28 space-y-4">
          <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm font-bold">
             <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 mb-6">
                Category Information
             </h3>
             <nav className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-gray-100">
                {[
                  { id: "basic-info", label: "Basic Information", active: true },
                  { id: "images", label: "Category Image", active: false },
                  { id: "seo", label: "SEO Meta Options", active: false }
                ].map((nav) => (
                  <a 
                    key={nav.id} 
                    href={`#${nav.id}`}
                    className="flex items-center gap-4 text-[11px] font-bold transition-all group relative z-10"
                  >
                    <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all shadow-sm ${
                      nav.active ? "bg-green-500 border-green-500 text-white" : "bg-white border-gray-100 text-gray-300"
                    }`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${nav.active ? "bg-white" : "bg-gray-200"}`} />
                    </div>
                    <span className={`${nav.active ? "text-green-600" : "text-gray-400 group-hover:text-gray-600"}`}>{nav.label}</span>
                  </a>
                ))}
             </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
