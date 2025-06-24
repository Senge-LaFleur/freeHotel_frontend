import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelPreview from '../pages/website/HotelPreview';
// ... import other pages as needed

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* ...other routes... */}
                <Route path="/website/preview/:hotelId" element={<HotelPreview />} />
                {/* ...other routes... */}
            </Routes>
        </Router>
    );
}
