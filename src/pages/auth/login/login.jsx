import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css'

const Login = () => {

    return (
        <div class="login-form-container">
            <form action="">
                <h2 class="section-header login-form-header">Login</h2>
                <div class="login-content">
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-envelope']} />
                        <input type="email" class="box" placeholder="Enter your Email" />
                    </div>
                    <div class="box-container">
                        <FontAwesomeIcon icon={['fas', 'fa-lock']} />
                        <input type="password" class="box" placeholder="Enter your Password" />
                    </div>
                    <div class="buttons">
                        <button type="submit" class="btn">Login</button>
                        <Link to="/" class="link btn">Cancel</Link>
                    </div>
                    <div class="form-links">
                        <Link to="/" class="link"><p>Forgot password? <span>Click Here</span></p></Link>
                        <Link to="/signUp" class="link"><p>Do not have an account? <span>Sign up</span></p></Link>
                    </div>
                </div>
            </form>

        </div>


  )
} 


export default Login;

