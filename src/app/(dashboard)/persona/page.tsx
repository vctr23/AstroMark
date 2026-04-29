"use client"

import { useState } from "react"
import { generateCustomerPersonaAndTargeting, type GenerateCustomerPersonaAndTargetingOutput } from "@/ai/flows/generate-customer-persona-and-targeting"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Users, 
  Target, 
  MapPin, 
  Briefcase, 
  Compass, 
  Loader2,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Heart,
  ShieldAlert
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

export default function PersonaPage() {
  const { language, t } = useLanguage()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GenerateCustomerPersonaAndTargetingOutput | null>(null)
  
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    existingTargetAudience: ""
  })

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const output = await generateCustomerPersonaAndTargeting({
        ...formData,
        language
      })
      setResult(output)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: language === 'es' ? "Error de Síntesis" : "Synthesis Error",
        description: language === 'es' 
          ? "El motor de IA está sobrecargado. Por favor, reintenta la operación en unos segundos."
          : "The AI engine is overloaded. Please retry the operation in a few seconds.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold tracking-tight">{t('persona.title')}</h2>
        <p className="text-muted-foreground text-lg">{t('persona.desc')}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Card className="glass border-secondary/20 sticky top-24">
            <CardHeader>
              <CardTitle className="font-headline">{t('persona.form.title')}</CardTitle>
              <CardDescription>{language === 'es' ? 'Calibra el escáner para tu oferta.' : 'Calibrate the scanner for your offering.'}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGenerate} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">{language === 'es' ? 'Nombre del Producto' : 'Product Name'}</label>
                  <Input 
                    placeholder={language === 'es' ? "Nombre de la oferta..." : "Enter offering title..."} 
                    className="bg-background/50 border-border/50 focus:border-secondary/50"
                    value={formData.productName}
                    onChange={e => setFormData({...formData, productName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{language === 'es' ? 'Descripción Detallada' : 'Detailed Description'}</label>
                  <Textarea 
                    placeholder={language === 'es' ? "¿Qué problema resuelve? ¿Cuáles son sus características?" : "What problem does it solve? What are its features?"}
                    className="min-h-[120px] bg-background/50 border-border/50 focus:border-secondary/50"
                    value={formData.productDescription}
                    onChange={e => setFormData({...formData, productDescription: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">{language === 'es' ? 'Pistas de Audiencia (Opcional)' : 'Audience Clues (Optional)'}</label>
                  <Input 
                    placeholder="E.g. Gen Z, Tech-savvy, Developers..." 
                    className="bg-background/50 border-border/50 focus:border-secondary/50"
                    value={formData.existingTargetAudience}
                    onChange={e => setFormData({...formData, existingTargetAudience: e.target.value})}
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-secondary hover:bg-secondary/90 glow-accent mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {language === 'es' ? 'Sintetizando...' : 'Synthesizing...'}
                    </>
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" /> {t('persona.form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
          {result && (
            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                 <Card className="glass border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-primary flex items-center gap-2">
                          <Compass className="h-4 w-4" /> {language === 'es' ? 'Sectores Objetivo' : 'Target Sectors'}
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                       {result.targetSectors.map((sector, idx) => (
                         <Badge key={idx} variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                           {sector}
                         </Badge>
                       ))}
                    </CardContent>
                 </Card>
                 <Card className="glass border-secondary/20 bg-secondary/5">
                    <CardHeader className="pb-2">
                       <CardTitle className="text-sm font-headline uppercase tracking-widest text-secondary flex items-center gap-2">
                          <MapPin className="h-4 w-4" /> {language === 'es' ? 'Ubicaciones Estratégicas' : 'Strategic Locations'}
                       </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                       {result.targetLocations.map((loc, idx) => (
                         <Badge key={idx} variant="outline" className="border-secondary/30 text-secondary">
                           {loc}
                         </Badge>
                       ))}
                    </CardContent>
                 </Card>
              </div>

              <h3 className="text-2xl font-headline font-bold flex items-center gap-2 mt-4">
                <Sparkles className="h-6 w-6 text-primary" /> {language === 'es' ? 'Arquetipos Proyectados' : 'Projected Archetypes'}
              </h3>
              
              <div className="grid gap-6">
                {result.customerPersonas.map((persona, idx) => (
                  <Card key={idx} className="glass border-border/50 group hover:border-primary/30 transition-all overflow-hidden">
                    <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                      <div className="flex flex-col items-center gap-4 text-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-primary rounded-full blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity" />
                          <Avatar className="h-32 w-32 border-2 border-primary/30 relative">
                            <AvatarImage src={`https://picsum.photos/seed/astro-persona-${idx}/200`} />
                            <AvatarFallback className="bg-muted text-2xl font-headline">{persona.name[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <h4 className="text-xl font-headline font-bold">{persona.name}</h4>
                          <p className="text-sm text-muted-foreground">{persona.ageRange} • {persona.occupation}</p>
                        </div>
                        <div className="w-full pt-4 space-y-2">
                           <div className="flex justify-between text-[10px] uppercase tracking-tighter text-muted-foreground">
                              <span>{language === 'es' ? 'Probabilidad de Ajuste' : 'Match Probability'}</span>
                              <span className="text-primary font-bold">94%</span>
                           </div>
                           <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary glow-primary transition-all duration-1000" style={{ width: '94%' }} />
                           </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 grid sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase text-primary flex items-center gap-2">
                                <Compass className="h-3 w-3" /> {language === 'es' ? 'Intereses' : 'Interests'}
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {persona.interests.map((int, i) => (
                                  <span key={i} className="text-sm py-1 px-3 rounded-full bg-accent/10 border border-accent/20 text-accent-foreground">
                                    {int}
                                  </span>
                                ))}
                              </div>
                           </div>
                           <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase text-destructive flex items-center gap-2">
                                <ShieldAlert className="h-3 w-3" /> {language === 'es' ? 'Puntos de Dolor' : 'Pain Points'}
                              </h5>
                              <ul className="text-sm space-y-1 text-muted-foreground">
                                {persona.painPoints.map((p, i) => <li key={i} className="flex gap-2">
                                  <span className="text-destructive mt-0.5">•</span> {p}
                                </li>)}
                              </ul>
                           </div>
                        </div>
                        
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase text-emerald-500 flex items-center gap-2">
                                <Target className="h-3 w-3" /> {language === 'es' ? 'Objetivos' : 'Goals'}
                              </h5>
                              <ul className="text-sm space-y-1 text-muted-foreground">
                                {persona.goals.map((g, i) => <li key={i} className="flex gap-2">
                                  <span className="text-emerald-500 mt-0.5">•</span> {g}
                                </li>)}
                              </ul>
                           </div>
                           <div className="space-y-2">
                              <h5 className="text-xs font-bold uppercase text-blue-400 flex items-center gap-2">
                                <TrendingUp className="h-3 w-3" /> {language === 'es' ? 'Canales de Marketing' : 'Marketing Channels'}
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {persona.marketingChannels.map((ch, i) => (
                                  <Badge key={i} variant="outline" className="text-[10px] uppercase border-blue-400/30 text-blue-400">
                                    {ch}
                                  </Badge>
                                ))}
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {!result && !loading && (
             <div className="h-full flex flex-col items-center justify-center border border-dashed border-border/50 rounded-2xl bg-card/20 min-h-[500px] text-center p-12 space-y-4">
                <Users className="h-16 w-16 text-muted-foreground opacity-30" />
                <h3 className="text-2xl font-headline font-semibold">{language === 'es' ? 'Listo para Sintetizar' : 'Ready to Synthesize'}</h3>
                <p className="text-muted-foreground max-w-sm">{language === 'es' ? 'Introduce los parámetros de tu misión para generar arquetipos de identidad profunda.' : 'Enter your mission parameters to generate deep identity archetypes for your marketing campaign.'}</p>
             </div>
          )}
          
          {loading && (
             <div className="space-y-6">
                {[1, 2].map(i => (
                  <Card key={i} className="glass border-border/50">
                    <CardContent className="p-8">
                       <div className="flex animate-pulse space-x-4">
                          <div className="rounded-full bg-muted h-24 w-24"></div>
                          <div className="flex-1 space-y-4 py-1">
                             <div className="h-4 bg-muted rounded w-3/4"></div>
                             <div className="space-y-2">
                                <div className="h-4 bg-muted rounded"></div>
                                <div className="h-4 bg-muted rounded w-5/6"></div>
                             </div>
                          </div>
                       </div>
                    </CardContent>
                  </Card>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  )
}
