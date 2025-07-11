import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import outside1 from "../../assets/images/outside1.jpg"
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
import PopularSearches from '../../components/PopularSearches.jsx';
import RoomRecommendationCard from '../../components/RoomRecommendationCard.jsx';
import { getPersonalizedRoomRecommendations } from '../../services/hotelApi';

import './home.css'

function Home() {
    const [hotels, setHotels] = useState([]);
    const [roomRecs, setRoomRecs] = useState([]);
    const [loadingRecs, setLoadingRecs] = useState(true);
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
        // Fetch personalized recommendations if logged in
        async function fetchRecs() {
            setLoadingRecs(true);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setRoomRecs([]);
                    setLoadingRecs(false);
                    return;
                }
                const recs = await getPersonalizedRoomRecommendations(token);
                setRoomRecs(Array.isArray(recs) ? recs : []);
            } catch {
                setRoomRecs([]);
            }
            setLoadingRecs(false);
        }
        fetchRecs();
    }, []);

    return (
        <div>
            {/* Booking Form at the top */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 0' }}>
                <BookingForm onSubmit={handleBookingFormSubmit} />
            </div>

            {/* Recommendations Section */}
            <section style={{ maxWidth: 1200, margin: '0 auto', marginBottom: 32 }}>
                <h2 className="section-header">Recommended for You</h2>
                {loadingRecs ? (
                    <div>Loading recommendations...</div>
                ) : roomRecs.length === 0 ? (
                    <div style={{ color: '#888', fontSize: '1.1rem', marginBottom: 16 }}>No personalized recommendations yet. Try searching or booking to get recommendations!</div>
                ) : (
                    <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: 8 }}>
                        {roomRecs.map((rec) => {
                            const { hotel, room } = rec;
                            const t = hotel.template_data || {};
                            const thumb = t.socialThumb || t.fields?.bgImage;
                            const title = t.socialTitle || t.fields?.title || hotel.name;
                            const hotelLocation = t.footerLocation || hotel.location || 'Unknown';
                            return (
                                <RoomRecommendationCard
                                    key={room.id}
                                    room={{
                                        image: thumb,
                                        name: room.name || room.room_type,
                                        type: room.room_type,
                                        hotelName: title,
                                        location: hotelLocation,
                                        price: room.price_per_night || room.price,
                                        rating: hotel.rating || t.rating || null,
                                        recommended: true,
                                        websiteUrl: `/website/preview/${hotel.id}`,
                                    }}
                                    onBookNow={() => navigate(`/booking/${hotel.id}?room=${room.id}`)}
                                    onViewWebsite={() => navigate(`/website/preview/${hotel.id}`)}
                                />
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="popular-container">
                <h2 className="section-header">Featured Hotels Right Now</h2>
                <div className="popular-grid">
                    {hotels.map(hotel => {
                        const t = hotel.template_data || {};
                        const thumb = t.socialThumb || t.fields?.bgImage || outside1;
                        const title = t.socialTitle || t.fields?.title || hotel.name;
                        const location = t.footerLocation || hotel.location || 'Unknown';
                        let minPrice = 'N/A';
                        if (Array.isArray(t.rooms) && t.rooms.length > 0) {
                            const prices = t.rooms.map(r => Number(r.price_per_night)).filter(p => !isNaN(p));
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
                                    {/* Amenities section */}
                                    {Array.isArray(t.amenities) && t.amenities.length > 0 && (
                                        <div className="popular-amenities" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0' }}>
                                            {t.amenities.map((a, idx) => (
                                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8rem', fontWeight: 600, color: '#444', background: 'none', border: '1px solid #ddd', borderRadius: 8, padding: '2px 8px' }}>
                                                    <FontAwesomeIcon icon={["fas", a.icon?.replace('fa-', '') || 'fa-star']} style={{ color: '#0b3e66', fontSize: '0.8rem' }} />
                                                    <span>{a.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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

            <section className="searches-container">
                <PopularSearches />
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