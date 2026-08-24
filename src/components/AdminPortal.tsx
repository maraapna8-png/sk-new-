import React, { useState, useEffect } from 'react';
import { Order, OrderStatus, Customer, ManagementMessage, AdminStats } from '../types';
import { Logo } from './Logo';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  Truck,
  PackageCheck,
  XCircle,
  Scale,
  Users,
  MessageSquare,
  RefreshCw,
  Printer,
  Calendar,
  Phone,
  Store,
  MapPin,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface AdminPortalProps {
  onViewBill: (order: Order) => void;
  onExitAdmin: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onViewBill,
  onExitAdmin,
}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('sk_admin_token'));
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Admin Navigation Tab
  const [adminTab, setAdminTab] = useState<'dashboard' | 'orders' | 'customers' | 'messages'>('dashboard');

  // Data States
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<ManagementMessage[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  // Filters for Orders
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  // Customer Filter
  const [customerSearch, setCustomerSearch] = useState('');

  // 1. Verify token on mount or login
  const checkTokenValidity = async (t: string) => {
    try {
      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${t}` },
      });
      const data = await res.json();
      if (!data.valid) {
        handleLogout();
      } else {
        loadAllAdminData(t);
      }
    } catch {
      handleLogout();
    }
  };

  useEffect(() => {
    if (token) {
      checkTokenValidity(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      setToken(data.token);
      localStorage.setItem('sk_admin_token', data.token);
      setPasscode('');
      loadAllAdminData(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Incorrect passcode. Access denied.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('sk_admin_token');
    setStats(null);
    setOrders([]);
    setCustomers([]);
    setMessages([]);
  };

  const loadAllAdminData = async (authToken: string) => {
    setIsLoadingData(true);
    try {
      const headers = { Authorization: `Bearer ${authToken}` };

      const [statsRes, ordersRes, custRes, msgRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/orders', { headers }),
        fetch('/api/admin/customers', { headers }),
        fetch('/api/admin/messages', { headers }),
      ]);

      if (statsRes.ok) {
        const s = await statsRes.json();
        setStats(s);
      }
      if (ordersRes.ok) {
        const o = await ordersRes.json();
        setOrders(o.orders || []);
      }
      if (custRes.ok) {
        const c = await custRes.json();
        setCustomers(c.customers || []);
      }
      if (msgRes.ok) {
        const m = await msgRes.json();
        setMessages(m.messages || []);
      }
    } catch (e) {
      console.error('Failed to fetch admin data', e);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    if (!token) return;
    setStatusUpdatingId(orderId);

    try {
      const res = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
        if (selectedOrderDetails?.id === orderId) {
          setSelectedOrderDetails(data.order);
        }
        // Refresh stats
        loadAllAdminData(token);
      }
    } catch (e) {
      console.error('Status update failed', e);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Filtered orders list
  const filteredOrders = orders.filter((o) => {
    const q = orderSearch.toLowerCase();
    const matchesQuery =
      !orderSearch ||
      o.id.toLowerCase().includes(q) ||
      o.shopName.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.mobile.includes(q) ||
      o.city.toLowerCase().includes(q);

    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesDate = !dateFilter || o.createdAt.startsWith(dateFilter);

    return matchesQuery && matchesStatus && matchesDate;
  });

  const filteredCustomers = customers.filter((c) => {
    const q = customerSearch.toLowerCase();
    return (
      !customerSearch ||
      c.customerName.toLowerCase().includes(q) ||
      c.shopName.toLowerCase().includes(q) ||
      c.mobile.includes(q) ||
      c.city.toLowerCase().includes(q)
    );
  });

  // 1. If not authenticated, show secure login
  if (!token) {
    return (
      <div id="admin-login-screen" className="min-h-screen bg-[#0F2A1E] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-[#C69B3D]/30 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#1A3D2F] via-[#C69B3D] to-[#1A3D2F]"></div>

          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Logo variant="dark" size="md" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3D2F]/10 text-[#1A3D2F] text-xs font-bold uppercase tracking-wider mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C69B3D]" />
              Secure Admin Gateway
            </div>
            <h2 className="text-2xl font-display font-extrabold text-[#0F2A1E]">
              Management Portal
            </h2>
            <p className="text-xs text-[#718096]">
              Enter authorized passcode to manage orders, stock weights, and customers.
            </p>
          </div>

          {loginError && (
            <div
              id="admin-login-error"
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#0F2A1E] flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#C69B3D]" />
                <span>Admin Passcode</span>
              </label>
              <input
                type="password"
                required
                id="admin-passcode-input"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter Passcode (Admin@1973)"
                className="w-full px-4 py-3.5 rounded-xl border border-[#D8CBBF] text-sm text-[#0F2A1E] focus:outline-hidden focus:border-[#1A3D2F] font-mono tracking-wider"
              />
            </div>

            <button
              type="submit"
              id="admin-login-submit-btn"
              disabled={isLoggingIn || !passcode.trim()}
              className="w-full py-3.5 rounded-xl bg-[#1A3D2F] hover:bg-[#122D22] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {isLoggingIn ? (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                  <span>Verify & Unlock Portal</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#E7DFD5] flex items-center justify-between text-xs text-[#718096]">
            <span>Authorized: Muhammad Azam & Zeeshan</span>
            <button
              onClick={onExitAdmin}
              className="font-bold text-[#1A3D2F] hover:underline"
            >
              Back to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Interface
  return (
    <div id="admin-portal-main" className="min-h-screen bg-[#F3EFEA] text-[#1F2923]">
      
      {/* Top Admin Navbar */}
      <header className="bg-[#1A3D2F] text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Logo variant="light" size="sm" />
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-white/10 text-[#E5C158] uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          {/* Tab Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'orders', label: `Orders (${orders.length})`, icon: FileText },
              { id: 'customers', label: `Customers (${customers.length})`, icon: Users },
              { id: 'messages', label: `Messages (${messages.length})`, icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = adminTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-white/20 text-[#E5C158]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => token && loadAllAdminData(token)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-bold text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>

            <button
              onClick={onExitAdmin}
              className="text-xs text-white/80 hover:text-white underline ml-2"
            >
              Public Site
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sub-Nav */}
      <div className="md:hidden bg-[#163629] text-white p-2 flex overflow-x-auto gap-2">
        {['dashboard', 'orders', 'customers', 'messages'].map((tab) => (
          <button
            key={tab}
            onClick={() => setAdminTab(tab as any)}
            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase whitespace-nowrap ${
              adminTab === tab ? 'bg-white text-[#1A3D2F]' : 'bg-white/10 text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Body Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: DASHBOARD OVERVIEW */}
        {adminTab === 'dashboard' && stats && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              
              <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs col-span-2">
                <div className="text-xs text-[#718096] uppercase font-bold tracking-wider">
                  Total Tea KG Ordered
                </div>
                <div className="text-3xl font-display font-extrabold text-[#1A3D2F] mt-1">
                  {stats.totalKgOrdered} <span className="text-base font-normal">KG</span>
                </div>
                <div className="text-[11px] text-[#5C6B64] mt-1">
                  Across all active orders
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
                <div className="text-xs text-[#718096] uppercase font-bold">Total Orders</div>
                <div className="text-2xl font-bold text-[#0F2A1E] mt-1">{stats.totalOrders}</div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-xs">
                <div className="text-xs text-amber-800 uppercase font-bold">New Orders</div>
                <div className="text-2xl font-extrabold text-amber-900 mt-1">{stats.newOrders}</div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 shadow-xs">
                <div className="text-xs text-blue-800 uppercase font-bold">Confirmed</div>
                <div className="text-2xl font-extrabold text-blue-900 mt-1">{stats.confirmedOrders}</div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 shadow-xs">
                <div className="text-xs text-purple-800 uppercase font-bold">Processing</div>
                <div className="text-2xl font-extrabold text-purple-900 mt-1">{stats.processingOrders}</div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 shadow-xs">
                <div className="text-xs text-indigo-800 uppercase font-bold">Out for Delivery</div>
                <div className="text-2xl font-extrabold text-indigo-900 mt-1">{stats.outForDeliveryOrders}</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs">
                <div className="text-xs text-emerald-800 uppercase font-bold">Delivered</div>
                <div className="text-2xl font-extrabold text-emerald-900 mt-1">{stats.deliveredOrders}</div>
              </div>

            </div>

            {/* Quick Actions & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-[#E7DFD5] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F3EFEA]">
                  <h3 className="text-lg font-display font-extrabold text-[#0F2A1E]">
                    Recent Order Activity
                  </h3>
                  <button
                    onClick={() => setAdminTab('orders')}
                    className="text-xs font-bold text-[#1A3D2F] hover:underline"
                  >
                    View All Orders &rarr;
                  </button>
                </div>

                <div className="divide-y divide-[#F3EFEA]">
                  {orders.slice(0, 5).map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-[#0F2A1E] font-display">
                            {ord.id}
                          </span>
                          <span className="text-xs font-bold text-[#1A3D2F]">
                            {ord.shopName}
                          </span>
                          <span className="text-[11px] text-[#718096]">({ord.city})</span>
                        </div>
                        <div className="text-[11px] text-[#5C6B64]">
                          {ord.totalKg} KG &bull; {ord.paymentMethod} &bull; {new Date(ord.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#FAF8F5] text-[#1A3D2F] border border-[#E7DFD5]">
                          {ord.status}
                        </span>
                        <button
                          onClick={() => onViewBill(ord)}
                          className="p-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#E7DFD5] text-[#1A3D2F]"
                          title="View Bill"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Management Quick Hotline Summary */}
              <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E7DFD5] shadow-xs space-y-4">
                <h3 className="text-lg font-display font-extrabold text-[#0F2A1E]">
                  Company Operations Info
                </h3>
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7DFD5] space-y-2 text-xs">
                  <div><strong>Owner:</strong> Muhammad Azam (03318701808)</div>
                  <div><strong>GM & EasyPaisa:</strong> Muhammad Zeeshan (03449293698)</div>
                  <div><strong>Standard Pack Weights:</strong> 125g, 250g, 500g, 1 KG</div>
                </div>

                <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-xs space-y-1">
                  <div className="font-bold text-green-900">Total Registered Customers:</div>
                  <div className="text-2xl font-extrabold text-green-900">{customers.length} Shops</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: ORDERS MANAGEMENT */}
        {adminTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Search & Filter Bar */}
            <div className="p-5 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 flex-1">
                {/* Search Input */}
                <div className="relative min-w-[240px] flex-1">
                  <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search by ID, Shop, Customer, Mobile, City..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D8CBBF] text-xs font-medium text-[#0F2A1E] focus:outline-hidden focus:border-[#1A3D2F]"
                  />
                </div>

                {/* Status Dropdown */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#D8CBBF] bg-white text-xs font-bold text-[#1A3D2F] focus:outline-hidden"
                >
                  <option value="All">All Statuses ({orders.length})</option>
                  <option value="New">New</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Date Filter */}
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#D8CBBF] bg-white text-xs text-[#0F2A1E] focus:outline-hidden"
                />

                {(orderSearch || statusFilter !== 'All' || dateFilter) && (
                  <button
                    onClick={() => {
                      setOrderSearch('');
                      setStatusFilter('All');
                      setDateFilter('');
                    }}
                    className="text-xs text-red-600 hover:underline font-bold"
                  >
                    Reset Filters
                  </button>
                )}
              </div>

              <div className="text-xs text-[#718096] font-bold">
                Showing {filteredOrders.length} of {orders.length} orders
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-[#E7DFD5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#FAF8F5] border-b border-[#E7DFD5] text-[#718096] uppercase font-bold">
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Shop & Customer</th>
                      <th className="py-3.5 px-4">City</th>
                      <th className="py-3.5 px-4">Total Weight</th>
                      <th className="py-3.5 px-4">Packs Breakdown</th>
                      <th className="py-3.5 px-4">Payment</th>
                      <th className="py-3.5 px-4">Status & Update</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3EFEA]">
                    {filteredOrders.map((ord) => {
                      const isUpdating = statusUpdatingId === ord.id;

                      return (
                        <tr key={ord.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                          <td className="py-3 px-4 font-display font-extrabold text-[#0F2A1E]">
                            {ord.id}
                            <div className="text-[10px] text-[#718096] font-sans">
                              {new Date(ord.createdAt).toLocaleDateString()}
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-extrabold text-[#1A3D2F]">{ord.shopName}</div>
                            <div className="text-[#5C6B64]">{ord.customerName} &bull; {ord.mobile}</div>
                          </td>

                          <td className="py-3 px-4 font-medium text-[#0F2A1E]">
                            {ord.city}
                          </td>

                          <td className="py-3 px-4 font-extrabold text-sm text-[#1A3D2F]">
                            {ord.totalKg} KG
                          </td>

                          <td className="py-3 px-4 text-[11px] text-[#5C6B64]">
                            125g: {ord.items['125g']} | 250g: {ord.items['250g']}<br />
                            500g: {ord.items['500g']} | 1KG: {ord.items['1kg']}
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-[#0F2A1E]">
                              {ord.paymentMethod}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={ord.status}
                              disabled={isUpdating}
                              onChange={(e) =>
                                handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)
                              }
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-hidden ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : ord.status === 'Cancelled'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : 'bg-[#FAF8F5] text-[#1A3D2F] border-[#C69B3D]'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-3 px-4 text-right space-x-1.5">
                            <button
                              onClick={() => onViewBill(ord)}
                              className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#E7DFD5] text-[#1A3D2F] font-bold text-xs border border-[#D8CBBF] shadow-2xs"
                              title="View & Print Bill"
                            >
                              Bill
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: CUSTOMERS DIRECTORY */}
        {adminTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-5 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-[#718096] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  placeholder="Search Customers by Name, Shop, Phone, City..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#D8CBBF] text-xs font-medium text-[#0F2A1E] focus:outline-hidden"
                />
              </div>

              <div className="text-xs text-[#718096] font-bold">
                {filteredCustomers.length} Registered Shopkeepers / Customers
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((cust) => (
                <div
                  key={cust.id}
                  className="p-6 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#C69B3D]">
                        {cust.id}
                      </div>
                      <h4 className="text-lg font-display font-bold text-[#0F2A1E]">
                        {cust.customerName}
                      </h4>
                      <div className="text-xs font-extrabold text-[#1A3D2F]">
                        {cust.shopName}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E7DFD5] font-extrabold text-[#1A3D2F]">
                        {cust.totalOrders} Orders
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-[#4A5568] pt-2 border-t border-[#F3EFEA]">
                    <div><strong>Mobile:</strong> {cust.mobile}</div>
                    <div><strong>City / Area:</strong> {cust.city}</div>
                    <div><strong>Address:</strong> {cust.address}</div>
                    <div><strong>Total Tea Ordered:</strong> <span className="font-extrabold text-[#1A3D2F]">{cust.totalKg} KG</span></div>
                    <div className="text-[11px] text-[#718096] pt-1">
                      Last active: {new Date(cust.lastOrderDate).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`https://wa.me/92${cust.mobile.replace(/\D/g, '').replace(/^0/, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#0F682C] font-bold text-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: MESSAGES TO MANAGEMENT */}
        {adminTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs">
              <h3 className="text-xl font-display font-extrabold text-[#0F2A1E]">
                Direct Shopkeeper Messages ({messages.length})
              </h3>
              <p className="text-xs text-[#718096] mt-1">
                Inquiries and bulk order requests submitted through the direct management contact form.
              </p>
            </div>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-[#E7DFD5]">
                  <p className="text-sm text-[#718096]">No messages received yet.</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-6 rounded-3xl bg-white border border-[#E7DFD5] shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#0F2A1E]">
                          {msg.shopkeeperName}
                        </span>
                        <span className="text-xs font-bold text-[#1A3D2F]">
                          ({msg.shopName})
                        </span>
                      </div>
                      <span className="text-xs text-[#718096]">
                        {new Date(msg.date).toLocaleString()}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7DFD5] text-xs sm:text-sm text-[#2D3748]">
                      "{msg.message}"
                    </div>

                    {msg.phone && (
                      <div className="text-xs text-[#5C6B64] flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Phone: <strong>{msg.phone}</strong></span>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
