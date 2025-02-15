import React, { useState } from 'react';
import axios from 'axios';
import { LoginForm } from '../components/LoginForm';
import { Toast } from 'primereact/toast';  
import { useAuth } from '../routes/useAuth'; 

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const toast = React.useRef(null);
  const { login } = useAuth(); 

  const handleLogin = (email, password) => {
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage });
    } else {
      axios.post(process.env.REACT_APP_BACKEND_URL +"/controllers/utilisateurController.php/api/login", {
        email,
        password
      }, { withCredentials: true })
      .then((response) => {
        if (response.data.message === "Login successful") {
          toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message });    
          login(email,password);          
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Invalid credentials");
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage });
      });
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
