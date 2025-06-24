import React from 'react';
import Navbar from '../../components/navbar/navbar.jsx';
import BookingForm from '../../components/bookingForm/bookingForm.jsx'
import bedroom9 from '../../assets/images/bedroom9.jpg'
import './rooms.css';

function Rooms() {
  // Mock data for demonstration
  const hotels = [
    {
      id: 1,
      name: "Marina Inn at Grand Dunes",
      price: "$247",
      rating: 8.5,
      reviewCount: "1,234",
      image: bedroom9,
      amenities: ["Pool", "Beachfront", "Free WiFi", "Restaurant"]
    },
    {
      id: 2,
      name: "Anderson Ocean Club and Spa",
      price: "$289",
      rating: 8.8,
      reviewCount: "967",
      image: bedroom9,
      amenities: ["Ocean View", "Spa", "Restaurant", "Fitness Center"]
    },
    // Add more hotels as needed
  ];

  return (
    <div className="rooms">
      <Navbar />
      <section className="rooms-container" id="rooms">
        <div className="rooms-image-container">
          <div className="rooms-content">
            <h1>Rest - Recharge - Repeat</h1>
            <p>Book Hotels and Stay Packages at Lowest Price.</p>
          </div>
          <BookingForm />
        </div>
      </section>

      <main className="hotel-listings-container">
        <header className="header">
          <div className="search-filters">
            <div className="filter">Dates: Jun 23 - Jun 24</div>
            <div className="filter">2 adults</div>
            <div className="filter">Price</div>
            <div className="filter">Rating</div>
          </div>
        </header>

        <div className="map-container">
          <div className="map-placeholder">Map View</div>
        </div>

        <div className="main-content">
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Price per night</h3>
              {/* Price range slider would go here */}
              <div className="price-range">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Star rating</h3>
              {[5, 4, 3, 2, 1].map(stars => (
                <div key={stars} className="star-filter">
                  <input type="checkbox" id={`stars-${stars}`} />
                  <label htmlFor={`stars-${stars}`}>{'★'.repeat(stars)}</label>
                </div>
              ))}
            </div>
          </aside>

          <div className="hotels-list">
            {hotels.map(hotel => (
              <div key={hotel.id} className="hotel-card">
                <div className="hotel-image">
                  <img src={hotel.image} alt={hotel.name} />
                  <button className="wishlist-btn">♥</button>
                </div>
                <div className="hotel-info">
                  <h2>{hotel.name}</h2>
                  <div className="hotel-rating">
                    <span className="rating-badge">{hotel.rating}</span>
                    <span>{`Excellent (${hotel.reviewCount} reviews)`}</span>
                  </div>
                  <div className="hotel-amenities">
                    {hotel.amenities.map((amenity, index) => (
                      <span key={index} className="amenity">{amenity}</span>
                    ))}
                  </div>
                </div>
                <div className="hotel-pricing">
                  <div className="price">${hotel.price}</div>
                  <div className="per-night">per night</div>
                  <button className="view-deal-btn">View Deal</button>
                  <div className="provider-count">10+ providers</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Rooms;
