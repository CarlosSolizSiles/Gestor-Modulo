import React, { useEffect } from 'react';
import { isLogin } from '../lib/obtenerDatosJWT';
import { useNavigate } from 'react-router-dom';
import Step from '../components/Step';


const Install = ({ changeStep, value, onChangeMenu }) => {
    const navigate = useNavigate()
    useEffect(() => {
        const hasLogin = isLogin()
        if (!hasLogin) {
            navigate("/login")
        }
    }, [])

    return (
        <div className="container_steps step"><Step changeStep={changeStep} onChangeMenu={onChangeMenu} value={value}/></div>
    );
};

export default Install;
