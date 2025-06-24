import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../components/sidebar/sidebar.jsx'
import Navbar2 from '../../components/navbar2/navbar2.jsx';
import template1 from '../../assets/images/template1.png'
import './dashboard.css'
import { getOwnerHotels, deleteHotel, createHotel, updateHotel, publishHotel } from '../../services/hotelApi';
import { useNavigate } from 'react-router-dom';
import defaultImage from '../../assets/images/template1.png'; // Use your default image

function Dashboard() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [hotels, setHotels] = useState([]);
    const [userToken, setUserToken] = useState(localStorage.getItem('token'));
    const [editingHotelId, setEditingHotelId] = useState(null);
    const [fields, setFields] = useState({});
    const [footerName, setFooterName] = useState('');
    const [footerContacts, setFooterContacts] = useState([
        { type: 'email', value: '' },
        { type: 'phone', value: '' }
    ]);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarExpanded(prev => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (mobile) setIsSidebarExpanded(false);
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch hotels on component mount
    useEffect(() => {
        async function fetchHotels() {
            const response = await getOwnerHotels(userToken);
            setHotels(response.results || []);
        }
        fetchHotels();
    }, [userToken]);

    useEffect(() => {
        async function fetchHotel() {
            if (editingHotelId) {
                const res = await fetch(`http://localhost:8000/api/hotels/${editingHotelId}/`, {
                    headers: { Authorization: `Token ${userToken}` }
                });
                const hotel = await res.json();
                // Prefill fields
                setFields({ ...fields, logo: hotel.logo_text, slogan: hotel.slogan });
                setFooterName(hotel.logo_text || hotel.name);
                setFooterContacts([
                    { type: 'email', value: hotel.footer_email || hotel.email },
                    { type: 'phone', value: hotel.footer_phone || hotel.phone_number }
                ]);
                // ...prefill other fields as needed
            }
        }
        fetchHotel();
    }, [editingHotelId]);

    // Action handlers
    const handleView = (hotelId) => {
        navigate(`/website/preview/${hotelId}`);
    };
    const handleEdit = (hotel) => {
        // Use the saved templateId if available, or fallback to a default
        const templateId = hotel.template_data?.templateId || 'luxury-hotel';
        navigate(`/website/templateEditor/${templateId}/${hotel.id}`);
    };
    const handleDelete = async (hotelId) => {
        if (window.confirm('Are you sure you want to delete this hotel and all its data?')) {
            await deleteHotel(hotelId, userToken);
            setHotels(hotels.filter(hotel => hotel.id !== hotelId));
        }
    };

    const handleSaveProgress = async () => {
        const hotelData = {
            name: fields.logo || footerName,
            logo_text: fields.logo || footerName,
            slogan: fields.slogan || footerSlogan,
            footer_email: footerContacts.find(c => c.type === 'email')?.value,
            footer_phone: footerContacts.find(c => c.type === 'phone')?.value,
            template_data: {
                // Save all your sidebar form state here
                fields,
                amenities,
                rooms,
                // ...etc
            },
            status: 'incomplete',
            // Add other fields as needed
        };

        if (editingHotelId) {
            await updateHotel(editingHotelId, hotelData, userToken);
        } else {
            await createHotel(hotelData, userToken);
        }
        alert('Progress saved!');
    };

    const handlePublish = async () => {
        if (!editingHotelId) {
            alert('Please save your hotel first!');
            return;
        }
        await publishHotel(editingHotelId, userToken);
        alert('Hotel published!');
        // Redirect to plan page or dashboard as needed
        navigate('/dashboard');
    };

    return (
        <div className="dashboard" id="content">


            {/* ------------------------------ SIDEBAR ------------------------------- */}

            <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} isMobile={isMobile} />

            <div className={`container ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
                style={{
                    marginLeft: !isMobile && isSidebarExpanded ? '280px' : '100px',
                    transition: 'margin-left 0.3s ease-in-out'
                }}
            >




                {/* ------------------------------ MAIN SECTION ------------------------------- */}

                <main>

                    <Navbar2 />

                    <h2 className="section-header">Dashboard</h2>

                    <div className="date">
                        <input type="date" />
                    </div>

                    <ul className="box-info">
                        <li>
                            <span className="icon"><FontAwesomeIcon icon={['fas', 'fa-calendar-check']} /></span>
                            <span className="text">
                                <h3>1020</h3>
                                <p>New Orders</p>
                            </span>
                        </li>
                        <li>
                            <span className="icon"><FontAwesomeIcon icon={['fas', 'fa-users']} /></span>
                            <span className="text">
                                <h3>2834</h3>
                                <p>Visitors</p>
                            </span>
                        </li>
                        <li>
                            <span className="icon"><FontAwesomeIcon icon={['fas', 'fa-dollar-sign']} /></span>
                            <span className="text">
                                <h3>$2543</h3>
                                <p>Total Sales</p>
                            </span>
                        </li>
                    </ul>


                    <div className="table-data">
                        <div className="order">
                            <div className="head">
                                <h3>Hotel List</h3>
                                <i className='bx bx-search' ></i>
                                <i className='bx bx-filter' ></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Hotel</th>
                                        <th>Last Modified</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(hotels) && hotels.map(hotel => (
                                        <tr key={hotel.id}>
                                            <td>
                                                <img src={hotel.template_data?.socialThumb || defaultImage} alt="Hotel Thumbnail" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', marginRight: '8px' }} />
                                                <p>{hotel.name}</p>
                                            </td>
                                            <td>{hotel.updated_at ? new Date(hotel.updated_at).toLocaleString() : '-'}</td>
                                            <td>
                                                <span className={`status ${hotel.status}`}>{hotel.status}</span>
                                            </td>
                                            <td className="action-element">
                                                <FontAwesomeIcon icon={['fas', 'fa-eye']} title="view website" onClick={() => handleView(hotel.id)} style={{ cursor: 'pointer', marginRight: '8px' }} />
                                                <FontAwesomeIcon icon={['fas', 'fa-pencil']} title="edit website" onClick={() => handleEdit(hotel)} style={{ cursor: 'pointer', marginRight: '8px' }} />
                                                <FontAwesomeIcon icon={['fas', 'fa-trash']} title="delete website" onClick={() => handleDelete(hotel.id)} style={{ cursor: 'pointer' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="todo">
                            <div className="head">
                                <h3>Todos</h3>
                                <span><FontAwesomeIcon icon={['fas', 'fa-plus']} /></span>
                                <span><FontAwesomeIcon icon={['fas', 'fa-filter']} /></span>
                            </div>
                            <ul className="todo-list">
                                <li className="completed">
                                    <p>Todo List</p>
                                    <span><FontAwesomeIcon icon={['fas', 'fa-ellipsis-v']} /></span>
                                </li>
                                <li className="completed">
                                    <p>Todo List</p>
                                    <span><FontAwesomeIcon icon={['fas', 'fa-ellipsis-v']} /></span>
                                </li>
                                <li className="not-completed">
                                    <p>Todo List</p>
                                    <span><FontAwesomeIcon icon={['fas', 'fa-ellipsis-v']} /></span>
                                </li>
                                <li className="completed">
                                    <p>Todo List</p>
                                    <span><FontAwesomeIcon icon={['fas', 'fa-ellipsis-v']} /></span>
                                </li>
                                <li className="not-completed">
                                    <p>Todo List</p>
                                    <span><FontAwesomeIcon icon={['fas', 'fa-ellipsis-v']} /></span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Dashboard;
