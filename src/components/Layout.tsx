import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu, X, Home, Baby, Syringe, Bug, Heart,
  Droplets, ThermometerSun, Stethoscope, ClipboardList,
  BookOpen, Settings as SettingsIcon
} from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/development', label: 'Development', icon: Baby },
  { path: '/vaccines', label: 'Vaccines', icon: Syringe },
  { path: '/infections', label: 'Infections', icon: Bug },
  { path: '/congenital', label: 'Congenital', icon: Heart },
  { path: '/acute-care', label: 'Acute Care', icon: Stethoscope },
  { path: '/dehydration', label: 'Dehydration', icon: Droplets },
  { path: '/febrile-seizure', label: 'Febrile Seizure', icon: ThermometerSun },
  { path: '/cases', label: 'Cases', icon: ClipboardList },
  { path: '/assessment', label: 'Assessment', icon: BookOpen },
  { path: '/glossary', label: 'Glossary', icon: BookOpen },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
]

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary">Pediatrics Master</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary">Pediatrics Master</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Interactive Learning Platform
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Educational purposes only
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
          {children}
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
