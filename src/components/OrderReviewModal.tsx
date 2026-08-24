import React from 'react';
import { LanguageCode, OrderItemQuantities, PaymentMethod } from '../types';
import { translations, PACK_CONFIGS } from '../utils/translations';
import { Logo } from './Logo';
import {
  X,
  Edit3,
  CheckCircle,
  FileText,
  User,
  Store,
  Phone,
  MapPin,
  Calendar,
  Wallet,
  Scale,
  Sparkles,
} from 'lucide-react';

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  language: LanguageCode;
  customerName: string;
  shopName: string;
  mobile: string;
  address: string;
  city: string;
  notes: string;
  quantities: OrderItemQuantities;
  paymentMethod: PaymentMethod;
  isSubmitting: boolean;
}

export const OrderReviewModal: React.FC<OrderReviewModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  language,
  customerName,
  shopName,
  mobile,
  address,
  city,
  notes,
  quantities,
  paymentMethod,
  isSubmitting,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const totalKg = Number(
    (
      quantities['125g'] * 0.125 +
      quantities['250g'] * 0.25 +
      quantities['500g'] * 0.5 +
      quantities['1kg'] * 1.0
    ).toFixed(3)
  );

  const selectedPacks = PACK_CONFIGS.filter(
    (p) => quantities[p.key] > 0
  ).map((p) => ({
    ...p,
    qty: quantities[p.key],
    subtotalKg: Number((quantities[p.key] * p.weightInKg).toFixed(3)),
  }));

  const orderDateFormatted = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div
      id="order-review-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="order-review-modal-card"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#E7DFD5] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1A3D2F] via-[#163629] to-[#0F2A1E] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo variant="light" size="sm" />
            </div>

            <button
              onClick={onClose}
              id="close-review-modal-btn"
              disabled={isSubmitting}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <h2 className="text-2xl font-display font-extrabold text-white">
              {t.orderReviewTitle}
            </h2>
            <p className="text-xs text-white/80 mt-0.5">
              {t.orderReviewSubtitle}
            </p>
          </div>
        </div>

        {/* Modal Content / Order Bill Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto bg-[#FAF8F5]">
          
          {/* Customer & Shop Details Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3EFEA]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F] flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#C69B3D]" />
                {t.customerDetailsHeading}
              </span>
              <span className="text-[11px] text-[#718096] flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {orderDateFormatted}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-[#5C6B64] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[#718096]">Customer / Shopkeeper:</div>
                  <div className="font-bold text-[#0F2A1E] text-sm">{customerName}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Store className="w-4 h-4 text-[#5C6B64] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[#718096]">Shop / Business:</div>
                  <div className="font-bold text-[#0F2A1E] text-sm">{shopName}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#5C6B64] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[#718096]">Mobile Contact:</div>
                  <div className="font-bold text-[#0F2A1E]">{mobile}</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#5C6B64] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[#718096]">Delivery City / Area:</div>
                  <div className="font-bold text-[#0F2A1E]">{city}</div>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-start gap-2 pt-1 border-t border-[#F3EFEA]">
                <MapPin className="w-4 h-4 text-[#5C6B64] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[#718096]">Complete Address:</div>
                  <div className="font-medium text-[#0F2A1E]">{address}</div>
                </div>
              </div>

              {notes && (
                <div className="sm:col-span-2 flex items-start gap-2 pt-1 text-[#4A5568] bg-[#FAF8F5] p-2 rounded-lg border border-[#E7DFD5]">
                  <FileText className="w-4 h-4 text-[#C69B3D] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-[#1A3D2F]">Special Notes: </span>
                    <span className="text-xs">{notes}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tea Packs Breakdown Table */}
          <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#F3EFEA]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1A3D2F] flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#C69B3D]" />
                {t.orderDetailsHeading}
              </span>
              <span className="text-xs font-extrabold text-[#C69B3D]">
                SK Tea Standard Blend
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E7DFD5] text-[#718096]">
                    <th className="py-2 font-bold">Pack Size</th>
                    <th className="py-2 text-center font-bold">Unit Weight</th>
                    <th className="py-2 text-center font-bold">Quantity</th>
                    <th className="py-2 text-right font-bold">Total Weight (KG)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3EFEA]">
                  {selectedPacks.map((item) => (
                    <tr key={item.key} className="text-[#0F2A1E]">
                      <td className="py-2.5 font-bold">{item.label}</td>
                      <td className="py-2.5 text-center text-[#5C6B64]">{item.weightInKg} KG</td>
                      <td className="py-2.5 text-center font-extrabold text-[#1A3D2F]">
                        {item.qty} packs
                      </td>
                      <td className="py-2.5 text-right font-bold text-[#0F2A1E]">
                        {item.subtotalKg} KG
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[#1A3D2F] font-bold text-sm bg-[#FAF8F5]">
                    <td colSpan={3} className="py-3 px-2 text-[#0F2A1E] font-display">
                      TOTAL TEA QUANTITY
                    </td>
                    <td className="py-3 px-2 text-right text-[#1A3D2F] text-base font-extrabold">
                      {totalKg} KG
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Payment Method Badge */}
          <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#1A3D2F]/10 text-[#1A3D2F]">
                <Wallet className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-[#718096] font-semibold">Payment Mode:</div>
                <div className="text-sm font-extrabold text-[#0F2A1E]">
                  {paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'EasyPaisa to General Manager (03449293698)'}
                </div>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E5C158]/20 text-[#997220] border border-[#C69B3D]/30">
              Verified
            </span>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E7DFD5] flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            id="review-modal-edit-btn"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#D8CBBF] text-[#1A3D2F] font-bold text-sm hover:bg-[#F3EFEA] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>{t.editOrderBtn}</span>
          </button>

          <button
            id="review-modal-confirm-btn"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#1A3D2F] to-[#0F2A1E] text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:from-[#122D22] hover:to-[#0A1A14] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing Order...
              </span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-[#E5C158]" />
                <span>{t.confirmOrderBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
