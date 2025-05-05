import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import './dashboard.css'

function Dashboard() {

  return (
    <div class="dashboard">
        <div class="container">

            {/* ------------------------------ SIDEBAR ------------------------------- */}

            <aside>
                <div class="top">
                    <div class="logo">
                        <FontAwesomeIcon icon={['fas', 'fa-hotel']} />
                        <span>FreeHotel</span>
                    </div>
                    <div class="close" id="close-btn">
                        <FontAwesomeIcon icon={['fas', 'fa-times']} />
                    </div>
                </div>

                <div class="sidebar">
                    <ul id="nav-links" class="nav-links">
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-table-cells']} /></span>
                                <h3>Dashboard</h3>
                            </Link>
                        </li>
                        <li class="link active">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-globe']} /></span>
                                <h3>Website</h3>
                            </Link>
                        </li>
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-user-friends']} /></span>
                                <h3>Clients</h3>
                            </Link>
                        </li>
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-calendar-check']} /></span>
                                <h3>Reservations</h3>
                            </Link>
                        </li>
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-chart-line']} /></span>
                                <h3>Analytics</h3>
                            </Link>
                        </li>
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-inbox']} /></span>
                                <h3>Inbox</h3>
                                <p class="message-count">99+</p>
                            </Link>
                        </li>
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-hotel']} /></span>
                                <h3>Hotels</h3>
                            </Link>
                        </li>
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-file-invoice']} /></span>
                                <h3>Invoices</h3>
                            </Link>
                        </li>
                        <li class="link">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-file-alt']} /></span>
                                <h3>Reports</h3>
                            </Link>
                        </li>
                        <li class="link" id="settings">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-cog']} /></span>
                                <h3>Settings</h3>
                            </Link>
                        </li>
                        <li class="link" id="log-out">
                            <Link to="/" class="nav-link">
                                <span><FontAwesomeIcon icon={['fas', 'fa-sign-out-alt']} /></span>
                                <h3>Log Out</h3>
                            </Link>
                        </li>
                    </ul>  
                </div>
            </aside>

            {/* ------------------------------ MAIN SECTION ------------------------------- */}

            <main>
                <h1 class="section-header">Dashboard</h1>

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
