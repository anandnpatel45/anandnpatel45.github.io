// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
    {/* Handles scroll-to-top and hash-based scrolling */}
    <ScrollToTop />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HashRouter>
)
