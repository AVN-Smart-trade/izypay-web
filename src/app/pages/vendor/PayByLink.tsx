import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Link2, Copy, Share2, MessageSquare, Calendar, DollarSign, Check, ExternalLink } from 'lucide-react';
import { paymentLinks } from '../../lib/extended-data';
import { toast } from 'sonner';

export default function PayByLink() {
  const [links, setLinks] = useState(paymentLinks);
  const [copied, setCopied] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [expiry, setExpiry] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(link);
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  const handleWhatsAppShare = (link: string, desc: string) => {
    const message = `Payment Request: ${desc}\n\nPlease pay using this secure link:\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSMSShare = (link: string, desc: string) => {
    window.open(`sms:?body=${encodeURIComponent(`Payment: ${desc} - ${link}`)}`);
  };

  const handleGenerate = () => {
    if (!amount || parseFloat(amount) <= 0) { toast.error('Enter a valid amount'); return; }
    if (!description.trim()) { toast.error('Enter a description'); return; }
    const id = `PL-${Date.now().toString().slice(-6)}`;
    const link = `https://pay.avnsmarttrade.zw/${id}`;
    setGeneratedLink(link);
    const newLink = {
      id, link, description, amount: parseFloat(amount), currency: 'USD',
      status: 'active' as const, clicks: 0,
      createdDate: new Date().toISOString().split('T')[0],
      expiryDate: expiry || new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
    };
    setLinks(prev => [newLink, ...prev]);
    toast.success(`Payment link ${id} created! Share it now.`);
  };

  const activeLinks = links.filter(l => l.status === 'active').length;
  const paidLinks = links.filter(l => l.status === 'paid').length;
  const collected = links.filter(l => l.status === 'paid').reduce((s, l) => s + l.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pay-by-Link Generator</h1>
        <p className="text-muted-foreground">Create secure payment links and share via WhatsApp or SMS</p>
      </div>

      {/* Feature Banner */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
            <Link2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Send Payment Requests Instantly</h3>
            <p className="text-muted-foreground">Generate links, share via messaging, get paid</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create Payment Link */}
        <Card className="p-6">
          <h3 className="font-bold mb-6">Create New Payment Link</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="amount" type="number" className="pl-9" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="e.g., Product payment, Invoice #12345"
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="expiry" type="date" className="pl-9" value={expiry} onChange={e => setExpiry(e.target.value)} />
              </div>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium mb-2">Link Preview</p>
              <div className="flex items-center gap-2 p-3 bg-white rounded border">
                <Link2 className="w-4 h-4 text-primary flex-shrink-0" />
                <code className="text-xs text-muted-foreground truncate">
                  {generatedLink || 'https://pay.avnsmarttrade.zw/PL-XXXXXX'}
                </code>
              </div>
            </div>

            <Button className="w-full bg-primary text-white" onClick={handleGenerate}>
              Generate Payment Link
            </Button>
          </div>
        </Card>

        {/* Quick Share Options */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-4">Quick Share Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleWhatsAppShare(generatedLink || links[0]?.link || '', description || 'Payment Request')}
              >
                <MessageSquare className="w-6 h-6 text-green-600" />
                <span className="text-sm">WhatsApp</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleSMSShare(generatedLink || links[0]?.link || '', description || 'Payment Request')}>
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <span className="text-sm">SMS</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2"
                onClick={() => handleCopy(generatedLink || links[0]?.link || '')}>
                <Copy className="w-6 h-6 text-primary" />
                <span className="text-sm">Copy Link</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col gap-2"
                onClick={() => { if (generatedLink) { window.open(generatedLink, '_blank'); } else { toast.info('Generate a link first'); } }}>
                <Share2 className="w-6 h-6 text-secondary" />
                <span className="text-sm">More Options</span>
              </Button>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <h4 className="font-medium mb-3 text-sm">How Pay-by-Link Works</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">1</span>
                </div>
                <p>Create a payment link with amount and description</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">2</span>
                </div>
                <p>Share link via WhatsApp, SMS, or social media</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">3</span>
                </div>
                <p>Customer clicks link and pays securely</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-primary font-bold text-xs">4</span>
                </div>
                <p>You get instant notification when paid</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="font-medium mb-3">Payment Link Stats</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{activeLinks}</p>
                <p className="text-xs text-muted-foreground">Active Links</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{paidLinks}</p>
                <p className="text-xs text-muted-foreground">Paid</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary">${collected.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">Collected</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Active Payment Links */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Your Payment Links</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Link ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
          {links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell className="font-medium">{link.id}</TableCell>
                  <TableCell>{link.description}</TableCell>
                  <TableCell className="font-medium">
                    ${link.amount.toFixed(2)} {link.currency}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={
                      link.status === 'paid' ? 'bg-success/10 text-success' :
                      link.status === 'active' ? 'bg-primary/10 text-primary' :
                      'bg-muted text-muted-foreground'
                    }>
                      {link.status === 'paid' && <Check className="w-3 h-3 mr-1" />}
                      {link.status === 'paid' ? 'Paid' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(link.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(link.expiryDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{link.clicks}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleCopy(link.link)}
                      >
                        {copied === link.link ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => window.open(link.link, '_blank')}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleWhatsAppShare(link.link, link.description)}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Benefits */}
      <Card className="p-6 bg-muted/30">
        <h3 className="font-bold mb-4">Benefits of Pay-by-Link</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-success" />
            </div>
            <div>
              <h4 className="font-medium mb-1">No App Required</h4>
              <p className="text-sm text-muted-foreground">
                Customers pay via browser - no downloads needed
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Link2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Share Anywhere</h4>
              <p className="text-sm text-muted-foreground">
                WhatsApp, SMS, email, social media - works everywhere
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium mb-1">Get Paid Fast</h4>
              <p className="text-sm text-muted-foreground">
                Instant payment notifications and settlement
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
