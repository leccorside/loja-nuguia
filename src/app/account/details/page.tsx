"use client";

export default function AccountDetailsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Name Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              First name <span className="text-primary">*</span>
            </label>
            <input 
              type="text" 
              required
              defaultValue="Johnathan"
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all font-medium text-muted"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-secondary">
              Last name <span className="text-primary">*</span>
            </label>
            <input 
              type="text" 
              required
              defaultValue="Rios"
              className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all font-medium text-muted"
            />
          </div>
        </div>

        {/* Display Name Section */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">
            Display name <span className="text-primary">*</span>
          </label>
          <input 
            type="text" 
            required
            defaultValue="Johnathan Rios"
            className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all font-medium text-muted"
          />
          <p className="text-[10px] text-muted italic mt-1 font-medium">
            This will be how your name will be displayed in the account section and in reviews
          </p>
        </div>

        {/* Email Section */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-secondary">
            Email address <span className="text-primary">*</span>
          </label>
          <input 
            type="email" 
            required
            defaultValue="leccorside@gmail.com"
            className="w-full bg-yellow-50 border border-border p-3 text-sm focus:border-primary outline-none transition-all font-medium text-muted/80"
          />
        </div>

        {/* Password Change Section */}
        <div className="pt-4">
          <fieldset className="border border-border p-6 md:p-8 rounded-sm space-y-6">
            <legend className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-secondary">
              Password change
            </legend>
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">
                Current password (leave blank to leave unchanged)
              </label>
              <input 
                type="password" 
                defaultValue="************"
                className="w-full bg-yellow-50 border border-border p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">
                New password (leave blank to leave unchanged)
              </label>
              <input 
                type="password" 
                className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-secondary uppercase tracking-widest">
                Confirm new password
              </label>
              <input 
                type="password" 
                className="w-full bg-white border border-border p-3 text-sm focus:border-primary outline-none transition-all"
              />
            </div>
          </fieldset>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button 
            type="submit"
            className="bg-primary hover:bg-secondary text-white px-10 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all shadow-md active:scale-95"
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
}
