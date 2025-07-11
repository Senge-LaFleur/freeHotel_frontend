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
import Reservations from './pages/reservations/reservation.jsx';
import Website from './pages/website/website.jsx'
import TemplateEditor from './pages/website/templateEditor.jsx'
import HotelPreview from './pages/website/HotelPreview.jsx';
import RoomsTable from './pages/roomsTable/roomsTable.jsx';
import Payment from './pages/payments/payment.jsx';
import Plan from './pages/payments/websitePlan/plan.jsx';
import LocationRecommendations from './pages/recommendations/LocationRecommendations.jsx';
import PersonalizedRecommendations from './pages/recommendations/PersonalizedRecommendations.jsx';
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
        <Route path="/payment" element={<Payment />} />
        <Route path="/plans" element={<Plan />} />
        <Route path="/roomsTable" element={<RoomsTable />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/recommendations/location/:location" element={<LocationRecommendations />} />
        <Route path="/recommendations/personalized" element={<PersonalizedRecommendations />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/website" element={<Website />} />
        <Route path="/editor/:templateId" element={<TemplateEditor />} />
        <Route path="/website/templateEditor/:templateId/:hotelId" element={<TemplateEditor />} />
        <Route path="/website/preview/:hotelId" element={<HotelPreview />} />
      </Routes>

    </div>
  )
}

export default App
