import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { Theme } from '@radix-ui/themes';
import "@radix-ui/themes/styles.css";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Theme appearance='dark'>
        <App />
      </Theme>
    </BrowserRouter>
  </StrictMode>,
)
