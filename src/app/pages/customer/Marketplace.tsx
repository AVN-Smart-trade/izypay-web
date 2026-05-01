import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router';
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
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { zimbabweProducts, zimbabweUsers } from '../../lib/data';
import { toast } from 'sonner';

const productImages: Record<string, string> = {
  'market-vegetables': 'https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8?w=400',
  'grains': 'https://images.unsplash.com/photo-1701326786998-3688beceadda?w=400',
  'cooking-oil': 'https://images.unsplash.com/photo-1757801333069-f7b3cabaec4a?w=400',
  'beans': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
  'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
  'onions': 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400',
};

export default function Marketplace() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-categories');
  const [selectedLocation, setSelectedLocation] = useState('all-locations');
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());

  const filteredProducts = useMemo(() => {
    return zimbabweProducts.filter(product => {
      const matchesSearch =
        searchQuery === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all-categories' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const addToCart = (product: typeof zimbabweProducts[0]) => {
    setCartCount(prev => prev + 1);
    setAddedItems(prev => new Set(prev).add(product.id));
    toast.success(`"${product.name}" added to cart!`, {
      action: {
        label: 'View Cart',
        onClick: () => navigate('/customer/cart'),
      },
    });
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
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
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
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
        {(searchQuery || selectedCategory !== 'all-categories') && (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" />
            <span>Showing {filteredProducts.length} of {zimbabweProducts.length} products</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-primary"
              onClick={() => { setSearchQuery(''); setSelectedCategory('all-categories'); }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </Card>

      {/* Featured Vendors */}
      <div>
        <h2 className="text-xl font-bold mb-4">Featured Vendors</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {zimbabweUsers.vendors.slice(0, 3).map((vendor) => (
            <Card key={vendor.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
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
              <Button
                variant="outline"
                className="w-full"
                onClick={() => toast.info(`Browsing ${vendor.business} products...`)}
              >
                View Products
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Available Products</h2>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => toast.info('Advanced filters coming soon!')}
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {filteredProducts.length === 0 ? (
          <Card className="p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-medium text-lg mb-2">No products found</p>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all-categories'); }}>
              Clear Filters
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={productImages[product.image] || productImages['market-vegetables']}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x300?text=Product'; }}
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
                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      className={`gap-2 transition-all ${addedItems.has(product.id) ? 'bg-success text-white' : ''}`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {addedItems.has(product.id) ? 'Added!' : 'Add'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg" onClick={() => toast.info('Loading more products...')}>
          Load More Products
        </Button>
      </div>
    </div>
  );
}
