"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell
} from "recharts"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { 
  Rocket, 
  Activity, 
  Globe, 
  Zap, 
  TrendingUp, 
  Users 
} from "lucide-react"

const performanceData = [
  { month: "Jan", reach: 450, engagement: 200, roi: 120 },
  { month: "Feb", reach: 520, engagement: 310, roi: 150 },
  { month: "Mar", reach: 610, engagement: 280, roi: 180 },
  { month: "Apr", reach: 850, engagement: 450, roi: 240 },
  { month: "May", reach: 780, engagement: 510, roi: 210 },
  { month: "Jun", reach: 990, engagement: 620, roi: 290 },
]

const sectorData = [
  { sector: "Alpha", active: 400, color: "hsl(var(--primary))" },
  { sector: "Beta", active: 300, color: "hsl(var(--secondary))" },
  { sector: "Gamma", active: 200, color: "hsl(var(--accent))" },
  { sector: "Delta", active: 278, color: "hsl(var(--primary) / 0.5)" },
  { sector: "Epsilon", active: 189, color: "hsl(var(--secondary) / 0.5)" },
]

export default function TrackingPage() {
  const { t, language } = useLanguage()

  const chartConfig = {
    reach: {
      label: language === 'es' ? "Alcance" : "Reach",
      color: "hsl(var(--primary))",
    },
    engagement: {
      label: language === 'es' ? "Interacción" : "Engagement",
      color: "hsl(var(--secondary))",
    },
    roi: {
      label: "ROI",
      color: "hsl(var(--accent))",
    },
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold tracking-tight">{t('tracking.title')}</h2>
        <p className="text-muted-foreground text-lg">{t('tracking.desc')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Constellation Performance Chart */}
        <Card className="glass border-primary/20 bg-background/40">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" /> {t('tracking.performance')}
            </CardTitle>
            <CardDescription>{language === 'es' ? 'Trayectoria de las señales de marketing en el tiempo.' : 'Trajectory of marketing signals over time.'}</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="reach"
                  stroke="var(--color-reach)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "white", stroke: "var(--color-reach)", strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "white" }}
                  filter="url(#glow)"
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke="var(--color-engagement)"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "white", stroke: "var(--color-engagement)", strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "white" }}
                  filter="url(#glow)"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Reach Area Chart */}
        <Card className="glass border-secondary/20 bg-background/40">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Globe className="h-5 w-5 text-secondary" /> {t('tracking.reach')}
            </CardTitle>
            <CardDescription>{language === 'es' ? 'Expansión de la red en sectores interestelares.' : 'Network expansion across interstellar sectors.'}</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="reach" 
                  stroke="hsl(var(--secondary))" 
                  fillOpacity={1} 
                  fill="url(#colorReach)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Sector Distribution Bar Chart */}
        <Card className="glass border-border/50 bg-background/20 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" /> {t('tracking.active')}
            </CardTitle>
            <CardDescription>{language === 'es' ? 'Densidad de sondas activas por cuadrante.' : 'Density of active probes per quadrant.'}</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData}>
                <XAxis dataKey="sector" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="glass p-3 border border-primary/20 rounded-lg text-xs">
                          <p className="font-bold mb-1">{payload[0].payload.sector}</p>
                          <p className="text-primary">{payload[0].value} {language === 'es' ? 'Unidades' : 'Units'}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="active" radius={[4, 4, 0, 0]}>
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Metric Constellation Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatsMetric title={t('dash.active')} value="142" change="+12%" icon={<Rocket className="h-4 w-4" />} />
        <StatsMetric title={t('dash.reach')} value="2.4M" change="+5.2%" icon={<Users className="h-4 w-4" />} />
        <StatsMetric title={t('nav.roi')} value="248%" change="+1.4%" icon={<TrendingUp className="h-4 w-4" />} />
      </div>
    </div>
  )
}

function StatsMetric({ title, value, change, icon }: { title: string, value: string, change: string, icon: React.ReactNode }) {
  return (
    <Card className="glass border-border/50 bg-background/10 hover:border-primary/30 transition-all group overflow-hidden">
      <CardContent className="p-6 relative">
        <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-700">
           {icon}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
          {icon} {title}
        </div>
        <div className="text-3xl font-headline font-bold mb-1">{value}</div>
        <div className="text-xs text-emerald-400 font-medium">
          {change} <span className="text-muted-foreground font-normal">vs last sector cycle</span>
        </div>
      </CardContent>
    </Card>
  )
}
