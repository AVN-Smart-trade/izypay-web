import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  Search, 
  Download, 
  CheckCircle2, 
  Clock, 
  Shield,
  AlertCircle,
  Filter
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { zimbabweTransactions } from '../../lib/data';

export default function TransactionHistory() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'escrow':
        return <Shield className="w-4 h-4 text-accent" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'escrow':
        return 'bg-accent/10 text-accent';
      case 'pending':
        return 'bg-primary/10 text-primary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
        <p className="text-muted-foreground">View all your purchases and payments</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
          <p className="text-2xl font-bold">$278.00</p>
          <p className="text-xs text-muted-foreground mt-1">This month</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Completed</p>
          <p className="text-2xl font-bold text-success">32</p>
          <p className="text-xs text-muted-foreground mt-1">Transactions</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">In Escrow</p>
          <p className="text-2xl font-bold text-accent">2</p>
          <p className="text-xs text-muted-foreground mt-1">$120.00 total</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending</p>
          <p className="text-2xl font-bold text-primary">1</p>
          <p className="text-xs text-muted-foreground mt-1">$85.50 total</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search transactions..." 
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Transactions Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
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
                  <code className="text-sm font-mono">{txn.id}</code>
                </TableCell>
                <TableCell>{txn.date}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{txn.vendor}</p>
                    {txn.escrow && (
                      <div className="flex items-center gap-1 text-xs text-accent mt-1">
                        <Shield className="w-3 h-3" />
                        Escrow Protected
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <p className="font-bold">${txn.amount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{txn.currency}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={`gap-1 ${getStatusColor(txn.status)}`}>
                    {getStatusIcon(txn.status)}
                    {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">View</Button>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1-5 of 47 transactions
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Previous</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}
