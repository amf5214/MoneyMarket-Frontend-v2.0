// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'

// Component imports
import App from './App.tsx'

// Style imports
import './index.css'
import { Providers } from './component/Providers.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Providers>
        <App />
      </Providers>
  </React.StrictMode>,
)
