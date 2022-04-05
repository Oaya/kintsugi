/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './pages/Homepage';
import ProfessionalsPage from './pages/ProfessionalsPage';
import AppointmentPage from './pages/AppointmentPage';
import BookingPage from './pages/BookingPage';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ThankYou from './pages/ThankYouPage';
import VideoPage from './pages/VideoPage';
import './scss/main.scss';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/professionals/search/:prov/:lang" element={<ProfessionalsPage />} exact />
          <Route path="/myAppointments" element={<AppointmentPage />} exact />
          <Route path="/booking/:id" element={<BookingPage />} exact />
          <Route path="/thankyou" element={<ThankYou />} exact />
          <Route path="/video" element={<VideoPage />} exact />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
