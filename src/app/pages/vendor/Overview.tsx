import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  DollarSign, 
  Package, 
  ShoppingBag, 
  TrendingUp,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Clock
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { salesChartData, zimbabweOrders, aiInsights } from '../../lib/data';

export default function VendorOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Tawanda!</h1>
        <p className="text-muted-foreground">Mbare Fresh Produce - Performance Overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success">
              +12.5%
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Sales</p>
            <h3 className="text-2xl font-bold">$35,800</h3>
            <p className="text-xs text-muted-foreground">This month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Orders Today</p>
            <h3 className="text-2xl font-bold">24</h3>
            <p className="text-xs text-muted-foreground">18 pending fulfillment</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <h3 className="text-2xl font-bold">42</h3>
            <p className="text-xs text-destructive flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              5 low stock
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Avg. Order Value</p>
            <h3 className="text-2xl font-bold">$28.40</h3>
            <p className="text-xs text-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8.2% vs last month
            </p>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Revenue Trend</h3>
            <Button variant="ghost" size="sm">Last 6 Months</Button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesChartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006B3F" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#006B3F" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#006B3F" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* AI Insights */}
        <Card className="p-6 border-accent">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold">ZivaAI Insights</h3>
              <p className="text-xs text-muted-foreground">Powered by AI</p>
            </div>
          </div>
          <div className="space-y-4">
            {aiInsights.slice(0, 3).map((insight, index) => (
              <div key={index} className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View All Insights
          </Button>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Recent Orders</h3>
          <Button variant="ghost" size="sm" className="gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {zimbabweOrders.slice(0, 4).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  order.status === 'delivered' ? 'bg-success/10' :
                  order.status === 'pending' ? 'bg-accent/10' :
                  'bg-primary/10'
                }`}>
                  <ShoppingBag className={`w-5 h-5 ${
                    order.status === 'delivered' ? 'text-success' :
                    order.status === 'pending' ? 'text-accent' :
                    'text-primary'
                  }`} />
                </div>
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.customer}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{order.items} items</p>
                <Badge variant="secondary" className={`text-xs mt-1 ${
                  order.status === 'delivered' ? 'bg-success/10 text-success' :
                  order.status === 'pending' ? 'bg-accent/10 text-accent' :
                  'bg-primary/10 text-primary'
                }`}>
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Inventory Alerts */}
      <Card className="p-6 border-destructive">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-bold">Inventory Alerts</h3>
            <p className="text-sm text-muted-foreground">5 products need attention</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
            <div>
              <p className="font-medium">Tomatoes (1kg)</p>
              <p className="text-sm text-destructive">Only 12 units left</p>
            </div>
            <Button size="sm">Restock</Button>
          </div>
          <div className="flex items-center justify-between p-3 bg-destructive/5 rounded-lg">
            <div>
              <p className="font-medium">Onions (1kg)</p>
              <p className="text-sm text-destructive">Only 8 units left</p>
            </div>
            <Button size="sm">Restock</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
