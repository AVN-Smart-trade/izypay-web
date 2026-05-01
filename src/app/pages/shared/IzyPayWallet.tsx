import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Plus, Send, Download, 
  TrendingUp, Shield, Eye, EyeOff, RefreshCw, DollarSign, Landmark
} from 'lucide-react';
import { walletBalances, walletTransactions, trustScore } from '../../lib/wallet-barter-data';
import { Link } from 'react-router';
import { toast } from 'sonner';

export default function IzyPayWallet() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const wallet = walletBalances;

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'merchant_payment': return '🛍️';
      case 'p2p_received': return '↓';
      case 'p2p_sent': return '↑';
      case 'top_up': return '➕';
      case 'asset_exchange': return '🔄';
      default: return '💳';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">IzyPay Wallet</h1>
          <p className="text-muted-foreground">Multi-currency digital wallet with P2P transfers</p>
        </div>
        <Button className="bg-primary text-white gap-2" onClick={() => toast.info('Top Up dialog — connect to IzyPay backend')}>
          <Plus className="w-4 h-4" />
          Top Up
        </Button>
      </div>

      {/* Service Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">IzyPay Wallet Service</h3>
                  <p className="text-sm opacity-90">Manage USD, ZiG & Digital Asset Credits</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Bank-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Trust Score: {trustScore.score}</span>
                </div>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBtb2JpbGUlMjBwYXltZW50fGVufDB8fHx8MTc0MTAwNjI4N3ww&ixlib=rb-4.1.0&q=80&w=300"
              alt="Wallet"
              className="hidden lg:block h-24 w-32 object-cover rounded-lg"
            />
          </div>
        </div>
      </Card>

      {/* Multi-Currency Balances */}
      <div className="grid md:grid-cols-3 gap-6">
        {wallet.wallets.map((currency, idx) => (
          <Card key={idx} className="p-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-4xl opacity-20">
              {currency.flag}
            </div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-muted-foreground">{currency.currency}</h3>
                {idx === 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setBalanceVisible(!balanceVisible)}
                  >
                    {balanceVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                )}
              </div>
              
              <p className="text-3xl font-bold mb-2">
                {balanceVisible ? (
                  `${currency.symbol} ${currency.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                ) : (
                  '****.**'
                )}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Available</p>
                  <p className="font-medium">
                    {balanceVisible ? `${currency.symbol} ${currency.available.toFixed(2)}` : '****.**'}
                  </p>
                </div>
                {currency.pending > 0 && (
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="font-medium text-secondary">
                      {balanceVisible ? `${currency.symbol} ${currency.pending.toFixed(2)}` : '****.**'}
                    </p>
                  </div>
                )}
              </div>

              {currency.description && (
                <p className="text-xs text-muted-foreground mt-2">{currency.description}</p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="p2p-transfer">
            <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2">
              <Send className="w-6 h-6 text-primary" />
              <span className="text-sm">Send Money</span>
            </Button>
          </Link>
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2" onClick={() => toast.info('Share your IzyPay ID: izypay://tendai.moyo to receive money')}>
            <Download className="w-6 h-6 text-success" />
            <span className="text-sm">Receive</span>
          </Button>
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2" onClick={() => toast.info('Top Up: add funds via bank transfer or mobile money')}>
            <Plus className="w-6 h-6 text-secondary" />
            <span className="text-sm">Top Up</span>
          </Button>
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col gap-2" onClick={() => toast.info('Withdraw to your linked bank account')}>
            <Landmark className="w-6 h-6 text-primary" />
            <span className="text-sm">Withdraw</span>
          </Button>
        </div>
      </Card>

      {/* Wallet Tabs */}
      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="trust">Trust Score</TabsTrigger>
        </TabsList>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Recent Transactions</h3>
              <Button variant="outline" size="sm" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
            </div>
            
            <div className="space-y-4">
              {walletTransactions.map((txn, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                        txn.amount > 0 ? 'bg-success/10' : 'bg-muted'
                      }`}>
                        {getTransactionIcon(txn.type)}
                      </div>
                      <div>
                        <p className="font-medium">{txn.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(txn.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${txn.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                        {txn.amount > 0 ? '+' : ''}{txn.amount.toFixed(2)} {txn.currency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Balance: {txn.balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {idx < walletTransactions.length - 1 && <Separator />}
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={() => toast.info('Full transaction history is in the Wallet page')}>              View All Transactions
            </Button>
          </Card>
        </TabsContent>

        {/* Savings Tab */}
        <TabsContent value="savings" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Linked Savings Accounts</h3>
              <Button className="bg-primary text-white gap-2">
                <Plus className="w-4 h-4" />
                New Goal
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-2 border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Emergency Fund</h4>
                  <Badge className="bg-success text-white">Active</Badge>
                </div>
                <p className="text-3xl font-bold text-primary mb-4">$850.00</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="font-medium">$2,000.00</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '42.5%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>42.5% complete</span>
                    <span>$1,150 to go</span>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-bold text-success">5.5% APY</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Auto-Save</span>
                    <span className="font-medium">$20 weekly</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-2 border-secondary/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold">Business Growth</h4>
                  <Badge className="bg-secondary text-white">Active</Badge>
                </div>
                <p className="text-3xl font-bold text-secondary mb-4">$1,200.00</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="font-medium">$5,000.00</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '24%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>24% complete</span>
                    <span>$3,800 to go</span>
                  </div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Interest Rate</span>
                    <span className="font-bold text-success">6.0% APY</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Auto-Save</span>
                    <span className="font-medium">5% per transaction</span>
                  </div>
                </div>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Trust Score Tab */}
        <TabsContent value="trust" className="space-y-6">
          <Card className="p-6">
            <div className="text-center mb-6">
              <h3 className="font-bold mb-4">Your Trust Score</h3>
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary mb-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white">{trustScore.score}</p>
                  <p className="text-xs text-white/80">/ {trustScore.maxScore}</p>
                </div>
              </div>
              <Badge className="bg-success text-white text-lg px-4 py-1">
                {trustScore.rating}
              </Badge>
            </div>

            <div className="grid md:grid-cols-5 gap-4 mb-6">
              {trustScore.factors.map((factor, idx) => (
                <div key={idx} className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-primary mb-1">{factor.score}</p>
                  <p className="text-xs text-muted-foreground">{factor.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{factor.weight}% weight</p>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div>
              <h4 className="font-bold mb-4">Trust Score Benefits</h4>
              <div className="grid md:grid-cols-2 gap-3">
                {trustScore.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <Shield className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Integration Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="w-6 h-6 text-primary" />
            <h3 className="font-bold">Connected Services</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span>Scan & Pay</span>
              <Badge variant="secondary" className="bg-success text-white">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span>SmartBarter Exchange</span>
              <Badge variant="secondary" className="bg-success text-white">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span>Merchant Payments</span>
              <Badge variant="secondary" className="bg-success text-white">Active</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-6 h-6 text-primary" />
            <h3 className="font-bold">Security & Compliance</h3>
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>2FA Authentication Enabled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Biometric Login Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>RBZ Compliant Wallet</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>PCI DSS Certified</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
