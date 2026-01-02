import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import './styles/main.css';

function AppContent() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return showLogin ? (
      <Login onSwitchToSignup={() => setShowLogin(false)} />
    ) : (
      <Signup onSwitchToLogin={() => setShowLogin(true)} />
    );
  }

  return <Dashboard />;
}

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <AppContent />
      </div>
    </AuthProvider>
  );
}

export default App;