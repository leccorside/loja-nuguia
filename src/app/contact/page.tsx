"use client";

import Image from "next/image";
import Link from "next/link";
import { 
  HomeIcon, 
  ChevronRightIcon,
  MapIcon,
  EnvelopeIcon,
  PhoneIcon,
  ClockIcon
} from "@heroicons/react/24/outline";

const TEAM = [
  {
    name: "John Doe",
    role: "Senior Marketing Manager",
    phone: "+ 844 123 444 77 88",
    email: "contact@example.com",
    image: "/team-john.png"
  },
  {
    name: "William Smith",
    role: "Recruiting Manager",
    phone: "+ 844 123 444 77 88",
    email: "contact@example.com",
    image: "/team-william.png"
  },
  {
    name: "Emma Stone",
    role: "Human Resource",
    phone: "+ 844 123 444 77 88",
    email: "contact@example.com",
    image: "/team-emma.png"
  }
];

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header (Breadcrumbs) */}
      <section className="bg-secondary py-16 text-center">
        <div className="container-custom">
          <h1 className="text-5xl font-black text-white uppercase tracking-tight mb-4">Contact</h1>
          <nav className="flex justify-center items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#999]">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
               <HomeIcon className="h-3 w-3" /> Home
            </Link>
            <ChevronRightIcon className="h-2 w-2" />
            <span className="text-white">Contact</span>
          </nav>
        </div>
      </section>

      {/* 2. Map & Main Info Section */}
      <section className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">Get In Touch</span>
            <h2 className="text-4xl font-black text-secondary uppercase leading-[1.1] tracking-tighter">
              Visit one of our agency locations or contact us today
            </h2>
            
            <div className="space-y-6">
              <h3 className="text-sm font-black text-secondary uppercase">Head Office</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <MapIcon className="h-5 w-5 text-muted mt-0.5 " />
                  <span className="text-xs font-medium text-muted">56 Glassford Street Glasgow G1 1UL New York</span>
                </li>
                <li className="flex items-center gap-4">
                  <EnvelopeIcon className="h-5 w-5 text-muted" />
                  <span className="text-xs font-medium text-muted">contact@example.com</span>
                </li>
                <li className="flex items-center gap-4">
                  <PhoneIcon className="h-5 w-5 text-muted" />
                  <span className="text-xs font-medium text-muted">+ 844 123 456 78</span>
                </li>
                <li className="flex items-center gap-4">
                  <ClockIcon className="h-5 w-5 text-muted" />
                  <span className="text-xs font-medium text-muted">Monday to Saturday: 9:00am to 16.pm</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Map Placeholder/Image */}
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl border border-border">
             <Image 
              src="/contact-map.png" 
              alt="Office Location Map" 
              fill 
              className="object-cover" 
            />
            {/* Interactive Map Overlay Concept */}
            <div className="absolute top-4 left-4 bg-white p-3 shadow-lg rounded-sm max-w-[200px]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-[10px] font-black text-secondary uppercase">London Eye</h4>
                  <p className="text-[8px] text-muted leading-tight">Riverside Building, County Hall, London SE1 7PB</p>
                </div>
                <div className="flex gap-1">
                   <div className="w-5 h-5 bg-blue-500 rounded-sm flex items-center justify-center text-white text-[8px] font-bold">L</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[8px] font-bold text-secondary">
                <span className="text-orange-400">4,5</span> ★ (198.131)
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Form & Team Section */}
      <section className="bg-bg-gray/50 py-20">
        <div className="container-custom">
          <div className="bg-white p-10 md:p-16 shadow-xl border border-border grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <span className="text-[10px] font-bold text-muted uppercase tracking-[0.3em]">Leave a message</span>
                <h2 className="text-3xl font-black text-secondary uppercase tracking-tighter mt-2">We love to hear from you</h2>
              </div>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="your Name" 
                    className="w-full bg-bg-gray border border-border p-4 text-xs font-medium focus:border-primary outline-none transition-all"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full bg-bg-gray border border-border p-4 text-xs font-medium focus:border-primary outline-none transition-all"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  className="w-full bg-bg-gray border border-border p-4 text-xs font-medium focus:border-primary outline-none transition-all"
                />
                <textarea 
                  placeholder="Message" 
                  rows={6}
                  className="w-full bg-bg-gray border border-border p-4 text-xs font-medium focus:border-primary outline-none transition-all resize-none"
                ></textarea>
                <button 
                  className="bg-primary hover:bg-secondary text-white px-10 py-4 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Right: Team Credits */}
            <div className="space-y-10">
              {TEAM.map((person) => (
                <div key={person.name} className="flex gap-6 items-center">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-border shadow-md shrink-0">
                    <Image src={person.image} alt={person.name} fill className="object-cover" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-secondary">{person.name}</h4>
                    <p className="text-[10px] font-bold text-muted uppercase tracking-tighter">{person.role}</p>
                    <div className="text-[10px] text-muted space-y-0.5 pt-1">
                      <p>Phone: {person.phone}</p>
                      <p>Email: {person.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
