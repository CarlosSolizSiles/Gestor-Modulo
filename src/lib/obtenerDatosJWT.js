import { jwtDecode } from "jwt-decode";

// Función para obtener el token JWT desde el localStorage
const obtenerJWT = () => {
    // Intenta obtener el token desde el localStorage
    const token = localStorage.getItem("token");

    // Si el token existe, lo devuelve, si no, devuelve null
    return token ? token : null;
};

const obtenerDatosJWT = () => {
    const token = obtenerJWT();

    // Verifica si el token existe y lo decodifica; si no, devuelve null
    return token ? jwtDecode(token) : null;
};

export { obtenerDatosJWT };