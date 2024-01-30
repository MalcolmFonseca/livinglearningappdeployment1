import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Pages/LandingPage';
import AdminPage from './components/Pages/AdminPage';
import GuardianPage from './components/Pages/GuardianPage';
import EmployeePage from './components/Pages/EmployeePage';
import CustomerPage from './components/Pages/CustomerPage';
import UserSignup from './components/Pages/UserSignup'; // Import the UserLogin component



function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-home" element={<AdminPage />} />
        <Route path="/guardian-home" element={<GuardianPage />} />
        <Route path="/employee-home" element={<EmployeePage />} />
        <Route path="/customer-home" element={<CustomerPage />} />
        <Route path="/signup" element={<UserSignup/>} />
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
