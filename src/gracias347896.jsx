import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GraciasPage from './GraciasPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GraciasPage />
  </StrictMode>,
)
