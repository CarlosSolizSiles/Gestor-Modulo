function enviarCambioModo(estado) {
    const iframe = document.getElementById('miIframe'); // Asegúrate de que el iframe tenga este ID
    const mensajeObj = { darkMode: estado };

    if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(mensajeObj, '*'); // Aquí puedes cambiar '*' por el origen específico del iframe si lo conoces
    } else {
        console.error('El iframe no se ha encontrado o no está disponible');
    }
}

export { enviarCambioModo }