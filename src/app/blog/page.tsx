"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  HomeIcon, 
  ChevronRightIcon
} from "@heroicons/react/24/outline";

const POSTS = [
  {
    id: 1,
    title: "Don't Buy What You Don't Must List",
    category: "Apparel",
    date: "March 15, 2024",
    excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt.",
    image: "/blog-1.png",
    slug: "dont-buy-what-you-dont-must"
  },
  {
    id: 2,
    title: "Exclusive Interview For One",
    category: "Collection",
    date: "March 12, 2024",
    excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    image: "/blog-2.png",
    slug: "exclusive-interview-for-one"
  },
  {
    id: 3,
    title: "Best For Performance And Wear",
    category: "Lifestyle",
    date: "March 10, 2024",
    excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    image: "/blog-3.png",
    slug: "best-for-performance-and-wear"
  },
  {
    id: 4,
    title: "Fashion Is What You Wear",
    category: "Style",
    date: "March 08, 2024",
    excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    image: "/blog-4.png",
    slug: "fashion-is-what-you-wear"
  },
  {
    id: 5,
    title: "Look In The Day For Cooler",
    category: "Apparel",
    date: "March 05, 2024",
    excerpt: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    image: "/blog-5.png",
    slug: "look-in-the-day-for-cooler"
  }
];

const RECENT_POSTS = POSTS.slice(0, 3);
const CATEGORIES = ["Apparel", "Style", "Lifestyle", "Collection", "Trends"];
const TAGS = ["Design", "Style", "Trend", "Nike", "Summer", "Sneakers", "Urban"];

export default function BlogPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header (Breadcrumbs) */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Blog</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">Blog</span>
          </nav>
        </div>
      </section>

      {/* 2. Blog Main Content */}
      <section className="container-custom py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Post Feed */}
          <div className="w-full lg:w-2/3 space-y-20">
            {POSTS.map((post) => (
              <article key={post.id} className="space-y-6">
                <div className="relative aspect-[16/9] w-full overflow-hidden group">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-primary hover:text-secondary cursor-pointer transition-colors">{post.category}</span>
                    <span className="text-muted border-l border-border pl-2">{post.date}</span>
                  </div>
                  <h2 className="text-3xl font-black text-secondary uppercase tracking-tighter leading-tight hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="inline-block text-[11px] font-black uppercase text-secondary hover:text-primary underline underline-offset-4 decoration-2 transition-all"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}

            {/* Pagination */}
            <div className="flex justify-start items-center gap-4 pt-10 border-t border-border">
              <button className="w-8 h-8 rounded-full bg-primary text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded-full bg-white border border-border text-muted text-xs font-bold hover:border-primary hover:text-primary transition-all">2</button>
              <button className="flex items-center gap-1 text-[10px] font-bold uppercase text-secondary hover:text-accent transition-colors ml-2">
                Next <ChevronRightIcon className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 space-y-12">
            
            {/* Recent Posts Widget */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-8 pb-2 border-b-2 border-primary w-fit">Recent Posts</h3>
              <div className="space-y-6">
                {RECENT_POSTS.map((post) => (
                  <div key={post.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-bg-gray overflow-hidden">
                      <Image src={post.image} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <h4 className="text-[11px] font-black text-secondary uppercase leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2">
                        {post.title}
                      </h4>
                      <span className="text-[9px] font-bold text-muted uppercase">{post.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Widget */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-8 pb-2 border-b-2 border-primary w-fit">Blog Categories</h3>
              <ul className="space-y-4">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <button className="text-xs font-bold text-muted uppercase tracking-tighter hover:text-primary transition-colors">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags Widget */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-8 pb-2 border-b-2 border-primary w-fit">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {TAGS.map((tag) => (
                  <button 
                    key={tag}
                    className="px-4 py-2 border border-border hover:border-primary hover:bg-primary hover:text-white text-[9px] font-black uppercase transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </section>
    </div>
  );
}
