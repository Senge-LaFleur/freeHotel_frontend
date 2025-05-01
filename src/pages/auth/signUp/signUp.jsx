import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './signUp.css'

const SignUp = () => {

    return (
        <div class="signUp-form-container">
            <form action="">
                <h2 class="section-header signUp-form-header">Sign Up</h2>
                <div class="signUp-content">
                    <h3 class="section-subheader">Register As</h3>
                    <div class="radio-container">
                        <label for="client">
                            <input type="radio" name="user" value="client" />
                            <span>A Client</span>
                        </label>
                        <label for="owner">
                            <input type="radio" name="user" value="owner" />
                            <span>A Hotel Owner</span>
                        </label>
                    </div>
                    <div class="buttons">
                        <button class="btn">Register</button>
                        <button class="btn">Cancel</button>
                    </div>
                    <div class="form-link">
                        <p>Already have an account? <span>Login</span></p>
                    </div>
                </div>
            </form>

        </div>


  )
} 


export default SignUp;

