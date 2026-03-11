import { AlertCircle, ArrowLeftRight, BarChart3, Building2, CreditCard, GitFork, HelpCircle, Home, Link, Package, Repeat, Settings, ShoppingBag, ShoppingBasket, Wallet } from 'lucide-react';
import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';

const navigation = [
  { label: 'Overview', path: '/vendor', icon: Home },
  { label: 'Products', path: '/vendor/products', icon: Package },
  { label: 'Orders', path: '/vendor/orders', icon: ShoppingBag },
  { label: 'Payments', path: '/vendor/payments', icon: Wallet },
  { label: 'Analytics', path: '/vendor/analytics', icon: BarChart3 },
  { label: 'Supplier Marketplace', path: '/vendor/supplier-marketplace', icon: Building2 },
  { label: 'Multi-Supplier Basket', path: '/vendor/multi-supplier-basket', icon: ShoppingBasket },
  { label: 'Revenue Split', path: '/vendor/revenue-split', icon: GitFork },
  { label: 'Pay-by-Link', path: '/vendor/pay-by-link', icon: Link },
  { label: 'Wallet', path: '/vendor/wallet', icon: Wallet },
  { label: 'IzyPay Wallet', path: '/vendor/izypay-wallet', icon: CreditCard },
  { label: 'P2P Transfer', path: '/vendor/p2p-transfer', icon: ArrowLeftRight },
  { label: 'SmartBarter', path: '/vendor/smartbarter', icon: Repeat },
  { label: 'Disputes', path: '/vendor/disputes', icon: AlertCircle },
  { label: 'Settings', path: '/vendor/settings', icon: Settings },
  { label: 'Support', path: '/vendor/support', icon: HelpCircle },
];

export default function VendorLayout() {
  return (
    <DashboardLayout 
      userType="vendor"
      navigation={navigation}
      userName="Tawanda Chikore"
      userPhone="+263 77 456 7890"
    >
      <Outlet />
    </DashboardLayout>
  );
}