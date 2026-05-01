import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Clock, CheckCircle2, Users, Target, Calendar, PlusCircle } from 'lucide-react';
import { groupPurchases } from '../../lib/extended-data';
import { toast } from 'sonner';

export default function GroupBuying() {
  const [groups, setGroups] = useState(groupPurchases);
  const [contributeAmount, setContributeAmount] = useState('');
  const [contributeDialogOpen, setContributeDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupTarget, setNewGroupTarget] = useState('');
  const [newGroupDeadline, setNewGroupDeadline] = useState('');

  const activeGroup = groups[0];
  const progress = (activeGroup.collectedAmount / activeGroup.targetAmount) * 100;

  const handleContribute = () => {
    const amount = parseFloat(contributeAmount);
    if (!amount || amount <= 0) {
      toast.error('Please enter a valid contribution amount');
      return;
    }
    setGroups(prev =>
      prev.map((g, i) =>
        i === 0
          ? {
              ...g,
              collectedAmount: Math.min(g.collectedAmount + amount, g.targetAmount),
              remainingAmount: Math.max(g.remainingAmount - amount, 0),
              participants: g.participants + 1,
              contributions: [
                { name: 'You', amount },
                ...(g.contributions || []),
              ],
            }
          : g
      )
    );
    toast.success(`Successfully contributed $${amount.toFixed(2)} to "${activeGroup.productName}"!`);
    setContributeAmount('');
    setContributeDialogOpen(false);
  };

  const handleJoinGroup = (groupId: string, productName: string) => {
    toast.success(`You've joined "${productName}"! Check your wallet for the contribution prompt.`);
  };

  const handleViewResults = (productName: string) => {
    toast.info(`Viewing results for "${productName}" - savings of 22% achieved!`);
  };

  const handleCreateGroup = () => {
    if (!newGroupName || !newGroupTarget || !newGroupDeadline) {
      toast.error('Please fill all required fields');
      return;
    }
    const target = parseFloat(newGroupTarget);
    if (isNaN(target) || target <= 0) {
      toast.error('Please enter a valid target amount');
      return;
    }
    const newGroup = {
      id: `GP-00${groups.length + 1}`,
      productName: newGroupName,
      targetAmount: target,
      collectedAmount: 0,
      remainingAmount: target,
      participants: 1,
      targetParticipants: 10,
      status: 'active' as const,
      deadline: newGroupDeadline,
      organizer: 'Tendai Moyo',
      contributions: [],
    };
    setGroups(prev => [newGroup, ...prev]);
    toast.success(`Group purchase "${newGroupName}" created successfully! Share it to invite others.`);
    setNewGroupName('');
    setNewGroupTarget('');
    setNewGroupDeadline('');
    setCreateDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Group Buying</h1>
          <p className="text-muted-foreground">Pool funds with others for bulk purchases and better prices</p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="w-4 h-4" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create a New Group Purchase</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Product / Goal Name</Label>
                <Input
                  id="groupName"
                  placeholder="e.g., Bulk Maize Order"
                  value={newGroupName}
                  onChange={e => setNewGroupName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupTarget">Target Amount ($)</Label>
                <Input
                  id="groupTarget"
                  type="number"
                  placeholder="500.00"
                  value={newGroupTarget}
                  onChange={e => setNewGroupTarget(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupDeadline">Deadline</Label>
                <Input
                  id="groupDeadline"
                  type="date"
                  value={newGroupDeadline}
                  onChange={e => setNewGroupDeadline(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateGroup}>Create Group</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Feature Banner */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 to-primary/20 border-secondary/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Collective Purchasing Power</h3>
              <p className="text-muted-foreground">Join forces, save money, buy in bulk together</p>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300"
            alt="Group"
            className="hidden lg:block h-24 w-32 object-cover rounded-lg"
          />
        </div>
      </Card>

      {/* Active Group Purchase */}
      <Card className="p-6 border-2 border-primary">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">{activeGroup.productName}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{activeGroup.participants}/{activeGroup.targetParticipants} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Ends {new Date(activeGroup.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <Badge className="bg-secondary text-white">Active</Badge>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Funding Progress</p>
              <p className="text-3xl font-bold text-primary">
                ${activeGroup.collectedAmount.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Target Amount</p>
              <p className="text-2xl font-bold">${activeGroup.targetAmount.toFixed(2)}</p>
            </div>
          </div>
          <Progress value={progress} className="h-3 mb-2" />
          <div className="flex justify-between text-sm">
            <span className="text-success font-medium">{progress.toFixed(0)}% funded</span>
            <span className="text-muted-foreground">${activeGroup.remainingAmount.toFixed(2)} remaining</span>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="p-4 bg-muted/50 rounded-lg mb-6">
          <p className="text-sm text-muted-foreground mb-1">Organized by</p>
          <p className="font-medium">{activeGroup.organizer}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Dialog open={contributeDialogOpen} onOpenChange={setContributeDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-primary text-white">
                Contribute Now
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Contribute to {activeGroup.productName}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Contribution Amount ($)</Label>
                  <Input
                    type="number"
                    placeholder="50.00"
                    value={contributeAmount}
                    onChange={e => setContributeAmount(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {['20', '50', '100', '200'].map(amt => (
                    <Button
                      key={amt}
                      variant="outline"
                      size="sm"
                      onClick={() => setContributeAmount(amt)}
                    >
                      ${amt}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Remaining to fund: <strong>${activeGroup.remainingAmount.toFixed(2)}</strong>
                </p>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" onClick={() => setContributeDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleContribute}>Confirm Contribution</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            onClick={() => toast.info(`Group details for "${activeGroup.productName}" — ID: ${activeGroup.id}`)}
          >
            View Details
          </Button>
        </div>
      </Card>

      {/* Recent Contributors */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Recent Contributors</h3>
        <div className="space-y-4">
          {(activeGroup.contributions || []).map((contribution, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{contribution.name}</p>
                  <p className="text-sm text-muted-foreground">Contributor</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-success">${contribution.amount.toFixed(2)}</p>
                <Badge variant="secondary" className="mt-1 text-xs">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* All Group Purchases */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Browse Group Purchases</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((group) => (
            <div key={group.id} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">{group.productName}</h4>
                    <p className="text-sm text-muted-foreground">{group.organizer}</p>
                  </div>
                </div>
                <Badge variant="secondary" className={
                  group.status === 'completed' ? 'bg-success/10 text-success' :
                  'bg-secondary/10 text-secondary'
                }>
                  {group.status === 'completed' ? (
                    <><CheckCircle2 className="w-3 h-3 mr-1" />Completed</>
                  ) : (
                    <><Clock className="w-3 h-3 mr-1" />Active</>
                  )}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Target</span>
                  <span className="font-medium">${group.targetAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Collected</span>
                  <span className="font-bold text-primary">${group.collectedAmount.toFixed(2)}</span>
                </div>
                <Progress value={(group.collectedAmount / group.targetAmount) * 100} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    <Users className="w-3 h-3 inline mr-1" />
                    {group.participants} participants
                  </span>
                  {group.status === 'active' && (
                    <span className="text-muted-foreground">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      {new Date(group.deadline).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              {group.status === 'active' && (
                <Button
                  className="w-full mt-4"
                  onClick={() => handleJoinGroup(group.id, group.productName)}
                >
                  Join Group
                </Button>
              )}
              {group.status === 'completed' && (
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => handleViewResults(group.productName)}
                >
                  View Results
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* How it Works */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">How Group Buying Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Create or Join', desc: 'Start a new group or join an existing one' },
            { step: '2', title: 'Contribute Funds', desc: 'Each participant adds their share' },
            { step: '3', title: 'Reach Target', desc: 'Purchase made when funding complete' },
            { step: '4', title: 'Share Benefits', desc: 'Everyone gets bulk pricing savings' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-primary">{step}</span>
              </div>
              <h4 className="font-medium mb-2">{title}</h4>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
