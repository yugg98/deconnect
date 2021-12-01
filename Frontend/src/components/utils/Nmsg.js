import React from 'react'
import { useSelector } from "react-redux"
import {url} from '../config'

const style = {
    display:"flex",
    flexDirection: "column"
}
function Nmsg() {
    const user = useSelector(state => state.user.state.data.user.Notification)
    console.log(user)
    const Notification = user.filter((n)=>n.M == "N")
    return (
        <div>
            <div class="mymsg"style={style}>
                {Notification.map((e) => (
                <div class="ui message " color='green' >
                        <div class="header">
                            {e.Head}
                        </div>
                        <div>{e.Message}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Nmsg
