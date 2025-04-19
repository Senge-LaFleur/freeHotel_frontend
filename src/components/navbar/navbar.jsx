import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './navbar.css'

import React from "react";

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    
    const closeMenu = () => {
        setIsOpen(false);
    }

    return(
        <div class="head"> 
            <nav class="navbar">
                <div class="logo">
                    {/* <FontAwesomeIcon icon={['fas', 'fa-hotel']} /> */}
                    <span> FreeHotel</span>
                </div>
                {/* <div class="menu-bar" id="menu-bar" onClick={toggleMenu}>
                    <FontAwesomeIcon icon={isOpen ? ['fas', 'fa-times'] : ['fas', 'fa-bars']} />
                </div> */}
                <ul class="nav-links">
                    <li class="link"><Link to="/" class="nav-link">Home</Link></li>
                    <li class="link"><Link to="/hotels" class="nav-link">Hotels</Link></li>
                    <li class="link"><Link to="/login" class="nav-link">Login</Link></li>
                    <li class="link"><Link to="/contact" class="nav-link">Contact</Link></li>
                </ul>
                {/* <Link to="/rooms" class="btn">Book A Room</Link> */}
                
            </nav>            
        </div>
    )
}

export default Navbar;