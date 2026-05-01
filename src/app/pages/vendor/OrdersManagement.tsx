import { useState, useMemo } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Shield, CheckCircle2, Clock, ShoppingBag, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { zimbabweOrders } from '../../lib/data';
import { toast } from 'sonner';

type OrderStatus = 'pending' | 'processing' | 'delivered' | 'cancelled';
type Order = { id: string; customer: string; items: number; total: number; escrow?: boolean; status: OrderStatus; date: string; };

const initialOrders: Order[] = zimbabweOrders.map(o => ({
  id: o.id,
  customer: o.customer,
  items: o.items,
  total: o.total,
  escrow: o.escrow,
  status: o.status as OrderStatus,
  date: o.date,
}));

const PAGE_SIZE = 8;

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const filtered = useMemo(() => orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  }), [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }), [orders]);

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    toast.success(`Order ${id} marked as ${status}`);
    setViewOrder(prev => prev?.id === id ? { ...prev, status } : prev);
  };

  const statusBadge = (status: OrderStatus) => {
    const map: Record<OrderStatus, string> = {
      delivered: 'bg-success/10 text-success',
      pending: 'bg-accent/10 text-accent',
      processing: 'bg-primary/10 text-primary',
      cancelled: 'bg-destructive/10 text-destructive',
    };
    return map[status];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
        <p className="text-muted-foreground">Track and fulfill customer orders</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Orders', value: stats.total, color: '' },
          { label: 'Pending', value: stats.pending, color: 'text-accent' },
          { label: 'Processing', value: stats.processing, color: 'text-primary' },
          { label: 'Delivered', value: stats.delivered, color: 'text-success' },
        ].map(s => (
          <Card key={s.label} className="p-6">
            <p className="text-sm text-muted-foreground mb-2">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by order ID or customer..." className="pl-10" value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }} />
          </div>
          <Select value={statusFilter} onValueChange={v => { setStatusFilter(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No orders found</TableCell></TableRow>
            ) : paginated.map(order => (
              <TableRow key={order.id}>
                <TableCell>
                  <code className="text-sm">{order.id}</code>
                  <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                </TableCell>
                <TableCell><p className="font-medium">{order.customer}</p></TableCell>
                <TableCell>{order.items} items</TableCell>
                <TableCell>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                  {order.escrow && (
                    <div className="flex items-center gap-1 text-xs text-accent mt-1">
                      <Shield className="w-3 h-3" /> Escrow
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={statusBadge(order.status)}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline" className="gap-1" onClick={() => setViewOrder(order)}>
                        <Eye className="w-3.5 h-3.5" /> View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Order {viewOrder?.id}</DialogTitle></DialogHeader>
                      {viewOrder && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div><p className="text-muted-foreground">Customer</p><p className="font-medium">{viewOrder.customer}</p></div>
                            <div><p className="text-muted-foreground">Date</p><p className="font-medium">{viewOrder.date}</p></div>
                            <div><p className="text-muted-foreground">Items</p><p className="font-medium">{viewOrder.items}</p></div>
                            <div><p className="text-muted-foreground">Total</p><p className="font-bold">${viewOrder.total.toFixed(2)}</p></div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Current Status: <Badge variant="secondary" className={statusBadge(viewOrder.status)}>{viewOrder.status}</Badge></p>
                            <p className="text-sm text-muted-foreground mb-3">Update status:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {(['pending', 'processing', 'delivered', 'cancelled'] as OrderStatus[]).map(s => (
                                <Button key={s} size="sm" variant={viewOrder.status === s ? 'default' : 'outline'}
                                  onClick={() => updateStatus(viewOrder.id, s)} disabled={viewOrder.status === s}>
                                  {s === 'delivered' && <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                                  {s === 'processing' && <ShoppingBag className="w-3.5 h-3.5 mr-1" />}
                                  {s === 'pending' && <Clock className="w-3.5 h-3.5 mr-1" />}
                                  {s.charAt(0).toUpperCase() + s.slice(1)}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground">Page {page} of {totalPages} ({filtered.length} orders)</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage(p => p - 1)}><ChevronLeft className="w-4 h-4" /></Button>
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
