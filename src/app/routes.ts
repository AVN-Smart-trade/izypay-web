import { createBrowserRouter } from "react-router";

// Auth pages
import Landing from "./pages/Landing";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OTPVerification from "./pages/auth/OTPVerification";
import BiometricPrompt from "./pages/auth/BiometricPrompt";

// Customer pages
import CustomerLayout from "./pages/customer/CustomerLayout";
import CustomerOverview from "./pages/customer/Overview";
import Marketplace from "./pages/customer/Marketplace";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import PaymentSuccess from "./pages/customer/PaymentSuccess";
import TransactionHistory from "./pages/customer/TransactionHistory";
import ScanAndShop from "./pages/customer/ScanAndShop";
import GroupBuying from "./pages/customer/GroupBuying";

// Vendor pages
import VendorLayout from "./pages/vendor/VendorLayout";
import VendorOverview from "./pages/vendor/Overview";
import ProductManagement from "./pages/vendor/ProductManagement";
import OrdersManagement from "./pages/vendor/OrdersManagement";
import VendorPayments from "./pages/vendor/Payments";
import VendorAnalytics from "./pages/vendor/Analytics";
import SupplierMarketplace from "./pages/vendor/SupplierMarketplace";
import MultiSupplierBasket from "./pages/vendor/MultiSupplierBasket";
import RevenueSplit from "./pages/vendor/RevenueSplit";
import PayByLink from "./pages/vendor/PayByLink";

// Agent pages
import AgentLayout from "./pages/agent/AgentLayout";
import AgentOverview from "./pages/agent/Overview";
import TerritoryManagement from "./pages/agent/TerritoryManagement";
import CommissionTracking from "./pages/agent/CommissionTracking";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/Overview";
import VendorApprovals from "./pages/admin/VendorApprovals";
import TransactionMonitoring from "./pages/admin/TransactionMonitoring";
import UserManagement from "./pages/admin/UserManagement";
import Reports from "./pages/admin/Reports";

// Government pages
import GovLayout from "./pages/government/GovLayout";
import GovOverview from "./pages/government/Overview";
import ComplianceReports from "./pages/government/ComplianceReports";

// Shared pages
import Settings from "./pages/shared/Settings";
import WalletManagement from "./pages/shared/WalletManagement";
import DisputeResolution from "./pages/shared/DisputeResolution";
import Support from "./pages/shared/Support";

import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/otp-verify",
    Component: OTPVerification,
  },
  {
    path: "/biometric",
    Component: BiometricPrompt,
  },
  {
    path: "/customer",
    Component: CustomerLayout,
    children: [
      { index: true, Component: CustomerOverview },
      { path: "marketplace", Component: Marketplace },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "transactions", Component: TransactionHistory },
      { path: "wallet", Component: WalletManagement },
      { path: "disputes", Component: DisputeResolution },
      { path: "settings", Component: Settings },
      { path: "support", Component: Support },
      { path: "scan-and-shop", Component: ScanAndShop },
      { path: "group-buying", Component: GroupBuying },
    ],
  },
  {
    path: "/vendor",
    Component: VendorLayout,
    children: [
      { index: true, Component: VendorOverview },
      { path: "products", Component: ProductManagement },
      { path: "orders", Component: OrdersManagement },
      { path: "payments", Component: VendorPayments },
      { path: "analytics", Component: VendorAnalytics },
      { path: "wallet", Component: WalletManagement },
      { path: "disputes", Component: DisputeResolution },
      { path: "settings", Component: Settings },
      { path: "support", Component: Support },
      { path: "supplier-marketplace", Component: SupplierMarketplace },
      { path: "multi-supplier-basket", Component: MultiSupplierBasket },
      { path: "revenue-split", Component: RevenueSplit },
      { path: "pay-by-link", Component: PayByLink },
    ],
  },
  {
    path: "/agent",
    Component: AgentLayout,
    children: [
      { index: true, Component: AgentOverview },
      { path: "territories", Component: TerritoryManagement },
      { path: "commission", Component: CommissionTracking },
      { path: "settings", Component: Settings },
      { path: "support", Component: Support },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminOverview },
      { path: "approvals", Component: VendorApprovals },
      { path: "monitoring", Component: TransactionMonitoring },
      { path: "users", Component: UserManagement },
      { path: "reports", Component: Reports },
      { path: "disputes", Component: DisputeResolution },
      { path: "settings", Component: Settings },
      { path: "support", Component: Support },
    ],
  },
  {
    path: "/government",
    Component: GovLayout,
    children: [
      { index: true, Component: GovOverview },
      { path: "compliance", Component: ComplianceReports },
      { path: "support", Component: Support },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);