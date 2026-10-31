import React from 'react';
import { ArrowDown, Flame, Sparkles, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MENU_ITEMS } from '../../data/menuData';

export const HeroSection: React.FC = () => {
  const { addToCart } = useCart();
  const signatureChicken = MENU_ITEMS[0];

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Cinematic subtle background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gold-600/15 via-gold-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-8">
        {/* Heritage Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-950/60 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-widest uppercase shadow-lg shadow-gold-900/30">
          <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>1990-yildan beri afsonaviy o'zgarmas ta'm</span>
        </div>

        {/* Main Grand Title */}
        <div className="space-y-4">
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] text-white">
            HAQIQIY <br />
            <span className="gold-gradient-text drop-shadow-[0_10px_30px_rgba(244,157,20,0.3)]">
              OLTIN JO‘JA
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-zinc-300 font-light leading-relaxed">
            Maxfiy 12 xil tog‘ ziravorlarida marinadlangan, tillarang qisirlagan qobiq ostidagi eruvchi barra tovuq go‘shti. O‘zbekiston xalqining mehriga sazovor bo‘lgan haqiqiy brend.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => addToCart(signatureChicken)}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(244,157,20,0.4)] hover:shadow-[0_0_50px_rgba(244,157,20,0.6)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 fill-black" />
            Oltin Jo‘jani Buyurtma Qilish
          </button>

          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/80 hover:border-gold-500/50 text-white font-bold text-sm uppercase tracking-wider backdrop-blur-md hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            3D Menyu & Narxlar
            <ChevronRight className="w-4 h-4 text-gold-400" />
          </button>
        </div>

        {/* Scroll down prompt */}
        <div className="pt-16 flex flex-col items-center gap-2 text-zinc-400">
          <span className="text-[11px] font-semibold tracking-widest uppercase text-gold-400/80">
            Scroll qiling — 3D sirlarni kashf eting
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-gold-500/40 flex items-start justify-center p-1.5 shadow-md shadow-gold-500/10">
            <div className="w-1.5 h-2.5 rounded-full bg-gold-400 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};
