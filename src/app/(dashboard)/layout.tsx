"use client"

import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full overflow-hidden space-grid bg-background">
        {/* Background Atmosphere */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
           <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]" />
        </div>
        
        <AppSidebar />
        <SidebarInset className="bg-transparent">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/50 px-4 glass sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-1 items-center justify-between">
               <h1 className="font-headline font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Sector Overview
               </h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6 md:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  )
}
