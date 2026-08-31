import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  ShoppingBag,
  CreditCard,
  Phone,
  Search,
  CheckCircle,
} from 'lucide-react';

interface FAQsPageProps {
  language: LanguageCode;
  onNavigateOrder: () => void;
  onOpenMessageModal: () => void;
}

export const FAQsPage: React.FC<FAQsPageProps> = ({
  language,
  onNavigateOrder,
  onOpenMessageModal,
}) => {
  const t = translations[language];
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      q: 'What pack sizes are available?',
      a: 'SK Tea Company offers 4 official standard pack sizes: 125g, 250g, 500g, and 1 KG. You can order any single pack size or combine multiple sizes in one booking.',
      icon: Scale,
    },
    {
      q: 'How can I place an order?',
      a: 'Simply go to the Order section, choose the quantities for each pack size you need, enter your shop/customer and delivery details, review your instant bill, and confirm your order.',
      icon: ShoppingBag,
    },
    {
      q: 'What payment methods are available?',
      a: 'We accept Cash on Delivery (COD) when the tea arrives at your shop/home, and EasyPaisa payments directly to the General Manager account.',
      icon: CreditCard,
    },
    {
      q: 'What is the EasyPaisa number?',
      a: 'The official EasyPaisa account number is 03327223733 registered under General Manager Muhammad Zeeshan.',
      icon: Phone,
    },
    {
      q: 'Can I order different pack sizes together?',
      a: 'Yes, absolutely! Customers can select different quantities for 125g, 250g, 500g, and 1 KG packs in the same order. Total tea weight (KG) will be automatically calculated.',
      icon: CheckCircle,
    },
    {
      q: 'How can I track my order?',
      a: 'Use the Track Order page and enter your unique Order ID (e.g. SKT-000101) to view real-time status: Order Received -> Confirmed -> Processing -> Out for Delivery -> Delivered.',
      icon: Search,
    },
    {
      q: 'How can I contact SK Tea Company?',
      a: 'You can directly call Owner Muhammad Azam (03318701808), call or WhatsApp General Manager Muhammad Zeeshan (03449293698), or use our direct management message form.',
      icon: Phone,
    },
  ];

  return (
    <div id="faqs-page" className="py-12 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B3022]/10 text-[#1B3022] text-xs font-bold uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            Frequently Asked Questions
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B3022]">
            {t.faqsTitle}
          </h1>
          <p className="mt-2 text-sm text-[#4A5568]">
            {t.faqsSubtitle}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;

            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className="rounded-2xl bg-white border border-[#EADFCF] shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF6EE] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FAF6EE] border border-[#EADFCF] text-[#1B3022] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#C5A059]" />
                    </div>
                    <span className="font-extrabold text-sm sm:text-base text-[#1B3022]">
                      {faq.q}
                    </span>
                  </div>

                  <div className="p-1 rounded-lg bg-[#FAF6EE] text-[#1B3022] shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#4A5568] leading-relaxed border-t border-[#FAF6EE] bg-[#FDFBF7]/50 animate-in fade-in duration-150">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EADFCF] shadow-xs text-center space-y-4">
          <h3 className="text-xl font-display font-bold text-[#1B3022]">
            Still have a question or need bulk wholesale rates?
          </h3>
          <p className="text-xs text-[#63756A] max-w-lg mx-auto">
            Contact General Manager Muhammad Zeeshan directly via WhatsApp or phone.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenMessageModal}
              className="px-6 py-3 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#0F682C] font-bold text-xs transition-colors cursor-pointer"
            >
              Send WhatsApp Message (03449293698)
            </button>
            <button
              onClick={onNavigateOrder}
              className="px-6 py-3 rounded-xl bg-[#1B3022] text-[#FDFBF7] font-bold text-xs hover:bg-[#122218] transition-colors cursor-pointer"
            >
              Place Tea Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
