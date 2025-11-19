import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Development from './pages/Development'
import Vaccines from './pages/Vaccines'
import Infections from './pages/Infections'
import Congenital from './pages/Congenital'
import AcuteCare from './pages/AcuteCare'
import Dehydration from './pages/Dehydration'
import FebrileSeizure from './pages/FebrileSeizure'
import Cases from './pages/Cases'
import Assessment from './pages/Assessment'
import Glossary from './pages/Glossary'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/development" element={<Development />} />
          <Route path="/vaccines" element={<Vaccines />} />
          <Route path="/infections" element={<Infections />} />
          <Route path="/congenital" element={<Congenital />} />
          <Route path="/acute-care" element={<AcuteCare />} />
          <Route path="/dehydration" element={<Dehydration />} />
          <Route path="/febrile-seizure" element={<FebrileSeizure />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
