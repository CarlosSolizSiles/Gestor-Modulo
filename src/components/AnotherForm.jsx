const AnotherForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        const fileField = document.querySelector('input[type="file"]');

        formData.append('dbfiles', fileField.files[0]);
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="file" id="dbfiles" name="dbfiles" accept=".txt" required /><br /><br />
            <input type="submit" value="Crear Base de Datos" />
        </form>
    );
};

export default AnotherForm;
