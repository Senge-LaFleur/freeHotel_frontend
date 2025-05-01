import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './owner.css'

const Owner = () => {

    return (
        <div class="owner-form-container">
            <form action="">
                <FontAwesomeIcon icon={['fas', 'fa-arrow-left']} />&nbsp;Back
                <h2 class="section-header owner-form-header">Register as a Hotel Owner</h2>
                <div class="owner-content">
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-user']} />
                        <input type="text" class="box" placeholder="Enter a Username" />
                    </div>
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-hotel']} />
                        <input type="text" class="box" placeholder="Enter the Name of your Hotel" />
                    </div>
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-phone']} />
                        <input type="text" class="box" placeholder="Enter your Business Phone Number" />
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
                        <button class="btn">Cancel</button>
                    </div>
                    <div class="form-links">
                        <p><input type="checkbox" />&nbsp;&nbsp;Remember Me</p>
                        <p>Already have an account? <span>Sign in</span></p>
                    </div>
                </div>
            </form>

        </div>


  )
} 


export default Owner;

