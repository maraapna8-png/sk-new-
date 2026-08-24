import React, { useState } from 'react';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import { saveManagementMessage } from '../utils/dataStore';
import { Logo } from './Logo';
import {
  X,
  Send,
  MessageSquare,
  User,
  Store,
  FileText,
  Phone,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface DirectMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageCode;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  const t = translations[language];

  const [shopkeeperName, setShopkeeperName] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!shopkeeperName.trim()) {
      setError('Please enter your name.');
      return false;
    }
    if (!shopName.trim()) {
      setError('Please enter your shop or business name.');
      return false;
    }
    if (!message.trim()) {
      setError('Please enter your message.');
      return false;
    }

    // 1. Save to backend database or localStorage for admin records
    try {
      await saveManagementMessage({
        shopkeeperName: shopkeeperName.trim(),
        shopName: shopName.trim(),
        phone: phone.trim() || undefined,
        message: message.trim(),
      });
    } catch (e) {
      console.warn('Failed to save message, proceeding to WhatsApp', e);
    }

    // 2. Format WhatsApp Message for GM Muhammad Zeeshan (03449293698)
    const formattedText = `*SK Tea Company — Management Message*\n\n*Shopkeeper Name:* ${shopkeeperName.trim()}\n*Shop Name:* ${shopName.trim()}\n${phone ? `*Phone:* ${phone.trim()}\n` : ''}*Message:* ${message.trim()}`;

    const whatsappUrl = `https://wa.me/923449293698?text=${encodeURIComponent(formattedText)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    setIsSent(true);
  };

  const handleResetAndClose = () => {
    setIsSent(false);
    setShopkeeperName('');
    setShopName('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <div
      id="direct-message-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div
        id="direct-message-modal-card"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E7DFD5] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-[#1A3D2F] text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#E5C158]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#E5C158]">
                Direct WhatsApp Channel
              </span>
            </div>

            <button
              onClick={handleResetAndClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className="text-2xl font-display font-bold text-white mt-3">
            {t.messageMgmtTitle}
          </h2>
          <p className="text-xs text-white/80 mt-0.5">
            {t.messageMgmtSubtitle}
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6 bg-[#FAF8F5]">
          {isSent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#0F2A1E]">
                WhatsApp Chat Opened!
              </h3>
              <p className="text-xs text-[#4A5568] max-w-sm mx-auto">
                Your message has been pre-formatted and sent to General Manager Muhammad Zeeshan (03449293698).
              </p>
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl bg-[#1A3D2F] text-white text-xs font-bold hover:bg-[#122D22] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>Shopkeeper Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={shopkeeperName}
                  onChange={(e) => setShopkeeperName(e.target.value)}
                  placeholder="e.g. Muhammad Aslam"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CBBF] bg-white text-xs text-[#0F2A1E] focus:outline-hidden focus:border-[#1A3D2F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>Shop Name *</span>
                </label>
                <input
                  type="text"
                  required
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="e.g. Aslam General Store"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CBBF] bg-white text-xs text-[#0F2A1E] focus:outline-hidden focus:border-[#1A3D2F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>Phone Number (Optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 03001234567"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CBBF] bg-white text-xs text-[#0F2A1E] focus:outline-hidden focus:border-[#1A3D2F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-[#C69B3D]" />
                  <span>{t.messageLabel} *</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D8CBBF] bg-white text-xs text-[#0F2A1E] focus:outline-hidden focus:border-[#1A3D2F] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  id="send-whatsapp-mgmt-btn"
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.sendWhatsAppBtn}</span>
                </button>
              </div>

              <div className="text-[11px] text-[#718096] text-center pt-1">
                Directly opens WhatsApp chat with General Manager Muhammad Zeeshan (03449293698).
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
