import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useStore } from './store/useStore'
import Layout from './components/Layout'
import Home from './pages/Home'

const Growth = lazy(() => import('./pages/Growth'))
const Development = lazy(() => import('./pages/Development'))
const Vaccines = lazy(() => import('./pages/Vaccines'))
const Congenital = lazy(() => import('./pages/Congenital'))
const Infections = lazy(() => import('./pages/Infections'))
const Fever = lazy(() => import('./pages/Fever'))
const Dehydration = lazy(() => import('./pages/Dehydration'))
const FebrileSeizure = lazy(() => import('./pages/FebrileSeizure'))
const AcuteCare = lazy(() => import('./pages/AcuteCare'))
const Cases = lazy(() => import('./pages/Cases'))
const Assessment = lazy(() => import('./pages/Assessment'))
const Flashcards = lazy(() => import('./pages/Flashcards'))
const Tools = lazy(() => import('./pages/Tools'))
const Glossary = lazy(() => import('./pages/Glossary'))
const References = lazy(() => import('./pages/References'))
const Settings = lazy(() => import('./pages/Settings'))

/** Scroll to top on navigation, or to the #anchor when one is present. */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a frame so lazily loaded pages can render their anchors.
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function PageFallback() {
  return (
    <div className="space-y-4" aria-busy="true" aria-live="polite">
      <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
      <div className="h-4 w-full animate-pulse rounded bg-muted" />
      <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default function App() {
  const darkMode = useStore((s) => s.darkMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#0b1220' : '#f7f9fb')
  }, [darkMode])

  return (
    <BrowserRouter>
      <ScrollManager />
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/growth" element={<Growth />} />
            <Route path="/development" element={<Development />} />
            <Route path="/vaccines" element={<Vaccines />} />
            <Route path="/congenital" element={<Congenital />} />
            <Route path="/infections" element={<Infections />} />
            <Route path="/fever" element={<Fever />} />
            <Route path="/dehydration" element={<Dehydration />} />
            <Route path="/febrile-seizure" element={<FebrileSeizure />} />
            <Route path="/acute-care" element={<AcuteCare />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/references" element={<References />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}
