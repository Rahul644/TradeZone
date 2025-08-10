import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import UserLogin from './Components/UserLogin';
import Register from './Components/Register';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const dispatch = useDispatch();
  const { userName, userRole } = useSelector((state) => state.auth);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedRole = localStorage.getItem('userRole');
    if (storedUsername && storedRole) {
      dispatch({
        type: 'auth/login',
        payload: {
          username: storedUsername,
          userRole: storedRole
        }
      });
    }
    setIsAuthLoading(false);
  }, [dispatch]);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (userName) {
      localStorage.setItem('username', userName);
      localStorage.setItem('userRole', userRole);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
    }
  }, [userName, userRole]);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        {isAuthLoading ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh'
          }}>
            Loading...
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </Router>
    </Provider>
  );
}

export default App;
