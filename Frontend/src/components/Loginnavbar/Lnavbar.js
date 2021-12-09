import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

function Lnavbar() {
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
            <Link to="/" style={{marginTop:"20px"}}><Button>Login</Button></Link>
            <Link to="/Signup" style={{marginTop:"20px"}}><Button>Signup</Button></Link>
        </div>
    )
}

export default Lnavbar
