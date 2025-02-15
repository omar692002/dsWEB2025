import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + "/controllers/utilisateurController.php/api/check-session", {
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
        .catch(error => console.error("Session check failed:", error))
        .finally(() => setLoading(false)); 
    }, [isAuthenticated]);
    
    const login = async (email, password) => {
            setIsAuthenticated(true);
            navigate("/home"); 
    };

    const logout = async () => {
      setIsAuthenticated(false);
      setUser(null); 
      setTimeout(() => {
        navigate('/login'); 
      }, 100);  
    };
    

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout,loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
