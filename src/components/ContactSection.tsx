import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import {
  Phone,
  MessageSquare,
  User,
  ShieldCheck,
  MapPin,
  Clock,
  Send,
} from 'lucide-react';

interface ContactSectionProps {
  language: LanguageCode;
  onOpenMessageModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  language,
  onOpenMessageModal,
}) => {
  const t = translations[language];

  return (
    <section id="contact-section" className="py-16 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B3022]/10 text-[#1B3022] text-xs font-bold uppercase tracking-wider mb-2">
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            Official Contacts
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B3022]">
            Contact SK Tea Company
          </h1>
          <p className="mt-2 text-sm text-[#4A5568]">
            Direct, transparent communication with management for orders, queries, and wholesale inquiries.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Owner Card */}
          <div className="p-8 rounded-3xl bg-white border border-[#EADFCF] shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#1B3022] text-[#EAD59A]">
                  Owner
                </span>
                <ShieldCheck className="w-6 h-6 text-[#C5A059]" />
              </div>

              <h2 className="text-3xl font-display font-extrabold text-[#1B3022] mt-4">
                Muhammad Azam
              </h2>
              <p className="text-xs text-[#63756A] mt-1">
                Founder & Owner &bull; SK Tea Company
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-[#FAF6EE] border border-[#EADFCF] space-y-1">
                <div className="text-xs text-[#63756A] font-semibold">Official Phone Number:</div>
                <div className="text-xl font-extrabold text-[#1B3022]">
                  03318701808
                </div>
              </div>
            </div>

            <div>
              <a
                href="tel:03318701808"
                id="contact-call-owner-btn"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#1B3022] text-[#FDFBF7] font-bold text-sm hover:bg-[#122218] transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#EAD59A]" />
                <span>Call Owner (03318701808)</span>
              </a>
            </div>
          </div>

          {/* General Manager Card */}
          <div className="p-8 rounded-3xl bg-white border border-[#EADFCF] shadow-xs flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#1B3022] text-[#EAD59A]">
                  General Manager
                </span>
                <User className="w-6 h-6 text-[#C5A059]" />
              </div>

              <h2 className="text-3xl font-display font-extrabold text-[#1B3022] mt-4">
                Muhammad Zeeshan
              </h2>
              <p className="text-xs text-[#63756A] mt-1">
                General Manager & Operations Lead &bull; SK Tea Company
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-[#FAF6EE] border border-[#EADFCF] space-y-1">
                <div className="text-xs text-[#63756A] font-semibold">Official Phone & EasyPaisa Number:</div>
                <div className="text-xl font-extrabold text-[#1B3022]">
                  03449293698
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href="tel:03449293698"
                id="contact-call-gm-btn"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#1B3022] text-[#FDFBF7] font-bold text-xs hover:bg-[#122218] transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 text-[#EAD59A]" />
                <span>Call General Manager (03449293698)</span>
              </a>

              <button
                onClick={onOpenMessageModal}
                id="contact-whatsapp-gm-btn"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp General Manager</span>
              </button>
            </div>
          </div>

        </div>

        {/* Message Management Card */}
        <div className="p-8 rounded-3xl bg-white border border-[#EADFCF] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-bold text-[#1B3022]">
              {t.messageMgmtTitle}
            </h3>
            <p className="text-xs text-[#4A5568] max-w-xl">
              Fill in your shop name and inquiry to immediately connect on WhatsApp with General Manager Muhammad Zeeshan.
            </p>
          </div>

          <button
            onClick={onOpenMessageModal}
            className="shrink-0 flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#1B3022] text-[#FDFBF7] font-bold text-xs hover:bg-[#122218] transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#EAD59A]" />
            <span>Open Message Form</span>
          </button>
        </div>

      </div>
    </section>
  );
};
