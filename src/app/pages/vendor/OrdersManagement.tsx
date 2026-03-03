import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Shield, CheckCircle2, Clock, ShoppingBag } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { zimbabweOrders } from '../../lib/data';

export default function OrdersManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Orders Management</h1>
        <p className="text-muted-foreground">Track and fulfill customer orders</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Orders</p>
          <p className="text-2xl font-bold">156</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending</p>
          <p className="text-2xl font-bold text-accent">18</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Processing</p>
          <p className="text-2xl font-bold text-primary">6</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Delivered</p>
          <p className="text-2xl font-bold text-success">132</p>
        </Card>
      </div>

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
            {zimbabweOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <code className="text-sm">{order.id}</code>
                  <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{order.customer}</p>
                </TableCell>
                <TableCell>{order.items} items</TableCell>
                <TableCell>
                  <p className="font-bold">${order.total.toFixed(2)}</p>
                  {order.escrow && (
                    <div className="flex items-center gap-1 text-xs text-accent mt-1">
                      <Shield className="w-3 h-3" />
                      Escrow
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={
                    order.status === 'delivered' ? 'bg-success/10 text-success' :
                    order.status === 'pending' ? 'bg-accent/10 text-accent' :
                    'bg-primary/10 text-primary'
                  }>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" variant="outline">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
