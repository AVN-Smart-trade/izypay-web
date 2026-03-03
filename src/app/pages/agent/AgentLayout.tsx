import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Home, Users, MapPin, DollarSign, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { label: 'Overview', path: '/agent', icon: Home },
  { label: 'Territories', path: '/agent/territories', icon: MapPin },
  { label: 'Commission', path: '/agent/commission', icon: DollarSign },
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