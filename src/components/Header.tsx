import React, { useState, useEffect, useRef } from 'react';
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
  Check,
} from 'lucide-react';

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onNavigate?: (tab: any) => void;
  language: LanguageCode;
  setLanguage?: (lang: LanguageCode) => void;
  onLanguageChange?: (lang: LanguageCode) => void;
  totalPacksCount?: number;
  totalKg?: number;
  onOpenOrder?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab = 'home',
  setActiveTab,
  onNavigate,
  language,
  setLanguage,
  onLanguageChange,
  totalPacksCount = 0,
  totalKg = 0,
  onOpenOrder,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[language] || translations['roman-english'];

  // Handle outside clicks to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    if (langDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langDropdownOpen]);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'order', label: t.navOrder, icon: ShoppingBag },
    { id: 'about', label: t.navAbout, icon: Info },
    { id: 'faqs', label: t.navFaqs, icon: HelpCircle },
    { id: 'history', label: t.navHistory, icon: History },
    { id: 'tracker', label: t.navTrack, icon: Search },
    { id: 'contact', label: t.navContact, icon: Phone },
  ];

  const handleNavClick = (tabId: string) => {
    const target = tabId === 'track' ? 'tracker' : tabId;
    if (onNavigate) {
      onNavigate(target);
    } else if (setActiveTab) {
      setActiveTab(target);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLanguage = (l: LanguageCode) => {
    if (setLanguage) {
      setLanguage(l);
    }
    if (onLanguageChange) {
      onLanguageChange(l);
    }
    setLangDropdownOpen(false);
  };

  const handleOrderClick = () => {
    if (onOpenOrder) {
      onOpenOrder();
    } else if (onNavigate) {
      onNavigate('order');
    } else if (setActiveTab) {
      setActiveTab('order');
    }
  };

  const languageLabels: Record<LanguageCode, { label: string; badge: string }> = {
    'simple-english': { label: 'English', badge: 'EN' },
    'roman-english': { label: 'Roman Urdu', badge: 'RU' },
    'urdu': { label: 'اردو', badge: 'UR' },
  };

  const currentLangMeta = languageLabels[language] || languageLabels['roman-english'];

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
              className="inline-flex items-center gap-1 text-[#EAD59A] hover:text-white transition-colors font-medium px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 cursor-pointer"
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
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
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
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                id="language-selector-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-[#EADFCF] bg-white text-[#1B3022] hover:bg-[#FAF6EE] transition-colors shadow-2xs cursor-pointer active:scale-98"
                title="Change Website Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{currentLangMeta.label}</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#1B3022]/10 text-[#1B3022]">
                  {currentLangMeta.badge}
                </span>
              </button>

              {langDropdownOpen && (
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#FDFBF7] border border-[#EADFCF] shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#63756A] border-b border-[#EADFCF] mb-1">
                    Select Language
                  </div>
                  {(['simple-english', 'roman-english', 'urdu'] as LanguageCode[]).map((l) => {
                    const isCurrent = language === l;
                    return (
                      <button
                        key={l}
                        type="button"
                        id={`lang-option-${l}`}
                        onClick={() => handleSelectLanguage(l)}
                        className={`w-full text-left px-3.5 py-2.5 text-xs font-medium flex items-center justify-between hover:bg-[#FAF6EE] transition-colors cursor-pointer ${
                          isCurrent ? 'text-[#1B3022] font-bold bg-[#FAF6EE]' : 'text-[#4A5568]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isCurrent && <Check className="w-3.5 h-3.5 text-[#C5A059]" />}
                          <span className={isCurrent ? 'font-bold' : ''}>{languageLabels[l].label}</span>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          isCurrent ? 'bg-[#1B3022] text-[#EAD59A]' : 'bg-[#EADFCF]/60 text-[#1B3022]'
                        }`}>
                          {languageLabels[l].badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Place Order CTA Button */}
            <button
              id="header-place-order-btn"
              onClick={handleOrderClick}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs tracking-wide text-[#FDFBF7] bg-gradient-to-r from-[#1B3022] to-[#122218] border border-[#C5A059]/50 shadow-md hover:shadow-lg hover:from-[#122218] hover:to-[#0A160F] transition-all duration-200 active:scale-98 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#EAD59A]" />
              <span>{t.navPlaceOrder}</span>
              {totalKg > 0 && (
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
          className="xl:hidden border-t border-[#EADFCF] bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200"
        >
          {/* Mobile Language Selector */}
          <div className="p-3 bg-white rounded-2xl border border-[#EADFCF] space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#63756A] flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#C5A059]" />
              Select Language
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['simple-english', 'roman-english', 'urdu'] as LanguageCode[]).map((l) => {
                const isCurrent = language === l;
                return (
                  <button
                    key={l}
                    id={`mobile-lang-${l}`}
                    onClick={() => {
                      handleSelectLanguage(l);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold text-center transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-[#1B3022] text-[#EAD59A] shadow-xs font-bold'
                        : 'bg-[#FAF6EE] text-[#1B3022] border border-[#EADFCF] hover:bg-white'
                    }`}
                  >
                    <div>{languageLabels[l].label}</div>
                    <div className="text-[10px] opacity-75">({languageLabels[l].badge})</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
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
