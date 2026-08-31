import React, { useState, useEffect } from 'react';
import {
  LanguageCode,
  NavItemId,
  OrderItemQuantities,
  PackSizeKey,
  Order,
} from './types';
import { translations } from './utils/translations';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackSizeCards } from './components/PackSizeCards';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OrderPage } from './components/OrderPage';
import { OrderTracker } from './components/OrderTracker';
import { OrderHistory } from './components/OrderHistory';
import { AboutPage } from './components/AboutPage';
import { FAQsPage } from './components/FAQsPage';
import { ContactSection } from './components/ContactSection';
import { DirectMessageModal } from './components/DirectMessageModal';
import { PrintableBill } from './components/PrintableBill';
import { OrderConfirmation } from './components/OrderConfirmation';
import { AdminPortal } from './components/AdminPortal';
import { Logo } from './components/Logo';
import { fetchAllOrders } from './utils/dataStore';
import { collection, query, orderBy, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { db } from './firebase';
import {
  Phone,
  MessageSquare,
  ArrowUp,
  ShoppingBag,
  ShieldCheck,
  Heart,
  Scale,
  Calendar,
  Lock,
} from 'lucide-react';

export function App() {
  // Global Language with persistence (Default: English)
  const [language, setLanguage] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('sk_tea_language');
      if (saved && (saved === 'simple-english' || saved === 'roman-english' || saved === 'urdu')) {
        return saved as LanguageCode;
      }
    } catch (e) {
      // Ignore
    }
    return 'simple-english';
  });

  const handleLanguageChange = (newLang: LanguageCode) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('sk_tea_language', newLang);
    } catch (e) {
      // Ignore
    }
  };

  const t = translations[language] || translations['simple-english'];

  // Active View / Page
  const [currentView, setCurrentView] = useState<NavItemId>('home');
  const [previousView, setPreviousView] = useState<NavItemId>('home');

  // Pack Quantities in current order session
  const [quantities, setQuantities] = useState<OrderItemQuantities>({
    '125g': 0,
    '250g': 0,
    '500g': 0,
    '1kg': 0,
  });

  // Confirmed Order for Confirmation / Bill View
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [trackerSearchId, setTrackerSearchId] = useState<string>('');

  // User's Local Order History
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  // Direct WhatsApp Modal State
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Real-time Firestore listener for orders collection across all connected devices
  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    try {
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const liveOrders: Order[] = [];
            snapshot.forEach((docSnap) => {
              liveOrders.push(docSnap.data() as Order);
            });
            setOrderHistory(liveOrders);
          } else {
            fetchAllOrders().then((orders) => {
              if (orders && Array.isArray(orders)) {
                setOrderHistory(orders);
              }
            });
          }
        },
        (error) => {
          console.warn('Firestore real-time orders listener error:', error);
          fetchAllOrders().then((orders) => {
            if (orders && Array.isArray(orders)) {
              setOrderHistory(orders);
            }
          });
        }
      );
    } catch (e) {
      console.warn('Could not initialize Firestore onSnapshot listener:', e);
      fetchAllOrders().then((orders) => {
        if (orders && Array.isArray(orders)) {
          setOrderHistory(orders);
        }
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Update pack quantity helpers
  const handleUpdateQuantity = (pack: PackSizeKey, delta: number) => {
    setQuantities((prev) => {
      const next = Math.max(0, prev[pack] + delta);
      return { ...prev, [pack]: next };
    });
  };

  const handleSetQuantity = (pack: PackSizeKey, count: number) => {
    setQuantities((prev) => ({
      ...prev,
      [pack]: Math.max(0, count),
    }));
  };

  const handleResetQuantities = () => {
    setQuantities({ '125g': 0, '250g': 0, '500g': 0, '1kg': 0 });
  };

  // When order is successfully confirmed
  const handleOrderSuccess = (order: Order) => {
    setActiveOrder(order);
    setOrderHistory((prev) => [order, ...prev.filter((o) => o.id !== order.id)]);
    handleResetQuantities();
    setCurrentView('confirmation' as any);
  };

  // Reorder action
  const handleReorder = (order: Order) => {
    setQuantities({ ...order.items });
    setCurrentView('order');
  };

  // Navigation handlers
  const handleNavigate = (tab: NavItemId | string) => {
    const targetTab = (tab === 'track' ? 'tracker' : tab) as NavItemId;
    setPreviousView(currentView);
    setCurrentView(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewBill = (order: Order) => {
    setActiveOrder(order);
    setPreviousView(currentView);
    setCurrentView('bill' as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrackFromOrder = (orderId: string) => {
    setTrackerSearchId(orderId);
    setCurrentView('tracker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate live total packs and KG for floating header badge
  const totalPacksCount =
    quantities['125g'] + quantities['250g'] + quantities['500g'] + quantities['1kg'];

  const totalKg = Number(
    (
      quantities['125g'] * 0.125 +
      quantities['250g'] * 0.25 +
      quantities['500g'] * 0.5 +
      quantities['1kg'] * 1.0
    ).toFixed(3)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1B3022] antialiased selection:bg-[#1B3022] selection:text-[#EAD59A]">
      
      {/* If inside Admin Portal, render dedicated Admin screen */}
      {currentView === 'admin' ? (
        <AdminPortal
          onViewBill={handleViewBill}
          onExitAdmin={() => setCurrentView('home')}
        />
      ) : (
        <>
          {/* Main Top Header */}
          <Header
            language={language}
            setLanguage={handleLanguageChange}
            onLanguageChange={handleLanguageChange}
            activeTab={currentView}
            setActiveTab={handleNavigate}
            onNavigate={handleNavigate}
            totalPacksCount={totalPacksCount}
            totalKg={totalKg}
            onOpenOrder={() => handleNavigate('order')}
          />

          {/* Page Routing Views */}
          <main className="flex-1">
            
            {/* VIEW 1: HOME */}
            {currentView === 'home' && (
              <div id="home-view" className="space-y-16 pb-16">
                <Hero
                  language={language}
                  onOrderClick={() => handleNavigate('order')}
                  onExplorePacks={() => {
                    const el = document.getElementById('packs-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  onOpenMessageModal={() => setIsMessageModalOpen(true)}
                />

                <div id="packs-section">
                  <PackSizeCards
                    language={language}
                    quantities={quantities}
                    onUpdateQuantity={handleUpdateQuantity}
                    onSetQuantity={handleSetQuantity}
                    onResetQuantities={handleResetQuantities}
                    onProceedToOrder={() => handleNavigate('order')}
                  />
                </div>

                <WhyChooseUs language={language} />

                {/* Home Order Hotline Banner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="rounded-3xl bg-[#1B3022] text-white p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#C5A059]/40 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-widest text-[#EAD59A]">
                        Wholesale & Retail Direct Supply
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                        Ready to place an order for your shop?
                      </h2>
                      <p className="text-xs sm:text-sm text-white/80 max-w-xl">
                        Select from 125g, 250g, 500g, or 1 KG packs. Delivered straight to your shop with Cash on Delivery or EasyPaisa.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleNavigate('order')}
                        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#EAD59A] to-[#C5A059] text-[#1B3022] font-extrabold text-sm hover:scale-105 transition-all shadow-lg cursor-pointer"
                      >
                        {t.placeYourOrder}
                      </button>
                      <button
                        onClick={() => setIsMessageModalOpen(true)}
                        className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all border border-white/20 cursor-pointer"
                      >
                        WhatsApp Inquiries
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* VIEW 2: ORDER PAGE */}
            {currentView === 'order' && (
              <OrderPage
                language={language}
                quantities={quantities}
                onUpdateQuantity={handleUpdateQuantity}
                onSetQuantity={handleSetQuantity}
                onResetQuantities={handleResetQuantities}
                onOrderSuccess={handleOrderSuccess}
              />
            )}

            {/* VIEW 3: ORDER CONFIRMATION */}
            {currentView === ('confirmation' as any) && activeOrder && (
              <OrderConfirmation
                order={activeOrder}
                language={language}
                onTrackOrder={handleTrackFromOrder}
                onViewBill={handleViewBill}
                onOrderMore={() => handleNavigate('order')}
                onOpenMessageModal={() => setIsMessageModalOpen(true)}
              />
            )}

            {/* VIEW 4: ORDER TRACKER */}
            {currentView === 'tracker' && (
              <OrderTracker
                language={language}
                initialOrderId={trackerSearchId}
                onViewBill={handleViewBill}
                onOpenMessageModal={() => setIsMessageModalOpen(true)}
              />
            )}

            {/* VIEW 5: ORDER HISTORY */}
            {currentView === 'history' && (
              <OrderHistory
                orders={orderHistory}
                language={language}
                onViewBill={handleViewBill}
                onReorder={handleReorder}
                onNavigateOrder={() => handleNavigate('order')}
                onTrackOrder={handleTrackFromOrder}
              />
            )}

            {/* VIEW 6: ABOUT US */}
            {currentView === 'about' && (
              <AboutPage
                language={language}
                onNavigateOrder={() => handleNavigate('order')}
                onOpenMessageModal={() => setIsMessageModalOpen(true)}
              />
            )}

            {/* VIEW 7: FAQS */}
            {currentView === 'faqs' && (
              <FAQsPage
                language={language}
                onNavigateOrder={() => handleNavigate('order')}
                onOpenMessageModal={() => setIsMessageModalOpen(true)}
              />
            )}

            {/* VIEW 8: CONTACT */}
            {currentView === 'contact' && (
              <ContactSection
                language={language}
                onOpenMessageModal={() => setIsMessageModalOpen(true)}
              />
            )}

            {/* VIEW 9: PRINTABLE BILL */}
            {currentView === ('bill' as any) && activeOrder && (
              <PrintableBill
                order={activeOrder}
                onBack={() => setCurrentView(previousView)}
              />
            )}

          </main>

          {/* Floating WhatsApp Quick Button */}
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 no-print">
            <button
              onClick={() => setIsMessageModalOpen(true)}
              id="floating-whatsapp-btn"
              className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs shadow-xl hover:scale-105 transition-all cursor-pointer ring-4 ring-white/60"
              title="Chat with Management on WhatsApp"
            >
              <MessageSquare className="w-5 h-5 fill-current" />
              <span className="hidden sm:inline">WhatsApp Management</span>
            </button>
          </div>

          {/* Global Footer */}
          <footer className="bg-[#1B3022] text-white border-t border-[#C5A059]/20 mt-auto no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
                {/* Col 1: Brand & Identity */}
                <div className="space-y-4 md:col-span-1">
                  <Logo variant="light" size="md" showTagline={true} />
                  <p className="text-xs text-white/70 leading-relaxed">
                    Premium quality, richly blended tea packed for authentic taste and strong aroma. Available across Pakistan in 125g, 250g, 500g, and 1 KG pack sizes.
                  </p>
                </div>

                {/* Col 2: Navigation Links */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#EAD59A]">
                    {t.quickLinks || 'Quick Navigation'}
                  </h4>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li>
                      <button onClick={() => handleNavigate('home')} className="hover:text-[#EAD59A] transition-colors cursor-pointer">
                        {t.navHome}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigate('order')} className="hover:text-[#EAD59A] transition-colors cursor-pointer">
                        {t.navOrder}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigate('tracker')} className="hover:text-[#EAD59A] transition-colors cursor-pointer">
                        {t.navTrack}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigate('history')} className="hover:text-[#EAD59A] transition-colors cursor-pointer">
                        {t.navHistory}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigate('about')} className="hover:text-[#EAD59A] transition-colors cursor-pointer">
                        {t.navAbout}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigate('faqs')} className="hover:text-[#EAD59A] transition-colors cursor-pointer">
                        {t.navFaqs}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Col 3: Official Management Contacts */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#EAD59A]">
                    Management Contacts
                  </h4>
                  <div className="space-y-2.5 text-xs text-white/80">
                    <div>
                      <div className="font-bold text-white">Owner: Muhammad Azam</div>
                      <a href="tel:03318701808" className="text-[#EAD59A] hover:underline">
                        03318701808
                      </a>
                    </div>
                    <div>
                      <div className="font-bold text-white">General Manager: Muhammad Zeeshan</div>
                      <a href="tel:03449293698" className="text-[#EAD59A] hover:underline">
                        03449293698
                      </a>
                    </div>
                    <div className="text-[11px] text-white/60">
                      EasyPaisa Account: <strong>03327223733</strong>
                    </div>
                  </div>
                </div>

                {/* Col 4: Pack Sizes & Admin */}
                <div className="space-y-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#EAD59A]">
                    Pack Sizes & Admin
                  </h4>
                  <div className="text-xs text-white/80 space-y-1">
                    <div>&bull; 125g Pack (0.125 KG)</div>
                    <div>&bull; 250g Pack (0.25 KG)</div>
                    <div>&bull; 500g Pack (0.50 KG)</div>
                    <div>&bull; 1 KG Pack (1.00 KG)</div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => handleNavigate('admin')}
                      id="footer-admin-portal-link"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#EAD59A] text-xs font-bold transition-colors border border-white/10 cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Admin Management Portal</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Bottom Copyright */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
                <div>
                  &copy; {new Date().getFullYear()} SK Tea Company. All Rights Reserved.
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px]">
                  <span>Pure Quality &bull; Fresh Aroma &bull; Reliable Supply</span>
                  <span className="text-white/30 hidden sm:inline">|</span>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAD59A] transition-colors">
                    Sitemap
                  </a>
                  <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAD59A] transition-colors">
                    Robots
                  </a>
                  <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#EAD59A] transition-colors font-mono">
                    llms.txt
                  </a>
                </div>
              </div>

            </div>
          </footer>

          {/* Direct WhatsApp Messaging Modal */}
          <DirectMessageModal
            isOpen={isMessageModalOpen}
            onClose={() => setIsMessageModalOpen(false)}
            language={language}
          />
        </>
      )}

    </div>
  );
}

export default App;
