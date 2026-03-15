"use client";

import { useState, use } from "react";
import { 
  ArrowLeftIcon, 
  CloudArrowUpIcon, 
  PlusIcon,
  XMarkIcon,
  ChevronDownIcon,
  QuestionMarkCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  PhotoIcon,
  SwatchIcon,
  TagIcon,
  CurrencyDollarIcon,
  TruckIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import for TinyMCE to avoid hydration mismatch
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-50 animate-pulse flex items-center justify-center font-black text-gray-300 text-[10px] uppercase">Loading Editor...</div>
});

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [productType, setProductType] = useState("Physical");
  
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Header Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div className="flex items-center gap-4">
          <Link href="/admin/products/all" className="p-2 hover:bg-gray-50 rounded-sm text-gray-400 hover:text-green-500 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-black text-gray-800 tracking-tight">Update Product</h1>
        </div>
        <button className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm shadow-lg shadow-green-100 transition-all uppercase tracking-widest">
          Save Changes
        </button>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider flex items-center gap-1">
                  Product Type <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  {["Physical", "Digital"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="type" 
                        checked={productType === type}
                        onChange={() => setProductType(type)}
                        className="w-4 h-4 text-green-500 border-gray-300 focus:ring-green-500"
                      />
                      <span className={`text-[11px] font-bold ${productType === type ? "text-gray-800" : "text-gray-400 group-hover:text-gray-600"}`}>{type} Product</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  defaultValue="Audi Sheesham Wood Dining Chair"
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
                <p className="text-[10px] text-gray-400 font-medium">Product name is the main feature of the product.</p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Product Slug <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  defaultValue="audi-sheesham-wood-dining-chair-lorem-ipsum-123"
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Short Description
                </label>
                <textarea 
                  rows={3}
                  defaultValue="Audi Sheesham Wood Dining Chair"
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium resize-none"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">
                  Description
                </label>
                <div className="border border-gray-100 rounded-sm overflow-hidden tinymce-editor-container">
                  <Editor
                    apiKey="t1jd137wiffrno4jnz8xa25s283ynd0qncu4kekm3n1qpnq6"
                    initialValue="<p>Audi Sheesham Wood Dining Chair</p>"
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                      ],
                      toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:12px; font-weight: 500; color: #4b5563; }',
                      skin: 'oxide',
                      content_css: 'default',
                      branding: false,
                      promotion: false,
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Images */}
          <section id="images" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
              <PhotoIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Images</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Thumbnail</label>
                <div className="flex flex-wrap gap-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-sm border border-gray-100 relative group overflow-hidden">
                    <img src="https://picsum.photos/seed/thumb/200" alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    <button className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center gap-1 hover:border-green-500 cursor-pointer transition-colors bg-gray-50/30">
                     <CloudArrowUpIcon className="h-5 w-5 text-gray-400" />
                     <span className="text-[9px] font-black text-gray-400 uppercase">Upload</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Gallery</label>
                <div className="flex flex-wrap gap-4">
                   {[1, 2, 3].map((i) => (
                    <div key={i} className="w-24 h-24 bg-gray-50 rounded-sm border border-gray-100 relative group overflow-hidden">
                      <img src={`https://picsum.photos/seed/gal${i}/200`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      <button className="absolute top-1 right-1 p-0.5 bg-red-500 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center gap-1 hover:border-green-500 cursor-pointer transition-colors bg-gray-50/30">
                     <CloudArrowUpIcon className="h-5 w-5 text-gray-400" />
                     <span className="text-[9px] font-black text-gray-400 uppercase">Add More</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Categories & Tags */}
          <section id="categories" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                  <SwatchIcon className="h-4 w-4 text-gray-400" />
                  <h2 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Product Categories <span className="text-red-500">*</span></h2>
                </div>
                <div className="relative group">
                   <div className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs min-h-[40px] flex flex-wrap gap-2 items-center">
                     <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-sm border border-green-100 flex items-center gap-1">
                       Furniture <XMarkIcon className="h-3 w-3 cursor-pointer" />
                     </span>
                     <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded-sm border border-green-100 flex items-center gap-1">
                       Bedroom <XMarkIcon className="h-3 w-3 cursor-pointer" />
                     </span>
                   </div>
                   <div className="absolute right-3 top-2.5 text-gray-400 group-hover:text-green-500 transition-colors">
                      <ChevronDownIcon className="h-4 w-4" />
                   </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
                  <TagIcon className="h-4 w-4 text-gray-400" />
                  <h2 className="text-[11px] font-black text-gray-800 uppercase tracking-widest">Product Tags</h2>
                </div>
                <div className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs min-h-[40px] flex items-center">
                  <input type="text" placeholder="Select Tags" className="bg-transparent border-none outline-none w-full placeholder:text-gray-300" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Brand & Unit */}
          <section id="brand" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Product Brand</label>
                <div className="relative group">
                  <select className="w-full pl-4 pr-10 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-800 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all">
                    <option>Sony (B-02)</option>
                    <option>Apple</option>
                    <option>Samsung</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-hover:text-green-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Product Unit</label>
                <div className="relative group">
                  <select className="w-full pl-4 pr-10 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-800 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all">
                    <option>Select Unit</option>
                    <option>Pieces (PC)</option>
                    <option>Kilograms (KG)</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none group-hover:text-green-500" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Price & Stock */}
          <section id="price" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-gray-50">
               <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                  <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Price, Stock & Variant</h2>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-gray-400 uppercase">Has Variant?</span>
                  <button className="w-8 h-4 rounded-full bg-gray-200 relative">
                     <span className="absolute left-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow-sm"></span>
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Price <span className="text-red-500">*</span></label>
                  <input type="number" defaultValue="19975" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-black text-gray-800 focus:ring-1 focus:ring-green-500 outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Stock <span className="text-red-500">*</span></label>
                  <input type="number" defaultValue="10" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-black text-gray-800 focus:ring-1 focus:ring-green-500 outline-none" />
                  <p className="text-[9px] text-orange-500 italic font-bold">Minimum Low Stock: 4</p>
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">SKU</label>
                  <input type="text" defaultValue="P-321-23" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Cost</label>
                  <input type="number" defaultValue="10000" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none" />
               </div>
            </div>
          </section>

          {/* Section: Discount */}
          <section id="discount" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-[11px] font-black text-gray-800 uppercase tracking-widest pb-4 border-b border-gray-50">Product Discount</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Date Range</label>
                  <input type="text" placeholder="Select Date Range" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Discount Amount</label>
                  <input type="number" defaultValue="0" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Percentage / Fixed</label>
                  <select className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold outline-none">
                     <option>Percentage (%)</option>
                     <option>Fixed Amount ($)</option>
                  </select>
               </div>
            </div>
          </section>

          {/* Section: Shipping */}
          <section id="shipping" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
               <TruckIcon className="h-5 w-5 text-gray-400" />
               <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">Shipping Configuration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Minimum Purchase Qty</label>
                  <input type="number" defaultValue="1" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none" />
               </div>
               <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Maximum Purchase Qty</label>
                  <input type="number" defaultValue="10" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none" />
               </div>
            </div>
          </section>

          {/* Section: Taxes */}
          <section id="taxes" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest pb-4 border-b border-gray-50">Product Taxes (Default %)</h2>
            <div className="space-y-4">
               {[
                 { label: "GST", value: 18 },
                 { label: "VAT", value: 5 },
                 { label: "Sales Tax", value: 0 },
                 { label: "Service Tax", value: 0 }
               ].map((tax, i) => (
                 <div key={i} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-2 w-full">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{tax.label}</label>
                       <input type="number" defaultValue={tax.value} className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none" />
                    </div>
                    <div className="w-full md:w-64 space-y-2">
                       <select className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold outline-none">
                          <option>Percentage (%)</option>
                          <option>Fixed ($)</option>
                       </select>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* Section: SEO */}
          <section id="seo" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-50">
               <GlobeAltIcon className="h-5 w-5 text-gray-400" />
               <h2 className="text-sm font-black text-gray-800 uppercase tracking-widest">SEO Meta Configuration</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Title</label>
                <input type="text" placeholder="Audi Sheesham Wood Dining Chair" className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Description</label>
                <textarea rows={4} className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none resize-none" placeholder="Enter meta description..." />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Meta Image</label>
                <div className="w-full py-10 border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center gap-3 hover:border-green-500 cursor-pointer transition-colors bg-gray-50/30">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <PlusIcon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Browse Attachment</span>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-[12px] font-black rounded-sm shadow-xl shadow-green-100 transition-all uppercase tracking-[2px] w-full sm:w-auto">
              Save Product
            </button>
          </div>
        </div>

        {/* Right Column: Sticky Navigation */}
        <div className="w-full lg:w-72 sticky top-28 space-y-4">
          <div className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm">
             <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 mb-6">
                <span className="w-1 h-4 bg-green-500 rounded-full"></span>
                Product Information
             </h3>
             <nav className="space-y-1">
                {[
                  { id: "basic-info", label: "Basic Information", icon: DocumentTextIcon },
                  { id: "images", label: "Product Images", icon: PhotoIcon },
                  { id: "categories", label: "Categories & Tags", icon: SwatchIcon },
                  { id: "brand", label: "Brand & Unit", icon: TagIcon },
                  { id: "price", label: "Price & Stock", icon: CurrencyDollarIcon },
                  { id: "shipping", label: "Shipping Config", icon: TruckIcon },
                  { id: "taxes", label: "Taxes & Vat", icon: CurrencyDollarIcon },
                  { id: "seo", label: "SEO Meta", icon: GlobeAltIcon }
                ].map((nav) => (
                  <a 
                    key={nav.id} 
                    href={`#${nav.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 text-[11px] font-bold text-gray-400 hover:text-green-600 hover:bg-green-50/50 rounded-sm transition-all group"
                  >
                    <nav.icon className="h-4 w-4 text-gray-300 group-hover:text-green-500" />
                    {nav.label}
                  </a>
                ))}
             </nav>
          </div>

          <div className="bg-green-50/50 p-6 rounded-sm border border-green-100">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-green-200">
                   ?
                </div>
                <div>
                   <p className="text-[11px] font-black text-gray-800 uppercase leading-none">Need Help?</p>
                   <p className="text-[10px] text-green-600 font-bold">Read our guide</p>
                </div>
             </div>
             <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                Learn how to correctly configure your products for maximum sales and SEO performance.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
