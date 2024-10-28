function requestLocalStorage(key) {
    return new Promise((resolve) => {
        // Escucha la respuesta del localStorage desde la página principal
        window.addEventListener("message", function handler(event) {
            if (event.origin !== window.origin) return;

            const { type, value } = event.data;
            if (type === "localStorageValue" && event.data.key === key) {
                resolve(value);
                window.removeEventListener("message", handler);
            }
        });

        // Envía una solicitud a la página principal para obtener el valor del localStorage
        window.parent.postMessage({ type: "getLocalStorage", key }, window.origin);
    });
}