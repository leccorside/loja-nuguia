"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  MagnifyingGlassIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  PlusIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  XMarkIcon as XIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

const mockCustomers = [
  { 
    id: 1, name: "Jhon", email: "wemaxsharif@gmail.com", phone: "+8801743333169", banned: false,
    cpf: "123.456.789-00", rg: "12.345.678-9",
    address: { cep: "01001-000", street: "Praça da Sé", number: "123", neighborhood: "Sé", city: "São Paulo", state: "SP" }
  },
  { 
    id: 2, name: "Jorden Castillo", email: "pomowageg@mailinator.com", phone: "+1(178)3242685", banned: false,
    cpf: "234.567.890-11", rg: "23.456.789-0",
    address: { cep: "20010-000", street: "Rua Primeiro de Março", number: "456", neighborhood: "Centro", city: "Rio de Janeiro", state: "RJ" }
  },
  { 
    id: 3, name: "mbgindo", email: "ficreativement@gmail.com", phone: "+6285809273020", banned: false,
    cpf: "345.678.901-22", rg: "34.567.890-1",
    address: { cep: "30110-000", street: "Avenida Afonso Pena", number: "789", neighborhood: "Centro", city: "Belo Horizonte", state: "MG" }
  },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [customers, setCustomers] = useState(mockCustomers);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewCustomer, setViewCustomer] = useState<any | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "Select Status" || 
                         (statusFilter === "Banned" && customer.banned) || 
                         (statusFilter === "Active" && !customer.banned);

    return matchesSearch && matchesStatus;
  });

  const toggleBanned = (id: number) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, banned: !c.banned } : c));
  };

  const handleDelete = () => {
    if (deleteId) {
      setCustomers(prev => prev.filter(c => c.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm">
        <h1 className="text-[11px] font-black text-gray-800 uppercase tracking-[2px]">Customers</h1>
        <Link 
          href="/admin/customers/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[10px] font-black rounded-sm transition-colors shadow-lg shadow-green-100 uppercase tracking-widest"
        >
          <PlusIcon className="h-4 w-4" />
          Add Customer
        </Link>
      </div>

      {/* Filter Area */}
      <div className="bg-white p-4 rounded-sm border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 font-medium"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-[11px] font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none min-w-[140px]"
          >
            <option>Select Status</option>
            <option>Active</option>
            <option>Banned</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-bold rounded-sm transition-colors uppercase tracking-widest shrink-0 shadow-lg shadow-green-100">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest w-12 text-center">S/L</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Name</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Email</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest">Phone</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest text-center w-24">Banned</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 uppercase tracking-widest text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, i) => (
                  <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-4 py-4 text-[11px] font-bold text-gray-500 text-center">{i + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center translate-y-0.5">
                          <img src={`https://i.pravatar.cc/100?u=cust${customer.id}`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] font-black text-gray-800">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[11px] font-bold text-gray-500">{customer.email}</td>
                    <td className="px-4 py-4 text-[11px] font-bold text-gray-500">{customer.phone}</td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => toggleBanned(customer.id)}
                        className={`w-8 h-4 rounded-full relative transition-colors ${customer.banned ? "bg-red-500" : "bg-gray-200"}`}
                      >
                        <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${customer.banned ? "left-4.5" : "left-0.5"}`}></span>
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === customer.id ? null : customer.id)}
                        className="p-1.5 hover:bg-gray-100 rounded-sm text-gray-400 hover:text-green-500 transition-colors"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>

                      {openMenuId === customer.id && (
                        <div 
                          ref={menuRef}
                          className="absolute right-full mr-2 top-0 w-40 bg-white border border-gray-100 rounded-sm shadow-xl z-50 animate-in fade-in slide-in-from-right-2 duration-200"
                        >
                          <div className="p-1.5 space-y-0.5">
                            <Link 
                              href={`/admin/customers/${customer.id}/edit`}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 hover:bg-gray-50 hover:text-green-500 rounded-sm transition-colors group/item"
                            >
                              <PencilSquareIcon className="h-4 w-4 text-gray-400 group-hover/item:text-green-500" />
                              Edit
                            </Link>
                            <button 
                              onClick={() => {
                                setViewCustomer(customer);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-500 rounded-sm transition-colors group/item"
                            >
                              <EyeIcon className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500" />
                              View Details
                            </button>
                            <div className="h-px bg-gray-50 my-1"></div>
                            <button 
                              onClick={() => {
                                setDeleteId(customer.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 rounded-sm transition-colors group/item"
                            >
                              <TrashIcon className="h-4 w-4 text-red-500" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                   <td colSpan={6} className="px-4 py-20 text-center">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">No customers found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ... Pagination ... */}
      </div>

      {/* Delete Confirmation Modal ... */}

      {/* View Details Modal */}
      {viewCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setViewCustomer(null)}></div>
          <div className="bg-white rounded-md shadow-2xl w-full max-w-2xl relative z-10 animate-in slide-in-from-bottom-4 duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                   <EyeIcon className="h-5 w-5" />
                 </div>
                 <h3 className="text-sm font-black text-gray-800 tracking-tight uppercase">Customer Details</h3>
              </div>
              <button onClick={() => setViewCustomer(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-green-500 uppercase tracking-[2px] border-b border-green-50 pb-2">Basic Information</h4>
                  <div className="space-y-4">
                    <DetailItem label="Full Name" value={viewCustomer.name} />
                    <DetailItem label="Email Address" value={viewCustomer.email} />
                    <DetailItem label="Phone Number" value={viewCustomer.phone || "Not provided"} />
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem label="CPF" value={viewCustomer.cpf || "---"} />
                      <DetailItem label="RG" value={viewCustomer.rg || "---"} />
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[2px] border-b border-blue-50 pb-2">Delivery Information</h4>
                  <div className="space-y-4">
                    {viewCustomer.address ? (
                      <>
                        <DetailItem label="CEP" value={viewCustomer.address.cep} />
                        <DetailItem label="Street" value={`${viewCustomer.address.street}, ${viewCustomer.address.number}`} />
                        <DetailItem label="Neighborhood" value={viewCustomer.address.neighborhood} />
                        <DetailItem label="City / State" value={`${viewCustomer.address.city} - ${viewCustomer.address.state}`} />
                      </>
                    ) : (
                      <p className="text-[11px] font-medium text-gray-400 italic">No address information available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex justify-end">
              <button 
                onClick={() => setViewCustomer(null)}
                className="px-6 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 text-[10px] font-black rounded-sm uppercase tracking-widest transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 animate-fade-in" onClick={() => setDeleteId(null)}></div>
          <div className="bg-white rounded-md shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-black text-gray-800 tracking-tight">Delete Confirmation</h3>
              <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-2">
                <XCircleIcon className="h-8 w-8" />
              </div>
              <p className="text-sm font-black text-gray-800 tracking-tight">Are you sure to delete this?</p>
              <p className="text-xs font-bold text-gray-400 leading-relaxed">
                All data related to this may get deleted.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-6 bg-gray-50/30 flex items-center justify-center gap-3">
              <button 
                onClick={handleDelete}
                className="px-8 py-2.5 bg-[#e44626] hover:bg-red-700 text-white text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors shadow-lg shadow-red-100"
              >
                Proceed
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                className="px-8 py-2.5 bg-white border border-gray-100 hover:bg-gray-50 text-gray-600 text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-[11px] font-bold text-gray-800 break-all">{value}</p>
    </div>
  );
}
