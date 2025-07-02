import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import outside1 from "../../assets/images/outside1.jpg"
import outside2 from "../../assets/images/outside2.jpg"
import outside3 from "../../assets/images/outside3.jpg"
import outside4 from "../../assets/images/outside4.jpg"
import outside5 from "../../assets/images/outside5.jpg"
import outside8 from "../../assets/images/outside8.jpg"
import profile1 from "../../assets/images/profile1.jpg"
import profile2 from "../../assets/images/profile2.jpg"
import profile3 from "../../assets/images/profile3.jpg"
import profile4 from "../../assets/images/profile4.jpg"
import profile5 from "../../assets/images/profile5.jpg"
import profile6 from "../../assets/images/profile6.jpg"
import { useEffect, useState } from 'react';
import { getPublicHotels } from '../../services/hotelApi';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../components/bookingForm/bookingForm.jsx';

import './home.css'

function Home() {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();

    // Handle booking form submit
    function handleBookingFormSubmit({ location, checkIn, checkOut, adults, children, rooms }) {
        // Redirect to /rooms with location as query param
        const params = new URLSearchParams();
        if (location) params.append('location', location);
        if (checkIn) params.append('checkIn', checkIn);
        if (checkOut) params.append('checkOut', checkOut);
        if (adults) params.append('adults', adults);
        if (children) params.append('children', children);
        if (rooms) params.append('rooms', rooms);
        navigate(`/rooms?${params.toString()}`);
    }

    useEffect(() => {
        async function fetchHotels() {
            const res = await getPublicHotels();
            setHotels(res.results ? res.results.filter(h => h.status === 'published') : []);
        }
        fetchHotels();
    }, []);

    return (
        <div>
            {/* Booking Form at the top */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 0' }}>
                <BookingForm onSubmit={handleBookingFormSubmit} />
            </div>
            <section className="popular-container">
                <h2 className="section-header">Popular Hotel Deals Right Now</h2>
                <div className="popular-grid">
                    {hotels.map(hotel => {
                        const t = hotel.template_data || {};
                        const thumb = t.socialThumb || t.fields?.bgImage || outside1;
                        const title = t.socialTitle || t.fields?.title || hotel.name;
                        const location = t.footerLocation || hotel.location || 'Unknown';
                        let minPrice = 'N/A';
                        if (Array.isArray(t.rooms) && t.rooms.length > 0) {
                            const prices = t.rooms.map(r => Number(r.price)).filter(p => !isNaN(p));
                            if (prices.length > 0) minPrice = Math.min(...prices);
                        }
                        return (
                            <div className="popular-card" key={hotel.id}>
                                <img src={thumb} alt="popular hotel" />
                                <div className="popular-content">
                                    <div className="popular-card-header">
                                        <h4>{title}</h4>
                                        <div className="rating-location">
                                            <p><b>8.5 - Excellent </b><br />(6216)</p>
                                            <p>
                                                <FontAwesomeIcon icon={['fas', 'fa-map-marker-alt']} />
                                                {location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="popular-deal">
                                        <div className="details">
                                            <div className="details-head">
                                                <p>Cheapest room</p>
                                                <p>
                                                    <span><FontAwesomeIcon icon={['fas', 'fa-check']} /></span>
                                                    Free cancellation
                                                </p>
                                            </div>
                                            <div className="price-date">
                                                <p><span>{minPrice !== 'N/A' ? `$${minPrice}` : 'N/A'}</span><br />per night</p>
                                                <p><br />First 8 days after payment</p>
                                            </div>
                                        </div>
                                        <button className="btn" onClick={() => navigate(`/website/preview/${hotel.id}`)}>Visit Website</button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="client">
                <div className="section-container client-container">
                    <h2 className="section-header">What our Clients Say</h2>
                    <div className="client-grid">
                        <div className="client-card">
                            <img src={profile1} alt="review-profile" />
                            <div className="star">
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div className="client-card">
                            <img src={profile2} alt="review-profile" />
                            <div className="star">
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div className="client-card">
                            <img src={profile3} alt="review-profile" />
                            <div className="star">
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div className="client-card">
                            <img src={profile4} alt="review-profile" />
                            <div className="star">
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div className="client-card">
                            <img src={profile5} alt="review-profile" />
                            <div className="star">
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div className="client-card">
                            <img src={profile6} alt="review-profile" />
                            <div className="star">
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star']} />
                                <FontAwesomeIcon icon={['fas', 'fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;