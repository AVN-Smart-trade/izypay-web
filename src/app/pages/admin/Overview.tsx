import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { 
  Users, 
  Store, 
  DollarSign, 
  Shield, 
  AlertTriangle, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { systemStats, provinceData } from '../../lib/data';

export default function AdminOverview() {
  const activityData = [
    { time: '00:00', transactions: 45 },
    { time: '04:00', transactions: 12 },
    { time: '08:00', transactions: 156 },
    { time: '12:00', transactions: 289 },
    { time: '16:00', transactions: 234 },
    { time: '20:00', transactions: 98 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">System Overview</h1>
        <p className="text-muted-foreground">AVN SmartTrade Platform Monitoring</p>
      </div>

      {/* Critical Stats */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Total Users</p>
          <p className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-success">
            <TrendingUp className="w-3 h-3" />
            <span>+15% this month</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Active Vendors</p>
          <p className="text-2xl font-bold">{systemStats.activeVendors.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {systemStats.womenOwnedBusinesses}% women-owned
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Transaction Volume</p>
          <p className="text-2xl font-bold">${(systemStats.transactionVolume / 1000000).toFixed(2)}M</p>
          <p className="text-xs text-muted-foreground mt-2">Total platform</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Escrow Value</p>
          <p className="text-2xl font-bold">${systemStats.escrowValue.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">Currently held</p>
        </Card>
      </div>

      {/* Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6 border-destructive">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h3 className="font-bold">Fraud Alerts</h3>
              <p className="text-sm text-muted-foreground">{systemStats.fraudAlerts} flagged today</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-destructive/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Suspicious transaction pattern</span>
                <Badge variant="secondary" className="bg-destructive/10 text-destructive">High</Badge>
              </div>
              <p className="text-xs text-muted-foreground">TXN-2025-001240 - Multiple small transactions</p>
              <Button size="sm" variant="outline" className="mt-2">Investigate</Button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold">System Health</h3>
              <p className="text-sm text-muted-foreground">All systems operational</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Response Time</span>
              <Badge variant="secondary" className="bg-success/10 text-success">145ms</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Uptime</span>
              <Badge variant="secondary" className="bg-success/10 text-success">99.98%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Active Sessions</span>
              <Badge variant="secondary">8,421</Badge>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-6">Transaction Activity (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="transactions" stroke="#006B3F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-6">Transaction Volume by Province</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={provinceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="province" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#006B3F" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Financial Inclusion Metrics */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Financial Inclusion Metrics</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Overall Inclusion Rate</p>
            <p className="text-3xl font-bold text-primary">{systemStats.financialInclusion}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Women Participation</p>
            <p className="text-3xl font-bold text-success">{systemStats.womenOwnedBusinesses}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Youth Participation</p>
            <p className="text-3xl font-bold text-accent">{systemStats.youthParticipation}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Rural Coverage</p>
            <p className="text-3xl font-bold text-primary">34%</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
