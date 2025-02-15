import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './LoginStyle.css';
import { useNavigate } from 'react-router-dom';

export const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();  
    onLogin(email, password);  
  };
  const handleRegisterRedirect = () => {
    navigate('/register');  
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="login-form">
        <div className="p-field">
          <label htmlFor="email" className="p-d-block">Email</label>
          <InputText
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-inputtext-lg"
            placeholder="Enter your email"  
          />
        </div>

        <div className="p-field">
          <label htmlFor="password" className="p-d-block">Password</label>
          <InputText
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            className="p-inputtext-lg"
            type="password"
            placeholder="Enter your password" 
          />
        </div>

        <Button 
          type="submit" 
          label="Login" 
          icon="pi pi-sign-in" 
          className="p-button-lg" 
        />
          <div className="register-link">
          <span>Don't have an account? </span>
          <Button 
            label="Register" 
            icon="pi pi-user-plus" 
            className="p-button-text p-button-sm" 
            onClick={handleRegisterRedirect} 
          />
        </div>
      </div>
    </form>
  );
};
