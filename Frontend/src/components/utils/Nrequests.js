import React from 'react'
import el from '../img/elliot.jpg'
import axios from 'axios'
import { useSelector } from "react-redux"
import { url } from '../config'

function Nrequests() {
    const user = useSelector(state => state.user.state.data.user.Notification)
    const Notification = user.filter((n) => n.M == "R")
    console.log(Notification)
    const Approve = (id) => {
        const data = {
            "token": localStorage.getItem("token"),
            "lid": id
        }
        const cdata = {
            "token": localStorage.getItem("token"),
            "id": id
        }
        const res = axios.post(url + "api/v1/acceptlink", data);
        const coversation = axios.post(url + "api/v1/newconversation", cdata);
        console.log(res, coversation);
    }
    return (
        <div>
            {Notification.map((e) => (
                <div class="ui cards mycd">
                    <div class="card">
                        <div class="content">
                            <img class="right floated mini ui image" src={el} />
                            <div class="header">
                                <div class="meta">
                                    {e.Head}
                                </div>
                            </div>
                            <div class="description">
                                {e.Message}
                            </div>
                        </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button" onClick={() => Approve(e.id)}>Approve</div>
                                <div class="ui basic red button">Decline</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Nrequests
