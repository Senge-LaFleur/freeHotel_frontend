import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../../components/sidebar/sidebar.jsx'
import Navbar2 from '../../components/navbar2/navbar2.jsx';
import template1 from '../../assets/images/template1.png'
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
    <div class="dashboard" id="content">


        {/* ------------------------------ SIDEBAR ------------------------------- */}

        <Sidebar isExpanded={isSidebarExpanded} toggleSidebar={toggleSidebar} isMobile={isMobile} />

        <div 
            class={`container ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}
            style={
                {marginLeft: !isMobile && isSidebarExpanded ? 
                    '280px' : !isMobile && !isSidebarExpanded ?
                    '100px' : '100px', transition: 'margin-left 0.3s ease-in-out'
                }
            }
        >


            

            {/* ------------------------------ MAIN SECTION ------------------------------- */}

            <main>

                <Navbar2 />

                <h2 class="section-header">Dashboard</h2>

                <div class="date">
                    <input type="date" />
                </div>

                <ul class="box-info">
                    <li>
                        <span class="icon"><FontAwesomeIcon icon={['fas','fa-calendar-check']} /></span>
                        <span class="text">
                            <h3>1020</h3>
                            <p>New Orders</p>
                        </span>
                    </li>
                    <li>
                        <span class="icon"><FontAwesomeIcon icon={['fas','fa-users']} /></span>
                        <span class="text">
                            <h3>2834</h3>
                            <p>Visitors</p>
                        </span>
                    </li>
                    <li>
                        <span class="icon"><FontAwesomeIcon icon={['fas','fa-dollar-sign']} /></span>
                        <span class="text">
                            <h3>$2543</h3>
                            <p>Total Sales</p>
                        </span>
                    </li>
                </ul>


                <div class="table-data">
                    <div class="order">
                        <div class="head">
                            <h3>Recent Orders</h3>
                            <i class='bx bx-search' ></i>
                            <i class='bx bx-filter' ></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Hotel</th>
                                    <th>Last Modified</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src={template1} alt="" />
                                        <p>Hotel name</p>
                                    </td>
                                    <td>01-10-2021</td>
                                    <td><span class="status completed">Completed</span></td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <div class="todo">
                        <div class="head">
                            <h3>Todos</h3>
                            <span><FontAwesomeIcon icon={['fas','fa-plus']} /></span>
                            <span><FontAwesomeIcon icon={['fas','fa-filter']} /></span>
                        </div>
                        <ul class="todo-list">
                            <li class="completed">
                                <p>Todo List</p>
                                <span><FontAwesomeIcon icon={['fas','fa-ellipsis-v']} /></span>
                            </li>
                            <li class="completed">
                                <p>Todo List</p>
                                <span><FontAwesomeIcon icon={['fas','fa-ellipsis-v']} /></span>
                            </li>
                            <li class="not-completed">
                                <p>Todo List</p>
                                <span><FontAwesomeIcon icon={['fas','fa-ellipsis-v']} /></span>
                            </li>
                            <li class="completed">
                                <p>Todo List</p>
                                <span><FontAwesomeIcon icon={['fas','fa-ellipsis-v']} /></span>
                            </li>
                            <li class="not-completed">
                                <p>Todo List</p>
                                <span><FontAwesomeIcon icon={['fas','fa-ellipsis-v']} /></span>
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
