import MyPost from './MyPost'
import React, { useState, useEffect } from 'react'
import './Profile.css'
import Accordian from './accordian'
import {url} from '../config'
import axios from "axios";
import { useParams } from "react-router-dom"
import Navbar from '../Navbar/Navbar'
import { Button } from '@mui/material'
function OtherProfile() {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState({});
    const [followt, setFollowt] = useState("follow")
    const [linkt, setLinkt] = useState("Link")
    const [followColour, setFollowColour] = useState("success")
    const [LinkColour, setLinkColour] = useState("success")
    const [follow, setFollow] = useState("follow");
    const [name, setName] = useState(0)
    let { id } = useParams();
    const fetchProfileDetails = () => {
        fetch(url+`api/v1/in/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setUser(data.user);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
    const followf = () => {
        if(followt == "follow"){
        const fdata = {
            "token": localStorage.getItem("token"),
            "userid": user._id
        }
        const res = axios.post(url+"api/v1/follow", fdata)
            .then((res) => {
                console.log(res);
                setFollowt("unfollow");
                setFollowColour("error")
            })
        }
        else if(followt == "unfollow"){
            setFollowt("follow");
            setFollowColour("success")
        }
        return;

    }

    useEffect(() => {
        fetchProfileDetails();
    }, [])
    return (
        <>
            <Navbar />
            <div className="profile">

                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img className="profileCoverImg" src={user.banner?.url} alt="" />
                            <img className="profileUserImg" src={user.avatar.url} alt="" />

                        </div>
                        <div className="buttons">
                            <Button variant="contained" color={followColour} style={{ margin: "10px", marginTop: "0px" }} onClick={() => followf()} >{followt}</Button>
                            <Button variant="contained" color="success" style={{ margin: "10px", marginTop: "0px" }}>{linkt}</Button>
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.name}</h4>
                            <span className="profileInfoDesc" style={{ textAlign: "center" }}>{user.position}</span>
                        </div>
                    </div>

                </div>
            </div>
            <Accordian data={user} />
            <MyPost id={id} avatar={user.avatar.url}/>
        </>
    )
}

export default OtherProfile