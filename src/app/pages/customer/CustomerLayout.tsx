import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Home, Store, ShoppingCart, History, Wallet, AlertCircle, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { label: 'Overview', path: '/customer', icon: Home },
  { label: 'Marketplace', path: '/customer/marketplace', icon: Store },
  { label: 'Cart', path: '/customer/cart', icon: ShoppingCart },
  { label: 'Transaction History', path: '/customer/transactions', icon: History },
  { label: 'Wallet', path: '/customer/wallet', icon: Wallet },
  { label: 'Disputes', path: '/customer/disputes', icon: AlertCircle },
  { label: 'Settings', path: '/customer/settings', icon: Settings },
  { label: 'Support', path: '/customer/support', icon: HelpCircle },
];

export default function CustomerLayout() {
  return (
    <DashboardLayout 
      userType="customer"
      navigation={navigation}
      userName="Tendai Moyo"
      userPhone="+263 77 123 4567"
    >
      <Outlet />
    </DashboardLayout>
  );
}