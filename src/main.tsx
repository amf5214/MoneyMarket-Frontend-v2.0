// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'

// Next imports
import { NextUIProvider } from '@nextui-org/react'

// Component imports
import App from './App.tsx'

// Style imports
import './index.css'
import { AuthProvider } from './provider/AuthProvider'
import { Providers } from './component/Providers.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Providers>
        <App />
      </Providers>
  </React.StrictMode>,
)
