import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { TrendingUp, Users, Package, DollarSign } from 'lucide-react';
import { 
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { salesChartData } from '../../lib/data';
import { toast } from 'sonner';

export default function VendorAnalytics() {
  const topProducts = [
    { name: 'Tomatoes', sales: 450, revenue: 1125 },
    { name: 'Maize Meal', sales: 280, revenue: 2380 },
    { name: 'Onions', sales: 380, revenue: 684 },
    { name: 'Sugar Beans', sales: 120, revenue: 1440 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 45 },
    { name: 'Grains', value: 30 },
    { name: 'Pulses', value: 15 },
    { name: 'Others', value: 10 },
  ];

  const COLORS = ['#006B3F', '#F1C40F', '#12B76A', '#3B82F6'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        <Button variant="outline" onClick={() => {
          const rows = [['Month', 'Sales'], ...salesChartData.map(d => [d.month, d.sales])];
          const csv = rows.map(r => r.join(',')).join('\n');
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a'); a.href = url; a.download = 'analytics_report.csv'; a.click();
          URL.revokeObjectURL(url);
          toast.success('Analytics report exported as CSV');
        }}>Export Report</Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Avg. Daily Revenue</p>
          <p className="text-2xl font-bold">$1,193</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Customer Growth</p>
          <p className="text-2xl font-bold">+28%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Products Sold</p>
          <p className="text-2xl font-bold">1,230</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
          <p className="text-2xl font-bold">6.8%</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesChartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006B3F" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#006B3F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#006B3F" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-6">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-bold mb-6">Top Selling Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#006B3F" name="Units Sold" />
            <Bar dataKey="revenue" fill="#F1C40F" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
