import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import { useAuth } from '../routes/useAuth'; 
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout , user } = useAuth();
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
                <span>{user?.nom}</span> 
            </span>

            <Button 
                style={{ backgroundColor: 'darkslategrey', marginLeft: '10px' }} 
                label="Logout" 
                icon="pi pi-sign-out" 
                onClick={() => {
                    axios.post(process.env.REACT_APP_BACKEND_URL + "/controllers/utilisateurController.php/api/logout", {}, {
                        withCredentials: true
                    }).then((response) => {
                        logout();  // This will update the auth context
                    });
                    
                }} 
            />
        </div>
    ) 

    return <Menubar model={items} start={start} end={end} />;
};

export default Navbar;
