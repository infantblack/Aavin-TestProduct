import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import CompanyHeader from './components/layout/header';
import HomeScreen from './components/pages/companycomponents';
import CompanyCreation from './components/pages/companycomponents/companycreation';
import CompanyDetails from './components/pages/companycomponents/companydetails';
import WelcomePage from './components/welocmepage';

function App() {

  const pathRoute: any = window.location.pathname;


  return (
    <>

      <BrowserRouter>
        <Routes>
        <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/companycreate" element={<CompanyCreation />} />
          {/* <Route path="/details" element={<CompanyDetails />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
