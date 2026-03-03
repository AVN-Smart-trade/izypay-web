import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowRight, Shield, Wallet, Store, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">AVN</span>
            </div>
            <div>
              <h1 className="font-bold text-xl">AVN SmartTrade</h1>
              <p className="text-xs text-muted-foreground">Digital Commerce for Zimbabwe</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">Government-Ready Platform</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Zimbabwe's Digital Commerce Platform
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empowering vendors, securing payments, and building trust in Zimbabwe's digital economy.
              From informal markets to enterprise-level transactions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Start Trading Now <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/government">
                <Button size="lg" variant="outline">
                  Government Dashboard
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>Escrow Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>SentryID Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span>USD & ZIG Support</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1662831328216-2c14f3c61939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxaaW1iYWJ3ZSUyMEhhcmFyZSUyMHNreWxpbmUlMjBjaXR5fGVufDF8fHx8MTc3MjQ5NTU1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Harare Skyline"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-primary">24,567</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-accent">$2.8M+</div>
              <div className="text-sm text-muted-foreground">Transaction Volume</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built for Zimbabwe's Economy</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A complete digital commerce ecosystem designed for informal traders, SMEs, and enterprise businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Vendor Storefronts</h3>
              <p className="text-muted-foreground">
                Digital storefronts for Mbare markets to Harare enterprises. Manage inventory, orders, and payments in one place.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Escrow Protection</h3>
              <p className="text-muted-foreground">
                Smart escrow system holds payments until delivery confirmation. Build trust in every transaction.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">Multi-Currency Wallet</h3>
              <p className="text-muted-foreground">
                Support for USD and ZIG. Real-time conversions, instant settlements, and comprehensive transaction history.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Identity (SentryID)</h3>
              <p className="text-muted-foreground">
                Biometric verification and KYC onboarding. Build your trust score and access better opportunities.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Insights</h3>
              <p className="text-muted-foreground">
                ZivaAI analytics help vendors optimize inventory, predict demand, and grow their business intelligently.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold mb-2">Government Compliance</h3>
              <p className="text-muted-foreground">
                Full transparency for regulators. Real-time monitoring, fraud detection, and financial inclusion tracking.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Coverage */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1751130562241-3323a0362831?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBtYXJrZXQlMjB2ZW5kb3IlMjBlbnRyZXByZW5ldXJ8ZW58MXx8fHwxNzcyNDk1NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Zimbabwe Market Vendor"
              className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-6">Empowering Women & Youth</h2>
            <p className="text-lg text-muted-foreground mb-8">
              AVN SmartTrade is committed to financial inclusion. 58% of our vendors are women-owned businesses,
              and 42% are youth entrepreneurs building Zimbabwe's future.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">3,842</div>
                <div className="text-muted-foreground">Active Vendors</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">10</div>
                <div className="text-muted-foreground">Provinces Covered</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-success mb-2">99.8%</div>
                <div className="text-muted-foreground">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">76%</div>
                <div className="text-muted-foreground">Financial Inclusion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of Zimbabwean vendors and customers building a trusted digital economy
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="secondary" className="gap-2">
                Register as Vendor <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Register as Customer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">AVN</span>
                </div>
                <span className="font-bold text-lg">AVN SmartTrade</span>
              </div>
              <p className="text-gray-400 text-sm">
                Zimbabwe's sovereign digital commerce and payment platform
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/register" className="hover:text-white">For Vendors</Link></li>
                <li><Link to="/register" className="hover:text-white">For Customers</Link></li>
                <li><Link to="/agent" className="hover:text-white">Field Agents</Link></li>
                <li><Link to="/government" className="hover:text-white">Government Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press Kit</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 AVN SmartTrade. Built for Zimbabwe's Digital Future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
