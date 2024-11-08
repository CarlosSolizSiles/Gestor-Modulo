import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/global.css'
import App from './App.jsx'
import { obtenerDatosJWT } from './lib/obtenerDatosJWT.js';

window.addEventListener("message", (event) => {
  // Asegúrate de que el mensaje proviene del iframe
  if (event.source !== document.getElementById("miIframe").contentWindow) return;

  const { type } = event.data;

  if (type === "getLocalStorage") {
    // Obtiene el valor del localStorage de la página principal
    const value = obtenerDatosJWT();

    // Envía el valor de vuelta al iframe
    event.source.postMessage({ type: "localStorageValue", value }, event.origin);
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
