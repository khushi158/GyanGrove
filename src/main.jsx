import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
    <App />
    </Router>

  </StrictMode>,
)
