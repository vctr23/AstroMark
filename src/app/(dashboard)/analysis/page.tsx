"use client"

import { useState } from "react"
import { analyzeMarketAndCompetitors, type AnalyzeMarketAndCompetitorsOutput } from "@/ai/flows/analyze-market-and-competitors"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Search, 
  Target, 
  ShieldAlert, 
  Lightbulb, 
  ArrowRight,
  Loader2,
  Globe,
  Info
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

export default function AnalysisPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AnalyzeMarketAndCompetitorsOutput | null>(null)
  
  const [formData, setFormData] = useState({
    identifier: "",
    additionalContext: ""
  })

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const output = await analyzeMarketAndCompetitors({
        ...formData,
        language
      })
      setResult(output)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: language === 'es' ? "Error de Conexión Neural" : "Neural Connection Error",
        description: language === 'es' 
          ? "El modelo de IA está experimentando una alta demanda. Por favor, inténtalo de nuevo en unos momentos."
          : "The AI model is experiencing high demand. Please try again in a few moments.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold tracking-tight">{t('analysis.title')}</h2>
        <p className="text-muted-foreground text-lg">{t('analysis.desc')}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Card className="glass border-primary/20 sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">{t('analysis.form.title')}</CardTitle>
              <CardDescription>{t('analysis.form.desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnalyze} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    {t('analysis.form.identifier')}
                  </label>
                  <Input 
                    placeholder="https://company.com, Company Name, or email@domain.com" 
                    className="bg-background/50 border-border/50 focus:border-primary/50"
                    value={formData.identifier}
                    onChange={e => setFormData({...formData, identifier: e.target.value})}
                    required
                  />
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Info className="h-3 w-3" /> {language === 'es' ? 'Solo es necesario introducir uno de estos campos.' : 'Only one of these fields is required.'}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    {t('analysis.form.context')} <span className="text-xs font-normal text-muted-foreground ml-2">({language === 'es' ? 'Opcional' : 'Optional'})</span>
                  </label>
                  <Textarea 
                    placeholder={language === 'es' ? "Describe un poco más sobre qué quieres analizar o tus metas específicas..." : "Describe a bit more about what you want to analyze or your specific goals..."}
                    className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50"
                    value={formData.additionalContext}
                    onChange={e => setFormData({...formData, additionalContext: e.target.value})}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-primary hover:bg-primary/90 glow-primary mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {language === 'es' ? 'Escaneando...' : 'Scanning...'}
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" /> {t('analysis.form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-7">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[400px] border border-dashed rounded-xl border-border/50 bg-card/20 text-center p-12 space-y-4">
              <div className="rounded-full bg-primary/10 p-4">
                 <Globe className="h-12 w-12 text-primary/50" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-headline font-semibold">{language === 'es' ? 'Sin Datos' : 'No Data Received'}</h3>
                <p className="text-muted-foreground max-w-sm">{language === 'es' ? 'Introduce el enlace, nombre o email a la izquierda para iniciar el escaneo de mercado.' : 'Enter a link, name, or email on the left to start the market scan.'}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="space-y-6">
              <Card className="glass border-border/50">
                 <CardHeader><Skeleton className="h-8 w-[200px]" /></CardHeader>
                 <CardContent><Skeleton className="h-24 w-full" /></CardContent>
              </Card>
              <Card className="glass border-border/50">
                 <CardHeader><Skeleton className="h-8 w-[200px]" /></CardHeader>
                 <CardContent className="space-y-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                 </CardContent>
              </Card>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
              <Card className="glass border-secondary/20">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-secondary/20 p-2 rounded-lg"><Target className="h-6 w-6 text-secondary" /></div>
                  <CardTitle className="font-headline">{language === 'es' ? 'Panorama Competitivo' : 'Competitive Landscape'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{result.competitiveLandscape}</p>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <h3 className="text-xl font-headline font-bold flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-primary" /> {language === 'es' ? 'Competidores Identificados' : 'Known Adversaries'}
                </h3>
                {result.competitors.map((comp, idx) => (
                  <Card key={idx} className="glass border-border/50 overflow-hidden group">
                    <CardHeader className="bg-muted/30 pb-4">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-headline">{comp.name}</CardTitle>
                        <Badge variant="outline" className="border-primary/30 text-primary">{language === 'es' ? 'Competidor' : 'Competitor'} {idx + 1}</Badge>
                      </div>
                      <CardDescription>{comp.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4 grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">{language === 'es' ? 'Fortalezas' : 'Strengths'}</h4>
                        <ul className="text-sm space-y-1">
                          {comp.strengths.map((s, i) => <li key={i} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-emerald-500" /> {s}
                          </li>)}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-destructive">{language === 'es' ? 'Debilidades' : 'Weaknesses'}</h4>
                        <ul className="text-sm space-y-1">
                          {comp.weaknesses.map((w, i) => <li key={i} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-destructive" /> {w}
                          </li>)}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="glass border-emerald-500/20 bg-emerald-500/5">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="bg-emerald-500/20 p-2 rounded-lg"><Lightbulb className="h-6 w-6 text-emerald-500" /></div>
                  <CardTitle className="font-headline">{language === 'es' ? 'Brechas de Mercado y Oportunidades' : 'Market Gaps & Opportunities'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-3">
                    {result.marketGaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-emerald-500/10">
                        <ArrowRight className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">{gap}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
