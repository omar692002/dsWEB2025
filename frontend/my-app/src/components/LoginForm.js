import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './LoginStyle.css';

export const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onLogin(email, password);
    };

    return (
        <div className="login-form">
            <div className="p-field">
                <label htmlFor="email" className="p-d-block">Email</label>
                <InputText
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-inputtext-lg"
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
                />
            </div>
            <Button label="Login" icon="pi pi-sign-in" onClick={handleSubmit} className="p-button-lg" />
        </div>
    );
};
