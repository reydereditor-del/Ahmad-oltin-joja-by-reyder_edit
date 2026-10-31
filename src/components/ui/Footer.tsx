import React from 'react';
import { Phone, ArrowUp, Instagram, Send, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-zinc-800/80 pt-20 pb-12 px-4 sm:px-6 lg:px-8 z-20 overflow-hidden">
      {/* Golden flare line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hot Delivery Callout Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-gold-950/90 via-zinc-900 to-zinc-950 p-8 sm:p-12 border border-gold-500/30 overflow-hidden shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Tezkor Yetkazib Berish Xizmati
            </span>
            <h3 className="font-cinzel text-2xl sm:text-4xl font-extrabold text-white">
              Qaynoq & Qarsildoq Oltin Jo‘jani <br />
              <span className="gold-gradient-text">Uyingizga Buyurtma Qiling</span>
            </h3>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md">
              Har kuni soat 09:00 dan 23:00 gacha Toshkentning istalgan nuqtasiga issiq termoboxlarda yetkazamiz.
            </p>
          </div>

          <a
            href="tel:+998712002606"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-black text-sm uppercase tracking-wider flex items-center gap-3 shadow-xl shadow-gold-500/25 hover:scale-105 transition-all shrink-0"
          >
            <Phone className="w-5 h-5 fill-black" />
            +998 71 200 26 06
          </a>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🍗</span>
              <span className="font-cinzel font-bold text-lg text-white">AXMAD OLTIN JO‘JA</span>
            </div>
            <p className="text-zinc-400 leading-relaxed">
              1990-yildan buyon xalqimiz sevgan o‘zgarmas milliy ta’m va sharqona saxovat timsoli.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel font-bold text-white text-sm uppercase tracking-wider mb-4">
              Tezkor Havolalar
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li><a href="#story" className="hover:text-gold-400 transition-colors">Bizning Tariximiz</a></li>
              <li><a href="#craft" className="hover:text-gold-400 transition-colors">Maxfiy 12 Ziravor</a></li>
              <li><a href="#menu" className="hover:text-gold-400 transition-colors">3D Taomlar Menyusi</a></li>
              <li><a href="#atmosphere" className="hover:text-gold-400 transition-colors">VIP Kabinetlar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel font-bold text-white text-sm uppercase tracking-wider mb-4">
              Aloqa & Buyurtma
            </h4>
            <ul className="space-y-2.5 text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400" />
                <span>+998 71 200 26 06</span>
              </li>
              <li>Ish vaqti: 09:00 - 23:30</li>
              <li>Yetkazish hududi: Toshkent shahri</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-cinzel font-bold text-white text-sm uppercase tracking-wider">
              Biz Ijtimoiy Tarmoqlarda
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-gold-400 hover:border-gold-500/40 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-zinc-500">
              Har kuni eng yangi chegirmalar va yangiliklar rasmiy sahifalarimizda.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Axmad Oltin Jo‘ja. Barcha huquqlar himoyalangan.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>Yuqoriga qaytish</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
