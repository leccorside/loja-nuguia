"use client";

import { useState, useEffect } from "react";
import { ChevronLeftIcon, CheckIcon, KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";

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

interface AddressData {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export default function EditUserPage() {
  const params = useParams();
  const id = Number(params.id);
  const [user, setUser] = useState<any>(null);
  const [addressData, setAddressData] = useState<AddressData>({
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: ""
  });
  const [loadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    const selected = mockUsers.find(u => u.id === id);
    if (selected) {
      setUser(selected);
      setAddressData({
        cep: selected.address?.cep || "",
        street: selected.address?.street || "",
        number: selected.address?.number || "",
        neighborhood: selected.address?.neighborhood || "",
        city: selected.address?.city || "",
        state: selected.address?.state || ""
      });
    }
  }, [id]);

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

  if (!user) {
    return <div className="p-8 text-center text-gray-500 uppercase tracking-widest font-black text-xs">Loading user data...</div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors">
        <Link 
          href="/admin/users" 
          className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-400 dark:text-slate-500 hover:text-green-500 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-black text-gray-800 dark:text-gray-100 tracking-tight transition-colors">Edit User</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Information Section */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <h2 className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest border-b border-gray-50 dark:border-slate-800 pb-4 transition-colors">
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  defaultValue={user.name}
                  placeholder="Type user name" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  defaultValue={user.email}
                  placeholder="Type user email" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  Phone
                </label>
                <input 
                  type="text" 
                  defaultValue={user.phone}
                  placeholder="Type user phone" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  CPF <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  defaultValue={user.cpf}
                  placeholder="Type CPF" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  RG <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  defaultValue={user.rg}
                  placeholder="Type RG" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Delivery Information Section */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <h2 className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest border-b border-gray-50 dark:border-slate-800 pb-4 transition-colors">
              Informações de Entrega
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  CEP {loadingCep && <span className="ml-2 text-green-500 animate-pulse text-[8px]">Fetching...</span>}
                </label>
                <input 
                  type="text" 
                  value={addressData.cep}
                  onChange={handleCepChange}
                  placeholder="Digite o CEP" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Endereço</label>
                <input 
                  type="text" 
                  value={addressData.street}
                  onChange={(e) => setAddressData(prev => ({ ...prev, street: e.target.value }))}
                  placeholder="Digite o endereço" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Número</label>
                <input 
                  type="text" 
                  value={addressData.number}
                  onChange={(e) => setAddressData(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="Digite o número" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Bairro</label>
                <input 
                  type="text" 
                  value={addressData.neighborhood}
                  onChange={(e) => setAddressData(prev => ({ ...prev, neighborhood: e.target.value }))}
                  placeholder="Digite o bairro" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Cidade</label>
                <input 
                  type="text" 
                  value={addressData.city}
                  onChange={(e) => setAddressData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Digite a cidade" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">Estado</label>
                <input 
                  type="text" 
                  value={addressData.state}
                  onChange={(e) => setAddressData(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="Digite o estado" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Authentication Section */}
          <section className="bg-white dark:bg-slate-900 p-6 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
            <h2 className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest border-b border-gray-50 dark:border-slate-800 pb-4 flex items-center gap-2 transition-colors">
              <KeyIcon className="h-4 w-4 text-green-500" />
              Authentication
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors">
              <div className="space-y-2 col-span-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  Role <span className="text-red-500">*</span>
                </label>
                <select 
                  defaultValue={user.role}
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all font-medium text-gray-600 dark:text-slate-400 transition-colors"
                >
                  <option value="" className="dark:bg-slate-900">Select Role</option>
                  <option value="SuperAdmin" className="dark:bg-slate-900">SuperAdmin</option>
                  <option value="Vendedor" className="dark:bg-slate-900">Vendedor</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  Senha (Deixe em branco para manter)
                </label>
                <input 
                  type="password" 
                  placeholder="Digite a nova senha" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 dark:text-slate-600 uppercase tracking-widest transition-colors">
                  Confirmar Nova Senha
                </label>
                <input 
                  type="password" 
                  placeholder="Confirme a nova senha" 
                  className="w-full px-4 py-2 bg-gray-50/50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-sm text-xs focus:ring-1 focus:ring-green-500 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-slate-600 font-medium text-gray-800 dark:text-gray-200 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Action Button */}
          <div className="flex justify-start">
            <button className="flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white text-[11px] font-black rounded-sm transition-all uppercase tracking-widest shadow-lg shadow-green-100 dark:shadow-none transition-all">
              <CheckIcon className="h-4 w-4" />
              Update User
            </button>
          </div>
        </div>

        {/* Sidebar Navigation Area */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-sm border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="bg-gray-50/50 dark:bg-slate-800/50 px-6 py-4 border-b border-gray-100 dark:border-slate-800 transition-colors">
              <h3 className="text-xs font-black text-gray-800 dark:text-gray-100 uppercase tracking-widest transition-colors">
                User Information
              </h3>
            </div>
            <div className="p-6">
              <div className="relative pl-8 space-y-10 font-bold">
                {/* Stepper Line */}
                <div className="absolute left-3.5 top-2 bottom-2 w-px bg-gray-100 dark:bg-slate-800 transition-colors"></div>

                {/* Step 1 */}
                <div className="relative flex items-center group transition-colors">
                  <div className="absolute -left-8 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm transition-all group-hover:scale-110">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-green-500 uppercase tracking-widest transition-colors">
                      Basic Information
                    </h4>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center group transition-colors">
                  <div className="absolute -left-8 w-7 h-7 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm transition-all group-hover:scale-110">
                    <div className="w-2 h-2 bg-gray-200 dark:bg-slate-700 rounded-full transition-colors"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-300 dark:text-slate-500 uppercase tracking-widest transition-colors">
                      Delivery Information
                    </h4>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center group transition-colors">
                  <div className="absolute -left-8 w-7 h-7 bg-white dark:bg-slate-800 border-2 border-gray-100 dark:border-slate-700 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-slate-900 shadow-sm transition-all group-hover:scale-110">
                    <div className="w-2 h-2 bg-gray-200 dark:bg-slate-700 rounded-full transition-colors"></div>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-gray-300 dark:text-slate-500 uppercase tracking-widest transition-colors">
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
