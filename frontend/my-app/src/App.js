import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './routes/useAuth'; 
import { BrowserRouter as Router } from 'react-router-dom';  

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
