import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { DollarSign, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export default function VendorPayments() {
  const settlements = [
    { id: 'SET-001', date: '2025-03-01', amount: 2450.00, status: 'completed', method: 'Bank Transfer' },
    { id: 'SET-002', date: '2025-02-25', amount: 3200.50, status: 'completed', method: 'Mobile Money' },
    { id: 'SET-003', date: '2025-02-20', amount: 1875.00, status: 'pending', method: 'Bank Transfer' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Payments & Settlements</h1>
        <p className="text-muted-foreground">Track your earnings and payouts</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
          <p className="text-2xl font-bold">$4,285.50</p>
          <Button size="sm" className="mt-3">Request Payout</Button>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">This Month</p>
          <p className="text-2xl font-bold">$35,800</p>
          <Badge variant="secondary" className="bg-success/10 text-success mt-2">
            <TrendingUp className="w-3 h-3 mr-1" />
            +12.5%
          </Badge>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending Settlement</p>
          <p className="text-2xl font-bold text-accent">$1,875.00</p>
          <p className="text-xs text-muted-foreground mt-2">Processing</p>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Lifetime</p>
          <p className="text-2xl font-bold">$128,450</p>
          <p className="text-xs text-muted-foreground mt-2">Since Sep 2025</p>
        </Card>
      </div>

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
            {settlements.map((settlement) => (
              <TableRow key={settlement.id}>
                <TableCell>
                  <code className="text-sm">{settlement.id}</code>
                </TableCell>
                <TableCell>{settlement.date}</TableCell>
                <TableCell>
                  <p className="font-bold">${settlement.amount.toFixed(2)}</p>
                </TableCell>
                <TableCell>{settlement.method}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={
                    settlement.status === 'completed' ? 'bg-success/10 text-success' :
                    'bg-accent/10 text-accent'
                  }>
                    {settlement.status === 'completed' ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                    {settlement.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="ghost">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
