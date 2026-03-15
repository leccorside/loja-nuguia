"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  PencilIcon
} from "@heroicons/react/24/outline";

interface Location {
  id: number;
  name: string;
  address: string;
  isDefault: boolean;
  isPublished: boolean;
  flag?: string;
}

const locationsData: Location[] = [
  { id: 1, name: "USA", address: "13th Street, 47 W 13th St, New York, USA", isDefault: false, isPublished: true, flag: "🇺🇸" },
  { id: 2, name: "Default Location", address: "Default Address", isDefault: true, isPublished: true, flag: "🌐" },
];

export default function LocationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Select Status");
  const [locations, setLocations] = useState<Location[]>(locationsData);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleDefault = (id: number) => {
    setLocations(prev => prev.map(loc => ({
      ...loc,
      isDefault: loc.id === id ? !loc.isDefault : false // Only one can be default? Or just toggle? Design shows one.
    })));
  };

  const togglePublished = (id: number) => {
    setLocations(prev => prev.map(loc => loc.id === id ? { ...loc, isPublished: !loc.isPublished } : loc));
  };

  const filteredLocations = locations.filter(loc => {
    const matchesSearch = loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         loc.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10">
      {/* Header Area */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex items-center justify-between">
        <h1 className="text-sm font-black text-gray-800 uppercase tracking-widest">Locations</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm transition-all shadow-lg shadow-green-100 uppercase tracking-widest">
          <PlusIcon className="h-4 w-4" />
          Add Location
        </button>
      </div>

      {/* Filters Card */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 relative w-full">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-400 font-medium"
            />
          </div>
          <div className="relative group w-full sm:w-48">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs font-bold text-gray-500 focus:ring-1 focus:ring-green-500 outline-none appearance-none transition-all cursor-pointer"
            >
              <option>Select Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none group-hover:text-green-500" />
          </div>
          <button className="flex items-center justify-center gap-2 px-8 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 text-[11px] font-black rounded-sm transition-colors uppercase tracking-widest shrink-0 w-full sm:w-auto">
            <MagnifyingGlassIcon className="h-4 w-4" />
            Search
          </button>
        </div>

        {/* Locations Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider w-16 text-center">S/L</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider">Name</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider">Address</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider text-center">Default</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider text-center">Published</th>
                <th className="px-4 py-4 text-[11px] font-black text-gray-800 uppercase tracking-wider w-24 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLocations.map((loc, i) => (
                <tr key={loc.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-4 text-[11px] font-bold text-gray-500 text-center">{i + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-base">{loc.flag}</span>
                       <span className="text-[11px] font-black text-gray-800">{loc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[11px] font-bold text-gray-400 underline decoration-gray-100 underline-offset-4 cursor-default">{loc.address}</span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => toggleDefault(loc.id)}
                      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none ${loc.isDefault ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${loc.isDefault ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button 
                      onClick={() => togglePublished(loc.id)}
                      className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none ${loc.isPublished ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                      <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${loc.isPublished ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                    </button>
                  </td>
                  <td className="px-4 py-4 text-center relative action-menu-container">
                    <button 
                      onClick={() => setOpenMenuId(openMenuId === loc.id ? null : loc.id)}
                      className="p-1 hover:bg-gray-100 rounded-sm text-gray-400 hover:text-gray-800 transition-colors"
                    >
                      <EllipsisVerticalIcon className="h-5 w-5" />
                    </button>

                    {openMenuId === loc.id && (
                      <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 w-32 bg-white rounded-md shadow-2xl z-10 py-1.5 animate-in slide-in-from-right-2 duration-200 border border-gray-50/50">
                        <Link 
                          href={`/admin/stocks/locations/${loc.id}/edit`}
                          className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-colors group text-left"
                        >
                          <PencilIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
                          Edit
                        </Link>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-50">
           <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Showing 1-{filteredLocations.length} of {locations.length} results</p>
        </div>
      </div>
    </div>
  );
}
