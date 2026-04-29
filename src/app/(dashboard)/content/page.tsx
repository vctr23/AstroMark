"use client"

import { useState } from "react"
import { generateMarketingIdeasAndSlogans, type GenerateMarketingIdeasAndSlogansOutput } from "@/ai/flows/generate-marketing-ideas-and-slogans"
import { generateMarketingBannerConcepts, type GenerateMarketingBannerConceptsOutput } from "@/ai/flows/generate-marketing-banner-concepts"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  PenTool, 
  Sparkles, 
  Copy, 
  Layout, 
  Zap, 
  Rocket, 
  Loader2,
  Check,
  Palette,
  Megaphone
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { Badge } from "@/components/ui/badge"

export default function ContentStudioPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [ideas, setIdeas] = useState<GenerateMarketingIdeasAndSlogansOutput | null>(null)
  const [banners, setBanners] = useState<GenerateMarketingBannerConceptsOutput | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    audience: "",
    goal: "Brand Awareness"
  })

  async function generateIdeas() {
    setLoading(true)
    try {
      const res = await generateMarketingIdeasAndSlogans({
        productDescription: formData.description,
        targetAudience: formData.audience,
        language
      })
      setIdeas(res)
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: language === 'es' ? "Error del Estudio" : "Studio Error",
        description: language === 'es' 
          ? "No se pudo forjar el contenido debido a una congestión en el sistema de IA. Prueba de nuevo ahora."
          : "Could not forge content due to AI system congestion. Try again now.",
      })
    } finally {
      setLoading(false)
    }
  }

  async function generateBannerConcepts() {
    setLoading(true)
    try {
      const res = await generateMarketingBannerConcepts({
        businessName: formData.name,
        businessDescription: formData.description,
        targetAudience: formData.audience,
        campaignGoal: formData.goal,
        keywords: [formData.name, "Future", "Innovation"],
        language
      })
      setBanners(res)
    } catch (e: any) {
      toast({
        variant: "destructive",
        title: language === 'es' ? "Error de Diseño" : "Design Error",
        description: language === 'es' 
          ? "Los protocolos visuales están saturados. Reinténtalo en unos momentos."
          : "Visual protocols are saturated. Retry in a few moments.",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: language === 'es' ? "Copiado al enlace neural" : "Copied to neural link",
      description: language === 'es' ? "Texto listo para despliegue." : "Text is ready for deployment.",
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-headline font-bold tracking-tight">{language === 'es' ? 'Estudio Creativo' : 'Content Studio'}</h2>
        <p className="text-muted-foreground text-lg">{language === 'es' ? 'Transmite tu visión a través del multiverso con creatividades impulsadas por IA.' : 'Broadcast your vision across the multi-verse with AI-driven creative.'}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
           <Card className="glass border-primary/20 sticky top-24">
              <CardHeader>
                 <CardTitle className="font-headline">{language === 'es' ? 'Parámetros Creativos' : 'Creative Parameters'}</CardTitle>
                 <CardDescription>{language === 'es' ? 'Define la frecuencia de tu mensaje.' : 'Define your message frequency.'}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-sm font-medium">{language === 'es' ? 'Nombre del Negocio' : 'Business Name'}</label>
                    <Input 
                      placeholder={language === 'es' ? "Empresa Galáctica..." : "Galaxy Enterprises..."} 
                      className="bg-background/50"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">{language === 'es' ? 'Mensaje Principal' : 'Core Message'}</label>
                    <Textarea 
                      placeholder={language === 'es' ? "¿Qué estamos transmitiendo?" : "What are we broadcasting?"} 
                      className="min-h-[100px] bg-background/50"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-sm font-medium">{language === 'es' ? 'Especie Objetivo (Audiencia)' : 'Target Species (Audience)'}</label>
                    <Input 
                      placeholder={language === 'es' ? "¿Quién debería oír esto?" : "Who should hear this?"} 
                      className="bg-background/50"
                      value={formData.audience}
                      onChange={e => setFormData({...formData, audience: e.target.value})}
                    />
                 </div>
                 <div className="space-y-4 pt-4">
                    <Button 
                      onClick={generateIdeas} 
                      disabled={loading || !formData.description}
                      className="w-full bg-primary hover:bg-primary/90 glow-primary"
                    >
                       {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                       {language === 'es' ? 'Forjar Ideas y Eslóganes' : 'Forge Ideas & Slogans'}
                    </Button>
                    <Button 
                      onClick={generateBannerConcepts} 
                      disabled={loading || !formData.name}
                      variant="outline"
                      className="w-full border-secondary/30 text-secondary hover:bg-secondary/10"
                    >
                       {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Layout className="mr-2 h-4 w-4" />}
                       {language === 'es' ? 'Diseñar Conceptos de Banner' : 'Design Banner Concepts'}
                    </Button>
                 </div>
              </CardContent>
           </Card>
        </div>

        <div className="lg:col-span-8">
           <Tabs defaultValue="ideas" className="space-y-6">
              <TabsList className="bg-muted/30 p-1 border border-border/50">
                 <TabsTrigger value="ideas" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{language === 'es' ? 'Ideas de Campaña' : 'Campaign Ideas'}</TabsTrigger>
                 <TabsTrigger value="slogans" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{language === 'es' ? 'Eslóganes' : 'Slogans'}</TabsTrigger>
                 <TabsTrigger value="banners" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">{language === 'es' ? 'Conceptos Visuales' : 'Visual Concepts'}</TabsTrigger>
              </TabsList>

              <TabsContent value="ideas" className="space-y-4">
                 {ideas ? (
                    ideas.campaignIdeas.map((idea, i) => (
                       <Card key={i} className="glass border-border/50 group hover:border-primary/40 transition-all">
                          <CardHeader className="pb-3 flex flex-row items-center justify-between">
                             <div className="bg-primary/10 p-2 rounded-lg"><Rocket className="h-5 w-5 text-primary" /></div>
                             <Button variant="ghost" size="icon" onClick={() => copyToClipboard(idea)}>
                                <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                             </Button>
                          </CardHeader>
                          <CardContent>
                             <p className="text-lg font-medium leading-relaxed italic">"{idea}"</p>
                          </CardContent>
                       </Card>
                    ))
                 ) : (
                    <EmptyState icon={<Megaphone className="h-12 w-12" />} title={language === 'es' ? 'Listo para Emitir' : 'Broadcast Ready'} desc={language === 'es' ? 'Inicia la Forja a la izquierda para generar ideas de campaña revolucionarias.' : 'Initiate the Forge on the left to generate revolutionary campaign ideas.'} />
                 )}
              </TabsContent>

              <TabsContent value="slogans" className="space-y-4">
                 {ideas ? (
                   <div className="grid gap-3">
                      {ideas.slogans.map((slogan, i) => (
                         <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 glass hover:bg-accent/30 transition-colors group">
                            <span className="font-headline text-lg font-bold">"{slogan}"</span>
                            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(slogan)}>
                               <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                            </Button>
                         </div>
                      ))}
                   </div>
                 ) : (
                   <EmptyState icon={<Zap className="h-12 w-12" />} title={language === 'es' ? 'Copia Electrizante' : 'Electrifying Copy'} desc={language === 'es' ? 'Genera frases pegajosas que resonarán en todo el cinturón de asteroides.' : 'Generate catchy taglines that will echo through the asteroid belt.'} />
                 )}
              </TabsContent>

              <TabsContent value="banners" className="space-y-6">
                 {banners ? (
                    banners.bannerConcepts.map((concept, i) => (
                       <Card key={i} className="glass border-secondary/20 overflow-hidden">
                          <div className="bg-secondary/10 px-6 py-3 flex justify-between items-center border-b border-secondary/10">
                             <h4 className="font-headline font-bold text-secondary uppercase tracking-wider">{concept.conceptName}</h4>
                             <Badge variant="outline" className="border-secondary/30 text-secondary">{language === 'es' ? 'Concepto Visual' : 'Visual Concept'} {i+1}</Badge>
                          </div>
                          <CardContent className="p-6 space-y-6">
                             <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                   <div>
                                      <h5 className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{language === 'es' ? 'Texto del Titular' : 'Headline Text'}</h5>
                                      <p className="text-xl font-headline font-bold leading-tight italic">"{concept.headline}"</p>
                                   </div>
                                   <div>
                                      <h5 className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{language === 'es' ? 'Cuerpo de Apoyo' : 'Supporting Body'}</h5>
                                      <p className="text-sm text-muted-foreground">{concept.bodyText}</p>
                                   </div>
                                   <div>
                                      <h5 className="text-[10px] font-bold uppercase text-muted-foreground mb-1 flex items-center gap-1">
                                        <Palette className="h-3 w-3" /> {language === 'es' ? 'Sugerencias de Diseño' : 'Layout Suggestions'}
                                      </h5>
                                      <p className="text-xs italic text-muted-foreground bg-muted/20 p-2 rounded border border-border/50">{concept.layoutSuggestions}</p>
                                   </div>
                                </div>
                                <div className="space-y-3">
                                   <h5 className="text-[10px] font-bold uppercase text-muted-foreground mb-1">{language === 'es' ? 'Protocolo de Imagen' : 'Imagery Protocol'}</h5>
                                   <div className="rounded-xl border border-dashed border-secondary/30 p-4 bg-background/40">
                                      <p className="text-xs text-muted-foreground leading-relaxed leading-relaxed select-all">
                                         {concept.imageryDescription}
                                      </p>
                                   </div>
                                   <Button variant="secondary" className="w-full text-xs h-8">
                                      {language === 'es' ? 'Lanzar Generador de Imágenes' : 'Launch Image Generator'}
                                   </Button>
                                </div>
                             </div>
                          </CardContent>
                       </Card>
                    ))
                 ) : (
                    <EmptyState icon={<Palette className="h-12 w-12" />} title={language === 'es' ? 'Síntesis Visual' : 'Visual Synthesis'} desc={language === 'es' ? 'Desarrolla protocolos visuales completos para tus banners de marketing.' : 'Develop comprehensive visual protocols for your marketing banners.'} />
                 )}
              </TabsContent>
           </Tabs>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-12 border border-dashed border-border/50 rounded-2xl bg-card/10 text-center space-y-4">
       <div className="opacity-30">{icon}</div>
       <div className="space-y-2">
          <h3 className="text-xl font-headline font-semibold">{title}</h3>
          <p className="text-muted-foreground max-w-sm text-sm">{desc}</p>
       </div>
    </div>
  )
}
