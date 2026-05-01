import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown,
  Eye,
  Download,
  FileText
} from 'lucide-react';
import { disputes } from '../../lib/data';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function ComplianceReports() {
  const [caseFilter, setCaseFilter] = useState('all');
  const [viewCase, setViewCase] = useState<typeof disputes[0] | null>(null);
  
  const fraudData = [
    { name: 'Resolved', value: 156, color: '#12B76A' },
    { name: 'Under Investigation', value: 12, color: '#F1C40F' },
    { name: 'False Alarms', value: 32, color: '#94A3B8' },
  ];

  const disputesByCategory = [
    { category: 'Item Quality', count: 45, percentage: 38 },
    { category: 'Delivery Issues', count: 32, percentage: 27 },
    { category: 'Payment Disputes', count: 24, percentage: 20 },
    { category: 'Other', count: 18, percentage: 15 },
  ];

  const activeDisputes = disputes.filter(d => d.status !== 'resolved');
  const filteredCases = activeDisputes.filter(d => caseFilter === 'all' || d.status === caseFilter);

  const downloadCSV = (name: string, rows: string[][]) => {
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `${name}.csv`; a.click();
    URL.revokeObjectURL(url);
    toast.success(`${name} downloaded successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Compliance & Reports</h1>
          <p className="text-muted-foreground">System-wide compliance monitoring and reporting</p>
        </div>
        <Button className="gap-2" onClick={() => downloadCSV('full_compliance_report', [
          ['Case ID', 'Type', 'Customer', 'Vendor', 'Amount', 'Status', 'Date'],
          ...activeDisputes.map(d => [d.id, 'Dispute', d.customer, d.vendor, d.amount.toFixed(2), d.status, d.date])
        ])}>
          <Download className="w-4 h-4" /> Export Full Report
        </Button>
      </div>

      {/* Compliance Score */}
      <Card className="p-6 bg-gradient-to-r from-success/10 to-success/5 border-success/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl mb-2">Platform Compliance Score</h3>
            <p className="text-muted-foreground mb-4">Overall system health and regulatory adherence</p>
            <div className="flex items-baseline gap-3">
              <p className="text-5xl font-bold text-success">98.7%</p>
              <Badge variant="secondary" className="bg-success/10 text-success">
                <TrendingDown className="w-3 h-3 mr-1 rotate-180" />
                +0.3%
              </Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1554224311-beee811f6d3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5tZW50JTIwY29tcGxpYW5jZSUyMHNoaWVsZHxlbnwxfHx8fDE3NDA3MDgzODR8MA&ixlib=rb-4.1.0&q=80&w=400"
              alt="Compliance"
              className="h-32 w-48 object-cover rounded-lg opacity-40"
            />
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">AML Compliance</p>
          <p className="text-2xl font-bold">100%</p>
          <p className="text-xs text-success mt-2">All checks passed</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">KYC Completion</p>
          <p className="text-2xl font-bold">94.2%</p>
          <p className="text-xs text-muted-foreground mt-2">Of active users</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Active Investigations</p>
          <p className="text-2xl font-bold">12</p>
          <p className="text-xs text-muted-foreground mt-2">Fraud cases</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Reports Generated</p>
          <p className="text-2xl font-bold">328</p>
          <p className="text-xs text-muted-foreground mt-2">This quarter</p>
        </Card>
      </div>

      {/* Fraud Detection */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-6">Fraud Detection Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fraudData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {fraudData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Total fraud alerts processed: 200 cases
          </p>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold mb-6">Dispute Categories</h3>
          <div className="space-y-4">
            {disputesByCategory.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{item.category}</span>
                  <span className="text-sm text-muted-foreground">{item.count} cases ({item.percentage}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Average dispute resolution time: 2.5 business days
          </p>
        </Card>
      </div>

      {/* Active Investigations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold">Active Investigations</h3>
          <Select value={caseFilter} onValueChange={setCaseFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cases</SelectItem>
              <SelectItem value="fraud">Fraud</SelectItem>
              <SelectItem value="aml">AML</SelectItem>
              <SelectItem value="dispute">Disputes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Parties Involved</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Opened</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-medium">{dispute.id}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                      Dispute
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{dispute.customer}</p>
                      <p className="text-xs text-muted-foreground">vs {dispute.vendor}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${dispute.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      dispute.status === 'open' ? 'bg-destructive/10 text-destructive' :
                      'bg-accent/10 text-accent'
                    }>
                      {dispute.status === 'open' ? 'Open' : 'Investigating'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(dispute.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2" onClick={() => setViewCase(dispute)}>
                          <Eye className="w-4 h-4" /> View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Investigation: {viewCase?.id}</DialogTitle></DialogHeader>
                        {viewCase && (
                          <div className="space-y-3 text-sm">
                            <div className="grid grid-cols-2 gap-3 p-4 bg-muted/30 rounded-lg">
                              <div><p className="text-muted-foreground">Customer</p><p className="font-medium">{viewCase.customer}</p></div>
                              <div><p className="text-muted-foreground">Vendor</p><p className="font-medium">{viewCase.vendor}</p></div>
                              <div><p className="text-muted-foreground">Amount</p><p className="font-bold">${viewCase.amount.toFixed(2)}</p></div>
                              <div><p className="text-muted-foreground">Status</p><Badge variant="secondary" className={viewCase.status === 'open' ? 'bg-destructive/10 text-destructive' : 'bg-accent/10 text-accent'}>{viewCase.status}</Badge></div>
                              <div className="col-span-2"><p className="text-muted-foreground">Date Opened</p><p className="font-medium">{new Date(viewCase.date).toLocaleDateString()}</p></div>
                            </div>
                            <Button className="w-full gap-2" variant="outline" onClick={() => { downloadCSV(`case_${viewCase.id}`, [['ID','Customer','Vendor','Amount','Status','Date'],[viewCase.id, viewCase.customer, viewCase.vendor, viewCase.amount.toFixed(2), viewCase.status, viewCase.date]]); }}>
                              <Download className="w-4 h-4" /> Export Case Report
                            </Button>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Regulatory Compliance Checklist */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Regulatory Compliance Checklist</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Data Protection Compliance</p>
                <p className="text-sm text-muted-foreground">POPIA & GDPR standards met</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Financial Reporting</p>
                <p className="text-sm text-muted-foreground">All transactions logged and auditable</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">AML/CFT Measures</p>
                <p className="text-sm text-muted-foreground">Automated screening active</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Consumer Protection</p>
                <p className="text-sm text-muted-foreground">Escrow system protecting buyers</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Tax Compliance</p>
                <p className="text-sm text-muted-foreground">Transaction records for ZIMRA</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-success/5 border border-success/20 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Security Standards</p>
                <p className="text-sm text-muted-foreground">ISO 27001 certified</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Report Generation */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Generate Custom Reports</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => downloadCSV('transaction_report', [['Date','Amount','Vendor','Status'],['2025-03-01','120.00','Harare Agro','completed'],['2025-03-02','45.00','Mbare Fresh','pending']])}>
            <FileText className="w-6 h-6" />
            <span>Transaction Report</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => downloadCSV('compliance_report', [['Metric','Value'],['AML Compliance','100%'],['KYC Completion','94.2%'],['Platform Uptime','99.8%'],['Fraud Reduction','87%']])}>
            <Shield className="w-6 h-6" />
            <span>Compliance Report</span>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => downloadCSV('fraud_analysis', [['Category','Count'],['Resolved','156'],['Under Investigation','12'],['False Alarms','32']])}>
            <AlertTriangle className="w-6 h-6" />
            <span>Fraud Analysis</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
