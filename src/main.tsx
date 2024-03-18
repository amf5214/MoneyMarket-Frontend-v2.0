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


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>,
)
