import { Link } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { CheckCircle2, Download, Home, Package } from 'lucide-react';

export default function PaymentSuccess() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <CheckCircle2 className="w-10 h-10 text-success" />
          <div className="absolute inset-0 bg-success/20 rounded-full animate-ping" />
        </div>

        <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been placed successfully
        </p>

        <div className="bg-muted/50 rounded-lg p-6 mb-6 space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-mono font-medium">TXN-2025-001239</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount Paid</span>
            <span className="font-bold">$17.85 USD</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-medium">AVN Wallet</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="text-success font-medium">Completed</span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg mb-6 text-left">
          <Package className="w-5 h-5 text-accent mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent mb-1">Escrow Protection Active</p>
            <p className="text-muted-foreground">
              Your payment is held securely. Release funds after receiving your order.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full gap-2">
            <Download className="w-4 h-4" />
            Download Receipt
          </Button>
          <Link to="/customer/transactions">
            <Button variant="outline" className="w-full gap-2">
              <Package className="w-4 h-4" />
              Track Order
            </Button>
          </Link>
          <Link to="/customer">
            <Button className="w-full gap-2">
              <Home className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
