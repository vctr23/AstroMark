"use client"

import React, { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Zap, 
  Filter, 
  Send, 
  Rocket, 
  RefreshCcw, 
  Plus, 
  MoreHorizontal,
  Mail,
  UserPlus,
  BarChart3,
  Calendar,
  Trash2,
  Settings2,
  X,
  Globe
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"

type PlanetType = 'saturn' | 'mars' | 'earth' | 'jupiter' | 'neptune'

interface Node {
  id: string
  type: 'trigger' | 'filter' | 'action'
  planetType: PlanetType
  label: string
  icon: React.ReactNode
  x: number
  y: number
  color: string
}

interface Star {
  width: string
  height: string
  left: string
  top: string
  animationDelay: string
  opacity: number
}

const INITIAL_NODES: Node[] = [
  { id: "node-1", type: "trigger", planetType: 'saturn', label: "New Lead", icon: <UserPlus className="h-6 w-6" />, x: 100, y: 150, color: "from-amber-300 via-yellow-500 to-orange-700" },
  { id: "node-2", type: "filter", planetType: 'mars', label: "Scoring > 50", icon: <Filter className="h-6 w-6" />, x: 350, y: 150, color: "from-red-500 via-orange-700 to-red-900" },
  { id: "node-3", type: "action", planetType: 'earth', label: "Send Email", icon: <Mail className="h-6 w-6" />, x: 600, y: 100, color: "from-blue-400 via-blue-600 to-indigo-900" },
  { id: "node-4", type: "action", planetType: 'jupiter', label: "Alert Team", icon: <BarChart3 className="h-6 w-6" />, x: 600, y: 250, color: "from-orange-200 via-orange-400 to-brown-600" },
]

import { saveAutomation, getAutomation } from "./actions"

export default function AutomationPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [nodes, setNodes] = useState<Node[]>(INITIAL_NODES)
  const [draggingNode, setDraggingNode] = useState<string | null>(null)
  const [stars, setStars] = useState<Star[]>([])
  const [editingNode, setEditingNode] = useState<Node | null>(null)
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadData = async () => {
      const data = await getAutomation()
      if (data && data.nodes) {
        setNodes(data.nodes as unknown as Node[])
      }
      setLoading(false)
    }
    loadData()

    const newStars = [...Array(50)].map(() => ({
      width: Math.random() * 3 + 'px',
      height: Math.random() * 3 + 'px',
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      opacity: Math.random() * 0.7 + 0.3
    }))
    setStars(newStars)
  }, [])

  const handleMouseDown = (id: string) => {
    setDraggingNode(id)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNode || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - 40
    const y = e.clientY - rect.top - 40

    setNodes(prev => prev.map(node => 
      node.id === draggingNode ? { ...node, x, y } : node
    ))
  }

  const handleMouseUp = () => {
    setDraggingNode(null)
  }

  const addNode = (type: 'trigger' | 'filter' | 'action') => {
    const id = `node-${Date.now()}`
    const x = 50 + Math.random() * 100
    const y = 50 + Math.random() * 100
    
    let newNode: Node
    
    if (type === 'trigger') {
      newNode = { id, type, planetType: 'saturn', label: "New Trigger", icon: <Zap className="h-6 w-6" />, x, y, color: "from-amber-300 via-yellow-500 to-orange-700" }
    } else if (type === 'filter') {
      newNode = { id, type, planetType: 'mars', label: "New Filter", icon: <Filter className="h-6 w-6" />, x, y, color: "from-red-500 via-orange-700 to-red-900" }
    } else {
      const pTypes: PlanetType[] = ['earth', 'jupiter', 'neptune']
      const pType = pTypes[Math.floor(Math.random() * pTypes.length)]
      newNode = { 
        id, 
        type, 
        planetType: pType, 
        label: "New Action", 
        icon: <Send className="h-6 w-6" />, 
        x, y, 
        color: pType === 'earth' ? "from-blue-400 via-blue-600 to-indigo-900" : pType === 'jupiter' ? "from-orange-200 via-orange-400 to-brown-600" : "from-blue-600 via-blue-800 to-blue-950"
      }
    }
    
    setNodes([...nodes, newNode])
    toast({
      title: language === 'es' ? "Nodo Añadido" : "Node Added",
      description: language === 'es' ? `Se ha creado un nuevo ${type}.` : `A new ${type} has been created.`,
    })
  }

  const removeNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id))
    toast({
      title: language === 'es' ? "Nodo Eliminado" : "Node Removed",
      variant: "destructive"
    })
  }

  const handleDeploy = async () => {
    const result = await saveAutomation("Main Galaxy", nodes)
    
    if (result.success) {
      toast({
        title: language === 'es' ? "Constelación Guardada" : "Constellation Saved",
        description: language === 'es' ? "El flujo de trabajo ha sido sincronizado con la base de datos neural." : "The workflow has been synchronized with the neural database.",
      })
    } else {
      toast({
        title: "Error",
        description: result.error || "Failed to save",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-headline font-bold tracking-tight">{t('automation.title')}</h2>
          <p className="text-muted-foreground">{t('automation.desc')}</p>
        </div>
        <div className="flex items-center gap-2">
           <Button variant="outline" className="border-primary/20 bg-background/50" onClick={() => setNodes(INITIAL_NODES)}>
              <RefreshCcw className="mr-2 h-4 w-4" /> {t('automation.reset')}
           </Button>
           <Button className="bg-primary hover:bg-primary/90 glow-primary" onClick={handleDeploy}>
              <Rocket className="mr-2 h-4 w-4" /> {t('automation.deploy')}
           </Button>
        </div>
      </div>

      <div 
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-1 min-h-[600px] relative rounded-3xl border border-primary/20 bg-[#06040a] overflow-hidden cursor-crosshair group"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(104,31,255,0.08),transparent)]" />
          {stars.map((star, i) => (
            <div 
              key={i}
              className="absolute bg-white rounded-full animate-pulse-glow"
              style={{
                width: star.width,
                height: star.height,
                left: star.left,
                top: star.top,
                animationDelay: star.animationDelay,
                opacity: star.opacity
              }}
            />
          ))}
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(104,31,255,0.1)" />
              <stop offset="50%" stopColor="rgba(104,31,255,0.5)" />
              <stop offset="100%" stopColor="rgba(104,31,255,0.1)" />
            </linearGradient>
          </defs>
          {nodes.length > 1 && nodes.slice(0, -1).map((node, i) => {
             const nextNode = nodes[i+1]
             return (
              <path 
                key={`${node.id}-${nextNode.id}`}
                d={`M ${node.x + 40} ${node.y + 40} L ${nextNode.x + 40} ${nextNode.y + 40}`} 
                stroke="url(#grad-line)" strokeWidth="2" strokeDasharray="5,5" fill="none"
                className="animate-dash"
              />
             )
          })}
        </svg>

        {nodes.map((node) => (
          <div
            key={node.id}
            style={{ 
              left: node.x, 
              top: node.y,
              zIndex: draggingNode === node.id ? 50 : 10
            }}
            className="absolute select-none transition-transform duration-300 group/node"
          >
            <div 
              onMouseDown={() => handleMouseDown(node.id)}
              className="cursor-grab active:cursor-grabbing relative flex items-center justify-center w-20 h-20"
            >
              {/* Saturn Rings */}
              {node.planetType === 'saturn' && (
                <div className="absolute w-[140%] h-[40%] border-[6px] border-amber-200/30 rounded-[50%] rotate-[25deg] pointer-events-none z-[-1] shadow-[0_0_15px_rgba(251,191,36,0.1)]" />
              )}
              
              <div 
                className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${node.color} flex items-center justify-center shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),0_0_40px_rgba(0,0,0,0.9)] overflow-hidden transition-all group-hover/node:scale-110`}
              >
                {/* Atmospheric Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_70%)]" />
                
                {/* Surface Detail */}
                <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
                
                {/* Icon */}
                <div className="text-white relative z-10 filter drop-shadow-lg">
                  {node.icon}
                </div>
              </div>

              {/* Label and Badge */}
              <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <Badge variant="outline" className="bg-black/60 backdrop-blur-md border-primary/30 whitespace-nowrap px-2 py-0 text-[10px] uppercase font-bold tracking-tighter text-white">
                    {t(`automation.node.${node.type}`)}
                  </Badge>
                  <span className="text-[12px] font-bold mt-1 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)] whitespace-nowrap">{node.label}</span>
              </div>
            </div>

            {/* Node Actions Overlay */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover/node:opacity-100 transition-all transform group-hover/node:-translate-y-1 z-20">
               <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      onClick={() => setEditingNode(node)}
                      className="p-2 rounded-full bg-black/80 border border-primary/30 text-white hover:bg-primary transition-colors"
                    >
                      <Settings2 className="h-3 w-3" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="glass border-primary/20 sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-white">{language === 'es' ? 'Configurar Planeta' : 'Configure Planet'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <label className="text-sm font-medium text-white/70">{language === 'es' ? 'Nombre del Nodo' : 'Node Name'}</label>
                        <Input 
                          defaultValue={node.label}
                          onChange={(e) => {
                            const newLabel = e.target.value
                            setNodes(nodes.map(n => n.id === node.id ? { ...n, label: newLabel } : n))
                          }}
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </DialogContent>
               </Dialog>
               <button 
                 onClick={() => removeNode(node.id)}
                 className="p-2 rounded-full bg-black/80 border border-primary/30 text-white hover:bg-destructive transition-colors"
               >
                 <Trash2 className="h-3 w-3" />
               </button>
            </div>
          </div>
        ))}

        {/* Toolbar Overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 p-3 rounded-2xl glass border-primary/30 z-50 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
           <ToolbarIcon 
             icon={<Zap className="h-5 w-5" />} 
             label={t('automation.node.trigger')} 
             onClick={() => addNode('trigger')}
           />
           <ToolbarIcon 
             icon={<Filter className="h-5 w-5" />} 
             label={t('automation.node.filter')} 
             onClick={() => addNode('filter')}
           />
           <ToolbarIcon 
             icon={<Send className="h-5 w-5" />} 
             label={t('automation.node.action')} 
             onClick={() => addNode('action')}
           />
           <div className="w-px h-10 bg-white/10 mx-2" />
           <ToolbarIcon 
             icon={<Plus className="h-5 w-5" />} 
             label={language === 'es' ? 'Añadir' : 'Add'} 
             active 
             onClick={() => addNode('action')}
           />
        </div>
      </div>
    </div>
  )
}

function ToolbarIcon({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl transition-all hover:bg-white/10 flex flex-col items-center gap-1 group ${active ? 'bg-primary/30 text-primary shadow-[0_0_15px_rgba(104,31,255,0.3)]' : 'text-white/60'}`}
    >
       <div className="group-hover:scale-110 transition-transform">{icon}</div>
       <span className="text-[9px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity mt-1">{label}</span>
    </button>
  )
}
