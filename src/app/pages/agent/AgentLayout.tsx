import { ArrowLeftRight, CreditCard, DollarSign, HelpCircle, Home, MapPin, Repeat, Settings } from 'lucide-react';
import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';

const navigation = [
  { label: 'Overview', path: '/agent', icon: Home },
  { label: 'Territories', path: '/agent/territories', icon: MapPin },
  { label: 'Commission', path: '/agent/commission', icon: DollarSign },
  { label: 'IzyPay Wallet', path: '/agent/izypay-wallet', icon: CreditCard },
  { label: 'P2P Transfer', path: '/agent/p2p-transfer', icon: ArrowLeftRight },
  { label: 'SmartBarter', path: '/agent/smartbarter', icon: Repeat },
  { label: 'Settings', path: '/agent/settings', icon: Settings },
  { label: 'Support', path: '/agent/support', icon: HelpCircle },
];

export default function AgentLayout() {
  return (
    <DashboardLayout 
      userType="agent"
      navigation={navigation}
      userName="Blessing Ncube"
      userPhone="+263 77 890 1234"
    >
      <Outlet />
    </DashboardLayout>
  );
}