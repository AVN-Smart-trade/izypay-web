import { AlertCircle, ArrowLeftRight, CreditCard, HelpCircle, History, Home, QrCode, Repeat, Settings, ShoppingCart, Store, Users, Wallet } from 'lucide-react';
import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { label: 'Overview', path: '/customer', icon: Home },
  { label: 'Marketplace', path: '/customer/marketplace', icon: Store },
  { label: 'Cart', path: '/customer/cart', icon: ShoppingCart },
  { label: 'Scan & Shop', path: '/customer/scan-and-shop', icon: QrCode },
  { label: 'Group Buying', path: '/customer/group-buying', icon: Users },
  { label: 'Transaction History', path: '/customer/transactions', icon: History },
  { label: 'Wallet', path: '/customer/wallet', icon: Wallet },
  { label: 'IzyPay Wallet', path: '/customer/izypay-wallet', icon: CreditCard },
  { label: 'P2P Transfer', path: '/customer/p2p-transfer', icon: ArrowLeftRight },
  { label: 'SmartBarter', path: '/customer/smartbarter', icon: Repeat },
  { label: 'Disputes', path: '/customer/disputes', icon: AlertCircle },
  { label: 'Settings', path: '/customer/settings', icon: Settings },
  { label: 'Support', path: '/customer/support', icon: HelpCircle },
];

export default function CustomerLayout() {
  const { user, loading } = useAuth();
  
  if (loading) return null;

  return (
    <DashboardLayout 
      userType="customer"
      navigation={navigation}
      userName={user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : (user?.login || "Guest")}
      userPhone={user?.login || "+263 77 123 4567"} // Assuming login is phone number based on Login UI
    >
      <Outlet />
    </DashboardLayout>
  );
}