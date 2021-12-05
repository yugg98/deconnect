import React, { useState } from 'react'
import validator from 'validator';
import './css/style.css'
import loginimg from './scss/images/signin-image.jpg'
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from "react-router-dom"
import { Alert } from '@mui/material';
import { url } from '../config'
function Signup() {
  const [name, setName] = useState(" ")
  const [email, setEmail] = useState(" ")
  const [password, setPassword] = useState(" ")
  const [comfirmPassword, setComfirmPassword] = useState(" ")
  const [position, setPosition] = useState(" ")
  const [suc, setSuc] = useState(false)
  const [errorText, setErrorText] = useState(" ");
  const [e, setE] = useState(false);
  const n = useNavigate();
  const signin = () => {
    const data = {
      "name": name,
      "email": email,
      "position": position,
      "password": password
    }
    if (name.length < 4) {
      console.log("length")
      setErrorText("Name length should have more than 4 charcters")
      setE(true)
      return
    }
    else if (!validator.isEmail(email)) {
      console.log("email")
      setErrorText("Pls enter valid email")
      setE(true)

      return
    }
    else if (password.length < 8) {
      setErrorText("Password should have more than 8 characters")
      setE(true)

      return

    }
    else if (comfirmPassword != password) {
      setErrorText("Password does't match")
      setE(true)
      return
    }
    fetch(url + 'api/v1/register', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),

    }).then(response => response.json())
      .then(data => {
        console.log('Success:', JSON.stringify(data));
        localStorage.setItem("token", data.token);
        n("/")
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorText("Email already exists")
      setE(true)
      });

  }


  return (
    <>
      <section class="signup centerm">
        <div class="container">
          <div class="signup-content">
            <div class="signup-form">
              <h2 class="form-title">Sign up</h2>
              {e ? <Alert severity="error" >{errorText}</Alert> : ""}
              <div class="register-form" id="register-form">
                <div class="form-group">
                  <label for="name" className="ls"><PersonIcon /></label>
                  <input type="text" name="name" id="name" className="inp" placeholder="Your Name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="name" className="ls"><PersonIcon /></label>
                  <input type="text" name="name" id="name" className="inp" placeholder="Your Position" onChange={(e) => setPosition(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="email" className="ls"><EmailIcon /></label>
                  <input type="email" name="email" id="email" className="inp" placeholder="Your Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="pass" className="ls"><LockIcon /></label>
                  <input type="password" name="pass" id="pass" className="inp" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="form-group">
                  <label for="re-pass" className="ls"><LockIcon /></label>
                  <input type="password" name="re_pass" id="re_pass" className="inp" placeholder="Comfirm password" onChange={(e) => setComfirmPassword(e.target.value)} />
                </div>
                <div class="form-group">
                  <input type="checkbox" name="agree-term" id="agree-term" className="inp" class="agree-term" />
                  <label for="agree-term" class="label-agree-term"><span><span></span></span>I agree all statements in  <a href="https://www.privacypolicies.com/live/2903b042-f582-475c-adf3-73d39ea5daab" class="term-service">Terms of service</a></label>
                </div>
                <div class="form-group form-button">
                  <button id="signup" class="form-submit" onClick={signin}>Register</button>
                </div>
              </div>
            </div>
            <div class="signup-image">
              <figure><img src={loginimg} alt="sing up image" /></figure>
              <Link to="/" className="signup-image-link">I am already member</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup