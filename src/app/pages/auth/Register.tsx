import { ArrowLeft, Briefcase, Store, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { register } from '../../api/account';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '../../components/ui/tabs';

export default function Register() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'customer' | 'vendor' | 'agent'>('customer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const trimmedName = fullName.trim();
    const parts = trimmedName.split(/\s+/).filter(Boolean);
    const firstName = parts[0] ?? '';
    const lastName = parts.slice(1).join(' ') || '';

    try {
      setSubmitting(true);
      await register({
        login: login.trim(),
        firstName,
        lastName,
        email: email.trim(),
        imageUrl: null,
        langKey: 'en',
        userType,   // tells the backend which role to assign (customer/vendor/agent)
        password,
      });
      toast.success('Registration successful. Check your email to activate your account.');
      navigate('/login');
    } catch (err: any) {
      toast.error(err?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
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
              <Input
                id="fullName"
                placeholder="Tendai Moyo"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div>
              <Label htmlFor="login">Phone / Username</Label>
              <Input
                id="login"
                type="text"
                placeholder="+263 77 123 4567"
                required
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
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
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the Terms of Service and Privacy Policy
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Create Account'}
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
