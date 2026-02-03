import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Suppress errors from browser wallet extensions (not app bugs)
window.addEventListener('error', (event) => {
  if (event.filename?.includes('chrome-extension://') || 
      event.message?.includes('chrome.runtime.sendMessage')) {
    event.preventDefault();
    event.stopPropagation();
    return true;
  }
});

window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason?.toString() || '';
  if (reason.includes('chrome.runtime') || reason.includes('Extension ID')) {
    event.preventDefault();
    return;
  }
});

createRoot(document.getElementById("root")!).render(<App />);
