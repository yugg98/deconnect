import React, { useState } from 'react'
import logo from '../img/img.png'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import CableIcon from '@mui/icons-material/Cable';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar'
import BookIcon from '@mui/icons-material/Book';
import MessageIcon from '@mui/icons-material/Message';
import ImageIcon from '@mui/icons-material/Image';
import './Navbar.css'

function Navbar() {
    const [Search, setSearch] = useState(" ");
    const [sidebarShow, setSidebarShow] = useState(false)
    const navigate = useNavigate()
    const Searchr = () => {
        navigate(`/Search/${Search}`)
    }
    const profileimg = useSelector((state) => state?.user?.state?.data?.user?.avatar?.url)
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
                    <Link to="/">
                        <div className="logon">
                            <img src={logo} />

                        </div>
                    </Link>

                    <div className="nav_searchBar" placeholder="" >
                        <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} />
                        <SearchIcon onClick={() => { Searchr() }} style={{ color: "black" }} />
                    </div>
                </div>
                <div className="main_n">
                    <div>
                        <Link to="/" activeStyle={{ color: 'red' }}><HomeIcon fontSize="large" color="action" /></Link>
                    </div>
                    <div>
                        <Link to="/notification" activeStyle={{ border: "2px solid green" }}><NotificationsIcon fontSize="large" color="action" /></Link>
                    </div>
                    <div>
                        <Link to="/PeopleyouMayno" activeStyle={{ border: "2px solid green" }}><CableIcon fontSize="large" color="action" /></Link>
                    </div>
                    <div>
                        <Link to="/Techshort" activeStyle={{ border: "2px solid green" }}><BookIcon fontSize="large" color="action" /></Link>
                    </div>
                    <div>
                        <button >
                            <FolderIcon fontSize="large"/>
                            <div className="dropdown">
                                <Link to="img"><button className="options"><ImageIcon style={{marginRight:"10px"}}/>image</button></Link>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="me"><Link to="/me" ><div className="imgn"><img src={profileimg == undefined ? profileimg : "data:image/jpeg;base64,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"} />Me</div></Link></div>
                <div className="ham"><div className="imgn"><Button sx={{ borderRadius: "50%", zIndex: "3" }} onClick={(event) => show(event)}><MenuIcon fontSize="large" style={{ color: "black" }} /></Button></div></div>
            </nav>
            {sidebarShow ? <Sidebar /> : null}
        </>
    )
}

export default Navbar
