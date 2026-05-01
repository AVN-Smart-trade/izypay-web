import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Store, Search, Star, MapPin, Package, TrendingUp, ShoppingCart } from 'lucide-react';
import { suppliers } from '../../lib/extended-data';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useMemo } from 'react';

export default function SupplierMarketplace() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [basket, setBasket] = useState<string[]>([]);

  const filteredSuppliers = useMemo(() => suppliers.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = categoryFilter === 'all' || s.category.toLowerCase().includes(categoryFilter);
    return matchSearch && matchCat;
  }), [suppliers, searchQuery, categoryFilter]);

  const handleAddToBasket = (supplierId: string, name: string) => {
    if (!basket.includes(supplierId)) {
      setBasket(prev => [...prev, supplierId]);
      toast.success(`${name} added to your supplier basket`);
    } else {
      toast.info(`${name} is already in your basket`);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Supplier Marketplace</h1>
        <p className="text-muted-foreground">Browse and source products from verified wholesale suppliers</p>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search suppliers or products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="food">Food & Beverages</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="general">General Goods</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Marketplace Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Store className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Verified Suppliers</p>
          <p className="text-2xl font-bold">{suppliers.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Total Products</p>
          <p className="text-2xl font-bold">745</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Avg Rating</p>
          <p className="text-2xl font-bold">4.8</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Your Basket</p>
          <p className="text-2xl font-bold">{basket.length} supplier{basket.length !== 1 ? 's' : ''}</p>
        </Card>
      </div>

      {/* Featured Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">🎉 Multi-Supplier Ordering Now Available!</h3>
            <p className="text-muted-foreground mb-4">
              Add products from multiple suppliers to one basket and checkout once
            </p>
            <Button className="bg-primary text-white" onClick={() => navigate('/vendor/multi-supplier-basket')}>View Your Basket</Button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd2hvbGVzYWxlJTIwbWFya2V0JTIwYnVzaW5lc3N8ZW58MXx8fHwxNzQwNzExOTMzfDA&ixlib=rb-4.1.0&q=80&w=400"
            alt="Marketplace"
            className="hidden lg:block h-32 w-48 object-cover rounded-lg"
          />
        </div>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSuppliers.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-muted-foreground">
            <Store className="w-8 h-8 mx-auto mb-2 opacity-40" />
            <p>No suppliers found for your search</p>
          </div>
        ) : filteredSuppliers.map((supplier) => (
          <Card key={supplier.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                <Store className="w-8 h-8 text-primary" />
              </div>
              {supplier.verified && (
                <Badge className="bg-success text-white">
                  ✓ Verified
                </Badge>
              )}
            </div>

            <h3 className="font-bold text-lg mb-2">{supplier.name}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {supplier.location}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-4 h-4 text-secondary fill-secondary" />
                <span className="font-medium">{supplier.rating}</span>
                <span className="text-muted-foreground">Rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4" />
                {supplier.productsCount} products
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-4">
              <div className="p-2 bg-muted/50 rounded">
                <p className="text-muted-foreground">Min Order</p>
                <p className="font-medium">${supplier.minOrder}</p>
              </div>
              <div className="p-2 bg-muted/50 rounded">
                <p className="text-muted-foreground">Delivery</p>
                <p className="font-medium">{supplier.deliveryDays}</p>
              </div>
            </div>

            <Badge variant="secondary" className="w-full justify-center mb-3">
              {supplier.category}
            </Badge>

            <Button className="w-full" onClick={() => handleAddToBasket(supplier.id, supplier.name)}>
              {basket.includes(supplier.id) ? '✓ In Basket' : 'Browse Products'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Info Banner */}
      <Card className="p-6 bg-muted/30">
        <div className="flex items-start gap-3">
          <Store className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold mb-2">How Supplier Marketplace Works</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Browse verified wholesale suppliers across Zimbabwe</li>
              <li>• Add products from multiple suppliers to your basket</li>
              <li>• Checkout once - we handle distribution automatically</li>
              <li>• Track deliveries from all suppliers in one dashboard</li>
              <li>• Benefit from bulk pricing and wholesale rates</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
