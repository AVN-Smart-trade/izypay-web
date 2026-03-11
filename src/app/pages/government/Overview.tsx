import {
    Activity,
    DollarSign,
    MapPin,
    Shield,
    TrendingUp,
    Users
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { provinceData, systemStats } from '../../lib/data';

const statCards = [
  {
    label: 'Financial Inclusion Rate', value: `${systemStats.financialInclusion}%`, sub: 'Target: 80% by Dec 2025', badge: '+4% â†‘',
    icon: <TrendingUp className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #0F6F5C, #12B76A)',
  },
  {
    label: 'Active Participants', value: systemStats.totalUsers.toLocaleString(), sub: 'Across all 10 provinces', badge: 'Live',
    icon: <Users className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #12B76A, #0F6F5C)',
  },
  {
    label: 'Transaction Volume', value: `$${(systemStats.transactionVolume / 1000000).toFixed(1)}M`, sub: 'Platform lifetime value', badge: 'All-time',
    icon: <DollarSign className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #C7A246, #e8c06a)',
  },
  {
    label: 'Fraud Reduction', value: '87%', sub: 'Since platform launch', badge: 'â†“ 13%',
    icon: <Shield className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #3B82F6, #0F6F5C)',
  },
];

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
      {/* Hero Header */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0a2e26, #0F6F5C)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10" style={{ background: '#C7A246' }} />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white, white 1px, transparent 1px, transparent 8px)' }} />
        <img
          src="https://images.unsplash.com/photo-1678059466227-d19beeff7557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxaaW1iYWJ3ZSUyMGdvdmVybm1lbnQlMjBidWlsZGluZyUyMG9mZmljaWFsfGVufDF8fHx8MTc3MjQ5NjAxM3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Government"
          className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-10"
        />
        <div className="relative z-10 p-8">
          <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4"
            style={{ background: 'rgba(199,162,70,0.2)', color: '#C7A246' }}>
            Ministry of Finance â€” Read Only Access
          </span>
          <h1 className="text-3xl font-black text-white mb-2">National Economic Overview 🏛️</h1>
          <p className="text-white/60 text-sm">Financial Inclusion &amp; Digital Commerce Monitoring Dashboard</p>
        </div>
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

      {/* Inclusive Growth */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h2 className="font-black text-gray-900 mb-5">Inclusive Economic Growth</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { label: 'Women-Owned Businesses', value: `${systemStats.womenOwnedBusinesses}%`, sub: '2,228 women entrepreneurs', change: '+8%', color: '#0F6F5C' },
            { label: 'Youth Participation (18â€“35)', value: `${systemStats.youthParticipation}%`, sub: '10,318 youth engaged', change: '+12%', color: '#C7A246' },
            { label: 'Rural SME Participation', value: '34%', sub: '1,306 rural vendors', change: '+6%', color: '#12B76A' },
          ].map(m => (
            <div key={m.label} className="p-5 rounded-xl" style={{ background: `${m.color}08`, border: `1px solid ${m.color}22` }}>
              <p className="text-xs text-gray-400 font-medium mb-3">{m.label}</p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-4xl font-black" style={{ color: m.color }}>{m.value}</p>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${m.color}15`, color: m.color }}>
                  <TrendingUp className="w-2.5 h-2.5 inline mr-0.5" />{m.change}
                </span>
              </div>
              <p className="text-xs text-gray-400">{m.sub}</p>
              <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: m.value, background: m.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 mb-2">Financial Inclusion Progress</h3>
          <p className="text-xs text-gray-400 mb-5">On track to meet 80% national target by December 2025</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={inclusionTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#aaa" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 80]} stroke="#aaa" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="rate" stroke="#0F6F5C" strokeWidth={3} dot={{ fill: '#0F6F5C', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-black text-gray-900 mb-5">Economic Activity by Province</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={provinceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="province" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 9 }} />
              <YAxis stroke="#aaa" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="volume" fill="#0F6F5C" radius={[6, 6, 0, 0]} name="Transaction Volume ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SME Growth by Province */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-900 mb-5">SME Growth Index by Province</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {provinceData.map((province, i) => (
            <div key={province.province} className="p-4 rounded-xl hover:shadow-md transition-all" style={{ background: 'rgba(15,111,92,0.05)', border: '1px solid rgba(15,111,92,0.1)' }}>
              <div className="flex items-center gap-1.5 mb-2">
                <MapPin className="w-3 h-3" style={{ color: '#0F6F5C' }} />
                <p className="font-semibold text-gray-700 text-xs truncate">{province.province}</p>
              </div>
              <p className="text-2xl font-black text-gray-900 mb-0.5">{province.vendors}</p>
              <p className="text-[10px] text-gray-400">Active SMEs</p>
              <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(18,183,106,0.12)', color: '#12B76A' }}>
                +{10 + (i * 3)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Security & Compliance */}
      <div className="bg-white rounded-2xl p-5 border shadow-sm" style={{ borderColor: 'rgba(15,111,92,0.2)' }}>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(15,111,92,0.1)' }}>
            <Shield className="w-5 h-5" style={{ color: '#0F6F5C' }} />
          </div>
          <div>
            <h3 className="font-black text-gray-900">Platform Security &amp; Compliance</h3>
            <p className="text-xs text-gray-400">Real-time monitoring active</p>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Platform Uptime', value: '99.8%', color: '#12B76A' },
            { label: 'Escrow Protected', value: `$${systemStats.escrowValue.toLocaleString()}`, color: '#0F6F5C' },
            { label: 'Fraud Alerts (24h)', value: String(systemStats.fraudAlerts), color: '#C7A246' },
            { label: 'AML Compliance', value: '100%', color: '#12B76A' },
          ].map(m => (
            <div key={m.label} className="text-center p-4 rounded-xl" style={{ background: `${m.color}08` }}>
              <p className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.value}</p>
              <p className="text-xs text-gray-400 font-medium">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Read-only notice */}
      <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: 'rgba(15,111,92,0.05)', border: '1px solid rgba(15,111,92,0.15)' }}>
        <Activity className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#0F6F5C' }} />
        <div>
          <p className="font-bold text-gray-800 text-sm mb-1">Read-Only Government Observer Access</p>
          <p className="text-xs text-gray-400 leading-relaxed">
            This dashboard provides real-time visibility into Zimbabwe's digital commerce ecosystem.
            All data is aggregated and anonymised for privacy protection. For detailed reports or
            administrative access, contact AVN SmartTrade Operations.
          </p>
        </div>
      </div>
    </div>
  );
}

