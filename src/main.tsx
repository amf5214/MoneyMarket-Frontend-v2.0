// React imports
import React from 'react'
import ReactDOM from 'react-dom/client'

// Next imports
import { NextUIProvider } from '@nextui-org/react'

// Component imports
import App from './App.tsx'

// Style imports
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)
