import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        nueva_usuario: '',
        nueva_password: '',
        confirmar_password: ''
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
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="nueva_usuario">Nuevo Nombre de Usuario:</label>
            <input
                type="text"
                name="nueva_usuario"
                id="nueva_usuario"
                required
                value={formData.nueva_usuario}
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
