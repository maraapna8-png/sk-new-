export type PackSizeKey = '125g' | '250g' | '500g' | '1kg';

export interface PackSizeConfig {
  key: PackSizeKey;
  label: string;
  weightInKg: number;
  description: string;
  recommendedFor: string;
  approxRatePerPack?: number;
}

export type OrderStatus =
  | 'New'
  | 'Confirmed'
  | 'Processing'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'COD' | 'EasyPaisa';

export interface OrderItemQuantities {
  '125g': number;
  '250g': number;
  '500g': number;
  '1kg': number;
}

export interface Order {
  id: string; // e.g. SKT-000101
  customerId: string;
  customerName: string;
  shopName: string;
  mobile: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItemQuantities;
  totalKg: number;
  estimatedAmount?: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
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

export interface ManagementMessage {
  id: string;
  shopkeeperName: string;
  shopName: string;
  message: string;
  date: string;
  status: 'New' | 'Read';
  phone?: string;
}

export type LanguageCode = 'simple-english' | 'roman-english' | 'urdu';

export type NavItemId =
  | 'home'
  | 'order'
  | 'tracker'
  | 'history'
  | 'about'
  | 'faqs'
  | 'contact'
  | 'admin'
  | 'bill'
  | 'confirmation';

export interface AdminStats {
  totalOrders: number;
  newOrders: number;
  confirmedOrders: number;
  processingOrders: number;
  outForDeliveryOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  totalKgOrdered: number;
  totalCustomers: number;
  recentOrders: Order[];
}
