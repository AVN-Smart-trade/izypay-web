import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Progress } from '../../components/ui/progress';
import { DollarSign, TrendingUp, Clock, Target, Calendar, Award } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CommissionTracking() {
  const monthlyData = [
    { month: 'Sep', commission: 320, vendors: 18 },
    { month: 'Oct', commission: 380, vendors: 21 },
    { month: 'Nov', commission: 420, vendors: 23 },
    { month: 'Dec', commission: 460, vendors: 24 },
    { month: 'Jan', commission: 480, vendors: 24 },
    { month: 'Feb', commission: 500, vendors: 26 },
  ];

  const quarterlyTarget = 1500;
  const currentQuarterEarnings = 1460;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Commission Tracking</h1>
        <p className="text-muted-foreground">Monitor your earnings and performance bonuses</p>
      </div>

      {/* Earnings Overview */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm opacity-90 mb-2">Total Earned</p>
          <p className="text-3xl font-bold mb-1">$5,840</p>
          <p className="text-xs opacity-75">All time</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">This Month</p>
          <p className="text-2xl font-bold mb-1">$500.00</p>
          <p className="text-xs text-success">+$20 from last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Pending</p>
          <p className="text-2xl font-bold mb-1">$120.00</p>
          <p className="text-xs text-muted-foreground">6 verifications pending</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Bonuses Earned</p>
          <p className="text-2xl font-bold mb-1">$340.00</p>
          <p className="text-xs text-muted-foreground">Performance bonuses</p>
        </Card>
      </div>

      {/* Quarterly Target */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold mb-1">Q1 2025 Commission Target</h3>
            <p className="text-sm text-muted-foreground">January - March 2025</p>
          </div>
          <Badge className="bg-success text-white">
            97% Complete
          </Badge>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="font-medium">${currentQuarterEarnings} / ${quarterlyTarget}</span>
          </div>
          <Progress value={(currentQuarterEarnings / quarterlyTarget) * 100} className="h-3" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-2xl font-bold mb-1">$480</p>
            <p className="text-xs text-muted-foreground">January</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-2xl font-bold mb-1">$480</p>
            <p className="text-xs text-muted-foreground">February</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg text-center border border-primary/20">
            <p className="text-2xl font-bold mb-1 text-primary">$500</p>
            <p className="text-xs text-muted-foreground">March (Current)</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <p className="text-sm font-medium text-success mb-1">
            🎯 You're on track to earn a $100 bonus!
          </p>
          <p className="text-xs text-muted-foreground">
            Complete 3 more vendor verifications to hit your quarterly target
          </p>
        </div>
      </Card>

      {/* Commission Trend */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-6">Commission Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="commission" 
                stroke="#006B3F" 
                strokeWidth={3}
                dot={{ fill: '#006B3F', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-6">Vendors Onboarded</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="vendors" fill="#006B3F" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Commission Breakdown */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Commission Breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium mb-1">Base Commission</p>
              <p className="text-sm text-muted-foreground">$20 per verified vendor</p>
            </div>
            <p className="text-xl font-bold">$5,200</p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium mb-1">Target Achievement Bonus</p>
              <p className="text-sm text-muted-foreground">10% for reaching quarterly targets</p>
            </div>
            <p className="text-xl font-bold">$300</p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium mb-1">Quality Bonus</p>
              <p className="text-sm text-muted-foreground">96% first-time approval rate</p>
            </div>
            <p className="text-xl font-bold">$200</p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium mb-1">Retention Bonus</p>
              <p className="text-sm text-muted-foreground">$5 per active vendor/month</p>
            </div>
            <p className="text-xl font-bold">$140</p>
          </div>
        </div>
      </Card>

      {/* Payment Schedule */}
      <Card className="p-6">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Payment Schedule
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-4">Next Payment</p>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-2xl font-bold text-primary mb-1">$500.00</p>
              <p className="text-sm text-muted-foreground mb-3">February 2025 Commission</p>
              <Badge variant="secondary" className="bg-success/10 text-success">
                Processing on March 5, 2025
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-4">Payment History</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">January 2025</p>
                  <p className="text-xs text-muted-foreground">Paid: Feb 5, 2025</p>
                </div>
                <p className="font-bold">$480.00</p>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">December 2024</p>
                  <p className="text-xs text-muted-foreground">Paid: Jan 5, 2025</p>
                </div>
                <p className="font-bold">$460.00</p>
              </div>
            </div>
            <Button variant="link" className="p-0 h-auto mt-3">View All Payments</Button>
          </div>
        </div>
      </Card>

      {/* Incentives Program */}
      <Card className="p-6 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
        <div className="flex items-start gap-3">
          <Award className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold mb-2">Incentives & Bonuses</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Quality Bonus:</strong> Maintain 95%+ approval rate for 10% bonus</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Volume Bonus:</strong> 25+ vendors/month earns $100 extra</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Retention Bonus:</strong> $5/month for each vendor staying active 90+ days</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span><strong>Top Performer:</strong> Monthly leaderboard top 3 earn additional prizes</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
