import React, { useState,useEffect } from 'react'
import logo from '../img/img.jpg'
import { useParams,useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import './Search.css'
import Navbar from '../Navbar/Navbar'
import {url} from '../config'

function Search() {
    const [searchData, setSearchData] = useState([])
    const user = useSelector((state) => state.user.state.data.user)
    console.log(user)
    let { Search } = useParams();
    const navigate = useNavigate()
    const SearchUser = () => {
        fetch(url+`api/v1/Searchuser/${Search}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                setSearchData(data.users.filter((e)=>e._id!=user._id))
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // window.addEventListener('load', SearchUser);
    useEffect(() => {
        SearchUser()       
    }, [])
    const getProfile = (id) =>{
        navigate(`/in/${id}`);
    }
    return (
        <div>
            <Navbar/>
            <div className="m-s">
                <p className="head_s">People</p>
                {searchData.map((e) => (

                    <div class="sb" onClick={()=>getProfile(e._id)}>
                        <div class="img">
                            <img src={e.avatar.url} alt="" className="ms_img" />
                        </div>
                        <div class="text_sname">
                            <p>{e.name}</p>
                            <p>{e.position}</p>
                            {/* <p>Delhi india</p> */}
                            <hr />
                        </div>
                        <div class="button_link">
                            <button>Link</button>
                            <button>Follow</button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Search
