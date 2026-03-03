import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export default function VendorApprovals() {
  const pending = [
    { id: 1, business: "Gweru Wholesale", owner: "Simba Chauke", location: "Gweru", submitted: "2025-03-01", docs: 4 },
    { id: 2, business: "Masvingo Traders", owner: "Ruvimbo Mhaka", location: "Masvingo", submitted: "2025-03-02", docs: 3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Vendor Approvals</h1>
        <p className="text-muted-foreground">Review and approve vendor KYC submissions</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Pending Review</p>
          <p className="text-2xl font-bold text-accent">8</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Approved Today</p>
          <p className="text-2xl font-bold text-success">12</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Rejected</p>
          <p className="text-2xl font-bold text-destructive">3</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Avg. Review Time</p>
          <p className="text-2xl font-bold">2.5h</p>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Business Name</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Documents</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pending.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell>
                  <p className="font-medium">{vendor.business}</p>
                </TableCell>
                <TableCell>{vendor.owner}</TableCell>
                <TableCell>{vendor.location}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="gap-1">
                    <FileText className="w-3 h-3" />
                    {vendor.docs} docs
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{vendor.submitted}</p>
                  <Badge variant="secondary" className="bg-accent/10 text-accent mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Review</Button>
                    <Button size="sm" className="bg-success hover:bg-success/90">
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive">
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
