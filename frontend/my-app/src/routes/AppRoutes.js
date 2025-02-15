import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import ArticleDetails from '../components/ArticleDetails';
import Login from '../pages/Login';
import Favorites from '../pages/Favorites';
import Navbar from '../components/Navbar';
import ProtectedRoute from './PrivateRoute'; 

const AppRoutes = () => {
  return (
    <Routes>
                    <Route path="/login" element={<Login />} />

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
