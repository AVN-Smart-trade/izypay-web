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
import { toast } from 'sonner';
import { useAuth } from '../../context/AuthContext';
import { getTransactions, TransactionResponse } from '../../api/wallet';
import { useEffect } from 'react';

export default function TransactionHistory() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      getTransactions(user.id)
        .then(setTransactions)
        .catch(() => toast.error('Failed to fetch transactions'))
        .finally(() => setLoading(false));
    }
  }, [user]);

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
    return transactions.filter(txn => {
      const matchesSearch =
        searchQuery === '' ||
        (txn.transactionRef && txn.transactionRef.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (txn.reference && txn.reference.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || txn.status.toLowerCase() === statusFilter.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTransactions.length / itemsPerPage));
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleExport = () => {
    const csv = [
      ['ID', 'Date', 'Type', 'Amount', 'Currency', 'Status'],
      ...filteredTransactions.map(t => [t.transactionRef, t.createdDate, t.type, t.amount.toFixed(2), t.currency, t.status]),
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

  const totalSpent = transactions.filter(t => t.status === 'SUCCESS' && t.type === 'DEBIT').reduce((s, t) => s + Math.abs(t.amount), 0);
  const completedCount = transactions.filter(t => t.status === 'SUCCESS').length;
  const escrowCount = 0; // Escrow count is not directly mapped yet
  const escrowTotal = 0;
  const pendingCount = transactions.filter(t => t.status === 'PENDING').length;
  const pendingTotal = transactions.filter(t => t.status === 'PENDING').reduce((s, t) => s + Math.abs(t.amount), 0);

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
              paginatedTransactions.map((txn, idx) => (
                <TableRow key={txn.id || idx}>
                  <TableCell>
                    <code className="text-sm font-mono">{txn.transactionRef || txn.id}</code>
                  </TableCell>
                  <TableCell>{new Date(txn.createdDate || Date.now()).toLocaleString()}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{txn.reference || txn.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold">${Math.abs(txn.amount).toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{txn.currency}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`gap-1 ${getStatusColor(txn.status?.toLowerCase() || 'pending')}`}>
                      {getStatusIcon(txn.status?.toLowerCase() || 'pending')}
                      {txn.status || 'PENDING'}
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
                              <span className="text-muted-foreground">Transaction Ref</span>
                              <code className="font-mono text-xs">{txn.transactionRef}</code>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Date</span>
                              <span className="font-medium">{new Date(txn.createdDate || Date.now()).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Type</span>
                              <span className="font-medium">{txn.type}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Reference</span>
                              <span className="font-medium">{txn.reference}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Amount</span>
                              <span className="font-bold text-lg">${Math.abs(txn.amount).toFixed(2)} {txn.currency}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-muted-foreground">Status</span>
                              <Badge variant="secondary" className={getStatusColor(txn.status?.toLowerCase() || 'pending')}>
                                {txn.status}
                              </Badge>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.success(`Receipt downloaded`)}
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
