import React, { useState } from 'react'
import Nsmg from '../utils/Nmsg'
import Nrequests from '../utils/Nrequests'
import { Button, ButtonGroup } from '@mui/material'
import { useSelector } from "react-redux"
import './Notification.css'
import Navbar from '../Navbar/Navbar'

function Notification() {
    const [request, setRequest] = useState(false);
    const user = useSelector(state => state.user.state.data.user.Notification)
    const Notification = user;
    
    return (
        <div>
            <Navbar/>
            <p id="np">Notifications</p>
            
            <div class="buttons">
                <ButtonGroup disableElevation variant="contained">
                    <Button variant="outlined" color="success" onClick={() => setRequest(false)}>Messages</Button>
                    <Button variant="outlined" color="success" onClick={() => setRequest(true)}>Requests</Button>
                </ButtonGroup>
            </div>
          
            {request ? <Nrequests/> : <Nsmg />}

        </div>
    )
}

export default Notification
