import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function SuccessPage() {
  return (
    <div className="container-custom section-padding min-h-[60vh] flex flex-col items-center justify-center text-center">
      <CheckCircleIcon className="h-20 w-20 text-accent mb-6" />
      <h1 className="text-4xl font-bold text-secondary uppercase tracking-tight mb-4">Order Confirmed!</h1>
      <p className="text-muted max-w-md mb-10">
        Thank you for your purchase! We've received your order and are processing it. 
        You will receive a confirmation email shortly with your order details.
      </p>
      
      <div className="bg-bg-gray p-8 rounded-lg w-full max-w-md border border-border mb-10">
        <div className="flex justify-between mb-2">
          <span className="text-xs font-bold uppercase text-muted">Order Number</span>
          <span className="text-xs font-bold text-secondary">#MP-99827AC</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-xs font-bold uppercase text-muted">Status</span>
          <span className="text-xs font-bold text-accent uppercase">Payment Confirmed</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs font-bold uppercase text-muted">Date</span>
          <span className="text-xs font-bold text-secondary">{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/" 
          className="bg-secondary text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-accent transition-all"
        >
          Back to Home
        </Link>
        <Link 
          href="/shop" 
          className="border border-secondary text-secondary px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
