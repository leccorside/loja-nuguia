"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  HomeIcon, 
  ChevronRightIcon,
  ChatBubbleLeftIcon,
  UserIcon
} from "@heroicons/react/24/outline";

const RECENT_POSTS = [
  { id: 1, title: "Don't Buy What You Don't Must List", date: "January 15, 2024", comments: 3, image: "/blog-1.png" },
  { id: 2, title: "Exclusive Interview For One", date: "January 12, 2024", comments: 2, image: "/blog-2.png" },
  { id: 3, title: "Best For Performance And Wear", date: "January 11, 2024", comments: 0, image: "/blog-3.png" },
  { id: 4, title: "The Squeaking Wheel Knits the Cheese", date: "January 10, 2024", comments: 4, image: "/blog-4.png" },
  { id: 5, title: "Paca's Got A Brand New Bag", date: "January 09, 2024", comments: 2, image: "/blog-5.png" },
];

const COMMENTS = [
  {
    id: 1,
    name: "Joe Doe",
    date: "January 10, 2024",
    text: "This is exactly what I was looking for, thank you so much for these insights!",
    replies: [
      {
        id: 2,
        name: "Mike",
        date: "January 12, 2024",
        text: "It would be great to try this theme for my businesses."
      }
    ]
  },
  {
    id: 3,
    name: "Elcia",
    date: "January 14, 2024",
    text: "What a nice article. It keeps me reading more and more!"
  }
];

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  // In a real app, we'd fetch the post by slug. Here we mock it.
  const post = {
    title: "Once Drawn a Time in the West",
    category: "Uncategorized",
    date: "January 15, 2024",
    author: "admin",
    image: "/blog-2.png",
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header (Breadcrumbs) */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">{post.title}</h1>
          <nav className="flex justify-center items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* 2. Main Content */}
      <section className="container-custom py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Post Content Area */}
          <div className="w-full lg:w-2/3 space-y-10">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
               <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>

            {/* Meta */}
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted">
              <span className="text-primary hover:text-secondary cursor-pointer">{post.category}</span>
              <span className="border-l border-border pl-4">{post.date}</span>
              <span className="border-l border-border pl-4">By {post.author}</span>
            </div>

            {/* Post Text */}
            <div className="prose prose-sm max-w-none text-muted leading-relaxed space-y-6">
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
              </p>
              <p>
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
              </p>

              {/* Blockquote */}
              <blockquote className="relative bg-bg-gray/30 p-12 italic border-l-0 text-secondary text-2xl font-medium tracking-tight">
                <span className="absolute top-4 left-4 text-primary text-6xl opacity-40 font-serif">“</span>
                Vestibulum tempor lobortis semper cras orci parturient a parturient tincidunt erat arcu sodales: sed nascetur et mi bibendum condimentum suspendisse sodales nostra fermentum undies.
              </blockquote>

              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
              </p>
              
              <div className="pt-6">
                <span className="text-secondary font-black uppercase text-[10px]">Category:</span>
                <span className="text-primary font-bold uppercase text-[10px] ml-2">{post.category}</span>
              </div>
              
              <div className="flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all text-xs pt-4">
                 <span>&lt;&lt;</span>
                 <Link href="#">You Can Have Now Much of a Good Thing</Link>
              </div>
            </div>

            {/* 3. Comments Section */}
            <div className="pt-20 border-t border-border">
              <h3 className="text-2xl font-black text-secondary tracking-tighter mb-12">
                {COMMENTS.length} thoughts on &ldquo;{post.title}&rdquo;
              </h3>
              
              <div className="space-y-12">
                {COMMENTS.map((comment) => (
                  <div key={comment.id} className="space-y-10">
                    <div className="flex gap-6">
                      <div className="w-16 h-16 bg-bg-gray flex items-center justify-center rounded-sm shrink-0 border border-border">
                        <UserIcon className="h-8 w-8 text-muted/50" />
                      </div>
                      <div className="flex-grow space-y-2">
                         <div className="flex justify-between items-center">
                            <h4 className="text-sm font-black text-secondary">{comment.name}</h4>
                            <button className="text-[10px] font-black uppercase text-primary hover:text-secondary">Reply</button>
                         </div>
                         <p className="text-[10px] font-bold text-muted uppercase tracking-tighter mb-2">{comment.date}</p>
                         <p className="text-sm text-muted bg-bg-gray/30 p-4 border border-border/50">{comment.text}</p>
                      </div>
                    </div>

                    {/* Replies */}
                    {comment.replies && (
                      <div className="pl-16 md:pl-24 space-y-8">
                        {comment.replies.map(reply => (
                          <div key={reply.id} className="flex gap-6">
                            <div className="w-12 h-12 bg-bg-gray flex items-center justify-center rounded-sm shrink-0 border border-border">
                              <UserIcon className="h-6 w-6 text-muted/50" />
                            </div>
                            <div className="flex-grow space-y-2">
                               <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-black text-secondary">{reply.name}</h4>
                                  <button className="text-[10px] font-black uppercase text-primary hover:text-secondary">Reply</button>
                               </div>
                               <p className="text-[10px] font-bold text-muted uppercase tracking-tighter mb-2">{reply.date}</p>
                               <p className="text-sm text-muted bg-bg-gray/30 p-4 border border-border/50">{reply.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Reply Form */}
            <div className="pt-20">
              <h3 className="text-2xl font-black text-secondary tracking-tighter mb-2 uppercase">Leave a Reply</h3>
              <p className="text-xs text-muted mb-8 italic">Your email address will not be published. Required fields are marked *</p>
              
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-secondary uppercase">Comment *</label>
                  <textarea 
                    rows={8} 
                    className="w-full bg-white border border-border p-4 text-sm focus:border-primary outline-none transition-all resize-none"
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-secondary uppercase">Name *</label>
                      <input type="text" className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-secondary uppercase">Email *</label>
                      <input type="email" className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-secondary uppercase">Website</label>
                      <input type="text" className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all" />
                   </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="save-info" className="accent-primary" />
                  <label htmlFor="save-info" className="text-[10px] font-medium text-muted">Save my name, email, and website in this browser for the next time I comment.</label>
                </div>

                <button className="bg-primary hover:bg-secondary text-white px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all shadow-md">
                   Post Comment
                </button>
              </form>
            </div>

          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-1/3 space-y-12">
             {/* Latest Posts */}
             <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-8 pb-2 border-b-2 border-primary w-fit">Latest Post</h3>
              <div className="space-y-6">
                {RECENT_POSTS.map((p) => (
                  <div key={p.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-bg-gray overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center gap-1">
                      <h4 className="text-[11px] font-black text-secondary uppercase leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2">
                        {p.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[9px] font-bold text-muted uppercase">
                        <span>{p.date}</span>
                        <span className="border-l border-border pl-2">— {p.comments} Comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-8 pb-2 border-b-2 border-primary w-fit">Blog Categories</h3>
              <ul className="space-y-4">
                {["Marketplace", "Other", "Uncategorized"].map((cat) => (
                  <li key={cat}>
                    <button className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-tighter hover:text-primary transition-colors">
                      <div className="w-2 h-2 rounded-full border border-border"></div> {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags Area */}
            <div>
               <h3 className="text-sm font-black text-secondary uppercase tracking-wider mb-8 pb-2 border-b-2 border-primary w-fit">Tags</h3>
               <div className="flex flex-wrap gap-2">
                {["blog", "business", "news", "photo"].map((tag) => (
                  <button key={tag} className="px-4 py-2 bg-bg-gray text-muted text-[10px] font-bold uppercase transition-all hover:bg-secondary hover:text-white">
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
