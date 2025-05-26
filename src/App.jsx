import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home.jsx'
import HomeLayout from './layouts/homeLayout/homeLayout.jsx'
import Rooms from './pages/rooms/rooms.jsx'
import Login from './pages/auth/login/login.jsx'
import SignUp from './pages/auth/signUp/signUp.jsx'
import Client from './pages/auth/signUp/signUpClient/client.jsx'
import Owner from './pages/auth/signUp/signUpOwner/owner.jsx'
import Dashboard from './pages/dashboard/dashboard.jsx'
import DashboardLayout from './layouts/dashboardLayout/dashboardLayout.jsx'
import Website from './pages/website/website.jsx'
import './App.css'

function App() {

  return (
    <div className="body">
      
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/client" element={<Client />} />
        <Route path="/owner" element={<Owner />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/website" element={<Website />} />
      </Routes>

    </div>
  )
}

export default App
