"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="text-sm font-medium text-muted leading-relaxed">
        <p className="mb-6">
          Hello <span className="text-secondary font-black">Johnathan Rios</span> (not <span className="text-secondary font-black">Johnathan Rios</span>? <Link href="/logout" className="text-primary hover:text-secondary underline underline-offset-4">Log out</Link>)
        </p>
        
        <p>
          From your account dashboard you can view your{" "}
          <Link href="/account/orders" className="text-primary font-bold hover:text-secondary transition-colors">recent orders</Link>, 
          manage your{" "}
          <Link href="/account/address" className="text-primary font-bold hover:text-secondary transition-colors">shipping and billing addresses</Link>, 
          and{" "}
          <Link href="/account/details" className="text-primary font-bold hover:text-secondary transition-colors">edit your password and account details</Link>.
        </p>
      </div>

      <div className="pt-6">
        <button className="bg-black hover:bg-secondary text-white px-10 py-5 text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95">
          Go to Vendor Dashboard
        </button>
      </div>
    </div>
  );
}
