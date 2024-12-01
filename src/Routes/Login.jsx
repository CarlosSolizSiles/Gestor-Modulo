import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerDatosJWT } from '../lib/obtenerDatosJWT';

const Login = () => {
    const navigation = useNavigate()
    const [userAutentic] = useState(obtenerDatosJWT());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(process.env.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                sessionStorage.setItem('token', data.token);
                navigation("/")
            } else {
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
            console.error('Error:', err);
        }
    };

    useEffect(() => {
        if (userAutentic) navigation("/")
    }, [])

    if (userAutentic) {
        return <></>
    }

    return (
        <div className="container_steps step">
            <div>
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit">Ingresar</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;