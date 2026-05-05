import { useState } from 'react';
import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  const deliveryFee = cart.length > 0 ? 2.0 : 0;
  const total = cartTotal + deliveryFee;

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
      </div>

      {cart.length === 0 ? (
        <Card className="p-12 text-center">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products from the marketplace to get started.</p>
          <Link to="/customer/marketplace">
            <Button>Browse Marketplace</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id} className="p-6">
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1759344114577-b6c32e4d68c8?w=200"
                    alt={item.product.name}
                    className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/96x96?text=Item'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold mb-1">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Merchant ID: {item.product.merchantId}</p>
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-medium w-6 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xl font-bold">{item.product.currency === 'USD' ? '$' : 'ZiG'} {(item.product.price * item.quantity).toFixed(2)}</p>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.product.id)}
                        >
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
                <span className="text-muted-foreground">Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
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
                <ShoppingCart className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
}
