import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  CreditCard,
  Building2,
  TrendingUp,
  Download,
  Eye,
  EyeOff,
  Plus,
  ArrowRightLeft
} from 'lucide-react';
import { walletTransactions } from '../../lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function WalletManagement() {
  const [showBalance, setShowBalance] = useState(true);
  const [currency, setCurrency] = useState('USD');

  const balanceData = [
    { date: 'Feb 25', balance: 985 },
    { date: 'Feb 26', balance: 1050 },
    { date: 'Feb 27', balance: 1185 },
    { date: 'Feb 28', balance: 1125 },
    { date: 'Mar 01', balance: 1210 },
    { date: 'Mar 02', balance: 1245 },
  ];

  const walletBalance = {
    USD: 1245.50,
    ZIG: 24567.80
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Wallet</h1>
        <p className="text-muted-foreground">Manage your funds and view transaction history</p>
      </div>

      {/* Balance Overview */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-primary to-primary/80 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Wallet className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Balance</p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0 mt-1">
                    SentryID Verified
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24 bg-white/20 border-white/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD $</SelectItem>
                    <SelectItem value="ZIG">ZIG</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={() => setShowBalance(!showBalance)}
                >
                  {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </Button>
              </div>
            </div>

            <div className="mb-8">
              {showBalance ? (
                <>
                  <p className="text-5xl font-bold mb-2">
                    {currency === 'USD' ? '$' : ''}{walletBalance[currency as keyof typeof walletBalance].toLocaleString()}
                    {currency === 'ZIG' ? ' ZIG' : ''}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="opacity-90">+12.5% from last month</span>
                  </div>
                </>
              ) : (
                <p className="text-5xl font-bold mb-2">••••••</p>
              )}
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1 gap-2">
                <Plus className="w-4 h-4" />
                Top Up
              </Button>
              <Button variant="secondary" className="flex-1 gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Withdraw
              </Button>
              <Button variant="secondary" className="flex-1 gap-2">
                <ArrowRightLeft className="w-4 h-4" />
                Transfer
              </Button>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mb-24" />
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Money In</p>
                <p className="text-xl font-bold">$342.50</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Money Out</p>
                <p className="text-xl font-bold">$285.00</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">This week</p>
          </Card>
        </div>
      </div>

      {/* Balance Trend */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Balance History</h3>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={balanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#006B3F" 
              strokeWidth={3}
              dot={{ fill: '#006B3F', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Transaction Management */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="credit">Money In</TabsTrigger>
          <TabsTrigger value="debit">Money Out</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="font-bold">Recent Transactions</h3>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <Select defaultValue="all">
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="credit">Credit</SelectItem>
                    <SelectItem value="debit">Debit</SelectItem>
                    <SelectItem value="transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {walletTransactions.map((txn) => (
                    <TableRow key={txn.id}>
                      <TableCell className="font-medium">
                        <div>
                          <p>{new Date(txn.date).toLocaleDateString()}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(txn.date).toLocaleTimeString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{txn.description}</p>
                        <p className="text-xs text-muted-foreground">{txn.id}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={
                          txn.type === 'credit' ? 'bg-success/10 text-success' :
                          txn.type === 'debit' ? 'bg-destructive/10 text-destructive' :
                          'bg-accent/10 text-accent'
                        }>
                          {txn.type === 'credit' ? (
                            <ArrowDownRight className="w-3 h-3 mr-1" />
                          ) : txn.type === 'debit' ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <RefreshCw className="w-3 h-3 mr-1" />
                          )}
                          {txn.type === 'credit' ? 'Credit' : 
                           txn.type === 'debit' ? 'Debit' : 'Transfer'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        <span className={
                          txn.type === 'credit' ? 'text-success' :
                          txn.type === 'debit' ? 'text-destructive' :
                          'text-muted-foreground'
                        }>
                          {txn.type === 'credit' ? '+' : '-'}
                          ${txn.amount.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${txn.balance.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="credit">
          <Card className="p-6">
            <p className="text-muted-foreground text-center py-8">
              Filtered view for incoming transactions
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="debit">
          <Card className="p-6">
            <p className="text-muted-foreground text-center py-8">
              Filtered view for outgoing transactions
            </p>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Methods */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Payment Methods</h3>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border-2 border-primary rounded-lg bg-primary/5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Mastercard</p>
                  <p className="text-sm text-muted-foreground">•••• 4567</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-primary/10 text-primary">Primary</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Expires 12/26</p>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">ZB Bank Account</p>
                <p className="text-sm text-muted-foreground">•••• 8901</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Linked for withdrawals</p>
          </div>
        </div>

        <Button variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Payment Method
        </Button>
      </Card>
    </div>
  );
}
