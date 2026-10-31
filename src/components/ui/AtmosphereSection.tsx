import React from 'react';
import { Crown, Sparkles, UtensilsCrossed, Users } from 'lucide-react';

export const AtmosphereSection: React.FC = () => {
  return (
    <section id="atmosphere" className="relative py-28 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase">
            <Crown className="w-3.5 h-3.5" />
            <span>Sharqona mehmondo'stlik & Hashamat</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
            Restoran <br />
            <span className="gold-gradient-text">Muhiti & Shinam Zallar</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Oila davrasida, qadrdonlar bilan yoki muhim biznes uchrashuvlari uchun eng saralangan premium muhit.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative rounded-2xl overflow-hidden group h-80 border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Asosiy Zal"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Markaziy Zallar</span>
              <h3 className="font-cinzel text-xl font-bold text-white mt-1">Hashamatli Asosiy Zallar</h3>
              <p className="text-xs text-zinc-300 mt-2">
                Sharqona naqshlar, iliq nur va sokin musiqiy jo'rlik ostida yoqimli hordiq.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group h-80 border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
              alt="VIP Xonalar"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Maxsus Xizmat</span>
              <h3 className="font-cinzel text-xl font-bold text-white mt-1">Alohida VIP Kabinetlar</h3>
              <p className="text-xs text-zinc-300 mt-2">
                Yakkaxon suhbatlar, oilaviy marosimlar va shaxsiy xizmat ko'rsatish ustuvorligi.
              </p>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden group h-80 border border-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80"
              alt="Ochiq Terassa"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Yozgi Ayvon</span>
              <h3 className="font-cinzel text-xl font-bold text-white mt-1">Yozgi Ochiq Terassa</h3>
              <p className="text-xs text-zinc-300 mt-2">
                Toza havo, ko'katlar ifori va ochiq osmon ostida qovurilgan issiq jo'jalar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
