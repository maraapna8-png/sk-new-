import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import { Logo } from './Logo';
import {
  User,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Scale,
} from 'lucide-react';

interface AboutPageProps {
  language: LanguageCode;
  onNavigateOrder: () => void;
  onOpenMessageModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  onNavigateOrder,
  onOpenMessageModal,
}) => {
  const t = translations[language];

  return (
    <div id="about-page" className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B3022]/10 text-[#1B3022] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            Pure Quality & Trust
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B3022]">
            {t.aboutTitle}
          </h1>
          <p className="mt-2 text-base text-[#4A5568]">
            {t.aboutSubtitle}
          </p>
        </div>

        {/* Company Mission & Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white border border-[#EADFCF] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] text-[#1B3022] flex items-center justify-center border border-[#EADFCF]/60">
              <Sparkles className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#1B3022]">
              Tea Quality
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              {t.aboutQualityText}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#EADFCF] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] text-[#1B3022] flex items-center justify-center border border-[#EADFCF]/60">
              <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#1B3022]">
              Reliable Service
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              {t.aboutServiceText}
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white border border-[#EADFCF] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] text-[#1B3022] flex items-center justify-center border border-[#EADFCF]/60">
              <HeartHandshake className="w-6 h-6 text-[#C5A059]" />
            </div>
            <h3 className="text-xl font-display font-bold text-[#1B3022]">
              Long-term Trust
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              {t.aboutCommitmentText}
            </p>
          </div>
        </div>

        {/* Leadership & Management Section */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#EADFCF] shadow-md space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1B3022]">
              {t.leadershipTitle}
            </h2>
            <p className="text-xs text-[#63756A] mt-1">
              Directly managed and operated with personal commitment to every customer and shopkeeper.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Owner Card */}
            <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#EADFCF] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1B3022] text-[#EAD59A]">
                    {t.ownerLabel}
                  </span>
                  <User className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-[#1B3022] mt-3">
                  {t.ownerName}
                </h3>
                <p className="text-xs text-[#63756A] mt-1">
                  Overall company oversight, quality blending standards, and wholesale supply commitments.
                </p>
              </div>

              <div className="pt-3 border-t border-[#EADFCF] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#63756A]">Direct Phone:</span>
                <a
                  href="tel:03318701808"
                  className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#1B3022] hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  03318701808
                </a>
              </div>
            </div>

            {/* General Manager Card */}
            <div className="p-6 rounded-2xl bg-[#FAF6EE] border border-[#EADFCF] flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#1B3022] text-[#EAD59A]">
                    {t.gmLabel}
                  </span>
                  <User className="w-5 h-5 text-[#C5A059]" />
                </div>
                <h3 className="text-2xl font-display font-extrabold text-[#1B3022] mt-3">
                  {t.gmName}
                </h3>
                <p className="text-xs text-[#63756A] mt-1">
                  Order processing, dispatch coordination, payment verification, and shopkeeper support.
                </p>
              </div>

              <div className="pt-3 border-t border-[#EADFCF] flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[#63756A]">Direct & WhatsApp:</span>
                <div className="flex items-center gap-2">
                  <a
                    href="tel:03449293698"
                    className="inline-flex items-center gap-1 text-sm font-extrabold text-[#1B3022] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    03449293698
                  </a>
                  <button
                    onClick={onOpenMessageModal}
                    className="p-1.5 rounded-lg bg-[#25D366]/20 text-[#0F682C] hover:bg-[#25D366]/30 transition-colors cursor-pointer"
                    title="Message on WhatsApp"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CTA Bar */}
        <div className="p-8 rounded-3xl bg-[#1B3022] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#C5A059]/40">
          <div>
            <h3 className="text-2xl font-display font-extrabold text-white">
              Ready to stock SK Tea in your shop?
            </h3>
            <p className="text-xs text-white/80 mt-1">
              Select 125g, 250g, 500g, or 1 KG packs and get fast doorstep dispatch.
            </p>
          </div>
          <button
            onClick={onNavigateOrder}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#EAD59A] to-[#C5A059] text-[#1B3022] font-extrabold text-sm hover:scale-105 transition-transform shrink-0 cursor-pointer shadow-md"
          >
            {t.placeYourOrder}
          </button>
        </div>

      </div>
    </div>
  );
};
