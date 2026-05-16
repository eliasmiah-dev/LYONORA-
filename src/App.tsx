import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Percent, 
  Tag, 
  RotateCcw, 
  Calculator, 
} from 'lucide-react';

const DancingWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    animate={{ 
      y: [0, -6, 0, -6, 0],
      rotate: [-5, 5, -5, 5, -5],
      scale: [1, 1.1, 1, 1.1, 1]
    }}
    transition={{ 
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="flex items-center gap-2"
  >
    {children}
  </motion.div>
);

export default function App() {
  const [mrp, setMrp] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [logo, setLogo] = useState<string | null>(() => localStorage.getItem('app-logo'));

  useEffect(() => {
    const rawMrp = parseFloat(mrp);
    const rawPercent = parseFloat(discountPercent);
    
    if (isNaN(rawMrp) || isNaN(rawPercent)) {
      setDiscountAmount(0);
      setFinalPrice(!isNaN(rawMrp) ? rawMrp : 0);
      return;
    }
    
    const calculatedDiscount = (rawMrp * rawPercent) / 100;
    const calculatedFinal = rawMrp - calculatedDiscount;

    setDiscountAmount(calculatedDiscount);
    setFinalPrice(calculatedFinal);
  }, [mrp, discountPercent]);

  const handleReset = () => {
    setMrp('');
    setDiscountPercent('');
  };

  const getSavingsMetadata = (percentStr: string) => {
    const p = parseFloat(percentStr) || 0;
    
    if (p <= 0) {
      return {
        label: "You Save",
        icon: (
          <div className="flex items-center gap-1.5">
            <Tag size={16} className="sm:w-4.5 sm:h-4.5" />
            <span className="text-[10px] sm:text-sm font-bold uppercase tracking-tight ml-1">You Save</span>
          </div>
        )
      };
    }
    
    let content;
    let label = "";

    if (p <= 10) {
      label = "Great Save";
      content = <span>🔥</span>;
    } else if (p <= 20) {
      label = "Good Deal";
      content = <span>🎉</span>;
    } else if (p <= 30) {
      label = "Great Value";
      content = <span>🗿</span>;
    } else if (p <= 40) {
      label = "Big Discount";
      content = <span>💎</span>;
    } else if (p <= 50) {
      label = "I Love LYONORA";
      content = <span>💀</span>;
    } else if (p <= 60) {
      label = "Super Steal";
      content = <div className="flex gap-1"><span>💀</span><span>🎉</span></div>;
    } else if (p <= 70) {
      label = "Unbelievable";
      content = <div className="flex gap-1"><span>🗿</span><span>💀</span><span>🚀</span></div>;
    } else if (p <= 80) {
      label = "Jackpot";
      content = <span>🗿</span>;
    } else if (p <= 90) {
      label = "Insane Save";
      content = <span>🏃‍♂️</span>;
    } else {
      label = "Pure Magic";
      content = <div className="flex gap-1"><span>🗿</span><span>💀</span><span>🚀</span></div>;
    }

    return { 
      label, 
      icon: (
        <DancingWrapper>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{content}</span>
            <span className="text-[10px] sm:text-sm font-black uppercase tracking-tight">{label}</span>
          </div>
        </DancingWrapper>
      ) 
    };
  };

  const savings = getSavingsMetadata(discountPercent);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogo(base64String);
        localStorage.setItem('app-logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-screen bg-sky-50 sm:p-4 md:p-6 lg:p-8 font-sans">
      <div className="h-full bg-sky-50 flex flex-col text-slate-900 selection:bg-sky-200 overflow-hidden border-[3px] border-sky-500 rounded-[24px] shadow-2xl">
        {/* Header */}
        <header className="bg-white border-b-[3px] border-sky-500 rounded-t-[21px] py-3 px-4 sm:px-6 sticky top-0 z-10 shadow-sm shrink-0">
          <div className="w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 leading-tight">
            <label className="relative w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center shrink-0 cursor-pointer group bg-sky-50 rounded-lg sm:rounded-xl border border-sky-100 overflow-hidden transition-all hover:bg-sky-100">
               <input 
                 type="file" 
                 className="hidden" 
                 accept="image/*"
                 onChange={handleLogoUpload}
               />
               {logo ? (
                 <img src={logo} alt="Logo" className="w-full h-full object-contain" />
               ) : (
                 <Calculator className="text-sky-600 w-6 h-6 sm:w-8 sm:h-8" />
               )}
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                 <span className="text-[8px] text-white font-bold uppercase tracking-tighter">Change</span>
               </div>
            </label>
            <div className="flex flex-col">
              <motion.h1 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-black tracking-tighter text-sky-600 sm:text-3xl"
              >
                LYONORA
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-[8px] sm:text-[10px] uppercase tracking-[0.25em] font-bold text-slate-400"
              >
                Discount Calculator
              </motion.p>
            </div>
          </div>

          <button 
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 text-[10px] sm:text-xs font-black uppercase tracking-widest bg-sky-600 text-white hover:bg-sky-700 rounded-full shadow-lg shadow-sky-600/20 transition-all active:scale-95"
          >
            <RotateCcw size={14} className="sm:w-4 sm:h-4 stroke-[3px]" />
            <span>RESET ALL</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 overflow-y-auto">
        <div className="w-full max-w-lg pb-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-sky-900/10 border-2 border-sky-200 overflow-hidden"
          >
            <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
              {/* Input Section */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative group">
                  <label htmlFor="mrp" className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black mb-1 sm:mb-1.5 ml-1 block">
                    MRP Price
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600 font-black text-xl sm:text-2xl transition-transform group-focus-within:scale-110 select-none">
                      ৳
                    </div>
                    <input
                      id="mrp"
                      type="number"
                      placeholder="0.00"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-sky-200 focus:border-sky-500 focus:bg-white rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-lg sm:text-xl font-bold outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="discount" className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black mb-1 sm:mb-1.5 ml-1 block">
                    Discount Percentage
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-600 transition-transform group-focus-within:scale-110">
                      <Percent size={18} strokeWidth={3} className="sm:w-5 sm:h-5" />
                    </div>
                    <input
                      id="discount"
                      type="number"
                      placeholder="0"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-sky-200 focus:border-sky-500 focus:bg-white rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-lg sm:text-xl font-bold outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-sky-50 space-y-3 sm:space-y-4">
                <AnimatePresence>
                  <motion.div 
                    key={savings.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center p-3 sm:p-4 bg-sky-500/5 rounded-xl sm:rounded-2xl border border-sky-100"
                  >
                    <div className="flex items-center text-sky-600">
                      {savings.icon}
                    </div>
                    <span className="text-lg sm:text-xl font-black text-sky-600">
                      ৳{discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} BDT
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="p-5 sm:p-6 bg-sky-600 rounded-2xl sm:rounded-3xl text-white shadow-lg shadow-sky-600/20 relative overflow-hidden group">
                  {/* Decorative background circle */}
                  <div className="absolute -right-8 -top-8 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500" />
                  
                  <div className="relative z-10">
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-white">Final Price</span>
                    <div className="flex flex-wrap items-baseline gap-2 mt-1 text-amber-300">
                      <span className="text-2xl sm:text-3xl font-black tracking-tight">
                        ৳{finalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-xs sm:text-sm font-bold opacity-90">BDT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 sm:py-6 px-4 text-center border-t-[3px] border-sky-500 rounded-b-[21px] bg-white shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-1 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-black">
          <span className="font-medium">CREATED BY LYONORA JFP</span>
          <span className="font-medium">© 2026 ELIAS MIAH</span>
        </div>
      </footer>
    </div>
  </div>
);
}
