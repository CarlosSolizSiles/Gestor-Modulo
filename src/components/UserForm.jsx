import React, { useState } from 'react';
import { obtenerDatosJWT } from "../lib/obtenerDatosJWT";

const UserForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nueva_email: '',
        nueva_password: '',
        confirmar_password: '',
        user_id: obtenerDatosJWT()?.data?.id
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(obtenerDatosJWT()?.data?.id);
        
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nueva_email">Nuevo Email de Usuario:</label>
            <input
                type="email"
                name="nueva_email"
                id="nueva_email"
                required
                value={formData.nueva_email}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="nueva_password">Nueva Contraseña:</label>
            <input
                type="password"
                name="nueva_password"
                id="nueva_password"
                required
                value={formData.nueva_password}
                onChange={handleChange}
            />
            <br />
            <label htmlFor="confirmar_password">Confirmar Contraseña:</label>
            <input
                type="password"
                name="confirmar_password"
                id="confirmar_password"
                required
                value={formData.confirmar_password}
                onChange={handleChange}
            />
            <br />
            <button type="submit">Guardar Cambios</button>
        </form>
    );
};

export default UserForm;
