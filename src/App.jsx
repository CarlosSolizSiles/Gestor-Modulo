// PÁGINA PRINCIPAL
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import './components/sidebar.css';
import Login from './components/Login.jsx';
import { obtenerDatosJWT } from './lib/obtenerDatosJWT.js';
import VerificarPaso from './lib/verificarPaso.js';
import UserForm from './components/UserForm';
import AnotherForm from './components/AnotherForm'; // Ejemplo de otro formulario
import ResponseMessage from './components/ResponseMessage';
import MenuForm from './components/MenuForm.jsx';

const Step = ({ value, changeStep }) => {
  const [responseMessage, setResponseMessage] = useState('');

  const handleFormSubmitResetPassword = async (formData) => {
    const response = await fetch('http://localhost/demo_installer_page/api/cambiar_contrasena.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.status === 'success') {
      setResponseMessage('Operación exitosa');
      changeStep(value + 1)
    } else {
      setResponseMessage(result.message || 'Error en la operación');
    }
  };
  const handleFormSubmit = async (formData) => {
    const response = await fetch('http://localhost/demo_installer_page/api/importar_base_datos.php', {
      method: 'POST',
      body: formData // `Content-Type` se ajustará automáticamente al usar FormData
    });

    const result = await response.json();
    if (result.status === 'success') {
      setResponseMessage('Operación exitosa');
      changeStep(value + 1);
    } else {
      setResponseMessage(result.message || 'Error en la operación');
    }
  };

  const handleFormSubmitMenu = async (formData) => {
    const response = await fetch('http://localhost/demo_installer_page/api/importar_menu.php', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json'  // Este encabezado no debe estar aquí
      }
    });

    const result = await response.json();
    if (result.status === 'success') {
      setResponseMessage('Operación exitosa');
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

    default:
      return null;
  }

};


function App() {
  const [step, setStep] = useState(localStorage.getItem("step"))
  const [userAutentic, setUserAutentic] = useState(obtenerDatosJWT())
  const [appUrl, setUrl] = useState("/public/panol-abm/")

  useEffect(() => {
    VerificarPaso().then(x => {
      setStep(x);
    })

  }, [])

  const changeUrl = (url) => {
    setUrl(url)
  }

  const hanlderInitDownload = (e) => {
    e.preventDefault()
    localStorage.step = 0;
  }

  if (step === null) {
    return <></>
  }

  return (
    <Router>
      <header>
        <nav>
          <a href="/"><img src="https://cdn-icons-png.flaticon.com/512/7001/7001366.png" alt="" /></a>
          <ul>
            {step === 0 && !localStorage.getItem("step") ? <li><a href="http://" onClick={hanlderInitDownload}>Iniciar Instalación</a></li> : (!userAutentic.data ? <li><a href="http://">Iniciar Sesion</a></li> : <li><a href="http://">Cerar Sesion</a></li>)}
          </ul>
        </nav>
      </header>
      <div className='main-container'>
        <Sidebar changeUrl={changeUrl} />
        <div className='container_steps'>
          {!userAutentic.data ? <Login /> : <Step value={step} changeStep={(value => {
            localStorage.step = value;
            setStep(value)
          })}></Step>}

        </div>
        {/* <iframe src={appUrl} frameborder="0" key={appUrl}></iframe> */}
      </div>

    </Router>
  );
}

export default App;
