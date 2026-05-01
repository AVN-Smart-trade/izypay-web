import {
  AlertCircle,
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  QrCode,
  Repeat,
  Shield,
  ShoppingBag,
  Sparkles,
  Store,
  Users,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { zimbabweTransactions } from '../../lib/data';
import { toast } from 'sonner';

const statCards = [
  {
    label: 'Wallet Balance',
    value: '$245.50',
    sub: 'ZiG 1,847',
    badge: 'Active',
    icon: <Wallet className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #0F6F5C, #12B76A)',
  },
  {
    label: 'Trust Score',
    value: '92/100',
    sub: 'Excellent standing',
    badge: '+2 pts',
    icon: <Shield className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #C7A246, #e8c06a)',
  },
  {
    label: 'Total Orders',
    value: '47',
    sub: '3 pending delivery',
    badge: 'Active',
    icon: <ShoppingBag className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #12B76A, #0F6F5C)',
  },
  {
    label: 'Escrow Balance',
    value: '$120.00',
    sub: '2 transactions pending',
    badge: 'Protected',
    icon: <Shield className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #3B82F6, #0F6F5C)',
  },
];

export default function CustomerOverview() {
  const navigate = useNavigate();
  const [escrowItems, setEscrowItems] = useState(
    zimbabweTransactions.filter(t => t.escrow).slice(0, 2)
  );

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const handleConfirmDelivery = (txn: typeof escrowItems[0]) => {
    setEscrowItems(prev => prev.filter(t => t.id !== txn.id));
    toast.success(`Delivery confirmed for ${txn.vendor}! Funds released from escrow.`);
  };

  const handleDispute = (txn: typeof escrowItems[0]) => {
    navigate('/customer/disputes');
    toast.info(`Opening dispute for order from ${txn.vendor}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Welcome back, Tendai! 👋</h1>
          <p className="text-gray-400 text-sm">Here's what's happening with your account today</p>
        </div>
        <span
          className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(15,111,92,0.1)', color: '#0F6F5C' }}
        >
          <Sparkles className="w-3 h-3" /> {today}
        </span>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div
            key={s.label}
            className="rounded-2xl p-5 text-white relative overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: s.gradient }}
            onClick={() => {
              if (s.label === 'Wallet Balance') navigate('/customer/wallet');
              else if (s.label === 'Total Orders') navigate('/customer/transactions');
              else if (s.label === 'Escrow Balance') navigate('/customer/disputes');
            }}
          >
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
            { label: 'Marketplace', icon: <Store className="w-5 h-5" />, to: '/customer/marketplace', color: '#0F6F5C' },
            { label: 'Scan & Pay', icon: <QrCode className="w-5 h-5" />, to: '/customer/scan-and-shop', color: '#C7A246' },
            { label: 'Top Up', icon: <Wallet className="w-5 h-5" />, to: '/customer/izypay-wallet', color: '#12B76A' },
            { label: 'P2P Send', icon: <ArrowLeftRight className="w-5 h-5" />, to: '/customer/p2p-transfer', color: '#3B82F6' },
            { label: 'SmartBarter', icon: <Repeat className="w-5 h-5" />, to: '/customer/smartbarter', color: '#8B5CF6' },
            { label: 'Group Buy', icon: <Users className="w-5 h-5" />, to: '/customer/group-buying', color: '#C7A246' },
          ].map(a => (
            <Link key={a.label} to={a.to}>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ background: `${a.color}15`, color: a.color }}
                >
                  {a.icon}
                </div>
                <span className="text-xs font-semibold text-gray-600 text-center leading-tight">{a.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-gray-900">Recent Transactions</h3>
            <Link to="/customer/transactions">
              <Button variant="ghost" size="sm" className="gap-1 text-xs font-semibold rounded-lg" style={{ color: '#0F6F5C' }}>
                View All <ArrowRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {zimbabweTransactions.slice(0, 4).map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => navigate('/customer/transactions')}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    txn.status === 'completed' ? 'bg-green-100' :
                    txn.status === 'escrow' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    {txn.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> :
                     txn.status === 'escrow' ? <Shield className="w-4 h-4 text-yellow-600" /> :
                     <Clock className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{txn.vendor}</p>
                    <p className="text-xs text-gray-400">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900">${txn.amount.toFixed(2)}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    txn.status === 'completed' ? 'bg-green-100 text-green-700' :
                    txn.status === 'escrow' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>{txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Escrow */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-gray-900">Pending Escrow</h3>
            <span
              className="text-[10px] font-bold px-2 py-1 rounded-full"
              style={{ background: 'rgba(199,162,70,0.12)', color: '#C7A246' }}
            >
              {escrowItems.length} Active
            </span>
          </div>

          {escrowItems.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <p className="text-sm">All escrow transactions resolved!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {escrowItems.map((txn) => (
                <div key={txn.id} className="border border-gray-100 rounded-xl p-4 space-y-3 hover:border-gray-200 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-900">{txn.vendor}</p>
                      <p className="text-xs text-gray-400">{txn.id}</p>
                    </div>
                    <p className="font-black text-lg text-gray-900">${txn.amount.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Shield className="w-3.5 h-3.5 text-yellow-500" />
                    <span>Protected by escrow until delivery confirmed</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 rounded-xl text-xs font-bold"
                      style={{ background: '#0F6F5C' }}
                      onClick={() => handleConfirmDelivery(txn)}
                    >
                      Confirm Delivery
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 rounded-xl text-xs font-bold"
                      onClick={() => handleDispute(txn)}
                    >
                      Dispute
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className="mt-4 p-3 rounded-xl flex items-start gap-3"
            style={{ background: 'rgba(199,162,70,0.08)', border: '1px solid rgba(199,162,70,0.2)' }}
          >
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#C7A246' }} />
            <div className="text-xs">
              <p className="font-bold mb-0.5" style={{ color: '#C7A246' }}>Escrow Protection Active</p>
              <p className="text-gray-400">Your payment is held securely until you confirm receipt of goods.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0a2e26, #0F6F5C)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: '#C7A246' }} />
        <div className="relative z-10 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span
              className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(199,162,70,0.2)', color: '#C7A246' }}
            >
              Featured
            </span>
            <h3 className="text-xl font-black text-white mb-1">Discover Zimbabwe's Best Vendors</h3>
            <p className="text-white/60 text-sm">Shop from verified local businesses across all 10 provinces</p>
          </div>
          <Link to="/customer/marketplace">
            <Button
              size="lg"
              className="rounded-xl font-bold px-6 whitespace-nowrap flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C7A246, #e8c06a)', color: '#1a1a1a' }}
            >
              Explore Marketplace <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
