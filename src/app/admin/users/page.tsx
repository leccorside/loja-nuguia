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
  XCircleIcon,
  UsersIcon
} from "@heroicons/react/24/outline";

const mockUsers = [
  { 
    id: 1, name: "Admin User", email: "admin@grostore.com", phone: "+5511999999999", role: "SuperAdmin", banned: false,
    cpf: "111.111.111-11", rg: "11.111.111-1",
    address: { cep: "01001-000", street: "Praça da Sé", number: "1", neighborhood: "Sé", city: "São Paulo", state: "SP" }
  },
  { 
    id: 2, name: "Editor Staff", email: "editor@grostore.com", phone: "+5511888888888", role: "Vendedor", banned: false,
    cpf: "222.222.222-22", rg: "22.222.222-2",
    address: { cep: "20010-000", street: "Rua Primeiro de Março", number: "2", neighborhood: "Centro", city: "Rio de Janeiro", state: "RJ" }
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("Select Role");
  const [users, setUsers] = useState(mockUsers);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewUser, setViewUser] = useState<any | null>(null);
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

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "Select Role" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const toggleBanned = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, banned: !u.banned } : u));
  };

  const handleDelete = () => {
    if (deleteId) {
      setUsers(prev => prev.filter(u => u.id !== deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm transition-colors">
        <h1 className="text-[11px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-[2px]">Users</h1>
        <Link 
          href="/admin/users/add"
          className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-[10px] font-black rounded-sm transition-colors shadow-lg shadow-green-100 dark:shadow-none uppercase tracking-widest"
        >
          <PlusIcon className="h-4 w-4" />
          Add User
        </Link>
      </div>

      {/* Filter Area */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 transition-colors">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or phone" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-slate-500 font-medium text-gray-700 dark:text-slate-200"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-[11px] font-bold text-gray-500 dark:text-slate-400 focus:ring-1 focus:ring-green-500 outline-none min-w-[140px]"
          >
            <option>Select Role</option>
            <option>SuperAdmin</option>
            <option>Vendedor</option>
          </select>
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 border border-green-500 text-white text-[11px] font-bold rounded-sm transition-colors uppercase tracking-widest shrink-0 shadow-lg shadow-green-100 dark:shadow-none">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-800">
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest w-12 text-center">S/L</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Name</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Email</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest">Role</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center w-24">Banned</th>
                <th className="px-4 py-4 text-[10px] font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest text-center w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, i) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800 transition-colors group">
                    <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400 text-center">{i + 1}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800 flex items-center justify-center translate-y-0.5 transition-colors">
                          <img src={`https://i.pravatar.cc/100?u=user${user.id}`} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] font-black text-gray-800 dark:text-slate-100">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400">{user.email}</td>
                    <td className="px-4 py-4 text-[11px] font-bold text-gray-500 dark:text-slate-400">{user.role}</td>
                    <td className="px-4 py-4 text-center">
                      <button 
                        onClick={() => toggleBanned(user.id)}
                        className={`w-8 h-4 rounded-full relative transition-colors ${user.banned ? "bg-red-500" : "bg-gray-200 dark:bg-slate-700"}`}
                      >
                        <span className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${user.banned ? "left-4.5" : "left-0.5"}`}></span>
                      </button>
                    </td>
                    <td className="px-4 py-4 text-center relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-sm text-gray-400 dark:text-slate-500 hover:text-green-500 transition-colors"
                      >
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>

                      {openMenuId === user.id && (
                        <div 
                          ref={menuRef}
                          className="absolute right-full mr-2 top-0 w-40 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-sm shadow-xl z-50 animate-in fade-in slide-in-from-right-2 duration-200"
                        >
                          <div className="p-1.5 space-y-0.5">
                            <Link 
                              href={`/admin/users/${user.id}/edit`}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-green-500 rounded-sm transition-colors group/item"
                            >
                              <PencilSquareIcon className="h-4 w-4 text-gray-400 group-hover/item:text-green-500" />
                              Edit
                            </Link>
                            <button 
                              onClick={() => {
                                setViewUser(user);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-blue-500 rounded-sm transition-colors group/item"
                            >
                              <EyeIcon className="h-4 w-4 text-gray-400 dark:text-slate-500 group-hover/item:text-blue-500" />
                              View Details
                            </button>
                            <div className="h-px bg-gray-50 dark:bg-slate-800 my-1"></div>
                            <button 
                              onClick={() => {
                                setDeleteId(user.id);
                                setOpenMenuId(null);
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-sm transition-colors group/item"
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
                    <p className="text-[11px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Details Modal */}
      {viewUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={() => setViewUser(null)}></div>
          <div className="bg-white dark:bg-slate-900 rounded-md shadow-2xl w-full max-w-2xl relative z-10 animate-in slide-in-from-bottom-4 duration-300 border border-gray-100 dark:border-slate-800 transition-colors">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 transition-colors">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
                   <UsersIcon className="h-5 w-5" />
                 </div>
                 <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight uppercase">User Details</h3>
              </div>
              <button onClick={() => setViewUser(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-green-500 uppercase tracking-[2px] border-b border-green-50 dark:border-green-900/20 pb-2">Basic Information</h4>
                  <div className="space-y-4">
                    <DetailItem label="Full Name" value={viewUser.name} />
                    <DetailItem label="Email Address" value={viewUser.email} />
                    <DetailItem label="Phone Number" value={viewUser.phone || "Not provided"} />
                    <DetailItem label="Role" value={viewUser.role} />
                    <div className="grid grid-cols-2 gap-4">
                      <DetailItem label="CPF" value={viewUser.cpf || "---"} />
                      <DetailItem label="RG" value={viewUser.rg || "---"} />
                    </div>
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[2px] border-b border-blue-50 dark:border-blue-900/20 pb-2">Address Information</h4>
                  <div className="space-y-4">
                    {viewUser.address ? (
                      <>
                        <DetailItem label="CEP" value={viewUser.address.cep} />
                        <DetailItem label="Street" value={`${viewUser.address.street}, ${viewUser.address.number}`} />
                        <DetailItem label="Neighborhood" value={viewUser.address.neighborhood} />
                        <DetailItem label="City / State" value={`${viewUser.address.city} - ${viewUser.address.state}`} />
                      </>
                    ) : (
                      <p className="text-[11px] font-medium text-gray-400 italic">No address information available.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50/30 dark:bg-slate-800/30 border-t border-gray-100 dark:border-slate-800 flex justify-end transition-colors">
              <button 
                onClick={() => setViewUser(null)}
                className="px-6 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 text-[10px] font-black rounded-sm uppercase tracking-widest transition-colors shadow-sm"
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
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 animate-fade-in" onClick={() => setDeleteId(null)}></div>
          <div className="bg-white dark:bg-slate-900 rounded-md shadow-2xl w-full max-w-md relative z-10 animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-slate-800 transition-colors">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-800 transition-colors">
              <h3 className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight">Delete Confirmation</h3>
              <button onClick={() => setDeleteId(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors">
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 flex flex-col items-center text-center space-y-4 transition-colors">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mb-2">
                <XCircleIcon className="h-8 w-8" />
              </div>
              <p className="text-sm font-black text-gray-800 dark:text-gray-100 tracking-tight">Are you sure to delete this user?</p>
              <p className="text-xs font-bold text-gray-400 dark:text-slate-500 leading-relaxed">
                All data related to this user may get deleted permanently.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-6 bg-gray-50/30 dark:bg-slate-800/30 border-t border-gray-100 dark:border-slate-800 flex items-center justify-center gap-3 transition-colors">
              <button 
                onClick={handleDelete}
                className="px-8 py-2.5 bg-[#e44626] hover:bg-red-700 text-white text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors shadow-lg shadow-red-100"
              >
                Proceed
              </button>
              <button 
                onClick={() => setDeleteId(null)}
                className="px-8 py-2.5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-400 text-[11px] font-black rounded-sm uppercase tracking-widest transition-colors"
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
      <p className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
      <p className="text-[11px] font-bold text-gray-800 dark:text-slate-200 break-all">{value}</p>
    </div>
  );
}
