"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "billing" | "shipping";
}

export default function AddressModal({ isOpen, onClose, type }: AddressModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    county: "",
    postcode: "",
    phone: "",
    email: ""
  });

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-secondary/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-white z-10">
          <h2 className="text-xl font-black text-secondary uppercase tracking-tight">
            {type === "billing" ? "Billing address" : "Shipping address"}
          </h2>
          <button 
            onClick={onClose}
            className="text-muted hover:text-primary transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form className="p-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">
                First name <span className="text-primary">*</span>
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">
                Last name <span className="text-primary">*</span>
              </label>
              <input 
                type="text" 
                required
                className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              Company name (optional)
            </label>
            <input 
              type="text" 
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              Country / Region <span className="text-primary">*</span>
            </label>
            <select 
              required
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="">Select a country / region...</option>
              <option value="BR">Brazil</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-secondary">
                Street address <span className="text-primary">*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="House number and street name"
                className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
            <input 
              type="text" 
              placeholder="Apartment, suite, unit, etc. (optional)"
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              Town / City <span className="text-primary">*</span>
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              County (optional)
            </label>
            <input 
              type="text" 
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              Postcode <span className="text-primary">*</span>
            </label>
            <input 
              type="text" 
              required
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              Phone <span className="text-primary">*</span>
            </label>
            <input 
              type="tel" 
              required
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              Email address <span className="text-primary">*</span>
            </label>
            <input 
              type="email" 
              required
              defaultValue="leccorside@gmail.com"
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all text-muted"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="bg-primary hover:bg-secondary text-white px-10 py-4 text-xs font-black uppercase tracking-widest transition-all shadow-md w-full md:w-auto"
            >
              Save address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
