import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../components/ui/input-otp';
import { ArrowLeft, Smartphone } from 'lucide-react';

export default function OTPVerification() {
  const navigate = useNavigate();

  const handleVerify = () => {
    // Navigate to biometric prompt
    navigate('/biometric');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6 hover:text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Verify Your Phone</h1>
            <p className="text-muted-foreground">
              Enter the 6-digit code sent to<br />
              <span className="font-medium text-foreground">+263 77 123 4567</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            <Button onClick={handleVerify} className="w-full" size="lg">
              Verify & Continue
            </Button>

            <button className="text-sm text-muted-foreground hover:text-foreground">
              Didn't receive code? <span className="text-primary font-medium">Resend</span>
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
