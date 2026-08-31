import React from 'react';
import { Order } from '../types';
import { Logo } from './Logo';
import { Printer, Download, ArrowLeft, CheckCircle, Phone, MapPin, Store, Calendar, Scale, ShieldCheck } from 'lucide-react';

interface PrintableBillProps {
  order: Order;
  onBack?: () => void;
}

export const PrintableBill: React.FC<PrintableBillProps> = ({ order, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  const packDetails = [
    { label: '125g Pack', unitKg: 0.125, qty: order.items['125g'] || 0 },
    { label: '250g Pack', unitKg: 0.25, qty: order.items['250g'] || 0 },
    { label: '500g Pack', unitKg: 0.5, qty: order.items['500g'] || 0 },
    { label: '1 KG Pack', unitKg: 1.0, qty: order.items['1kg'] || 0 },
  ].filter((p) => p.qty > 0);

  const formattedDate = new Date(order.createdAt).toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Top Action Bar (hidden when printed) */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-[#E7DFD5] hover:bg-[#FAF8F5] text-[#1A3D2F] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          )}
          <span className="text-sm font-bold text-[#0F2A1E]">
            Official Commercial Order Invoice &bull; {order.id}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            id="print-invoice-btn"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A3D2F] text-white font-bold text-xs hover:bg-[#122D22] transition-colors shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#E5C158]" />
            <span>Print Invoice Bill</span>
          </button>
        </div>
      </div>

      {/* Printable Invoice Document */}
      <div
        id="printable-bill"
        className="bg-white p-8 sm:p-12 rounded-3xl border border-[#D8CBBF] shadow-lg text-[#1F2923] relative"
      >
        {/* Decorative Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#1A3D2F] via-[#C69B3D] to-[#1A3D2F]"></div>

        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b-2 border-[#1A3D2F]">
          <div>
            <Logo variant="dark" size="lg" showTagline={true} />
            <div className="mt-3 text-xs text-[#5C6B64] space-y-0.5">
              <div><strong>Owner:</strong> Muhammad Azam &bull; Phone: <strong>03318701808</strong></div>
              <div><strong>General Manager:</strong> Muhammad Zeeshan &bull; Phone: <strong>03449293698</strong></div>
              <div>Premium Wholesale & Retail Tea Supply across Pakistan</div>
            </div>
          </div>

          <div className="sm:text-right bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7DFD5] w-full sm:w-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C69B3D]">
              OFFICIAL ORDER BILL
            </div>
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F2A1E] tracking-tight mt-0.5">
              {order.id}
            </div>
            <div className="text-xs text-[#718096] mt-1 flex items-center sm:justify-end gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#1A3D2F] text-[#E5C158]">
              Status: {order.status}
            </div>
          </div>
        </div>

        {/* Bill Info Grid: Customer & Delivery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 p-6 rounded-2xl bg-[#FAF8F5] border border-[#E7DFD5]">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#718096] mb-2 flex items-center gap-1.5">
              <Store className="w-4 h-4 text-[#C69B3D]" />
              Customer / Shopkeeper Information
            </div>
            <div className="space-y-1 text-sm">
              <div className="font-extrabold text-base text-[#0F2A1E]">
                {order.customerName}
              </div>
              <div className="font-semibold text-[#1A3D2F]">
                {order.shopName}
              </div>
              <div className="text-xs text-[#4A5568] flex items-center gap-1.5 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#5C6B64]" />
                <strong>Mobile:</strong> {order.mobile}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#718096] mb-2 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#C69B3D]" />
              Delivery & Payment Details
            </div>
            <div className="space-y-1 text-xs text-[#4A5568]">
              <div><strong>City / Area:</strong> <span className="font-bold text-[#0F2A1E]">{order.city}</span></div>
              <div><strong>Delivery Address:</strong> {order.address}</div>
              <div><strong>Payment Mode:</strong> <span className="font-bold text-[#1A3D2F]">{order.paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'EasyPaisa to GM (03327223733)'}</span></div>
              {order.notes && (
                <div className="pt-1 italic text-[#5C6B64]"><strong>Notes:</strong> {order.notes}</div>
              )}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="my-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1A3D2F] text-white text-xs uppercase tracking-wider font-bold">
                <th className="py-3 px-4 rounded-l-xl">#</th>
                <th className="py-3 px-4">Item & Pack Size</th>
                <th className="py-3 px-4 text-center">Unit Weight</th>
                <th className="py-3 px-4 text-center">Quantity</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Total Weight (KG)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7DFD5] text-xs sm:text-sm">
              {packDetails.map((item, index) => {
                const subtotal = Number((item.qty * item.unitKg).toFixed(3));
                return (
                  <tr key={index} className="hover:bg-[#FAF8F5]">
                    <td className="py-3.5 px-4 font-semibold text-[#718096]">{index + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0F2A1E]">
                      SK Tea {item.label}
                    </td>
                    <td className="py-3.5 px-4 text-center text-[#5C6B64]">
                      {item.unitKg} KG
                    </td>
                    <td className="py-3.5 px-4 text-center font-extrabold text-[#1A3D2F]">
                      {item.qty} Packs
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-[#0F2A1E]">
                      {subtotal} KG
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#1A3D2F] bg-[#F3EFEA] font-extrabold text-sm sm:text-base">
                <td colSpan={3} className="py-4 px-4 font-display text-[#0F2A1E]">
                  TOTAL TEA ORDER WEIGHT:
                </td>
                <td className="py-4 px-4 text-center text-[#1A3D2F]">
                  {packDetails.reduce((sum, p) => sum + p.qty, 0)} Total Packs
                </td>
                <td className="py-4 px-4 text-right text-[#1A3D2F] text-lg font-extrabold">
                  {order.totalKg} KG
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Official Terms & Footer Signature */}
        <div className="pt-8 border-t border-[#E7DFD5] grid grid-cols-1 sm:grid-cols-2 gap-6 items-end text-xs">
          <div className="text-[#718096] space-y-1">
            <div className="font-bold text-[#0F2A1E] uppercase tracking-wider text-[11px]">
              Important Instructions:
            </div>
            <div>&bull; Please inspect the seal of SK Tea packs upon receipt.</div>
            <div>&bull; For any discrepancies or urgent supply, contact Muhammad Zeeshan (03449293698).</div>
            <div>&bull; Keep this official invoice copy for shop records and order tracking.</div>
          </div>

          <div className="sm:text-right flex flex-col sm:items-end justify-end">
            <div className="w-48 border-b border-[#0F2A1E] pb-1 text-center font-bold text-xs text-[#0F2A1E]">
              SK Tea Company
            </div>
            <div className="text-[11px] text-[#718096] pt-1">
              Authorized Management Signature
            </div>
          </div>
        </div>

        {/* Bottom verification stamp */}
        <div className="mt-8 text-center text-[11px] text-[#A0AEC0] pt-4 border-t border-dashed border-[#E7DFD5]">
          Generated by SK Tea Company Automated Ordering System &bull; Track at website with Order ID {order.id}
        </div>
      </div>
    </div>
  );
};
