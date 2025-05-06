import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header.jsx'
import Home from './pages/home/home.jsx'
import HomeLayout from './layouts/homeLayout/homeLayout.jsx'
import Rooms from './pages/rooms/rooms.jsx'
import Login from './pages/auth/login/login.jsx'
import SignUp from './pages/auth/signUp/signUp.jsx'
import Client from './pages/auth/signUp/signUpClient/client.jsx'
import Owner from './pages/auth/signUp/signUpOwner/owner.jsx'
import Footer from './components/footer/footer.jsx'
// import Dashboard from './pages/dashboard/dashboard.jsx'
import './App.css'

function App() {

  return (
    <div class="body">
      
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/client" element={<Client />} />
        <Route path="/owner" element={<Owner />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
