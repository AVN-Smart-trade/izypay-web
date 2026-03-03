import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Home, CheckCircle2, Activity, Users, FileText, AlertCircle, Settings, HelpCircle } from 'lucide-react';

const navigation = [
  { label: 'System Overview', path: '/admin', icon: Home },
  { label: 'Vendor Approvals', path: '/admin/approvals', icon: CheckCircle2 },
  { label: 'Transaction Monitoring', path: '/admin/monitoring', icon: Activity },
  { label: 'User Management', path: '/admin/users', icon: Users },
  { label: 'Reports', path: '/admin/reports', icon: FileText },
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