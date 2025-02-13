import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

import './Navbar.css'; // Import the CSS file

const Navbar = ({}) => {
    const navigate = useNavigate();

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
        { label: 'Favorites', icon: 'pi pi-heart', command: () => navigate('/favorites') },
    ];
 
    const start = <img  height="40" className="mr-2" />;

    const end = (
        <div className="navbar-end"> 
            <Button 
                style={{ backgroundColor: 'darkslategrey', marginLeft: '10px' }} 
                label="Login" 
                icon="pi pi-user" 
                onClick={() => navigate('/login')} 
            />
        </div>
    );

    return <Menubar model={items} start={start} end={end} />;
};

export default Navbar;
