import React, { useState } from 'react';

const MenuForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('archivo_json', fileField.files[0]);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="archivo_json">Selecciona un archivo JSON:</label>
            <input type="file" id="archivo_json" name="archivo_json" accept=".json" required /><br /><br />
            <button type="submit">Importar Archivo</button>
        </form>
    );
};

export default MenuForm;
