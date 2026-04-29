
"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { 
  Calculator, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCcw,
  Zap,
  Rocket
} from "lucide-react"

export default function ROIPage() {
  const [isMounted, setIsMounted] = useState(false)
  const [costs, setCosts] = useState({
    ads: 5000,
    creation: 2000,
    tools: 500
  })

  const [returns, setReturns] = useState({
    leads: 500,
    conversionRate: 5, // percentage
    averageValue: 200
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const stats = useMemo(() => {
    const totalCost = costs.ads + costs.creation + costs.tools
    const totalConversions = Math.floor((returns.leads * returns.conversionRate) / 100)
    const totalRevenue = totalConversions * returns.averageValue
    const profit = totalRevenue - totalCost
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0
    
    return {
      totalCost,
      totalConversions,
      totalRevenue,
      profit,
      roi: roi.toFixed(1)
    }
  }, [costs, returns])

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold tracking-tight">Yield Predictor</h2>
        <p className="text-muted-foreground text-lg">Calculate the efficiency of your resource allocation across the sector.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-6">
          <Card className="glass border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                 <ArrowDownRight className="h-4 w-4" /> Operational Costs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <label>Ad Spend</label>
                    <span className="text-primary font-mono">${costs.ads}</span>
                  </div>
                  <Slider 
                    value={[costs.ads]} 
                    max={50000} 
                    step={100} 
                    onValueChange={([v]) => setCosts({...costs, ads: v})} 
                  />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <label>Content Creation</label>
                    <span className="text-primary font-mono">${costs.creation}</span>
                  </div>
                  <Slider 
                    value={[costs.creation]} 
                    max={20000} 
                    step={100} 
                    onValueChange={([v]) => setCosts({...costs, creation: v})} 
                  />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <label>Platform Fees</label>
                    <span className="text-primary font-mono">${costs.tools}</span>
                  </div>
                  <Slider 
                    value={[costs.tools]} 
                    max={5000} 
                    step={50} 
                    onValueChange={([v]) => setCosts({...costs, tools: v})} 
                  />
               </div>
            </CardContent>
          </Card>

          <Card className="glass border-secondary/20">
            <CardHeader className="pb-4">
              <CardTitle className="text-sm font-headline uppercase tracking-widest text-secondary flex items-center gap-2">
                 <ArrowUpRight className="h-4 w-4" /> Projected Yield
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <label>Leads Captured</label>
                    <span className="text-secondary font-mono">{returns.leads}</span>
                  </div>
                  <Slider 
                    value={[returns.leads]} 
                    max={10000} 
                    step={10} 
                    onValueChange={([v]) => setReturns({...returns, leads: v})} 
                  />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <label>Conversion Rate (%)</label>
                    <span className="text-secondary font-mono">{returns.conversionRate}%</span>
                  </div>
                  <Slider 
                    value={[returns.conversionRate]} 
                    max={100} 
                    step={0.5} 
                    onValueChange={([v]) => setReturns({...returns, conversionRate: v})} 
                  />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <label>Average Order Value</label>
                    <span className="text-secondary font-mono">${returns.averageValue}</span>
                  </div>
                  <Slider 
                    value={[returns.averageValue]} 
                    max={5000} 
                    step={10} 
                    onValueChange={([v]) => setReturns({...returns, averageValue: v})} 
                  />
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8">
           <div className="grid gap-6">
              <Card className="glass border-primary/20 bg-primary/5 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Calculator className="h-32 w-32" />
                 </div>
                 <CardHeader>
                    <CardTitle className="font-headline text-2xl">Analysis Result</CardTitle>
                    <CardDescription>Comprehensive ROI report based on simulated parameters.</CardDescription>
                 </CardHeader>
                 <CardContent>
                    <div className="grid sm:grid-cols-2 gap-8 items-center">
                       <div className="space-y-8">
                          <div>
                             <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Investment Ratio (ROI)</p>
                             <div className="flex items-baseline gap-2">
                                <span className={`text-6xl font-headline font-bold ${Number(stats.roi) >= 0 ? 'text-emerald-500' : 'text-destructive'}`}>
                                  {stats.roi}%
                                </span>
                             </div>
                             <p className="text-sm text-muted-foreground mt-2">
                                {Number(stats.roi) > 100 ? 'Exceptional trajectory. System fully efficient.' : 
                                 Number(stats.roi) > 0 ? 'Positive yield detected. Proceed with mission.' :
                                 'Negative trajectory. Recalibration required.'}
                             </p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                             <div>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Total Revenue</p>
                                <p className="text-xl font-headline font-bold text-emerald-500">
                                  ${isMounted ? stats.totalRevenue.toLocaleString() : stats.totalRevenue}
                                </p>
                             </div>
                             <div>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground">Net Profit</p>
                                <p className="text-xl font-headline font-bold text-secondary">
                                  ${isMounted ? stats.profit.toLocaleString() : stats.profit}
                                </p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="bg-background/40 border border-border/50 rounded-2xl p-6 space-y-4">
                          <h4 className="text-sm font-headline font-bold border-b border-border pb-2">Campaign Pulse</h4>
                          <div className="space-y-4">
                             <StatRow label="Conversions" value={stats.totalConversions} unit="units" />
                             <StatRow label="Cost per Lead" value={(stats.totalCost / (returns.leads || 1)).toFixed(2)} unit="$" isPrefix />
                             <StatRow label="Cost per Acquisition" value={(stats.totalCost / (stats.totalConversions || 1)).toFixed(2)} unit="$" isPrefix />
                          </div>
                          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 glow-accent mt-2">
                             <Rocket className="mr-2 h-4 w-4" /> Save Forecast
                          </Button>
                       </div>
                    </div>
                 </CardContent>
              </Card>

              <div className="grid sm:grid-cols-3 gap-4">
                 <MetricCard title="Total Cost" value={stats.totalCost} icon={<DollarSign className="h-4 w-4" />} color="text-destructive" isMounted={isMounted} />
                 <MetricCard title="Leads Generated" value={returns.leads} icon={<TrendingUp className="h-4 w-4" />} color="text-blue-400" isMounted={isMounted} />
                 <MetricCard title="System Efficiency" value={`${Math.min(100, Math.max(0, Number(stats.roi) / 5)).toFixed(0)}%`} icon={<Zap className="h-4 w-4" />} color="text-yellow-400" isMounted={isMounted} />
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

function StatRow({ label, value, unit, isPrefix = false }: { label: string, value: string | number, unit: string, isPrefix?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
       <span className="text-muted-foreground">{label}</span>
       <span className="font-mono font-medium">
          {isPrefix && unit}{value}{!isPrefix && ` ${unit}`}
       </span>
    </div>
  )
}

function MetricCard({ title, value, icon, color, isMounted }: { title: string, value: string | number, icon: React.ReactNode, color: string, isMounted: boolean }) {
  const displayValue = typeof value === 'number' 
    ? (isMounted ? `$${value.toLocaleString()}` : `$${value}`)
    : value;

  return (
    <Card className="glass border-border/50">
       <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-1">
             {icon} {title}
          </div>
          <div className={`text-2xl font-headline font-bold ${color}`}>
             {displayValue}
          </div>
       </CardContent>
    </Card>
  )
}
