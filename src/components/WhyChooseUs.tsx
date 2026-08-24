import React from 'react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Headphones,
  Truck,
  CheckCircle,
} from 'lucide-react';

interface WhyChooseUsProps {
  language: LanguageCode;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ language }) => {
  const t = translations[language];

  const features = [
    {
      id: 'feature-quality',
      title: t.featureQualityTitle,
      description: t.featureQualityDesc,
      icon: Sparkles,
      tag: 'Pure Karak Blend',
    },
    {
      id: 'feature-service',
      title: t.featureServiceTitle,
      description: t.featureServiceDesc,
      icon: ShieldCheck,
      tag: '100% Reliable',
    },
    {
      id: 'feature-easy',
      title: t.featureEasyTitle,
      description: t.featureEasyDesc,
      icon: Zap,
      tag: 'Instant Setup',
    },
    {
      id: 'feature-support',
      title: t.featureSupportTitle,
      description: t.featureSupportDesc,
      icon: Headphones,
      tag: 'Direct Management',
    },
    {
      id: 'feature-delivery',
      title: t.featureDeliveryTitle,
      description: t.featureDeliveryDesc,
      icon: Truck,
      tag: 'COD & EasyPaisa',
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1B3022]/10 text-[#1B3022] text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-[#1B3022]">
            {t.whyChooseHeading}
          </h2>
          <p className="mt-3 text-base text-[#4A5568]">
            {t.whyChooseSubheading}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                id={`feature-card-${idx}`}
                className={`p-6 sm:p-7 rounded-3xl bg-white border border-[#EADFCF] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
                  idx === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-[#EADFCF] text-[#1B3022] flex items-center justify-center group-hover:bg-[#1B3022] group-hover:text-[#EAD59A] transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FAF6EE] text-[#1B3022] border border-[#EADFCF]/60">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1B3022] mb-2 font-display">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#FAF6EE] flex items-center text-xs font-semibold text-[#C5A059]">
                  <span>SK Tea Standard Assurance &bull; Verified Quality</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
