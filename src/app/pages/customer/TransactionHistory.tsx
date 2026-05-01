import { useState, useMemo } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import {
  Search,
  Download,
  CheckCircle2,
  Clock,
  Shield,
  AlertCircle,
  Filter,
  Eye,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { zimbabweTransactions } from '../../lib/data';
import { toast } from 'sonner';

export default function TransactionHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'escrow':    return <Shield className="w-4 h-4 text-accent" />;
      case 'pending':   return <Clock className="w-4 h-4 text-primary" />;
      default:          return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success';
      case 'escrow':    return 'bg-accent/10 text-accent';
      case 'pending':   return 'bg-primary/10 text-primary';
      default:          return 'bg-muted text-muted-foreground';
    }
  };

  const filteredTransactions = useMemo(() => {
    return zimbabweTransactions.filter(txn => {
      const matchesSearch =
        searchQuery === '' ||
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.customer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleExport = () => {
    const csv = [
      ['ID', 'Date', 'Vendor', 'Customer', 'Amount', 'Currency', 'Status'],
      ...filteredTransactions.map(t => [t.id, t.date, t.vendor, t.customer, t.amount.toFixed(2), t.currency, t.status]),
    ].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Transaction history exported as CSV');
  };

  const totalSpent = zimbabweTransactions.filter(t => t.status === 'completed').reduce((s, t) => s + t.amount, 0);
  const completedCount = zimbabweTransactions.filter(t => t.status === 'completed').length;
  const escrowCount = zimbabweTransactions.filter(t => t.status === 'escrow').length;
  const escrowTotal = zimbabweTransactions.filter(t => t.status === 'escrow').reduce((s, t) => s + t.amount, 0);
  const pendingCount = zimbabweTransactions.filter(t => t.status === 'pending').length;
  const pendingTotal = zimbabweTransactions.filter(t => t.status === 'pending').reduce((s, t) => s + t.amount, 0);

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
          <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-1">Completed transactions</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Completed</p>
          <p className="text-2xl font-bold text-success">{completedCount}</p>
          <p className="text-xs text-muted-foreground mt-1">Transactions</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">In Escrow</p>
          <p className="text-2xl font-bold text-accent">{escrowCount}</p>
          <p className="text-xs text-muted-foreground mt-1">${escrowTotal.toFixed(2)} total</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending</p>
          <p className="text-2xl font-bold text-primary">{pendingCount}</p>
          <p className="text-xs text-muted-foreground mt-1">${pendingTotal.toFixed(2)} total</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by ID, vendor, or customer..."
              className="pl-10"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setCurrentPage(1); }}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="escrow">In Escrow</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export CSV
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
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No transactions found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((txn) => (
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="gap-1">
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Transaction ID</span>
                              <code className="font-mono text-xs">{txn.id}</code>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Date</span>
                              <span className="font-medium">{txn.date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Vendor</span>
                              <span className="font-medium">{txn.vendor}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Customer</span>
                              <span className="font-medium">{txn.customer}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Amount</span>
                              <span className="font-bold text-lg">${txn.amount.toFixed(2)} {txn.currency}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <Badge variant="secondary" className={getStatusColor(txn.status)}>
                                {txn.status}
                              </Badge>
                            </div>
                            {txn.escrow && (
                              <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-sm text-accent flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                Funds are held in escrow until delivery confirmed
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.success(`Receipt for ${txn.id} downloaded`)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredTransactions.length)}–
          {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
