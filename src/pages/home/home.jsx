import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import outside1 from "../../assets/images/outside1.jpg"
import outside2 from "../../assets/images/outside2.jpg"
import outside3 from "../../assets/images/outside3.jpg"
import outside4 from "../../assets/images/outside4.jpg"
import outside5 from "../../assets/images/outside5.jpg"
import outside8 from "../../assets/images/outside8.jpg"
import profile1 from "../../assets/images/profile1.jpg"
import profile2 from "../../assets/images/profile2.jpg"
import profile3 from "../../assets/images/profile3.jpg"
import profile4 from "../../assets/images/profile4.jpg"
import profile5 from "../../assets/images/profile5.jpg"
import profile6 from "../../assets/images/profile6.jpg"

import './home.css'

function Home(){
    

    return(
        <div>
            <section class="popular-container">
                <h2 class="section-header">Popular Hotel Deals Right Now</h2>
                <div class="popular-grid">
                    <div class="popular-card">
                        <img src={outside1} alt="popular hotel" />
                        <div class="popular-content">
                            <div class="popular-card-header">
                                <h4>The Plaza Hotel</h4>
                                <div class="rating-location">
                                    <p><b>8.5 - Excellent </b><br />(6216)</p>
                                    <p>
                                        <FontAwesomeIcon icon={['fas', 'fa-map-marker-alt']} />
                                        Huwaii, USA
                                    </p>
                                </div>
                            </div>
                            <div class="popular-deal">
                                <div class="details">
                                    <div class="details-head">
                                        <p>Cheapest room</p>
                                        <p>
                                            <span><FontAwesomeIcon icon={['fas', 'fa-check']} /></span> 
                                            Free cancellation
                                        </p>
                                    </div>
                                    <div class="price-date">
                                        <p><span>$499</span><br/>per night</p>
                                        <p><br />May 12 - May 18</p>
                                    </div>
                                </div>
                                <button class="btn">Check Deal</button>
                            </div>
                        </div>
                    </div>
                    <div class="popular-card">
                        <img src={outside2} alt="popular hotel" />
                        <div class="popular-content">
                            <div class="popular-card-header">
                                <h4>Real Madrid</h4>
                                <div class="rating-location">
                                    <p><b>8.5 - Excellent </b><br />(6216)</p>
                                    <p>
                                        <FontAwesomeIcon icon={['fas', 'fa-map-marker-alt']} />
                                        Madrid, Spain
                                    </p>
                                </div>
                            </div>
                            <div class="popular-deal">
                                <div class="details">
                                    <div class="details-head">
                                        <p>Cheapest room</p>
                                        <p>
                                            <span><FontAwesomeIcon icon={['fas', 'fa-check']} /></span> 
                                            Free cancellation
                                        </p>
                                    </div>
                                    <div class="price-date">
                                        <p><span>$549</span><br/>per night</p>
                                        <p><br />May 12 - May 18</p>
                                    </div>
                                </div>
                                <button class="btn">Check Deal</button>
                            </div>
                        </div>
                    </div>
                    <div class="popular-card">
                        <img src={outside3} alt="popular hotel" />
                        <div class="popular-content">
                            <div class="popular-card-header">
                                <h4>The Pennisula</h4>
                                <div class="rating-location">
                                    <p><b>8.5 - Excellent </b><br />(6216)</p>
                                    <p>
                                        <FontAwesomeIcon icon={['fas', 'fa-map-marker-alt']} />
                                        Rome, Italy
                                    </p>
                                </div>
                            </div>
                            <div class="popular-deal">
                                <div class="details">
                                    <div class="details-head">
                                        <p>Cheapest room</p>
                                        <p>
                                            <span><FontAwesomeIcon icon={['fas', 'fa-check']} /></span> 
                                            Free cancellation
                                        </p>
                                    </div>
                                    <div class="price-date">
                                        <p><span>$499</span><br/>per night</p>
                                        <p><br />May 12 - May 18</p>
                                    </div>
                                </div>
                                <button class="btn">Check Deal</button>
                            </div>
                        </div>
                    </div>
                    <div class="popular-card">
                        <img src={outside4} alt="popular hotel" />
                        <div class="popular-content">
                            <div class="popular-card-header">
                                <h4>Habibi The Palm</h4>
                                <div class="rating-location">
                                    <p><b>8.5 - Excellent </b><br />(6216)</p>
                                    <p>
                                        <FontAwesomeIcon icon={['fas', 'fa-map-marker-alt']} />
                                        Dubai, UAE
                                    </p>
                                </div>
                            </div>
                            <div class="popular-deal">
                                <div class="details">
                                    <div class="details-head">
                                        <p>Cheapest room</p>
                                        <p>
                                            <span><FontAwesomeIcon icon={['fas', 'fa-check']} /></span> 
                                            Free cancellation
                                        </p>
                                    </div>
                                    <div class="price-date">
                                        <p><span>$499</span><br/>per night</p>
                                        <p><br />May 12 - May 18</p>
                                    </div>
                                </div>
                                <button class="btn">Check Deal</button>
                            </div>
                        </div>
                    </div>
                    <div class="popular-card">
                        <img src={outside5} alt="popular hotel" />
                        <div class="popular-content">
                            <div class="popular-card-header">
                                <h4>The Ritz-Carlton</h4>
                                <div class="rating-location">
                                    <p><b>8.5 - Excellent </b><br />(6216)</p>
                                    <p>
                                        <FontAwesomeIcon icon={['fas', 'fa-map-marker-alt']} />
                                        Tokyo, Japan
                                    </p>
                                </div>
                            </div>
                            <div class="popular-deal">
                                <div class="details">
                                    <div class="details-head">
                                        <p>Cheapest room</p>
                                        <p>
                                            <span><FontAwesomeIcon icon={['fas', 'fa-check']} /></span> 
                                            Free cancellation
                                        </p>
                                    </div>
                                    <div class="price-date">
                                        <p><span>$499</span><br/>per night</p>
                                        <p><br />May 12 - May 18</p>
                                    </div>
                                </div>
                                <button class="btn">Check Deal</button>
                            </div>
                        </div>
                    </div>
                    <div class="popular-card">
                        <img src={outside8} alt="popular hotel" />
                        <div class="popular-content">
                            <div class="popular-card-header">
                                <h4>Marina Bay Sands</h4>
                                <div class="rating-location">
                                    <p><b>8.5 - Excellent </b><br />(6216)</p>
                                    <p>
                                        <FontAwesomeIcon icon={['fas', 'fa-map-marker-alt']} />
                                        Singapore
                                    </p>
                                </div>
                            </div>
                            <div class="popular-deal">
                                <div class="details">
                                    <div class="details-head">
                                        <p>Cheapest room</p>
                                        <p>
                                            <span><FontAwesomeIcon icon={['fas', 'fa-check']} /></span> 
                                            Free cancellation
                                        </p>
                                    </div>
                                    <div class="price-date">
                                        <p><span>$499</span><br/>per night</p>
                                        <p><br />May 12 - May 18</p>
                                    </div>
                                </div>
                                <button class="btn">Check Deal</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="client">
                <div class="section-container client-container">
                    <h2 class="section-header">What our Clients Say</h2>
                    <div class="client-grid">
                        <div class="client-card">
                            <img src={profile1} alt="review-profile" />
                            <div class="star">
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div class="client-card">
                            <img src={profile2} alt="review-profile" />
                            <div class="star">
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div class="client-card">
                            <img src={profile3} alt="review-profile" />
                            <div class="star">
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div class="client-card">
                            <img src={profile4} alt="review-profile" />
                            <div class="star">
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div class="client-card">
                            <img src={profile5} alt="review-profile" />
                            <div class="star">
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                        <div class="client-card">
                            <img src={profile6} alt="review-profile" />
                            <div class="star">
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star']} />
                                <FontAwesomeIcon icon={['fas','fa-star-half-alt']} id="half-star" />
                            </div>
                            <p>The booking process was seamless, and the confirmation was instant.
                                I highly recommend FreeHotel for hassle-free hotel bookings.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            
            
        </div>
    )
}

export default Home;