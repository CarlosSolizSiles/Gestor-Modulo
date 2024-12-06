// PÁGINA PRINCIPAL
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar.jsx';
import VerificarPaso from './lib/verificarPaso.js';

import ShowFrame from './Routes/ShowFrame.jsx';
import Login from './Routes/Login.jsx';
import NavBar from './components/NavBar.jsx';
import Install from './Routes/Install.jsx';
import Home from './Routes/Home.jsx';

function App() {
  const [step, setStep] = useState(sessionStorage.getItem("step"));
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

  if (step === null) {
    return <></>;
  }

  return (
    <BrowserRouter>
      <header>
        <NavBar step={step}></NavBar>
      </header>
      <div className='main-container'>
        <SideBar lists_url={menu} />
        <Routes>
          <Route path='/' element={<Home step={step} />} />
          <Route path='/login' element={<Login step={step} />} />
          <Route path='/module' element={<ShowFrame></ShowFrame>} />
          <Route path='/install' element={<Install value={step} changeStep={(value) => {
            sessionStorage.step = value;
            setStep(value);
          }}
            onChangeMenu={(value) => { setMenu(value) }} />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
