import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  Search,
  Book,
  Video,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Send
} from 'lucide-react';
import { supportTickets } from '../../lib/data';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I create an account on AVN SmartTrade?',
          a: 'Click "Get Started" on the homepage, choose your account type (Customer or Vendor), complete the registration form with your details, verify your phone number via OTP, and set up biometric authentication for secure access.'
        },
        {
          q: 'What is SentryID verification?',
          a: 'SentryID is our digital identity verification system. It uses your National ID, proof of address, and biometric data to create a trusted profile. This helps build your trust score and enables secure transactions on the platform.'
        },
        {
          q: 'Which currencies are supported?',
          a: 'AVN SmartTrade supports both USD and ZIG (Zimbabwe Gold). You can view prices and make payments in either currency, with real-time conversion rates.'
        }
      ]
    },
    {
      category: 'Payments & Transactions',
      questions: [
        {
          q: 'How does the escrow system work?',
          a: 'When you make a purchase, your payment is held securely in escrow. Once you confirm delivery and satisfaction, the funds are released to the vendor. This protects both buyers and sellers.'
        },
        {
          q: 'What payment methods are accepted?',
          a: 'We accept mobile money (EcoCash, OneMoney), bank transfers, debit/credit cards (Mastercard, Visa), and wallet-to-wallet transfers within AVN SmartTrade.'
        },
        {
          q: 'How long does it take to receive payments?',
          a: 'Vendor payments are typically processed within 24 hours after successful delivery confirmation. Bank withdrawals take 1-3 business days.'
        }
      ]
    },
    {
      category: 'Disputes & Refunds',
      questions: [
        {
          q: 'How do I open a dispute?',
          a: 'Go to your transaction history, select the order, and click "Open Dispute". Provide details about the issue and upload any supporting evidence. Our team will investigate within 24 hours.'
        },
        {
          q: 'What is the refund process?',
          a: 'If a dispute is resolved in your favor, refunds are processed immediately to your AVN wallet. You can then withdraw to your bank account or use for future purchases.'
        }
      ]
    },
    {
      category: 'For Vendors',
      questions: [
        {
          q: 'How do I list products on the marketplace?',
          a: 'From your vendor dashboard, go to "Product Management", click "Add Product", fill in product details, upload photos, set pricing, and publish. Your products will be live immediately after review.'
        },
        {
          q: 'What commission does AVN SmartTrade charge?',
          a: 'We charge a 3.5% platform fee on each successful transaction. There are no monthly fees or listing charges.'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-destructive/10 text-destructive';
      case 'in_progress': return 'bg-accent/10 text-accent';
      case 'resolved': return 'bg-success/10 text-success';
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Help & Support</h1>
        <p className="text-muted-foreground">Find answers or get in touch with our support team</p>
      </div>

      {/* Search Bar */}
      <Card className="p-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search for help articles, FAQs, or guides..."
            className="pl-10 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>

      {/* Quick Contact Options */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-bold mb-2">Live Chat</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Chat with our support team in real-time
          </p>
          <Button variant="outline" className="w-full">Start Chat</Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-success" />
          </div>
          <h3 className="font-bold mb-2">Phone Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Call us: +263 77 100 2000
          </p>
          <Button variant="outline" className="w-full">Call Now</Button>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-bold mb-2">Email Support</h3>
          <p className="text-sm text-muted-foreground mb-4">
            support@avnsmarttrade.co.zw
          </p>
          <Button variant="outline" className="w-full">Send Email</Button>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="faq" className="space-y-6">
        <TabsList>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="create">Create Ticket</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq" className="space-y-6">
          {faqs.map((category, idx) => (
            <Card key={idx} className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Book className="w-5 h-5 text-primary" />
                {category.category}
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left">{item.q}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          ))}
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Your Support Tickets</h3>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <Card key={ticket.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium">{ticket.id}</p>
                        <Badge variant="secondary" className={getStatusColor(ticket.status)}>
                          {ticket.status === 'open' ? (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          ) : ticket.status === 'in_progress' ? (
                            <Clock className="w-3 h-3 mr-1" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          )}
                          {ticket.status === 'open' ? 'Open' : 
                           ticket.status === 'in_progress' ? 'In Progress' : 'Resolved'}
                        </Badge>
                        <Badge variant="secondary" className={getPriorityColor(ticket.priority)}>
                          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                        </Badge>
                      </div>
                      <p className="font-medium text-sm mb-1">{ticket.subject}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Type: {ticket.type}</span>
                        <span>•</span>
                        <span>Created: {new Date(ticket.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Create Ticket Tab */}
        <TabsContent value="create" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Create Support Ticket</h3>
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-2">
                <Label htmlFor="ticketType">Issue Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="payment">Payment Problem</SelectItem>
                    <SelectItem value="order">Order Issue</SelectItem>
                    <SelectItem value="verification">Verification Support</SelectItem>
                    <SelectItem value="general">General Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General question</SelectItem>
                    <SelectItem value="medium">Medium - Needs attention</SelectItem>
                    <SelectItem value="high">High - Urgent issue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please provide detailed information about your issue..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="orderId">Related Order ID (Optional)</Label>
                <Input id="orderId" placeholder="ORD-001234" />
              </div>

              <div className="space-y-2">
                <Label>Attachments (Optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button variant="outline" size="sm">Choose Files</Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Screenshots, documents, or logs (Max 5MB each)
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="gap-2">
                  <Send className="w-4 h-4" />
                  Submit Ticket
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold">Video Tutorials</h3>
              </div>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Getting Started with AVN SmartTrade
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  How to Create Your First Listing
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Managing Orders and Fulfillment
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Understanding Trust Scores
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Book className="w-5 h-5 text-success" />
                </div>
                <h3 className="font-bold">Documentation</h3>
              </div>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Platform User Guide (PDF)
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Vendor Handbook
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  API Documentation
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Security & Privacy Guide
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold">Guides & Articles</h3>
              </div>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Best Practices for Online Selling
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  How to Increase Your Trust Score
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Payment Methods Explained
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Dispute Resolution Tips
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold">Quick Links</h3>
              </div>
              <div className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  Terms of Service
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Privacy Policy
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Fee Structure
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  Contact Information
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Support Hours */}
      <Card className="p-6 bg-muted/50">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold mb-2">Support Hours</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Our support team is available:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Monday - Friday: 8:00 AM - 6:00 PM CAT</li>
              <li>• Saturday: 9:00 AM - 3:00 PM CAT</li>
              <li>• Sunday: Emergency support only</li>
              <li>• Average response time: 2-4 hours</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
