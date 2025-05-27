import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import DashboardIcon from '@mui/icons-material/Dashboard';

import './sidebar.css';

function Sidebar({ isExpanded, toggleSidebar, isMobile }) {
    

  return (
    <div className={`aside ${isMobile ? 'mobile' : 'desktop'}`}>
      
        <div class="container">
            <aside className={`sidebar-component ${isExpanded ? 'expanded' : 'collapsed'}`} >
                <div class="top">
                    <div class="logo">
                        <FontAwesomeIcon icon={['fas', 'fa-hotel']} />
                        {isExpanded && (!isMobile || (isMobile && isExpanded)) && <span>FreeHotel</span>}
                    </div>
                    <div className="toggle-btn" id="toggle-btn" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={['fas', isExpanded ? 'fa-angle-left' : 'fa-angle-right']} title={isExpanded ? 'Hide Sidebar' : 'Show Sidebar'} />
                    </div>
                </div>

                <div class="sidebar">
                    <ul id="side-links" class="side-links">
                        <li class="side-list">
                            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                {/* <span><FontAwesomeIcon icon={['fas', 'fa-table-cells']} /></span> */}
                                <span><DashboardIcon /></span>
                                {isExpanded && <h3>Dashboard</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/website" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-globe']} /></span>
                                {isExpanded && <h3>Website</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/clients" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-user-friends']} /></span>
                                {isExpanded && <h3>Clients</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/reservations" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-calendar-check']} /></span>
                                {isExpanded && <h3>Reservations</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/analytics" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-chart-line']} /></span>
                                {isExpanded && <h3>Analytics</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/inbox" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-inbox']} /></span>
                                {isExpanded && <h3>Inbox</h3> }
                                {isExpanded && <p class="message-count" id="message-count">99+</p> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/hotels" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-home']} /></span>
                                {isExpanded && <h3>Hotels</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/invoices" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-file-invoice']} /></span>
                                {isExpanded && <h3>Invoices</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list">
                            <NavLink to="/reports" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-file-alt']} /></span>
                                {isExpanded && <h3>Reports</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list bottom" id="settings">
                            <NavLink to="/settings" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span><FontAwesomeIcon icon={['fas', 'fa-cog']} /></span>
                                {isExpanded && <h3>Settings</h3> }
                            </NavLink>
                        </li>
                        <li class="side-list bottom" id="log-out">
                            <NavLink to="/logout" className={({ isActive }) => isActive ? 'side-link active' : 'side-link'}>
                                <span id="log-out"><FontAwesomeIcon icon={['fas', 'fa-sign-out-alt']} /></span>
                                {isExpanded && <h3 id="log-out">Log Out</h3> }
                            </NavLink>
                        </li>
                    </ul>  
                </div>
            </aside>
        </div>

    </div>
  )
}

export default Sidebar;
