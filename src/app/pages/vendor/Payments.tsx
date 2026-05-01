import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { DollarSign, TrendingUp, Clock, CheckCircle2, Download, Eye, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { toast } from 'sonner';

type Settlement = { id: string; date: string; amount: number; status: 'completed' | 'pending'; method: string; };

const initialSettlements: Settlement[] = [
  { id: 'SET-001', date: '2025-03-01', amount: 2450.00, status: 'completed', method: 'Bank Transfer' },
  { id: 'SET-002', date: '2025-02-25', amount: 3200.50, status: 'completed', method: 'Mobile Money' },
  { id: 'SET-003', date: '2025-02-20', amount: 1875.00, status: 'pending', method: 'Bank Transfer' },
];

export default function VendorPayments() {
  const [balance, setBalance] = useState(4285.50);
  const [settlements, setSettlements] = useState<Settlement[]>(initialSettlements);
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutMethod, setPayoutMethod] = useState('Bank Transfer');
  const [viewSettlement, setViewSettlement] = useState<Settlement | null>(null);

  const pending = settlements.filter(s => s.status === 'pending').reduce((sum, s) => sum + s.amount, 0);
  const thisMonth = 35800;
  const lifetime = 128450;

  const handleRequestPayout = () => {
    const amt = parseFloat(payoutAmount);
    if (!amt || amt <= 0) { toast.error('Enter a valid payout amount'); return; }
    if (amt > balance) { toast.error(`Amount exceeds available balance ($${balance.toFixed(2)})`); return; }
    const newSettlement: Settlement = {
      id: `SET-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      amount: amt,
      status: 'pending',
      method: payoutMethod,
    };
    setSettlements(prev => [newSettlement, ...prev]);
    setBalance(prev => prev - amt);
    setPayoutOpen(false);
    setPayoutAmount('');
    toast.success(`Payout of $${amt.toFixed(2)} requested via ${payoutMethod}. Processing in 1-2 business days.`);
  };

  const exportCSV = () => {
    const rows = [['ID', 'Date', 'Amount', 'Method', 'Status'],
      ...settlements.map(s => [s.id, s.date, s.amount.toFixed(2), s.method, s.status])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'settlements.csv'; a.click();
    URL.revokeObjectURL(url);
    toast.success('Settlement history exported as CSV');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Payments & Settlements</h1>
          <p className="text-muted-foreground">Track your earnings and payouts</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={exportCSV}>
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
          <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
          <Dialog open={payoutOpen} onOpenChange={setPayoutOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-3 gap-1"><Plus className="w-3.5 h-3.5" /> Request Payout</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Request Payout</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Amount (USD)</Label>
                  <Input type="number" placeholder="0.00" value={payoutAmount}
                    onChange={e => setPayoutAmount(e.target.value)}
                    max={balance} />
                  <p className="text-xs text-muted-foreground mt-1">Available: ${balance.toFixed(2)}</p>
                </div>
                <div>
                  <Label>Payout Method</Label>
                  <Select value={payoutMethod} onValueChange={setPayoutMethod}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Mobile Money">Mobile Money (Ecocash)</SelectItem>
                      <SelectItem value="IzyPay Wallet">IzyPay Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setPayoutOpen(false)}>Cancel</Button>
                  <Button className="flex-1" onClick={handleRequestPayout}>Confirm Request</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">This Month</p>
          <p className="text-2xl font-bold">${thisMonth.toLocaleString()}</p>
          <Badge variant="secondary" className="bg-success/10 text-success mt-2">
            <TrendingUp className="w-3 h-3 mr-1" />+12.5%
          </Badge>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending Settlement</p>
          <p className="text-2xl font-bold text-accent">${pending.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {settlements.filter(s => s.status === 'pending').length} request(s) processing
          </p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Lifetime</p>
          <p className="text-2xl font-bold">${lifetime.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground mt-2">Since Sep 2025</p>
        </Card>
      </div>

      {/* Settlement Table */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Settlement History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Settlement ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map(s => (
              <TableRow key={s.id}>
                <TableCell><code className="text-sm">{s.id}</code></TableCell>
                <TableCell>{s.date}</TableCell>
                <TableCell><p className="font-bold">${s.amount.toFixed(2)}</p></TableCell>
                <TableCell>{s.method}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={s.status === 'completed' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'}>
                    {s.status === 'completed' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {s.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="gap-1" onClick={() => setViewSettlement(s)}>
                        <Eye className="w-3.5 h-3.5" /> View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Settlement {viewSettlement?.id}</DialogTitle></DialogHeader>
                      {viewSettlement && (
                        <div className="space-y-3 text-sm">
                          <div className="grid grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg">
                            <div><p className="text-muted-foreground">Amount</p><p className="font-bold text-lg">${viewSettlement.amount.toFixed(2)}</p></div>
                            <div><p className="text-muted-foreground">Method</p><p className="font-medium">{viewSettlement.method}</p></div>
                            <div><p className="text-muted-foreground">Date</p><p className="font-medium">{viewSettlement.date}</p></div>
                            <div><p className="text-muted-foreground">Status</p>
                              <Badge variant="secondary" className={viewSettlement.status === 'completed' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'}>
                                {viewSettlement.status}
                              </Badge>
                            </div>
                          </div>
                          <Button className="w-full gap-2" variant="outline" onClick={() => { toast.success(`Receipt for ${viewSettlement.id} downloaded`); }}>
                            <Download className="w-4 h-4" /> Download Receipt
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
