import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Activity, AlertTriangle, Search, Filter, Flag } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { zimbabweTransactions } from '../../lib/data';

export default function TransactionMonitoring() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Transaction Monitoring</h1>
        <p className="text-muted-foreground">Real-time transaction surveillance and fraud detection</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Transactions Today</p>
          <p className="text-2xl font-bold">2,847</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Volume Today</p>
          <p className="text-2xl font-bold">$124,580</p>
        </Card>

        <Card className="p-6 border-destructive">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Flagged Transactions</p>
          <p className="text-2xl font-bold text-destructive">12</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Avg. Transaction</p>
          <p className="text-2xl font-bold">$43.70</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by transaction ID, user, or vendor..." className="pl-10" />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date/Time</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zimbabweTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>
                  <code className="text-sm">{txn.id}</code>
                </TableCell>
                <TableCell className="text-sm">{txn.date} 10:45</TableCell>
                <TableCell>{txn.customer}</TableCell>
                <TableCell>{txn.vendor}</TableCell>
                <TableCell>
                  <p className="font-bold">${txn.amount.toFixed(2)}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={
                    txn.status === 'completed' ? 'bg-success/10 text-success' :
                    txn.status === 'escrow' ? 'bg-accent/10 text-accent' :
                    'bg-primary/10 text-primary'
                  }>
                    {txn.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">View</Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
