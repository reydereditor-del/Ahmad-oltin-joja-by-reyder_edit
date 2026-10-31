import React, { useState } from 'react';
import { Sparkles, Clock, Users, Plus, Check, Flame } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS, MenuItem } from '../../data/menuData';
import { useCart } from '../../context/CartContext';

export const MenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const filteredItems = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="menu" className="relative py-28 px-4 sm:px-6 lg:px-8 z-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-950/80 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Afsonaviy Taomlar Kolleksiyasi</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-black text-white">
            Axmad Oltin Jo‘ja <br />
            <span className="gold-gradient-text">Gastronomik Menyusi</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Har bir taom bizning oshpazlarimiz tomonidan eng sara mahsulotlardan, milliy urf-odat va muhabbat bilan tayyorlanadi.
          </p>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black shadow-lg shadow-gold-500/30 scale-105'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-zinc-800/80 hover:border-gold-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-[0_0_35px_rgba(244,157,20,0.18)] hover:-translate-y-1.5"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                  {/* Badges */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-500 text-black text-[10px] font-black uppercase tracking-wider shadow-md">
                      {item.badge}
                    </div>
                  )}

                  {/* Cook time & servings */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300 font-medium">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      <Clock className="w-3 h-3 text-gold-400" />
                      {item.cookTime}
                    </span>
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                      <Users className="w-3 h-3 text-gold-400" />
                      {item.servings}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <h3 className="font-cinzel text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Ingredients Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="p-5 pt-0 mt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Narxi</span>
                  <span className="text-lg font-extrabold gold-gradient-text">
                    {item.price.toLocaleString('uz-UZ')} so'm
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(item)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
                    addedId === item.id
                      ? 'bg-emerald-500 text-white scale-105'
                      : 'bg-gold-500/10 hover:bg-gold-500 text-gold-400 hover:text-black border border-gold-500/30'
                  }`}
                >
                  {addedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Qo‘shildi
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      Savatga
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
