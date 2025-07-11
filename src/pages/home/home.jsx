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
import { useNavigate, Link } from 'react-router-dom';
import BookingForm from '../../components/bookingForm/bookingForm.jsx';
import PopularSearches from '../../components/PopularSearches.jsx';
import RoomRecommendationCard from '../../components/RoomRecommendationCard.jsx';
import { getPersonalizedRoomRecommendations } from '../../services/hotelApi';
// ADD: import for review API
import { getReviews, createReview, deleteReview } from '../../services/reviewApi';
import StarRating from '../../components/StarRating.jsx';

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

    // ADD: review state
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [reviewError, setReviewError] = useState('');
    const [stars, setStars] = useState(0);
    const [comment, setComment] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const token = localStorage.getItem('token');

    // Add state for photo preview and file
    const [photo, setPhoto] = useState(null);
    const [photoFile, setPhotoFile] = useState(null);

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
        // Fetch reviews
        async function fetchReviews() {
            setReviewLoading(true);
            try {
                const res = await getReviews();
                setReviews(Array.isArray(res.results) ? res.results : res);
            } catch (err) {
                setReviewError('Failed to load reviews.');
            }
            setReviewLoading(false);
        }
        fetchReviews();
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
                    {/* Modern Review Form (only for authenticated users) */}
                    <div className="review-form" style={{ maxWidth: 480, margin: '0 auto 32px', background: '#fff', borderRadius: 24, boxShadow: '0 2px 16px #0001', padding: 32 }}>
                        <h2 style={{ textAlign: 'center', fontWeight: 700, marginBottom: 24 }}>Share Your Experience</h2>
                        {token ? (
                            <form className="review-form" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    setSubmitting(true);
                                    setReviewError('');
                                    try {
                                        const formData = new FormData();
                                        formData.append('stars', stars);
                                        formData.append('comment', comment);
                                        if (photoFile) formData.append('profile_photo', photoFile);
                                        await createReview(formData, token);
                                        // Refresh reviews
                                        const res = await getReviews();
                                        setReviews(Array.isArray(res.results) ? res.results : res);
                                        setStars(0);
                                        setComment('');
                                        setPhoto(null);
                                        setPhotoFile(null);
                                    } catch (err) {
                                        setReviewError('Failed to submit review.');
                                    }
                                    setSubmitting(false);
                                }}>
                                <div className="form-group">
                                    <label style={{ fontWeight: 600, marginBottom: 4 }}>Your Photo (Required)</label>
                                    <input type="file" accept="image/*" required
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                setPhotoFile(e.target.files[0]);
                                                setPhoto(URL.createObjectURL(e.target.files[0]));
                                            } else {
                                                setPhotoFile(null);
                                                setPhoto(null);
                                            }
                                        }}
                                        style={{ padding: 8, borderRadius: 8, border: '1px solid #eee', background: '#fafbfc' }} />
                                    {photo && (
                                        <img
                                            src={photo}
                                            alt="Preview"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '50%' }}
                                        />
                                    )}
                                </div>
                                <div className="form-group">
                                    <label style={{ fontWeight: 600, marginBottom: 4 }}>Rating (Required)</label>
                                    <StarRating value={stars} onChange={setStars} showValue={true} />
                                </div>
                                <div className="form-group">
                                    <label style={{ fontWeight: 600, marginBottom: 4 }}>Comment (Optional)</label>
                                    <textarea value={comment} onChange={e => setComment(e.target.value)}
                                        placeholder="Share your experience..." rows={3}
                                        style={{ resize: 'vertical', borderRadius: 8, border: '1px solid #eee', padding: 12, fontSize: 16, background: '#fafbfc' }} />
                                </div>
                                <button className="btn" type="submit" disabled={submitting}
                                    style={{ width: '100%' }}>
                                    {submitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                                {reviewError && <span style={{ color: 'red', marginLeft: 8 }}>{reviewError}</span>}
                            </form>
                        ) : (
                            <div style={{ marginBottom: 24 }}>
                                <span>You must <a href="/login">login</a> or <a href="/signUp">register</a> to leave a review.</span>
                            </div>
                        )}
                    </div>
                    {/* Review Grid */}
                    {reviewLoading ? (
                        <div>Loading reviews...</div>
                    ) : reviews.length === 0 ? (
                        <div style={{ color: '#888', fontSize: '1.1rem', marginBottom: 16 }}>No reviews yet. Be the first to review!</div>
                    ) : (
                        <div className="client-grid">
                            {reviews.slice(0, 6).map((review) => (
                                <div className="client-card" key={review.id} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0003', padding: 24, color: '#222' }}>
                                    {/* Card header: profile, name, date on left; stars on right */}
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                                        <img src={review.profile_photo || profile1} alt="review-profile" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', marginRight: 14 }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 600, fontSize: 17 }}>{review.username}</div>
                                            <div style={{ color: '#888', fontSize: 13 }}>{new Date(review.created_at).toLocaleDateString()}</div>
                                        </div>
                                        <div className="star" style={{ marginLeft: 12, minWidth: 100, textAlign: 'right' }}>
                                            {[...Array(5)].map((_, i) => (
                                                <FontAwesomeIcon
                                                    key={i}
                                                    icon={['fas', 'fa-star']}
                                                    style={{ color: i < review.stars ? '#FFC107' : '#e0e0e0', fontSize: 18 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p style={{ minHeight: 48, color: '#444', marginBottom: 0 }}>{review.comment}</p>
                                    <div style={{ fontSize: '0.9em', color: '#888', marginTop: 8 }}>
                                        <span>{review.email}</span>
                                    </div>
                                    {token && userEmail === review.email && (
                                        <button className="btn" style={{ marginTop: 8, background: '#e74c3c', color: '#fff' }}
                                            disabled={deleteLoading === review.id}
                                            onClick={async () => {
                                                setDeleteLoading(review.id);
                                                try {
                                                    await deleteReview(review.id, token);
                                                    setReviews(reviews.filter(r => r.id !== review.id));
                                                } catch {
                                                    alert('Failed to delete review.');
                                                }
                                                setDeleteLoading(null);
                                            }}>
                                            {deleteLoading === review.id ? 'Deleting...' : 'Delete'}
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                    {/* See more reviews link */}
                    <div style={{ marginTop: 16, textAlign: 'center' }}>
                        <Link to="/review" className="btn" style={{ textDecoration: 'none' }}>See more reviews</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;