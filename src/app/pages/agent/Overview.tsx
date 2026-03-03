import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Users, DollarSign, CheckCircle2, Clock, MapPin, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { zimbabweUsers } from '../../lib/data';

export default function AgentOverview() {
  const pendingKYC = [
    { id: 1, business: "Chitungwiza Groceries", owner: "Farai Madziva", location: "Chitungwiza", date: "2025-03-01" },
    { id: 2, business: "Norton Farm Supplies", owner: "Precious Nyoni", location: "Norton", date: "2025-03-02" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Field Agent Dashboard</h1>
        <p className="text-muted-foreground">Vendor onboarding and KYC management</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Vendors Onboarded</p>
          <p className="text-2xl font-bold">24</p>
          <p className="text-xs text-muted-foreground mt-2">This month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Commission Earned</p>
          <p className="text-2xl font-bold">$480.00</p>
          <p className="text-xs text-success mt-2">$20 per vendor</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Pending KYC</p>
          <p className="text-2xl font-bold">5</p>
          <p className="text-xs text-muted-foreground mt-2">Awaiting approval</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Approval Rate</p>
          <p className="text-2xl font-bold">96%</p>
          <p className="text-xs text-muted-foreground mt-2">23 of 24 approved</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Pending KYC Approvals</h3>
            <Badge variant="secondary" className="bg-accent/10 text-accent">5 Pending</Badge>
          </div>
          <div className="space-y-4">
            {pendingKYC.map((vendor) => (
              <div key={vendor.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold">{vendor.business}</p>
                    <p className="text-sm text-muted-foreground">{vendor.owner}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {vendor.location}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">View Documents</Button>
                  <Button size="sm" className="flex-1">Follow Up</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Recent Onboardings</h3>
            <Button size="sm" variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              New Vendor
            </Button>
          </div>
          <div className="space-y-4">
            {zimbabweUsers.vendors.slice(0, 4).map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">{vendor.business}</p>
                  <p className="text-sm text-muted-foreground">{vendor.location}</p>
                </div>
                <Badge variant="secondary" className={vendor.verified ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'}>
                  {vendor.verified ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                  {vendor.verified ? 'Verified' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Onboard More Vendors</h3>
            <p className="opacity-90 mb-4">Earn $20 commission for each verified vendor</p>
            <Button size="lg" variant="secondary">
              Start New Onboarding
            </Button>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1746189907392-c0f3a373d901?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZmllbGQlMjBhZ2VudCUyMGJ1c2luZXNzJTIwd29tYW4lMjB0YWJsZXR8ZW58MXx8fHwxNzcyNDk1ODc4fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Field Agent"
            className="h-32 w-48 object-cover rounded-lg opacity-30"
          />
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold mb-6">Vendor Performance Map</h3>
        <div className="bg-muted/50 rounded-lg h-80 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Interactive map showing vendor locations</p>
            <p className="text-sm text-muted-foreground">24 vendors across Harare & Bulawayo</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
