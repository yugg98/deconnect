import React from 'react'
import './ProfileCard.css'
import img from '../img/img.jpg'
function ProfileCard() {
return (
    <div class="profile-card" style={{display:"inline"}}>
        <div class="card-header">
          <div class="pic">
            <img src={img} alt=""/>
          </div>
          <div class="name">John Doe</div>
          <div class="desc">Developer & Designer</div>
          <div class="sm">
            <a href="#" class="fab fa-facebook-f"></a>
            <a href="#" class="fab fa-twitter"></a>
            <a href="#" class="fab fa-github"></a>
            <a href="#" class="fab fa-youtube"></a>
          </div>
         
        </div>
        <div class="card-footer">
          <div class="numbers">
            <div class="item">
              <span>120</span>
              Posts
            </div>
            <div class="pborder"></div>
            <div class="item">
              <span></span>
              Following
            </div>
            <div class="pborder"></div>
            <div class="item">
              <span>120K</span>
              Followers
            </div>
          </div>
        </div>
      </div>
)
}

export default ProfileCard