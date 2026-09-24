import React from 'react';
import { createRoot } from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import App from './App.jsx';
import './index.css';
import { initGA } from './lib/ga';

// Google Analytics (no-op unless VITE_GA_MEASUREMENT_ID is set at build time).
initGA();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>,
);
