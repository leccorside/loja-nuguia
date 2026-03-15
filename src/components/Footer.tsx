import Link from "next/link";
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  PhoneIcon 
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-border pt-16">
      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Location */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-6">Location</h4>
            <p className="text-sm text-muted leading-relaxed">
              71 Pilgrim Avenue Chevy Chase,<br />
              MD 20815, USA
            </p>
            <div className="flex gap-2 mt-6">
              <div className="w-8 h-8 bg-[#1DA1F2] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </div>
              <div className="w-8 h-8 bg-[#3B5998] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.691V11.11h3.129V8.56c0-3.108 1.898-4.799 4.67-4.799 1.327 0 2.466.099 2.798.143v3.242l-1.918.001c-1.508 0-1.801.717-1.801 1.768v2.32h3.587l-.467 3.596h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/></svg>
              </div>
              <div className="w-8 h-8 bg-[#4DE0B4] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.944 0C5.352 0 0 5.352 0 11.944c0 6.592 5.352 11.944 11.944 11.944 6.592 0 11.944-5.352 11.944-11.944C23.889 5.352 18.537 0 11.944 0zm0 21.889c-5.482 0-9.944-4.463-9.944-9.944C2 6.463 6.463 2 11.944 2c5.482 0 9.944 4.463 9.944 9.944 0 5.482-4.463 9.944-9.944 9.944z"/></svg>
              </div>
              <div className="w-8 h-8 bg-[#CD201F] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </div>
              <div className="w-8 h-8 bg-[#9146FF] flex items-center justify-center text-white cursor-pointer hover:opacity-80 transition-opacity">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>
              </div>
            </div>
          </div>

          {/* Contact Text */}
          <div className="lg:col-span-1">
             <p className="text-sm text-muted leading-relaxed mb-6">
              Have a question? Give us a call or fill out the contact form. We'd love to hear from you
            </p>
            <a href="#" className="text-sm font-bold text-accent hover:underline">Contact Us</a>
          </div>

          {/* Links: Account */}
          <div>
            <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Account</h4>
            <ul className="space-y-4 text-xs font-medium text-muted uppercase tracking-tight">
              <li><Link href="/account" className="hover:text-accent">My Account</Link></li>
              <li><Link href="/account/orders" className="hover:text-accent">Order History</Link></li>
              <li><Link href="/wishlist" className="hover:text-accent">Wish List</Link></li>
              <li><Link href="/shop" className="hover:text-accent">Specials</Link></li>
            </ul>
          </div>

          {/* Links: Services */}
          <div>
            <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Services</h4>
            <ul className="space-y-4 text-xs font-medium text-muted uppercase tracking-tight">
              <li><a href="#" className="hover:text-accent">Discount Returns</a></li>
              <li><a href="#" className="hover:text-accent">Policy</a></li>
              <li><a href="#" className="hover:text-accent">Customer Service</a></li>
              <li><a href="#" className="hover:text-accent">Term & condition</a></li>
            </ul>
          </div>

          {/* Links: Info */}
          <div>
            <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-6 pb-2 border-b border-border">Info</h4>
            <ul className="space-y-4 text-xs font-medium text-muted uppercase tracking-tight">
              <li><Link href="/about" className="hover:text-accent">About us</Link></li>
              <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
              <li><Link href="/delivery-information" className="hover:text-accent">Delivery Information</Link></li>
              <li><Link href="/contact" className="hover:text-accent">Contact us</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-8">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted font-medium">
            Copyright © 2022<span className="text-accent">ekommart</span> All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all">
            <div className="flex gap-4 items-center">
              <span className="text-[10px] font-bold text-secondary italic">VISA</span>
              <div className="flex gap-1">
                 <div className="w-6 h-4 bg-orange-400 rounded-sm"></div>
                 <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
              </div>
              <span className="text-[10px] font-bold text-blue-800 italic">PayPal</span>
              <span className="text-[10px] font-bold text-secondary uppercase">Skrill</span>
              <span className="text-[10px] font-bold text-red-600">maestro</span>
              <span className="text-[10px] font-bold text-blue-500 italic">VISA <span className="text-[8px]">Electron</span></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
