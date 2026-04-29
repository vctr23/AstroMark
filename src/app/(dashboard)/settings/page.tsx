"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { 
  Download, 
  Database, 
  Shield, 
  Globe, 
  Terminal,
  Cpu,
  Save,
  FileJson,
  FileText,
  Table as TableIcon,
  Languages
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const { toast } = useToast()
  const { language, setLanguage, t } = useLanguage()
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold tracking-tight">{t('settings.title')}</h2>
        <p className="text-muted-foreground text-lg">{t('settings.desc')}</p>
      </div>

      <div className="grid gap-6">
        {/* Language Selection */}
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Languages className="h-5 w-5 text-primary" /> {t('settings.lang.title')}
            </CardTitle>
            <CardDescription>{t('settings.lang.desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-background/40">
              <div className="space-y-0.5">
                <Label className="text-base">{t('settings.lang.toggle')}</Label>
                <p className="text-sm text-muted-foreground">
                  {language === 'en' ? 'English' : 'Español'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">EN</span>
                <Switch 
                  checked={language === 'es'} 
                  onCheckedChange={(checked) => setLanguage(checked ? 'es' : 'en')}
                />
                <span className="text-sm font-medium text-muted-foreground">ES</span>
              </div>
            </div>
          </CardContent>
        </Card>



        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" /> {t('settings.security.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                   <Label>Quantum Encryption</Label>
                   <p className="text-sm text-muted-foreground">End-to-end encryption for all generated prompts.</p>
                </div>
                <Switch defaultChecked />
             </div>
             <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                   <Label>Real-time Market Scrapping</Label>
                   <p className="text-sm text-muted-foreground">Allow the probe to access live planetary networks.</p>
                </div>
                <Switch defaultChecked />
             </div>
          </CardContent>
          <CardFooter className="border-t border-border/50 pt-6">
             <Button className="ml-auto bg-primary glow-primary">
                <Save className="mr-2 h-4 w-4" /> {t('settings.save')}
             </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

