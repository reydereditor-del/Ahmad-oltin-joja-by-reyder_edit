import React from 'react';
import { History, Heart, Sparkles, Star } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="relative py-28 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Decorative Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl shadow-gold-950/50">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
                alt="Axmad Oltin Joja Tarixi"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                <p className="font-cinzel text-gold-400 font-bold text-sm">"Ta'm o'tkinchi emas, u xotiraga aylanadi"</p>
                <p className="text-[11px] text-zinc-400 mt-1">— Axmad Oltin Jo'ja asoschilari</p>
              </div>
            </div>

            {/* Floating Heritage Badge */}
            <div className="absolute -top-6 -right-6 p-4 rounded-2xl bg-zinc-900 border border-gold-500/50 shadow-xl hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                <Star className="w-5 h-5 fill-gold-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">30+ Yillik</p>
                <p className="text-[11px] text-gold-400">Ishonchli Ta'm</p>
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase">
              <History className="w-3.5 h-3.5" />
              <span>Bizning Tariximiz</span>
            </div>

            <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white leading-tight">
              Bitta Kichik Qozondan <br />
              <span className="gold-gradient-text">El Sevgan Restoranga</span>
            </h2>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
              1990-yillarda Toshkent shahrida kichik oilaviy oshxona sifatida ish boshlagan «Axmad Oltin Jo‘ja», bugun shahar ahli va mehmonlarining eng sevimli maskanlaridan biriga aylandi.
            </p>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Yillar davomida biz o‘z qadriyatlarimizga sodiq qoldik: faqatgina eng sarxil go‘sht, o‘zgarmas 12 xil tog‘ ziravorlari va har bir mehmonga o‘z oilamiz a’zosidek hurmat bilan xizmat ko‘rsatish. Bugun biz shunchaki tovuq pishirmaymiz — biz mehr va an'anani ulashamiz.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="font-cinzel text-white font-bold text-base">Oilaviy An'ana</h4>
                <p className="text-zinc-400 text-xs mt-1">Avloddan-avlodga o‘tib kelayotgan o‘zgarmas sirlar.</p>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <h4 className="font-cinzel text-white font-bold text-base">Toza & Tabiiy</h4>
                <p className="text-zinc-400 text-xs mt-1">Hech qanday kimyoviy qo‘shimchalarsiz tabiiy marinad.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
