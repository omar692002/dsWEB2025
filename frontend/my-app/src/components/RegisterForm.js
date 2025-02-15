import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './RegisterStyle.css';  // Add your own styling or customize

export const RegisterForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    onRegister(name, email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="register-form">
        <div className="p-field">
          <label htmlFor="name" className="p-d-block">Name</label>
          <InputText
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-inputtext-lg"
            placeholder="Enter your name"
          />
        </div>

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
            className="p-inputtext-lg"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <div className="p-field">
          <label htmlFor="confirmPassword" className="p-d-block">Confirm Password</label>
          <InputText
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-inputtext-lg"
            type="password"
            placeholder="Confirm your password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <Button 
          type="submit" 
          label="Register" 
          icon="pi pi-user-plus" 
          className="p-button-lg"
        />
      </div>
    </form>
  );
};