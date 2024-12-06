import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/global.css';
import App from './App.jsx';
import { obtenerDatosJWT } from './lib/obtenerDatosJWT.js';

// Asegúrate de que el evento de mensaje se registre solo después de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("message", (event) => {
    const iframe = document.getElementById("miIframe");

    // Verifica si el iframe existe y que el mensaje provenga de su contentWindow
    if (!iframe || event.source !== iframe.contentWindow) return;

    const { type } = event.data;

    if (type === "getLocalStorage") {
      // Obtiene el valor del localStorage de la página principal
      const value = obtenerDatosJWT();

      // Envía el valor de vuelta al iframe
      event.source.postMessage({ type: "localStorageValue", value }, event.origin);
    }
  });
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
sessionStorage