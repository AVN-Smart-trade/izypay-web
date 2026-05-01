import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { ShoppingCart, Package, Truck, CreditCard, ArrowRight, Trash2 } from 'lucide-react';
import { multiSupplierBasket } from '../../lib/extended-data';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'sonner';

export default function MultiSupplierBasket() {
  const navigate = useNavigate();
  type BasketItem = typeof multiSupplierBasket.items[0] & { quantity: number; subtotal: number };
  const [items, setItems] = useState<BasketItem[]>(multiSupplierBasket.items.map(i => ({ ...i })));

  const updateQty = (idx: number, delta: number) => {
    setItems(prev => prev.map((item, i) => {
      if (i !== idx) return item;
      const qty = Math.max(1, item.quantity + delta);
      return { ...item, quantity: qty, subtotal: qty * item.price };
    }));
  };

  const removeItem = (idx: number) => {
    setItems(prev => { const next = prev.filter((_, i) => i !== idx); toast.success('Item removed from basket'); return next; });
  };

  const supplierBreakdown = multiSupplierBasket.supplierBreakdown.map(s => ({
    ...s,
    amount: items.filter(i => i.supplierId === s.supplierId).reduce((sum, i) => sum + i.subtotal, 0),
    itemCount: items.filter(i => i.supplierId === s.supplierId).length,
  })).filter(s => s.itemCount > 0);

  const subtotal = items.reduce((s, i) => s + i.subtotal, 0);
  const delivery = 15;
  const platformFee = subtotal * 0.025;
  const grandTotal = subtotal + delivery + platformFee;

  const handleCheckout = () => {
    if (items.length === 0) { toast.error('Your basket is empty'); return; }
    toast.success(`Order placed! $${grandTotal.toFixed(2)} split across ${supplierBreakdown.length} supplier(s). Redirecting...`);
    setTimeout(() => navigate('/vendor'), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Multi-Supplier Basket</h1>
        <p className="text-muted-foreground">Your products from multiple suppliers in one order</p>
      </div>

      {/* Innovation Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Smart Multi-Supplier Checkout</h3>
            <p className="text-sm opacity-90">One payment, automatic distribution to suppliers</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Basket */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basket Items by Supplier */}
          {supplierBreakdown.map((supplier) => {
            const supplierItems = items.filter(item => item.supplierId === supplier.supplierId);
            return (
              <Card key={supplier.supplierId} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">{supplier.supplierName}</h3>
                      <p className="text-sm text-muted-foreground">{supplier.itemCount} item(s)</p>
                    </div>
                  </div>
                  <Badge className="bg-secondary text-white">${supplier.amount.toFixed(2)}</Badge>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  {supplierItems.map((item) => {
                    const globalIdx = items.indexOf(item);
                    return (
                      <div key={globalIdx} className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground mb-2">${item.price.toFixed(2)} × {item.quantity}</p>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => updateQty(globalIdx, -1)}>-</Button>
                              <span className="px-3 font-medium">{item.quantity}</span>
                              <Button variant="outline" size="sm" onClick={() => updateQty(globalIdx, 1)}>+</Button>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold mb-2">${item.subtotal.toFixed(2)}</p>
                          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => removeItem(globalIdx)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}

          {/* Continue Shopping */}
          <Button variant="outline" className="w-full" onClick={() => navigate('/vendor/supplier-marketplace')}>
            Continue Shopping from Suppliers
          </Button>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Order Summary</h3>
            
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium">${delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Platform Fee (2.5%)</span>
                  <span className="font-medium">${platformFee.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-xl text-primary">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

            <Button className="w-full bg-primary text-white gap-2" onClick={handleCheckout}>
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>

          {/* Supplier Breakdown Card */}
          <Card className="p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" />
              Supplier Distribution
            </h3>
            <div className="space-y-3">
              {supplierBreakdown.map((supplier, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{supplier.supplierName}</p>
                    <p className="text-xs text-muted-foreground">{supplier.itemCount} items</p>
                  </div>
                  <Badge variant="secondary">${supplier.amount.toFixed(2)}</Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Payment Info */}
          <Card className="p-6 bg-secondary/10 border-secondary/20">
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-2 text-sm">Smart Payment Distribution</h4>
                <p className="text-xs text-muted-foreground">
                  Your payment will be automatically split and sent to each supplier after delivery confirmation.
                </p>
              </div>
            </div>
          </Card>

          {/* Delivery Info */}
          <Card className="p-6">
            <h4 className="font-medium mb-3 text-sm">Delivery Information</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Estimated delivery: 2-5 business days</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span>Track each supplier's shipment separately</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* How it Works */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-bold mb-4">How Multi-Supplier Checkout Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">1</span>
            </div>
            <h4 className="font-medium mb-2">Add from Multiple Suppliers</h4>
            <p className="text-sm text-muted-foreground">
              Browse and add products from different suppliers to one basket
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">2</span>
            </div>
            <h4 className="font-medium mb-2">Single Checkout</h4>
            <p className="text-sm text-muted-foreground">
              Pay once - we handle the distribution automatically
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">3</span>
            </div>
            <h4 className="font-medium mb-2">Automatic Split</h4>
            <p className="text-sm text-muted-foreground">
              Each supplier gets paid directly after you confirm delivery
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
