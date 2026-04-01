import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './lib/chartRegistrar';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
