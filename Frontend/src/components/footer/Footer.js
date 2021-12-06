import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RoomIcon from '@mui/icons-material/Room';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import './footer.css'
function Footer() {
    return (
        <>
        <footer>
            <div class="containerf">
                <div class="aboutus sec">
                    <h2>About us</h2>
                    <p>we are in the mission to connect developers and makeing things availabel for them easily</p>
                    <ul class="sci">
                        <li><a target="_blank" href="https://www.facebook.com/Xtream-110512181464357/?notif_id=1638770606804376&notif_t=aymt_simplified_make_page_post&ref=notif"><FacebookIcon /></a></li>
                        <li><a target="_blank" href="https://www.instagram.com/yuggupta2056/"><InstagramIcon /></a></li>
                        {/* <li><a target="_blank" href="#"><TwitterIcon /></a></li> */}
                        <li><a target="_blank" href="https://www.linkedin.com/company/xtreamtech/"><LinkedInIcon /></a></li>
                    </ul>
                </div>
                <div class="sec quicklinks">
                    <h2>Quick links</h2>
                    <ul>
                        <li><a target="_blank" href="#">About</a></li>
                        <li><a target="_blank" href="https://www.privacypolicies.com/live/2903b042-f582-475c-adf3-73d39ea5daab  ">Privacy Policy</a></li>
                        <li><a target="_blank"href="mailto:xtreamtechcommunity982@gmail.com">Help</a></li>
                    </ul>
                </div>
                <div class="sec contactf">
                    <h2>Contact info</h2>
                    <ul class="infof">
                        <li>
                            <span><RoomIcon /></span>
                            <span>474001 Morar Gwalior<br />Mp,<br />india</span>
                        </li>
                        <li>
                            <span><CallIcon /></span>
                            <p><a href="tel:9826112003">9826112003</a><br /><a href="tel:9826112003">9131442093</a></p>
                        </li>
                        <li>
                            <span><EmailIcon /></span>
                            <p><a href="mailto:xtreamtechcommunity982@gmail.com">xtreamtechcommunity982@<br/>gmail.com</a></p>
                        </li>
                    </ul>
                </div>
            </div>
        </footer >
        <div class="copyrightText">
            <p>Copyright Ⓒ 2021 Xtream . All Rights Reserved</p>
        </div>
        </>
    )
}

export default Footer
