function VerificarPaso() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(process.env.VERIFICAR_PASO, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();

            if (data.status === "success") {
                resolve(data.step);
            } else {
                console.error('Error:', data.status);
                reject()
            }
        } catch (err) {
            console.error('Error:', err);
            reject()
        }
    })
}

export default VerificarPaso