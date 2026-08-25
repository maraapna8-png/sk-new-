import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, LanguageCode } from '../types';
import { translations } from '../utils/translations';
import { findOrderByIdOrPhone } from '../utils/dataStore';
import {
  Search,
  CheckCircle,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  FileText,
  MessageSquare,
  AlertCircle,
  Store,
  MapPin,
  Calendar,
  Wallet,
  Phone,
  Scale,
} from 'lucide-react';

interface OrderTrackerProps {
  language: LanguageCode;
  initialOrderId?: string;
  onViewBill: (order: Order) => void;
  onOpenMessageModal: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  language,
  initialOrderId = '',
  onViewBill,
  onOpenMessageModal,
}) => {
  const t = translations[language];

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchOrder = async (idToSearch: string) => {
    const cleanId = idToSearch.trim();
    if (!cleanId) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const foundOrder = await findOrderByIdOrPhone(cleanId);

      if (!foundOrder) {
        throw new Error(t.notFoundAlert);
      }

      setOrder(foundOrder);
    } catch (err: any) {
      setOrder(null);
      setErrorMessage(err.message || t.notFoundAlert);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderId) {
      setOrderIdInput(initialOrderId);
      fetchOrder(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderIdInput);
  };

  const timelineSteps: { key: OrderStatus; label: string; icon: any }[] = [
    { key: 'New', label: t.orderReceived, icon: Clock },
    { key: 'Confirmed', label: t.orderConfirmed, icon: CheckCircle },
    { key: 'Processing', label: t.orderProcessing, icon: PackageCheck },
    { key: 'Out for Delivery', label: t.orderOutForDelivery, icon: Truck },
    { key: 'Delivered', label: t.orderDelivered, icon: CheckCircle },
  ];

  const getStepIndex = (status: OrderStatus): number => {
    switch (status) {
      case 'New':
        return 0;
      case 'Confirmed':
        return 1;
      case 'Processing':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      case 'Cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;
  const isCancelled = order?.status === 'Cancelled';

  return (
    <div id="order-tracker-page" className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1A3D2F]/10 text-[#1A3D2F] text-xs font-bold uppercase tracking-wider mb-2">
            <Search className="w-3.5 h-3.5 text-[#C69B3D]" />
            Live Tracking
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-[#0F2A1E]">
            {t.trackerTitle}
          </h1>
          <p className="mt-2 text-sm text-[#4A5568]">
            {t.trackerSubtitle}
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white p-6 rounded-3xl border border-[#E7DFD5] shadow-xs mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#718096] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                id="tracker-order-id-input"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
                placeholder={t.orderIdPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#D8CBBF] font-bold text-sm text-[#0F2A1E] uppercase tracking-wider focus:border-[#1A3D2F] focus:ring-2 focus:ring-[#1A3D2F]/10 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              id="tracker-search-btn"
              disabled={isLoading || !orderIdInput.trim()}
              className="px-8 py-3.5 rounded-2xl bg-[#1A3D2F] text-white font-bold text-sm hover:bg-[#122D22] transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <Search className="w-4 h-4 text-[#E5C158]" />
                  <span>{t.trackBtn}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick suggestions */}
          <div className="mt-3 text-xs text-[#718096] flex items-center flex-wrap gap-2">
            <span>Sample IDs:</span>
            {['SKT-000107', 'SKT-000106', 'SKT-000105', 'SKT-000104'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setOrderIdInput(sample);
                  fetchOrder(sample);
                }}
                className="text-xs font-semibold text-[#1A3D2F] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E7DFD5] hover:bg-[#1A3D2F] hover:text-white transition-colors cursor-pointer"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            id="tracker-error-alert"
            className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-center gap-3 mb-8"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Order Details & Progress Visualizer */}
        {order && (
          <div
            id="tracker-result-card"
            className="bg-white rounded-3xl border border-[#E7DFD5] shadow-lg p-6 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300"
          >
            {/* Top Order Card Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#F3EFEA]">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#C69B3D]">
                  Verified Order Tracking
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F2A1E]">
                  {order.id}
                </h2>
                <div className="text-xs text-[#718096] flex items-center gap-1.5 mt-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Booked on {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold shadow-2xs ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : order.status === 'Cancelled'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-[#1A3D2F] text-[#E5C158] border border-[#C69B3D]/30'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                  Status: {order.status}
                </span>
              </div>
            </div>

            {/* Visual Step Timeline */}
            {!isCancelled ? (
              <div className="py-4">
                <div className="relative">
                  {/* Desktop / Tablet Horizontal Timeline */}
                  <div className="hidden md:grid grid-cols-5 gap-2 relative">
                    {/* Connecting line */}
                    <div className="absolute top-5 left-8 right-8 h-1 bg-[#E7DFD5] -z-0">
                      <div
                        className="h-full bg-[#1A3D2F] transition-all duration-500"
                        style={{
                          width: `${(Math.max(0, currentStepIdx) / 4) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {timelineSteps.map((step, idx) => {
                      const Icon = step.icon;
                      const isPassed = currentStepIdx >= idx;
                      const isCurrent = currentStepIdx === idx;

                      return (
                        <div key={step.key} className="flex flex-col items-center text-center relative z-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                              isCurrent
                                ? 'bg-[#1A3D2F] text-[#E5C158] ring-4 ring-[#E5C158]/30 scale-110'
                                : isPassed
                                ? 'bg-[#1A3D2F] text-white'
                                : 'bg-white border-2 border-[#D8CBBF] text-[#A0AEC0]'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <span
                            className={`mt-2.5 text-xs font-bold leading-tight ${
                              isCurrent
                                ? 'text-[#1A3D2F] font-extrabold'
                                : isPassed
                                ? 'text-[#0F2A1E]'
                                : 'text-[#A0AEC0]'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Vertical Timeline */}
                  <div className="md:hidden space-y-4">
                    {timelineSteps.map((step, idx) => {
                      const Icon = step.icon;
                      const isPassed = currentStepIdx >= idx;
                      const isCurrent = currentStepIdx === idx;

                      return (
                        <div key={step.key} className="flex items-center gap-3.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              isCurrent
                                ? 'bg-[#1A3D2F] text-[#E5C158] ring-4 ring-[#E5C158]/30'
                                : isPassed
                                ? 'bg-[#1A3D2F] text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <span
                              className={`text-xs font-bold ${
                                isCurrent
                                  ? 'text-[#1A3D2F] text-sm'
                                  : isPassed
                                  ? 'text-[#0F2A1E]'
                                  : 'text-[#A0AEC0]'
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold flex items-center gap-3">
                <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                <div>
                  <div className="font-bold">This order has been Cancelled.</div>
                  <div className="text-xs">If you have any questions, please contact management via WhatsApp or call.</div>
                </div>
              </div>
            )}

            {/* Order Content Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF8F5] border border-[#E7DFD5] text-xs">
              <div className="space-y-1">
                <div className="text-[#718096] uppercase font-bold text-[10px] tracking-wider">
                  Customer Information
                </div>
                <div className="font-extrabold text-sm text-[#0F2A1E]">{order.customerName}</div>
                <div className="font-semibold text-[#1A3D2F]">{order.shopName}</div>
                <div className="text-[#4A5568]">{order.mobile}</div>
                <div className="text-[#5C6B64] pt-1">{order.address}, {order.city}</div>
              </div>

              <div className="space-y-1">
                <div className="text-[#718096] uppercase font-bold text-[10px] tracking-wider">
                  Tea Packs & Weight
                </div>
                <div className="text-xl font-extrabold text-[#1A3D2F]">
                  {order.totalKg} KG Total
                </div>
                <div className="text-[#4A5568]">
                  125g: <strong>{order.items['125g']}</strong> &bull; 250g: <strong>{order.items['250g']}</strong> &bull; 500g: <strong>{order.items['500g']}</strong> &bull; 1KG: <strong>{order.items['1kg']}</strong>
                </div>
                <div className="pt-1 text-[#5C6B64]">
                  Payment: <strong>{order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'EasyPaisa to 03449293698'}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                onClick={() => onViewBill(order)}
                id="tracker-view-bill-btn"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#D8CBBF] text-[#1A3D2F] font-bold text-xs hover:bg-[#FAF8F5] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#C69B3D]" />
                <span>View Full Invoice Bill</span>
              </button>

              <button
                onClick={onOpenMessageModal}
                id="tracker-contact-mgmt-btn"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#0F682C] font-bold text-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>Inquire on WhatsApp (03449293698)</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
