import React, { useState } from 'react'
import logo from '../img/img.png'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import CableIcon from '@mui/icons-material/Cable';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar'
import BookIcon from '@mui/icons-material/Book';
import MessageIcon from '@mui/icons-material/Message';
import './Navbar.css'

function Navbar() {
    const [Search, setSearch] = useState(" ");
    const [sidebarShow, setSidebarShow] = useState(false)
    const navigate = useNavigate()
    const Searchr = () => {
        navigate(`/Search/${Search}`)
    }
    const user = useSelector((state) => state.user.state.data.user.avatar.url)
    const show = (event) => {
        event.preventDefault();
        if (sidebarShow == false) {
            setSidebarShow(true);
        }
        else {
            setSidebarShow(false);
        }
    }
    return (
        <>
            <nav>
                <div className="sl">
                    <div className="logon"><img src={logo} /></div>
                    <div className="nav_searchBar" placeholder="" >
                        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                        <SearchIcon onClick={() => { Searchr() }} style={{color:"black"}}/>
                    </div>
                </div>
                <div className="main_n">
                    <div className="border-bottomn">
                        <Link to="/"><HomeIcon fontSize="large" /></Link>
                    </div>
                    <div>
                        <Link to="/notification"><NotificationsIcon fontSize="large" /></Link>
                    </div>
                    <div>
                        <Link to="/PeopleyouMayno"><CableIcon fontSize="large" /></Link>
                    </div>
                    <div>
                        <Link to="/blog"><BookIcon fontSize="large" /></Link>
                    </div>
                    <div>
                        <Link to="/message"><MessageIcon fontSize="large" /></Link>
                    </div>
                </div>
                <div className="me"><Link to="/me" ><div className="imgn"><img src={user} />Me</div></Link></div>
                <div className="ham"><div className="imgn"><Button sx={{ borderRadius: "50%", zIndex: "3" }} onClick={(event) => show(event)}><MenuIcon fontSize="large" style={{color:"black"}}/></Button></div></div>
            </nav>
            {sidebarShow ? <Sidebar /> : null}
        </>
    )
}

export default Navbar
