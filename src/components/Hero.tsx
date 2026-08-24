import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import heroTeaImage from '../assets/images/sk_tea_hero_1787567837494.jpg';
import {
  ShoppingBag,
  Phone,
  MessageSquare,
  ShieldCheck,
  Award,
  Truck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  language: LanguageCode;
  onPlaceOrder?: () => void;
  onOrderClick?: () => void;
  onExplorePacks: () => void;
  onOpenMessageModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onPlaceOrder,
  onOrderClick,
  onExplorePacks,
  onOpenMessageModal,
}) => {
  const t = translations[language] || translations['roman-english'];

  const handleOrder = onPlaceOrder || onOrderClick;

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FAF5EC] to-[#FDFBF7] py-8 sm:py-14 border-b border-[#EADFCF]">
      {/* Subtle Background Tea Leaf Accent Pattern */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#1B3022_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Brand Typography & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1B3022]/10 border border-[#1B3022]/20 text-[#1B3022]">
              <Sparkles className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Premium Karak Chai &bull; Wholesale & Retail
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-display font-extrabold tracking-tight text-[#1B3022] leading-[1.15]">
                {t.companyName}
              </h1>
              <p className="text-2xl sm:text-3xl font-serif-artistic italic text-[#C5A059] font-bold">
                “{t.tagline}”
              </p>
            </div>

            {/* Narrative Subtext */}
            <p className="text-base sm:text-lg text-[#3B4D43] leading-relaxed max-w-2xl font-normal">
              {t.heroSubtext}
            </p>

            {/* Pack Size Badges preview */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-[#63756A] uppercase tracking-wider mr-1">
                Available Packs:
              </span>
              {['125g', '250g', '500g', '1 KG'].map((size) => (
                <span
                  key={size}
                  className="px-3 py-1 rounded-lg bg-white border border-[#EADFCF] text-[#1B3022] font-bold text-xs shadow-2xs"
                >
                  {size}
                </span>
              ))}
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                id="hero-place-order-button"
                onClick={handleOrder}
                className="flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#1B3022] via-[#16291D] to-[#101D15] text-[#FDFBF7] font-bold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-[#C5A059]/50 cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#EAD59A]" />
                <span>{t.placeYourOrder}</span>
              </button>

              <button
                id="hero-explore-packs-button"
                onClick={onExplorePacks}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-[#EADFCF] text-[#1B3022] font-bold text-sm shadow-xs hover:bg-[#FAF6EE] hover:border-[#1B3022] transition-all duration-200 cursor-pointer"
              >
                <span>{t.explorePacks}</span>
              </button>

              <button
                id="hero-whatsapp-mgmt-button"
                onClick={onOpenMessageModal}
                className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#0F682C] font-bold text-sm transition-all duration-200 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>{t.whatsappGM}</span>
              </button>
            </div>

            {/* Direct Official Hotline Strip */}
            <div className="pt-4 border-t border-[#EADFCF] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:03318701808"
                id="hero-call-owner-btn"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#EADFCF] hover:border-[#C5A059] transition-colors group shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-[#1B3022]/10 text-[#1B3022] group-hover:bg-[#1B3022] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#63756A] uppercase tracking-wide">
                    Owner: Muhammad Azam
                  </div>
                  <div className="text-sm font-extrabold text-[#1B3022]">
                    03318701808
                  </div>
                </div>
              </a>

              <a
                href="tel:03449293698"
                id="hero-call-gm-btn"
                className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#EADFCF] hover:border-[#C5A059] transition-colors group shadow-2xs"
              >
                <div className="p-2 rounded-lg bg-[#1B3022]/10 text-[#1B3022] group-hover:bg-[#1B3022] group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#63756A] uppercase tracking-wide">
                    General Manager: Muhammad Zeeshan
                  </div>
                  <div className="text-sm font-extrabold text-[#1B3022]">
                    03449293698
                  </div>
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with Commercial Tea Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  id="hero-commercial-tea-image"
                  src={heroTeaImage}
                  alt="SK Tea Company Premium Milk Tea Cup with Cardamom and Lush Tea Leaves"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== '/hero-image.jpg' && !target.src.endsWith('/hero-image.jpg')) {
                      target.src = '/hero-image.jpg';
                    }
                  }}
                />

                {/* Overlay Badge Bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1B3022]/95 via-[#1B3022]/60 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#EAD59A] font-bold">
                        Signature Blend
                      </div>
                      <div className="text-lg font-bold font-display">
                        Rich Karak Tea & Elaichi Aroma
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#C5A059] text-[#1B3022] font-extrabold">
                        <Award className="w-3.5 h-3.5" />
                        100% Pure
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Trust Card Top Right */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-[#EADFCF] hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B3022] text-[#EAD59A] flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1B3022]">Direct Supply</div>
                  <div className="text-[11px] text-[#63756A]">COD & EasyPaisa Available</div>
                </div>
              </div>

              {/* Floating Trust Card Bottom Left */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-[#EADFCF] hidden sm:flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#1B3022]" />
                <span className="text-xs font-bold text-[#1B3022]">
                  Trusted by 500+ Shops
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
