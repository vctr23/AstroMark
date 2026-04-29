"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowUpRight,
  Zap,
  Globe,
  Calculator
} from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export default function DashboardPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight">{t('dash.title')}</h2>
          <p className="text-muted-foreground">{t('dash.welcome')}</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Globe className="mr-2 h-4 w-4" /> {t('dash.map')}
           </Button>
           <Button className="bg-primary hover:bg-primary/90 glow-primary">
              <Rocket className="mr-2 h-4 w-4" /> {t('dash.launch')}
           </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title={t('dash.active')} 
          value="12" 
          change="+2" 
          icon={<Rocket className="h-4 w-4 text-primary" />} 
          cycleLabel={t('dash.lastcycle')}
        />
        <StatsCard 
          title={t('dash.reach')} 
          value="1.2M" 
          change="+18%" 
          icon={<Target className="h-4 w-4 text-secondary" />} 
          cycleLabel={t('dash.lastcycle')}
        />
        <StatsCard 
          title={t('dash.conv')} 
          value="4.2%" 
          change="+0.6%" 
          icon={<TrendingUp className="h-4 w-4 text-green-500" />} 
          cycleLabel={t('dash.lastcycle')}
        />
        <StatsCard 
          title={t('dash.leads')} 
          value="2,840" 
          change="+12%" 
          icon={<Users className="h-4 w-4 text-blue-500" />} 
          cycleLabel={t('dash.lastcycle')}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-primary/10 bg-card/50 glass">
          <CardHeader>
            <CardTitle className="font-headline">{t('dash.intel')}</CardTitle>
            <CardDescription>{t('dash.intel.desc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 rounded-lg border border-border/50 p-4 transition-colors hover:bg-accent/50">
                <div className="rounded-full bg-primary/20 p-2">
                   <Zap className="h-4 w-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{t('dash.feed.gap')}</p>
                  <p className="text-xs text-muted-foreground">
                    {t('dash.feed.gap.desc')}
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">14:02 UTC</span>
                    <Link href="/analysis" className="ml-auto flex items-center text-[10px] font-medium text-primary hover:underline">
                      {t('dash.feed.investigate')} <ArrowUpRight className="ml-1 h-2 w-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3 border-secondary/10 bg-card/50 glass">
          <CardHeader>
            <CardTitle className="font-headline">{t('dash.quick')}</CardTitle>
            <CardDescription>{t('dash.quick.desc')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <QuickActionButton 
              title={t('nav.persona')} 
              desc={t('dash.quick.persona.desc')} 
              href="/persona"
              icon={<Users className="h-5 w-5 text-secondary" />}
            />
            <QuickActionButton 
              title={t('dash.quick.slogan')} 
              desc={t('dash.quick.slogan.desc')} 
              href="/content"
              icon={<Zap className="h-5 w-5 text-primary" />}
            />
            <QuickActionButton 
              title={t('nav.roi')} 
              desc={t('dash.quick.roi.desc')} 
              href="/roi"
              icon={<Calculator className="h-5 w-5 text-green-500" />}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({ title, value, change, icon, cycleLabel }: { title: string, value: string, change: string, icon: React.ReactNode, cycleLabel: string }) {
  return (
    <Card className="border-border/50 bg-card/30 glass">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-headline font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">
          <span className="text-emerald-500 font-medium">{change}</span> {cycleLabel}
        </p>
      </CardContent>
    </Card>
  )
}

function QuickActionButton({ title, desc, href, icon }: { title: string, desc: string, href: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center gap-4 rounded-xl border border-border/50 p-4 transition-all hover:bg-accent hover:border-accent group">
      <div className="rounded-lg bg-background p-2 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground" />
    </Link>
  )
}
