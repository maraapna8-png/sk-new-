import React, { useState } from 'react';
import { Logo } from './Logo';
import { LanguageCode } from '../types';
import { translations } from '../utils/translations';
import {
  Menu,
  X,
  ShoppingBag,
  Phone,
  Search,
  History,
  HelpCircle,
  Info,
  Home,
  ShieldCheck,
  Globe,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  totalPacksCount: number;
  totalKg: number;
  onOpenOrder: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  totalPacksCount,
  totalKg,
  onOpenOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const t = translations[language];

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'order', label: t.navOrder, icon: ShoppingBag },
    { id: 'about', label: t.navAbout, icon: Info },
    { id: 'faqs', label: t.navFaqs, icon: HelpCircle },
    { id: 'history', label: t.navHistory, icon: History },
    { id: 'track', label: t.navTrack, icon: Search },
    { id: 'contact', label: t.navContact, icon: Phone },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languageLabels: Record<LanguageCode, { label: string; badge: string }> = {
    'simple-english': { label: 'English', badge: 'EN' },
    'roman-english': { label: 'Roman Urdu', badge: 'RU' },
    'urdu': { label: 'اردو', badge: 'UR' },
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#EADFCF] transition-all duration-200 shadow-xs"
    >
      {/* Top micro announcement bar */}
      <div className="bg-[#1B3022] text-[#FDFBF7] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-semibold text-[#EAD59A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              {t.freshStock}
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/85 font-medium">
              Owner: Muhammad Azam (03318701808) &bull; GM: Muhammad Zeeshan (03449293698)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button
              onClick={() => handleNavClick('admin')}
              id="header-admin-link"
              className="inline-flex items-center gap-1 text-[#EAD59A] hover:text-white transition-colors font-medium px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{t.navAdmin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="cursor-pointer"
            onClick={() => handleNavClick('home')}
            id="nav-logo-btn"
          >
            <Logo variant="dark" size="md" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-navigation"
            className="hidden xl:flex items-center gap-1 bg-[#FAF6EE] p-1.5 rounded-full border border-[#EADFCF]"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1B3022] text-[#FDFBF7] shadow-xs'
                      : 'text-[#2C3E35] hover:text-[#1B3022] hover:bg-white/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Actions: Language Selector + Place Order CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-[#EADFCF] bg-white text-[#1B3022] hover:bg-[#FAF6EE] transition-colors shadow-2xs cursor-pointer"
                title="Change Website Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{languageLabels[language].label}</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#1B3022]/10 text-[#1B3022]">
                  {languageLabels[language].badge}
                </span>
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#FDFBF7] border border-[#EADFCF] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#63756A] border-b border-[#EADFCF]">
                    Select Language
                  </div>
                  {(['simple-english', 'roman-english', 'urdu'] as LanguageCode[]).map((l) => (
                    <button
                      key={l}
                      id={`lang-option-${l}`}
                      onClick={() => {
                        setLanguage(l);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between hover:bg-[#FAF6EE] transition-colors cursor-pointer ${
                        language === l ? 'text-[#1B3022] font-bold bg-[#FAF6EE]' : 'text-[#4A5568]'
                      }`}
                    >
                      <span>{languageLabels[l].label}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EADFCF]/60 text-[#1B3022]">
                        {languageLabels[l].badge}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              id="header-place-order-btn"
              onClick={onOpenOrder}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide text-[#FDFBF7] bg-gradient-to-r from-[#1B3022] to-[#122218] border border-[#C5A059]/50 shadow-md hover:shadow-lg hover:from-[#122218] hover:to-[#0A160F] transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#EAD59A]" />
              <span>{t.navPlaceOrder}</span>
              {totalPacksCount > 0 && (
                <span
                  id="header-cart-badge"
                  className="ml-1 px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-[#C5A059] text-[#1B3022] shadow-xs"
                >
                  {totalKg} KG
                </span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-[#1B3022] hover:bg-[#FAF6EE] border border-[#EADFCF] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="xl:hidden border-t border-[#EADFCF] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200"
        >
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#1B3022] text-[#FDFBF7] shadow-xs'
                      : 'bg-white text-[#2C3E35] border border-[#EADFCF] hover:bg-[#FAF6EE]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-white rounded-xl border border-[#EADFCF] space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#63756A]">
              Direct Contact & Support
            </div>
            <div className="flex flex-col gap-1.5 text-xs text-[#2C3E35]">
              <a
                href="tel:03318701808"
                className="flex items-center justify-between p-2 rounded-lg bg-[#FAF6EE] hover:bg-[#F4EFE6] font-medium"
              >
                <span>Owner: Muhammad Azam</span>
                <span className="font-bold text-[#1B3022]">03318701808</span>
              </a>
              <a
                href="tel:03449293698"
                className="flex items-center justify-between p-2 rounded-lg bg-[#FAF6EE] hover:bg-[#F4EFE6] font-medium"
              >
                <span>General Manager: Muhammad Zeeshan</span>
                <span className="font-bold text-[#1B3022]">03449293698</span>
              </a>
            </div>
          </div>

          <button
            onClick={() => handleNavClick('admin')}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#1B3022] bg-[#FAF6EE] hover:bg-[#F4EFE6] border border-[#EADFCF] rounded-xl transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
            <span>Admin Portal Access</span>
          </button>
        </div>
      )}
    </header>
  );
};
