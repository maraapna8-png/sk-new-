import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

interface OrderItemQuantities {
  '125g': number;
  '250g': number;
  '500g': number;
  '1kg': number;
}

interface OrderRecord {
  id: string;
  customerId: string;
  customerName: string;
  shopName: string;
  mobile: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItemQuantities;
  totalKg: number;
  paymentMethod: 'COD' | 'EasyPaisa';
  status: 'New' | 'Confirmed' | 'Processing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}

interface CustomerRecord {
  id: string;
  customerName: string;
  shopName: string;
  mobile: string;
  address: string;
  city: string;
  totalOrders: number;
  totalKg: number;
  lastOrderDate: string;
  firstOrderDate: string;
}

interface ManagementMessageRecord {
  id: string;
  shopkeeperName: string;
  shopName: string;
  message: string;
  date: string;
  status: 'New' | 'Read';
  phone?: string;
}

interface DatabaseSchema {
  orders: OrderRecord[];
  customers: CustomerRecord[];
  messages: ManagementMessageRecord[];
  orderCounter: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadDatabase(): DatabaseSchema {
  if (!fs.existsSync(DB_FILE)) {
    const initialData: DatabaseSchema = {
      orderCounter: 105,
      orders: [
        {
          id: 'SKT-000101',
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
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        },
        {
          id: 'SKT-000102',
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
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        },
        {
          id: 'SKT-000103',
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
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        },
        {
          id: 'SKT-000104',
          customerId: 'CUST-004',
          customerName: 'Kashif Ali',
          shopName: 'Bismillah Kiryana Store',
          mobile: '03451122334',
          address: 'Circular Road, Near Bus Stand',
          city: 'Sialkot',
          notes: 'First time ordering from SK Tea Company',
          items: { '125g': 4, '250g': 2, '500g': 1, '1kg': 1 },
          totalKg: 2.5,
          paymentMethod: 'EasyPaisa',
          status: 'New',
          createdAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
          updatedAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        },
      ],
      customers: [
        {
          id: 'CUST-001',
          customerName: 'Muhammad Aslam',
          shopName: 'Al-Madina General Store',
          mobile: '03001234567',
          address: 'Shop #12, Main Bazar, G.T. Road',
          city: 'Gujranwala',
          totalOrders: 1,
          totalKg: 4.5,
          lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
          firstOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
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
          lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          firstOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
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
          lastOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
          firstOrderDate: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
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
          lastOrderDate: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
          firstOrderDate: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        },
      ],
      messages: [
        {
          id: 'MSG-001',
          shopkeeperName: 'Kashif Ali',
          shopName: 'Bismillah Kiryana Store',
          message: 'Salam Muhammad Zeeshan sb, hum ne pehla 2.5 KG ka order book kiya hai. Meharbani kar ke jaldi dispatch karwa dein.',
          date: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          status: 'Read',
          phone: '03451122334',
        },
      ],
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
    return initialData;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { orders: [], customers: [], messages: [], orderCounter: 100 };
  }
}

function saveDatabase(data: DatabaseSchema): void {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Authentication & Brute-force security
const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || 'Admin@1973';
const AUTH_SECRET = process.env.AUTH_SECRET || 'sk-tea-security-salt-2026';
const failedLoginAttempts: Record<string, { count: number; lockedUntil?: number }> = {};

function createAdminToken(): string {
  const timestamp = Date.now();
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`admin-${timestamp}`)
    .digest('hex');
  return `sk_admin_${timestamp}_${signature}`;
}

function verifyAdminToken(token: string | undefined): boolean {
  if (!token || !token.startsWith('sk_admin_')) return false;
  const parts = token.split('_');
  if (parts.length !== 4) return false;
  const [, , timestampStr, signature] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp) || Date.now() - timestamp > 1000 * 60 * 60 * 24 * 7) {
    return false; // Token expired after 7 days
  }
  const expectedSig = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(`admin-${timestamp}`)
    .digest('hex');
  return signature === expectedSig;
}

function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.replace('Bearer ', '');
  if (!verifyAdminToken(token)) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired admin session' });
  }
  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'SK Tea Company',
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Admin Auth Login
  app.post('/api/auth/login', (req, res) => {
    const ip = req.ip || 'unknown-ip';
    const now = Date.now();
    const tracker = failedLoginAttempts[ip] || { count: 0 };

    if (tracker.lockedUntil && tracker.lockedUntil > now) {
      const waitSeconds = Math.ceil((tracker.lockedUntil - now) / 1000);
      return res.status(429).json({
        error: `Too many failed attempts. Please try again in ${waitSeconds} seconds.`,
      });
    }

    const { passcode } = req.body;
    if (passcode === ADMIN_PASSCODE) {
      delete failedLoginAttempts[ip];
      const token = createAdminToken();
      return res.json({
        success: true,
        token,
        role: 'admin',
        message: 'Admin access granted.',
      });
    } else {
      tracker.count = (tracker.count || 0) + 1;
      if (tracker.count >= 5) {
        tracker.lockedUntil = now + 60 * 1000; // 1 minute lockout
      }
      failedLoginAttempts[ip] = tracker;
      return res.status(401).json({
        error: 'Invalid admin passcode. Please verify your credentials.',
        remainingAttempts: Math.max(0, 5 - tracker.count),
      });
    }
  });

  // 3. Admin Auth Verify
  app.get('/api/auth/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');
    const valid = verifyAdminToken(token);
    res.json({ valid });
  });

  // 4. Public: Track or View Single Order by ID
  app.get('/api/orders/:id', (req, res) => {
    const db = loadDatabase();
    const orderId = req.params.id.trim().toUpperCase();
    const order = db.orders.find((o) => o.id.toUpperCase() === orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ order });
  });

  // 5. Public: Create New Order
  app.post('/api/orders', (req, res) => {
    const { customerName, shopName, mobile, address, city, notes, items, paymentMethod } = req.body;

    if (!customerName || !shopName || !mobile || !address || !city) {
      return res.status(400).json({ error: 'Missing required customer details.' });
    }

    if (!items || typeof items !== 'object') {
      return res.status(400).json({ error: 'Invalid items payload.' });
    }

    const q125 = Number(items['125g'] || 0);
    const q250 = Number(items['250g'] || 0);
    const q500 = Number(items['500g'] || 0);
    const q1kg = Number(items['1kg'] || 0);

    const totalKg = Number((q125 * 0.125 + q250 * 0.25 + q500 * 0.5 + q1kg * 1.0).toFixed(3));

    if (totalKg <= 0) {
      return res.status(400).json({ error: 'Please select at least one pack size quantity.' });
    }

    const validPayment = paymentMethod === 'EasyPaisa' ? 'EasyPaisa' : 'COD';

    const db = loadDatabase();
    db.orderCounter = (db.orderCounter || 100) + 1;
    const orderId = `SKT-${String(db.orderCounter).padStart(6, '0')}`;

    // Normalize customer
    const cleanMobile = mobile.trim();
    let customer = db.customers.find((c) => c.mobile.replace(/\D/g, '') === cleanMobile.replace(/\D/g, ''));

    const nowIso = new Date().toISOString();

    if (!customer) {
      customer = {
        id: `CUST-${String(db.customers.length + 1).padStart(3, '0')}`,
        customerName: customerName.trim(),
        shopName: shopName.trim(),
        mobile: cleanMobile,
        address: address.trim(),
        city: city.trim(),
        totalOrders: 1,
        totalKg: totalKg,
        firstOrderDate: nowIso,
        lastOrderDate: nowIso,
      };
      db.customers.push(customer);
    } else {
      customer.totalOrders += 1;
      customer.totalKg = Number((customer.totalKg + totalKg).toFixed(3));
      customer.lastOrderDate = nowIso;
      customer.customerName = customerName.trim();
      customer.shopName = shopName.trim();
      customer.address = address.trim();
      customer.city = city.trim();
    }

    const newOrder: OrderRecord = {
      id: orderId,
      customerId: customer.id,
      customerName: customerName.trim(),
      shopName: shopName.trim(),
      mobile: cleanMobile,
      address: address.trim(),
      city: city.trim(),
      notes: notes ? notes.trim() : undefined,
      items: {
        '125g': q125,
        '250g': q250,
        '500g': q500,
        '1kg': q1kg,
      },
      totalKg,
      paymentMethod: validPayment,
      status: 'New',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    db.orders.unshift(newOrder);
    saveDatabase(db);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: newOrder,
    });
  });

  // 6. Public: Direct Message to Management
  app.post('/api/messages', (req, res) => {
    const { shopkeeperName, shopName, message, phone } = req.body;
    if (!shopkeeperName || !shopName || !message) {
      return res.status(400).json({ error: 'Shopkeeper name, shop name, and message are required.' });
    }

    const db = loadDatabase();
    const msgId = `MSG-${String(db.messages.length + 1).padStart(3, '0')}`;
    const newMsg: ManagementMessageRecord = {
      id: msgId,
      shopkeeperName: shopkeeperName.trim(),
      shopName: shopName.trim(),
      message: message.trim(),
      phone: phone ? phone.trim() : undefined,
      date: new Date().toISOString(),
      status: 'New',
    };

    db.messages.unshift(newMsg);
    saveDatabase(db);

    res.status(201).json({ success: true, message: newMsg });
  });

  // 7. Admin Only: Get all orders with search & filtering
  app.get('/api/admin/orders', requireAdminAuth, (req, res) => {
    const db = loadDatabase();
    const { search, status, date } = req.query;

    let result = [...db.orders];

    if (status && status !== 'All') {
      result = result.filter((o) => o.status === status);
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.shopName.toLowerCase().includes(q) ||
          o.mobile.includes(q) ||
          o.city.toLowerCase().includes(q)
      );
    }

    if (date && typeof date === 'string') {
      result = result.filter((o) => o.createdAt.startsWith(date));
    }

    res.json({ orders: result });
  });

  // 8. Admin Only: Update Order Status
  app.patch('/api/admin/orders/:id/status', requireAdminAuth, (req, res) => {
    const { status } = req.body;
    const validStatuses = ['New', 'Confirmed', 'Processing', 'Out for Delivery', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const db = loadDatabase();
    const orderIndex = db.orders.findIndex((o) => o.id === req.params.id);

    if (orderIndex === -1) {
      return res.status(404).json({ error: 'Order not found' });
    }

    db.orders[orderIndex].status = status;
    db.orders[orderIndex].updatedAt = new Date().toISOString();
    saveDatabase(db);

    res.json({
      success: true,
      order: db.orders[orderIndex],
    });
  });

  // 9. Admin Only: Customers directory
  app.get('/api/admin/customers', requireAdminAuth, (req, res) => {
    const db = loadDatabase();
    res.json({ customers: db.customers });
  });

  // 10. Admin Only: Messages list & status update
  app.get('/api/admin/messages', requireAdminAuth, (req, res) => {
    const db = loadDatabase();
    res.json({ messages: db.messages });
  });

  app.patch('/api/admin/messages/:id/read', requireAdminAuth, (req, res) => {
    const db = loadDatabase();
    const msg = db.messages.find((m) => m.id === req.params.id);
    if (msg) {
      msg.status = 'Read';
      saveDatabase(db);
    }
    res.json({ success: true });
  });

  // 11. Admin Only: Dashboard Analytics & Stats
  app.get('/api/admin/stats', requireAdminAuth, (req, res) => {
    const db = loadDatabase();
    const totalOrders = db.orders.length;
    const newOrders = db.orders.filter((o) => o.status === 'New').length;
    const confirmedOrders = db.orders.filter((o) => o.status === 'Confirmed').length;
    const processingOrders = db.orders.filter((o) => o.status === 'Processing').length;
    const outForDeliveryOrders = db.orders.filter((o) => o.status === 'Out for Delivery').length;
    const deliveredOrders = db.orders.filter((o) => o.status === 'Delivered').length;
    const cancelledOrders = db.orders.filter((o) => o.status === 'Cancelled').length;

    const totalKgOrdered = Number(
      db.orders
        .filter((o) => o.status !== 'Cancelled')
        .reduce((sum, o) => sum + (o.totalKg || 0), 0)
        .toFixed(2)
    );

    res.json({
      totalOrders,
      newOrders,
      confirmedOrders,
      processingOrders,
      outForDeliveryOrders,
      deliveredOrders,
      cancelledOrders,
      totalKgOrdered,
      totalCustomers: db.customers.length,
      recentOrders: db.orders.slice(0, 5),
    });
  });

  // Vite Middleware Setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SK Tea Company server running on http://localhost:${PORT}`);
  });
}

startServer();
