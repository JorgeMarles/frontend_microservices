import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from './App.tsx';
import "./configs/mathjax-config.js"
import './assets/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter> 
      <App />
    </HashRouter>
  </StrictMode>,
)