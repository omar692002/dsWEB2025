import React ,{ useState }from 'react';
import axios from 'axios';
import { RegisterForm } from '../components/RegisterForm';
import { Toast } from 'primereact/toast';  
import { useAuth } from '../routes/useAuth'; 
import { useNavigate } from 'react-router-dom';

 const RegisterPage = () => {
  const toast = React.useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate()

  const handleRegister = async (name, email, password) =>{
    if (!email || !password || !password) {
      setErrorMessage("Please fill in all fields.");
      toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage });
    } else {
      axios.post(process.env.REACT_APP_BACKEND_URL +"/controllers/utilisateurController.php/api/register", {
        nom: name,
          email: email,
          password: password
      })
      .then((response) => {
        console.log(response);
        
        if (response.data.message === "User registered successfully") {
          toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message });    
          login(email,password);          
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Invalid credentials");
        toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage });
      });
    }
  };

  return (
    <div className="register-container">
      <Toast ref={toast} />
      <div className="card">
        <h2>Register</h2>
        <RegisterForm onRegister={handleRegister} />
      </div>
    </div>
  );
};
export default RegisterPage;
