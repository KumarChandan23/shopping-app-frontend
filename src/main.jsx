import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AppContext } from './AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <AppContext>
    <App />
  </AppContext>,
)
