"use client";

import { useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import AddressModal from "@/components/AddressModal";

export default function AddressesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"billing" | "shipping">("billing");

  const openModal = (type: "billing" | "shipping") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <p className="text-sm font-medium text-muted mb-10 italic">
        The following addresses will be used on the checkout page by default.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Billing Address */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-xl font-black text-secondary uppercase tracking-tight">Billing address</h2>
            <button 
              onClick={() => openModal("billing")}
              className="text-primary hover:text-secondary transition-colors"
            >
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted italic">
            You have not set up this type of address yet.
          </p>
        </div>

        {/* Shipping Address */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-xl font-black text-secondary uppercase tracking-tight">Shipping address</h2>
            <button 
              onClick={() => openModal("shipping")}
              className="text-primary hover:text-secondary transition-colors"
            >
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          </div>
          <p className="text-sm text-muted italic">
            You have not set up this type of address yet.
          </p>
        </div>
      </div>

      <AddressModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type={modalType} 
      />
    </div>
  );
}
