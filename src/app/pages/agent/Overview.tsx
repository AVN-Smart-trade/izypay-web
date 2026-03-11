import { ArrowRight, CheckCircle2, Clock, DollarSign, MapPin, Plus, Sparkles, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { zimbabweUsers } from '../../lib/data';

const statCards = [
  {
    label: 'Vendors Onboarded', value: '24', sub: 'This month', badge: '+4 this week',
    icon: <Users className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #0F6F5C, #12B76A)',
  },
  {
    label: 'Commission Earned', value: '$480.00', sub: '$20 per vendor', badge: 'Active',
    icon: <DollarSign className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #12B76A, #0F6F5C)',
  },
  {
    label: 'Pending KYC', value: '5', sub: 'Awaiting approval', badge: 'Action needed',
    icon: <Clock className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #C7A246, #e8c06a)',
  },
  {
    label: 'Approval Rate', value: '96%', sub: '23 of 24 approved', badge: 'Excellent',
    icon: <CheckCircle2 className="w-6 h-6 text-white" />,
    gradient: 'linear-gradient(135deg, #3B82F6, #0F6F5C)',
  },
];

export default function AgentOverview() {
  const pendingKYC = [
    { id: 1, business: "Chitungwiza Groceries", owner: "Farai Madziva", location: "Chitungwiza", date: "2025-03-01" },
    { id: 2, business: "Norton Farm Supplies", owner: "Precious Nyoni", location: "Norton", date: "2025-03-02" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 mb-1">Field Agent Dashboard 🚴</h1>
          <p className="text-gray-400 text-sm">Vendor onboarding and KYC management</p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(18,183,106,0.1)', color: '#12B76A' }}>
          <Sparkles className="w-3 h-3" /> Agent Portal
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

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Pending KYC */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-gray-900">Pending KYC Approvals</h3>
            <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(199,162,70,0.12)', color: '#C7A246' }}>5 Pending</span>
          </div>
          <div className="space-y-4">
            {pendingKYC.map((vendor) => (
              <div key={vendor.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900">{vendor.business}</p>
                    <p className="text-sm text-gray-400">{vendor.owner}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                      <MapPin className="w-3 h-3" /> {vendor.location}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(199,162,70,0.12)', color: '#C7A246' }}>
                    <Clock className="w-2.5 h-2.5" /> Pending
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl text-xs font-bold">View Documents</Button>
                  <Button size="sm" className="flex-1 rounded-xl text-xs font-bold" style={{ background: '#0F6F5C' }}>Follow Up</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Onboardings */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-gray-900">Recent Onboardings</h3>
            <Button size="sm" variant="outline" className="gap-1.5 rounded-xl text-xs font-bold">
              <Plus className="w-3.5 h-3.5" /> New Vendor
            </Button>
          </div>
          <div className="space-y-3">
            {zimbabweUsers.vendors.slice(0, 4).map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{vendor.business}</p>
                  <p className="text-xs text-gray-400">{vendor.location}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                  vendor.verified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {vendor.verified ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                  {vendor.verified ? 'Verified' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0a2e26, #0F6F5C)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: '#12B76A' }} />
        <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3"
              style={{ background: 'rgba(18,183,106,0.2)', color: '#12B76A' }}>Commission</span>
            <h3 className="text-xl font-black text-white mb-1">Onboard More Vendors</h3>
            <p className="text-white/60 text-sm">Earn $20 commission for each verified vendor you onboard</p>
          </div>
          <Button size="lg" className="rounded-xl font-bold px-6 whitespace-nowrap flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #12B76A, #0F6F5C)', color: 'white' }}>
            Start Onboarding <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
        <h3 className="font-black text-gray-900 mb-4">Vendor Coverage Map</h3>
        <div className="rounded-xl h-72 flex items-center justify-center"
          style={{ background: 'linear-gradient(160deg, rgba(15,111,92,0.05), rgba(18,183,106,0.05))', border: '1px dashed rgba(15,111,92,0.2)' }}>
          <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-3" style={{ color: '#0F6F5C' }} />
            <p className="font-bold text-gray-600">Zimbabwe Province Coverage</p>
            <p className="text-sm text-gray-400">24 vendors across Harare &amp; Bulawayo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

