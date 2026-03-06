import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { DollarSign, Users, TrendingUp, PieChart as PieChartIcon, ArrowRight, Settings } from 'lucide-react';
import { revenueSplits } from '../../lib/extended-data';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function RevenueSplit() {
  const standardSplit = revenueSplits[0];
  
  const pieData = standardSplit.splits.map(split => ({
    name: split.party,
    value: split.amount,
    percentage: split.percentage
  }));

  const COLORS = ['#0F6F5C', '#C7A246', '#12B76A', '#3B82F6'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Revenue Split Management</h1>
        <p className="text-muted-foreground">Configure automatic payment distribution for transactions</p>
      </div>

      {/* Feature Banner */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Automatic Payment Distribution</h3>
            <p className="text-muted-foreground">One transaction, instant split to multiple parties</p>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Total Distributed</p>
          <p className="text-2xl font-bold">$45,280</p>
          <p className="text-xs text-success mt-2">This month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Your Earnings</p>
          <p className="text-2xl font-bold">$31,696</p>
          <p className="text-xs text-muted-foreground mt-2">70% of sales</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Split Parties</p>
          <p className="text-2xl font-bold">3</p>
          <p className="text-xs text-muted-foreground mt-2">Active recipients</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <PieChartIcon className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Transactions</p>
          <p className="text-2xl font-bold">1,284</p>
          <p className="text-xs text-muted-foreground mt-2">Auto-split applied</p>
        </Card>
      </div>

      {/* Active Split Configuration */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Active Split Configuration</h3>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="w-4 h-4" />
              Edit
            </Button>
          </div>

          <div className="space-y-4">
            {standardSplit.splits.map((split, idx) => (
              <div key={idx} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    >
                      {split.party.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{split.party}</p>
                      <p className="text-sm text-muted-foreground">Recipient</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-secondary text-white mb-1">{split.percentage}%</Badge>
                    <p className="text-xs text-muted-foreground">of total</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded">
                  <span className="text-sm text-muted-foreground">Amount per $100 sale</span>
                  <span className="font-bold">${split.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Total Distribution</span>
              <span className="text-xl font-bold text-primary">100%</span>
            </div>
            <p className="text-xs text-muted-foreground">
              All percentages must add up to 100%
            </p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-6">Payment Distribution Visualization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium mb-2">Example: $100 Transaction</p>
            <div className="space-y-2 text-sm">
              {standardSplit.splits.map((split, idx) => (
                <div key={idx} className="flex justify-between">
                  <span className="text-muted-foreground">{split.party}</span>
                  <span className="font-medium">${split.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Create New Split */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Create Custom Split Configuration</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Configuration Name</Label>
              <Input placeholder="e.g., Premium Partner Split" />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="font-medium">Add Recipients</h4>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label>Party Name</Label>
                  <Input placeholder="Vendor" />
                </div>
                <div>
                  <Label>Percentage</Label>
                  <div className="relative">
                    <Input type="number" placeholder="70" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label>Party Name</Label>
                  <Input placeholder="Supplier" />
                </div>
                <div>
                  <Label>Percentage</Label>
                  <div className="relative">
                    <Input type="number" placeholder="20" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <Label>Party Name</Label>
                  <Input placeholder="Agent" />
                </div>
                <div>
                  <Label>Percentage</Label>
                  <div className="relative">
                    <Input type="number" placeholder="10" />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full">
                + Add Another Party
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-secondary/10 border border-secondary/20 rounded-lg">
              <h4 className="font-medium mb-4">Split Preview</h4>
              <div className="space-y-3">
                <div className="flex justify-between p-3 bg-white rounded">
                  <span className="text-sm">Vendor (70%)</span>
                  <span className="font-bold">$70.00</span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded">
                  <span className="text-sm">Supplier (20%)</span>
                  <span className="font-bold">$20.00</span>
                </div>
                <div className="flex justify-between p-3 bg-white rounded">
                  <span className="text-sm">Agent (10%)</span>
                  <span className="font-bold">$10.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">$100.00</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary text-white gap-2">
              Save Configuration
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Payment Flow Diagram */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">How Payment Split Works</h3>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <p className="font-medium mb-1">Customer Pays</p>
            <Badge className="bg-primary text-white">$100</Badge>
          </div>
          
          <ArrowRight className="w-8 h-8 text-muted-foreground" />
          
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <PieChartIcon className="w-10 h-10 text-secondary" />
            </div>
            <p className="font-medium mb-1">Auto Split</p>
            <Badge variant="secondary">Instant</Badge>
          </div>
          
          <ArrowRight className="w-8 h-8 text-muted-foreground" />
          
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <DollarSign className="w-10 h-10 text-success" />
            </div>
            <div className="space-y-1">
              <div>
                <p className="text-xs text-muted-foreground">Vendor</p>
                <Badge className="bg-success text-white text-xs">$70</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Supplier</p>
                <Badge className="bg-success text-white text-xs">$20</Badge>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Agent</p>
                <Badge className="bg-success text-white text-xs">$10</Badge>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
