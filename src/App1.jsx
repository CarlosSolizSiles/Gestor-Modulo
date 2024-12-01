// PÁGINA PRINCIPAL
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar.jsx';
import Login from './components/Login.jsx';
import { obtenerDatosJWT } from './lib/obtenerDatosJWT.js';
import VerificarPaso from './lib/verificarPaso.js';
import Step from './components/Step.jsx';
import { BiMenu } from 'react-icons/bi';

function App() {
  const [step, setStep] = useState(sessionStorage.getItem("step"));
  const [userAutentic, setUserAutentic] = useState(obtenerDatosJWT());
  const [appUrl, setUrl] = useState(" ");
  const [isEnableForm, setIsEnableForm] = useState(false);
  const [menu, setMenu] = useState(window.menu ?? [])

  useEffect(() => {
    VerificarPaso().then(x => {
      setStep(x);
    });
  }, []);

  const changeUrl = (url) => {
    setUrl(url);
  };

  const hanlderInitDownload = (e) => {
    e.preventDefault();
    sessionStorage.step = 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsEnableForm(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // Aquí deberías agregar la lógica para cerrar sesión
    // Ejemplo: setUserAutentic({ data: null });
    sessionStorage.removeItem('token'); // Elimina el token o la información del usuario del almacenamiento local
    setUserAutentic(null);
  };

  if (step === null) {
    return <></>;
  }

  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li className='li__menu'>
              <label htmlFor="menu" className='menu__label'>
                <BiMenu className='icon_menu' />
              </label>
              <input type="checkbox" id='menu' />
            </li>
            <li>
              <a href="/"><img src="https://cdn-icons-png.flaticon.com/512/7001/7001366.png" alt="" /></a>
            </li>
          </ul>
          <ul>
            {step === 0 && !sessionStorage.getItem("step") ? (
              <li><a href="/" onClick={hanlderInitDownload}>Iniciar Instalación</a></li>
            ) : (
              !userAutentic?.data ? (
                <li><a href="/" onClick={handleLogin}>Iniciar Sesión</a></li>
              ) : (
                <li><a href="/" onClick={handleLogout}>Cerrar Sesión ({userAutentic?.data?.rol})</a></li>
              )
            )}
          </ul>
        </nav>
      </header>
      <div className='main-container'>
        <Sidebar changeUrl={changeUrl} lists_url={menu} />

        {step === -1 ? (step === -1 && !isEnableForm) ? (<iframe id="miIframe" src={appUrl} frameBorder="0" key={appUrl}></iframe>) : <div className='container_steps step'><Login onSubmit={(value) => {
          setUserAutentic(value);
          setIsEnableForm(false);
          location.reload();
        }} /></div> : <div className={`container_steps ${step !== -1 ? " step" : ""}`}>
          {!userAutentic?.data ? <Login onSubmit={(value) => {
            setUserAutentic(value)
            location.reload();
          }} /> : <Step value={step} changeStep={(value) => {
            sessionStorage.step = value;
            setStep(value);
          }}
            onChangeMenu={(value) => { setMenu(value) }}
          />}
        </div>}
      </div>
    </Router>
  );
}

export default App;
