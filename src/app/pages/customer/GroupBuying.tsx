import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { WifiOff, RefreshCw, Clock, CheckCircle2, AlertCircle, Users, Target, Calendar } from 'lucide-react';
import { groupPurchases } from '../../lib/extended-data';
import { Link } from 'router';

export default function GroupBuying() {
  const activeGroup = groupPurchases[0];
  const progress = (activeGroup.collectedAmount / activeGroup.targetAmount) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Group Buying</h1>
        <p className="text-muted-foreground">Pool funds with others for bulk purchases and better prices</p>
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
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZ3JvdXAlMjBidXNpbmVzcyUyMHBlb3BsZXxlbnwxfHx8fDE3NDA3MTMyMzZ8MA&ixlib=rb-4.1.0&q=80&w=300"
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
          <Button className="flex-1 bg-primary text-white">
            Contribute Now
          </Button>
          <Button variant="outline">View Details</Button>
        </div>
      </Card>

      {/* Recent Contributors */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">Recent Contributors</h3>
        <div className="space-y-4">
          {activeGroup.contributions.map((contribution, idx) => (
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
          {groupPurchases.map((group) => (
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
                <Button className="w-full mt-4">Join Group</Button>
              )}
              {group.status === 'completed' && (
                <Button variant="outline" className="w-full mt-4">View Results</Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Create New Group */}
      <Card className="p-6 bg-secondary/10 border-secondary/20">
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Start a New Group Purchase</h3>
          <p className="text-muted-foreground mb-6">
            Organize a group buying campaign and invite participants
          </p>
          <Button className="bg-secondary text-white">Create Group Purchase</Button>
        </div>
      </Card>

      {/* How it Works */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">How Group Buying Works</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">1</span>
            </div>
            <h4 className="font-medium mb-2">Create or Join</h4>
            <p className="text-sm text-muted-foreground">
              Start a new group or join an existing one
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">2</span>
            </div>
            <h4 className="font-medium mb-2">Contribute Funds</h4>
            <p className="text-sm text-muted-foreground">
              Each participant adds their share
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">3</span>
            </div>
            <h4 className="font-medium mb-2">Reach Target</h4>
            <p className="text-sm text-muted-foreground">
              Purchase made when funding complete
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">4</span>
            </div>
            <h4 className="font-medium mb-2">Share Benefits</h4>
            <p className="text-sm text-muted-foreground">
              Everyone gets bulk pricing savings
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
