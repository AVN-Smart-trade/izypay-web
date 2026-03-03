import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Separator } from '../../components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Shield, 
  Bell, 
  Lock,
  Smartphone,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { kycDocuments } from '../../lib/data';

export default function Settings() {
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="kyc">KYC & Verification</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Tendai Moyo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input id="email" className="pl-9" defaultValue="tendai.moyo@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input id="phone" className="pl-9" defaultValue="+263 77 123 4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input id="location" className="pl-9" defaultValue="Harare, Zimbabwe" />
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Business Information
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" defaultValue="Mbare Fresh Produce" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input id="businessType" defaultValue="Fresh Produce Vendor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number</Label>
                <Input id="registrationNumber" defaultValue="ZW-BP-2024-001234" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxNumber">Tax ID Number</Label>
                <Input id="taxNumber" defaultValue="TAX-7712345678" />
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Update Business Info</Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h3>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button>Update Password</Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Smartphone className="w-5 h-5" />
              Biometric Authentication
            </h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium mb-1">Enable Biometric Login</p>
                <p className="text-sm text-muted-foreground">
                  Use fingerprint or face recognition for quick and secure access
                </p>
              </div>
              <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
            </div>
            {biometricEnabled && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-success mb-1">Biometric authentication active</p>
                  <p className="text-sm text-muted-foreground">
                    Last verified: March 3, 2025 at 09:45 AM
                  </p>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Two-Factor Authentication (2FA)
            </h3>
            <div className="p-4 bg-muted/50 rounded-lg mb-4">
              <p className="font-medium mb-2">SMS Authentication</p>
              <p className="text-sm text-muted-foreground mb-4">
                Receive a verification code via SMS when logging in from a new device
              </p>
              <Badge variant="secondary" className="bg-success/10 text-success">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            <Button variant="outline">Manage 2FA Settings</Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-6">Active Sessions</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg flex items-start justify-between">
                <div>
                  <p className="font-medium mb-1">Chrome on Windows</p>
                  <p className="text-sm text-muted-foreground">Harare, Zimbabwe • Current session</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: Just now</p>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success">Current</Badge>
              </div>
              <div className="p-4 border rounded-lg flex items-start justify-between">
                <div>
                  <p className="font-medium mb-1">Mobile App on Android</p>
                  <p className="text-sm text-muted-foreground">Harare, Zimbabwe</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">Revoke</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* KYC Tab */}
        <TabsContent value="kyc" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold mb-1">SentryID Verification Status</h3>
                <p className="text-sm text-muted-foreground">Complete your verification to unlock full platform features</p>
              </div>
              <Badge className="bg-primary text-white">
                Trust Score: 92
              </Badge>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-success/5 border border-success/20 rounded-lg text-center">
                <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="font-medium mb-1">Identity Verified</p>
                <p className="text-xs text-muted-foreground">National ID confirmed</p>
              </div>
              <div className="p-4 bg-success/5 border border-success/20 rounded-lg text-center">
                <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="font-medium mb-1">Address Verified</p>
                <p className="text-xs text-muted-foreground">Proof of address approved</p>
              </div>
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg text-center">
                <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                <p className="font-medium mb-1">Business Pending</p>
                <p className="text-xs text-muted-foreground">Under review</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-6">Uploaded Documents</h3>
            <div className="space-y-4">
              {kycDocuments.map((doc) => (
                <div key={doc.id} className="p-4 border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {doc.status === 'verified' ? (
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      </div>
                    ) : doc.status === 'pending' ? (
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-destructive" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{doc.type}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                      {doc.expiryDate && (
                        <p className="text-xs text-muted-foreground">
                          Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className={
                      doc.status === 'verified' ? 'bg-success/10 text-success' :
                      doc.status === 'pending' ? 'bg-accent/10 text-accent' :
                      'bg-destructive/10 text-destructive'
                    }>
                      {doc.status === 'verified' ? 'Verified' : 
                       doc.status === 'pending' ? 'Pending' : 'Rejected'}
                    </Badge>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <div className="p-6 border-2 border-dashed rounded-lg text-center">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="font-medium mb-2">Upload Additional Documents</p>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop files here, or click to browse
              </p>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Supported formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Email Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Order Updates</p>
                      <p className="text-sm text-muted-foreground">Receive emails about order status changes</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Payment Confirmations</p>
                      <p className="text-sm text-muted-foreground">Get notified when payments are processed</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Promotions, tips, and platform updates</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">SMS Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Transaction Alerts</p>
                      <p className="text-sm text-muted-foreground">SMS for high-value transactions</p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Security Alerts</p>
                      <p className="text-sm text-muted-foreground">Important account security notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-4">Push Notifications</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Real-time Updates</p>
                      <p className="text-sm text-muted-foreground">Instant notifications on your mobile device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Low Stock Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified when inventory is running low</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />
            <div className="flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
