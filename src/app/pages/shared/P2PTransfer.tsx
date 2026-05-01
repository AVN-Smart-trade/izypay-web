import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { Send, Users, ArrowRight, Shield, Zap, CheckCircle2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { p2pTransfers, walletBalances } from '../../lib/wallet-barter-data';
import { toast } from 'sonner';

export default function P2PTransfer() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSend = () => {
    toast.success('Transfer initiated successfully!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Peer-to-Peer Transfer</h1>
        <p className="text-muted-foreground">Send money instantly to anyone with IzyPay</p>
      </div>

      {/* Feature Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Instant P2P Transfers</h3>
              <p className="text-sm opacity-90">Send USD, ZiG or DACs to anyone in seconds</p>
            </div>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxBZnJpY2FuJTIwbW9iaWxlJTIwcGF5bWVudHxlbnwwfHx8fDE3NDEwMDY3Mzh8MA&ixlib=rb-4.1.0&q=80&w=300"
            alt="Transfer"
            className="hidden lg:block h-24 w-32 object-cover rounded-lg"
          />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Send Money Form */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Send Money</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Input 
                  id="recipient" 
                  placeholder="Phone number or username"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter +263 phone number or IzyPay username
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">🇺🇸 USD - Available: $1,180.50</SelectItem>
                    <SelectItem value="ZIG">🇿🇼 ZiG - Available: Z$36,800</SelectItem>
                    <SelectItem value="DAC">🌾 DAC - Available: 450 DAC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {selectedCurrency === 'USD' ? '$' : selectedCurrency === 'ZIG' ? 'Z$' : 'DAC'}
                  </span>
                  <Input 
                    id="amount" 
                    type="number" 
                    className="pl-8" 
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setAmount('10')}>$10</Button>
                  <Button variant="outline" size="sm" onClick={() => setAmount('25')}>$25</Button>
                  <Button variant="outline" size="sm" onClick={() => setAmount('50')}>$50</Button>
                  <Button variant="outline" size="sm" onClick={() => setAmount('100')}>$100</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reference">Reference (Optional)</Label>
                <Textarea 
                  id="reference" 
                  placeholder="e.g., Lunch money, Payment for goods"
                  rows={2}
                />
              </div>

              <Separator />

              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">${amount || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fee</span>
                  <span className="font-medium text-success">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl text-primary">${amount || '0.00'}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-primary text-white gap-2"
                onClick={handleSend}
              >
                <Send className="w-4 h-4" />
                Send Money
              </Button>
            </div>
          </Card>

          {/* Benefits */}
          <Card className="p-6 bg-muted/30">
            <h4 className="font-medium mb-4 text-sm">Why Use IzyPay P2P?</h4>
            <div className="space-y-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Instant Transfers</p>
                  <p>Money arrives in seconds, not hours or days</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Secure & Protected</p>
                  <p>Bank-grade encryption and fraud protection</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">No Hidden Fees</p>
                  <p>P2P transfers are completely free</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transfers */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Recent P2P Transfers</h3>
            <div className="space-y-4">
              {p2pTransfers.map((transfer, idx) => (
                <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transfer.type === 'received' ? 'bg-success/10' : 'bg-primary/10'
                      }`}>
                        {transfer.type === 'received' ? (
                          <ArrowDownLeft className="w-5 h-5 text-success" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transfer.type === 'received' ? transfer.sender : transfer.recipient}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transfer.type === 'received' ? transfer.senderPhone : transfer.recipientPhone}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={
                      transfer.status === 'completed' ? 'bg-success/10 text-success' :
                      'bg-secondary/10 text-secondary'
                    }>
                      {transfer.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {new Date(transfer.date).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">{transfer.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        transfer.type === 'received' ? 'text-success' : 'text-foreground'
                      }`}>
                        {transfer.type === 'received' ? '+' : '-'}{transfer.amount.toFixed(2)} {transfer.currency}
                      </p>
                      {transfer.fee > 0 && (
                        <p className="text-xs text-muted-foreground">Fee: ${transfer.fee.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4" onClick={() => toast.info('Full P2P transfer history — navigate to Wallet for complete history')}>
              View All Transfers
            </Button>
          </Card>

          {/* Quick Send */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Quick Send</h3>
            <p className="text-sm text-muted-foreground mb-4">Send to recent recipients</p>
            <div className="grid grid-cols-3 gap-3">
                {['Chipo Ndlovu', 'Nyasha Dube', 'Blessing Ncube'].map((name, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="flex flex-col h-auto py-4 gap-2"
                  onClick={() => {
                    setRecipient(name);
                    toast.success(`${name} selected as recipient — enter amount above`);
                  }}
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs">{name.split(' ')[0]}</span>
                </Button>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Your P2P Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">$240</p>
                <p className="text-xs text-muted-foreground">Sent This Month</p>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-2xl font-bold text-success">$185</p>
                <p className="text-xs text-muted-foreground">Received</p>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <p className="text-2xl font-bold text-secondary">24</p>
                <p className="text-xs text-muted-foreground">Transfers</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">$0</p>
                <p className="text-xs text-muted-foreground">Total Fees</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
