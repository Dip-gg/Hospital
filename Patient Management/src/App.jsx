import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import PatientProfile from './components/ViewPatient';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/patientprofile" element={<PatientProfile/>}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
