import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { ArrowLeft, User, Store, Briefcase } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'customer' | 'vendor' | 'agent'>('customer');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to OTP verification
    navigate('/otp-verify');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">AVN</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-muted-foreground">Join Zimbabwe's digital commerce platform</p>
          </div>

          <Tabs value={userType} onValueChange={(v) => setUserType(v as any)} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="customer" className="gap-2">
                <User className="w-4 h-4" />
                Customer
              </TabsTrigger>
              <TabsTrigger value="vendor" className="gap-2">
                <Store className="w-4 h-4" />
                Vendor
              </TabsTrigger>
              <TabsTrigger value="agent" className="gap-2">
                <Briefcase className="w-4 h-4" />
                Agent
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Tendai Moyo" required />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+263 77 123 4567" required />
            </div>

            {userType === 'vendor' && (
              <>
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" placeholder="Mbare Fresh Produce" required />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Mbare, Harare" required />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" placeholder="••••••••" required />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Verification
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </div>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Protected by SentryID biometric verification
        </p>
      </div>
    </div>
  );
}
