// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem('parseSession')
  );

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }/>
        <Route path="/login" element={
          <Login onLoginSuccess={handleLogin} />
        }/>
        <Route path="/dashboard" element={
          isLoggedIn 
            ? <Dashboard onLogout={handleLogout} /> 
            : <Navigate to="/login" />
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;