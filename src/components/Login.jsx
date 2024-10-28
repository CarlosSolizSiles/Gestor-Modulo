import React, { useState } from 'react';

const Login = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                onSubmit(data.token)
            } else {
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
            console.error('Error:', err);
        }
    };

    if (isAuthenticated) {
        return <p>Autenticación exitosa. ¡Bienvenido!</p>;
    }

    return (
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
    );
};

export default Login;