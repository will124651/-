export interface TodoItem {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  completed: boolean;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  type: 'system' | 'inquiry' | 'order' | 'finance';
  title: string;
  content: string;
  time: string;
  read: boolean;
}

export interface InquiryItem {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unit: string;
  budget: number;
  status: 'draft' | 'auditing' | 'quoting' | 'completed' | 'canceled';
  deadline: string;
  description: string;
  bids: BidItem[];
  selectedBidId?: string;
  createdAt: string;
}

export interface BidItem {
  id: string;
  supplierName: string;
  pricePerUnit: number;
  totalPrice: number;
  deliveryDays: number;
  status: 'pending' | 'accepted' | 'rejected';
  remark: string;
}

export interface OrderItem {
  id: string;
  title: string;
  vendor: string;
  amount: number;
  status: 'pending_approval' | 'approved' | 'shipping' | 'completed' | 'rejected';
  date: string;
  items: Array<{ name: string; qty: number; unitPrice: number }>;
  addressId?: string;
  approvalComment?: string;
}

export interface AddressItem {
  id: string;
  receiver: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

export interface ReconciliationBill {
  id: string;
  billPeriod: string;
  vendorName: string;
  amount: number;
  orderCount: number;
  status: 'pending_confirm' | 'confirmed' | 'rejected';
  createdTime: string;
  rejectionReason?: string;
}

export interface InvoiceHeader {
  id: string;
  companyName: string;
  taxNumber: string;
  bankName: string;
  bankAccount: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

export interface InvoiceRequest {
  id: string;
  orderIds: string[];
  amount: number;
  headerId: string;
  status: 'pending' | 'issued' | 'rejected';
  invoiceNo?: string;
  createdTime: string;
}

export interface PaymentReceipt {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: 'processing' | 'success' | 'failed';
  paymentTime: string;
  receiptNo: string;
}

export interface AfterSaleRequest {
  id: string;
  orderId: string;
  productName: string;
  reason: 'quality' | 'shortage' | 'damage' | 'other';
  description: string;
  status: 'submitted' | 'processing' | 'approved' | 'rejected';
  refundAmount?: number;
  createdTime: string;
}

export interface SupplierReview {
  id: string;
  supplierName: string;
  qualityRating: number;
  deliveryRating: number;
  serviceRating: number;
  comment: string;
  createdTime: string;
}

export interface ExportJob {
  id: string;
  fileName: string;
  fileSize: string;
  status: 'ready' | 'processing' | 'completed';
  progress: number; // 0 to 100
  createdTime: string;
}

export interface CouponItem {
  id: string;
  name: string;
  type: 'discount' | 'cashback';
  value: number;
  threshold: number;
  expiryDate: string;
  status: 'available' | 'used' | 'expired';
}

export interface WelfareProduct {
  id: string;
  name: string;
  price: number;
  pointsPrice: number;
  image: string;
  category: string;
  inventory: number;
  description: string;
}

export interface WelfareOrder {
  id: string;
  productName: string;
  employeeCount: number;
  pointsSpent: number;
  totalCashSpent: number;
  status: 'pending' | 'shipping' | 'completed';
  createdTime: string;
}

export interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  supplier: string;
  image: string;
}
