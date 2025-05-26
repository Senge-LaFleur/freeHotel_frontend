import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../components/sidebar/sidebar.jsx'
import './dashboard.css'

function Dashboard() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prev => !prev);
    };

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
    <div class="dashboard">


        {/* ------------------------------ SIDEBAR ------------------------------- */}

        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} isMobile={isMobile} />

        <div 
            class="container"
            style={{marginLeft: !isMobile && isSidebarExpanded ? 
            '280px' : !isMobile && !isSidebarExpanded ?
            '110px' : '100px', transition: 'margin-left 0.3s ease-in-out'}}
        >

            {/* ------------------------------ MAIN SECTION ------------------------------- */}

            <main>
                <h2 class="section-header">Dashboard</h2>

                <div class="date">
                    <input type="date" />
                </div>

                {/* ------------------------------ INSIGHTS ------------------------------- */}

                <div class="insights">

                    {/* ------------------------------ SALES ------------------------------- */}
                    <div class="sales">
                        <span><FontAwesomeIcon icon={['fas', 'fa-chart-line']} /></span>
                        <div class="middle">
                            <div class="left">
                                <h3>Total Sales</h3>
                                <h1>$25,024</h1>
                            </div>
                            <div class="progress">
                                <svg class="svg">
                                    <circle cx='38' cy='36' r='36'></circle>
                                </svg>
                                <div class="number">
                                    <p>81%</p>
                                </div>
                            </div>
                        </div>
                        <small class="text-muted">Last 24 Hours</small>
                    </div>

                    {/* ------------------------------ EXPENSES ------------------------------- */}
                    <div class="expenses">
                        <span><FontAwesomeIcon icon={['fas', 'fa-chart-column']} /></span>
                        <div class="middle">
                            <div class="left">
                                <h3>Total Expenses</h3>
                                <h1>$14,160</h1>
                            </div>
                            <div class="progress">
                                <svg class="svg">
                                    <circle cx='38' cy='36' r='36'></circle>
                                </svg>
                                <div class="number">
                                    <p>62%</p>
                                </div>
                            </div>
                        </div>
                        <small class="text-muted">Last 24 Hours</small>
                    </div>

                    {/* ------------------------------ INCOME ------------------------------- */}
                    <div class="income">
                        <span><FontAwesomeIcon icon={['fas', 'fa-chart-area']} /></span>
                        <div class="middle">
                            <div class="left">
                                <h3>Total Income</h3>
                                <h1>$10,864</h1>
                            </div>
                            <div class="progress">
                                <svg class="svg">
                                    <circle cx='38' cy='36' r='36'></circle>
                                </svg>
                                <div class="number">
                                    <p>44%</p>
                                </div>
                            </div>
                        </div>
                        <small class="text-muted">Last 24 Hours</small>
                    </div>
                </div>

                {/* ------------------------------ RECENT ORDERS ------------------------------- */}

                <div class="recent-order">
                    <h2>Recent Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                            </tr>
                        </thead>
                    </table>
                </div>

            </main>
        </div>
    </div>
  )
}

export default Dashboard;
