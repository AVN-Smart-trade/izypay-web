// IzyPay Wallet Service & SmartBarter Service Data

// IZYPAY WALLET - Multi-Currency Balances
export const walletBalances = {
  userId: "USR-001",
  userName: "Tendai Moyo",
  wallets: [
    {
      currency: "USD",
      balance: 1245.50,
      available: 1180.50,
      pending: 65.00,
      symbol: "$",
      flag: "🇺🇸"
    },
    {
      currency: "ZIG",
      balance: 38420.00,
      available: 36800.00,
      pending: 1620.00,
      symbol: "Z$",
      flag: "🇿🇼"
    },
    {
      currency: "DAC",
      balance: 450.00,
      available: 450.00,
      pending: 0,
      symbol: "DAC",
      flag: "🌾",
      description: "Digital Asset Credits"
    }
  ],
  totalValueUSD: 2875.80,
  lastUpdated: "2025-03-11 14:30"
};

// P2P TRANSFERS
export const p2pTransfers = [
  {
    id: "P2P-001234",
    type: "sent",
    recipient: "Chipo Ndlovu",
    recipientPhone: "+263 78 345 6789",
    amount: 50.00,
    currency: "USD",
    status: "completed",
    date: "2025-03-11 10:30",
    reference: "Lunch money",
    fee: 0.50
  },
  {
    id: "P2P-001235",
    type: "received",
    sender: "Nyasha Dube",
    senderPhone: "+263 71 234 5678",
    amount: 25.00,
    currency: "USD",
    status: "completed",
    date: "2025-03-11 09:15",
    reference: "Payment for groceries",
    fee: 0.00
  },
  {
    id: "P2P-001236",
    type: "sent",
    recipient: "Blessing Ncube",
    recipientPhone: "+263 77 890 1234",
    amount: 100.00,
    currency: "ZIG",
    status: "pending",
    date: "2025-03-11 14:20",
    reference: "Business payment",
    fee: 2.00
  }
];

// WALLET TRANSACTION HISTORY
export const walletTransactions = [
  {
    id: "TXN-W-001234",
    type: "merchant_payment",
    description: "Scan & Pay - Mbare Fresh Produce",
    amount: -25.50,
    currency: "USD",
    balance: 1245.50,
    date: "2025-03-11 13:45",
    status: "completed",
    icon: "shopping_bag"
  },
  {
    id: "TXN-W-001235",
    type: "p2p_received",
    description: "P2P from Nyasha Dube",
    amount: 25.00,
    currency: "USD",
    balance: 1271.00,
    date: "2025-03-11 09:15",
    status: "completed",
    icon: "arrow_down"
  },
  {
    id: "TXN-W-001236",
    type: "top_up",
    description: "Mobile Money Deposit",
    amount: 200.00,
    currency: "USD",
    balance: 1246.00,
    date: "2025-03-10 16:20",
    status: "completed",
    icon: "plus"
  },
  {
    id: "TXN-W-001237",
    type: "asset_exchange",
    description: "DAC Exchange - Maize Sale",
    amount: 150.00,
    currency: "DAC",
    balance: 450.00,
    date: "2025-03-10 11:30",
    status: "completed",
    icon: "repeat"
  }
];

// SAVINGS INTEGRATION
export const savingsAccounts = [
  {
    id: "SAV-001",
    name: "Emergency Fund",
    balance: 850.00,
    currency: "USD",
    interestRate: 5.5,
    autoSaveEnabled: true,
    autoSaveAmount: 20.00,
    autoSaveFrequency: "weekly",
    goal: 2000.00,
    progress: 42.5
  },
  {
    id: "SAV-002",
    name: "Business Growth",
    balance: 1200.00,
    currency: "USD",
    interestRate: 6.0,
    autoSaveEnabled: true,
    autoSaveAmount: 5,
    autoSaveFrequency: "per_transaction",
    goal: 5000.00,
    progress: 24
  }
];

// TRUST SCORE
export const trustScore = {
  score: 850,
  maxScore: 1000,
  rating: "Excellent",
  factors: [
    { name: "Payment History", score: 95, weight: 35 },
    { name: "Transaction Volume", score: 88, weight: 25 },
    { name: "Account Age", score: 82, weight: 15 },
    { name: "P2P Success Rate", score: 92, weight: 15 },
    { name: "Merchant Ratings", score: 85, weight: 10 }
  ],
  benefits: [
    "Higher transaction limits",
    "Lower fees on transfers",
    "Priority support access",
    "Instant settlement enabled"
  ],
  history: [
    { month: "Sep 2024", score: 720 },
    { month: "Oct 2024", score: 750 },
    { month: "Nov 2024", score: 780 },
    { month: "Dec 2024", score: 810 },
    { month: "Jan 2025", score: 835 },
    { month: "Feb 2025", score: 850 }
  ]
};

// ========================================
// SMARTBARTER SERVICE - ASSET BACKED EXCHANGE
// ========================================

// REGISTERED ASSETS
export const registeredAssets = [
  {
    id: "AST-001",
    type: "grain",
    category: "Maize",
    quantity: 500,
    unit: "kg",
    valuePerUnit: 0.45,
    totalValueUSD: 225.00,
    totalValueDAC: 225.00,
    location: "Warehouse A - Harare",
    warehouseReceipt: "WR-2025-001234",
    registrationDate: "2025-02-15",
    expiryDate: "2025-08-15",
    status: "active",
    owner: "Tawanda Chikore",
    quality: "Grade A",
    moisture: "12.5%"
  },
  {
    id: "AST-002",
    type: "livestock",
    category: "Cattle",
    quantity: 3,
    unit: "head",
    valuePerUnit: 800.00,
    totalValueUSD: 2400.00,
    totalValueDAC: 2400.00,
    location: "Farm - Masvingo",
    warehouseReceipt: "WR-2025-001235",
    registrationDate: "2025-03-01",
    expiryDate: "2026-03-01",
    status: "active",
    owner: "Rumbidzai Mapfumo",
    quality: "Healthy",
    breed: "Mashona"
  },
  {
    id: "AST-003",
    type: "commodity",
    category: "Tobacco",
    quantity: 200,
    unit: "kg",
    valuePerUnit: 3.50,
    totalValueUSD: 700.00,
    totalValueDAC: 700.00,
    location: "Warehouse B - Mutare",
    warehouseReceipt: "WR-2025-001236",
    registrationDate: "2025-03-05",
    expiryDate: "2025-12-31",
    status: "active",
    owner: "Tinashe Mukwashi",
    quality: "Premium",
    grade: "A1"
  }
];

// DIGITAL ASSET CREDITS (DACs)
export const dacPortfolio = {
  totalDACs: 3325.00,
  totalValueUSD: 3325.00,
  breakdown: [
    {
      assetType: "Grain (Maize)",
      dacs: 225.00,
      percentage: 6.8,
      valueUSD: 225.00,
      assetId: "AST-001"
    },
    {
      assetType: "Livestock (Cattle)",
      dacs: 2400.00,
      percentage: 72.2,
      valueUSD: 2400.00,
      assetId: "AST-002"
    },
    {
      assetType: "Commodity (Tobacco)",
      dacs: 700.00,
      percentage: 21.0,
      valueUSD: 700.00,
      assetId: "AST-003"
    }
  ],
  redeemable: 3325.00,
  locked: 0
};

// ASSET EXCHANGE HISTORY
export const assetExchanges = [
  {
    id: "EXC-001",
    type: "asset_to_goods",
    assetType: "Grain (Maize)",
    assetQuantity: 100,
    assetUnit: "kg",
    dacUsed: 45.00,
    goodsReceived: "Farm Equipment",
    merchantName: "Harare Agro Supplies",
    date: "2025-03-10 11:30",
    status: "completed",
    exchangeRate: 1.0
  },
  {
    id: "EXC-002",
    type: "dac_to_cash",
    assetType: "Tobacco",
    assetQuantity: 50,
    assetUnit: "kg",
    dacUsed: 175.00,
    cashReceived: 175.00,
    currency: "USD",
    date: "2025-03-08 14:15",
    status: "completed",
    exchangeRate: 1.0
  },
  {
    id: "EXC-003",
    type: "asset_to_services",
    assetType: "Livestock",
    assetQuantity: 0.5,
    assetUnit: "head equivalent",
    dacUsed: 400.00,
    serviceReceived: "Veterinary Services - 6 months",
    merchantName: "Zimbabwe Vet Services",
    date: "2025-03-05 09:45",
    status: "completed",
    exchangeRate: 1.0
  }
];

// WAREHOUSE RECEIPTS
export const warehouseReceipts = [
  {
    id: "WR-2025-001234",
    assetId: "AST-001",
    assetType: "Maize",
    quantity: 500,
    unit: "kg",
    warehouse: "National Grain Storage - Harare",
    warehouseAddress: "Industrial Area, Harare",
    storageLocation: "Bay 12, Section A",
    receiptDate: "2025-02-15",
    expiryDate: "2025-08-15",
    quality: "Grade A",
    moisture: "12.5%",
    inspectionDate: "2025-02-14",
    inspector: "Zimbabwe Grain Board",
    barcode: "WR2025001234567890",
    status: "valid",
    transferable: true
  },
  {
    id: "WR-2025-001235",
    assetId: "AST-002",
    assetType: "Cattle",
    quantity: 3,
    unit: "head",
    warehouse: "Livestock Holding - Masvingo",
    warehouseAddress: "Masvingo Ranching Area",
    storageLocation: "Pen 5",
    receiptDate: "2025-03-01",
    expiryDate: "2026-03-01",
    quality: "Healthy",
    breed: "Mashona",
    inspectionDate: "2025-02-28",
    inspector: "Veterinary Services Department",
    barcode: "WR2025001235567891",
    status: "valid",
    transferable: true
  }
];

// ASSET MARKETPLACE
export const assetMarketplace = [
  {
    id: "MKT-001",
    sellerId: "VND-045",
    sellerName: "Nokutenda Zhou",
    assetType: "Maize",
    quantity: 1000,
    unit: "kg",
    pricePerUnit: 0.48,
    totalPrice: 480.00,
    currency: "USD",
    acceptsDAC: true,
    location: "Mutare",
    quality: "Grade A",
    postedDate: "2025-03-09",
    status: "available"
  },
  {
    id: "MKT-002",
    sellerId: "VND-032",
    sellerName: "Blessing Ncube",
    assetType: "Sorghum",
    quantity: 750,
    unit: "kg",
    pricePerUnit: 0.42,
    totalPrice: 315.00,
    currency: "USD",
    acceptsDAC: true,
    location: "Bulawayo",
    quality: "Grade B",
    postedDate: "2025-03-10",
    status: "available"
  }
];

// PARTIAL REDEMPTION CALCULATOR
export const redemptionOptions = [
  {
    percentage: 25,
    label: "Quarter Redemption",
    dacAmount: 56.25,
    assetQuantity: 125,
    unit: "kg",
    estimatedValue: 56.25
  },
  {
    percentage: 50,
    label: "Half Redemption",
    dacAmount: 112.50,
    assetQuantity: 250,
    unit: "kg",
    estimatedValue: 112.50
  },
  {
    percentage: 75,
    label: "Three-Quarter Redemption",
    dacAmount: 168.75,
    assetQuantity: 375,
    unit: "kg",
    estimatedValue: 168.75
  },
  {
    percentage: 100,
    label: "Full Redemption",
    dacAmount: 225.00,
    assetQuantity: 500,
    unit: "kg",
    estimatedValue: 225.00
  }
];

// SMARTBARTER STATS
export const smartBarterStats = {
  totalAssetsRegistered: 847,
  totalDACsIssued: 1245680,
  totalDACsCirculating: 845320,
  totalValueLocked: 1245680,
  activeExchanges: 234,
  completedExchanges: 5678,
  averageExchangeValue: 185.50,
  topAssetTypes: [
    { type: "Grain", percentage: 45, value: 560556 },
    { type: "Livestock", percentage: 35, value: 436076 },
    { type: "Commodities", percentage: 20, value: 249136 }
  ]
};
