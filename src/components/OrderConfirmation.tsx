import React from 'react';
import { Order, LanguageCode } from '../types';
import { translations } from '../utils/translations';
import {
  CheckCircle2,
  Search,
  FileText,
  Printer,
  Phone,
  MessageSquare,
  PlusCircle,
  Sparkles,
  Store,
  MapPin,
  Calendar,
  Wallet,
  Scale,
} from 'lucide-react';

interface OrderConfirmationProps {
  order: Order;
  language: LanguageCode;
  onTrackOrder: (orderId: string) => void;
  onViewBill: (order: Order) => void;
  onOrderMore: () => void;
  onOpenMessageModal: () => void;
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  language,
  onTrackOrder,
  onViewBill,
  onOrderMore,
  onOpenMessageModal,
}) => {
  const t = translations[language];

  const formattedDate = new Date(order.createdAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div id="order-confirmation-view" className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Success Hero Banner */}
      <div className="text-center bg-white rounded-3xl p-8 sm:p-10 border border-[#E7DFD5] shadow-xl relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#1A3D2F] via-[#C69B3D] to-[#1A3D2F]"></div>

        <div className="w-20 h-20 rounded-full bg-[#1A3D2F] text-[#E5C158] mx-auto flex items-center justify-center shadow-lg mb-6 ring-8 ring-[#1A3D2F]/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F2A1E]">
          {t.orderConfirmedTitle}
        </h1>
        <p className="mt-2 text-base text-[#4A5568] max-w-xl mx-auto">
          {t.orderConfirmedMsg}
        </p>

        {/* Highlighted Order ID Box */}
        <div className="mt-6 inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-2xl bg-[#FAF8F5] border border-[#C69B3D]/40">
          <span className="text-xs font-bold uppercase tracking-widest text-[#718096]">
            {t.orderIdLabel}:
          </span>
          <span className="text-2xl sm:text-3xl font-display font-extrabold text-[#1A3D2F] tracking-wider">
            {order.id}
          </span>
          <span className="text-xs px-3 py-1 rounded-full font-bold bg-[#E5C158] text-[#0F2A1E]">
            {order.status}
          </span>
        </div>

        {/* Order Details Summary Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left text-xs bg-[#FAF8F5] p-6 rounded-2xl border border-[#E7DFD5]">
          <div className="space-y-1">
            <div className="text-[#718096] flex items-center gap-1 font-semibold">
              <Store className="w-3.5 h-3.5 text-[#C69B3D]" />
              Customer & Shop:
            </div>
            <div className="font-extrabold text-sm text-[#0F2A1E]">{order.customerName}</div>
            <div className="text-[#1A3D2F] font-bold">{order.shopName}</div>
            <div className="text-[#5C6B64]">{order.mobile}</div>
          </div>

          <div className="space-y-1">
            <div className="text-[#718096] flex items-center gap-1 font-semibold">
              <Scale className="w-3.5 h-3.5 text-[#C69B3D]" />
              Total Quantity:
            </div>
            <div className="font-extrabold text-xl text-[#1A3D2F]">{order.totalKg} KG</div>
            <div className="text-[#5C6B64]">
              125g: {order.items['125g']} | 250g: {order.items['250g']} | 500g: {order.items['500g']} | 1KG: {order.items['1kg']}
            </div>
          </div>

          <div className="space-y-1 sm:col-span-2 lg:col-span-1">
            <div className="text-[#718096] flex items-center gap-1 font-semibold">
              <Wallet className="w-3.5 h-3.5 text-[#C69B3D]" />
              Payment & Destination:
            </div>
            <div className="font-bold text-[#0F2A1E]">
              {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'EasyPaisa (03449293698)'}
            </div>
            <div className="text-[#5C6B64]">{order.city}</div>
            <div className="text-[11px] text-[#718096] truncate">{order.address}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            id="confirmation-track-btn"
            onClick={() => onTrackOrder(order.id)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1A3D2F] text-white font-bold text-xs hover:bg-[#122D22] transition-colors shadow-xs cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#E5C158]" />
            <span>{t.trackOrderBtn}</span>
          </button>

          <button
            id="confirmation-view-bill-btn"
            onClick={() => onViewBill(order)}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-[#D8CBBF] text-[#1A3D2F] font-bold text-xs hover:bg-[#FAF8F5] transition-colors shadow-2xs cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#C69B3D]" />
            <span>{t.viewBillBtn}</span>
          </button>

          <button
            id="confirmation-contact-mgmt-btn"
            onClick={onOpenMessageModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#0F682C] font-bold text-xs transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#25D366]" />
            <span>{t.contactCompanyBtn}</span>
          </button>

          <button
            id="confirmation-order-more-btn"
            onClick={onOrderMore}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7DFD5] text-[#2D3748] font-bold text-xs hover:bg-[#F3EFEA] transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.orderMoreBtn}</span>
          </button>
        </div>

        {/* Quick Hotline Footer Note */}
        <div className="mt-8 pt-6 border-t border-[#E7DFD5] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#718096]">
          <span>Need urgent update? Contact GM Muhammad Zeeshan: <strong>03449293698</strong></span>
          <span>Owner Muhammad Azam: <strong>03318701808</strong></span>
        </div>
      </div>
    </div>
  );
};
