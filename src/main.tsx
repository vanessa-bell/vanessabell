import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import SpendLight from './pages/SpendLight.tsx'
import MonsterWalk from './pages/MonsterWalk.tsx'
import HealthTech from './pages/HealthTech.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/spendlight" element={<SpendLight />} />
        <Route path="/monster-walk" element={<MonsterWalk />} />
        <Route path="/ai-research-workflow" element={<HealthTech />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
