import { Bell, Package, DollarSign, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { notifications } from '../lib/data';

const notificationIcons = {
  order: Package,
  payment: DollarSign,
  alert: AlertTriangle,
  system: CheckCircle2,
};

export function NotificationCenter() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-destructive text-white">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-6">
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notificationIcons[notification.type as keyof typeof notificationIcons];
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-colors ${
                    !notification.read ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      notification.type === 'order' ? 'bg-primary/10' :
                      notification.type === 'payment' ? 'bg-success/10' :
                      notification.type === 'alert' ? 'bg-destructive/10' :
                      'bg-accent/10'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        notification.type === 'order' ? 'text-primary' :
                        notification.type === 'payment' ? 'text-success' :
                        notification.type === 'alert' ? 'text-destructive' :
                        'text-accent'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium text-sm">{notification.title}</p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button variant="outline" className="w-full">Mark All as Read</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
