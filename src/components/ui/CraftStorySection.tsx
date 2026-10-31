import React from 'react';
import { ShieldCheck, Award, Flame, Leaf, Clock, Heart } from 'lucide-react';

export const CraftStorySection: React.FC = () => {
  return (
    <section id="craft" className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story narrative */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Oshpazlik San'ati & Maxfiy Retsept</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white leading-tight">
              Oltin Qobiqning <br />
              <span className="gold-gradient-text">Uchta O‘zgarmas Qonuni</span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
              Bizning jo‘jalarimiz nima uchun 30 yildan beri takrorlanmas? Chunki har bir tovuq shunchaki qovurilmaydi — u an'anaviy sharqona marinadlash va zamonaviy gastronomik issiqlik san'atining uyg‘unligidan dunyoga keladi.
            </p>

            {/* 3 Pillars */}
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-gold-500/40 transition-all flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-white text-lg">12 Xil Tog‘ Ziravorlari</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Chimyon va Zomin tog‘larining sarxil tog‘ giyohlari, mayin tuyilgan zira va maxsus kashnich donachalari.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-gold-500/40 transition-all flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-white text-lg">24 Soatlik Maxsus Dam Olgan Marinad</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Har bir bo‘lak suyak-suyagigacha marinad shirasini o‘ziga tortishi uchun kamida butun bir kecha-kunduz dam oladi.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-gold-500/40 transition-all flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/20 shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-white text-lg">300°C Aniq Termik Muhrlash</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Tashqi qobig‘i bir zumda oltin rangda qirsillab qotadi, ichki barcha go‘sht sharbati va shirasi esa ichkarida muhrlanib qoladi.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Numbers & Golden Badges */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-gold-500/20 text-center space-y-2">
              <span className="font-cinzel text-4xl sm:text-5xl font-black gold-gradient-text">30+</span>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">Yillik Meros</p>
              <p className="text-[11px] text-zinc-500">1990-yildan beri xalq xizmatida</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-gold-500/20 text-center space-y-2">
              <span className="font-cinzel text-4xl sm:text-5xl font-black gold-gradient-text">100%</span>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">Halol Standart</p>
              <p className="text-[11px] text-zinc-500">Sertifikatlangan sarxil go'sht</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-gold-500/20 text-center space-y-2">
              <span className="font-cinzel text-4xl sm:text-5xl font-black gold-gradient-text">12</span>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">Tog' Giyohlari</p>
              <p className="text-[11px] text-zinc-500">Maxfiy oshpazlik retsepti</p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-gold-500/20 text-center space-y-2">
              <span className="font-cinzel text-4xl sm:text-5xl font-black gold-gradient-text">35 min</span>
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-300">Tez Yetkazish</p>
              <p className="text-[11px] text-zinc-500">Qaynoq termoboxlarda</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
