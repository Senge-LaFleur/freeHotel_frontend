import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import editor1 from '../../assets/images/editor1.jpg';
import editor2 from '../../assets/images/editor2.png';
import editor3 from '../../assets/images/editor3.jpg';
import './templateEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createHotel, updateHotel, publishHotel } from '../../services/hotelApi';

const templates = {
    'luxury-hotel': {
        name: 'Luxury Hotel',
        image: editor1,
        default: {
            title: 'Your Paradise Found',
            subtitle: 'Discover a World of Serenity, Your Escape From the Everyday',
            button: 'Reserve Now',
            logo: '',
            slogan: '',
            bgColor: '#1a1a1a',
            textColor: '#fff',
            buttonColor: '#ffd000',
            buttonTextColor: '#0b3e66',
        }
    },
    'boutique-hotel': {
        name: 'Boutique Hotel',
        image: editor2,
        default: {
            title: 'Warmth in Every Cup',
            subtitle: 'Discover your new favorite coffee and pastry pairing at our cafe.',
            button: 'View Menu',
            logo: '',
            slogan: '',
            bgColor: '#3a2c1a',
            textColor: '#fff',
            buttonColor: '#ffd000',
            buttonTextColor: '#3a2c1a',
        }
    },
    'business-hotel': {
        name: 'Business Hotel',
        image: editor3,
        default: {
            title: 'Coming Soon',
            subtitle: 'The Future of Corporate Solutions',
            button: 'Get Notified',
            logo: '',
            slogan: '',
            bgColor: '#1a2c1a',
            textColor: '#fff',
            buttonColor: '#ffd000',
            buttonTextColor: '#1a2c1a',
        }
    }
};

export default function TemplateEditor() {
    const { templateId, hotelId } = useParams();
    const navigate = useNavigate();
    const template = templates[templateId];
    const userToken = localStorage.getItem('token');

    const [fields, setFields] = useState(template ? template.default : {});
    const [bgType, setBgType] = useState('color'); // 'color' or 'image'
    const [bgImage, setBgImage] = useState(template ? template.image : '');
    const [bgBrightness, setBgBrightness] = useState(1);
    const [buttonHoverBg, setButtonHoverBg] = useState('#ffe066');
    const [buttonHoverText, setButtonHoverText] = useState('#0b3e66');
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [previewMode, setPreviewMode] = useState('desktop'); // 'desktop' or 'mobile'
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        general: true,
        navbar: false,
        hero: false,
        about: false,
        amenities: false,
        rooms: false,
        footer: false,
        finishing: false,
    });
    const [generalPadding, setGeneralPadding] = useState(32);
    const [navbarPadding, setNavbarPadding] = useState(24);
    const [heroPadding, setHeroPadding] = useState(32);
    const [aboutTitle, setAboutTitle] = useState('THE PERFECT GETAWAY');
    const [aboutParagraph, setAboutParagraph] = useState('Create Lasting Memories with Your Loved Ones, Your Family Paradise Found.');
    const [aboutImage, setAboutImage] = useState(null);
    const [aboutBgColor, setAboutBgColor] = useState('#e9f0f7');
    const [aboutPadding, setAboutPadding] = useState(32);
    const [aboutLayout, setAboutLayout] = useState('left');
    const [amenities, setAmenities] = useState([
        { icon: 'fa-swimmer', title: 'SWIMMING POOL', desc: 'Dive into our sparkling pools, where the sun kisses your skin.' },
        { icon: 'fa-bed', title: 'COMFORTABLE', desc: 'Relax in our luxurious rooms designed for your comfort.' },
        { icon: 'fa-concierge-bell', title: 'WARM HOSPITALITY', desc: 'Experience our friendly and attentive service.' },
    ]);
    const [amenitiesBgColor, setAmenitiesBgColor] = useState('#e9f0f7');
    const [amenitiesPadding, setAmenitiesPadding] = useState(32);
    const [editingAmenity, setEditingAmenity] = useState(null);
    const [newAmenity, setNewAmenity] = useState({ icon: 'fa-swimmer', title: '', desc: '' });
    const [roomFilters, setRoomFilters] = useState({
        type: 'Standard',
        price: 'under99',
        beds: '1',
    });
    const [roomFilterOptions, setRoomFilterOptions] = useState({
        type: ['Standard', 'Deluxe', 'VIP'],
        price: ['under99', '99-199', '199-299'],
        beds: ['1', '2'],
    });
    const [rooms, setRooms] = useState([
        { image: null, name: 'Standard Room', desc: 'A cozy room for two.', price: 89 },
        { image: null, name: 'Deluxe Room', desc: 'Spacious room with a view.', price: 159 },
    ]);
    const [editingRoom, setEditingRoom] = useState(null);
    const [newRoom, setNewRoom] = useState({ image: null, name: '', desc: '', price: '' });
    const [roomsBgColor, setRoomsBgColor] = useState('#fff');
    const [roomsPadding, setRoomsPadding] = useState(32);
    const [footerLogo, setFooterLogo] = useState('');
    const [footerName, setFooterName] = useState('LOGO TEXT HERE');
    const [footerSlogan, setFooterSlogan] = useState('SLOGAN HERE');
    const [footerLinks, setFooterLinks] = useState(['Home', 'About', 'Contact']);
    const [footerContacts, setFooterContacts] = useState([
        { type: 'email', value: 'info@hotel.com' },
        { type: 'phone', value: '+1234567890' },
    ]);
    const [footerSocials, setFooterSocials] = useState([
        { icon: 'fa-facebook-f', name: 'Facebook', handle: 'hotel' },
        { icon: 'fa-instagram', name: 'Instagram', handle: '@hotel' },
    ]);
    const [footerBgColor, setFooterBgColor] = useState('#222');
    const [footerPadding, setFooterPadding] = useState(32);
    const [newFooterLink, setNewFooterLink] = useState('');
    const [newFooterContact, setNewFooterContact] = useState({ type: 'email', value: '' });
    const [newFooterSocial, setNewFooterSocial] = useState({ icon: 'fa-facebook-f', name: '', handle: '' });
    // Finishing Touches state
    const [favicon, setFavicon] = useState('');
    const [domain, setDomain] = useState('');
    const [socialThumb, setSocialThumb] = useState('');
    const [socialTitle, setSocialTitle] = useState('');
    const [socialDesc, setSocialDesc] = useState('');
    const [cookieEnabled, setCookieEnabled] = useState(true);

    const aboutSectionRef = useRef(null);
    const amenitiesSectionRef = useRef(null);
    const roomsSectionRef = useRef(null);

    useEffect(() => {
        if (!template) navigate('/website');
    }, [template, navigate]);

    // Prefill logic on mount (if editing an existing hotel)
    useEffect(() => {
        async function fetchHotel() {
            if (hotelId) {
                try {
                    const res = await fetch(`http://localhost:8000/api/hotels/${hotelId}/`, {
                        headers: { Authorization: `Token ${userToken}` }
                    });
                    if (res.ok) {
                        const hotel = await res.json();
                        setFields(hotel.template_data?.fields || template.default);
                        setFooterName(hotel.logo_text || hotel.name);
                        setFooterContacts([
                            { type: 'email', value: hotel.footer_email || hotel.email },
                            { type: 'phone', value: hotel.footer_phone || hotel.phone_number }
                        ]);
                        setFooterSlogan(hotel.slogan || '');
                        setDomain(hotel.domain_name || '');
                        // ...prefill other fields as needed
                    }
                } catch (err) {
                    alert('Error loading hotel data');
                }
            } else {
                // Prefill with registration info if available
                const regEmail = localStorage.getItem('userEmail');
                const regPhone = localStorage.getItem('userPhone');
                setFooterContacts([
                    { type: 'email', value: regEmail || '' },
                    { type: 'phone', value: regPhone || '' }
                ]);
                setFooterName(localStorage.getItem('hotelName') || 'LOGO TEXT HERE');
            }
        }
        fetchHotel();
    }, [hotelId, template]);

    if (!template) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
    };

    const handleBgTypeChange = (e) => {
        setBgType(e.target.value);
    };

    const handleBgImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setBgImage(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleBgBrightnessChange = (e) => {
        setBgBrightness(Number(e.target.value));
    };

    const toggleSection = (section) => {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
    };

    const handleAboutImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setAboutImage(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleAmenityChange = (idx, field, value) => {
        setAmenities((prev) => prev.map((a, i) => i === idx ? { ...a, [field]: value } : a));
    };

    const handleAddAmenity = () => {
        setAmenities((prev) => [...prev, { ...newAmenity }]);
        setNewAmenity({ icon: 'fa-swimmer', title: '', desc: '' });
        setTimeout(() => {
            amenitiesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleRemoveAmenity = (idx) => {
        setAmenities((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleRoomImageChange = (e, idx, isNew) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (isNew) setNewRoom(r => ({ ...r, image: ev.target.result }));
                else setRooms(rs => rs.map((r, i) => i === idx ? { ...r, image: ev.target.result } : r));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRoomChange = (idx, field, value) => {
        setRooms(rs => rs.map((r, i) => i === idx ? { ...r, [field]: value } : r));
    };

    const handleAddRoom = () => {
        setRooms(rs => [...rs, { ...newRoom, price: Number(newRoom.price) }]);
        setNewRoom({ image: null, name: '', desc: '', price: '' });
    };

    const handleRemoveRoom = (idx) => {
        setRooms(rs => rs.filter((_, i) => i !== idx));
    };

    // Handlers for finishing touches
    const handleFaviconChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setFavicon(ev.target.result);
            reader.readAsDataURL(file);
        }
    };
    const handleSocialThumbChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setSocialThumb(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    // Save Progress Handler
    const handleSaveProgress = async () => {
        const hotelData = {
            name: footerName,
            logo_text: footerName,
            slogan: footerSlogan,
            footer_email: footerContacts.find(c => c.type === 'email')?.value,
            footer_phone: footerContacts.find(c => c.type === 'phone')?.value,
            domain_name: domain,
            template_data: {
                fields,
                amenities,
                rooms,
                // ...add other sidebar state as needed
            },
            status: 'incomplete',
        };
        try {
            if (hotelId) {
                await updateHotel(hotelId, hotelData, userToken);
            } else {
                await createHotel(hotelData, userToken);
            }
            alert('Progress saved!');
            navigate('/dashboard');
        } catch (err) {
            alert('Error saving progress');
        }
    };

    // Publish Handler
    const handlePublish = async () => {
        // Check if finishing touches are done
        if (!domain /* or other finishing touches checks */) {
            // Redirect to finishing touches section
            setExpandedSections(prev => ({ ...prev, finishing: true }));
            alert('Please complete the finishing touches before publishing.');
            return;
        }
        // Redirect to plan page (simulate plan selection for now)
        // In real app, you would navigate to /plan and handle plan selection
        // For now, just publish as free plan
        try {
            if (!hotelId) {
                alert('Please save your hotel first!');
                return;
            }
            await publishHotel(hotelId, userToken);
            alert('Hotel published!');
            navigate('/dashboard');
        } catch (err) {
            alert('Error publishing hotel');
        }
    };

    return (
        <div className="template-editor">

            {/* ================== Top Navbar ================== */}
            <nav className="editor-navbar">
                <div className="navbar-left">
                    <span className="navbar-title">FreeHotel</span>
                    <Link to="/website" className="navbar-back">&gt; Back</Link>
                </div>
                <div className="navbar-right">
                    <button
                        className="navbar-btn save"
                        onClick={handleSaveProgress}
                    >
                        Save Progress
                    </button>
                    <button
                        className="navbar-btn publish"
                        onClick={handlePublish}
                    >
                        Publish
                    </button>
                </div>
            </nav>


            <div class="editor-body-container">

                {/* ================== Sidebar ================== */}
                <aside className="editor-sidebar">
                    <div className="editor-sidebar-title">
                        <h2>Edit Content</h2>
                    </div>

                    <div className="sidebar-section-container">

                        {/* General Styling Section */}
                        <div className={`sidebar-section${expandedSections.general ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('general')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-sliders-h"]} />
                                </span>
                                <span className="sidebar-section-title">General Styling</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.general ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.general && (
                                <div className="sidebar-section-content">
                                    {/* Background type/color/image/brightness */}
                                    <div className="editor-section">
                                        <label>Background Type</label>
                                        <div style={{ display: 'flex', gap: '1rem' }}>
                                            <label>
                                                <input type="radio" name="bgType" value="color" checked={bgType === 'color'} onChange={handleBgTypeChange} />
                                                Color
                                            </label>
                                            <label>
                                                <input type="radio" name="bgType" value="image" checked={bgType === 'image'} onChange={handleBgTypeChange} />
                                                Image
                                            </label>
                                        </div>
                                    </div>
                                    {bgType === 'color' && (
                                        <div className="editor-section">
                                            <label>Background Color</label>
                                            <input name="bgColor" type="color" value={fields.bgColor} onChange={handleChange} />
                                        </div>
                                    )}
                                    {bgType === 'image' && (
                                        <>
                                            <div className="editor-section">
                                                <label>Background Image</label>
                                                <input type="file" accept="image/*" onChange={handleBgImageChange} />
                                                <div style={{ marginTop: '8px' }}>
                                                    <img src={bgImage} alt="Background Preview" style={{ width: '100%', maxHeight: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                                                </div>
                                            </div>
                                            <div className="editor-section">
                                                <label>Brightness</label>
                                                <input
                                                    type="range"
                                                    min="0.3"
                                                    max="1.5"
                                                    step="0.01"
                                                    value={bgBrightness}
                                                    onChange={handleBgBrightnessChange}
                                                />
                                                <span style={{ fontSize: '0.95rem', color: '#888' }}> {bgBrightness}</span>
                                            </div>
                                        </>
                                    )}
                                    <div className="editor-section">
                                        <label>Text Color</label>
                                        <input name="textColor" type="color" value={fields.textColor} onChange={handleChange} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Button Color</label>
                                        <input name="buttonColor" type="color" value={fields.buttonColor} onChange={handleChange} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Button Text Color</label>
                                        <input name="buttonTextColor" type="color" value={fields.buttonTextColor} onChange={handleChange} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Button Hover Color</label>
                                        <input type="color" value={buttonHoverBg} onChange={e => setButtonHoverBg(e.target.value)} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Button Hover Text Color</label>
                                        <input type="color" value={buttonHoverText} onChange={e => setButtonHoverText(e.target.value)} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navbar Section */}
                        <div className={`sidebar-section${expandedSections.navbar ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('navbar')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-bars"]} />
                                </span>
                                <span className="sidebar-section-title">Navbar</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.navbar ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.navbar && (
                                <div className="sidebar-section-content">
                                    <div className="editor-section">
                                        <label>Navbar Padding</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={navbarPadding}
                                            onChange={e => setNavbarPadding(Number(e.target.value))}
                                        />
                                        <span style={{ fontSize: '0.95rem', color: '#888' }}> {navbarPadding}px</span>
                                    </div>
                                    <div className="editor-section">
                                        <label>Logo Text</label>
                                        <input name="logo" value={fields.logo} onChange={handleChange} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Slogan</label>
                                        <input name="slogan" value={fields.slogan} onChange={handleChange} />
                                    </div>
                                    {/* Add more navbar options here later */}
                                </div>
                            )}
                        </div>

                        {/* Hero Section */}
                        <div className={`sidebar-section${expandedSections.hero ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('hero')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-bullhorn"]} />
                                </span>
                                <span className="sidebar-section-title">Hero Section</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.hero ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.hero && (
                                <div className="sidebar-section-content">
                                    <div className="editor-section">
                                        <label>Hero Section Padding</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={heroPadding}
                                            onChange={e => setHeroPadding(Number(e.target.value))}
                                        />
                                        <span style={{ fontSize: '0.95rem', color: '#888' }}> {heroPadding}px</span>
                                    </div>
                                    <div className="editor-section">
                                        <label>Title</label>
                                        <input name="title" value={fields.title} onChange={handleChange} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Subtitle</label>
                                        <input name="subtitle" value={fields.subtitle} onChange={handleChange} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Button Text</label>
                                        <input name="button" value={fields.button} onChange={handleChange} />
                                    </div>
                                    {/* Add more hero options here later */}
                                </div>
                            )}
                        </div>

                        {/* About Section */}
                        <div className={`sidebar-section${expandedSections.about ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('about')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-info-circle"]} />
                                </span>
                                <span className="sidebar-section-title">About</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.about ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.about && (
                                <div className="sidebar-section-content">
                                    <div className="editor-section">
                                        <label>Title</label>
                                        <input value={aboutTitle} onChange={e => setAboutTitle(e.target.value)} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Paragraph</label>
                                        <textarea value={aboutParagraph} onChange={e => setAboutParagraph(e.target.value)} rows={3} style={{ resize: 'vertical' }} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Image</label>
                                        <input type="file" accept="image/*" onChange={handleAboutImageChange} />
                                        {aboutImage && <img src={aboutImage} alt="About Preview" style={{ width: '100%', maxHeight: '80px', objectFit: 'cover', borderRadius: '6px', marginTop: '8px' }} />}
                                    </div>
                                    <div className="editor-section">
                                        <label>Layout</label>
                                        <select value={aboutLayout} onChange={e => setAboutLayout(e.target.value)}>
                                            <option value="left">Title/Paragraph Left, Image Right</option>
                                            <option value="center">All Center</option>
                                            <option value="right">Title/Paragraph Right, Image Left</option>
                                        </select>
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Background</label>
                                        <input type="color" value={aboutBgColor} onChange={e => setAboutBgColor(e.target.value)} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Padding</label>
                                        <input type="range" min="0" max="100" value={aboutPadding} onChange={e => setAboutPadding(Number(e.target.value))} />
                                        <span style={{ fontSize: '0.95rem', color: '#888' }}> {aboutPadding}px</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Amenities Section */}
                        <div className={`sidebar-section${expandedSections.amenities ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('amenities')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-cogs"]} />
                                </span>
                                <span className="sidebar-section-title">Amenities</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.amenities ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.amenities && (
                                <div className="sidebar-section-content">
                                    {amenities.map((a, idx) => (
                                        <div key={idx} className="editor-section" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                                            <span style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}><FontAwesomeIcon icon={["fas", a.icon]} /></span>
                                            <div style={{ flex: 1 }}>
                                                <input value={a.title} onChange={e => handleAmenityChange(idx, 'title', e.target.value)} placeholder="Title" style={{ marginBottom: '0.2rem', width: '100%' }} />
                                                <input value={a.icon} onChange={e => handleAmenityChange(idx, 'icon', e.target.value)} placeholder="Icon (fa-swimmer)" style={{ marginBottom: '0.2rem', width: '100%' }} />
                                                <textarea value={a.desc} onChange={e => handleAmenityChange(idx, 'desc', e.target.value)} placeholder="Description" rows={2} style={{ width: '100%', resize: 'vertical' }} />
                                            </div>
                                            <button onClick={() => handleRemoveAmenity(idx)} style={{ background: 'none', border: 'none', color: '#c00', fontSize: '1.2rem', cursor: 'pointer' }} title="Remove"><FontAwesomeIcon icon={["fas", "fa-trash"]} /></button>
                                        </div>
                                    ))}
                                    <div className="editor-section" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <span style={{ fontSize: '1.5rem', marginTop: '0.2rem' }}><FontAwesomeIcon icon={["fas", newAmenity.icon]} /></span>
                                        <div style={{ flex: 1 }}>
                                            <input value={newAmenity.title} onChange={e => setNewAmenity(n => ({ ...n, title: e.target.value }))} placeholder="Title" style={{ marginBottom: '0.2rem', width: '100%' }} />
                                            <input value={newAmenity.icon} onChange={e => setNewAmenity(n => ({ ...n, icon: e.target.value }))} placeholder="Icon (fa-swimmer)" style={{ marginBottom: '0.2rem', width: '100%' }} />
                                            <textarea value={newAmenity.desc} onChange={e => setNewAmenity(n => ({ ...n, desc: e.target.value }))} placeholder="Description" rows={2} style={{ width: '100%', resize: 'vertical' }} />
                                        </div>
                                        <button onClick={handleAddAmenity} style={{ background: 'var(--light-blue)', border: 'none', color: '#fff', fontSize: '1.2rem', padding: '0.4rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }} title="Add"><FontAwesomeIcon icon={["fas", "fa-plus"]} /></button>
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Background</label>
                                        <input type="color" value={amenitiesBgColor} onChange={e => setAmenitiesBgColor(e.target.value)} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Padding</label>
                                        <input type="range" min="0" max="100" value={amenitiesPadding} onChange={e => setAmenitiesPadding(Number(e.target.value))} />
                                        <span style={{ fontSize: '0.95rem', color: '#888' }}> {amenitiesPadding}px</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rooms Section */}
                        <div className={`sidebar-section${expandedSections.rooms ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('rooms')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-bed"]} />
                                </span>
                                <span className="sidebar-section-title">Rooms</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.rooms ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.rooms && (
                                <div className="sidebar-section-content">
                                    <div className="editor-section">
                                        <label>Filter Options (edit options below)</label>
                                        <form
                                            className="room-filter-form"
                                            style={{
                                                display: 'flex',
                                                gap: '1.2rem',
                                                justifyContent: 'center',
                                                marginBottom: '2rem',
                                                flexWrap: 'wrap',
                                                background: '#fff',
                                                borderRadius: 16,
                                                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                                padding: '1.1rem 1.5rem',
                                                alignItems: 'center',
                                                minWidth: 220,
                                                maxWidth: 520,
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                            }}
                                        >
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <FontAwesomeIcon icon={["fas", "fa-bed"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                                                <select
                                                    value={roomFilters.type}
                                                    onChange={e => setRoomFilters(f => ({ ...f, type: e.target.value }))}
                                                    style={{
                                                        border: '1px solid #e0e6ed',
                                                        borderRadius: 8,
                                                        padding: '0.4rem 1.1rem',
                                                        fontSize: '1rem',
                                                        background: '#f7fafd',
                                                        color: '#222',
                                                        outline: 'none',
                                                        minWidth: 90,
                                                    }}
                                                >
                                                    {roomFilterOptions.type.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <FontAwesomeIcon icon={["fas", "fa-dollar-sign"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                                                <select
                                                    value={roomFilters.price}
                                                    onChange={e => setRoomFilters(f => ({ ...f, price: e.target.value }))}
                                                    style={{
                                                        border: '1px solid #e0e6ed',
                                                        borderRadius: 8,
                                                        padding: '0.4rem 1.1rem',
                                                        fontSize: '1rem',
                                                        background: '#f7fafd',
                                                        color: '#222',
                                                        outline: 'none',
                                                        minWidth: 110,
                                                    }}
                                                >
                                                    <option value="under99">Under $99</option>
                                                    <option value="99-199">$99 - $199</option>
                                                    <option value="199-299">$199 - $299</option>
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <FontAwesomeIcon icon={["fas", "fa-users"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                                                <select
                                                    value={roomFilters.beds}
                                                    onChange={e => setRoomFilters(f => ({ ...f, beds: e.target.value }))}
                                                    style={{
                                                        border: '1px solid #e0e6ed',
                                                        borderRadius: 8,
                                                        padding: '0.4rem 1.1rem',
                                                        fontSize: '1rem',
                                                        background: '#f7fafd',
                                                        color: '#222',
                                                        outline: 'none',
                                                        minWidth: 80,
                                                    }}
                                                >
                                                    {roomFilterOptions.beds.map(opt => <option key={opt} value={opt}>{opt} bed{opt !== '1' ? 's' : ''}</option>)}
                                                </select>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="editor-section">
                                        <label>Edit Filter Options</label>
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <input value={roomFilterOptions.type.join(',')} onChange={e => setRoomFilterOptions(o => ({ ...o, type: e.target.value.split(',').map(s => s.trim()) }))} placeholder="Type (e.g. Standard,Deluxe,VIP)" />
                                            <input value={roomFilterOptions.price ? roomFilterOptions.price.join(',') : ''} onChange={e => setRoomFilterOptions(o => ({ ...o, price: e.target.value.split(',').map(s => s.trim()) }))} placeholder="Price Ranges (e.g. under99,99-199,199-299)" />
                                            <input value={roomFilterOptions.beds.join(',')} onChange={e => setRoomFilterOptions(o => ({ ...o, beds: e.target.value.split(',').map(s => s.trim()) }))} placeholder="Beds (e.g. 1,2)" />
                                        </div>
                                    </div>
                                    <div className="editor-section">
                                        <label>Rooms</label>
                                        {rooms.map((r, idx) => (
                                            <div key={idx} style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 8, padding: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <input type="file" accept="image/*" onChange={e => handleRoomImageChange(e, idx, false)} style={{ width: 60 }} />
                                                {r.image && <img src={r.image} alt="Room" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} />}
                                                <input value={r.name} onChange={e => handleRoomChange(idx, 'name', e.target.value)} placeholder="Name" style={{ width: 100 }} />
                                                <input value={r.desc} onChange={e => handleRoomChange(idx, 'desc', e.target.value)} placeholder="Description" style={{ width: 120 }} />
                                                <input type="number" value={r.price} onChange={e => handleRoomChange(idx, 'price', e.target.value)} placeholder="Price" style={{ width: 60 }} />
                                                <button onClick={() => handleRemoveRoom(idx)} style={{ background: 'none', border: 'none', color: '#c00', fontSize: '1.2rem', cursor: 'pointer' }} title="Remove"><FontAwesomeIcon icon={["fas", "fa-trash"]} /></button>
                                            </div>
                                        ))}
                                        <div style={{ border: '1px solid #eee', borderRadius: 8, marginBottom: 8, padding: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
                                            <input type="file" accept="image/*" onChange={e => handleRoomImageChange(e, null, true)} style={{ width: 60 }} />
                                            {newRoom.image && <img src={newRoom.image} alt="Room" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} />}
                                            <input value={newRoom.name} onChange={e => setNewRoom(r => ({ ...r, name: e.target.value }))} placeholder="Name" style={{ width: 100 }} />
                                            <input value={newRoom.desc} onChange={e => setNewRoom(r => ({ ...r, desc: e.target.value }))} placeholder="Description" style={{ width: 120 }} />
                                            <input type="number" value={newRoom.price} onChange={e => setNewRoom(r => ({ ...r, price: e.target.value }))} placeholder="Price" style={{ width: 60 }} />
                                            <button onClick={handleAddRoom} style={{ background: 'var(--light-blue)', border: 'none', color: '#fff', fontSize: '1.2rem', padding: '0.4rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }} title="Add"><FontAwesomeIcon icon={["fas", "fa-plus"]} /></button>
                                        </div>
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Background</label>
                                        <input type="color" value={roomsBgColor} onChange={e => setRoomsBgColor(e.target.value)} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Padding</label>
                                        <input type="range" min="0" max="100" value={roomsPadding} onChange={e => setRoomsPadding(Number(e.target.value))} />
                                        <span style={{ fontSize: '0.95rem', color: '#888' }}> {roomsPadding}px</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Section */}
                        <div className={`sidebar-section${expandedSections.footer ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('footer')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-shoe-prints"]} />
                                </span>
                                <span className="sidebar-section-title">Footer</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.footer ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.footer && (
                                <div className="sidebar-section-content">
                                    <div className="editor-section">
                                        <label>Logo/Name/Slogan</label>
                                        <input value={footerLogo} onChange={e => setFooterLogo(e.target.value)} placeholder="Logo (text or image url)" />
                                        <input value={footerName} onChange={e => setFooterName(e.target.value)} placeholder="Name" />
                                        <input value={footerSlogan} onChange={e => setFooterSlogan(e.target.value)} placeholder="Slogan" />
                                    </div>
                                    <div className="editor-section">
                                        <label>Quick Links</label>
                                        {footerLinks.map((l, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <input value={l} onChange={e => setFooterLinks(links => links.map((li, idx) => idx === i ? e.target.value : li))} />
                                                <button onClick={() => setFooterLinks(links => links.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#c00', fontSize: '1.2rem', cursor: 'pointer' }} title="Remove"><FontAwesomeIcon icon={["fas", "fa-trash"]} /></button>
                                            </div>
                                        ))}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <input value={newFooterLink} onChange={e => setNewFooterLink(e.target.value)} placeholder="Add link" />
                                            <button onClick={() => { if (newFooterLink) { setFooterLinks(links => [...links, newFooterLink]); setNewFooterLink(''); } }} style={{ background: 'var(--light-blue)', border: 'none', color: '#fff', fontSize: '1.2rem', padding: '0.4rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }} title="Add"><FontAwesomeIcon icon={["fas", "fa-plus"]} /></button>
                                        </div>
                                    </div>
                                    <div className="editor-section">
                                        <label>Contact</label>
                                        {footerContacts.map((c, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <select value={c.type} onChange={e => setFooterContacts(cs => cs.map((ci, idx) => idx === i ? { ...ci, type: e.target.value } : ci))}>
                                                    <option value="email">Email</option>
                                                    <option value="phone">Phone</option>
                                                </select>
                                                <input value={c.value} onChange={e => setFooterContacts(cs => cs.map((ci, idx) => idx === i ? { ...ci, value: e.target.value } : ci))} placeholder="Value" />
                                                <button onClick={() => setFooterContacts(cs => cs.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#c00', fontSize: '1.2rem', cursor: 'pointer' }} title="Remove"><FontAwesomeIcon icon={["fas", "fa-trash"]} /></button>
                                            </div>
                                        ))}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <select value={newFooterContact.type} onChange={e => setNewFooterContact(c => ({ ...c, type: e.target.value }))}>
                                                <option value="email">Email</option>
                                                <option value="phone">Phone</option>
                                            </select>
                                            <input value={newFooterContact.value} onChange={e => setNewFooterContact(c => ({ ...c, value: e.target.value }))} placeholder="Value" />
                                            <button onClick={() => { if (newFooterContact.value) { setFooterContacts(cs => [...cs, newFooterContact]); setNewFooterContact({ type: 'email', value: '' }); } }} style={{ background: 'var(--light-blue)', border: 'none', color: '#fff', fontSize: '1.2rem', padding: '0.4rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }} title="Add"><FontAwesomeIcon icon={["fas", "fa-plus"]} /></button>
                                        </div>
                                    </div>
                                    <div className="editor-section">
                                        <label>Socials</label>
                                        {footerSocials.map((s, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <input value={s.icon} onChange={e => setFooterSocials(ss => ss.map((si, idx) => idx === i ? { ...si, icon: e.target.value } : si))} placeholder="Icon (fa-facebook-f)" />
                                                <input value={s.name} onChange={e => setFooterSocials(ss => ss.map((si, idx) => idx === i ? { ...si, name: e.target.value } : si))} placeholder="Name" />
                                                <input value={s.handle} onChange={e => setFooterSocials(ss => ss.map((si, idx) => idx === i ? { ...si, handle: e.target.value } : si))} placeholder="Handle" />
                                                <button onClick={() => setFooterSocials(ss => ss.filter((_, idx) => idx !== i))} style={{ background: 'none', border: 'none', color: '#c00', fontSize: '1.2rem', cursor: 'pointer' }} title="Remove"><FontAwesomeIcon icon={["fas", "fa-trash"]} /></button>
                                            </div>
                                        ))}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <input value={newFooterSocial.icon} onChange={e => setNewFooterSocial(s => ({ ...s, icon: e.target.value }))} placeholder="Icon (fa-facebook-f)" />
                                            <input value={newFooterSocial.name} onChange={e => setNewFooterSocial(s => ({ ...s, name: e.target.value }))} placeholder="Name" />
                                            <input value={newFooterSocial.handle} onChange={e => setNewFooterSocial(s => ({ ...s, handle: e.target.value }))} placeholder="Handle" />
                                            <button onClick={() => { if (newFooterSocial.name && newFooterSocial.handle) { setFooterSocials(ss => [...ss, newFooterSocial]); setNewFooterSocial({ icon: 'fa-facebook-f', name: '', handle: '' }); } }} style={{ background: 'var(--light-blue)', border: 'none', color: '#fff', fontSize: '1.2rem', padding: '0.4rem 0.7rem', borderRadius: '6px', cursor: 'pointer' }} title="Add"><FontAwesomeIcon icon={["fas", "fa-plus"]} /></button>
                                        </div>
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Background</label>
                                        <input type="color" value={footerBgColor} onChange={e => setFooterBgColor(e.target.value)} />
                                    </div>
                                    <div className="editor-section">
                                        <label>Section Padding</label>
                                        <input type="range" min="0" max="100" value={footerPadding} onChange={e => setFooterPadding(Number(e.target.value))} />
                                        <span style={{ fontSize: '0.95rem', color: '#888' }}> {footerPadding}px</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Finishing Touches Section */}
                        <div className={`sidebar-section${expandedSections.finishing ? ' expanded' : ''}`}>
                            <div className="sidebar-section-header" onClick={() => toggleSection('finishing')}>
                                <span className="sidebar-section-icon">
                                    <FontAwesomeIcon icon={["fas", "fa-magic"]} />
                                </span>
                                <span className="sidebar-section-title">Finishing Touches</span>
                                <span className="sidebar-section-arrow">
                                    <FontAwesomeIcon icon={["fas", expandedSections.finishing ? "fa-chevron-up" : "fa-chevron-down"]} />
                                </span>
                            </div>
                            {expandedSections.finishing && (
                                <div className="sidebar-section-content">
                                    <div className="editor-section">
                                        <label>SEO</label>
                                        <div style={{ marginBottom: 10 }}>
                                            <span style={{ fontWeight: 500 }}>Favicon (default: logo)</span><br />
                                            <input type="file" accept="image/*" onChange={handleFaviconChange} />
                                            {favicon && <img src={favicon} alt="Favicon" style={{ width: 32, height: 32, borderRadius: 6, marginTop: 6, border: '1px solid #eee' }} />}
                                        </div>
                                        <div style={{ marginBottom: 10 }}>
                                            <span style={{ fontWeight: 500 }}>Domain Name</span><br />
                                            <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. www.myhotel.com" />
                                        </div>
                                    </div>
                                    <div className="editor-section">
                                        <label>Social Share</label>
                                        <div style={{ marginBottom: 10 }}>
                                            <span style={{ fontWeight: 500 }}>Thumbnail (1200x630px)</span><br />
                                            <input type="file" accept="image/*" onChange={handleSocialThumbChange} />
                                            {socialThumb && <img src={socialThumb} alt="Social Thumbnail" style={{ width: 120, height: 63, objectFit: 'cover', borderRadius: 6, marginTop: 6, border: '1px solid #eee' }} />}
                                        </div>
                                        <div style={{ marginBottom: 10 }}>
                                            <span style={{ fontWeight: 500 }}>Title</span><br />
                                            <input type="text" value={socialTitle} onChange={e => setSocialTitle(e.target.value)} placeholder="e.g. My Hotel" />
                                        </div>
                                        <div style={{ marginBottom: 10 }}>
                                            <span style={{ fontWeight: 500 }}>Description</span><br />
                                            <textarea value={socialDesc} onChange={e => setSocialDesc(e.target.value)} rows={2} placeholder="How your website will appear when shared on social media" style={{ width: '100%', resize: 'vertical' }} />
                                        </div>
                                    </div>
                                    <div className="editor-section">
                                        <label>Cookie Collection</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <input type="checkbox" checked={cookieEnabled} onChange={e => setCookieEnabled(e.target.checked)} id="cookie-toggle" />
                                            <label htmlFor="cookie-toggle" style={{ fontWeight: 500, cursor: 'pointer' }}>{cookieEnabled ? 'Enabled' : 'Disabled'}</label>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="editor-sidebar-btn">
                            <button
                                className="btn save"
                                onClick={handleSaveProgress}
                            >
                                Save Progress
                            </button>
                            <button
                                className="btn publish"
                                onClick={handlePublish}
                            >
                                Publish
                            </button>
                        </div>

                    </div>

                </aside>


                {/* ================== Preview ================== */}
                <main className="editor-preview-main">
                    {/* Preview Mode Toggle */}
                    <div className="preview-mode-toggle">
                        <button
                            className={`toggle-btn${previewMode === 'mobile' ? ' active' : ''}`}
                            onClick={() => setPreviewMode('mobile')}
                        >
                            Mobile
                        </button>
                        <button
                            className={`toggle-btn${previewMode === 'desktop' ? ' active' : ''}`}
                            onClick={() => setPreviewMode('desktop')}
                        >
                            Desktop
                        </button>
                    </div>
                    <div className={`editor-preview-wrapper ${previewMode}`}>
                        <div
                            className="editor-preview"
                            style={{
                                ...(bgType === 'color' ? { background: fields.bgColor } : { position: 'relative', background: 'transparent' }),
                                position: 'relative', // ensure relative for absolute children
                            }}
                        >
                            {bgType === 'image' && (
                                <div
                                    className="editor-bg-image"
                                    style={{
                                        backgroundImage: `url(${bgImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundAttachment: 'fixed',
                                        filter: `brightness(${bgBrightness})`,
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        zIndex: 0,
                                        position: 'absolute',
                                    }}
                                />
                            )}
                            {/* Previewed Navbar */}
                            {previewMode === 'mobile' ? (
                                <div
                                    className="preview-navbar mobile"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        padding: `${navbarPadding}px`,
                                        background: 'none',
                                        color: fields.textColor,
                                        zIndex: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    <div className="editor-logo" style={{ color: fields.textColor, fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: 0 }}>
                                        <span className="logo-text" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{fields.logo || 'LOGO TEXT HERE'}</span>
                                        <span className="logo-slogan" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{fields.slogan || 'SLOGAN HERE'}</span>
                                    </div>
                                    <button
                                        className="mobile-menu-btn"
                                        style={{ background: 'none', border: 'none', color: fields.textColor, fontSize: '1.7rem', cursor: 'pointer' }}
                                        onClick={() => setMobileMenuOpen((open) => !open)}
                                    >
                                        <FontAwesomeIcon icon={["fas", mobileMenuOpen ? "fa-times" : "fa-bars"]} />
                                    </button>
                                    {mobileMenuOpen && (
                                        <div className="editor-nav-links-mobile" style={{
                                            position: 'absolute',
                                            top: '70%',
                                            left: 0,
                                            width: '100%',
                                            background: 'rgba(0,0,0,0.9)',
                                            color: '#fff',
                                            borderRadius: '0 0 10px 10px',
                                            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                                            minWidth: '120px',
                                            zIndex: 10,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            padding: '0.5rem 1.2rem',
                                        }}>
                                            <span style={{ margin: '0.5rem 0', cursor: 'pointer' }}>Home</span>
                                            <span style={{ margin: '0.5rem 0', cursor: 'pointer' }} onClick={() => roomsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Book Now</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div
                                    className="preview-navbar"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '100px',
                                        padding: `${navbarPadding}px`,
                                        background: 'none',
                                        color: fields.textColor,
                                        zIndex: 2,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        gap: '1rem',
                                        fontWeight: 600,
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    <div className="editor-logo" style={{ color: fields.textColor }}>
                                        <span className="logo-text">{fields.logo || 'LOGO TEXT HERE'}</span>
                                        <span className="logo-slogan">{fields.slogan || 'SLOGAN HERE'}</span>
                                    </div>
                                    <div className="editor-nav-links">
                                        <span>Home</span>
                                        <span onClick={() => roomsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} style={{ cursor: 'pointer' }}>Book Now</span>
                                    </div>
                                </div>
                            )}
                            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
                                {/* Spacing between navbar and hero (mobile/desktop) */}
                                {previewMode === 'mobile' ? <div style={{ height: '56px' }} /> : <div style={{ height: '60px' }} />}
                                {/* Hero Section */}
                                <section
                                    className="hero-section-preview"
                                    style={{
                                        minHeight: previewMode === 'mobile' ? '320px' : '400px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: previewMode === 'mobile' ? '18px' : '32px',
                                        width: '100%',
                                        padding: previewMode === 'mobile' ? '0 1rem' : undefined,
                                    }}
                                >
                                    <div className="editor-content" style={{ width: '100%' }}>
                                        <h1 style={{ color: fields.textColor, fontSize: previewMode === 'mobile' ? '2rem' : undefined }}>{fields.title}</h1>
                                        <p style={{ color: fields.textColor, fontSize: previewMode === 'mobile' ? '1.1rem' : undefined }}>{fields.subtitle}</p>
                                        <button
                                            className="editor-btn"
                                            style={{
                                                background: isBtnHovered ? buttonHoverBg : fields.buttonColor,
                                                color: isBtnHovered ? buttonHoverText : fields.buttonTextColor,
                                                width: previewMode === 'mobile' ? '100%' : undefined,
                                                maxWidth: previewMode === 'mobile' ? '320px' : undefined,
                                                fontSize: previewMode === 'mobile' ? '1.1rem' : undefined,
                                            }}
                                            onMouseEnter={() => setIsBtnHovered(true)}
                                            onMouseLeave={() => setIsBtnHovered(false)}
                                        >
                                            {fields.button}
                                        </button>
                                    </div>
                                </section>
                                {/* About Section Preview */}
                                <section
                                    ref={aboutSectionRef}
                                    className="about-section-preview"
                                    style={{
                                        background: aboutBgColor,
                                        padding: `${aboutPadding}px 2rem`,
                                        display: 'flex',
                                        flexDirection: aboutLayout === 'center' ? 'column' : 'row',
                                        alignItems: 'center',
                                        justifyContent: aboutLayout === 'center' ? 'center' : 'space-between',
                                        textAlign: aboutLayout === 'center' ? 'center' : aboutLayout === 'left' ? 'left' : 'right',
                                        gap: '2rem',
                                    }}
                                >
                                    {(aboutLayout === 'left' || aboutLayout === 'center') && (
                                        <div style={{ flex: 1, order: aboutLayout === 'right' ? 2 : 1 }}>
                                            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '2px' }}>{aboutTitle}</h2>
                                            <p style={{ fontSize: '1.2rem', color: '#1a3a5a', marginBottom: '1rem' }}>{aboutParagraph}</p>
                                        </div>
                                    )}
                                    {aboutImage && (
                                        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', order: aboutLayout === 'right' ? 1 : 2 }}>
                                            <img src={aboutImage} alt="About" style={{ maxWidth: '320px', maxHeight: '180px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} />
                                        </div>
                                    )}
                                    {aboutLayout === 'right' && (
                                        <div style={{ flex: 1, order: 2 }}>
                                            <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '2px' }}>{aboutTitle}</h2>
                                            <p style={{ fontSize: '1.2rem', color: '#1a3a5a', marginBottom: '1rem' }}>{aboutParagraph}</p>
                                        </div>
                                    )}
                                </section>
                                {/* Amenities Section Preview */}
                                <section
                                    ref={amenitiesSectionRef}
                                    className="amenities-section-preview"
                                    style={{
                                        background: amenitiesBgColor,
                                        padding: `${amenitiesPadding}px 2rem`,
                                        marginTop: '0',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        justifyContent: 'center',
                                        gap: '2.5rem',
                                    }}>
                                        {amenities.map((a, idx) => (
                                            <div key={idx} style={{ minWidth: 180, maxWidth: 240, textAlign: 'center', flex: 1 }}>
                                                <div style={{ fontSize: '2.5rem', color: '#1a3a5a', marginBottom: '0.7rem' }}>
                                                    <FontAwesomeIcon icon={["fas", a.icon]} />
                                                </div>
                                                <div style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1a3a5a', marginBottom: '0.5rem' }}>{a.title}</div>
                                                <div style={{ fontSize: '1rem', color: '#1a3a5a', opacity: 0.85 }}>{a.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                {/* Rooms Section Preview */}
                                <section
                                    ref={roomsSectionRef}
                                    className="rooms-section-preview"
                                    style={{
                                        background: roomsBgColor,
                                        padding: `${roomsPadding}px 2rem`,
                                        marginTop: '0',
                                    }}
                                >
                                    {/* Filtering form */}
                                    <form
                                        className="room-filter-form"
                                        style={{
                                            display: 'flex',
                                            gap: '1.2rem',
                                            justifyContent: 'center',
                                            marginBottom: '2rem',
                                            flexWrap: 'wrap',
                                            background: '#fff',
                                            borderRadius: 16,
                                            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                                            padding: '1.1rem 1.5rem',
                                            alignItems: 'center',
                                            minWidth: 220,
                                            maxWidth: 520,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <FontAwesomeIcon icon={["fas", "fa-bed"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                                            <select
                                                value={roomFilters.type}
                                                onChange={e => setRoomFilters(f => ({ ...f, type: e.target.value }))}
                                                style={{
                                                    border: '1px solid #e0e6ed',
                                                    borderRadius: 8,
                                                    padding: '0.4rem 1.1rem',
                                                    fontSize: '1rem',
                                                    background: '#f7fafd',
                                                    color: '#222',
                                                    outline: 'none',
                                                    minWidth: 90,
                                                }}
                                            >
                                                {roomFilterOptions.type.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <FontAwesomeIcon icon={["fas", "fa-dollar-sign"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                                            <select
                                                value={roomFilters.price}
                                                onChange={e => setRoomFilters(f => ({ ...f, price: e.target.value }))}
                                                style={{
                                                    border: '1px solid #e0e6ed',
                                                    borderRadius: 8,
                                                    padding: '0.4rem 1.1rem',
                                                    fontSize: '1rem',
                                                    background: '#f7fafd',
                                                    color: '#222',
                                                    outline: 'none',
                                                    minWidth: 110,
                                                }}
                                            >
                                                <option value="under99">Under $99</option>
                                                <option value="99-199">$99 - $199</option>
                                                <option value="199-299">$199 - $299</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                            <FontAwesomeIcon icon={["fas", "fa-users"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                                            <select
                                                value={roomFilters.beds}
                                                onChange={e => setRoomFilters(f => ({ ...f, beds: e.target.value }))}
                                                style={{
                                                    border: '1px solid #e0e6ed',
                                                    borderRadius: 8,
                                                    padding: '0.4rem 1.1rem',
                                                    fontSize: '1rem',
                                                    background: '#f7fafd',
                                                    color: '#222',
                                                    outline: 'none',
                                                    minWidth: 80,
                                                }}
                                            >
                                                {roomFilterOptions.beds.map(opt => <option key={opt} value={opt}>{opt} bed{opt !== '1' ? 's' : ''}</option>)}
                                            </select>
                                        </div>
                                    </form>
                                    {/* Room grid */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'center', justifyContent: 'center', overflowX: 'auto', padding: '0 1rem' }}>
                                        {rooms.map((r, idx) => (
                                            <div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: 240, height: 340, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                {r.image ? <img src={r.image} alt={r.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} /> : <div style={{ width: '100%', height: 120, background: '#eee', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>No Image</div>}
                                                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{r.name}</div>
                                                <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: 8 }}>{r.desc}</div>
                                                <div style={{ fontWeight: 600, color: 'var(--blue)', marginBottom: 8 }}>${r.price} <span style={{ fontWeight: 400, color: '#888' }}>/ night</span></div>
                                                <button className="editor-btn" style={{ width: '100%' }}>Book Now</button>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                                {/* Footer Section Preview */}
                                <footer
                                    className="footer-section-preview"
                                    style={{
                                        background: footerBgColor,
                                        color: '#fff',
                                        padding: `${footerPadding}px 2rem`,
                                        marginTop: '0',
                                        width: '100%',
                                    }}
                                >
                                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
                                        <div style={{ flex: 1, minWidth: 180 }}>
                                            <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 4 }}>{footerLogo || <FontAwesomeIcon icon={["fas", "fa-hotel"]} />}</div>
                                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{footerName}</div>
                                            <div style={{ fontSize: '0.98rem', opacity: 0.8 }}>{footerSlogan}</div>
                                        </div>
                                        <div style={{ flex: 1, minWidth: 180 }}>
                                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Quick Links</div>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {footerLinks.map((l, i) => <li key={i} style={{ marginBottom: 4 }}><a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>{l}</a></li>)}
                                            </ul>
                                        </div>
                                        <div style={{ flex: 1, minWidth: 180 }}>
                                            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Contact</div>
                                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                                {footerContacts.map((c, i) => <li key={i} style={{ marginBottom: 4 }}>{c.type === 'email' ? <FontAwesomeIcon icon={["fas", "fa-envelope"]} /> : <FontAwesomeIcon icon={["fas", "fa-phone"]} />} <span style={{ opacity: 0.9 }}>{c.value}</span></li>)}
                                            </ul>
                                            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                                                {footerSocials.map((s, i) => <a key={i} href="#" style={{ color: '#fff', fontSize: '1.2rem', opacity: 0.9 }} title={s.name}><FontAwesomeIcon icon={["fab", s.icon.replace('fa-', '')]} /> <span style={{ fontSize: '0.95rem', marginLeft: 4 }}>{s.handle}</span></a>)}
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </main>

            </div>


        </div>
    );
} 