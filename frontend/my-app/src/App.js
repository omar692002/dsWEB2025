import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './routes/useAuth'; // Correct import path for useAuth
import { BrowserRouter as Router } from 'react-router-dom';  // Add this import

function App() {
  return (
    <Router>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </Router>
  );
}

export default App;
