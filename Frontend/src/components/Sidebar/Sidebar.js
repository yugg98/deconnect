import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import PersonIcon from '@mui/icons-material/Person';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom'
import './Sidebar.css'
function Sidebar() {

    return (
        <nav id="sideNav">
            <ul>
                <li><Link to="/"><HomeIcon fontSize="large" />Home</Link></li>
                <li><Link to="/me"><PersonIcon fontSize="large" />Me</Link></li>
                <li><Link to="/notification"><NotificationsIcon fontSize="large" />Notification</Link></li>
                {/* <li><Link to="/PeopleyouMayno">PeopleyouMayno</Link></li> */}
                <li><Link to="/Techshort"><BookIcon fontSize="large" />Blog</Link></li>
                <li><Link to="/message"><MessageIcon fontSize="large" />Message</Link></li>
            </ul>
        </nav>
    )
}

export default Sidebar
