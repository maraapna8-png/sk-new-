import React, { useState } from 'react';
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
  Star,
  Quote,
  Store,
  MapPin,
} from 'lucide-react';

interface AboutPageProps {
  language: LanguageCode;
  onNavigateOrder: () => void;
  onOpenMessageModal: () => void;
}

interface CustomerReview {
  id: string;
  name: string;
  role: string;
  shopName: string;
  city: string;
  rating: number;
  date: string;
  comment: {
    'simple-english': string;
    'roman-english': string;
    'urdu': string;
  };
  highlight: {
    'simple-english': string;
    'roman-english': string;
    'urdu': string;
  };
  verifiedOrder: string;
  favoritePack: string;
}

const customerReviews: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'Muhammad Aslam',
    role: 'Wholesale Retailer',
    shopName: 'Al-Madina General Store',
    city: 'Gujranwala',
    rating: 5,
    date: 'August 2026',
    comment: {
      'simple-english': 'We have been ordering 250g and 500g packs for our retail store for over 8 months. The tea aroma and color are consistently rich, and customer demand keeps growing. Fast delivery by GM Zeeshan every time.',
      'roman-english': 'Hum pichlay 8 maheenay se apni dukan ke liye 250g aur 500g packs mangwa rahe hain. Patti ka rang aur khushbu lajawab hai aur gahak bar bar mangte hain. GM Zeeshan ki taraf se delivery hamesha waqt par hoti hai.',
      'urdu': 'ہم پچھلے ۸ ماہ سے اپنی دکان کے لیے ۲۵۰ گرام اور ۵۰۰ گرام کے پیکس منگوا رہے ہیں۔ چائے کی رنگت اور خوشبو کمال کی ہے اور گاہک بار بار تقاضا کرتے ہیں۔ جی ایم ذیشان کی سروس اور بروقت ڈیلیوری قابلِ تعریف ہے۔',
    },
    highlight: {
      'simple-english': 'Consistent Color & High Customer Demand',
      'roman-english': 'Lajawab Rang aur Ziyada Demand',
      'urdu': 'شاندار رنگت اور گاہکوں کا بھرپور اعتماد',
    },
    verifiedOrder: 'Verified 4.5 KG Weekly Order',
    favoritePack: '250g & 500g Packs',
  },
  {
    id: 'rev-2',
    name: 'Tariq Mehmood',
    role: 'Tea Stall & Cafe Owner',
    shopName: 'Tariq Chai & Cafe Point',
    city: 'Lahore (Anarkali)',
    rating: 5,
    date: 'August 2026',
    comment: {
      'simple-english': 'For a busy tea stall, consistency and brisk brew strength are everything. SK Tea 1 KG master pack gives a rich kadak cup with less patti usage. Muhammad Azam and Zeeshan always treat us with immense respect.',
      'roman-english': 'Hotel aur tea stall ke liye sab se zaroori cheez kadak zaiqa aur patti ki bachat hai. SK Tea ke 1 KG master pack se bohot zabardast kadak chai banti hai. Azam Bhai aur Zeeshan Bhai ka akhlaaq bohot aala hai.',
      'urdu': 'ہوٹل اور چائے کی دکان کے لیے کڑک ذائقہ اور بچت سب سے اہم ہے۔ ایس کے ٹی کے ۱ کلو پیک سے انتہائی شاندار کڑک چائے بنتی ہے اور پتی بھی کم خرچ ہوتی ہے۔ مینیجمنٹ کا رویہ اور اخلاق بہت اعلیٰ ہے۔',
    },
    highlight: {
      'simple-english': 'Rich Kadak Taste with Less Leaf Consumption',
      'roman-english': 'Beshumar Kadak Zaiqa aur Bachat',
      'urdu': 'کڑک ذائقہ اور ہوٹل کے لیے بہترین بچت',
    },
    verifiedOrder: 'Verified 7.5 KG Commercial Order',
    favoritePack: '1 KG Master Pack',
  },
  {
    id: 'rev-3',
    name: 'Haji Abdul Razzaq',
    role: 'Senior Trader',
    shopName: 'Razzaq Tea Traders',
    city: 'Rawalpindi (Raja Bazar)',
    rating: 5,
    date: 'July 2026',
    comment: {
      'simple-english': 'Accurate weight packaging and clean blending. The 125g mini packs sell very quickly over the counter for local households. EasyPaisa payment and invoice billing is completely transparent.',
      'roman-english': 'Packaging ka wazan pura hai aur patti bilkul saaf hai. 125g ke chotay packs counter par aatay hi bohot tezi se bikte hain. EasyPaisa payment aur bill system bohot asaan aur saaf suthra hai.',
      'urdu': 'پیکنگ کا وزن مکمل پورا ہے اور پتی بالکل صاف ستھری ہے۔ ۱۲۵ گرام والے چھوٹے پیکس کاؤنٹر پر آتے ہی ہاتھوں ہاتھ فروخت ہو جاتے ہیں۔ بلنگ اور ایزی پیسہ سسٹم بہت شفاف ہے۔',
    },
    highlight: {
      'simple-english': 'Accurate Pack Weights & Fast Counter Sales',
      'roman-english': 'Pura Wazan aur Tez Counter Sale',
      'urdu': 'پورا وزن اور کاؤنٹر پر فوری فروخت',
    },
    verifiedOrder: 'Verified 6 KG Regular Order',
    favoritePack: '125g & 250g Packs',
  },
  {
    id: 'rev-4',
    name: 'Kashif Ali',
    role: 'Grocery Store Manager',
    shopName: 'Bismillah Kiryana Store',
    city: 'Sialkot',
    rating: 5,
    date: 'August 2026',
    comment: {
      'simple-english': 'Ordering through their online portal takes less than a minute. Cash on delivery gives us complete peace of mind. Truly a trusted tea brand for commercial shopkeepers.',
      'roman-english': 'Online portal se order karna ek minute se bhi kam waqt leta hai. Cash on Delivery ki wajah se koi pareshani nahi hoti. Dukandaron ke liye waqai aik bharosemand brand hai.',
      'urdu': 'آن لائن پورٹل سے آرڈر کرنا ایک منٹ سے بھی کم وقت لیتا ہے۔ کیش آن ڈیلیوری کی سہولت سے مکمل اطمینان رہتا ہے۔ دکانداروں کے لیے واقعی ایک قابلِ اعتماد برانڈ ہے۔',
    },
    highlight: {
      'simple-english': 'Instant 1-Minute Booking & Cash on Delivery',
      'roman-english': 'Asaan Booking aur COD Sahoolat',
      'urdu': 'آسان بکنگ اور کیش آن ڈیلیوری',
    },
    verifiedOrder: 'Verified 2.5 KG Order',
    favoritePack: '250g & 500g Packs',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({
  language,
  onNavigateOrder,
  onOpenMessageModal,
}) => {
  const t = translations[language];
  const [activeCityFilter, setActiveCityFilter] = useState<string>('all');

  const filteredReviews = activeCityFilter === 'all'
    ? customerReviews
    : customerReviews.filter((r) => r.city.toLowerCase().includes(activeCityFilter.toLowerCase()));

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

        {/* Verified Customer & Shopkeeper Reviews Section */}
        <div id="reviews-section" className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#8C6D27] text-xs font-bold uppercase tracking-wider mb-2">
                <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                {language === 'urdu'
                  ? 'گاہکوں اور دکانداروں کی آراء'
                  : language === 'roman-english'
                  ? 'Gahakon aur Dukandaron ke Reviews'
                  : 'Customer & Shopkeeper Reviews'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#1B3022]">
                {language === 'urdu'
                  ? 'ہماری چائے اور سروس پر اعتماد'
                  : language === 'roman-english'
                  ? 'Bharosemand Dukandaron ke Asal Tassurat'
                  : 'Trusted by Shopkeepers Across Pakistan'}
              </h2>
              <p className="text-xs sm:text-sm text-[#63756A] mt-1">
                {language === 'urdu'
                  ? 'پنجاب اور خیبر پختونخوا کے مختلف شہروں سے تصدیق شدہ دکانداروں اور ہوٹل مالکان کے حقیقی تاثرات۔'
                  : language === 'roman-english'
                  ? 'Punjab aur mukhtalif shehron ke verified dukandaron aur hotel owners ke real reviews.'
                  : 'Real feedback and verified experiences from general stores, tea stalls, and retail shop owners.'}
              </p>
            </div>

            {/* Overall Rating Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#EADFCF] shadow-xs shrink-0">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-extrabold text-[#1B3022]">5.0 / 5.0</span>{' '}
                <span className="text-[#63756A]">(100% Recommended)</span>
              </div>
            </div>
          </div>

          {/* City Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-[#63756A] mr-1">
              {language === 'urdu' ? 'شہر منتخب کریں:' : 'Filter by City:'}
            </span>
            {[
              { key: 'all', label: language === 'urdu' ? 'تمام شہر (All)' : 'All Cities' },
              { key: 'Gujranwala', label: 'Gujranwala' },
              { key: 'Lahore', label: 'Lahore' },
              { key: 'Rawalpindi', label: 'Rawalpindi' },
              { key: 'Sialkot', label: 'Sialkot' },
            ].map((city) => (
              <button
                key={city.key}
                onClick={() => setActiveCityFilter(city.key)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCityFilter === city.key
                    ? 'bg-[#1B3022] text-[#EAD59A] shadow-xs'
                    : 'bg-white text-[#63756A] border border-[#EADFCF] hover:bg-[#FAF6EE]'
                }`}
              >
                {city.label}
              </button>
            ))}
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EADFCF] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1B3022] via-[#C5A059] to-[#1B3022]" />

                <div className="space-y-3">
                  {/* Top Bar: Stars + Verified Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                      ))}
                      <span className="text-xs font-bold text-[#1B3022] ml-1.5">5.0</span>
                    </div>

                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      {rev.verifiedOrder}
                    </div>
                  </div>

                  {/* Highlight Quote */}
                  <div className="flex items-start gap-2">
                    <Quote className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <h4 className="text-sm font-display font-extrabold text-[#1B3022]">
                      "{rev.highlight[language] || rev.highlight['roman-english']}"
                    </h4>
                  </div>

                  {/* Comment Body */}
                  <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed pl-6">
                    {rev.comment[language] || rev.comment['roman-english']}
                  </p>
                </div>

                {/* Reviewer Details Footer */}
                <div className="pt-4 border-t border-[#EADFCF] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#FAF6EE] border border-[#EADFCF] text-[#1B3022] flex items-center justify-center font-display font-extrabold text-sm shrink-0">
                      {rev.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-[#1B3022] flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        <span className="text-[10px] font-normal text-[#63756A] hidden sm:inline">
                          ({rev.role})
                        </span>
                      </div>
                      <div className="text-[11px] text-[#63756A] flex items-center gap-1.5 mt-0.5">
                        <Store className="w-3 h-3 text-[#C5A059]" />
                        <span>{rev.shopName}</span>
                        <span>&bull;</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-[#63756A]" />
                          {rev.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-[#8C6D27] bg-[#FAF6EE] px-2.5 py-1 rounded-lg border border-[#EADFCF] block">
                      {rev.favoritePack}
                    </span>
                    <span className="text-[9px] text-[#A0AEC0] mt-1 block">
                      {rev.date}
                    </span>
                  </div>
                </div>

              </div>
            ))}
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
