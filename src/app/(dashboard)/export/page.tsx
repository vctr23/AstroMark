"use client"

import React, { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Download, 
  FileJson, 
  FileText, 
  Table as TableIcon,
  ShieldCheck,
  Zap,
  ArrowDownToLine,
  History
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function ExportPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [exporting, setExporting] = useState<string | null>(null)

  const handleExport = (type: string) => {
    setExporting(type)
    setTimeout(() => {
      setExporting(null)
      toast({
        title: language === 'en' ? "Manifest Downloaded" : "Manifiesto Descargado",
        description: language === 'en' 
          ? `Campaign neural data has been exported as ${type.toUpperCase()}.` 
          : `Los datos neurales de la campaña han sido exportados como ${type.toUpperCase()}.`,
      })
    }, 1500)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight">{t('nav.export')}</h2>
          <p className="text-muted-foreground">Extract and backup your interstellar marketing intelligence.</p>
        </div>
        <Button variant="outline" className="border-primary/20 bg-background/50">
           <History className="mr-2 h-4 w-4" /> {language === 'es' ? 'Historial' : 'History'}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <ExportCard 
          title="JSON Neural Extract"
          desc="Full raw data structure including AI-generated personas and market patterns."
          icon={<FileJson className="h-8 w-8 text-primary" />}
          type="json"
          loading={exporting === 'json'}
          onClick={() => handleExport('json')}
          t={t}
          language={language}
        />
        <ExportCard 
          title="CSV Campaign Table"
          desc="Tabular data compatible with Earth systems like Excel or Google Sheets."
          icon={<TableIcon className="h-8 w-8 text-emerald-500" />}
          type="csv"
          loading={exporting === 'csv'}
          onClick={() => handleExport('csv')}
          t={t}
          language={language}
        />
        <ExportCard 
          title="TXT Strategy Manifest"
          desc="Clean text version of your strategies for quick reading and sharing."
          icon={<FileText className="h-8 w-8 text-blue-500" />}
          type="txt"
          loading={exporting === 'txt'}
          onClick={() => handleExport('txt')}
          t={t}
          language={language}
        />
      </div>

      <Card className="border-primary/20 bg-primary/5 glass">
         <CardContent className="p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
               <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
               <div className="relative rounded-2xl bg-black/40 border border-primary/30 p-6">
                  <ShieldCheck className="h-12 w-12 text-primary" />
               </div>
            </div>
            <div className="space-y-2 flex-1 text-center md:text-left">
               <h3 className="text-xl font-headline font-bold tracking-tight">Quantum Data Integrity</h3>
               <p className="text-muted-foreground text-sm max-w-2xl">
                 AstroMark ensures that all exported manifests are cryptographically verified. 
                 Neural data is stripped of sensitive metadata before extraction to maintain your competitive privacy across the sector.
               </p>
            </div>
            <div className="flex flex-col gap-2 w-full md:w-auto">
               <Badge className="bg-primary/20 text-primary border-primary/30 py-1 justify-center">
                  <Zap className="mr-1 h-3 w-3" /> VERIFIED
               </Badge>
               <span className="text-[10px] text-center text-muted-foreground font-mono">TLS 1.3 ENCRYPTION</span>
            </div>
         </CardContent>
      </Card>
    </div>
  )
}

function ExportCard({ title, desc, icon, type, loading, onClick, t, language }: any) {
  return (
    <Card className="border-border/50 bg-card/30 glass overflow-hidden group hover:border-primary/40 transition-all flex flex-col">
      <CardHeader>
        <div className="mb-4 h-16 w-16 rounded-2xl bg-background/50 border border-border/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
           {icon}
        </div>
        <CardTitle className="font-headline tracking-tight">{title}</CardTitle>
        <CardDescription className="text-xs">{desc}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1" />
      <CardFooter className="border-t border-border/50 bg-white/[0.02] p-4">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 glow-primary h-10" 
          onClick={onClick}
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {language === 'es' ? 'Procesando...' : 'Processing...'}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <ArrowDownToLine className="h-4 w-4" />
              {language === 'es' ? 'Descargar' : 'Download'} {type.toUpperCase()}
            </div>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
