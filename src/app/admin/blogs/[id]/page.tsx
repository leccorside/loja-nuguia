"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeftIcon, 
  PencilSquareIcon,
  TagIcon,
  CalendarIcon,
  UserIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

const mockBlogs = [
  { 
    id: 1, 
    title: "Healthy Eating: Tips for a Better Life", 
    category: "Health", 
    tags: ["Healthy", "Food", "Lifestyle"], 
    active: true,
    author: "Admin",
    date: "2024-03-15",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    longDescription: "<h1>Introduction</h1><p>Eating healthy is not just about losing weight, it's about feeling great and having more energy. In this post, we will explore the best tips for a balanced diet.</p><h2>The Basics</h2><p>Include more vegetables and fruits in your daily meals. They are packed with essential vitamins and minerals.</p>",
    metaTitle: "Healthy Eating Tips | My Store",
    metaDescription: "Learn how to eat healthier with our top tips for a better life.",
    thumbnail: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80"
  },
  { 
    id: 2, 
    title: "The Future of Online Grocery Shopping", 
    category: "Ecommerce", 
    tags: ["Tech", "Grocery", "Future"], 
    active: false,
    author: "Admin",
    date: "2024-03-14",
    description: "Online grocery shopping is evolving fast. Discover the trends that are shaping the future of how we buy our food.",
    longDescription: "<h1>The Digital Revolution</h1><p>The way we buy groceries has changed forever. With the rise of on-demand delivery and AI-powered recommendations, the convenience is unprecedented.</p>",
    metaTitle: "Future of Grocery Shopping | My Store",
    metaDescription: "Insights into the future of online grocery commerce.",
    thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
  },
];

export default function ViewBlogPage() {
  const { id } = useParams();
  const blog = mockBlogs.find(b => b.id === Number(id)) || mockBlogs[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header Area */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs" className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-sm text-gray-400 dark:text-slate-500 hover:text-green-500 transition-colors">
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight transition-colors">Blog Post Details</h1>
            <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">
                <span className="flex items-center gap-1 transition-colors"><UserIcon className="h-3 w-3" /> {blog.author}</span>
                <span className="flex items-center gap-1 transition-colors"><CalendarIcon className="h-3 w-3" /> {blog.date}</span>
            </div>
          </div>
        </div>
        <Link 
          href={`/admin/blogs/${blog.id}/edit`}
          className="px-8 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm shadow-lg shadow-green-100 dark:shadow-none transition-all uppercase tracking-widest flex items-center gap-2"
        >
          <PencilSquareIcon className="h-4 w-4" />
          Edit Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6 transition-colors">
          {/* Post Header */}
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="aspect-video w-full relative">
                <img 
                    src={blog.thumbnail} 
                    alt={blog.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase tracking-widest rounded-sm shadow-lg">
                        {blog.category}
                    </span>
                </div>
            </div>
            <div className="p-8 space-y-6 transition-colors">
                <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 leading-tight transition-colors">{blog.title}</h2>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50 dark:border-slate-800 uppercase tracking-tighter transition-colors">
                    {blog.tags.map(tag => (
                        <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 text-[9px] font-bold border border-gray-100 dark:border-slate-700 rounded-sm transition-colors">
                            <TagIcon className="h-3 w-3" /> {tag}
                        </span>
                    ))}
                </div>
                
                {/* Short Description */}
                <div className="bg-gray-50 dark:bg-slate-800/50 p-6 rounded-sm border-l-4 border-green-500 italic text-gray-600 dark:text-slate-300 text-xs leading-relaxed font-medium transition-colors">
                    {blog.description}
                </div>

                {/* Long Description (Content) */}
                <div className="prose prose-sm max-w-none text-gray-600 dark:text-slate-400 font-medium transition-colors">
                    {/* Simulated HTML Content Rendering */}
                    <div dangerouslySetInnerHTML={{ __html: blog.longDescription }} />
                </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6 transition-colors">
            {/* SEO Summary */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
                <div className="flex items-center gap-2 pb-4 border-b border-gray-50 dark:border-slate-800 transition-colors">
                    <GlobeAltIcon className="h-4 w-4 text-gray-400 dark:text-slate-500 transition-colors" />
                    <h3 className="text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">SEO Meta Info</h3>
                </div>
                <div className="space-y-4 transition-colors">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-wider transition-colors">Meta Title</label>
                        <p className="text-[11px] font-bold text-gray-700 dark:text-slate-200 transition-colors">{blog.metaTitle}</p>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-wider transition-colors">Meta Description</label>
                        <p className="text-[11px] font-bold text-gray-500 dark:text-slate-400 leading-relaxed transition-colors">{blog.metaDescription}</p>
                    </div>
                </div>
            </div>

            {/* Status Card */}
            <div className={`p-6 rounded-sm border shadow-sm transition-colors ${blog.active ? 'bg-green-50/50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20' : 'bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-800'}`}>
                <div className="flex items-center justify-between transition-colors">
                    <div>
                        <p className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Visibility Status</p>
                        <p className={`text-[11px] font-black uppercase tracking-wider transition-colors ${blog.active ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-slate-400'}`}>
                            {blog.active ? 'Active' : 'Inactive'}
                        </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full transition-colors ${blog.active ? 'bg-green-500 shadow-lg shadow-green-100 dark:shadow-none animate-pulse' : 'bg-gray-300 dark:bg-slate-700'}`}></div>
                </div>
            </div>

            {/* Admin Insights (Placeholder) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
                <h3 className="text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">Admin Stats</h3>
                <div className="grid grid-cols-2 gap-4 transition-colors">
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-sm border border-gray-100 dark:border-slate-800 text-center transition-colors">
                        <p className="text-xl font-black text-gray-800 dark:text-gray-100 tracking-tighter transition-colors">0</p>
                        <p className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Views</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-sm border border-gray-100 dark:border-slate-800 text-center transition-colors">
                        <p className="text-xl font-black text-gray-800 dark:text-gray-100 tracking-tighter transition-colors">0</p>
                        <p className="text-[9px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest transition-colors">Comments</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
