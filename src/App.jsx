// PÁGINA PRINCIPAL
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import { obtenerDatosJWT } from './lib/obtenerDatosJWT.js';
import VerificarPaso from './lib/verificarPaso.js';

import ShowFrame from './Routes/ShowFrame.jsx';
import Login from './components/Login.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
  const [step, setStep] = useState(sessionStorage.getItem("step"));
  const [userAutentic, setUserAutentic] = useState(obtenerDatosJWT());
  const [menu, setMenu] = useState(window.menu ?? [])

  useEffect(() => {
    VerificarPaso().then(x => {
      setStep(x);
    });
  }, []);


  const hanlderInitDownload = (e) => {
    e.preventDefault();
    sessionStorage.step = 0;
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
    <BrowserRouter>
      <header>
        <NavBar handleLogout={handleLogout} userAutentic={userAutentic}></NavBar>
      </header>
      <div className='main-container'>
        <SideBar lists_url={menu} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/module' element={<ShowFrame></ShowFrame>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
