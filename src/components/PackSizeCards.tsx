import React from 'react';
import { LanguageCode, OrderItemQuantities, PackSizeKey } from '../types';
import { PACK_CONFIGS, translations } from '../utils/translations';
import { Minus, Plus, ShoppingBag, Check, Scale } from 'lucide-react';

interface PackSizeCardsProps {
  language: LanguageCode;
  quantities: OrderItemQuantities;
  onUpdateQuantity: (pack: PackSizeKey, delta: number) => void;
  onSetQuantity: (pack: PackSizeKey, count: number) => void;
  onProceedToOrder: () => void;
}

export const PackSizeCards: React.FC<PackSizeCardsProps> = ({
  language,
  quantities,
  onUpdateQuantity,
  onSetQuantity,
  onProceedToOrder,
}) => {
  const t = translations[language];

  // Auto calculate total kg
  const totalKg = Number(
    (
      quantities['125g'] * 0.125 +
      quantities['250g'] * 0.25 +
      quantities['500g'] * 0.5 +
      quantities['1kg'] * 1.0
    ).toFixed(3)
  );

  const totalPacks =
    quantities['125g'] +
    quantities['250g'] +
    quantities['500g'] +
    quantities['1kg'];

  return (
    <section id="pack-sizes-section" className="py-16 bg-[#FAF6EE] border-t border-b border-[#EADFCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B3022]/10 text-[#1B3022] text-xs font-bold uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5 text-[#C5A059]" />
            Official Pack Sizes
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B3022]">
            {t.packSizesHeading}
          </h2>
          <p className="mt-3 text-base text-[#4A5568]">
            {t.packSizesSubheading}
          </p>
        </div>

        {/* 4 Pack Size Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACK_CONFIGS.map((pack) => {
            const currentQty = quantities[pack.key];
            const isSelected = currentQty > 0;

            return (
              <div
                key={pack.key}
                id={`pack-card-${pack.key}`}
                className={`relative rounded-3xl bg-white border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md ${
                  isSelected
                    ? 'border-[#1B3022] ring-2 ring-[#1B3022]/20'
                    : 'border-[#EADFCF]'
                }`}
              >
                {/* Selected Indicator Badge */}
                {isSelected && (
                  <div className="absolute top-3 right-3 z-10 bg-[#1B3022] text-[#EAD59A] px-2.5 py-0.5 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-xs">
                    <Check className="w-3 h-3" />
                    <span>{currentQty} selected</span>
                  </div>
                )}

                {/* Card Top: Image & Pack Badge */}
                <div className="p-5 pb-3">
                  <div className="relative rounded-2xl overflow-hidden bg-[#FDFBF7] border border-[#EADFCF] h-48 flex items-center justify-center p-3">
                    <img
                      src="/src/assets/images/sk_tea_pack_1787567858442.jpg"
                      alt={`SK Tea ${pack.label}`}
                      className="max-h-full object-contain transform hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-[#1B3022]/90 backdrop-blur-xs text-[#EAD59A] text-[11px] font-bold px-2 py-0.5 rounded-md">
                      {pack.weightInKg} KG / pack
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-display font-extrabold text-[#1B3022]">
                        {pack.label}
                      </h3>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FAF6EE] text-[#63756A] border border-[#EADFCF]">
                        SK Standard
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#4A5568] line-clamp-2">
                      {pack.description}
                    </p>
                    <div className="mt-2 text-[11px] text-[#718096] italic">
                      Ideal for: {pack.recommendedFor}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Quantity Selector */}
                <div className="p-5 pt-3 bg-[#FDFBF7] border-t border-[#EADFCF]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#1B3022] uppercase tracking-wider">
                      {t.quantityLabel}:
                    </span>

                    <div className="flex items-center bg-white border border-[#EADFCF] rounded-xl shadow-2xs p-1">
                      {/* Minus Button */}
                      <button
                        id={`minus-btn-${pack.key}`}
                        onClick={() => onUpdateQuantity(pack.key, -1)}
                        disabled={currentQty === 0}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1B3022] hover:bg-[#FAF6EE] active:bg-[#EADFCF] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        aria-label={`Decrease ${pack.label} quantity`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      {/* Current Quantity Input */}
                      <input
                        type="number"
                        min="0"
                        max="999"
                        id={`qty-input-${pack.key}`}
                        value={currentQty}
                        onChange={(e) => {
                          const val = parseInt(e.target.value, 10);
                          onSetQuantity(pack.key, isNaN(val) ? 0 : Math.max(0, val));
                        }}
                        className="w-12 text-center font-bold text-base text-[#1B3022] focus:outline-hidden"
                      />

                      {/* Plus Button */}
                      <button
                        id={`plus-btn-${pack.key}`}
                        onClick={() => onUpdateQuantity(pack.key, 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1B3022] text-white hover:bg-[#122218] active:scale-95 transition-all cursor-pointer"
                        aria-label={`Increase ${pack.label} quantity`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Live Weight Calculation & Order Bar */}
        <div
          id="pack-sizes-live-bar"
          className="mt-10 p-6 rounded-3xl bg-[#1B3022] text-white shadow-xl border border-[#C5A059]/40 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center md:text-left">
            <div className="text-xs uppercase tracking-widest text-[#EAD59A] font-bold">
              {t.totalTeaWeight}
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                {totalKg} <span className="text-xl font-normal text-[#EAD59A]">{t.kgUnit}</span>
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10">
                {totalPacks} {t.packsSelected}
              </span>
            </div>
            <div className="text-xs text-white/70">
              Breakdown: 125g ({quantities['125g']}), 250g ({quantities['250g']}), 500g ({quantities['500g']}), 1KG ({quantities['1kg']})
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              id="pack-proceed-order-btn"
              onClick={onProceedToOrder}
              disabled={totalKg <= 0}
              className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#EAD59A] via-[#C5A059] to-[#9E7A31] text-[#1B3022] font-extrabold text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#1B3022]" />
              <span>{t.reviewOrderBtn}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
