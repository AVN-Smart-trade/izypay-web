import {
    ArrowLeftRight,
    ArrowRight,
    BadgeCheck,
    BarChart3,
    CheckCircle2,
    ChevronRight,
    CreditCard,
    Globe, Lock,
    QrCode,
    Repeat,
    Shield,
    Smartphone,
    Sparkles,
    Star,
    Store, TrendingUp, Users,
    Wallet,
    Zap
} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* â”€â”€ NAVBAR â”€â”€ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F6F5C, #12B76A)' }}>
              <span className="text-white font-black text-sm tracking-tight">AVN</span>
            </div>
            <div>
              <span className="font-black text-xl text-gray-900">AVN SmartTrade</span>
              <span className="hidden sm:block text-xs text-gray-400 font-medium tracking-wide">ZIMBABWE'S DIGITAL ECONOMY</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-[#0F6F5C] transition-colors">Features</a>
            <a href="#innovations" className="hover:text-[#0F6F5C] transition-colors">Innovations</a>
            <a href="#who" className="hover:text-[#0F6F5C] transition-colors">Who It's For</a>
            <a href="#stats" className="hover:text-[#0F6F5C] transition-colors">Impact</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="font-semibold text-gray-700 hover:text-[#0F6F5C]">Login</Button>
            </Link>
            <Link to="/register">
              <Button className="font-semibold px-6 rounded-xl" style={{ background: 'linear-gradient(135deg, #0F6F5C, #12B76A)' }}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative pt-24 pb-0 min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #0a2e26 0%, #0F6F5C 45%, #1a8a6e 100%)' }}>
        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#C7A246' }} />
        <div className="absolute bottom-40 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ background: '#12B76A' }} />
        <div className="absolute top-40 left-20 w-64 h-64 rounded-full opacity-5 blur-2xl bg-white" />

        <div className="max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 self-start">
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase"
              style={{ background: 'rgba(199,162,70,0.18)', color: '#C7A246', border: '1px solid rgba(199,162,70,0.35)' }}>
              <Sparkles className="w-3 h-3" /> Zimbabwe's #1 Fintech Platform
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-white leading-none mb-6 tracking-tight">
                Trade Smart.<br />
                <span style={{ color: '#C7A246' }}>Pay Instantly.</span><br />
                Grow Bold.
              </h1>
              <p className="text-lg text-green-100/80 mb-10 max-w-lg leading-relaxed">
                AVN SmartTrade is Africa's most advanced platform for vendors, customers, and agents â€” featuring
                multi-currency wallets, SmartBarter asset exchange, P2P transfers, and government-grade compliance.
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/register">
                  <Button size="lg" className="gap-2 font-bold px-8 py-6 text-base rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                    style={{ background: 'linear-gradient(135deg, #C7A246, #e8c06a)', color: '#1a1a1a' }}>
                    Start Trading Free <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/government">
                  <Button size="lg" variant="outline"
                    className="gap-2 font-bold px-8 py-6 text-base rounded-2xl border-white/30 text-black hover:bg-white/10">
                    <Globe className="w-5 h-5" /> Government Portal
                  </Button>
                </Link>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Shield className="w-4 h-4" />, text: 'Escrow Protected' },
                  { icon: <BadgeCheck className="w-4 h-4" />, text: 'RBZ Compliant' },
                  { icon: <Lock className="w-4 h-4" />, text: '2FA & Biometric' },
                  { icon: <Zap className="w-4 h-4" />, text: 'Zero P2P Fees' },
                ].map(c => (
                  <span key={c.text} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.12)', color: '#d1fae5' }}>
                    {c.icon} {c.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Hero visual - dashboard mockup */}
            <div className="relative hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.4)] border border-white/10"
                style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(10px)' }}>
                <img
                  src="https://images.unsplash.com/photo-1662831328216-2c14f3c61939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxaaW1iYWJ3ZSUyMEhhcmFyZSUyMHNreWxpbmUlMjBjaXR5fGVufDF8fHx8MTc3MjQ5NTU1MXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Harare Skyline"
                  className="w-full h-80 object-cover"
                />
                {/* Overlay stats row */}
                <div className="p-5 grid grid-cols-3 gap-4" style={{ background: 'rgba(10,46,38,0.9)' }}>
                  {[
                    { label: 'Active Users', value: '24,567', color: '#12B76A' },
                    { label: 'Volume Traded', value: '$2.8M+', color: '#C7A246' },
                    { label: 'Uptime', value: '99.8%', color: '#0F6F5C' },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-xs text-green-200/60 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge 1 */}
              <div className="absolute -left-8 top-1/3 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#0F6F5C' }}>
                  <Repeat className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">SmartBarter</div>
                  <div className="font-black text-gray-900 text-sm">1 DAC = $1 USD</div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -right-8 bottom-1/4 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#C7A246' }}>
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 font-medium">IzyPay Wallet</div>
                  <div className="font-black text-gray-900 text-sm">3-Currency Smart Wallet</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave transition */}
        <div className="relative h-24 mt-8">
          <svg viewBox="0 0 1440 96" className="absolute bottom-0 w-full" preserveAspectRatio="none">
            <path d="M0,96 C360,0 1080,0 1440,96 L1440,96 L0,96 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* â”€â”€ TRUST BAR â”€â”€ */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase mb-8">Trusted by businesses across all 10 provinces</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            {['Ministry of Finance', 'RBZ Compliant', 'ZIMRA Integrated', 'POTRAZ Approved', 'ISO 27001'].map(name => (
              <div key={name} className="flex items-center gap-2 text-sm font-bold text-gray-500">
                <BadgeCheck className="w-4 h-4 text-[#0F6F5C]" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ FEATURES â”€â”€ */}
      <section id="features" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(15,111,92,0.1)', color: '#0F6F5C' }}>
              Platform Features
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5">Built for Zimbabwe's Economy</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              A complete digital commerce ecosystem â€” from informal stalls to enterprise operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Store className="w-6 h-6" />, color: '#0F6F5C', bg: 'rgba(15,111,92,0.1)', title: 'Vendor Storefronts', desc: 'Digital storefronts from Mbare markets to Harare enterprises. Manage inventory, orders, and payments in one place.' },
              { icon: <Shield className="w-6 h-6" />, color: '#C7A246', bg: 'rgba(199,162,70,0.1)', title: 'Escrow Protection', desc: 'Smart escrow holds payments until delivery is confirmed â€” building trust in every transaction automatically.' },
              { icon: <Wallet className="w-6 h-6" />, color: '#12B76A', bg: 'rgba(18,183,106,0.1)', title: 'Multi-Currency Wallet', desc: 'USD, ZiG and DAC in a single account. Real-time conversions, instant settlements, full history.' },
              { icon: <Users className="w-6 h-6" />, color: '#0F6F5C', bg: 'rgba(15,111,92,0.1)', title: 'SentryID Identity', desc: 'Biometric KYC onboarding. Build your Trust Score (0â€“1000) and unlock better credit opportunities.' },
              { icon: <TrendingUp className="w-6 h-6" />, color: '#C7A246', bg: 'rgba(199,162,70,0.1)', title: 'ZivaAI Analytics', desc: 'AI-powered insights help vendors optimise inventory, forecast demand, and grow their business smarter.' },
              { icon: <CheckCircle2 className="w-6 h-6" />, color: '#12B76A', bg: 'rgba(18,183,106,0.1)', title: 'Government Compliance', desc: 'Full regulatory transparency â€” real-time monitoring, fraud detection, RBZ-ready financial reporting.' },
              { icon: <QrCode className="w-6 h-6" />, color: '#0F6F5C', bg: 'rgba(15,111,92,0.1)', title: 'Scan & Shop', desc: 'Contactless QR/barcode retail experience. Customers scan products and pay instantly at any vendor.' },
              { icon: <Users className="w-6 h-6" />, color: '#C7A246', bg: 'rgba(199,162,70,0.1)', title: 'Group Buying', desc: 'Collective purchasing power â€” communities pool orders to unlock wholesale prices and shared discounts.' },
              { icon: <BarChart3 className="w-6 h-6" />, color: '#12B76A', bg: 'rgba(18,183,106,0.1)', title: 'Revenue Split', desc: 'Automated multi-party payment distribution for agents, distributors, and franchise networks.' },
            ].map(f => (
              <Card key={f.title} className="p-7 border border-gray-100 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#0F6F5C] transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ 3 REVOLUTIONARY INNOVATIONS â”€â”€ */}
      <section id="innovations" className="py-28" style={{ background: 'linear-gradient(160deg, #0a2e26 0%, #0F6F5C 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(199,162,70,0.2)', color: '#C7A246' }}>
              Breakthrough Innovations
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-5">3 Revolutionary Microservices</h2>
            <p className="text-xl text-green-100/70 max-w-2xl mx-auto">
              Features that don't exist anywhere else in Africa.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* IzyPay Wallet */}
            <div className="rounded-3xl p-8 border flex flex-col" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(199,162,70,0.2)' }}>
                <CreditCard className="w-7 h-7" style={{ color: '#C7A246' }} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">IzyPay Wallet</h3>
              <p className="text-green-100/60 text-sm mb-6">Multi-currency with Trust Score credit system.</p>
              <ul className="space-y-3 mt-auto">
                {['USD + ZiG + DAC balances', 'Trust Score (0â€“1000 credit)', 'Merchant & P2P payments', 'Savings integration', 'Transaction history'].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-green-100/80">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#12B76A' }} /> {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* P2P Transfer */}
            <div className="rounded-3xl p-8 border flex flex-col" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(18,183,106,0.2)' }}>
                <ArrowLeftRight className="w-7 h-7" style={{ color: '#12B76A' }} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">P2P Transfer</h3>
              <p className="text-green-100/60 text-sm mb-6">Zero-fee instant transfers in any currency.</p>
              <ul className="space-y-3 mt-auto">
                {['Zero transfer fees', 'Multi-currency support', 'Quick-send recent recipients', 'Transfer history & stats', 'Reference notes'].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-green-100/80">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#12B76A' }} /> {i}
                  </li>
                ))}
              </ul>
            </div>

            {/* SmartBarter */}
            <div className="rounded-3xl p-8 border flex flex-col relative overflow-hidden" style={{ background: 'rgba(199,162,70,0.1)', borderColor: 'rgba(199,162,70,0.3)' }}>
              <div className="absolute top-4 right-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ background: '#C7A246', color: '#1a1a1a' }}>
                  AFRICA'S FIRST
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: 'rgba(199,162,70,0.25)' }}>
                <Repeat className="w-7 h-7" style={{ color: '#C7A246' }} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3">SmartBarter</h3>
              <p className="text-green-100/60 text-sm mb-6">Asset-backed digital currency â€” 1 DAC = $1 USD, backed by real assets.</p>
              <ul className="space-y-3 mt-auto">
                {['ðŸŒ¾ Grain, ðŸ„ Livestock, ðŸ“¦ Commodities', 'Digital Asset Credits (DACs)', 'Flexible partial redemption', 'Digital warehouse receipts', 'Blockchain-ready certificates'].map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm text-green-100/80">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: '#C7A246' }} /> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ WHO IS IT FOR â”€â”€ */}
      <section id="who" className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(15,111,92,0.1)', color: '#0F6F5C' }}>
              Built for Everyone
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-5">Who Is AVN SmartTrade For?</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: '🛒', title: 'Customers', color: '#0F6F5C', bg: 'rgba(15,111,92,0.07)', path: '/customer',
                perks: ['Marketplace shopping', 'Group buying deals', 'Scan & pay QR', 'Multi-currency wallet'],
              },
              {
                emoji: '🏪', title: 'Vendors', color: '#C7A246', bg: 'rgba(199,162,70,0.07)', path: '/vendor',
                perks: ['Digital storefront', 'Order management', 'Revenue split', 'B2B supplier marketplace'],
              },
              {
                emoji: '🚴', title: 'Field Agents', color: '#12B76A', bg: 'rgba(18,183,106,0.07)', path: '/agent',
                perks: ['Territory management', 'Commission tracking', 'SmartBarter access', 'P2P transfers'],
              },
              {
                emoji: '🏛️', title: 'Government', color: '#0F6F5C', bg: 'rgba(15,111,92,0.07)', path: '/government',
                perks: ['Real-time monitoring', 'Compliance reports', 'Fraud detection', 'Financial inclusion data'],
              },
            ].map(r => (
              <div key={r.title} className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col border border-gray-100">
                <div className="text-4xl mb-4">{r.emoji}</div>
                <h3 className="text-xl font-black text-gray-900 mb-1">{r.title}</h3>
                <div className="h-1 w-10 rounded-full mb-5" style={{ background: r.color }} />
                <ul className="space-y-2 mb-6 flex-1">
                  {r.perks.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-gray-500">
                      <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: r.color }} /> {p}
                    </li>
                  ))}
                </ul>
                <Link to={r.path}>
                  <Button className="w-full rounded-xl font-bold text-sm" style={{ background: r.color, color: '#fff' }}>
                    Enter Portal
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ IMPACT STATS â”€â”€ */}
      <section id="stats" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(15,111,92,0.1)', color: '#0F6F5C' }}>
                Real Impact
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Empowering Women<br />& Youth Entrepreneurs
              </h2>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                AVN SmartTrade is committed to financial inclusion. 58% of our vendors are women-owned businesses
                and 42% are youth entrepreneurs building Zimbabwe's digital future.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '24,567', label: 'Active Users', color: '#0F6F5C' },
                  { value: '3,842', label: 'Active Vendors', color: '#C7A246' },
                  { value: '10', label: 'Provinces Covered', color: '#12B76A' },
                  { value: '99.8%', label: 'Uptime Guarantee', color: '#0F6F5C' },
                  { value: '$2.8M+', label: 'Transaction Volume', color: '#C7A246' },
                  { value: '76%', label: 'Financial Inclusion', color: '#12B76A' },
                ].map(s => (
                  <div key={s.label} className="p-5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                    <div className="text-3xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-sm text-gray-400 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1751130562241-3323a0362831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBtYXJrZXQlMjB2ZW5kb3IlMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzcyNDk1NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Zimbabwe Market Vendor"
                  className="w-full h-[520px] object-cover"
                />
              </div>
              {/* Overlay card */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl p-5 flex items-center gap-4"
                style={{ background: 'rgba(15,111,92,0.95)', backdropFilter: 'blur(8px)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                </div>
                <div>
                  <div className="font-black text-white">"Finally a platform built for us"</div>
                  <div className="text-xs text-green-200/70 mt-0.5">â€” Sithembile M., Vendor, Bulawayo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ HOW IT WORKS â”€â”€ */}
      <section className="py-28" style={{ background: '#f8f9fa' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4"
            style={{ background: 'rgba(15,111,92,0.1)', color: '#0F6F5C' }}>
            Get Started in Minutes
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-16">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: <Smartphone className="w-6 h-6" />, title: 'Register', desc: 'Sign up with your phone number and complete biometric KYC verification.' },
              { step: '02', icon: <BadgeCheck className="w-6 h-6" />, title: 'Get Verified', desc: 'Receive your SentryID digital identity and start your Trust Score.' },
              { step: '03', icon: <Wallet className="w-6 h-6" />, title: 'Fund Wallet', desc: 'Deposit USD or ZiG. Register assets for DAC credits via SmartBarter.' },
              { step: '04', icon: <TrendingUp className="w-6 h-6" />, title: 'Start Trading', desc: 'Buy, sell, transfer, barter â€” across Zimbabwe\'s entire digital economy.' },
            ].map((s, i) => (
              <div key={s.step} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px z-10"
                    style={{ background: 'linear-gradient(90deg, #0F6F5C, transparent)', transform: 'translateX(-50%)' }} />
                )}
                <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100 text-left">
                  <div className="text-5xl font-black mb-4 opacity-10" style={{ color: '#0F6F5C' }}>{s.step}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(15,111,92,0.1)', color: '#0F6F5C' }}>
                    {s.icon}
                  </div>
                  <h4 className="font-black text-gray-900 mb-2">{s.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* â”€â”€ CTA â”€â”€ */}
      <section className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a2e26, #0F6F5C 50%, #1a8a6e)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: '#C7A246' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-2xl opacity-10" style={{ background: '#12B76A' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(199,162,70,0.2)', color: '#C7A246' }}>
            Join the Movement
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Transform<br />Your Business?
          </h2>
          <p className="text-xl text-green-100/70 mb-12 max-w-xl mx-auto">
            Join thousands of Zimbabwean vendors and customers already building a trusted, intelligent digital economy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="gap-2 font-bold px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                style={{ background: 'linear-gradient(135deg, #C7A246, #e8c06a)', color: '#1a1a1a' }}>
                Register as Vendor <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="gap-2 font-bold px-10 py-7 text-lg rounded-2xl border-white/30 text-black hover:bg-white/10">
                Register as Customer
              </Button>
            </Link>
          </div>

          {/* Social proof row */}
          <div className="flex flex-wrap justify-center gap-8 mt-14 text-sm text-green-100/60">
            <span>âœ“ Free to register</span>
            <span>âœ“ No monthly fees</span>
            <span>âœ“ Zero P2P transfer fees</span>
            <span>âœ“ Cancel anytime</span>
          </div>
        </div>
      </section>

      {/* â”€â”€ FOOTER â”€â”€ */}
      <footer className="bg-[#0a0a0a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F6F5C, #12B76A)' }}>
                  <span className="text-white font-black text-sm">AVN</span>
                </div>
                <span className="font-black text-lg">AVN SmartTrade</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
                Zimbabwe's sovereign digital commerce and payment platform. Building a trusted, inclusive digital economy.
              </p>
              <div className="flex gap-3">
                {['USD', 'ZiG', 'DAC'].map(c => (
                  <span key={c} className="text-xs font-bold px-3 py-1.5 rounded-full border border-gray-700 text-gray-400">{c}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-sm tracking-wider uppercase text-gray-300">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/register" className="hover:text-[#12B76A] transition-colors">For Vendors</Link></li>
                <li><Link to="/register" className="hover:text-[#12B76A] transition-colors">For Customers</Link></li>
                <li><Link to="/agent" className="hover:text-[#12B76A] transition-colors">Field Agents</Link></li>
                <li><Link to="/government" className="hover:text-[#12B76A] transition-colors">Government Portal</Link></li>
                <li><Link to="/admin" className="hover:text-[#12B76A] transition-colors">Admin Panel</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-sm tracking-wider uppercase text-gray-300">Innovations</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><span className="hover:text-[#C7A246] transition-colors cursor-default">IzyPay Wallet</span></li>
                <li><span className="hover:text-[#C7A246] transition-colors cursor-default">SmartBarter (DAC)</span></li>
                <li><span className="hover:text-[#C7A246] transition-colors cursor-default">P2P Transfers</span></li>
                <li><span className="hover:text-[#C7A246] transition-colors cursor-default">Trust Score</span></li>
                <li><span className="hover:text-[#C7A246] transition-colors cursor-default">Group Buying</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-5 text-sm tracking-wider uppercase text-gray-300">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>&copy; 2026 AVN SmartTrade. Built for Zimbabwe's Digital Future.</p>
            <p className="flex items-center gap-1.5">
              <BadgeCheck className="w-4 h-4 text-[#0F6F5C]" /> RBZ Compliant · Fintech-Grade Security
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
