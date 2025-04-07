import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";
import { mathJaxConfig } from "./configs/mathJaxConfig.tsx";
import App from "./App.tsx";
import "./assets/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <MathJaxContext config={mathJaxConfig}>
        <App />
      </MathJaxContext>
    </HashRouter>
  </StrictMode>
);
