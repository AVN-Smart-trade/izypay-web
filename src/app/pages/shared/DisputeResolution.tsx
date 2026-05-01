import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
  AlertCircle,
  MessageSquare,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  Send,
  Shield,
} from 'lucide-react';
import { disputes as initialDisputes } from '../../lib/data';
import { toast } from 'sonner';

export default function DisputeResolution() {
  const [disputes, setDisputes] = useState(initialDisputes);
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);
  const [newDisputeOpen, setNewDisputeOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-destructive/10 text-destructive';
      case 'investigating': return 'bg-accent/10 text-accent';
      case 'resolved': return 'bg-success/10 text-success';
      case 'closed': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/10 text-destructive';
      case 'medium': return 'bg-accent/10 text-accent';
      case 'low': return 'bg-success/10 text-success';
      default: return 'bg-muted';
    }
  };

  const handleSubmitDispute = () => {
    if (!orderId.trim()) { toast.error('Please enter an Order ID'); return; }
    if (!reason) { toast.error('Please select a reason'); return; }
    if (!description.trim()) { toast.error('Please describe the issue'); return; }
    const newDispute = {
      id: `DSP-00${disputes.length + 1}`,
      orderId,
      customer: 'Tendai Moyo',
      vendor: 'Unknown Vendor',
      amount: 0,
      reason,
      status: 'open' as const,
      date: new Date().toISOString().slice(0, 10),
      priority: 'medium' as const,
    };
    setDisputes(prev => [newDispute, ...prev]);
    toast.success(`Dispute ${newDispute.id} opened successfully. We'll review it within 24 hours.`);
    setOrderId('');
    setReason('');
    setDescription('');
    setNewDisputeOpen(false);
  };

  const handleResolveDispute = (disputeId: string) => {
    setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status: 'resolved' as const } : d));
    toast.success(`Dispute ${disputeId} has been marked as resolved.`);
  };

  const handleCloseDispute = (disputeId: string) => {
    setDisputes(prev => prev.map(d => d.id === disputeId ? { ...d, status: 'closed' as const } : d));
    toast.info(`Dispute ${disputeId} has been closed.`);
  };

  const handleSendReply = (disputeId: string) => {
    if (!replyMessage.trim()) { toast.error('Please type a message'); return; }
    toast.success('Reply sent to AVN support team');
    setReplyMessage('');
  };

  const activeDisputes = disputes.filter(d => d.status !== 'resolved' && d.status !== 'closed');
  const resolvedDisputes = disputes.filter(d => d.status === 'resolved');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dispute Resolution</h1>
          <p className="text-muted-foreground">Manage and resolve transaction disputes</p>
        </div>
        <Dialog open={newDisputeOpen} onOpenChange={setNewDisputeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <AlertCircle className="w-4 h-4" />
              Open New Dispute
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Open a New Dispute</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="ORD-001234"
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Dispute Reason</Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Item not received">Item not received</SelectItem>
                    <SelectItem value="Item not as described">Item not as described</SelectItem>
                    <SelectItem value="Item damaged">Item damaged</SelectItem>
                    <SelectItem value="Wrong item delivered">Wrong item delivered</SelectItem>
                    <SelectItem value="Wrong quantity">Wrong quantity</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue..."
                  rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Evidence (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toast.info('File upload opens here in production')}
                  >
                    Choose Files
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Photos, documents, or videos (Max 10MB each)
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setNewDisputeOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmitDispute}>Submit Dispute</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Open Disputes</p>
          <p className="text-2xl font-bold">{disputes.filter(d => d.status === 'open').length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Under Investigation</p>
          <p className="text-2xl font-bold">{disputes.filter(d => d.status === 'investigating').length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Resolved</p>
          <p className="text-2xl font-bold">{resolvedDisputes.length}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Avg Resolution Time</p>
          <p className="text-2xl font-bold">2.5 days</p>
        </Card>
      </div>

      {/* Disputes Table */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Disputes ({activeDisputes.length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({resolvedDisputes.length})</TabsTrigger>
          <TabsTrigger value="all">All ({disputes.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Active Disputes</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dispute ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Parties</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeDisputes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No active disputes. 🎉
                      </TableCell>
                    </TableRow>
                  ) : (
                    activeDisputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.id}</TableCell>
                        <TableCell>
                          <Button variant="link" className="p-0 h-auto text-primary">
                            {dispute.orderId}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{dispute.customer}</p>
                            <p className="text-xs text-muted-foreground">vs {dispute.vendor}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[180px]">
                          <p className="text-sm truncate">{dispute.reason}</p>
                        </TableCell>
                        <TableCell className="font-medium">
                          {dispute.amount > 0 ? `$${dispute.amount.toFixed(2)}` : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getPriorityColor(dispute.priority)}>
                            {dispute.priority.charAt(0).toUpperCase() + dispute.priority.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={getStatusColor(dispute.status)}>
                            {dispute.status === 'open' ? <AlertCircle className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                            {dispute.status === 'open' ? 'Open' : 'Investigating'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(dispute.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedDispute(dispute.id)}
                              >
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Dispute Details — {dispute.id}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6 mt-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                  <Card className="p-4">
                                    <h4 className="font-medium mb-3">Dispute Information</h4>
                                    <div className="space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Order ID:</span>
                                        <span className="font-medium">{dispute.orderId}</span>
                                      </div>
                                      {dispute.amount > 0 && (
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Amount:</span>
                                          <span className="font-medium">${dispute.amount.toFixed(2)}</span>
                                        </div>
                                      )}
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Date Opened:</span>
                                        <span className="font-medium">{new Date(dispute.date).toLocaleDateString()}</span>
                                      </div>
                                      <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Status:</span>
                                        <Badge variant="secondary" className={getStatusColor(dispute.status)}>
                                          {dispute.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </Card>

                                  <Card className="p-4">
                                    <h4 className="font-medium mb-3">Parties Involved</h4>
                                    <div className="space-y-3">
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">Customer</p>
                                        <p className="font-medium">{dispute.customer}</p>
                                      </div>
                                      <div>
                                        <p className="text-xs text-muted-foreground mb-1">Vendor</p>
                                        <p className="font-medium">{dispute.vendor}</p>
                                      </div>
                                    </div>
                                  </Card>
                                </div>

                                <Card className="p-4">
                                  <h4 className="font-medium mb-3">Dispute Reason</h4>
                                  <p className="text-sm text-muted-foreground">{dispute.reason}</p>
                                </Card>

                                <Card className="p-4">
                                  <h4 className="font-medium mb-4 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4" />
                                    Communication Thread
                                  </h4>
                                  <div className="space-y-4">
                                    <div className="p-3 bg-muted/50 rounded-lg">
                                      <div className="flex items-start gap-3 mb-2">
                                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs font-medium">
                                          {dispute.customer.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium text-sm">{dispute.customer}</p>
                                            <Badge variant="secondary" className="text-xs">Customer</Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground mb-1">
                                            {dispute.reason}. I have attached photos as evidence.
                                          </p>
                                          <p className="text-xs text-muted-foreground">{dispute.date} at 10:30 AM</p>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                                      <div className="flex items-start gap-3 mb-2">
                                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-medium">
                                          AVN
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium text-sm">AVN Support Team</p>
                                            <Badge variant="secondary" className="text-xs bg-accent/10 text-accent">System</Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground mb-1">
                                            We've received your dispute and are investigating. The vendor has been notified and funds are secured in escrow.
                                          </p>
                                          <p className="text-xs text-muted-foreground">{dispute.date} at 11:15 AM</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-4 pt-4 border-t">
                                    <div className="flex gap-3">
                                      <Textarea
                                        placeholder="Type your message..."
                                        rows={3}
                                        className="flex-1"
                                        value={replyMessage}
                                        onChange={e => setReplyMessage(e.target.value)}
                                      />
                                      <Button
                                        size="icon"
                                        className="flex-shrink-0"
                                        onClick={() => handleSendReply(dispute.id)}
                                      >
                                        <Send className="w-4 h-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </Card>

                                <Card className="p-4">
                                  <h4 className="font-medium mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    Evidence &amp; Documentation
                                  </h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {['Photo 1.jpg', 'Receipt.pdf'].map(file => (
                                      <div key={file} className="border rounded-lg p-3 text-center">
                                        <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                        <p className="text-xs font-medium mb-1">{file}</p>
                                        <Button
                                          variant="link"
                                          size="sm"
                                          className="p-0 h-auto text-xs"
                                          onClick={() => toast.info(`Viewing ${file}`)}
                                        >
                                          View
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </Card>

                                <div className="flex justify-end gap-3 pt-4 border-t">
                                  <Button
                                    variant="outline"
                                    className="gap-2"
                                    onClick={() => handleCloseDispute(dispute.id)}
                                  >
                                    <XCircle className="w-4 h-4" /> Close Dispute
                                  </Button>
                                  <Button
                                    className="gap-2"
                                    onClick={() => handleResolveDispute(dispute.id)}
                                  >
                                    <CheckCircle2 className="w-4 h-4" /> Resolve Dispute
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Resolved Disputes</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dispute ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Parties</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Resolution</TableHead>
                    <TableHead>Date Resolved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resolvedDisputes.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No resolved disputes yet.</TableCell>
                    </TableRow>
                  ) : (
                    resolvedDisputes.map((dispute) => (
                      <TableRow key={dispute.id}>
                        <TableCell className="font-medium">{dispute.id}</TableCell>
                        <TableCell>{dispute.orderId}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-sm font-medium">{dispute.customer}</p>
                            <p className="text-xs text-muted-foreground">vs {dispute.vendor}</p>
                          </div>
                        </TableCell>
                        <TableCell>{dispute.reason}</TableCell>
                        <TableCell className="font-medium">
                          {dispute.amount > 0 ? `$${dispute.amount.toFixed(2)}` : '—'}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-success/10 text-success">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Refund Issued
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(dispute.date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card className="p-6">
            <h3 className="font-bold mb-6">All Disputes</h3>
            <div className="space-y-3">
              {disputes.map(dispute => (
                <div key={dispute.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div>
                    <p className="font-medium">{dispute.id} — {dispute.orderId}</p>
                    <p className="text-sm text-muted-foreground">{dispute.reason}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {dispute.amount > 0 && <span className="font-bold">${dispute.amount.toFixed(2)}</span>}
                    <Badge variant="secondary" className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help & Guidelines */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold mb-2">Dispute Resolution Guidelines</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Average resolution time is 2-3 business days</li>
              <li>• Funds are held securely in escrow during investigation</li>
              <li>• Both parties will be notified of all updates</li>
              <li>• Provide clear evidence and communication for faster resolution</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
