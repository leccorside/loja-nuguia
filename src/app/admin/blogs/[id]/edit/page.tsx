"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeftIcon, 
  CheckIcon, 
  PhotoIcon, 
  ArrowUpTrayIcon,
  GlobeAltIcon,
  TagIcon,
  PlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamic import for TinyMCE to avoid hydration mismatch
const Editor = dynamic(() => import("@tinymce/tinymce-react").then(mod => mod.Editor), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-50 animate-pulse flex items-center justify-center font-black text-gray-300 text-[10px] uppercase">Loading Editor...</div>
});

const mockBlogs = [
  { 
    id: 1, 
    title: "Healthy Eating: Tips for a Better Life", 
    category: "Health", 
    themes: ["Organic", "Grocery", "Halal Food"],
    tags: "Healthy, Food, Lifestyle",
    youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    shortDescription: "Discover how healthy eating can transform your physical and mental well-being.",
    description: "Detailed content about healthy eating habits and nutrition tips for daily life...",
    metaTitle: "Healthy Eating Guide | Grostore",
    metaDescription: "The ultimate guide to healthy eating and nutrition at Grostore.",
    active: true 
  },
];

export default function EditBlogPage() {
  const params = useParams();
  const id = Number(params.id);
  const [blog, setBlog] = useState<any>(null);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  useEffect(() => {
    const selected = mockBlogs.find(b => b.id === id);
    if (selected) {
      setBlog(selected);
      setSelectedThemes(selected.themes);
    }
  }, [id]);

  const removeTheme = (theme: string) => {
    setSelectedThemes(selectedThemes.filter(t => t !== theme));
  };

  if (!blog) {
    return <div className="p-8 text-center text-gray-400 font-black uppercase text-xs">Loading blog data...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex items-center gap-4">
        <Link 
          href="/admin/blogs" 
          className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-green-500"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-black text-gray-800 tracking-tight">Edit Blog</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Basic Information Section */}
          <section id="basic-info" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">
              Basic Information
            </h2>
            
            <div className="space-y-6">
              {/* Themes Multi-select */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Themes <span className="text-red-500">*</span>
                </label>
                <div className="w-full p-2 bg-gray-50/50 border border-gray-100 rounded-sm flex flex-wrap gap-2 min-h-[42px]">
                  {selectedThemes.map(theme => (
                    <span key={theme} className="flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-100 rounded-sm text-[10px] font-bold text-gray-600 shadow-sm">
                      {theme}
                      <button onClick={() => removeTheme(theme)} className="text-gray-400 hover:text-red-500">
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <input type="text" className="flex-1 bg-transparent border-none outline-none text-xs min-w-[100px]" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Blog Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  defaultValue={blog.title}
                  placeholder="Type blog title" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Category <span className="text-red-500">*</span>
                </label>
                <select 
                  defaultValue={blog.category}
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all font-medium text-gray-500"
                >
                  <option>Select a category</option>
                  <option>Health</option>
                  <option>Ecommerce</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tags</label>
                <input 
                  type="text" 
                  defaultValue={blog.tags}
                  placeholder="Select tags" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">YouTube Video Link</label>
                <input 
                  type="text" 
                  defaultValue={blog.youtubeLink}
                  placeholder="https://www.youtube.com/watch?v=... " 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium text-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Short Description</label>
                <textarea 
                  rows={4}
                  defaultValue={blog.shortDescription}
                  placeholder="Type your short description" 
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Description</label>
                <div className="border border-gray-100 rounded-sm overflow-hidden tinymce-editor-container">
                  <Editor
                    apiKey="t1jd137wiffrno4jnz8xa25s283ynd0qncu4kekm3n1qpnq6"
                    initialValue={blog.description}
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

          {/* Images Section */}
          <section id="images" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">
              Images
            </h2>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Thumbnail Image (300×300)</label>
                <div className="w-full border-2 border-dashed border-gray-100 rounded-sm hover:border-green-500 transition-colors p-10 flex flex-col items-center justify-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <PlusIcon className="h-6 w-6 text-gray-300 group-hover:text-green-500" />
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-green-500">Choose Blog Thumbnail</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Blog Details Image (1200×700)</label>
                <div className="w-full border-2 border-dashed border-gray-100 rounded-sm hover:border-green-500 transition-colors p-10 flex flex-col items-center justify-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <PlusIcon className="h-6 w-6 text-gray-300 group-hover:text-green-500" />
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-green-500">Choose Blog Details Image</p>
                </div>
              </div>
            </div>
          </section>

          {/* SEO Meta Configuration */}
          <section id="seo" className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">
               SEO Meta Configuration
            </h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Title</label>
                <input 
                  type="text" 
                  defaultValue={blog.metaTitle}
                  placeholder="Type meta title" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-tight italic italic">Set a meta tag title. Recommended to be simple and unique.</p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Description</label>
                <textarea 
                  rows={4}
                  defaultValue={blog.metaDescription}
                  placeholder="Type your meta description" 
                  className="w-full px-4 py-3 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Meta Image</label>
                <div className="w-full h-48 border-2 border-dashed border-gray-100 rounded-sm hover:border-green-500 transition-colors flex flex-col items-center justify-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-green-50 transition-colors">
                    <PlusIcon className="h-6 w-6 text-gray-300 group-hover:text-green-500" />
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-green-500">Choose Meta Image</p>
                </div>
              </div>
            </div>
          </section>

          {/* Action Button */}
          <button className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm transition-all uppercase tracking-widest shadow-lg shadow-green-100 mb-20">
            <CheckIcon className="h-4 w-4" />
            Update Blog
          </button>
        </div>

        {/* Sidebar Navigation Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden sticky top-24">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">
                Blog Information
              </h3>
            </div>
            <div className="p-6">
              <div className="relative pl-8 space-y-10">
                {/* Stepper Line */}
                <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gray-100"></div>

                {/* Step 1 */}
                <Link href="#basic-info" className="relative flex items-center group cursor-pointer">
                  <div className="absolute -left-8 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-green-500 uppercase tracking-widest leading-none">
                      Basic Information
                    </h4>
                  </div>
                </Link>

                {/* Step 2 */}
                <Link href="#images" className="relative flex items-center group cursor-pointer">
                  <div className="absolute -left-8 w-7 h-7 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-gray-200 rounded-full hover:bg-green-500 transition-colors"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors leading-none">
                      Blog Images
                    </h4>
                  </div>
                </Link>

                {/* Step 3 */}
                <Link href="#seo" className="relative flex items-center group cursor-pointer">
                  <div className="absolute -left-8 w-7 h-7 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-gray-200 rounded-full hover:bg-green-500 transition-colors"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-400 hover:text-green-500 uppercase tracking-widest transition-colors leading-none">
                      SEO Meta Options
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
