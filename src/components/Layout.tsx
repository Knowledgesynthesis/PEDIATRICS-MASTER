import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BookMarked, BookOpen, Calculator, ClipboardList, Home, Layers, ListChecks, Menu, Moon, Settings as SettingsIcon, Sun, X } from 'lucide-react'
import { modules } from '@/content/modules'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'
import { CONTENT_REVIEWED } from '@/content/meta'

const practice = [
  { path: '/cases', label: 'Clinical cases', icon: ClipboardList },
  { path: '/assessment', label: 'Question bank', icon: ListChecks },
  { path: '/flashcards', label: 'Rapid review cards', icon: Layers },
]

const reference = [
  { path: '/tools', label: 'All tools', icon: Calculator },
  { path: '/glossary', label: 'Glossary', icon: BookOpen },
  { path: '/references', label: 'References', icon: BookMarked },
  { path: '/settings', label: 'Settings & about', icon: SettingsIcon },
]

function NavItem({ to, children, end }: { to: string; children: ReactNode; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        )
      }
    >
      {children}
    </NavLink>
  )
}

function NavGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="px-3 pb-1 pt-4 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground/80">{title}</p>
      {children}
    </div>
  )
}

function ThemeButton() {
  const { darkMode, toggleDarkMode } = useStore()
  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
      aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">
        Skip to content
      </a>

      {/* Mobile header */}
      <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b bg-card/95 px-2 backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="sidebar"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link to="/" className="text-base font-bold tracking-tight">
          Pediatrics <span className="text-primary">Master</span>
        </Link>
        <ThemeButton />
      </header>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r bg-card pt-14 transition-transform duration-200 lg:translate-x-0 lg:pt-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Primary"
      >
        <div className="hidden items-center justify-between border-b px-5 py-4 lg:flex">
          <Link to="/" className="leading-tight">
            <span className="block text-lg font-bold tracking-tight">
              Pediatrics <span className="text-primary">Master</span>
            </span>
            <span className="block text-xs text-muted-foreground">Evidence-based pediatrics</span>
          </Link>
          <ThemeButton />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 pb-4 pt-2">
          <NavItem to="/" end>
            <Home className="h-4 w-4" aria-hidden /> Home & learning path
          </NavItem>
          <NavGroup title="Learn">
            {modules.map((m) => (
              <NavItem key={m.id} to={m.path}>
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded bg-muted text-[0.7rem] font-bold text-foreground">{m.number}</span>
                <span className="truncate">{m.title}</span>
              </NavItem>
            ))}
          </NavGroup>
          <NavGroup title="Practice">
            {practice.map((p) => (
              <NavItem key={p.path} to={p.path}>
                <p.icon className="h-4 w-4" aria-hidden /> {p.label}
              </NavItem>
            ))}
          </NavGroup>
          <NavGroup title="Reference">
            {reference.map((p) => (
              <NavItem key={p.path} to={p.path}>
                <p.icon className="h-4 w-4" aria-hidden /> {p.label}
              </NavItem>
            ))}
          </NavGroup>
        </nav>
        <p className="border-t px-5 py-3 text-[0.7rem] leading-snug text-muted-foreground">
          Content reviewed {CONTENT_REVIEWED}. For learning — confirm against current guidelines and local protocols.
        </p>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden />}

      <main id="main" className="pt-14 lg:ml-72 lg:pt-0">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  )
}
