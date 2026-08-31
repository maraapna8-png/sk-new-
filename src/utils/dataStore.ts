import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase';
import {
  Order,
  Customer,
  ManagementMessage,
  AdminStats,
  OrderStatus,
  OrderItemQuantities,
  PaymentMethod,
} from '../types';

// Master passcode (defaults to Admin@1973)
export const DEFAULT_ADMIN_PASSCODE = 'Admin@1973';

const STORAGE_KEYS = {
  ORDERS: 'sk_tea_orders_v2',
  CUSTOMERS: 'sk_tea_customers_v2',
  MESSAGES: 'sk_tea_messages_v2',
  ADMIN_TOKEN: 'sk_admin_token',
  ADMIN_PASSCODE: 'sk_admin_custom_passcode',
  ORDER_COUNTER: 'sk_tea_order_counter',
};

// Initial Seed Orders
const INITIAL_ORDERS: Order[] = [
  {
    id: 'SKT-000107',
    customerId: 'CUST-006',
    customerName: 'Abdullah',
    shopName: 'Abid General Store',
    mobile: '03430277466',
    address: 'Eidgah Road, Main Bazar',
    city: 'Dera Ismail Khan',
    items: { '125g': 3, '250g': 2, '500g': 2, '1kg': 1 },
    totalKg: 2.875,
    paymentMethod: 'EasyPaisa',
    status: 'New',
    createdAt: '2026-08-24T11:52:38.130Z',
    updatedAt: '2026-08-24T11:52:38.130Z',
  },
  {
    id: 'SKT-000106',
    customerId: 'CUST-005',
    customerName: 'Abdullah',
    shopName: 'Abdullah General Store',
    mobile: '03430277488',
    address: 'Eidgah Bazar',
    city: 'Dera Ismail Khan',
    items: { '125g': 8, '250g': 4, '500g': 4, '1kg': 2 },
    totalKg: 6.0,
    paymentMethod: 'COD',
    status: 'Confirmed',
    createdAt: '2026-08-24T11:18:37.455Z',
    updatedAt: '2026-08-24T11:20:00.000Z',
  },
  {
    id: 'SKT-000105',
    customerId: 'CUST-004',
    customerName: 'Kashif Ali',
    shopName: 'Bismillah Kiryana Store',
    mobile: '03451122334',
    address: 'Circular Road, Near Bus Stand',
    city: 'Sialkot',
    notes: 'Urgent delivery needed before Thursday',
    items: { '125g': 4, '250g': 4, '500g': 2, '1kg': 0 },
    totalKg: 2.5,
    paymentMethod: 'COD',
    status: 'Processing',
    createdAt: '2026-08-24T10:43:37.455Z',
    updatedAt: '2026-08-24T10:50:00.000Z',
  },
  {
    id: 'SKT-000104',
    customerId: 'CUST-003',
    customerName: 'Haji Abdul Razzaq',
    shopName: 'Razzaq Tea Traders',
    mobile: '03339876543',
    address: 'Shop # 45, Grain Market (Ghala Mandi)',
    city: 'Rawalpindi',
    notes: 'Standard batch testing pack',
    items: { '125g': 8, '250g': 4, '500g': 2, '1kg': 3 },
    totalKg: 6.0,
    paymentMethod: 'COD',
    status: 'Processing',
    createdAt: '2026-08-24T01:18:37.455Z',
    updatedAt: '2026-08-24T02:00:00.000Z',
  },
  {
    id: 'SKT-000103',
    customerId: 'CUST-002',
    customerName: 'Tariq Mehmood',
    shopName: 'Tariq Chai & Cafe',
    mobile: '03217654321',
    address: 'Chowk Yadgar, Near Royal Market',
    city: 'Lahore',
    notes: 'Please call 15 minutes before arrival',
    items: { '125g': 0, '250g': 2, '500g': 4, '1kg': 5 },
    totalKg: 7.5,
    paymentMethod: 'EasyPaisa',
    status: 'Out for Delivery',
    createdAt: '2026-08-23T11:18:37.455Z',
    updatedAt: '2026-08-24T08:00:00.000Z',
  },
  {
    id: 'SKT-000102',
    customerId: 'CUST-001',
    customerName: 'Muhammad Aslam',
    shopName: 'Al-Madina General Store',
    mobile: '03001234567',
    address: 'Shop #12, Main Bazar, G.T. Road',
    city: 'Gujranwala',
    notes: 'Deliver before evening rush hours',
    items: { '125g': 4, '250g': 4, '500g': 2, '1kg': 2 },
    totalKg: 4.5,
    paymentMethod: 'COD',
    status: 'Delivered',
    createdAt: '2026-08-22T11:18:37.455Z',
    updatedAt: '2026-08-23T15:00:00.000Z',
  },
];

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    customerName: 'Muhammad Aslam',
    shopName: 'Al-Madina General Store',
    mobile: '03001234567',
    address: 'Shop #12, Main Bazar, G.T. Road',
    city: 'Gujranwala',
    totalOrders: 1,
    totalKg: 4.5,
    lastOrderDate: '2026-08-22T11:18:37.455Z',
    firstOrderDate: '2026-08-22T11:18:37.455Z',
  },
  {
    id: 'CUST-002',
    customerName: 'Tariq Mehmood',
    shopName: 'Tariq Chai & Cafe',
    mobile: '03217654321',
    address: 'Chowk Yadgar, Near Royal Market',
    city: 'Lahore',
    totalOrders: 1,
    totalKg: 7.5,
    lastOrderDate: '2026-08-23T11:18:37.455Z',
    firstOrderDate: '2026-08-23T11:18:37.455Z',
  },
  {
    id: 'CUST-003',
    customerName: 'Haji Abdul Razzaq',
    shopName: 'Razzaq Tea Traders',
    mobile: '03339876543',
    address: 'Shop # 45, Grain Market (Ghala Mandi)',
    city: 'Rawalpindi',
    totalOrders: 1,
    totalKg: 6.0,
    lastOrderDate: '2026-08-24T01:18:37.455Z',
    firstOrderDate: '2026-08-24T01:18:37.455Z',
  },
  {
    id: 'CUST-004',
    customerName: 'Kashif Ali',
    shopName: 'Bismillah Kiryana Store',
    mobile: '03451122334',
    address: 'Circular Road, Near Bus Stand',
    city: 'Sialkot',
    totalOrders: 1,
    totalKg: 2.5,
    lastOrderDate: '2026-08-24T10:43:37.455Z',
    firstOrderDate: '2026-08-24T10:43:37.455Z',
  },
  {
    id: 'CUST-005',
    customerName: 'Abdullah',
    shopName: 'Abdullah General Store',
    mobile: '03430277488',
    address: 'Eidgah Bazar',
    city: 'Dera Ismail Khan',
    totalOrders: 1,
    totalKg: 6.0,
    firstOrderDate: '2026-08-24T11:18:37.455Z',
    lastOrderDate: '2026-08-24T11:18:37.455Z',
  },
  {
    id: 'CUST-006',
    customerName: 'Abdullah',
    shopName: 'Abid General Store',
    mobile: '03430277466',
    address: 'Eidgah Road, Main Bazar',
    city: 'Dera Ismail Khan',
    totalOrders: 1,
    totalKg: 2.875,
    firstOrderDate: '2026-08-24T11:52:38.130Z',
    lastOrderDate: '2026-08-24T11:52:38.130Z',
  },
];

const INITIAL_MESSAGES: ManagementMessage[] = [
  {
    id: 'MSG-002',
    shopkeeperName: 'Abdullah',
    shopName: 'Abid General Store',
    message: 'Salam Zeeshan Bhai, order received on time. Quality is excellent.',
    phone: '03430277466',
    date: '2026-08-24T11:26:59.476Z',
    status: 'New',
  },
  {
    id: 'MSG-001',
    shopkeeperName: 'Kashif Ali',
    shopName: 'Bismillah Kiryana Store',
    message: 'Salam Muhammad Zeeshan sb, hum ne pehla 2.5 KG ka order book kiya hai. Meharbani kar ke jaldi dispatch karwa dein.',
    date: '2026-08-24T10:33:37.455Z',
    status: 'Read',
    phone: '03451122334',
  },
];

// Helper to safely parse JSON from localStorage
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// Helper to safely write JSON to localStorage
function setLocalItem(key: string, value: any): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save to localStorage key "${key}":`, e);
  }
}

// Ensure initial local cache exists
export function initLocalData() {
  const orders = getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, []);
  if (!orders || orders.length === 0) {
    setLocalItem(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  }

  const customers = getLocalItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, []);
  if (!customers || customers.length === 0) {
    setLocalItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  }

  const messages = getLocalItem<ManagementMessage[]>(STORAGE_KEYS.MESSAGES, []);
  if (!messages || messages.length === 0) {
    setLocalItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  }

  const counter = getLocalItem<number>(STORAGE_KEYS.ORDER_COUNTER, 0);
  if (!counter || counter < 108) {
    setLocalItem(STORAGE_KEYS.ORDER_COUNTER, 108);
  }
}

// Calculate Total Weight in KG for items
export function calculateOrderKg(items: OrderItemQuantities): number {
  if (!items) return 0;
  const q125 = Number(items['125g'] || 0);
  const q250 = Number(items['250g'] || 0);
  const q500 = Number(items['500g'] || 0);
  const q1kg = Number(items['1kg'] || 0);
  return Number((q125 * 0.125 + q250 * 0.25 + q500 * 0.5 + q1kg * 1.0).toFixed(3));
}

// Helper to calculate admin stats from orders
export function computeStats(orders: Order[], customers: Customer[]): AdminStats {
  const stats: AdminStats = {
    totalOrders: orders.length,
    newOrders: 0,
    confirmedOrders: 0,
    processingOrders: 0,
    outForDeliveryOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalKgOrdered: 0,
    totalCustomers: customers.length,
    recentOrders: orders.slice(0, 10),
  };

  orders.forEach((o) => {
    if (o.status === 'New') stats.newOrders++;
    else if (o.status === 'Confirmed') stats.confirmedOrders++;
    else if (o.status === 'Processing') stats.processingOrders++;
    else if (o.status === 'Out for Delivery') stats.outForDeliveryOrders++;
    else if (o.status === 'Delivered') stats.deliveredOrders++;
    else if (o.status === 'Cancelled') stats.cancelledOrders++;

    stats.totalKgOrdered += o.totalKg || 0;
  });

  stats.totalKgOrdered = Math.round(stats.totalKgOrdered * 1000) / 1000;
  return stats;
}

// ----------------------------------------------------
// AUTHENTICATION
// ----------------------------------------------------

export async function loginAdmin(passcode: string): Promise<{ success: boolean; token?: string; error?: string }> {
  initLocalData();
  const trimmed = (passcode || '').trim();

  const savedCustomPasscode = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSCODE);
  const isValidPasscode =
    trimmed === DEFAULT_ADMIN_PASSCODE ||
    trimmed.toLowerCase() === DEFAULT_ADMIN_PASSCODE.toLowerCase() ||
    trimmed.toLowerCase() === 'admin1973' ||
    trimmed === 'Admin1973' ||
    (savedCustomPasscode && (trimmed === savedCustomPasscode || trimmed.toLowerCase() === savedCustomPasscode.toLowerCase()));

  if (isValidPasscode) {
    const localToken = `sk_admin_local_${Date.now()}_auth_token`;
    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, localToken);

    // Try server API in background
    try {
      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: trimmed }),
      }).then(async (res) => {
        const ct = res.headers.get('content-type') || '';
        if (res.ok && ct.includes('application/json')) {
          const data = await res.json();
          if (data.token) {
            localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
          }
        }
      }).catch(() => {});
    } catch {}

    return { success: true, token: localToken };
  }

  // Check server API
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: trimmed }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, data.token);
        return { success: true, token: data.token };
      } else if (res.status === 401 || data.error) {
        return { success: false, error: data.error || 'Incorrect passcode. Access denied.' };
      }
    }
  } catch {
    // Fallback
  }

  return {
    success: false,
    error: 'Incorrect passcode. Access denied.',
  };
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  if (!token) return false;
  if (token.startsWith('sk_admin_local_')) return true;

  try {
    const res = await fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return Boolean(data.valid);
    }
  } catch {}

  return token.startsWith('sk_admin_');
}

export function logoutAdmin(): void {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
}

// ----------------------------------------------------
// REALTIME FIRESTORE SUBSCRIPTIONS
// ----------------------------------------------------

export function subscribeToOrders(callback: (orders: Order[]) => void): Unsubscribe {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Order[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Order);
          });
          setLocalItem(STORAGE_KEYS.ORDERS, list);
          callback(list);
        } else {
          // If Firestore is empty, seed initial
          fetchAllOrders().then(callback);
        }
      },
      (err) => {
        console.warn('Firestore orders snapshot subscription error, using local data:', err);
        callback(getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
      }
    );
  } catch (err) {
    console.warn('Could not establish Firestore orders listener:', err);
    callback(getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS));
    return () => {};
  }
}

export function subscribeToCustomers(callback: (customers: Customer[]) => void): Unsubscribe {
  try {
    const q = collection(db, 'customers');
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: Customer[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as Customer);
          });
          setLocalItem(STORAGE_KEYS.CUSTOMERS, list);
          callback(list);
        } else {
          callback(getLocalItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS));
        }
      },
      (err) => {
        console.warn('Firestore customers snapshot error:', err);
        callback(getLocalItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS));
      }
    );
  } catch (err) {
    console.warn('Could not establish Firestore customers listener:', err);
    callback(getLocalItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS));
    return () => {};
  }
}

export function subscribeToMessages(callback: (messages: ManagementMessage[]) => void): Unsubscribe {
  try {
    const q = query(collection(db, 'messages'), orderBy('date', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: ManagementMessage[] = [];
          snapshot.forEach((docSnap) => {
            list.push(docSnap.data() as ManagementMessage);
          });
          setLocalItem(STORAGE_KEYS.MESSAGES, list);
          callback(list);
        } else {
          callback(getLocalItem<ManagementMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES));
        }
      },
      (err) => {
        console.warn('Firestore messages snapshot error:', err);
        callback(getLocalItem<ManagementMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES));
      }
    );
  } catch (err) {
    console.warn('Could not establish Firestore messages listener:', err);
    callback(getLocalItem<ManagementMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES));
    return () => {};
  }
}

// ----------------------------------------------------
// ORDERS OPERATIONS (FIRESTORE CLOUD SYNC + CACHE)
// ----------------------------------------------------

export async function fetchAllOrders(token?: string): Promise<Order[]> {
  initLocalData();

  // Try Firestore first (Global Cloud Sync)
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const ordersList: Order[] = [];
      snapshot.forEach((docSnap) => {
        ordersList.push(docSnap.data() as Order);
      });
      setLocalItem(STORAGE_KEYS.ORDERS, ordersList);
      return ordersList;
    } else {
      // Seed Firestore with initial orders
      for (const ord of INITIAL_ORDERS) {
        await setDoc(doc(db, 'orders', ord.id), ord);
      }
      setLocalItem(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
  } catch (err) {
    console.warn('Firestore fetch failed, checking API/local:', err);
  }

  // Try Express API if hosted with backend
  if (token) {
    try {
      const res = await fetch('/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          setLocalItem(STORAGE_KEYS.ORDERS, data.orders);
          return data.orders;
        }
      }
    } catch {}
  } else {
    try {
      const res = await fetch('/api/orders');
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.orders && Array.isArray(data.orders)) {
          setLocalItem(STORAGE_KEYS.ORDERS, data.orders);
          return data.orders;
        }
      }
    } catch {}
  }

  return getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
}

export async function placeOrder(orderData: {
  customerName: string;
  shopName: string;
  mobile: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItemQuantities;
  paymentMethod: PaymentMethod;
}): Promise<{ success: boolean; order: Order; error?: string }> {
  initLocalData();

  const totalKg = calculateOrderKg(orderData.items);
  const now = new Date().toISOString();

  // Generate unique order ID using timestamp and counter
  let nextCounter = getLocalItem<number>(STORAGE_KEYS.ORDER_COUNTER, 108);
  nextCounter++;
  setLocalItem(STORAGE_KEYS.ORDER_COUNTER, nextCounter);

  const orderId = `SKT-${String(nextCounter).padStart(6, '0')}`;

  // Customer resolution
  const customers = getLocalItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  let customer = customers.find(
    (c) =>
      c.mobile === orderData.mobile.trim() ||
      c.shopName.toLowerCase() === orderData.shopName.toLowerCase().trim()
  );

  const customerId = customer ? customer.id : `CUST-${String(customers.length + 1).padStart(3, '0')}`;

  if (customer) {
    customer.totalOrders = (customer.totalOrders || 0) + 1;
    customer.totalKg = Math.round(((customer.totalKg || 0) + totalKg) * 1000) / 1000;
    customer.lastOrderDate = now;
    customer.address = orderData.address;
    customer.city = orderData.city;
  } else {
    customer = {
      id: customerId,
      customerName: orderData.customerName,
      shopName: orderData.shopName,
      mobile: orderData.mobile,
      address: orderData.address,
      city: orderData.city,
      totalOrders: 1,
      totalKg,
      firstOrderDate: now,
      lastOrderDate: now,
    };
    customers.unshift(customer);
  }
  setLocalItem(STORAGE_KEYS.CUSTOMERS, customers);

  const newOrder: Order = {
    id: orderId,
    customerId,
    customerName: orderData.customerName,
    shopName: orderData.shopName,
    mobile: orderData.mobile,
    address: orderData.address,
    city: orderData.city,
    notes: orderData.notes || '',
    items: orderData.items,
    totalKg,
    paymentMethod: orderData.paymentMethod,
    status: 'New',
    createdAt: now,
    updatedAt: now,
  };

  // 1. Save directly to Firestore (Cloud Sync across all devices)
  try {
    await setDoc(doc(db, 'orders', newOrder.id), newOrder);
    await setDoc(doc(db, 'customers', customer.id), customer);
  } catch (err) {
    console.warn('Firestore write error while placing order:', err);
  }

  // 2. Also notify Express API if running in fullstack mode
  try {
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    }).catch(() => {});
  } catch {}

  // 3. Cache in local storage
  const existingOrders = getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const updatedOrders = [newOrder, ...existingOrders.filter((o) => o.id !== newOrder.id)];
  setLocalItem(STORAGE_KEYS.ORDERS, updatedOrders);

  return { success: true, order: newOrder };
}

export async function findOrderByIdOrPhone(queryText: string): Promise<Order | null> {
  initLocalData();
  const clean = queryText.trim().toLowerCase();
  if (!clean) return null;

  // 1. Try Firestore direct lookup
  try {
    const directDoc = await getDoc(doc(db, 'orders', queryText.trim().toUpperCase()));
    if (directDoc.exists()) {
      return directDoc.data() as Order;
    }

    // Search in recent Firestore docs
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      let matched: Order | null = null;
      snapshot.forEach((d) => {
        const o = d.data() as Order;
        if (
          o.id.toLowerCase() === clean ||
          o.id.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '') ||
          o.mobile.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))
        ) {
          matched = o;
        }
      });
      if (matched) return matched;
    }
  } catch (err) {
    console.warn('Firestore search error:', err);
  }

  // 2. Try API
  try {
    const res = await fetch(`/api/orders/${encodeURIComponent(clean)}`);
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data.order) return data.order;
    }
  } catch {}

  // 3. Local fallback
  const orders = getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  const found = orders.find(
    (o) =>
      o.id.toLowerCase() === clean ||
      o.id.toLowerCase().replace(/[^a-z0-9]/g, '') === clean.replace(/[^a-z0-9]/g, '') ||
      o.mobile.replace(/\D/g, '').includes(clean.replace(/\D/g, ''))
  );

  return found || null;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  token?: string
): Promise<{ success: boolean; order?: Order }> {
  initLocalData();
  const now = new Date().toISOString();

  // 1. Update in Firestore (Cloud sync to all devices)
  try {
    await updateDoc(doc(db, 'orders', orderId), {
      status: newStatus,
      updatedAt: now,
    });
  } catch (err) {
    console.warn('Firestore status update error:', err);
  }

  // 2. Try API
  if (token && !token.startsWith('sk_admin_local_')) {
    try {
      fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }).catch(() => {});
    } catch {}
  }

  // 3. Update local cache
  const orders = getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  let updatedOrder: Order | undefined;

  const updatedOrders = orders.map((o) => {
    if (o.id === orderId) {
      updatedOrder = {
        ...o,
        status: newStatus,
        updatedAt: now,
      };
      return updatedOrder;
    }
    return o;
  });

  if (updatedOrder) {
    setLocalItem(STORAGE_KEYS.ORDERS, updatedOrders);
    return { success: true, order: updatedOrder };
  }

  return { success: true };
}

export async function deleteOrder(orderId: string, token?: string): Promise<boolean> {
  initLocalData();

  // 1. Delete in Firestore
  try {
    await deleteDoc(doc(db, 'orders', orderId));
  } catch (err) {
    console.warn('Firestore delete order error:', err);
  }

  // 2. Try API
  if (token && !token.startsWith('sk_admin_local_')) {
    try {
      fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    } catch {}
  }

  // 3. Local cache update
  const orders = getLocalItem<Order[]>(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
  setLocalItem(STORAGE_KEYS.ORDERS, orders.filter((o) => o.id !== orderId));
  return true;
}

// ----------------------------------------------------
// CUSTOMERS & MESSAGES
// ----------------------------------------------------

export async function fetchAllCustomers(token?: string): Promise<Customer[]> {
  initLocalData();

  // 1. Try Firestore
  try {
    const snapshot = await getDocs(collection(db, 'customers'));
    if (!snapshot.empty) {
      const customersList: Customer[] = [];
      snapshot.forEach((d) => customersList.push(d.data() as Customer));
      setLocalItem(STORAGE_KEYS.CUSTOMERS, customersList);
      return customersList;
    } else {
      for (const cust of INITIAL_CUSTOMERS) {
        await setDoc(doc(db, 'customers', cust.id), cust);
      }
      setLocalItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
      return INITIAL_CUSTOMERS;
    }
  } catch (err) {
    console.warn('Firestore fetch customers error:', err);
  }

  // 2. Try API
  if (token && !token.startsWith('sk_admin_local_')) {
    try {
      const res = await fetch('/api/admin/customers', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.customers && Array.isArray(data.customers)) {
          setLocalItem(STORAGE_KEYS.CUSTOMERS, data.customers);
          return data.customers;
        }
      }
    } catch {}
  }

  return getLocalItem<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
}

export async function fetchAllMessages(token?: string): Promise<ManagementMessage[]> {
  initLocalData();

  // 1. Try Firestore
  try {
    const q = query(collection(db, 'messages'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const msgsList: ManagementMessage[] = [];
      snapshot.forEach((d) => msgsList.push(d.data() as ManagementMessage));
      setLocalItem(STORAGE_KEYS.MESSAGES, msgsList);
      return msgsList;
    } else {
      for (const msg of INITIAL_MESSAGES) {
        await setDoc(doc(db, 'messages', msg.id), msg);
      }
      setLocalItem(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
      return INITIAL_MESSAGES;
    }
  } catch (err) {
    console.warn('Firestore fetch messages error:', err);
  }

  // 2. Try API
  if (token && !token.startsWith('sk_admin_local_')) {
    try {
      const res = await fetch('/api/admin/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.messages && Array.isArray(data.messages)) {
          setLocalItem(STORAGE_KEYS.MESSAGES, data.messages);
          return data.messages;
        }
      }
    } catch {}
  }

  return getLocalItem<ManagementMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
}

export async function saveManagementMessage(msg: {
  shopkeeperName: string;
  shopName: string;
  message: string;
  phone?: string;
}): Promise<ManagementMessage> {
  initLocalData();

  const messages = getLocalItem<ManagementMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
  const newMsg: ManagementMessage = {
    id: `MSG-${String(Date.now()).slice(-6)}`,
    shopkeeperName: msg.shopkeeperName,
    shopName: msg.shopName,
    message: msg.message,
    phone: msg.phone || '',
    date: new Date().toISOString(),
    status: 'New',
  };

  // 1. Save to Firestore
  try {
    await setDoc(doc(db, 'messages', newMsg.id), newMsg);
  } catch (err) {
    console.warn('Firestore message save error:', err);
  }

  // 2. Try API
  try {
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    }).catch(() => {});
  } catch {}

  // 3. Save locally
  messages.unshift(newMsg);
  setLocalItem(STORAGE_KEYS.MESSAGES, messages);
  return newMsg;
}
