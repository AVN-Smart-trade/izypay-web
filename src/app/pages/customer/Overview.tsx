import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { 
  Wallet, 
  ShoppingBag, 
  Shield, 
  TrendingUp, 
  QrCode,
  Store,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { zimbabweTransactions } from '../../lib/data';

export default function CustomerOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, Tendai!</h1>
        <p className="text-muted-foreground">Here's what's happening with your account today</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Wallet Balance</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">$245.50</h3>
              <span className="text-sm text-muted-foreground">USD</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold">ZIG 1,847</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Trust Score</p>
            <h3 className="text-2xl font-bold">92/100</h3>
            <p className="text-xs text-success flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Excellent standing
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-success" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-bold">47</h3>
            <p className="text-xs text-muted-foreground">3 pending delivery</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Escrow Balance</p>
            <h3 className="text-2xl font-bold">$120.00</h3>
            <p className="text-xs text-muted-foreground">2 transactions pending</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="font-bold mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/customer/marketplace">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Browse Vendors</div>
                <div className="text-xs text-muted-foreground">Explore marketplace</div>
              </div>
            </Button>
          </Link>

          <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <QrCode className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <div className="font-medium">Scan & Pay</div>
              <div className="text-xs text-muted-foreground">Quick payment</div>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-success" />
            </div>
            <div className="text-left">
              <div className="font-medium">Top Up Wallet</div>
              <div className="text-xs text-muted-foreground">Add funds</div>
            </div>
          </Button>

          <Link to="/customer/transactions">
            <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">View Orders</div>
                <div className="text-xs text-muted-foreground">Track deliveries</div>
              </div>
            </Button>
          </Link>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Recent Transactions</h3>
            <Link to="/customer/transactions">
              <Button variant="ghost" size="sm" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {zimbabweTransactions.slice(0, 4).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    txn.status === 'completed' ? 'bg-success/10' :
                    txn.status === 'escrow' ? 'bg-accent/10' :
                    'bg-primary/10'
                  }`}>
                    {txn.status === 'completed' ? <CheckCircle2 className="w-5 h-5 text-success" /> :
                     txn.status === 'escrow' ? <Shield className="w-5 h-5 text-accent" /> :
                     <Clock className="w-5 h-5 text-primary" />}
                  </div>
                  <div>
                    <p className="font-medium">{txn.vendor}</p>
                    <p className="text-sm text-muted-foreground">{txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">${txn.amount.toFixed(2)}</p>
                  <Badge variant="secondary" className={`text-xs ${
                    txn.status === 'completed' ? 'bg-success/10 text-success' :
                    txn.status === 'escrow' ? 'bg-accent/10 text-accent' :
                    'bg-primary/10 text-primary'
                  }`}>
                    {txn.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Escrow */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Pending Escrow Payments</h3>
            <Badge variant="secondary" className="bg-accent/10 text-accent">2 Active</Badge>
          </div>

          <div className="space-y-4">
            {zimbabweTransactions.filter(t => t.escrow).slice(0, 2).map((txn) => (
              <div key={txn.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{txn.vendor}</p>
                    <p className="text-sm text-muted-foreground">{txn.id}</p>
                  </div>
                  <p className="font-bold text-lg">${txn.amount.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>Protected by escrow until delivery confirmed</span>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">Confirm Delivery</Button>
                  <Button size="sm" variant="outline" className="flex-1">Dispute</Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-accent/10 border border-accent/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-accent mb-1">Escrow Protection Active</p>
              <p className="text-muted-foreground">Your payment is held securely until you confirm receipt of goods.</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-white overflow-hidden relative">
        <div className="relative z-10">
          <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-0">Featured</Badge>
          <h3 className="text-2xl font-bold mb-2">Discover Zimbabwe's Best Vendors</h3>
          <p className="mb-6 opacity-90">Shop from verified local businesses across all 10 provinces</p>
          <Link to="/customer/marketplace">
            <Button size="lg" variant="secondary">
              Explore Marketplace <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1701241284365-5e0496ad6d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBzaG9wcGluZyUyMGdyb2NlcmllcyUyMHNtYXJ0cGhvbmV8ZW58MXx8fHwxNzcyNDk1NjY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Shopping"
          className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-20"
        />
      </Card>
    </div>
  );
}
