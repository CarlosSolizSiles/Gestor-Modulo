// PÁGINA PRINCIPAL
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import { obtenerDatosJWT } from './lib/obtenerDatosJWT.js';
import VerificarPaso from './lib/verificarPaso.js';

import ShowFrame from './Routes/ShowFrame.jsx';
import Login from './Routes/Login.jsx';
import NavBar from './components/NavBar.jsx';

function App() {
  const [step, setStep] = useState(sessionStorage.getItem("step"));
  const [userAutentic, setUserAutentic] = useState(obtenerDatosJWT());
  const [menu, setMenu] = useState(window.menu ?? [])

  console.log(userAutentic);


  useEffect(() => {
    VerificarPaso().then(x => {
      setStep(x);
    });
  }, []);


  const hanlderInitDownload = (e) => {
    e.preventDefault();
    sessionStorage.step = 0;
  };




  if (step === null) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <header>
        <NavBar></NavBar>
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
