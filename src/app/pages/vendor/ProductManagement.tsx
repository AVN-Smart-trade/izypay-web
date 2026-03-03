import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { zimbabweProducts } from '../../lib/data';

export default function ProductManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground">Manage your inventory and product listings</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Products</p>
          <p className="text-2xl font-bold">42</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Active</p>
          <p className="text-2xl font-bold text-success">38</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Low Stock</p>
          <p className="text-2xl font-bold text-destructive">5</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Out of Stock</p>
          <p className="text-2xl font-bold">2</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-10" />
          </div>
          <Button variant="outline">Filters</Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zimbabweProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">ID: #{product.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{product.category}</Badge>
                </TableCell>
                <TableCell>
                  <p className="font-bold">${product.price.toFixed(2)}</p>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={
                    product.stock < 20 ? 'bg-destructive/10 text-destructive' :
                    product.stock < 50 ? 'bg-accent/10 text-accent' :
                    'bg-success/10 text-success'
                  }>
                    {product.stock} units
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-success/10 text-success">
                    Active
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-destructive">
                      <Trash2 className="w-4 h-4" />
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
