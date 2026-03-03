import { useState } from 'react';
import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  ShoppingCart,
  Store,
  CheckCircle2
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { zimbabweProducts, zimbabweUsers } from '../../lib/data';

export default function Marketplace() {
  const [cartCount, setCartCount] = useState(2);

  const productImages: Record<string, string> = {
    'market-vegetables': 'https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZnJlc2glMjB2ZWdldGFibGVzJTIwbWFya2V0JTIwcHJvZHVjZXxlbnwxfHx8fDE3NzI0OTU2OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'grains': 'https://images.unsplash.com/photo-1701326786998-3688beceadda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWl6ZSUyMG1lYWwlMjBjb3JuJTIwZ3JhaW5zJTIwc2Fja3xlbnwxfHx8fDE3NzI0OTU2OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'cooking-oil': 'https://images.unsplash.com/photo-1757801333069-f7b3cabaec4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwb2lsJTIwYm90dGxlcyUyMGdyb2Nlcnl8ZW58MXx8fHwxNzcyNDk1Njk5fDA&ixlib=rb-4.1.0&q=80&w=1080'
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">Browse verified vendors across Zimbabwe</p>
        </div>
        <Link to="/customer/cart">
          <Button size="lg" className="gap-2 relative">
            <ShoppingCart className="w-5 h-5" />
            Cart
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center p-0 bg-accent text-accent-foreground">
                {cartCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search products or vendors..." 
              className="pl-10"
            />
          </div>
          <Select defaultValue="all-categories">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="groceries">Groceries</SelectItem>
              <SelectItem value="pulses">Pulses</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-locations">
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-locations">All Locations</SelectItem>
              <SelectItem value="harare">Harare</SelectItem>
              <SelectItem value="bulawayo">Bulawayo</SelectItem>
              <SelectItem value="mutare">Mutare</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Featured Vendors */}
      <div>
        <h2 className="text-xl font-bold mb-4">Featured Vendors</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {zimbabweUsers.vendors.slice(0, 3).map((vendor) => (
            <Card key={vendor.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{vendor.business}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {vendor.location}
                    </div>
                  </div>
                </div>
                {vendor.verified && (
                  <Badge variant="secondary" className="bg-success/10 text-success gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(124 reviews)</span>
              </div>
              <Button variant="outline" className="w-full">View Products</Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Available Products</h2>
          <Button variant="ghost" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {zimbabweProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
              <div className="aspect-square bg-muted relative overflow-hidden">
                <img 
                  src={productImages[product.image] || productImages['market-vegetables']}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <Badge className="absolute top-2 right-2 bg-white text-foreground">
                  In Stock: {product.stock}
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.vendor}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Harare</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Per unit</p>
                  </div>
                  <Button size="sm" onClick={addToCart} className="gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Products
        </Button>
      </div>
    </div>
  );
}
