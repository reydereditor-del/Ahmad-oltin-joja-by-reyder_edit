import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, PhoneCall, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen, totalPrice, totalItems } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isCartOpen) return null;

  const deliveryFee = totalPrice >= 200000 ? 0 : (totalPrice > 0 ? 15000 : 0);
  const grandTotal = totalPrice + deliveryFee;

  const handleOrder = (type: 'telegram' | 'phone') => {
    if (cart.length === 0) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f59e0b', '#d97706', '#fbbf24', '#ffffff']
    });

    if (type === 'telegram') {
      const itemsList = cart
        .map((i, idx) => `${idx + 1}. ${i.item.name} x ${i.quantity} = ${(i.item.price * i.quantity).toLocaleString('uz-UZ')} so'm`)
        .join('%0A');

      const message = `🍗 *Yangi Buyurtma - Axmad Oltin Jo'ja*%0A%0A` +
        `👤 *Mijoz:* ${name || 'Nomaʼlum'}%0A` +
        `📞 *Tel:* ${phone}%0A` +
        `📍 *Manzil:* ${address || 'Olib ketish / Ko‘rsatilmagan'}%0A%0A` +
        `📋 *Taomlar:*%0A${itemsList}%0A%0A` +
        `🚚 *Yetkazib berish:* ${deliveryFee === 0 ? 'BEPUL' : deliveryFee.toLocaleString('uz-UZ') + " so'm"}%0A` +
        `💰 *JAMI:* ${grandTotal.toLocaleString('uz-UZ')} so'm`;

      window.open(`https://t.me/share/url?url=${message}`, '_blank');
    } else {
      window.location.href = 'tel:+998712002606';
    }

    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
      setIsOrdered(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d0d12] border-l border-gold-500/20 text-white flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-lg text-white">Savat</h3>
                <p className="text-xs text-zinc-400">{totalItems} ta taom tanlandi</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {isOrdered ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-cinzel text-xl font-bold text-white">Buyurtmangiz qabul qilindi!</h4>
                <p className="text-sm text-zinc-400">
                  Tez orada operatorimiz siz bilan bog‘lanadi va issiq taomingiz yetkaziladi.
                </p>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto" />
                <p className="text-zinc-400 font-medium">Savatingiz hozircha bo'sh</p>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Menyudan o‘zingizga yoqqan oltin jo‘ja va milliy taomlarni qo‘shing.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {cart.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-3 hover:border-gold-500/30 transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-zinc-800"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate">{item.name}</h4>
                        <p className="text-xs text-gold-400 font-bold mt-0.5">
                          {(item.price * quantity).toLocaleString('uz-UZ')} so'm
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center hover:bg-gold-500 hover:text-black transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-zinc-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Customer Details Form */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Yetkazib Berish Ma'lumotlari
                  </h4>
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="+998 (__) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="Yetkazish manzili (ko'cha, xonadon)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer calculation & Order Actions */}
          {cart.length > 0 && !isOrdered && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950/80 space-y-4">
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Taomlar narxi:</span>
                  <span className="text-white font-medium">{totalPrice.toLocaleString('uz-UZ')} so'm</span>
                </div>
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className={deliveryFee === 0 ? "text-emerald-400 font-semibold" : "text-white"}>
                    {deliveryFee === 0 ? "BEPUL (Aksiya)" : `${deliveryFee.toLocaleString('uz-UZ')} so'm`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Jami to'lov:</span>
                  <span className="gold-gradient-text text-lg">{grandTotal.toLocaleString('uz-UZ')} so'm</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleOrder('telegram')}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </button>
                <button
                  onClick={() => handleOrder('phone')}
                  className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-zinc-700 transition-all duration-300"
                >
                  <PhoneCall className="w-4 h-4 text-gold-400" />
                  Qo‘ng‘iroq
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
