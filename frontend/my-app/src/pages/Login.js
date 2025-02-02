import React, { useState } from 'react';
import axios from 'axios';
import { LoginForm } from '../components/LoginForm';
import { Toast } from 'primereact/toast';  

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const toast = React.useRef(null);

  const handleLogin = (email, password) => {
      if (!email || !password) {
          setErrorMessage("Please fill in both fields.");
          toast.current.show({severity: 'error', summary: 'Error', detail: errorMessage});
      } else {
          console.log("Logging in with", email, password);
          setErrorMessage('');
      }
  };

  return (
      <div className="login-container">
          <Toast ref={toast} />
          <div className="card">
              <h2>Login</h2>
              <LoginForm onLogin={handleLogin} />
          </div>
      </div>
  );
};
export default Login;
