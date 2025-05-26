import Navbar from '../navbar/navbar';
import BookingForm from '../bookingForm/bookingForm.jsx'
import './header.css'



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
                    <BookingForm />
                </div>
            </section>
        </div>
    )
}

export default Header;