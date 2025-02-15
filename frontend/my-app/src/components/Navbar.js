import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import { useAuth } from '../routes/useAuth'; // Correct import path for useAuth
const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const { isAuthenticated, logout } = useAuth();
    if (!isAuthenticated) return null;

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
        { label: 'Favorites', icon: 'pi pi-heart', command: () => navigate('/favorites') },
    ];

    const start = <img height="40" className="mr-2" alt="Logo" />;

    const end =(
        <div className="navbar-end">
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <i className="pi pi-user" style={{ marginRight: '8px', fontSize: '20px' }}></i>
                <span>{user.nom}</span> 
            </span>

            <Button 
                style={{ backgroundColor: 'darkslategrey', marginLeft: '10px' }} 
                label="Logout" 
                icon="pi pi-sign-out" 
                onClick={() => {
                    localStorage.removeItem('user');
                    logout();  
                }} 
            />
        </div>
    ) 

    return <Menubar model={items} start={start} end={end} />;
};

export default Navbar;
