import React ,{ useState }from 'react';
import axios from 'axios';
import { RegisterForm } from '../components/RegisterForm';
import { Toast } from 'primereact/toast';  
import { useAuth } from '../routes/useAuth'; 

 const RegisterPage = () => {
  const toast = React.useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); 

  const handleRegister = async (name, email, password) => {
    if(name && email && password){
      try {
        const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/controllers/utilisateurController.php/api/register", {
          nom: name,
          email: email,
          password: password
        });
        console.log(response.data);
        if(response?.data?.message==="User registered successfully"){
          toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message });   
          console.log("email",email,"password",password);
           
          login(email,password);          
        }
        if(response?.data?.error){
          setErrorMessage(response.data.error);
          toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage });
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }else{
      setErrorMessage("Please fill in all the fields");
      toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage });
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
