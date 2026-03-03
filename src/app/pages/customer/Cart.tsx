import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';

export default function Cart() {
  const cartItems = [
    { id: 1, name: "Tomatoes (1kg)", vendor: "Mbare Fresh Produce", price: 2.5, quantity: 3, image: "https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8" },
    { id: 2, name: "Maize Meal (10kg)", vendor: "Harare Agro Supplies", price: 8.5, quantity: 1, image: "https://images.unsplash.com/photo-1701326786998-3688beceadda" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 2.00;
  const total = subtotal + deliveryFee;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id} className="p-6">
              <div className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{item.vendor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button size="icon" variant="ghost" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 h-fit sticky top-24">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link to="/customer/checkout">
            <Button size="lg" className="w-full gap-2">
              Proceed to Checkout <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/customer/marketplace">
            <Button variant="outline" className="w-full mt-3">
              Continue Shopping
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
