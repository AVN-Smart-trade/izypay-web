import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-accent/5 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground text-lg">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button size="lg" className="w-full gap-2">
              <Home className="w-5 h-5" />
              Go to Homepage
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full gap-2"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Need help? Contact AVN SmartTrade support
        </p>
      </div>
    </div>
  );
}
