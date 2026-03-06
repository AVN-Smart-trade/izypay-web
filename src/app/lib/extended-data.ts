// Extended data for AVN SmartTrade advanced features

// SUPPLIERS - Multi-supplier basket system
export const suppliers = [
  { 
    id: 1, 
    name: "Mutare Mega Wholesalers", 
    location: "Mutare", 
    category: "General Goods",
    rating: 4.8,
    verified: true,
    productsCount: 245,
    minOrder: 50,
    deliveryDays: "2-3 days"
  },
  { 
    id: 2, 
    name: "Harare Bulk Distributors", 
    location: "Harare", 
    category: "Food & Beverages",
    rating: 4.6,
    verified: true,
    productsCount: 180,
    minOrder: 100,
    deliveryDays: "1-2 days"
  },
  { 
    id: 3, 
    name: "Bulawayo Import Hub", 
    location: "Bulawayo", 
    category: "Electronics & Appliances",
    rating: 4.9,
    verified: true,
    productsCount: 320,
    minOrder: 200,
    deliveryDays: "3-5 days"
  },
];

// SUPPLIER PRODUCTS
export const supplierProducts = [
  { id: 1, supplierId: 1, name: "Sugar (50kg)", price: 45.00, category: "Food", stock: 500, minOrder: 5 },
  { id: 2, supplierId: 1, name: "Flour (25kg)", price: 28.00, category: "Food", stock: 300, minOrder: 10 },
  { id: 3, supplierId: 1, name: "Cooking Oil (25L)", price: 65.00, category: "Food", stock: 150, minOrder: 5 },
  { id: 4, supplierId: 2, name: "Rice (50kg)", price: 85.00, category: "Grains", stock: 200, minOrder: 5 },
  { id: 5, supplierId: 2, name: "Beans (25kg)", price: 42.00, category: "Pulses", stock: 180, minOrder: 10 },
  { id: 6, supplierId: 3, name: "LED TV 32\"", price: 280.00, category: "Electronics", stock: 50, minOrder: 1 },
  { id: 7, supplierId: 3, name: "Refrigerator 200L", price: 450.00, category: "Appliances", stock: 30, minOrder: 1 },
];

// MULTI-SUPPLIER BASKET
export const multiSupplierBasket = {
  items: [
    { productId: 1, supplierId: 1, supplierName: "Mutare Mega Wholesalers", name: "Sugar (50kg)", price: 45.00, quantity: 10, subtotal: 450.00 },
    { productId: 4, supplierId: 2, supplierName: "Harare Bulk Distributors", name: "Rice (50kg)", price: 85.00, quantity: 5, subtotal: 425.00 },
    { productId: 6, supplierId: 3, supplierName: "Bulawayo Import Hub", name: "LED TV 32\"", price: 280.00, quantity: 2, subtotal: 560.00 },
  ],
  totalAmount: 1435.00,
  supplierBreakdown: [
    { supplierId: 1, supplierName: "Mutare Mega Wholesalers", amount: 450.00, itemCount: 1 },
    { supplierId: 2, supplierName: "Harare Bulk Distributors", amount: 425.00, itemCount: 1 },
    { supplierId: 3, supplierName: "Bulawayo Import Hub", amount: 560.00, itemCount: 1 },
  ]
};

// REVENUE SPLIT CONFIGURATIONS
export const revenueSplits = [
  {
    id: 1,
    name: "Standard Vendor Split",
    totalAmount: 100.00,
    splits: [
      { party: "Vendor", percentage: 70, amount: 70.00 },
      { party: "Supplier", percentage: 20, amount: 20.00 },
      { party: "Sales Agent", percentage: 10, amount: 10.00 },
    ]
  },
  {
    id: 2,
    name: "Premium Supplier Split",
    totalAmount: 500.00,
    splits: [
      { party: "Vendor", percentage: 65, amount: 325.00 },
      { party: "Supplier", percentage: 25, amount: 125.00 },
      { party: "Platform Fee", percentage: 10, amount: 50.00 },
    ]
  },
];

// PAYMENT LINKS
export const paymentLinks = [
  {
    id: "PL-001234",
    amount: 50.00,
    currency: "USD",
    description: "Product Payment",
    createdDate: "2025-03-05",
    expiryDate: "2025-03-12",
    status: "active",
    link: "https://pay.avnsmarttrade.zw/PL-001234",
    paidAmount: 0,
    clicks: 5
  },
  {
    id: "PL-001235",
    amount: 120.00,
    currency: "USD",
    description: "Bulk Order Invoice",
    createdDate: "2025-03-03",
    expiryDate: "2025-03-10",
    status: "paid",
    link: "https://pay.avnsmarttrade.zw/PL-001235",
    paidAmount: 120.00,
    clicks: 3,
    paidDate: "2025-03-04"
  },
];

// OFFLINE TRANSACTIONS QUEUE
export const offlineQueue = [
  { id: "OFF-001", type: "payment", amount: 25.00, customer: "Tendai Moyo", status: "pending", timestamp: "2025-03-06 10:15" },
  { id: "OFF-002", type: "order", amount: 45.00, customer: "Chipo Ndlovu", status: "pending", timestamp: "2025-03-06 10:20" },
  { id: "OFF-003", type: "payment", amount: 12.00, customer: "Nyasha Dube", status: "syncing", timestamp: "2025-03-06 10:25" },
];

// FOREX RATES
export const forexRates = {
  USD: { ZIG: 30.5, ZAR: 18.2, rate: 1.0 },
  ZIG: { USD: 0.0328, ZAR: 0.597, rate: 30.5 },
  ZAR: { USD: 0.055, ZIG: 1.676, rate: 18.2 },
};

// GROUP PURCHASES
export const groupPurchases = [
  {
    id: "GP-001",
    productName: "Bulk Sugar Order",
    targetAmount: 500.00,
    collectedAmount: 340.00,
    remainingAmount: 160.00,
    participants: 8,
    targetParticipants: 10,
    status: "active",
    deadline: "2025-03-10",
    organizer: "Tawanda Chikore",
    contributions: [
      { name: "Tendai Moyo", amount: 50.00 },
      { name: "Chipo Ndlovu", amount: 50.00 },
      { name: "Nyasha Dube", amount: 40.00 },
    ]
  },
  {
    id: "GP-002",
    productName: "Electronics Bulk Buy",
    targetAmount: 1000.00,
    collectedAmount: 1000.00,
    remainingAmount: 0,
    participants: 5,
    targetParticipants: 5,
    status: "completed",
    deadline: "2025-03-01",
    organizer: "Rumbidzai Mapfumo",
    completedDate: "2025-02-28"
  },
];

// COLLECTIVE INVESTMENT POOL (CIP)
export const investmentPool = {
  totalBalance: 2450.00,
  autoInvestEnabled: true,
  autoInvestPercentage: 5,
  monthlyContribution: 120.00,
  contributions: [
    { date: "2025-03-01", amount: 120.00, source: "Auto-invest from sales", balance: 2450.00 },
    { date: "2025-02-28", amount: 85.00, source: "Manual contribution", balance: 2330.00 },
    { date: "2025-02-25", amount: 150.00, source: "Auto-invest from sales", balance: 2245.00 },
  ],
  growthRate: 8.5,
  projectedAnnual: 2850.00
};

// NFC/TAP PAYMENT TRANSACTIONS
export const nfcTransactions = [
  { id: "NFC-001", amount: 15.50, cardType: "Visa", status: "success", timestamp: "2025-03-06 10:30", customer: "Anonymous" },
  { id: "NFC-002", amount: 42.00, cardType: "Mastercard", status: "success", timestamp: "2025-03-06 10:28", customer: "Anonymous" },
  { id: "NFC-003", amount: 25.00, cardType: "Visa", status: "declined", timestamp: "2025-03-06 10:25", customer: "Anonymous" },
];

// BARCODE SCAN PRODUCTS
export const barcodeProducts = [
  { barcode: "6001087415255", name: "Coca Cola 500ml", price: 1.50, stock: 200, vendor: "Mbare Fresh Produce" },
  { barcode: "6009175711019", name: "Cooking Oil 2L", price: 6.00, stock: 150, vendor: "Harare Agro Supplies" },
  { barcode: "6001087000116", name: "Bread White", price: 1.20, stock: 100, vendor: "Mbare Fresh Produce" },
];

// SALES ANALYTICS - EXTENDED
export const salesAnalytics = {
  daily: [
    { date: "Mar 1", sales: 1240, orders: 45 },
    { date: "Mar 2", sales: 1580, orders: 52 },
    { date: "Mar 3", sales: 1320, orders: 48 },
    { date: "Mar 4", sales: 1890, orders: 61 },
    { date: "Mar 5", sales: 1650, orders: 55 },
    { date: "Mar 6", sales: 1420, orders: 49 },
  ],
  topProducts: [
    { name: "Tomatoes (1kg)", sales: 450, revenue: 1125.00 },
    { name: "Maize Meal (10kg)", sales: 280, revenue: 2380.00 },
    { name: "Cooking Oil (2L)", sales: 320, revenue: 1920.00 },
  ],
  supplierPerformance: [
    { supplier: "Mutare Mega Wholesalers", orders: 45, revenue: 2250.00, rating: 4.8 },
    { supplier: "Harare Bulk Distributors", orders: 38, revenue: 1900.00, rating: 4.6 },
    { supplier: "Bulawayo Import Hub", orders: 52, revenue: 2600.00, rating: 4.9 },
  ],
  paymentMethods: [
    { method: "Mobile Money", percentage: 45, amount: 3375.00 },
    { method: "Cash", percentage: 30, amount: 2250.00 },
    { method: "Card", percentage: 15, amount: 1125.00 },
    { method: "Bank Transfer", percentage: 10, amount: 750.00 },
  ]
};

// PLATFORM ADMIN METRICS
export const platformMetrics = {
  totalRevenue: 2847652,
  monthlyGrowth: 12.5,
  activeVendors: 3842,
  newVendors: 124,
  pendingApprovals: 23,
  fraudAlerts: 12,
  totalTransactions: 45678,
  averageOrderValue: 62.35,
  platformFees: 142382.60,
  escrowBalance: 184320,
};
