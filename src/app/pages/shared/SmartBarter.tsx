import {
    Check, DollarSign,
    FileText,
    Package,
    PieChart,
    Repeat,
    Shield,
    ShoppingBag,
    Warehouse
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import {
    assetExchanges,
    dacPortfolio,
    registeredAssets,
    smartBarterStats,
    warehouseReceipts
} from '../../lib/wallet-barter-data';

export default function SmartBarter() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">SmartBarter Exchange</h1>
          <p className="text-muted-foreground">Asset-backed payments with Digital Asset Credits (DACs)</p>
        </div>
        <Link to="register-asset">
          <Button className="bg-primary text-white gap-2">
            <Package className="w-4 h-4" />
            Register Asset
          </Button>
        </Link>
      </div>

      {/* Service Banner */}
      <Card className="p-6 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 border-secondary/30 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Repeat className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">SmartBarter Service - Asset Backed Exchange</h3>
                  <p className="text-muted-foreground">Convert grain, livestock & commodities into Digital Asset Credits</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  <span>RBZ Regulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Warehouse className="w-4 h-4 text-primary" />
                  <span>Verified Warehousing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary" />
                  <span>Quality Inspected</span>
                </div>
              </div>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwZmFybWVyJTIwZ3JhaW4lMjBoYXJ2ZXN0fGVufDB8fHx8MTc0MTAwNzAxMnww&ixlib=rb-4.1.0&q=80&w=300"
              alt="Assets"
              className="hidden lg:block h-24 w-40 object-cover rounded-lg"
            />
          </div>
        </div>
      </Card>

      {/* DAC Portfolio Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <PieChart className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Total DACs</p>
          <p className="text-2xl font-bold">{dacPortfolio.totalDACs.toFixed(2)}</p>
          <p className="text-xs text-success mt-2">≈ ${dacPortfolio.totalValueUSD.toLocaleString()}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-success" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Redeemable</p>
          <p className="text-2xl font-bold">{dacPortfolio.redeemable.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground mt-2">Available to use</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Assets Registered</p>
          <p className="text-2xl font-bold">{registeredAssets.length}</p>
          <p className="text-xs text-success mt-2">All active</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Repeat className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Exchanges</p>
          <p className="text-2xl font-bold">{assetExchanges.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Completed</p>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="assets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assets">My Assets</TabsTrigger>
          <TabsTrigger value="dacs">DAC Portfolio</TabsTrigger>
          <TabsTrigger value="exchanges">Exchange History</TabsTrigger>
          <TabsTrigger value="receipts">Warehouse Receipts</TabsTrigger>
        </TabsList>

        {/* My Assets Tab */}
        <TabsContent value="assets" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Registered Assets</h3>
              <Link to="register-asset">
                <Button className="bg-primary text-white gap-2">
                  <Package className="w-4 h-4" />
                  Register New Asset
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registeredAssets.map((asset) => (
                <Card key={asset.id} className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
                  {/* Thumbnail */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <ImageWithFallback
                      src={asset.image}
                      alt={asset.category}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <Badge className="absolute top-3 right-3 bg-success text-white">
                      {asset.status}
                    </Badge>
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-xl">{asset.type === 'grain' ? '🌾' : asset.type === 'livestock' ? '🐄' : '🍃'}</span>
                      <span className="text-white font-bold text-lg drop-shadow">{asset.category}</span>
                    </div>
                  </div>

                  <div className="p-5">
                  <p className="text-sm text-muted-foreground mb-4">{asset.location}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quantity</span>
                      <span className="font-medium">{asset.quantity} {asset.unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Value/Unit</span>
                      <span className="font-medium">${asset.valuePerUnit.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-bold">Total Value</span>
                      <span className="font-bold text-primary">${asset.totalValueUSD.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">DAC Equivalent</span>
                      <span className="font-medium text-secondary">{asset.totalValueDAC} DAC</span>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Quality</span>
                      <span className="font-medium">{asset.quality}</span>
                    </div>
                    {asset.moisture && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Moisture</span>
                        <span className="font-medium">{asset.moisture}</span>
                      </div>
                    )}
                    {asset.breed && (
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Breed</span>
                        <span className="font-medium">{asset.breed}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-3 h-3 mr-1" />
                      Receipt
                    </Button>
                    <Button size="sm" className="flex-1 bg-secondary text-white">
                      Exchange
                    </Button>
                  </div>
                  </div>{/* end inner padding div */}
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* DAC Portfolio Tab */}
        <TabsContent value="dacs" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Digital Asset Credits (DAC) Breakdown</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {dacPortfolio.breakdown.map((item, idx) => (
                <Card key={idx} className="p-6 bg-gradient-to-br from-secondary/10 to-primary/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold">{item.assetType}</h4>
                    <Badge variant="secondary">{item.percentage.toFixed(1)}%</Badge>
                  </div>
                  <p className="text-3xl font-bold text-secondary mb-2">{item.dacs.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">DAC</p>
                  <Separator className="my-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">USD Value</span>
                    <span className="font-bold">${item.valueUSD.toFixed(2)}</span>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-muted/30">
              <h4 className="font-bold mb-4">Use Your DACs</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                  <span className="text-sm">Pay Merchants</span>
                  <span className="text-xs text-muted-foreground">Use DACs for goods</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <DollarSign className="w-6 h-6 text-success" />
                  <span className="text-sm">Convert to Cash</span>
                  <span className="text-xs text-muted-foreground">Redeem for USD/ZiG</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col gap-2">
                  <Repeat className="w-6 h-6 text-secondary" />
                  <span className="text-sm">Trade Assets</span>
                  <span className="text-xs text-muted-foreground">Exchange on marketplace</span>
                </Button>
              </div>
            </Card>
          </Card>
        </TabsContent>

        {/* Exchange History Tab */}
        <TabsContent value="exchanges" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-bold mb-6">Asset Exchange History</h3>
            <div className="space-y-4">
              {assetExchanges.map((exchange, idx) => (
                <div key={idx} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {exchange.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                      <h4 className="font-bold">{exchange.assetType}</h4>
                      <p className="text-sm text-muted-foreground">
                        {exchange.assetQuantity} {exchange.assetUnit}
                      </p>
                    </div>
                    <Badge className="bg-success text-white">
                      <Check className="w-3 h-3 mr-1" />
                      {exchange.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground mb-1">DACs Used</p>
                      <p className="font-bold text-secondary">{exchange.dacUsed} DAC</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <p className="text-xs text-muted-foreground mb-1">Received</p>
                      <p className="font-bold">
                        {exchange.goodsReceived || exchange.serviceReceived || `$${exchange.cashReceived}`}
                      </p>
                    </div>
                  </div>

                  {exchange.merchantName && (
                    <p className="text-sm text-muted-foreground">
                      Merchant: {exchange.merchantName}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(exchange.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Warehouse Receipts Tab */}
        <TabsContent value="receipts" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Digital Warehouse Receipts</h3>
              <Badge className="bg-success text-white">
                <Shield className="w-3 h-3 mr-1" />
                All Valid
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {warehouseReceipts.map((receipt, idx) => (
                <Card key={idx} className="p-6 border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-lg mb-1">{receipt.assetType}</h4>
                      <p className="text-sm text-muted-foreground">{receipt.id}</p>
                    </div>
                    <Badge className="bg-success text-white">
                      {receipt.status}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Warehouse className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-medium">{receipt.warehouse}</p>
                        <p className="text-xs text-muted-foreground">{receipt.warehouseAddress}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Quantity</p>
                        <p className="font-medium">{receipt.quantity} {receipt.unit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Quality</p>
                        <p className="font-medium">{receipt.quality}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium text-xs">{receipt.storageLocation}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expiry</p>
                        <p className="font-medium text-xs">{new Date(receipt.expiryDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <Separator />

                    <div className="text-xs">
                      <p className="text-muted-foreground mb-1">Inspection</p>
                      <p className="font-medium">{receipt.inspector}</p>
                      <p className="text-muted-foreground">
                        {new Date(receipt.inspectionDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Barcode</p>
                    <p className="font-mono text-xs">{receipt.barcode}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <FileText className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    {receipt.transferable && (
                      <Button size="sm" className="flex-1">
                        Transfer
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Platform Stats */}
      <Card className="p-6">
        <h3 className="font-bold mb-6">SmartBarter Platform Statistics</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-primary/10 rounded-lg">
            <p className="text-3xl font-bold text-primary">{smartBarterStats.totalAssetsRegistered.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Assets Registered</p>
          </div>
          <div className="text-center p-4 bg-secondary/10 rounded-lg">
            <p className="text-3xl font-bold text-secondary">{smartBarterStats.totalDACsIssued.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Total DACs Issued</p>
          </div>
          <div className="text-center p-4 bg-success/10 rounded-lg">
            <p className="text-3xl font-bold text-success">${smartBarterStats.totalValueLocked.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Value Locked</p>
          </div>
          <div className="text-center p-4 bg-muted rounded-lg">
            <p className="text-3xl font-bold">{smartBarterStats.completedExchanges.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground mt-2">Completed Exchanges</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
