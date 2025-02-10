import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { InputIcon } from 'primereact/inputicon';
import { IconField } from 'primereact/iconfield';
import './Navbar.css'; // Import the CSS file

const Navbar = ({setSearchQuery}) => {
    const navigate = useNavigate();

    const items = [
        { label: 'Home', icon: 'pi pi-home', command: () => navigate('/') },
        { label: 'Favorites', icon: 'pi pi-heart', command: () => navigate('/favorites') },
    ];
    const handleSearchQuery=(e)=>{
        setSearchQuery(e.target.value)

    }
    const start = <img alt="" src="" height="40" className="mr-2" />;

    const end = (
        <div className="navbar-end"> 
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search"> </InputIcon>
                <InputText placeholder="Search" onChange={handleSearchQuery} />
            </IconField>
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
