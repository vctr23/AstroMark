"use client"

import React, { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Database, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  ExternalLink,
  Zap,
  Eye,
  EyeOff,
  RefreshCw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ConnectionsPage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({
    gemini: false,
    openai: false,
    anthropic: false
  })

  const [status, setStatus] = useState<Record<string, 'active' | 'inactive'>>({
    gemini: 'active',
    openai: 'inactive',
    anthropic: 'inactive'
  })

  const [testing, setTesting] = useState<string | null>(null)

  const toggleKeyVisibility = (id: string) => {
    setShowKeys(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const testConnection = (id: string) => {
    setTesting(id)
    setTimeout(() => {
      setTesting(null)
      toast({
        title: id === 'gemini' ? t('settings.connected') : t('conn.status.inactive'),
        description: id === 'gemini' ? "Connection established with Gemini 2.5 Flash." : "Authentication failed. Please check your API key.",
        variant: id === 'gemini' ? "default" : "destructive"
      })
    }, 1500)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-headline font-bold tracking-tight">{t('conn.title')}</h2>
        <p className="text-muted-foreground">{t('conn.desc')}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Gemini Provider */}
        <ProviderCard 
          id="gemini"
          title={t('conn.provider.gemini')}
          desc="Advanced multimodal reasoning and creative generation."
          status={status.gemini}
          showKey={showKeys.gemini}
          onToggleKey={() => toggleKeyVisibility('gemini')}
          onTest={() => testConnection('gemini')}
          testing={testing === 'gemini'}
          t={t}
        />

        {/* OpenAI Provider */}
        <ProviderCard 
          id="openai"
          title={t('conn.provider.openai')}
          desc="Industry standard for linguistic precision and logic."
          status={status.openai}
          showKey={showKeys.openai}
          onToggleKey={() => toggleKeyVisibility('openai')}
          onTest={() => testConnection('openai')}
          testing={testing === 'openai'}
          t={t}
        />

        {/* Anthropic Provider */}
        <ProviderCard 
          id="anthropic"
          title={t('conn.provider.anthropic')}
          desc="Ethical AI focus with superior reading comprehension."
          status={status.anthropic}
          showKey={showKeys.anthropic}
          onToggleKey={() => toggleKeyVisibility('anthropic')}
          onTest={() => testConnection('anthropic')}
          testing={testing === 'anthropic'}
          t={t}
        />
      </div>

      <Card className="border-primary/20 bg-primary/5 glass overflow-hidden">
         <CardContent className="p-6 flex items-center gap-6">
            <div className="hidden md:flex rounded-full bg-primary/20 p-4 h-fit">
               <ShieldCheck className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-1 flex-1">
               <h4 className="text-lg font-headline font-bold">Quantum Encryption Protocol</h4>
               <p className="text-sm text-muted-foreground">
                 All API keys are encrypted at rest and never leave your secure instance environment. 
                 Neural links are established via TLS 1.3 encrypted tunnels.
               </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 glow-primary whitespace-nowrap">
               {t('conn.save')}
            </Button>
         </CardContent>
      </Card>
    </div>
  )
}

function ProviderCard({ 
  id, 
  title, 
  desc, 
  status, 
  showKey, 
  onToggleKey, 
  onTest, 
  testing,
  t 
}: { 
  id: string, 
  title: string, 
  desc: string, 
  status: 'active' | 'inactive', 
  showKey: boolean, 
  onToggleKey: () => void, 
  onTest: () => void,
  testing: boolean,
  t: (k: string) => string
}) {
  const { language } = useLanguage()
  return (
    <Card className={`border-border/50 bg-card/30 glass transition-all hover:border-primary/30 ${status === 'active' ? 'ring-1 ring-primary/20' : ''}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg ${id === 'gemini' ? 'bg-blue-500/10 text-blue-500' : id === 'openai' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
             <Cpu className="h-5 w-5" />
          </div>
          <Badge variant={status === 'active' ? 'default' : 'outline'} className={status === 'active' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}>
            {status === 'active' ? (
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {t('conn.status.active')}</span>
            ) : (
              <span className="flex items-center gap-1"><XCircle className="h-3 w-3" /> {t('conn.status.inactive')}</span>
            )}
          </Badge>
        </div>
        <CardTitle className="font-headline">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Neural Link Key</span>
            <button 
              onClick={onToggleKey}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              {showKey ? (
                <><EyeOff className="h-3 w-3" /> {t('conn.key.hide') || (language === 'es' ? 'Ocultar' : 'Hide')}</>
              ) : (
                <><Eye className="h-3 w-3" /> {t('conn.key.show') || (language === 'es' ? 'Mostrar' : 'Show')}</>
              )}
            </button>
          </div>
          <div className="relative">
            <Input 
              key={showKey ? 'visible' : 'hidden'}
              type={showKey ? "text" : "password"} 
              placeholder={t('conn.api.placeholder')}
              className="bg-background/50 border-border/50 pr-10 font-mono text-xs"
              defaultValue={id === 'gemini' ? "••••••••••••••••••••••••••••••" : ""}
            />
            {status === 'active' && (
               <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full border-primary/20 hover:bg-primary/10 group" 
          onClick={onTest}
          disabled={testing}
        >
          {testing ? (
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Zap className="mr-2 h-4 w-4 text-primary group-hover:animate-pulse" />
          )}
          {t('conn.test')}
        </Button>
      </CardFooter>
    </Card>
  )
}
