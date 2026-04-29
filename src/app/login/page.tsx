"use client"

import React, { useState, useEffect } from "react"
import { Rocket, Github, Chrome, ArrowRight, Zap, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [stars, setStars] = useState<{width:string, height:string, left:string, top:string, delay:string}[]>([])
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const newStars = [...Array(100)].map(() => ({
      width: Math.random() * 2 + 'px',
      height: Math.random() * 2 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      delay: Math.random() * 5 + 's'
    }))
    setStars(newStars)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    try {
      await signIn("credentials", { 
        email, 
        callbackUrl: "/dashboard" 
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#06040a] flex items-center justify-center relative overflow-hidden p-6 selection:bg-primary/30">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(104,31,255,0.1),transparent)]" />
        {stars.map((star, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse opacity-40"
            style={{
              width: star.width,
              height: star.height,
              left: star.left,
              top: star.top,
              animationDelay: star.delay
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex justify-center mb-8">
           <div className="flex items-center gap-3">
              <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground glow-primary shadow-[0_0_30px_rgba(104,31,255,0.5)]">
                 <Rocket className="size-7" />
              </div>
              <span className="font-headline font-bold text-3xl tracking-tighter text-white">AstroMark</span>
           </div>
        </div>

        <Card className="glass border-primary/20 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-headline font-bold text-white tracking-tight">Access Neural Link</CardTitle>
            <CardDescription className="text-muted-foreground">Authenticate your identity to board the AstroMark station.</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-primary">Quantum ID (Email)</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="commander@astromark.ai" 
                  className="bg-white/5 border-primary/10 focus-visible:ring-primary text-white h-12"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold glow-primary group"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Continue with Neural Link <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </Button>
            </CardContent>
          </form>
          
          <CardFooter className="flex flex-col gap-4 border-t border-white/5 bg-white/[0.02] p-6">
             <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest justify-center">
                <ShieldCheck className="h-3 w-3 text-emerald-500" /> Secure Quantum Protocol Active
             </div>
             <p className="text-xs text-center text-muted-foreground">
                By boarding, you agree to our <Link href="#" className="text-primary hover:underline">Interstellar Terms</Link> and <Link href="#" className="text-primary hover:underline">Privacy Manifest</Link>.
             </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
           <p className="text-sm text-muted-foreground">
              New to the system? <Link href="#" className="text-primary font-bold hover:underline">Request Access</Link>
           </p>
        </div>
      </div>
    </div>
  )
}
