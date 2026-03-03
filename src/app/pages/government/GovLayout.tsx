import { Outlet } from 'react-router';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Home, Shield, HelpCircle } from 'lucide-react';

const navigation = [
  { label: 'National Overview', path: '/government', icon: Home },
  { label: 'Compliance Reports', path: '/government/compliance', icon: Shield },
  { label: 'Support', path: '/government/support', icon: HelpCircle },
];

export default function GovLayout() {
  return (
    <DashboardLayout 
      userType="government"
      navigation={navigation}
      userName="Government Observer"
      userPhone="Ministry of Finance"
    >
      <Outlet />
    </DashboardLayout>
  );
}