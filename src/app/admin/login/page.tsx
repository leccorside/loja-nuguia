"use client";

import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeSlashIcon, LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-sm border border-gray-200 shadow-2xl p-8 space-y-8">
        
        {/* Branding */}
        <div className="text-center space-y-2">
          <Link href="/admin" className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">G</div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">Grostore</span>
          </Link>
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Admin Login</h1>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Acesso Restrito ao Painel</p>
        </div>

        {/* Login Form */}
        <form className="space-y-6">
          <div className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input 
                  type="email" 
                  placeholder="admin@grostore.com"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-sm text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-300" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-100 rounded-sm text-sm focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all outline-none text-gray-700"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 border-gray-200 rounded text-green-600 focus:ring-green-500 cursor-pointer" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-green-600 transition-colors">Remember Me</span>
            </label>
            <Link href="#" className="text-[10px] font-bold text-green-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Forgot Password?</Link>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-4 bg-green-600 text-white text-[11px] font-black uppercase tracking-[2px] rounded-sm hover:bg-green-700 transition-all shadow-xl shadow-green-600/20 active:scale-[0.98]"
          >
            Login to Account
          </button>
        </form>

        {/* Footer Info */}
        <div className="pt-6 text-center">
           <p className="text-[10px] font-medium text-gray-400">
             © 2026 Grostore. Built with ❤️ for Admins.
           </p>
        </div>
      </div>
    </div>
  );
}
