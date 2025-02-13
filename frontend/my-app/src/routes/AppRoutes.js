import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import ArticleDetails from '../components/ArticleDetails';
import Login from '../pages/Login';
import Favorites from '../pages/Favorites';
import Navbar from '../components/Navbar'
// import Register from '../pages/Register';
import AdminDashboard from '../pages/AdminDashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/admin" element={<AdminDashboard />} /> */}
        <Route path="/favorites" element={<Favorites />} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
