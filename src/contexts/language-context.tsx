"use client"

import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Sidebar
    'nav.dashboard': 'Dashboard',
    'nav.analysis': 'Market Analysis',
    'nav.persona': 'Personas',
    'nav.content': 'Content Studio',
    'nav.roi': 'ROI Calculator',
    'nav.tracking': 'Tracking',
    'nav.automation': 'Automation',
    'nav.export': 'Export Data',
    'nav.connections': 'AI Connections',
    'nav.settings': 'Settings',
    'nav.group.core': 'Core Intelligence',
    'nav.group.campaigns': 'Campaigns',
    'nav.group.ops': 'Operations',
    'nav.status': 'Proxima System Status',
    'nav.nominal': 'ALL SYSTEMS NOMINAL',

    // Dashboard
    'dash.title': 'Mission Control',
    'dash.welcome': 'Welcome back, Commander. Marketing systems are operational.',
    'dash.launch': 'Launch Campaign',
    'dash.map': 'System Map',
    'dash.active': 'Active Campaigns',
    'dash.reach': 'Target Reach',
    'dash.conv': 'Conversion Rate',
    'dash.leads': 'New Leads',
    'dash.intel': 'Intelligence Feed',
    'dash.intel.desc': 'Real-time market observations and AI insights.',
    'dash.quick': 'Quick Actions',
    'dash.quick.desc': 'Frequently used automation protocols.',
    'dash.lastcycle': 'from last cycle',
    'dash.feed.gap': 'New Market Gap Detected',
    'dash.feed.gap.desc': 'Competitor Alpha has reduced operations in Sector 7. AI recommends targeting this void.',
    'dash.feed.investigate': 'Investigate',
    'dash.quick.persona.desc': 'Define your ideal traveler.',
    'dash.quick.slogan': 'Slogan Forge',
    'dash.quick.slogan.desc': 'Instant catchy copy.',
    'dash.quick.roi.desc': 'Calculate fuel efficiency.',

    // Settings
    'settings.title': 'System Configuration',
    'settings.desc': 'Manage your interface, neural links, and data bridges.',
    'settings.lang.title': 'Linguistic Protocols',
    'settings.lang.desc': 'Select the primary communication frequency for the interface.',
    'settings.lang.toggle': 'Current Language: English',
    'settings.data.title': 'Data Extraction',
    'settings.data.desc': 'Export your marketing intelligence for external processing.',
    'settings.api.title': 'External Neural Links (APIs)',
    'settings.api.desc': 'Connect AstroMark to your preferred Large Language Models.',
    'settings.security.title': 'Security & Protocols',
    'settings.save': 'Save All Configurations',
    'settings.connected': 'Connected',
    'conn.title': 'Neural Bridge Control',
    'conn.desc': 'Establish and monitor your connections with the most advanced Large Language Models.',
    'conn.status.active': 'Link Active',
    'conn.status.inactive': 'Link Offline',
    'conn.test': 'Test Neural Link',
    'conn.save': 'Save Configuration',
    'conn.provider.gemini': 'Google Gemini',
    'conn.provider.openai': 'OpenAI',
    'conn.provider.anthropic': 'Anthropic',
    'conn.api.placeholder': 'Enter your secure API key...',
    'conn.key.show': 'Show',
    'conn.key.hide': 'Hide',

    // Analysis
    'analysis.title': 'Market Pulse',
    'analysis.desc': 'Identify cosmic gaps and navigate the competitive nebula.',
    'analysis.form.title': 'Probe Configuration',
    'analysis.form.desc': 'Enter an identifier to calibrate our sensors.',
    'analysis.form.identifier': 'URL, Name, or Email',
    'analysis.form.context': 'Additional Context',
    'analysis.form.submit': 'Scan Market',

    // Persona
    'persona.title': 'Persona Forge',
    'persona.desc': 'Holographic rendering of your ideal civilization segments.',
    'persona.form.title': 'Identity Parameters',
    'persona.form.submit': 'Forge Personas',

    // ROI
    'roi.title': 'Yield Predictor',
    'roi.desc': 'Calculate the efficiency of your resource allocation across the sector.',

    // Automation
    'automation.title': 'Automation Galaxy',
    'automation.desc': 'Architect celestial workflows and automated marketing sequences.',
    'automation.deploy': 'Deploy Constellation',
    'automation.reset': 'Reset Orbit',
    'automation.node.trigger': 'Trigger',
    'automation.node.filter': 'Filter',
    'automation.node.action': 'Action',

    // Tracking
    'tracking.title': 'Telemetry & Tracking',
    'tracking.desc': 'Observe campaign trajectories and constellation performance.',
    'tracking.performance': 'Celestial Performance',
    'tracking.reach': 'Sector Reach',
    'tracking.conversions': 'Engagement Orbit',
    'tracking.active': 'Active Probes',
  },
  es: {
    // Sidebar
    'nav.dashboard': 'Panel de Control',
    'nav.analysis': 'Análisis de Mercado',
    'nav.persona': 'Personas',
    'nav.content': 'Estudio Creativo',
    'nav.roi': 'Calculadora ROI',
    'nav.tracking': 'Seguimiento',
    'nav.automation': 'Automatización',
    'nav.export': 'Exportar Datos',
    'nav.connections': 'Conexiones IA',
    'nav.settings': 'Ajustes',
    'nav.group.core': 'Inteligencia Núcleo',
    'nav.group.campaigns': 'Campañas',
    'nav.group.ops': 'Operaciones',
    'nav.status': 'Estado del Sistema Próxima',
    'nav.nominal': 'TODOS LOS SISTEMAS NOMINALES',

    // Dashboard
    'dash.title': 'Control de Misión',
    'dash.welcome': 'Bienvenido de nuevo, Comandante. Los sistemas de marketing están operativos.',
    'dash.launch': 'Lanzar Campaña',
    'dash.map': 'Mapa del Sistema',
    'dash.active': 'Campañas Activas',
    'dash.reach': 'Alcance Objetivo',
    'dash.conv': 'Tasa de Conversión',
    'dash.leads': 'Nuevos Prospectos',
    'dash.intel': 'Feed de Inteligencia',
    'dash.intel.desc': 'Observaciones de mercado en tiempo real e insights de IA.',
    'dash.quick': 'Acciones Rápidas',
    'dash.quick.desc': 'Protocolos de automatización usados frecuentemente.',
    'dash.lastcycle': 'desde el último ciclo',
    'dash.feed.gap': 'Nueva Brecha de Mercado Detectada',
    'dash.feed.gap.desc': 'El Competidor Alfa ha reducido operaciones en el Sector 7. La IA recomienda apuntar a este vacío.',
    'dash.feed.investigate': 'Investigar',
    'dash.quick.persona.desc': 'Define a tu viajero ideal.',
    'dash.quick.slogan': 'Forja de Eslóganes',
    'dash.quick.slogan.desc': 'Copy pegadizo instantáneo.',
    'dash.quick.roi.desc': 'Calcula la eficiencia del combustible.',

    // Settings
    'settings.title': 'Configuración del Sistema',
    'settings.desc': 'Gestiona tu interfaz, enlaces neuronales y puentes de datos.',
    'settings.lang.title': 'Protocolos Lingüísticos',
    'settings.lang.desc': 'Selecciona la frecuencia de comunicación principal para la interfaz.',
    'settings.lang.toggle': 'Idioma actual: Español',
    'settings.data.title': 'Extracción de Datos',
    'settings.data.desc': 'Exporta tu inteligencia de marketing para procesamiento externo.',
    'settings.api.title': 'Enlaces Neuronales Externos (APIs)',
    'settings.api.desc': 'Conecta AstroMark a tus Modelos de Lenguaje preferidos.',
    'settings.security.title': 'Seguridad y Protocolos',
    'settings.save': 'Guardar Todas las Configuraciones',
    'settings.connected': 'Conectado',
    'conn.title': 'Control de Puentes Neurales',
    'conn.desc': 'Establece y monitorea tus conexiones con los Modelos de Lenguaje más avanzados.',
    'conn.status.active': 'Enlace Activo',
    'conn.status.inactive': 'Enlace Offline',
    'conn.test': 'Probar Enlace',
    'conn.save': 'Guardar Configuración',
    'conn.provider.gemini': 'Google Gemini',
    'conn.provider.openai': 'OpenAI',
    'conn.provider.anthropic': 'Anthropic',
    'conn.api.placeholder': 'Introduce tu clave de API segura...',
    'conn.key.show': 'Mostrar',
    'conn.key.hide': 'Ocultar',

    // Analysis
    'analysis.title': 'Pulso de Mercado',
    'analysis.desc': 'Identifica brechas cósmicas y navega por la nebulosa competitiva.',
    'analysis.form.title': 'Configuración de Sonda',
    'analysis.form.desc': 'Introduce un identificador para calibrar nuestros sensores.',
    'analysis.form.identifier': 'URL, Nombre o Email',
    'analysis.form.context': 'Contexto Adicional',
    'analysis.form.submit': 'Escanear Mercado',

    // Persona
    'persona.title': 'Forja de Personas',
    'persona.desc': 'Renderizado holográfico de tus segmentos de civilización ideales.',
    'persona.form.title': 'Parámetros de Identidad',
    'persona.form.submit': 'Forjar Personas',

    // ROI
    'roi.title': 'Predictor de Rendimiento',
    'roi.desc': 'Calcula la eficiencia de tu asignación de recursos en todo el sector.',

    // Automation
    'automation.title': 'Galaxia de Automatización',
    'automation.desc': 'Arquitecta flujos de trabajo celestiales y secuencias de marketing automáticas.',
    'automation.deploy': 'Desplegar Constelación',
    'automation.reset': 'Reiniciar Órbita',
    'automation.node.trigger': 'Disparador',
    'automation.node.filter': 'Filtro',
    'automation.node.action': 'Acción',

    // Tracking
    'tracking.title': 'Telemetría y Seguimiento',
    'tracking.desc': 'Observa las trayectorias de las campañas y el rendimiento de las constelaciones.',
    'tracking.performance': 'Rendimiento Celestial',
    'tracking.reach': 'Alcance del Sector',
    'tracking.conversions': 'Órbita de Interacción',
    'tracking.active': 'Sondas Activas',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
