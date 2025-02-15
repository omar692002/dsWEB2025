import React from 'react';
import {  Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegisterPage from '../pages/Register';

import Favorites from '../pages/Favorites';
import Navbar from '../components/Navbar';
import ProtectedRoute from './PrivateRoute'; 

const AppRoutes = () => {
  return (
    <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="register" element={<RegisterPage/>}/>
                    <Route 
                        path="/*" 
                        element={
                            <ProtectedRoute>
                                <Navbar />
                                <Routes>
                                    <Route path="/home" element={<Home />} />
                                    <Route path="/favorites" element={<Favorites />} />

                                </Routes>
                            </ProtectedRoute>
                        } 
                    />
                </Routes>
   );
};


export default AppRoutes;
