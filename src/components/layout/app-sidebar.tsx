"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  Users,
  PenTool,
  Calculator,
  BarChart3,
  Settings,
  Zap,
  Rocket,
  Download,
  Database,
  LogOut,
  Cpu,
  Orbit
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()
  const { t, language } = useLanguage()
  const { data: session } = useSession()

  const mainNav = [
    { title: t('nav.dashboard'), url: "/dashboard", icon: LayoutDashboard },
    { title: t('nav.analysis'), url: "/analysis", icon: Search },
    { title: t('nav.persona'), url: "/persona", icon: Users },
    { title: t('nav.content'), url: "/content", icon: PenTool },
  ]

  const campaignNav = [
    { title: t('nav.roi'), url: "/roi", icon: BarChart3 },
    { title: t('nav.tracking'), url: "/tracking", icon: Rocket },
    { title: t('nav.automation'), url: "/automation", icon: Orbit },
  ]

  const opsNav = [
    { title: t('nav.export'), url: "/export", icon: Download },
    { title: t('nav.connections'), url: "/connections", icon: Cpu },
    { title: t('nav.settings'), url: "/settings", icon: Settings },
  ]

  return (
    <Sidebar variant="inset" className="border-r border-border/50 bg-[#0c0a15]/50 backdrop-blur-xl">
      <SidebarHeader className="p-6">
        <Link href="/" className="flex items-center gap-3 group transition-all duration-300">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground glow-primary shadow-[0_0_20px_rgba(104,31,255,0.3)] group-hover:scale-110 transition-transform">
            <Rocket className="size-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-headline font-bold text-xl tracking-tighter text-white">AstroMark</span>
            <span className="text-[10px] text-primary/70 font-mono tracking-widest uppercase">Mission Control</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
            {t('nav.group.core')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`h-11 px-3 rounded-xl transition-all duration-300 group ${pathname === item.url ? 'bg-primary/10 text-primary glow-primary-sm border border-primary/20' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`size-5 transition-transform duration-300 group-hover:scale-110 ${pathname === item.url ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{item.title}</span>
                      {pathname === item.url && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(104,31,255,0.8)]" />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
            {t('nav.group.campaigns')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {campaignNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`h-11 px-3 rounded-xl transition-all duration-300 group ${pathname === item.url ? 'bg-primary/10 text-primary glow-primary-sm border border-primary/20' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`size-5 transition-transform duration-300 group-hover:scale-110 ${pathname === item.url ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 mb-2">
            {t('nav.group.ops')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {opsNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    className={`h-11 px-3 rounded-xl transition-all duration-300 group ${pathname === item.url ? 'bg-primary/10 text-primary glow-primary-sm border border-primary/20' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className={`size-5 transition-transform duration-300 group-hover:scale-110 ${pathname === item.url ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4">
           {session ? (
             <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
                   <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg">
                      {session.user?.email?.[0].toUpperCase()}
                   </div>
                   <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-white truncate">{session.user?.name || "Commander"}</span>
                      <span className="text-[10px] text-muted-foreground truncate">{session.user?.email}</span>
                   </div>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                  className="w-full justify-start text-xs text-muted-foreground hover:text-red-400 hover:bg-red-400/5 h-9"
                >
                   <LogOut className="mr-2 h-4 w-4" /> {language === 'es' ? 'Cerrar Sesión' : 'Sign Out'}
                </Button>
             </div>
           ) : (
             <Link href="/login" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                   <Users className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-white">{language === 'es' ? 'Iniciar Sesión' : 'Log In'}</span>
                   <span className="text-[10px] text-muted-foreground">Neural Identity</span>
                </div>
             </Link>
           )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
