import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function HotelPreview() {
    const { hotelId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHotel() {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:8000/api/hotels/${hotelId}/`, {
                    headers: token ? { Authorization: `Token ${token}` } : {}
                });
                if (res.ok) {
                    const data = await res.json();
                    setHotel(data);
                }
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
            // try {
            //     const res = await fetch(`http://localhost:8000/api/hotels/${hotelId}/`);
            //     if (res.ok) {
            //         const data = await res.json();
            //         setHotel(data);
            //     }
            // } catch (err) {
            //     // handle error
            // } finally {
            //     setLoading(false);
            // }
        }
        fetchHotel();
    }, [hotelId]);

    if (loading) return <div>Loading preview...</div>;
    if (!hotel) return <div>Hotel not found.</div>;

    const t = hotel.template_data || {};
    const hero = t.fields || {};
    const amenities = t.amenities || [];
    const rooms = t.rooms || [];
    const aboutTitle = hero.aboutTitle || 'About Us';
    const aboutParagraph = hero.aboutParagraph || hotel.description;
    const footerContacts = hotel.footer_email || hotel.footer_phone ? [
        { type: 'email', value: hotel.footer_email },
        { type: 'phone', value: hotel.footer_phone }
    ] : [];

    return (
        <div style={{ width: '100vw', minHeight: '100vh', background: '#fff', overflow: 'auto', fontFamily: 'sans-serif' }}>
            {/* Hero Section */}
            <header style={{ padding: 32, background: '#222', color: '#fff', textAlign: 'center' }}>
                <h1>{hotel.logo_text || hotel.name}</h1>
                <p>{hotel.slogan}</p>
                <h2 style={{ marginTop: 32 }}>{hero.title || 'Welcome!'}</h2>
                <p>{hero.subtitle || hotel.description}</p>
                {hero.button && <button style={{ marginTop: 16, padding: '12px 32px', fontSize: 18 }}>{hero.button}</button>}
            </header>

            {/* About Section */}
            <section style={{ padding: 32, background: '#f7f7f7' }}>
                <h2>{aboutTitle}</h2>
                <p>{aboutParagraph}</p>
            </section>

            {/* Amenities Section */}
            <section style={{ padding: 32 }}>
                <h2>Amenities</h2>
                <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 24, listStyle: 'none', padding: 0 }}>
                    {amenities.map((a, i) => (
                        <li key={i} style={{ minWidth: 180, background: '#eee', borderRadius: 8, padding: 16 }}>
                            <strong>{a.title}</strong>
                            <div>{a.desc}</div>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Rooms Section */}
            <section style={{ padding: 32, background: '#f7f7f7' }}>
                <h2>Rooms</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                    {rooms.map((room, i) => (
                        <div key={i} style={{ minWidth: 220, background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
                            <h3>{room.name}</h3>
                            <div>{room.desc}</div>
                            <div style={{ marginTop: 8, fontWeight: 'bold' }}>${room.price}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer Section */}
            <footer style={{ padding: 32, background: '#222', color: '#fff', marginTop: 32 }}>
                <div style={{ marginBottom: 8 }}>{hotel.logo_text || hotel.name}</div>
                <div>{hotel.slogan}</div>
                <div style={{ marginTop: 16 }}>
                    {footerContacts.map((c, i) => c.value && <div key={i}>{c.type}: {c.value}</div>)}
                </div>
            </footer>
        </div>
    );
} 