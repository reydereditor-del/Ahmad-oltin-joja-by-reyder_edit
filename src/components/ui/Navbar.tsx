import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { AudioController } from './AudioController';

export const Navbar: React.FC = () => {
  const { setIsCartOpen, totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-[#070709]/85 backdrop-blur-xl border-b border-gold-500/15 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-600 via-gold-400 to-amber-200 p-[1.5px] shadow-lg shadow-gold-500/20 group-hover:shadow-gold-500/40 transition-shadow">
              <div className="w-full h-full bg-[#0d0d12] rounded-full flex items-center justify-center">
                <span className="text-xl">🍗</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel font-extrabold text-base sm:text-lg tracking-wider text-white group-hover:text-gold-300 transition-colors">
                AXMAD
              </span>
              <span className="text-[10px] tracking-[0.25em] text-gold-400 font-bold uppercase -mt-1">
                Oltin Jo‘ja
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-300">
            <button
              onClick={() => scrollTo('story')}
              className="hover:text-gold-400 transition-colors py-1 relative group"
            >
              Hikoyamiz
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollTo('craft')}
              className="hover:text-gold-400 transition-colors py-1 relative group"
            >
              Maxfiy Retsept
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollTo('menu')}
              className="hover:text-gold-400 transition-colors py-1 relative group"
            >
              3D Menyu
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollTo('atmosphere')}
              className="hover:text-gold-400 transition-colors py-1 relative group"
            >
              Muhit
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 group-hover:w-full transition-all duration-300" />
            </button>
            <button
              onClick={() => scrollTo('branches')}
              className="hover:text-gold-400 transition-colors py-1 relative group"
            >
              Filiallar
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold-400 group-hover:w-full transition-all duration-300" />
            </button>
          </div>

          {/* Action Tools: Sound + Phone + Cart */}
          <div className="flex items-center gap-3">
            <AudioController />

            <a
              href="tel:+998712002606"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 hover:border-gold-500/40 text-xs font-medium text-zinc-300 hover:text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>+998 71 200 26 06</span>
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-gradient-to-tr from-gold-600 to-gold-400 text-black hover:scale-105 transition-transform shadow-lg shadow-gold-500/25 flex items-center justify-center"
              aria-label="Savat"
            >
              <ShoppingBag className="w-4 h-4 font-bold" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 border-2 border-[#070709] text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d12]/98 border-b border-gold-500/20 px-6 py-6 space-y-4 backdrop-blur-2xl">
          <div className="flex flex-col space-y-3 text-sm font-semibold tracking-wider uppercase text-zinc-300">
            <button onClick={() => scrollTo('story')} className="text-left py-2 hover:text-gold-400">
              Hikoyamiz
            </button>
            <button onClick={() => scrollTo('craft')} className="text-left py-2 hover:text-gold-400">
              Maxfiy Retsept
            </button>
            <button onClick={() => scrollTo('menu')} className="text-left py-2 hover:text-gold-400">
              3D Menyu
            </button>
            <button onClick={() => scrollTo('atmosphere')} className="text-left py-2 hover:text-gold-400">
              Restoran Muhiti
            </button>
            <button onClick={() => scrollTo('branches')} className="text-left py-2 hover:text-gold-400">
              Filiallarimiz
            </button>
          </div>
          <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
            <a
              href="tel:+998712002606"
              className="text-xs text-gold-400 flex items-center gap-2 font-bold"
            >
              <Phone className="w-3.5 h-3.5" />
              +998 71 200 26 06
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
