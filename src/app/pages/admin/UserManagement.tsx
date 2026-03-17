import { Ban, Search, Shield, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { adminListUsers } from '../../api/admin';
import type { AdminUserDTO } from '../../api/types';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUserDTO[]>([]);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { users: data, pagination } = await adminListUsers({ page: 0, size: 50, sort: 'id,desc' });
        if (!mounted) return;
        setUsers(data);
        setTotalCount(pagination.totalCount);
      } catch (err: any) {
        toast.error(err?.message || 'Failed to load users (admin)');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => {
      const fullName = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim();
      return (
        u.login?.toLowerCase().includes(q) ||
        (u.email ?? '').toLowerCase().includes(q) ||
        fullName.toLowerCase().includes(q)
      );
    });
  }, [query, users]);

  const displayTotal = totalCount ?? users.length;

  function userLabel(u: AdminUserDTO) {
    const name = `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim();
    return name || u.login;
  }

  function userType(u: AdminUserDTO) {
    const auth = u.authorities ?? [];
    if (auth.includes('ROLE_ADMIN')) return 'Admin';
    if (auth.includes('ROLE_AGENT')) return 'Agent';
    if (auth.includes('ROLE_VENDOR')) return 'Vendor';
    return 'User';
  }

  function trustScore(u: AdminUserDTO) {
    // Backend does not provide a trust score; derive a stable placeholder for UI
    return u.activated ? 90 : 60;
  }

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
          <p className="text-2xl font-bold">{displayTotal.toLocaleString()}</p>
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
            <Input
              type="search"
              placeholder="Search users by name, phone, or email..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  Loading users…
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const score = trustScore(user);
                return (
              <TableRow key={user.login}>
                <TableCell>
                  <div>
                    <p className="font-medium">{userLabel(user)}</p>
                    <p className="text-xs text-muted-foreground">Login: {user.login}</p>
                  </div>
                </TableCell>
                <TableCell>{user.login}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{userType(user)}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Shield className={`w-4 h-4 ${
                      score >= 90 ? 'text-success' :
                      score >= 70 ? 'text-accent' :
                      'text-muted-foreground'
                    }`} />
                    <span className="font-medium">{score}/100</span>
                  </div>
                </TableCell>
                <TableCell>
                  {user.activated ? (
                    <Badge variant="secondary" className="bg-success/10 text-success">Active</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" disabled>View</Button>
                    <Button size="sm" variant="ghost" className="text-destructive" disabled>
                      <Ban className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
