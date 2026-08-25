import React, { useState } from 'react';
import { Order, LanguageCode } from '../types';
import { translations } from '../utils/translations';
import {
  History,
  Search,
  RotateCcw,
  FileText,
  Calendar,
  Scale,
  ShoppingBag,
  ExternalLink,
  Store,
} from 'lucide-react';

interface OrderHistoryProps {
  orders: Order[];
  language: LanguageCode;
  onViewBill: (order: Order) => void;
  onReorder: (order: Order) => void;
  onNavigateOrder: () => void;
  onTrackOrder?: (orderId: string) => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({
  orders,
  language,
  onViewBill,
  onReorder,
  onNavigateOrder,
  onTrackOrder,
}) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) => {
    const q = searchTerm.toLowerCase();
    return (
      o.id.toLowerCase().includes(q) ||
      o.shopName.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.mobile.includes(q)
    );
  });

  return (
    <div id="order-history-page" className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1A3D2F]/10 text-[#1A3D2F] text-xs font-bold uppercase tracking-wider mb-2">
              <History className="w-3.5 h-3.5 text-[#C69B3D]" />
              Account Records
            </div>
            <h1 className="text-3xl font-display font-extrabold text-[#0F2A1E]">
              {t.historyTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#4A5568] mt-1">
              {t.historySubtitle}
            </p>
          </div>

          <button
            onClick={onNavigateOrder}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1A3D2F] text-white font-bold text-xs hover:bg-[#122D22] transition-all shadow-xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
            <span>Place New Order</span>
          </button>
        </div>

        {/* Search Bar */}
        {orders.length > 0 && (
          <div className="relative mb-6">
            <Search className="w-4 h-4 text-[#718096] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.searchHistoryPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E7DFD5] text-xs sm:text-sm text-[#0F2A1E] focus:outline-hidden focus:border-[#1A3D2F] shadow-2xs"
            />
          </div>
        )}

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#E7DFD5] shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#A0AEC0] mx-auto flex items-center justify-center">
              <History className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0F2A1E]">
              {orders.length === 0 ? t.noOrdersYet : 'No matching orders found.'}
            </h3>
            <p className="text-xs text-[#718096] max-w-sm mx-auto">
              Select your required pack sizes (125g, 250g, 500g, 1KG) to place your first tea booking.
            </p>
            <button
              onClick={onNavigateOrder}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A3D2F] text-white font-bold text-xs hover:bg-[#122D22] transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-[#E5C158]" />
              <span>Book Tea Now</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={order.id}
                  id={`history-order-${order.id}`}
                  className="p-6 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-lg font-display font-extrabold text-[#0F2A1E]">
                        {order.id}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-[#1A3D2F]/10 text-[#1A3D2F]'
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs text-[#718096] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formattedDate}
                      </span>
                    </div>

                    <div className="text-xs text-[#4A5568]">
                      <span className="font-bold text-[#0F2A1E]">{order.shopName}</span> &bull; {order.customerName} ({order.city})
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                      <span className="font-extrabold text-[#1A3D2F] bg-[#FAF8F5] px-2.5 py-1 rounded-lg border border-[#E7DFD5]">
                        Total: {order.totalKg} KG
                      </span>
                      <span className="text-[#718096]">
                        125g: {order.items['125g']} | 250g: {order.items['250g']} | 500g: {order.items['500g']} | 1KG: {order.items['1kg']}
                      </span>
                      <span className="text-[11px] text-[#5C6B64] font-medium">
                        &bull; {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'EasyPaisa'}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto shrink-0">
                    {onTrackOrder && (
                      <button
                        onClick={() => onTrackOrder(order.id)}
                        id={`history-track-${order.id}`}
                        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#C5A059]/40 bg-[#FAF8F5] hover:bg-[#FAF6EE] text-[#1A3D2F] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                        title="View live status and tracking"
                      >
                        <Search className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{t.navTrack || 'Track'}</span>
                      </button>
                    )}

                    <button
                      onClick={() => onViewBill(order)}
                      id={`history-view-bill-${order.id}`}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-[#D8CBBF] bg-[#FAF8F5] hover:bg-white text-[#1A3D2F] font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#C69B3D]" />
                      <span>{t.viewDetailsBtn}</span>
                    </button>

                    <button
                      onClick={() => onReorder(order)}
                      id={`history-reorder-${order.id}`}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#1A3D2F] hover:bg-[#122D22] text-white font-bold text-xs transition-colors shadow-2xs cursor-pointer"
                      title="Add these items to your cart and place order again"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#E5C158]" />
                      <span>{t.reorderBtn}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
