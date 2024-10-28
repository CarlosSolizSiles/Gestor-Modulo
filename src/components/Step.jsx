// PÁGINA PRINCIPAL
import React, { useState } from 'react';
import './sidebar.css';
import UserForm from './UserForm';
import AnotherForm from './AnotherForm'; // Ejemplo de otro formulario
import ResponseMessage from './ResponseMessage';
import MenuForm from './MenuForm.jsx';
import eliminarPaso from '../lib/eliminarPaso.js';

const Step = ({ value, changeStep, onChangeMenu }) => {
    const [responseMessage, setResponseMessage] = useState('');

    const handleFormSubmitResetPassword = async (formData) => {
        const response = await fetch(process.env.CAMBIAR_CONTRASENA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if (result.status === 'success') {
            setResponseMessage('Operación exitosa');
            eliminarPaso(value);
            changeStep(value + 1);
        } else {
            setResponseMessage(result.message || 'Error en la operación');
        }
    };
    const handleFormSubmit = async (formData) => {
        const response = await fetch(process.env.IMPORTAR_BASE_DATOS, {
            method: 'POST',
            body: formData // `Content-Type` se ajustará automáticamente al usar FormData
        });

        const result = await response.json();
        if (result.status === 'success') {
            setResponseMessage('Operación exitosa');
            eliminarPaso(value);
            changeStep(value + 1);
        } else {
            setResponseMessage(result.message || 'Error en la operación');
        }
    };

    const handleFormSubmitMenu = async (formData) => {
        // Obtener el archivo JSON del formData y leerlo como texto
        const archivoJson = formData.get("archivo_json");

        // Leer el archivo como texto
        const textContent = await archivoJson.text();
        console.log("Contenido del JSON en texto:", textContent);
        onChangeMenu(JSON.parse(textContent))

        // Realizar la solicitud al servidor
        const response = await fetch(process.env.IMPORTAR_MENU, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json' // Este encabezado no debe estar aquí
            }
        });

        const result = await response.json();
        if (result.status === 'success') {
            setResponseMessage('Operación exitosa');
            eliminarPaso(value);
            changeStep(value + 1);
        } else {
            setResponseMessage(result.message || 'Error en la operación');
        }
    };


    switch (value) {
        case 0:
            return (
                <>
                    <h2>Cambiar Nombre de Usuario y Contraseña</h2>
                    <UserForm onSubmit={handleFormSubmitResetPassword} />
                    <ResponseMessage message={responseMessage} />
                </>
            );

        case 1:
            return (
                <>
                    <h2>Importar Base de Datos</h2>
                    <AnotherForm onSubmit={handleFormSubmit} />
                    <ResponseMessage message={responseMessage} />
                </>
            );

        case 2:
            return (
                <>
                    <h2>Importar Menú</h2>
                    <MenuForm onSubmit={handleFormSubmitMenu} />
                    <ResponseMessage message={responseMessage} />
                </>
            );

        case 3:
            return (
                <>
                    <h2>Proceso de Intalación Terminada</h2>
                    <button className='' onClick={() => {
                        changeStep(-1);
                        localStorage.removeItem("step")
                    }
                    }>
                        Volver
                    </button>
                </>
            );
        default:
            return null;
    }

};


export default Step;
