"use client";

import { useState } from "react";
import { ChevronLeftIcon, CheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface AddressData {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export default function AddUserPage() {
  const [addressData, setAddressData] = useState<AddressData>({
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: ""
  });
  const [loadingCep, setLoadingCep] = useState(false);

  const fetchAddress = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setAddressData(prev => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setLoadingCep(false);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAddressData(prev => ({ ...prev, cep: value }));
    fetchAddress(value);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="bg-white p-4 sm:p-6 rounded-sm border border-gray-100 shadow-sm flex items-center gap-4">
        <Link 
          href="/admin/users" 
          className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-green-500"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-black text-gray-800 tracking-tight">Add New User</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Information Section */}
          <section className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Type user name" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  placeholder="Type user email" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Phone
                </label>
                <input 
                  type="text" 
                  placeholder="Type user phone" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  CPF <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Type CPF" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  RG <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Type RG" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>
            </div>
          </section>

          {/* Delivery Information Section */}
          <section className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4">
              Informações de Entrega
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  CEP {loadingCep && <span className="ml-2 text-green-500 animate-pulse text-[8px]">Fetching...</span>}
                </label>
                <input 
                  type="text" 
                  value={addressData.cep}
                  onChange={handleCepChange}
                  placeholder="Digite o CEP" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Endereço</label>
                <input 
                  type="text" 
                  value={addressData.street}
                  onChange={(e) => setAddressData(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="Digite o endereço" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número</label>
                <input 
                  type="text" 
                  value={addressData.number}
                  onChange={(e) => setAddressData(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="Digite o número" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bairro</label>
                <input 
                  type="text" 
                  value={addressData.neighborhood}
                  onChange={(e) => setAddressData(prev => ({ ...prev, neighborhood: e.target.value }))}
                  placeholder="Digite o bairro" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cidade</label>
                <input 
                  type="text" 
                  value={addressData.city}
                  onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Digite a cidade" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado</label>
                <input 
                  type="text" 
                  value={addressData.state}
                  onChange={(e) => setAddressData(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="Digite o estado" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>
            </div>
          </section>

          {/* Authentication Section */}
          <section className="bg-white p-6 rounded-sm border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xs font-black text-gray-800 uppercase tracking-widest border-b border-gray-50 pb-4 flex items-center gap-2">
              <KeyIcon className="h-4 w-4 text-green-500" />
              Authentication
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Role <span className="text-red-500">*</span>
                </label>
                <select 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all font-medium text-gray-600"
                >
                  <option value="">Select Role</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                  <option value="Vendedor">Vendedor</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Senha <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  placeholder="Digite a senha" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Confirmar Senha <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  placeholder="Confirme a senha" 
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 font-medium"
                />
              </div>
            </div>
          </section>

          {/* Action Button */}
          <div className="flex justify-start">
            <button className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm transition-all uppercase tracking-widest shadow-lg shadow-green-100">
              <CheckIcon className="h-4 w-4" />
              Save User
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-sm border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
              <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest">
                User Information
              </h3>
            </div>
            <div className="p-6">
              <div className="relative pl-8 space-y-10">
                {/* Stepper Line */}
                <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gray-100"></div>

                {/* Step 1 */}
                <div className="relative flex items-center group">
                  <div className="absolute -left-8 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-green-500 uppercase tracking-widest">
                      Basic Information
                    </h4>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center group">
                  <div className="absolute -left-8 w-7 h-7 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
                      Delivery Information
                    </h4>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center group">
                  <div className="absolute -left-8 w-7 h-7 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm transition-transform group-hover:scale-110">
                    <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-300 uppercase tracking-widest">
                      Authentication
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
