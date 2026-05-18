import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import SpendLight from './pages/SpendLight.tsx'
import MonsterWalk from './pages/MonsterWalk.tsx'
import HealthTech from './pages/HealthTech.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/spendlight" element={<SpendLight />} />
        <Route path="/monster-walk" element={<MonsterWalk />} />
        <Route path="/ai-research-workflow" element={<HealthTech />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
