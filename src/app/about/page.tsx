import Image from "next/image";
import Link from "next/link";
import { 
  HomeIcon, 
  ChevronRightIcon, 
  RocketLaunchIcon, 
  CreditCardIcon, 
  ChatBubbleBottomCenterTextIcon 
} from "@heroicons/react/24/outline";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Page Header (Breadcrumbs) */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">About Page</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">About Page</span>
          </nav>
        </div>
      </section>

      {/* 2. Our Story Section */}
      <section className="container-custom py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Story Image */}
          <div className="relative aspect-[4/3] shadow-2xl overflow-hidden rounded-sm group">
            <Image 
              src="/about_story_image_1773528389008.png" 
              alt="Our Story" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Story Content */}
          <div className="space-y-10">
            <h2 className="text-4xl font-black text-secondary uppercase tracking-tight">Our Story</h2>
            
            <div className="space-y-6 text-sm text-muted leading-relaxed font-medium italic">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
                dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
                culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Testimonial/Quote */}
            <div className="relative pl-12 pt-4">
              <span className="absolute left-0 top-0 text-7xl font-serif text-primary opacity-20 transform -translate-y-4">
                "
              </span>
              <p className="text-xl font-black text-secondary leading-tight tracking-tight uppercase">
                Create stunning images with as much or as little control as you like thanks to a choice of Basic and Creative modes.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-border"></div>
                <div>
                  <h4 className="text-[10px] font-black text-secondary uppercase tracking-[0.2em]">Sean Morrison</h4>
                  <p className="text-[9px] font-bold text-muted uppercase tracking-widest mt-1">Photographer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="bg-bg-gray py-24">
        <div className="container-custom">
          <h2 className="text-3xl font-black text-secondary uppercase tracking-tight mb-16">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-12 text-left shadow-sm hover:shadow-xl transition-all duration-300 group border-b-2 border-transparent hover:border-primary">
              <div className="mb-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                <RocketLaunchIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-black text-secondary uppercase tracking-tighter mb-4">Free Delivery</h3>
              <p className="text-xs text-muted leading-relaxed font-medium italic">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-12 text-left shadow-sm hover:shadow-xl transition-all duration-300 group border-b-2 border-transparent hover:border-primary">
              <div className="mb-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                <CreditCardIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-black text-secondary uppercase tracking-tighter mb-4">Secure Payment</h3>
              <p className="text-xs text-muted leading-relaxed font-medium italic">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-12 text-left shadow-sm hover:shadow-xl transition-all duration-300 group border-b-2 border-transparent hover:border-primary">
              <div className="mb-8 transform group-hover:-translate-y-2 transition-transform duration-300">
                <ChatBubbleBottomCenterTextIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-black text-secondary uppercase tracking-tighter mb-4">24/7 Support</h3>
              <p className="text-xs text-muted leading-relaxed font-medium italic">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
