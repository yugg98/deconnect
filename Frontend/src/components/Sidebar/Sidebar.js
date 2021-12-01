import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
function Sidebar() {
    return (
        <nav id="sideNav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/me">me</Link></li>
                <li><Link to="/notification">Notification</Link></li>
                <li><Link to="/PeopleyouMayno">PeopleyouMayno</Link></li>
                <li><Link to="/blog" >Blog</Link></li>
                    <li><Link to="/message">Message</Link></li>
                </ul>
        </nav>
    )
}   

export default Sidebar
