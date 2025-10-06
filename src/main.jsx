import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import faviconUrl from "./assets/logo1.png";

function ensureFavicon() {
  if (typeof document === "undefined") {
    return;
  }

  const existingIcon = document.querySelector("link[rel='icon']");
  if (existingIcon) {
    existingIcon.href = faviconUrl;
    if (!existingIcon.type) {
      existingIcon.type = "image/png";
    }
    return;
  }

  const newIcon = document.createElement("link");
  newIcon.rel = "icon";
  newIcon.type = "image/png";
  newIcon.href = faviconUrl;
  document.head.appendChild(newIcon);
}

ensureFavicon();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);