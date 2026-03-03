import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Fingerprint, Shield, CheckCircle2 } from 'lucide-react';

export default function BiometricPrompt() {
  const navigate = useNavigate();

  const handleBiometricVerify = () => {
    // Simulate biometric verification and navigate to customer dashboard
    setTimeout(() => {
      navigate('/customer');
    }, 1500);
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

          <Button onClick={handleBiometricVerify} className="w-full" size="lg">
            Enable SentryID Protection
          </Button>

          <button 
            onClick={() => navigate('/customer')}
            className="w-full text-sm text-muted-foreground hover:text-foreground mt-4"
          >
            Skip for now
          </button>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          SentryID is Zimbabwe's digital identity verification system
        </p>
      </div>
    </div>
  );
}
