import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file
import { useAuth } from '../routes/useAuth'; 
import axios from 'axios';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, logout, user } = useAuth();
    if (!isAuthenticated) return null;

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/home') },
        { label: 'Favorites', icon: 'pi pi-heart', command: () => navigate('/favorites') },
    ];

    if (user?.role === 'admin') {
        items.push({
            label: 'Add Article',
            icon: 'pi pi-plus',
            command: () => navigate('/add-article') 
        });
    }

    const end = (
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
                        logout();
                    });
                }} 
            />
        </div>
    );

    return <Menubar model={items} end={end} />;
};

export default Navbar;
