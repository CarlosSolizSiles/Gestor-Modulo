import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import App from './App.jsx'

window.addEventListener("message", (event) => {
  // Asegúrate de que el mensaje proviene del iframe
  if (event.source !== document.getElementById("miIframe").contentWindow) return;

  const { type, key } = event.data;

  if (type === "getLocalStorage") {
      // Obtiene el valor del localStorage de la página principal
      const value = localStorage.getItem(key);
      
      // Envía el valor de vuelta al iframe
      event.source.postMessage({ type: "localStorageValue", key, value }, event.origin);
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
