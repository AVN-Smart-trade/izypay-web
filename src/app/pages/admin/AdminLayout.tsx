import { Activity, AlertCircle, CheckCircle2, CreditCard, FileText, HelpCircle, Home, Repeat, Settings, Users } from 'lucide-react';
import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';

const navigation = [
  { label: 'System Overview', path: '/admin', icon: Home },
  { label: 'Vendor Approvals', path: '/admin/approvals', icon: CheckCircle2 },
  { label: 'Transaction Monitoring', path: '/admin/monitoring', icon: Activity },
  { label: 'User Management', path: '/admin/users', icon: Users },
  { label: 'Reports', path: '/admin/reports', icon: FileText },
  { label: 'IzyPay Wallet', path: '/admin/izypay-wallet', icon: CreditCard },
  { label: 'SmartBarter', path: '/admin/smartbarter', icon: Repeat },
  { label: 'Disputes', path: '/admin/disputes', icon: AlertCircle },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
  { label: 'Support', path: '/admin/support', icon: HelpCircle },
];

export default function AdminLayout() {
  return (
    <DashboardLayout 
      userType="admin"
      navigation={navigation}
      userName="System Administrator"
      userPhone="+263 77 000 0000"
    >
      <Outlet />
    </DashboardLayout>
  );
}