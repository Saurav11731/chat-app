import React from 'react'// eslint-disable-line
import './Login.css';
import assets from '../../assets/assets'
const Login = () => {
  return (
    <div className='login'>
    <img src={assets.logo_big} alt="" className="logo" />
    <form  className="login-form">
    <h2>Sign Up</h2>
    <input type="text" placeholder='Username' className="form-input" required/>
    <input type="email" placeholder='Email-Address' className="form-input" required/>
    <input type="password" placeholder='password' className="form-input" required/>
    <button type='submit' >Sign Up</button>
    <div className="login-term">
        <input type="checkbox"  />
    <p>Agree to our Terms & Privacy Policy.</p>
    </div>
    <div className="login-forgot">
        <p className="login-toggle">Already have an account <span>Click here</span></p>
    </div>
    </form>
    </div>
  )
}

export default Login