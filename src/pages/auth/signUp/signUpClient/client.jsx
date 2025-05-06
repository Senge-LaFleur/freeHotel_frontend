import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './client.css'

const Client = () => {

    return (
        <div class="client-form-container">
            <form action="">
                <Link to="/signUp" class="link">
                    <FontAwesomeIcon icon={['fas', 'fa-arrow-left']} />&nbsp;Back
                </Link>
                {/* <FontAwesomeIcon icon={['fas', 'fa-arrow-left']} />&nbsp;Back */}
                <h2 class="section-header client-form-header">Register as a Client</h2>
                <div class="client-content">
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-user']} />
                        <input type="text" class="box" placeholder="Enter a Username" />
                    </div>
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-envelope']} />
                        <input type="email" class="box" placeholder="Enter your Email" />
                    </div>
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-lock']} />
                        <input type="password" class="box" placeholder="Enter a Password" />
                    </div>
                    <div class="buttons">
                        <button class="btn">Register</button>
                        <Link to="/" class="link btn">Cancel</Link>
                    </div>
                    <div class="form-links">
                        <p><input type="checkbox" />&nbsp;&nbsp;Remember Me</p>
                        <Link to="/login" class="link"><p>Already have an account? <span>Login</span></p></Link>
                    </div>
                </div>
            </form>

        </div>


  )
} 


export default Client;

