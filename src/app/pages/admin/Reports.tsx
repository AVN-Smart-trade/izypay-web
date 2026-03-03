import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { provinceData, systemStats } from '../../lib/data';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Platform-wide insights and export options</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export All Reports
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <Download className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-bold mb-2">Transaction Report</h3>
          <p className="text-sm text-muted-foreground mb-4">Complete transaction history with filters</p>
          <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <Download className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-bold mb-2">Revenue Analytics</h3>
          <p className="text-sm text-muted-foreground mb-4">Revenue breakdown by province & category</p>
          <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-accent" />
            </div>
            <Download className="w-5 h-5 text-muted-foreground" />
          </div>
          <h3 className="font-bold mb-2">Vendor Performance</h3>
          <p className="text-sm text-muted-foreground mb-4">Sales, ratings, and fulfillment metrics</p>
          <Button variant="outline" size="sm" className="w-full">Generate Report</Button>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-bold mb-6">Provincial Transaction Volume</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={provinceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="province" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="volume" fill="#006B3F" />
            <Bar dataKey="vendors" fill="#F1C40F" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold mb-6">Key Performance Indicators</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Financial Inclusion Rate</p>
            <p className="text-4xl font-bold text-primary mb-2">{systemStats.financialInclusion}%</p>
            <p className="text-xs text-muted-foreground">Target: 80% by Dec 2025</p>
          </div>
          <div className="p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Women-Owned Businesses</p>
            <p className="text-4xl font-bold text-success mb-2">{systemStats.womenOwnedBusinesses}%</p>
            <p className="text-xs text-muted-foreground">+5% from last quarter</p>
          </div>
          <div className="p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Youth Participation</p>
            <p className="text-4xl font-bold text-accent mb-2">{systemStats.youthParticipation}%</p>
            <p className="text-xs text-muted-foreground">Ages 18-35</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
