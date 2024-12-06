const value = JSON.parse(localStorage.darkMode ?? false);
document.body.classList.toggle('dark-mode', value);
function recibirMensajeDesdePrincipal(event) {
    if (event.data && Object.keys(event.data).includes("darkMode")) {
        document.body.classList.toggle('dark-mode', event.data.darkMode);
    } else {
        console.warn("Mensaje recibido no tiene el formato esperado");
    }
}

// Escucha el evento de mensajes
window.addEventListener('message', recibirMensajeDesdePrincipal, false);