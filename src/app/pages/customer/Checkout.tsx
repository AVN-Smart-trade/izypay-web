import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Shield, Wallet, CreditCard, Smartphone, QrCode } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [escrowEnabled, setEscrowEnabled] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('wallet');

  const handleCheckout = () => {
    navigate('/customer/payment-success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase securely</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Information */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Delivery Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Tendai Moyo" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+263 77 123 4567" />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Input id="address" placeholder="123 Main Street, Harare" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="Harare" />
                </div>
                <div>
                  <Label htmlFor="province">Province</Label>
                  <Input id="province" defaultValue="Harare" />
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Method */}
          <Card className="p-6">
            <h3 className="font-bold mb-4">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">AVN Wallet</p>
                      <p className="text-sm text-muted-foreground">Balance: $245.50</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">Mobile Money</p>
                      <p className="text-sm text-muted-foreground">EcoCash, OneMoney</p>
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Debit/Credit Card</p>
                      <p className="text-sm text-muted-foreground">Visa, Mastercard</p>
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </Card>

          {/* Escrow Protection */}
          <Card className="p-6 border-accent">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">Escrow Protection</h4>
                  <Switch checked={escrowEnabled} onCheckedChange={setEscrowEnabled} />
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Your payment will be held securely until you confirm receipt of goods. 
                  Protects both buyers and sellers.
                </p>
                <p className="text-xs text-accent font-medium">
                  Recommended for all transactions above $10
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Summary */}
        <Card className="p-6 h-fit sticky top-24">
          <h3 className="font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal (2 items)</span>
              <span className="font-medium">$15.50</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">$2.00</span>
            </div>
            {escrowEnabled && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Escrow Fee</span>
                <span className="font-medium">$0.35</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl">${escrowEnabled ? '17.85' : '17.50'}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button size="lg" className="w-full" onClick={handleCheckout}>
              Complete Payment
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3 h-3" />
              <span>Secured by AVN SmartTrade</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
