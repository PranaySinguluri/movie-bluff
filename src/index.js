import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Fix for React 18

root.render(
  <React.StrictMode>
    <BrowserRouter future={{v7_relativeSplatPath: true,
  }}
>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
