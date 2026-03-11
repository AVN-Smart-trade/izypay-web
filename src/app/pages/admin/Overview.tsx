import {
    Activity,
    AlertTriangle,
    DollarSign,
    Shield,
    Store,
    Users,
    Zap
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Button } from '../../components/ui/button';
import { provinceData, systemStats } from '../../lib/data';

const statCards = [
  {
    label: 'Total Users', value: systemStats.totalUsers.toLocaleString(), sub: '+15% this month', badge: 'â†‘ Growth',
    icon: <Users className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #0F6F5C, #12B76A)',
  },
  {
    label: 'Active Vendors', value: systemStats.activeVendors.toLocaleString(), sub: `${systemStats.womenOwnedBusinesses}% women-owned`, badge: 'Active',
    icon: <Store className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #12B76A, #0F6F5C)',
  },
  {
    label: 'Transaction Volume', value: `$${(systemStats.transactionVolume / 1000000).toFixed(2)}M`, sub: 'Platform total', badge: 'All-time',
    icon: <DollarSign className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #C7A246, #e8c06a)',
  },
  {
    label: 'Escrow Value', value: `$${systemStats.escrowValue.toLocaleString()}`, sub: 'Currently held', badge: 'Secured',
    icon: <Shield className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #3B82F6, #0F6F5C)',
  },
];

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
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">System Overview 🛡️</h1>
          <p className="text-gray-400 text-sm">AVN SmartTrade Platform Monitoring</p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(15,111,92,0.1)', color: '#0F6F5C' }}>
          <Zap className="w-3 h-3" /> Live
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

      {/* Alerts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-50">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-black text-gray-900">Fraud Alerts</h3>
              <p className="text-xs text-gray-400">{systemStats.fraudAlerts} flagged today</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-red-50 rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-sm text-gray-900">Suspicious transaction pattern</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">High</span>
              </div>
              <p className="text-xs text-gray-400">TXN-2025-001240 Â· Multiple small transactions</p>
              <Button size="sm" variant="outline" className="mt-3 rounded-xl text-xs font-bold">Investigate</Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(15,111,92,0.1)' }}>
              <Activity className="w-5 h-5" style={{ color: '#0F6F5C' }} />
            </div>
            <div>
              <h3 className="font-black text-gray-900">System Health</h3>
              <p className="text-xs text-gray-400">All systems operational</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'API Response Time', value: '145ms', ok: true },
              { label: 'Uptime',            value: '99.98%', ok: true },
              { label: 'Active Sessions',   value: '8,421', ok: null },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-600 font-medium">{item.label}</span>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  item.ok === true ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 mb-5">Transaction Activity (24h)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#aaa" tick={{ fontSize: 11 }} />
              <YAxis stroke="#aaa" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="transactions" stroke="#0F6F5C" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 mb-5">Volume by Province</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={provinceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="province" stroke="#aaa" tick={{ fontSize: 10 }} />
              <YAxis stroke="#aaa" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="volume" fill="#0F6F5C" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial Inclusion Metrics */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-900 mb-5">Financial Inclusion Metrics</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Overall Inclusion Rate', value: `${systemStats.financialInclusion}%`, color: '#0F6F5C' },
            { label: 'Women Participation',    value: `${systemStats.womenOwnedBusinesses}%`, color: '#12B76A' },
            { label: 'Youth Participation',    value: `${systemStats.youthParticipation}%`, color: '#C7A246' },
            { label: 'Rural Coverage',         value: '34%', color: '#3B82F6' },
          ].map(m => (
            <div key={m.label} className="p-4 rounded-xl" style={{ background: `${m.color}0d`, border: `1px solid ${m.color}22` }}>
              <p className="text-xs text-gray-400 font-medium mb-2">{m.label}</p>
              <p className="text-3xl font-black" style={{ color: m.color }}>{m.value}</p>
              <div className="mt-3 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: m.value, background: m.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

