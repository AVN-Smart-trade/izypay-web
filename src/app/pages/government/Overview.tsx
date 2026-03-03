import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Shield, 
  Activity,
  MapPin
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { systemStats, provinceData } from '../../lib/data';

export default function GovOverview() {
  const inclusionTrend = [
    { month: 'Sep', rate: 68 },
    { month: 'Oct', rate: 70 },
    { month: 'Nov', rate: 72 },
    { month: 'Dec', rate: 74 },
    { month: 'Jan', rate: 75 },
    { month: 'Feb', rate: 76 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl p-8 relative overflow-hidden">
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">
            Ministry of Finance - Read Only Access
          </Badge>
          <h1 className="text-4xl font-bold mb-2">AVN SmartTrade National Overview</h1>
          <p className="text-lg opacity-90">Financial Inclusion & Economic Monitoring Dashboard</p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1678059466227-d19beeff7557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxaaW1iYWJ3ZSUyMGdvdmVybm1lbnQlMjBidWlsZGluZyUyMG9mZmljaWFsfGVufDF8fHx8MTc3MjQ5NjAxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Government"
          className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-10"
        />
      </div>

      {/* Critical National Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-primary">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Financial Inclusion Rate</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-primary">{systemStats.financialInclusion}%</p>
            <Badge variant="secondary" className="bg-success/10 text-success">+4%</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">National Target: 80% by Dec 2025</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Active Economic Participants</p>
          <p className="text-3xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">Across all 10 provinces</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Total Transaction Volume</p>
          <p className="text-3xl font-bold">${(systemStats.transactionVolume / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-muted-foreground mt-2">Platform lifetime value</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Fraud Reduction</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-success">87%</p>
            <Badge variant="secondary" className="bg-success/10 text-success">↓ 13%</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Since platform launch</p>
        </Card>
      </div>

      {/* Inclusive Growth Metrics */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-6">Inclusive Economic Growth</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground mb-3">Women-Owned Businesses</p>
            <div className="flex items-baseline gap-3 mb-2">
              <p className="text-5xl font-bold text-primary">{systemStats.womenOwnedBusinesses}%</p>
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+8%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">2,228 women entrepreneurs</p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${systemStats.womenOwnedBusinesses}%` }} />
            </div>
          </div>

          <div className="p-6 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-sm text-muted-foreground mb-3">Youth Participation (18-35)</p>
            <div className="flex items-baseline gap-3 mb-2">
              <p className="text-5xl font-bold text-accent">{systemStats.youthParticipation}%</p>
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+12%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">10,318 youth engaged</p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: `${systemStats.youthParticipation}%` }} />
            </div>
          </div>

          <div className="p-6 bg-success/5 rounded-lg border border-success/20">
            <p className="text-sm text-muted-foreground mb-3">Rural SME Participation</p>
            <div className="flex items-baseline gap-3 mb-2">
              <p className="text-5xl font-bold text-success">34%</p>
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+6%</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">1,306 rural vendors</p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: '34%' }} />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Financial Inclusion Trend */}
        <Card className="p-6">
          <h3 className="font-bold mb-6">Financial Inclusion Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inclusionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[60, 80]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#006B3F" 
                strokeWidth={3}
                dot={{ fill: '#006B3F', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            On track to meet 80% national target by December 2025
          </p>
        </Card>

        {/* Provincial Distribution */}
        <Card className="p-6">
          <h3 className="font-bold mb-6">Economic Activity by Province</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={provinceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="province" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="volume" fill="#006B3F" name="Transaction Volume ($)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* SME Growth Index */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">SME Growth Index</h3>
        <div className="grid md:grid-cols-5 gap-6">
          {provinceData.map((province) => (
            <div key={province.province} className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <p className="font-medium text-sm">{province.province}</p>
              </div>
              <p className="text-2xl font-bold mb-1">{province.vendors}</p>
              <p className="text-xs text-muted-foreground">Active SMEs</p>
              <Badge variant="secondary" className="bg-success/10 text-success mt-2 text-xs">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{Math.floor(Math.random() * 20 + 10)}%
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Security & Compliance */}
      <Card className="p-6 border-primary">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold">Platform Security & Compliance</h3>
            <p className="text-sm text-muted-foreground">Real-time monitoring active</p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <p className="text-3xl font-bold text-success mb-2">99.8%</p>
            <p className="text-sm text-muted-foreground">Platform Uptime</p>
          </div>
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <p className="text-3xl font-bold text-success mb-2">${systemStats.escrowValue.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Escrow Protected</p>
          </div>
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <p className="text-3xl font-bold text-success mb-2">{systemStats.fraudAlerts}</p>
            <p className="text-sm text-muted-foreground">Fraud Alerts (24h)</p>
          </div>
          <div className="text-center p-4 bg-success/5 rounded-lg">
            <p className="text-3xl font-bold text-success mb-2">100%</p>
            <p className="text-sm text-muted-foreground">AML Compliance</p>
          </div>
        </div>
      </Card>

      {/* Footer Notice */}
      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <Activity className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium mb-2">Read-Only Government Observer Access</p>
            <p className="text-sm text-muted-foreground">
              This dashboard provides real-time visibility into Zimbabwe's digital commerce ecosystem. 
              All data is aggregated and anonymized for privacy protection. For detailed reports or administrative 
              access, contact AVN SmartTrade Operations.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
