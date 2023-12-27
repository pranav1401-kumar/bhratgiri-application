// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import CropList from './components/cropList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={!isLoggedIn ? <Login onLogin={handleLogin} /> : <Navigate to="/crops" />} />
        <Route path="/crops" element={isLoggedIn ? <CropList /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
