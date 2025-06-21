import React from 'react';
import Navbar from '../../components/navbar/navbar.jsx';
import BookingForm from '../../components/bookingForm/bookingForm.jsx'
import './rooms.css';

function Rooms() {

  return (
    <div class="rooms">
        <Navbar />
        <section class="rooms-container" id="rooms">
          <div class="rooms-image-container">
            <div class="rooms-content">
              <h1>Rest - Recharge - Repeat</h1>
              <p>Book Hotels and Stay Packages at Lowest Price.</p>
            </div>
            <BookingForm />       
          </div>
        </section>

        <main>
          <h2 class="section-header">Popular Hotel Deals Right Now</h2>
          <section></section>
        </main>
    </div>
  )
}

export default Rooms;
