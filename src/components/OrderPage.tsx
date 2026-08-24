import React, { useState } from 'react';
import {
  LanguageCode,
  OrderItemQuantities,
  PaymentMethod,
  PackSizeKey,
  Order,
} from '../types';
import { translations, PACK_CONFIGS } from '../utils/translations';
import { OrderReviewModal } from './OrderReviewModal';
import {
  Minus,
  Plus,
  ShoppingBag,
  Store,
  User,
  Phone,
  MapPin,
  FileText,
  Wallet,
  AlertCircle,
  RotateCcw,
  Sparkles,
  Scale,
  Check,
} from 'lucide-react';

interface OrderPageProps {
  language: LanguageCode;
  quantities: OrderItemQuantities;
  onUpdateQuantity: (pack: PackSizeKey, delta: number) => void;
  onSetQuantity: (pack: PackSizeKey, count: number) => void;
  onResetQuantities: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const OrderPage: React.FC<OrderPageProps> = ({
  language,
  quantities,
  onUpdateQuantity,
  onSetQuantity,
  onResetQuantities,
  onOrderSuccess,
}) => {
  const t = translations[language];

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [shopName, setShopName] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');

  // UI / Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto total calculation
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

  const validateForm = (): boolean => {
    setErrorMessage(null);

    if (totalKg <= 0) {
      setErrorMessage(t.selectAtLeastOnePackAlert);
      return false;
    }

    if (!customerName.trim()) {
      setErrorMessage('Please enter your Customer / Shopkeeper Name.');
      return false;
    }

    if (!shopName.trim()) {
      setErrorMessage('Please enter your Shop or Business Name.');
      return false;
    }

    const cleanPhone = mobile.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid Mobile Phone Number (at least 10-11 digits).');
      return false;
    }

    if (!address.trim()) {
      setErrorMessage('Please enter your complete delivery address.');
      return false;
    }

    if (!city.trim()) {
      setErrorMessage('Please enter your City or Area name.');
      return false;
    }

    return true;
  };

  const handleOpenReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsReviewOpen(true);
    }
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          shopName: shopName.trim(),
          mobile: mobile.trim(),
          address: address.trim(),
          city: city.trim(),
          notes: notes.trim() || undefined,
          items: quantities,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order. Please try again.');
      }

      setIsReviewOpen(false);
      onOrderSuccess(data.order);
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred. Please check connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="order-page" className="py-10 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1A3D2F]/10 text-[#1A3D2F] text-xs font-bold uppercase tracking-wider mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-[#C69B3D]" />
            Official Booking
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F2A1E]">
            {t.orderPageTitle}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#4A5568]">
            {t.orderPageSubtitle}
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div
            id="order-error-banner"
            className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleOpenReview} className="space-y-10">
          
          {/* STEP 1: Pack Sizes & Quantities */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#F3EFEA] mb-6">
              <div>
                <h2 className="text-xl font-display font-extrabold text-[#0F2A1E]">
                  {t.step1Heading}
                </h2>
                <p className="text-xs text-[#718096]">
                  Select the number of packs for each size. You can combine any sizes.
                </p>
              </div>

              {totalPacks > 0 && (
                <button
                  type="button"
                  onClick={onResetQuantities}
                  className="flex items-center gap-1.5 text-xs text-[#718096] hover:text-red-600 transition-colors font-medium px-3 py-1.5 rounded-lg border border-[#E7DFD5] bg-[#FAF8F5]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.clearSelectionBtn}</span>
                </button>
              )}
            </div>

            {/* Grid of 4 Pack Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PACK_CONFIGS.map((pack) => {
                const qty = quantities[pack.key];
                const subWeight = Number((qty * pack.weightInKg).toFixed(3));

                return (
                  <div
                    key={pack.key}
                    className={`p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                      qty > 0
                        ? 'bg-[#FAF8F5] border-[#1A3D2F] ring-1 ring-[#1A3D2F]/20'
                        : 'bg-white border-[#E7DFD5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-base text-[#0F2A1E] font-display">
                          {pack.label}
                        </span>
                        <span className="text-[11px] font-bold text-[#5C6B64] bg-white px-2 py-0.5 rounded border border-[#E7DFD5]">
                          {pack.weightInKg} KG
                        </span>
                      </div>
                      <div className="text-[11px] text-[#718096] mt-1">
                        {pack.recommendedFor}
                      </div>
                    </div>

                    {/* Quantity Selector Control */}
                    <div className="mt-4 pt-3 border-t border-[#E7DFD5] flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(pack.key, -1)}
                        disabled={qty === 0}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1A3D2F] bg-white border border-[#D8CBBF] hover:bg-[#F3EFEA] disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="font-extrabold text-base text-[#0F2A1E]">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(pack.key, 1)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#1A3D2F] text-white hover:bg-[#122D22] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {qty > 0 && (
                      <div className="mt-2 text-center text-[11px] font-bold text-[#1A3D2F]">
                        = {subWeight} KG
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Live Calculation Bar */}
            <div className="mt-6 p-5 rounded-2xl bg-[#0F2A1E] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5C158] text-[#0F2A1E] flex items-center justify-center font-extrabold">
                  <Scale className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#E5C158] font-bold">
                    {t.totalTeaWeight}
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {totalKg} <span className="text-lg font-normal text-[#E5C158]">{t.kgUnit}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-white/80 text-center sm:text-right">
                {totalPacks > 0 ? (
                  <span>
                    <strong>{totalPacks} packs</strong> selected in total
                  </span>
                ) : (
                  <span className="text-[#E5C158]">Please select pack quantities</span>
                )}
              </div>
            </div>
          </div>

          {/* STEP 2: Customer / Shop Details Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs space-y-6">
            <div className="pb-4 border-b border-[#F3EFEA]">
              <h2 className="text-xl font-display font-extrabold text-[#0F2A1E]">
                {t.step2Heading}
              </h2>
              <p className="text-xs text-[#718096]">
                Provide your shop and delivery details for accurate packaging and dispatch.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Customer Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>{t.customerNameLabel} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t.customerNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8CBBF] bg-white text-xs sm:text-sm font-medium text-[#0F2A1E] focus:border-[#1A3D2F] focus:ring-2 focus:ring-[#1A3D2F]/10 focus:outline-hidden transition-all"
                />
              </div>

              {/* Shop Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>{t.shopNameLabel} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder={t.shopNamePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8CBBF] bg-white text-xs sm:text-sm font-medium text-[#0F2A1E] focus:border-[#1A3D2F] focus:ring-2 focus:ring-[#1A3D2F]/10 focus:outline-hidden transition-all"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>{t.mobileLabel} *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder={t.mobilePlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8CBBF] bg-white text-xs sm:text-sm font-medium text-[#0F2A1E] focus:border-[#1A3D2F] focus:ring-2 focus:ring-[#1A3D2F]/10 focus:outline-hidden transition-all"
                />
              </div>

              {/* City / Area */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>{t.cityLabel} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={t.cityPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8CBBF] bg-white text-xs sm:text-sm font-medium text-[#0F2A1E] focus:border-[#1A3D2F] focus:ring-2 focus:ring-[#1A3D2F]/10 focus:outline-hidden transition-all"
                />
              </div>

              {/* Complete Address */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>{t.addressLabel} *</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.addressPlaceholder}
                  className="w-full px-4 py-3 rounded-xl border border-[#D8CBBF] bg-white text-xs sm:text-sm font-medium text-[#0F2A1E] focus:border-[#1A3D2F] focus:ring-2 focus:ring-[#1A3D2F]/10 focus:outline-hidden transition-all"
                />
              </div>

              {/* Notes */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>{t.notesLabel}</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.notesPlaceholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#D8CBBF] bg-white text-xs sm:text-sm font-medium text-[#0F2A1E] focus:border-[#1A3D2F] focus:ring-2 focus:ring-[#1A3D2F]/10 focus:outline-hidden transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* STEP 3: Payment Method (COD vs EasyPaisa ONLY) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs space-y-6">
            <div className="pb-4 border-b border-[#F3EFEA]">
              <h2 className="text-xl font-display font-extrabold text-[#0F2A1E]">
                {t.step3Heading}
              </h2>
              <p className="text-xs text-[#718096]">
                Only official verified payment channels are accepted.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* COD Option */}
              <label
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  paymentMethod === 'COD'
                    ? 'bg-[#FAF8F5] border-[#1A3D2F] ring-2 ring-[#1A3D2F]/10'
                    : 'bg-white border-[#E7DFD5] hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mt-1 accent-[#1A3D2F] w-4 h-4"
                />
                <div className="space-y-1">
                  <div className="font-extrabold text-sm text-[#0F2A1E]">
                    {t.codTitle}
                  </div>
                  <div className="text-xs text-[#4A5568]">
                    {t.codDesc}
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A3D2F]/10 text-[#1A3D2F]">
                    Most Popular for Shops
                  </span>
                </div>
              </label>

              {/* EasyPaisa Option */}
              <label
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex items-start gap-4 ${
                  paymentMethod === 'EasyPaisa'
                    ? 'bg-[#FAF8F5] border-[#1A3D2F] ring-2 ring-[#1A3D2F]/10'
                    : 'bg-white border-[#E7DFD5] hover:bg-[#FAF8F5]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="EasyPaisa"
                  checked={paymentMethod === 'EasyPaisa'}
                  onChange={() => setPaymentMethod('EasyPaisa')}
                  className="mt-1 accent-[#1A3D2F] w-4 h-4"
                />
                <div className="space-y-1">
                  <div className="font-extrabold text-sm text-[#0F2A1E]">
                    {t.easyPaisaTitle}
                  </div>
                  <div className="text-xs text-[#4A5568]">
                    {t.easyPaisaDesc}
                  </div>
                  <div className="mt-2 p-2 rounded-lg bg-green-50 border border-green-200 text-xs font-bold text-green-900">
                    {t.easyPaisaNumberInfo}
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submission / Review Button */}
          <div className="p-6 rounded-3xl bg-white border border-[#E7DFD5] shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#718096] uppercase tracking-wider font-bold">
                Order Summary
              </div>
              <div className="text-lg font-extrabold text-[#0F2A1E]">
                Total Weight: <span className="text-[#1A3D2F]">{totalKg} KG</span> &bull; {totalPacks} Packs
              </div>
            </div>

            <button
              type="submit"
              id="order-page-review-btn"
              disabled={totalKg <= 0}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl bg-gradient-to-r from-[#1A3D2F] via-[#163629] to-[#0F2A1E] text-white font-extrabold text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <FileText className="w-5 h-5 text-[#E5C158]" />
              <span>{t.reviewOrderBtn}</span>
            </button>
          </div>

        </form>
      </div>

      {/* Review Modal Dialog */}
      <OrderReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onConfirm={handleConfirmOrder}
        language={language}
        customerName={customerName}
        shopName={shopName}
        mobile={mobile}
        address={address}
        city={city}
        notes={notes}
        quantities={quantities}
        paymentMethod={paymentMethod}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
