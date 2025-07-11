import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelPreview from '../pages/website/HotelPreview';
import LocationRecommendations from '../pages/recommendations/LocationRecommendations.jsx';
// ... import other pages as needed

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* ...other routes... */}
                <Route path="/website/preview/:hotelId" element={<HotelPreview />} />
                <Route path="/recommendations/location/:location" element={<LocationRecommendations />} />
                {/* ...other routes... */}
            </Routes>
        </Router>
    );
}
