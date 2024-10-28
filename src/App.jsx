// PÁGINA PRINCIPAL
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar.jsx';
import './components/sidebar.css';
import Login from './components/Login.jsx';
import { obtenerDatosJWT } from './lib/obtenerDatosJWT.js';
import VerificarPaso from './lib/verificarPaso.js';
import Step from './components/Step.jsx';
import menuJSON from "../public/menu.json"

const lists_url = menuJSON ?? [];

function App() {
  const [step, setStep] = useState(localStorage.getItem("step"));
  const [userAutentic, setUserAutentic] = useState(obtenerDatosJWT());
  const [appUrl, setUrl] = useState("");
  const [isEnableForm, setIsEnableForm] = useState(false);
  const [menu, setMenu] = useState(lists_url)

  useEffect(() => {
    fetch(process.env.MENU).then(x => x.json())
      .then(x => {
        setMenu(x)
      })
      .catch(() => {
        setMenu([])
      })

    VerificarPaso().then(x => {
      setStep(x);
    });
  }, []);

  const changeUrl = (url) => {
    setUrl(url);
  };

  const hanlderInitDownload = (e) => {
    e.preventDefault();
    localStorage.step = 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsEnableForm(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    // Aquí deberías agregar la lógica para cerrar sesión
    // Ejemplo: setUserAutentic({ data: null });
    localStorage.removeItem('token'); // Elimina el token o la información del usuario del almacenamiento local
    setUserAutentic(null);
  };

  if (step === null) {
    return <></>;
  }

  return (
    <Router>
      <header>
        <nav>
          <a href="/"><img src="https://cdn-icons-png.flaticon.com/512/7001/7001366.png" alt="" /></a>
          <ul>
            {step === 0 && !localStorage.getItem("step") ? (
              <li><a href="/" onClick={hanlderInitDownload}>Iniciar Instalación</a></li>
            ) : (
              !userAutentic?.data ? (
                <li><a href="/" onClick={handleLogin}>Iniciar Sesión</a></li>
              ) : (
                <li><a href="/" onClick={handleLogout}>Cerrar Sesión</a></li>
              )
            )}
          </ul>
        </nav>
      </header>
      <div className='main-container'>
        <Sidebar changeUrl={changeUrl} lists_url={menu} />

        {step === -1 ? (step === -1 && !isEnableForm) ? (<iframe id="miIframe" src={appUrl} frameBorder="0" key={appUrl}></iframe>) : <div className='container_steps step'><Login onSubmit={(value) => {
          setUserAutentic(value)
          setIsEnableForm(false)

        }} /></div> : <div className={`container_steps ${step !== -1 ? " step" : ""}`}>
          {!userAutentic?.data ? <Login onSubmit={(value) => {
            setUserAutentic(value)
            location.reload();
          }} /> : <Step value={step} changeStep={(value) => {
            localStorage.step = value;
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
