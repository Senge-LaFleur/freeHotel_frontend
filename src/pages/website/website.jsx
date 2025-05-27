import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../components/sidebar/sidebar.jsx'
import Navbar2 from '../../components/navbar2/navbar2.jsx';
import './website.css';

function Website() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
    const toggleSidebar = () => {
        setIsSidebarExpanded(prev => !prev);
    };
  
      // Handle window resize in parent
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if(mobile) setIsSidebarExpanded(false);
          };
          
          window.addEventListener('resize', handleResize);
          handleResize();
          return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <div class="website" id="content">
          <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} isMobile={isMobile} />

          <div 
            class="container"
            style={{marginLeft: !isMobile && isSidebarExpanded ? 
            '280px' : !isMobile && !isSidebarExpanded ?
            '100px' : '100px', transition: 'margin-left 0.3s ease-in-out'}}
          >
              <main>

                  <Navbar2 />

                  <h3 class="section-subheader">DESIGN TEMPLATES</h3>
                  <h2 class="section-header">Build Your Own Website</h2>
                  <p>Creating websites has never been this easy. Let us help you generate your hotel platform in seconds</p>
              </main>

          </div>

      </div>
    )
}

export default Website;
