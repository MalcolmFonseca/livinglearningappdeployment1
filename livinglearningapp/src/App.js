import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import AdminPage from './components/Pages/AdminPage';
import GuardianPage from './components/Pages/GuardianPage';
import EmployeePage from './components/Pages/EmployeePage';
import CustomerPage from './components/Pages/CustomerPage';
import AboutPage from './components/Pages/About/AboutPage';
import UserSignUp from './components/Pages/UserSignup';
import Resources from './components/Pages/Resources/ResourcesPage'
import Calendar from './components/Pages/Calendar/calendar';
import EventsCalendar from './components/Pages/Calendar/eventsCalendar';
import UserLogin from './components/Pages/Login'
import Chatbot from './components/Pages/Chatbot/Chatbot';

import Chatroom from "./components/Pages/Chatroom/Chatroom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-home" element={<AdminPage />} />
        <Route path="/guardian-home" element={<GuardianPage />} />
        <Route path="/employee-home" element={<EmployeePage />} />
        <Route path="/customer-home" element={<CustomerPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/calendar/*" element={<Calendar />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/events-calendar" element={<EventsCalendar />} />
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
