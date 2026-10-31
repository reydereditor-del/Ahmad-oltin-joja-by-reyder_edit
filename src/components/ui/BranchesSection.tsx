import React from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle } from 'lucide-react';
import { BRANCHES } from '../../data/menuData';

export const BranchesSection: React.FC = () => {
  return (
    <section id="branches" className="relative py-28 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Toshkent Bo'ylab Filiallar</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
            Biz Sizga <br />
            <span className="gold-gradient-text">Har Doim Yaqinmiz</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Toshkent shahrining asosiy nuqtalaridagi qulay filiallarimizga tashrif buyuring yoki tezkor yetkazib berish xizmatidan foydalaning.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRANCHES.map((b) => (
            <div
              key={b.id}
              className="p-7 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-gold-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-[0_0_30px_rgba(244,157,20,0.12)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-cinzel text-xl font-bold text-white">{b.name}</h3>
                  <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-2 text-xs text-zinc-300">
                  <p className="flex items-start gap-2">
                    <span className="text-gold-400 font-bold">Manzil:</span>
                    <span>{b.address}</span>
                  </p>
                  <p className="flex items-center gap-2 text-zinc-400">
                    <span className="text-gold-400 font-bold">Mo'ljal:</span>
                    <span>{b.landmark}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gold-400" />
                    <span>{b.hours}</span>
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {b.features.map((f, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 flex items-center gap-1 border border-zinc-700/40"
                    >
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <a
                  href={`tel:${b.phone}`}
                  className="text-xs font-bold text-gold-400 hover:text-gold-300 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {b.phone}
                </a>

                <a
                  href={`https://yandex.uz/maps/?text=${encodeURIComponent('Axmad Oltin Joja ' + b.name)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-gold-500 hover:text-black text-xs font-semibold text-zinc-200 transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Xarita
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
