import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  let navigate = useNavigate();

  const handleLogin = (userRole) => {
    // Perform login logic, authenticate user, and set user role
    // For example purposes, let's say the userRole can be 'admin' or 'user'
    if (userRole === 'admin') {
      navigate('/admin-home');
    } else if (userRole === 'guardian'){
      navigate('/guardian-home');
    }
    else if(userRole === 'employee'){
      navigate('/employee-home');
    }
    else{
      navigate('/customer-home');
    }
  };

  return (
    <div>
      <h1>Welcome to MyApp</h1>
      {/* Replace with your login form */}
      <button onClick={() => handleLogin('user')}>User Login</button>
      <button onClick={() => handleLogin('admin')}>Admin Login</button>
      <button onClick={() => handleLogin('guardian')}>Guardian Login</button>
      <button onClick={() => handleLogin('employee')}>Employee Login</button>
    </div>
  );
}

export default LandingPage;
