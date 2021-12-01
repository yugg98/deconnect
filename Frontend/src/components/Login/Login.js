import React, { useState } from 'react'
import {  Link } from "react-router-dom"
import { saveUser } from "../../redux/action/index"
import { useDispatch } from "react-redux"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import loginimg from './scss/images/signin-image.jpg'
import { Alert } from '@mui/material';
import './css/style.css'
import {url} from '../config'
function Login() {
  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [error, setError] = useState(" ")
  const [et, setEt] = useState(false)

  const dispatch = useDispatch();
  const login = (e) => {
    const data = {
      "email": email,
      "password": password
    }
    e.preventDefault();
     fetch(`${url}api/v1/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        localStorage.setItem('token', data.token);
        dispatch(saveUser(data))
        window.location.reload()
      })
      .catch((error) => {
        setEt(true)
        setError("Email or Password is invalid")
      });
  }
  return (
    <section class="sign-in">
      {et?<Alert severity="error">{error}</Alert>:""}

      <div class="container clog">
        <div class="signin-content">
          <div class="signin-image">
            <figure><img src={loginimg} alt="sing up image" /></figure>
            <Link to="/Signup" class="signup-image-link">Create an account</Link>
          </div>

          <div class="signin-form">
            <h2 class="form-title">Sign up</h2>
            <div  class="register-form" id="login-form">
              <div class="form-group">
              <label for="name" className="ls"><EmailIcon/></label>
                <input type="text" name="your_name" id="your_name" className="inp" placeholder="Your Name" onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div class="form-group">
                <label for="your_pass" className="ls"><LockIcon /></label>
                <input type="password" name="your_pass" id="your_pass" className="inp" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div class="form-group">
                <input type="checkbox" />
                <label for="remember-me"  className="ls label-agree-term"><span><span></span></span>Remember me</label>
              </div>
              <div class="form-group form-button">
                <button id="signin" class="form-submit" onClick={(e)=>login(e)}>Log in</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
