
import React from 'react';

const HotelTemplate = ({ data }) => {
  return (
    <div className="hotel-template">
      <div className="hotel-hero">
        <h1>{data.name}</h1>
        <p>{data.tagline}</p>
        <a href="#contact" className="hotel-cta">Book Your Stay</a>
      </div>

      <div className="hotel-content">
        <div className="hotel-features">
          <div className="feature-card">
            <div className="feature-icon">🏊</div>
            <h3>Swimming Pool</h3>
            <p>Relax in our beautiful outdoor pool with stunning city views.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Fine Dining</h3>
            <p>Experience world-class cuisine at our award-winning restaurant.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💆</div>
            <h3>Spa & Wellness</h3>
            <p>Rejuvenate your body and mind at our luxury spa facility.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚗</div>
            <h3>Valet Parking</h3>
            <p>Convenient valet parking service available 24/7 for all guests.</p>
          </div>
        </div>
      </div>

      <div className="hotel-contact" id="contact">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <h4>Phone</h4>
            <p>{data.phone}</p>
          </div>
          <div className="contact-item">
            <h4>Email</h4>
            <p>{data.email}</p>
          </div>
          <div className="contact-item">
            <h4>Address</h4>
            <p>{data.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelTemplate;
