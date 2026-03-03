import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Users, Search, Shield, Ban } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { zimbabweUsers } from '../../lib/data';

export default function UserManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage customer and vendor accounts</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Total Users</p>
          <p className="text-2xl font-bold">24,567</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Customers</p>
          <p className="text-2xl font-bold">20,725</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Vendors</p>
          <p className="text-2xl font-bold">3,842</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Suspended</p>
          <p className="text-2xl font-bold text-destructive">8</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="search" placeholder="Search users by name, phone, or email..." className="pl-10" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Trust Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zimbabweUsers.customers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">ID: #{user.id}</p>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary">Customer</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${
                      user.trustScore >= 90 ? 'text-success' :
                      user.trustScore >= 70 ? 'text-accent' :
                      'text-muted-foreground'
                    }`} />
                    <span className="font-medium">{user.trustScore}/100</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">View</Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Ban className="w-4 h-4" />
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
