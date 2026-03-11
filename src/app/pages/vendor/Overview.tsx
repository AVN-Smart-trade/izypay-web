import {
    AlertTriangle,
    ArrowLeftRight,
    ArrowRight,
    Clock,
    CreditCard,
    DollarSign,
    Link2,
    Package,
    Repeat,
    ShoppingBag,
    Sparkles,
    TrendingUp
} from 'lucide-react';
import { Link } from 'react-router';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '../../components/ui/button';
import { aiInsights, salesChartData, zimbabweOrders } from '../../lib/data';

const statCards = [
  {
    label: 'Total Sales', value: '$35,800', sub: 'This month', badge: '+12.5%',
    icon: <DollarSign className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #12B76A, #0F6F5C)',
  },
  {
    label: 'Orders Today', value: '24', sub: '18 pending fulfilment', badge: 'Live',
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #0F6F5C, #12B76A)',
  },
  {
    label: 'Total Products', value: '42', sub: '5 low stock', badge: 'Alert',
    icon: <Package className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #C7A246, #e8c06a)',
  },
  {
    label: 'Avg. Order Value', value: '$28.40', sub: '+8.2% vs last month', badge: 'â†‘',
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #3B82F6, #0F6F5C)',
  },
];

export default function VendorOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Welcome back, Tawanda! 👋</h1>
          <p className="text-gray-400 text-sm">Mbare Fresh Produce – Performance Overview</p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(199,162,70,0.1)', color: '#C7A246' }}>
          <Sparkles className="w-3 h-3" /> Vendor Dashboard
        </span>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-white relative overflow-hidden shadow-lg" style={{ background: s.gradient }}>
            <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 -translate-y-6 translate-x-6 bg-white" />
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/20">{s.icon}</div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/20">{s.badge}</span>
            </div>
            <p className="text-white/70 text-xs font-medium mb-1">{s.label}</p>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-white/60 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-900 mb-4 text-sm uppercase tracking-wide">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'IzyPay Wallet', icon: <CreditCard className="w-5 h-5" />, to: '/vendor/izypay-wallet', color: '#0F6F5C' },
            { label: 'P2P Transfer',  icon: <ArrowLeftRight className="w-5 h-5" />, to: '/vendor/p2p-transfer', color: '#3B82F6' },
            { label: 'SmartBarter',   icon: <Repeat className="w-5 h-5" />, to: '/vendor/smartbarter', color: '#8B5CF6' },
            { label: 'Pay-by-Link',   icon: <Link2 className="w-5 h-5" />, to: '/vendor/pay-by-link', color: '#C7A246' },
            { label: 'Revenue Split', icon: <TrendingUp className="w-5 h-5" />, to: '/vendor/revenue-split', color: '#12B76A' },
            { label: 'Supplier Mkt',  icon: <ShoppingBag className="w-5 h-5" />, to: '/vendor/supplier-marketplace', color: '#C7A246' },
          ].map(a => (
            <Link key={a.label} to={a.to}>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${a.color}15`, color: a.color }}>
                  {a.icon}
                </div>
                <span className="text-xs font-semibold text-gray-600 text-center leading-tight">{a.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Sales Chart */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-gray-900">Revenue Trend</h3>
            <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salesChartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F6F5C" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#0F6F5C" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#aaa" tick={{ fontSize: 11 }} />
              <YAxis stroke="#aaa" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="sales" stroke="#0F6F5C" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="rounded-2xl p-5 border shadow-sm" style={{ background: 'linear-gradient(160deg, #0a2e26, #0F6F5C)', borderColor: 'rgba(15,111,92,0.3)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(199,162,70,0.2)' }}>
              <Sparkles className="w-5 h-5" style={{ color: '#C7A246' }} />
            </div>
            <div>
              <h3 className="font-black text-white">ZivaAI Insights</h3>
              <p className="text-xs text-green-200/50">Powered by AI</p>
            </div>
          </div>
          <div className="space-y-3">
            {aiInsights.slice(0, 3).map((insight, index) => (
              <div key={index} className="p-3 rounded-xl text-xs text-green-100/80 leading-relaxed"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {insight}
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 rounded-xl text-xs font-bold border-white/20 text-white hover:bg-white/10">
            View All Insights
          </Button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-gray-900">Recent Orders</h3>
          <Button variant="ghost" size="sm" className="gap-1 text-xs font-semibold rounded-lg" style={{ color: '#0F6F5C' }}>
            View All <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
        <div className="space-y-3">
          {zimbabweOrders.slice(0, 4).map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  order.status === 'delivered' ? 'bg-green-100' :
                  order.status === 'pending' ? 'bg-yellow-100' : 'bg-blue-100'
                }`}>
                  <ShoppingBag className={`w-4 h-4 ${
                    order.status === 'delivered' ? 'text-green-600' :
                    order.status === 'pending' ? 'text-yellow-600' : 'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{order.id}</p>
                  <p className="text-xs text-gray-400">{order.customer}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Clock className="w-2.5 h-2.5 text-gray-300" />
                    <span className="text-[10px] text-gray-400">{order.date}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900">${order.total.toFixed(2)}</p>
                <p className="text-xs text-gray-400">{order.items} items</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                  order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>{order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Alerts */}
      <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="font-black text-gray-900">Inventory Alerts</h3>
            <p className="text-xs text-gray-400">5 products need attention</p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Tomatoes (1kg)', units: 12 },
            { name: 'Onions (1kg)', units: 8 },
          ].map(item => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{item.name}</p>
                <p className="text-xs text-red-500 font-medium">Only {item.units} units left</p>
              </div>
              <Button size="sm" className="rounded-xl text-xs font-bold" style={{ background: '#0F6F5C' }}>Restock</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

