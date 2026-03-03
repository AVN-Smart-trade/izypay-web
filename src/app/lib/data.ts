// Zimbabwe-specific dummy data for AVN SmartTrade

export const zimbabweUsers = {
  customers: [
    { id: 1, name: "Tendai Moyo", phone: "+263 77 123 4567", trustScore: 92, joined: "2025-08-15" },
    { id: 2, name: "Nyasha Dube", phone: "+263 71 234 5678", trustScore: 88, joined: "2025-09-20" },
    { id: 3, name: "Chipo Ndlovu", phone: "+263 78 345 6789", trustScore: 95, joined: "2025-07-10" },
  ],
  vendors: [
    { id: 1, name: "Tawanda Chikore", business: "Mbare Fresh Produce", phone: "+263 77 456 7890", location: "Mbare, Harare", verified: true },
    { id: 2, name: "Rumbidzai Mapfumo", business: "Harare Agro Supplies", phone: "+263 71 567 8901", location: "Glen Norah, Harare", verified: true },
    { id: 3, name: "Tinashe Mukwashi", business: "Bulawayo Tech Traders", phone: "+263 78 678 9012", location: "Bulawayo CBD", verified: true },
    { id: 4, name: "Nokutenda Zhou", business: "Mutare Wholesale Market", phone: "+263 77 789 0123", location: "Mutare", verified: false },
  ],
  agents: [
    { id: 1, name: "Blessing Ncube", phone: "+263 77 890 1234", vendorsOnboarded: 24, commission: 480 },
    { id: 2, name: "Tatenda Sibanda", phone: "+263 71 901 2345", vendorsOnboarded: 18, commission: 360 },
  ]
};

export const zimbabweProducts = [
  { id: 1, name: "Tomatoes (1kg)", price: 2.5, currency: "USD", vendor: "Mbare Fresh Produce", category: "Vegetables", stock: 150, image: "market-vegetables" },
  { id: 2, name: "Maize Meal (10kg)", price: 8.5, currency: "USD", vendor: "Harare Agro Supplies", category: "Grains", stock: 80, image: "grains" },
  { id: 3, name: "Cooking Oil (2L)", price: 6.0, currency: "USD", vendor: "Mutare Wholesale Market", category: "Groceries", stock: 120, image: "cooking-oil" },
  { id: 4, name: "Sugar Beans (5kg)", price: 12.0, currency: "USD", vendor: "Mbare Fresh Produce", category: "Pulses", stock: 60, image: "beans" },
  { id: 5, name: "Rice (5kg)", price: 10.5, currency: "USD", vendor: "Harare Agro Supplies", category: "Grains", stock: 95, image: "rice" },
  { id: 6, name: "Onions (1kg)", price: 1.8, currency: "USD", vendor: "Mbare Fresh Produce", category: "Vegetables", stock: 200, image: "onions" },
];

export const zimbabweTransactions = [
  { id: "TXN-2025-001234", date: "2025-03-02", amount: 25.50, currency: "USD", vendor: "Mbare Fresh Produce", customer: "Tendai Moyo", status: "completed", escrow: false },
  { id: "TXN-2025-001235", date: "2025-03-02", amount: 120.00, currency: "USD", vendor: "Harare Agro Supplies", customer: "Nyasha Dube", status: "escrow", escrow: true },
  { id: "TXN-2025-001236", date: "2025-03-01", amount: 5.00, currency: "USD", vendor: "Mbare Fresh Produce", customer: "Chipo Ndlovu", status: "completed", escrow: false },
  { id: "TXN-2025-001237", date: "2025-03-01", amount: 85.50, currency: "USD", vendor: "Mutare Wholesale Market", customer: "Tendai Moyo", status: "pending", escrow: true },
  { id: "TXN-2025-001238", date: "2025-02-28", amount: 42.00, currency: "USD", vendor: "Bulawayo Tech Traders", customer: "Nyasha Dube", status: "completed", escrow: false },
];

export const zimbabweOrders = [
  { id: "ORD-001234", date: "2025-03-02 10:45", customer: "Tendai Moyo", items: 3, total: 25.50, status: "delivered", escrow: false },
  { id: "ORD-001235", date: "2025-03-02 09:20", customer: "Nyasha Dube", items: 8, total: 120.00, status: "pending", escrow: true },
  { id: "ORD-001236", date: "2025-03-01 14:30", customer: "Chipo Ndlovu", items: 2, total: 5.00, status: "delivered", escrow: false },
  { id: "ORD-001237", date: "2025-03-01 11:15", customer: "Tendai Moyo", items: 5, total: 85.50, status: "processing", escrow: true },
];

export const zimbabweProvinces = [
  "Harare", "Bulawayo", "Manicaland", "Mashonaland Central", "Mashonaland East",
  "Mashonaland West", "Masvingo", "Matabeleland North", "Matabeleland South", "Midlands"
];

export const systemStats = {
  totalUsers: 24567,
  activeVendors: 3842,
  transactionVolume: 2847652,
  escrowValue: 184320,
  fraudAlerts: 12,
  womenOwnedBusinesses: 58,
  youthParticipation: 42,
  financialInclusion: 76
};

export const salesChartData = [
  { month: "Sep", sales: 12400 },
  { month: "Oct", sales: 18500 },
  { month: "Nov", sales: 22300 },
  { month: "Dec", sales: 28900 },
  { month: "Jan", sales: 31200 },
  { month: "Feb", sales: 35800 },
];

export const provinceData = [
  { province: "Harare", volume: 985000, vendors: 1240 },
  { province: "Bulawayo", volume: 542000, vendors: 680 },
  { province: "Manicaland", volume: 324000, vendors: 420 },
  { province: "Mashonaland East", volume: 298000, vendors: 380 },
  { province: "Midlands", volume: 256000, vendors: 340 },
];

export const aiInsights = [
  "Peak sales occur between 10 AM - 2 PM. Consider promotional campaigns during this window.",
  "Vegetable inventory typically runs low on Fridays. Recommend increasing stock by 30%.",
  "Your customer retention rate is 15% above market average. Keep up the excellent service!",
  "Cross-selling opportunity: Customers buying maize often purchase cooking oil. Create bundles.",
];

// New: Notifications data
export const notifications = [
  { id: 1, type: "order", title: "New Order Received", message: "Order #ORD-001245 from Tendai Moyo", time: "2 min ago", read: false },
  { id: 2, type: "payment", title: "Payment Received", message: "$25.50 deposited to your wallet", time: "15 min ago", read: false },
  { id: 3, type: "system", title: "Weekly Report Ready", message: "Your performance analytics are available", time: "1 hour ago", read: true },
  { id: 4, type: "alert", title: "Low Stock Alert", message: "Tomatoes inventory below threshold", time: "3 hours ago", read: true },
  { id: 5, type: "order", title: "Order Delivered", message: "Order #ORD-001234 marked as delivered", time: "5 hours ago", read: true },
];

// New: Disputes data
export const disputes = [
  { id: "DSP-001", orderId: "ORD-001235", customer: "Nyasha Dube", vendor: "Harare Agro Supplies", amount: 120.00, reason: "Item not as described", status: "open", date: "2025-03-02", priority: "high" },
  { id: "DSP-002", orderId: "ORD-001220", customer: "Tendai Moyo", vendor: "Mbare Fresh Produce", amount: 45.00, reason: "Delivery delay", status: "investigating", date: "2025-03-01", priority: "medium" },
  { id: "DSP-003", orderId: "ORD-001198", customer: "Chipo Ndlovu", vendor: "Mutare Wholesale Market", amount: 85.00, reason: "Wrong quantity delivered", status: "resolved", date: "2025-02-28", priority: "low" },
];

// New: Support tickets
export const supportTickets = [
  { id: "TKT-001", user: "Tendai Moyo", type: "technical", subject: "Cannot complete payment", status: "open", priority: "high", date: "2025-03-03" },
  { id: "TKT-002", user: "Tawanda Chikore", type: "account", subject: "Update business details", status: "in_progress", priority: "medium", date: "2025-03-02" },
  { id: "TKT-003", user: "Nyasha Dube", type: "general", subject: "How to track my order?", status: "resolved", priority: "low", date: "2025-03-01" },
];

// New: Wallet transactions
export const walletTransactions = [
  { id: "WTX-001", type: "credit", amount: 120.00, currency: "USD", description: "Payment from order #ORD-001235", date: "2025-03-02 14:30", balance: 1245.50 },
  { id: "WTX-002", type: "debit", amount: 85.00, currency: "USD", description: "Refund for dispute #DSP-003", date: "2025-03-02 10:15", balance: 1125.50 },
  { id: "WTX-003", type: "credit", amount: 25.50, currency: "USD", description: "Payment from order #ORD-001234", date: "2025-03-01 16:45", balance: 1210.50 },
  { id: "WTX-004", type: "transfer", amount: 200.00, currency: "USD", description: "Withdrawal to bank account", date: "2025-03-01 09:00", balance: 1185.00 },
];

// New: KYC documents
export const kycDocuments = [
  { id: 1, type: "National ID", status: "verified", uploadDate: "2025-02-15", expiryDate: "2030-02-15" },
  { id: 2, type: "Proof of Address", status: "verified", uploadDate: "2025-02-15", expiryDate: "2026-02-15" },
  { id: 3, type: "Business License", status: "pending", uploadDate: "2025-03-01", expiryDate: "2026-03-01" },
];

// New: Agent territories
export const agentTerritories = [
  { province: "Harare", districts: ["Mbare", "Glen Norah", "Highfield", "Chitungwiza"], activeVendors: 142, target: 200 },
  { province: "Bulawayo", districts: ["CBD", "Makokoba", "Nkulumane"], activeVendors: 68, target: 100 },
];

// New: Refund requests
export const refundRequests = [
  { id: "REF-001", orderId: "ORD-001220", customer: "Tendai Moyo", amount: 45.00, reason: "Damaged goods", status: "approved", date: "2025-03-02" },
  { id: "REF-002", orderId: "ORD-001215", customer: "Chipo Ndlovu", amount: 120.00, reason: "Order cancelled", status: "pending", date: "2025-03-03" },
];