import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Fingerprint, Shield, CheckCircle2 } from 'lucide-react';
import { getAccount } from '../../api/account';
import { useState } from 'react';
import { toast } from 'sonner';

function getDashboardByRole(authorities: string[]): string {
  if (authorities.includes('ROLE_ADMIN')) return '/admin';
  if (authorities.includes('ROLE_VENDOR')) return '/vendor';
  if (authorities.includes('ROLE_AGENT')) return '/agent';
  if (authorities.includes('ROLE_GOV')) return '/government';
  // default: customer / ROLE_USER
  return '/customer';
}

export default function BiometricPrompt() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const redirectToDashboard = async () => {
    try {
      setLoading(true);
      const account = await getAccount();
      const authorities: string[] = Array.isArray(account.authorities)
        ? account.authorities
        : [];
      const dashboard = getDashboardByRole(authorities);
      navigate(dashboard);
    } catch {
      // If we can't fetch the account (token invalid), fall back to login
      toast.error('Session error. Please log in again.');
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricVerify = () => {
    setTimeout(() => {
      redirectToDashboard();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <Fingerprint className="w-10 h-10 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            </div>
            <h1 className="text-3xl font-bold mb-2">SentryID Verification</h1>
            <p className="text-muted-foreground">
              Complete biometric verification to secure your account
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Military-Grade Security</h4>
                <p className="text-sm text-muted-foreground">
                  Your biometric data is encrypted and stored locally on your device
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">One-Time Setup</h4>
                <p className="text-sm text-muted-foreground">
                  Future logins will be instant with fingerprint or face recognition
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleBiometricVerify}
            className="w-full"
            size="lg"
            disabled={loading}
          >
            {loading ? 'Redirecting…' : 'Enable SentryID Protection'}
          </Button>

          <button
            onClick={redirectToDashboard}
            disabled={loading}
            className="w-full text-sm text-muted-foreground hover:text-foreground mt-4 disabled:opacity-50"
          >
            {loading ? '…' : 'Skip for now'}
          </button>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          SentryID is Zimbabwe's digital identity verification system
        </p>
      </div>
    </div>
  );
}
