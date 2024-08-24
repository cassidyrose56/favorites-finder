import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { APIProvider } from '@vis.gl/react-google-maps'
import React from 'react'

// @ts-expect-error - VITE_GOOGLE_MAPS_API_KEY is defined in the environment variables
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GOOGLE_MAPS_API_KEY is not defined in environment variables');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIProvider apiKey={API_KEY} onLoad={() => console.log('Maps API has loaded.')}>
      <App />
    </APIProvider>
  </StrictMode>,
)
