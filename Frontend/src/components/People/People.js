import React from 'react'
import { Card, Icon } from 'semantic-ui-react'
import Navbar from '../Navbar/Navbar'
import {Button} from "@mui/material"
function People() {
    const extra = (
        <a>
            <Icon name='user' />
            <Button variant="outlined" color="success" style={{margin:"12px auto"}}>Link</Button>
        </a>
    )

    return (
        <>
        <Navbar/>
        <div >
           <p style={{textAlign:'center'}}>Not present</p>
           
        </div>
        </>
    )
}

export default People
