import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();  

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL +"/controllers/utilisateurController.php/api/check-session", {
            method: "GET",
            credentials: "include",  
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                setIsAuthenticated(true);
                setUser(data.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })
        .catch(error => console.error("Session check failed:", error));
    }, []);

    const login = async (email, password) => {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/controllers/utilisateurController.php/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setIsAuthenticated(true);
            setUser(data.user);
            navigate("/home"); 

        }
        return data;

    };

    const logout = async () => {
        await fetch(process.env.REACT_APP_BACKEND_URL +"/controllers/utilisateurController.php/api/logout", {
            method: "POST",
            credentials: "include",
        });

        setIsAuthenticated(false);
        setUser(null);
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
