import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { Camera, QrCode, ShoppingBag, CreditCard, Check, Package, Zap } from 'lucide-react';
import { barcodeProducts } from '../../lib/extended-data';

export default function ScanAndShop() {
  const [scanning, setScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<typeof barcodeProducts[0] | null>(null);
  const [cart, setCart] = useState<Array<typeof barcodeProducts[0] & { quantity: number }>>([]);

  const handleScan = () => {
    setScanning(true);
    // Simulate barcode scan
    setTimeout(() => {
      setScannedProduct(barcodeProducts[0]);
      setScanning(false);
    }, 1500);
  };

  const addToCart = () => {
    if (scannedProduct) {
      const existing = cart.find(item => item.barcode === scannedProduct.barcode);
      if (existing) {
        setCart(cart.map(item => 
          item.barcode === scannedProduct.barcode 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, { ...scannedProduct, quantity: 1 }]);
      }
      setScannedProduct(null);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Scan & Shop</h1>
        <p className="text-muted-foreground">Skip the line - scan barcodes and pay instantly</p>
      </div>

      {/* Feature Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Instant Checkout Experience</h3>
              <p className="text-sm opacity-90">Scan products, pay with phone, walk out</p>
            </div>
          </div>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwc2hvcHBpbmclMjBtb2JpbGUlMjBwYXltZW50fGVufDF8fHx8MTc0MDcxMjUxMXww&ixlib=rb-4.1.0&q=80&w=400"
          alt="Scan Shop"
          className="absolute right-0 top-0 h-full w-1/3 object-cover opacity-10"
        />
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Scanner Interface */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Barcode Scanner</h3>
            
            {!scanning && !scannedProduct && (
              <div 
                className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:from-primary/20 hover:to-secondary/20 transition-all border-2 border-dashed border-primary/30"
                onClick={handleScan}
              >
                <QrCode className="w-24 h-24 text-primary mb-4" />
                <p className="font-medium text-lg mb-2">Tap to Scan Barcode</p>
                <p className="text-sm text-muted-foreground text-center px-6">
                  Point your camera at the product barcode
                </p>
              </div>
            )}

            {scanning && (
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex flex-col items-center justify-center">
                <div className="relative">
                  <Camera className="w-24 h-24 text-primary mb-4 animate-pulse" />
                  <div className="absolute inset-0 border-4 border-primary rounded-lg animate-pulse"></div>
                </div>
                <p className="font-medium text-lg">Scanning...</p>
                <p className="text-sm text-muted-foreground">Hold steady</p>
              </div>
            )}

            {scannedProduct && (
              <div className="space-y-4">
                <div className="aspect-square bg-muted rounded-xl flex items-center justify-center relative">
                  <Package className="w-24 h-24 text-muted-foreground" />
                  <Badge className="absolute top-4 right-4 bg-success text-white">
                    <Check className="w-3 h-3 mr-1" />
                    Scanned
                  </Badge>
                </div>
                
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{scannedProduct.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{scannedProduct.vendor}</p>
                      <Badge variant="secondary" className="text-xs">
                        Barcode: {scannedProduct.barcode}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ${scannedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="w-4 h-4 text-success" />
                    <span className="text-success font-medium">{scannedProduct.stock} in stock</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={addToCart} className="flex-1 bg-primary text-white">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" onClick={() => setScannedProduct(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                💡 Tip: Align the barcode within the camera frame for faster scanning
              </p>
            </div>
          </Card>
        </div>

        {/* Cart */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Your Cart</h3>
              <Badge className="bg-primary text-white">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </Badge>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Scan products to add them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (15%)</span>
                    <span className="font-medium">${(cartTotal * 0.15).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-bold text-primary">
                      ${(cartTotal * 1.15).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-primary text-white gap-2">
                  <CreditCard className="w-4 h-4" />
                  Pay Now
                </Button>

                <Button variant="outline" className="w-full" onClick={() => setCart([])}>
                  Clear Cart
                </Button>
              </div>
            )}
          </Card>

          {/* How it Works */}
          <Card className="p-6 bg-muted/30">
            <h4 className="font-medium mb-4 text-sm">How Scan & Shop Works</h4>
            <div className="space-y-3 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">1</span>
                </div>
                <p>Scan product barcodes as you shop in-store</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">2</span>
                </div>
                <p>Items automatically added to your cart with prices</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">3</span>
                </div>
                <p>Pay with mobile money or card - no checkout line</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">4</span>
                </div>
                <p>Show digital receipt at exit and walk out</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Benefits */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Why Use Scan & Shop?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Zap className="w-8 h-8 text-success" />
            </div>
            <h4 className="font-medium mb-2">5x Faster</h4>
            <p className="text-sm text-muted-foreground">
              No more waiting in long checkout queues
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-medium mb-2">100% Accurate</h4>
            <p className="text-sm text-muted-foreground">
              Automatic price checking, no surprises
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CreditCard className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="font-medium mb-2">Contactless</h4>
            <p className="text-sm text-muted-foreground">
              Safe, hygienic, touch-free shopping
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
