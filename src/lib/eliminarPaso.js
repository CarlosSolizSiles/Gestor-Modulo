async function eliminarPaso(pasoAEliminar) {
    try {
        const response = await fetch(process.env.ELIMINAR_PASO, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ step: pasoAEliminar }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
            console.log(data.message); // Success message
        } else {
            console.error(data.message); // Error message from the API
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

export default eliminarPaso