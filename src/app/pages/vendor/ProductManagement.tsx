import { useState, useMemo } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Label } from '../../components/ui/label';
import { Plus, Search, Edit, Trash2, Package, X, Check } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { zimbabweProducts } from '../../lib/data';
import { toast } from 'sonner';

type Product = {
  id: string; name: string; category: string; price: number; stock: number; status: 'active' | 'inactive';
};

const initial: Product[] = zimbabweProducts.map((p, i) => ({
  id: p.id ?? `P${i + 1}`,
  name: p.name,
  category: p.category,
  price: p.price,
  stock: p.stock,
  status: 'active',
}));

const BLANK: Omit<Product, 'id'> = { name: '', category: 'Vegetables', price: 0, stock: 0, status: 'active' };

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(initial);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(BLANK);

  const categories = useMemo(() => ['all', ...Array.from(new Set(products.map(p => p.category)))], [products]);

  const filtered = useMemo(() => products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCat;
  }), [products, search, categoryFilter]);

  const stats = useMemo(() => ({
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => p.stock > 0 && p.stock < 20).length,
    outOfStock: products.filter(p => p.stock === 0).length,
  }), [products]);

  const openAdd = () => { setForm(BLANK); setAddOpen(true); };

  const handleAdd = () => {
    if (!form.name.trim()) { toast.error('Product name is required'); return; }
    if (form.price <= 0) { toast.error('Price must be greater than 0'); return; }
    const newProduct: Product = { ...form, id: `P${Date.now()}` };
    setProducts(prev => [newProduct, ...prev]);
    setAddOpen(false);
    toast.success(`"${form.name}" added to your products`);
  };

  const openEdit = (p: Product) => { setEditTarget(p); setForm({ name: p.name, category: p.category, price: p.price, stock: p.stock, status: p.status }); };

  const handleEdit = () => {
    if (!editTarget) return;
    if (!form.name.trim()) { toast.error('Product name is required'); return; }
    setProducts(prev => prev.map(p => p.id === editTarget.id ? { ...p, ...form } : p));
    setEditTarget(null);
    toast.success(`"${form.name}" updated successfully`);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProducts(prev => prev.filter(p => p.id !== deleteTarget.id));
    toast.success(`"${deleteTarget.name}" removed from products`);
    setDeleteTarget(null);
  };

  const toggleStatus = (id: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== id) return p;
      const next = p.status === 'active' ? 'inactive' : 'active';
      toast.success(`${p.name} is now ${next}`);
      return { ...p, status: next };
    }));
  };

  const FormFields = () => (
    <div className="space-y-4">
      <div>
        <Label>Product Name</Label>
        <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Fresh Tomatoes 1kg" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Category</Label>
          <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {['Vegetables', 'Grains', 'Fruits', 'Pulses', 'Dairy', 'Other'].map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Status</Label>
          <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v as 'active' | 'inactive' }))}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Price (USD)</Label>
          <Input type="number" min={0} step={0.01} value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) || 0 }))} />
        </div>
        <div>
          <Label>Stock (units)</Label>
          <Input type="number" min={0} value={form.stock} onChange={e => setForm(f => ({ ...f, stock: parseInt(e.target.value) || 0 }))} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Product Management</h1>
          <p className="text-muted-foreground">Manage your inventory and product listings</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2" onClick={openAdd}>
              <Plus className="w-5 h-5" /> Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
            <FormFields />
            <div className="flex gap-3 mt-2">
              <Button variant="outline" className="flex-1" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleAdd}>Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Products', value: stats.total, color: '' },
          { label: 'Active', value: stats.active, color: 'text-success' },
          { label: 'Low Stock', value: stats.lowStock, color: 'text-destructive' },
          { label: 'Out of Stock', value: stats.outOfStock, color: '' },
        ].map(s => (
          <Card key={s.label} className="p-6">
            <p className="text-sm text-muted-foreground mb-2">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              {categories.map(c => <SelectItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p>No products found. Try a different search.</p>
          </div>
        ) : (
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
              {filtered.map(product => (
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
                  <TableCell><Badge variant="secondary">{product.category}</Badge></TableCell>
                  <TableCell><p className="font-bold">${product.price.toFixed(2)}</p></TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      product.stock === 0 ? 'bg-destructive/10 text-destructive' :
                      product.stock < 20 ? 'bg-accent/10 text-accent' :
                      'bg-success/10 text-success'
                    }>
                      {product.stock} units
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => toggleStatus(product.id)}>
                      <Badge variant="secondary" className={product.status === 'active' ? 'bg-success/10 text-success cursor-pointer' : 'bg-muted text-muted-foreground cursor-pointer'}>
                        {product.status === 'active' ? <Check className="w-3 h-3 mr-1 inline" /> : <X className="w-3 h-3 mr-1 inline" />}
                        {product.status}
                      </Badge>
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog open={editTarget?.id === product.id} onOpenChange={open => !open && setEditTarget(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost" onClick={() => openEdit(product)}><Edit className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
                          <FormFields />
                          <div className="flex gap-3 mt-2">
                            <Button variant="outline" className="flex-1" onClick={() => setEditTarget(null)}>Cancel</Button>
                            <Button className="flex-1" onClick={handleEdit}>Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={deleteTarget?.id === product.id} onOpenChange={open => !open && setDeleteTarget(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setDeleteTarget(product)}><Trash2 className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader><DialogTitle>Delete Product</DialogTitle></DialogHeader>
                          <p className="text-muted-foreground">Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.</p>
                          <div className="flex gap-3 mt-4">
                            <Button variant="outline" className="flex-1" onClick={() => setDeleteTarget(null)}>Cancel</Button>
                            <Button variant="destructive" className="flex-1" onClick={handleDelete}>Delete</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
