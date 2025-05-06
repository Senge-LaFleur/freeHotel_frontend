import Navbar from '../navbar/navbar';
import './header.css'

import React from "react";

function Header(){

    return(
        <div>
            <Navbar />
            <section class="header-container" id="header">
                <div class="header-image-container">
                    <div class="header-content">
                        <h1>Enjoy your Dream Vacation</h1>
                        <p>Book Hotels and Stay Packages at Lowest Price.</p>
                    </div>
                    <div class="booking-container">
                        <form>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" />
                                    <label>Location</label>
                                </div>
                                <p>Where to?</p>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" />
                                    <label>Check In</label>
                                </div>
                                <p>Add Date</p>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" />
                                    <label>Check Out</label>
                                </div>
                                <p>Add Date</p>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="number" />
                                    <label>Guests</label>
                                </div>
                                <p>Add Guests</p>
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="number" />
                                    <label>Kids</label>
                                </div>
                                <p>Add Kids</p>
                            </div>
                            <button class="btn">Find Rooms</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Header;