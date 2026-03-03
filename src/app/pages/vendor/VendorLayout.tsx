import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Home, Package, ShoppingBag, Wallet, BarChart3, AlertCircle, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { label: 'Overview', path: '/vendor', icon: Home },
  { label: 'Products', path: '/vendor/products', icon: Package },
  { label: 'Orders', path: '/vendor/orders', icon: ShoppingBag },
  { label: 'Payments', path: '/vendor/payments', icon: Wallet },
  { label: 'Analytics', path: '/vendor/analytics', icon: BarChart3 },
  { label: 'Wallet', path: '/vendor/wallet', icon: Wallet },
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