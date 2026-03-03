import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { MapPin, Users, TrendingUp, Target, Award } from 'lucide-react';
import { agentTerritories } from '../../lib/data';

export default function TerritoryManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Territory Management</h1>
        <p className="text-muted-foreground">Manage your assigned territories and track performance</p>
      </div>

      {/* Territory Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Total Territories</p>
          <p className="text-2xl font-bold">2</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Active Vendors</p>
          <p className="text-2xl font-bold">210</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Target Achievement</p>
          <p className="text-2xl font-bold">70%</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">This Month Rank</p>
          <p className="text-2xl font-bold">#3</p>
        </Card>
      </div>

      {/* Territory Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        {agentTerritories.map((territory, idx) => (
          <Card key={idx} className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl mb-1">{territory.province}</h3>
                <p className="text-sm text-muted-foreground">
                  {territory.districts.length} districts assigned
                </p>
              </div>
              <Badge variant="secondary" className={
                territory.activeVendors >= territory.target ? 
                'bg-success/10 text-success' : 
                'bg-accent/10 text-accent'
              }>
                {((territory.activeVendors / territory.target) * 100).toFixed(0)}% Complete
              </Badge>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Vendor Target Progress</span>
                <span className="text-sm font-medium">
                  {territory.activeVendors} / {territory.target}
                </span>
              </div>
              <Progress 
                value={(territory.activeVendors / territory.target) * 100} 
                className="h-2"
              />
            </div>

            {/* Districts */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-medium">Assigned Districts:</p>
              <div className="flex flex-wrap gap-2">
                {territory.districts.map((district, dIdx) => (
                  <Badge key={dIdx} variant="secondary" className="bg-muted">
                    {district}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">View Map</Button>
              <Button className="flex-1">View Vendors</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* District Performance Table */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">District Performance Breakdown</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>District</TableHead>
                <TableHead>Province</TableHead>
                <TableHead>Active Vendors</TableHead>
                <TableHead>This Month</TableHead>
                <TableHead>Growth</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentTerritories.flatMap((territory) => 
                territory.districts.slice(0, 2).map((district, idx) => {
                  const vendorCount = Math.floor(Math.random() * 40 + 20);
                  const growth = Math.floor(Math.random() * 30 + 5);
                  return (
                    <TableRow key={`${territory.province}-${idx}`}>
                      <TableCell className="font-medium">{district}</TableCell>
                      <TableCell>{territory.province}</TableCell>
                      <TableCell>{vendorCount}</TableCell>
                      <TableCell>+{Math.floor(Math.random() * 8 + 2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success" />
                          <span className="text-success">+{growth}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={
                          vendorCount > 30 ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                        }>
                          {vendorCount > 30 ? 'On Track' : 'Needs Focus'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Agent Leaderboard (National)</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center font-bold text-white">
                1
              </div>
              <div>
                <p className="font-medium">Tatenda Sibanda</p>
                <p className="text-sm text-muted-foreground">Manicaland</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">256 vendors</p>
              <p className="text-sm text-muted-foreground">$5,120 commission</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Chipo Mutasa</p>
                <p className="text-sm text-muted-foreground">Bulawayo</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">234 vendors</p>
              <p className="text-sm text-muted-foreground">$4,680 commission</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-primary/5 border-2 border-primary rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold text-white">
                3
              </div>
              <div>
                <p className="font-medium">Blessing Ncube (You)</p>
                <p className="text-sm text-muted-foreground">Harare & Bulawayo</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold">210 vendors</p>
              <p className="text-sm text-muted-foreground">$4,200 commission</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
