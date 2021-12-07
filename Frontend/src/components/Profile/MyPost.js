import React, { useState, useEffect } from 'react'
import like from '../img/like.png'
import { useSelector } from "react-redux";
import { savePost } from "../../redux/action/index"
import './MyPost.css'
import { format } from 'timeago.js';
import { Button } from 'semantic-ui-react'
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { url } from '../config'
import { useDispatch } from "react-redux";
function MyPost() {
    const [comment, setComment] = useState("")
    const [openDrop, setOpenDrop] = useState(false)
    const [data, setData] = useState([])
    const user = useSelector((state) => state.user.state.data.user)
    const Like = (id) => {
        console.log(id)
        const data = {
            "id": id,
            "token": localStorage.getItem("token")
        }
        // e.preventDefault();
        fetch(url + 'api/v1/Like', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                // console.log('Success:', JSON.stringify(data));
            })
            .catch((error) => {
                // console.error('Error:', error);
            });
    }
    const dispatch = useDispatch()
    const PostComment = (id) => {
        const data = {
            "id": id,
            "token": localStorage.getItem("token"),
            "cbody": comment
        }
        fetch(url + 'api/v1/Comment', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                // console.log('Success:', JSON.stringify(data));
            })
            .catch((error) => {
                // console.error('Error:', error);
            });
    }
    const fetchMypost = () => {
        const sdata = {
            "token": localStorage.getItem("token")
        }
        fetch(url + 'api/v1/myPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sdata),
        }).then(response => response.json())
            .then(data => {
                const post = data.posts;
                setData(post)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        fetchMypost()
    }, [])

    const Delete = (id) => {
        console.log(id)
        const sdata = {
            "id": id,
            "token": localStorage.getItem("token"),
        }
        fetch(url + 'api/v1/delete', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sdata),
        }).then(response => response.json())
            .then(no => {
                data.filter(function(da){
                    return da._id == id
                    setOpenDrop({})
                })                

            })
            .catch((error) => {
                // console.error('Error:', error);
            });
    }
    const openDropdown = () => {
        if (openDrop) {
            setOpenDrop(false);
            return
        }
        setOpenDrop(true)
    }

    return (
        <div>
            <div>
                {data?.map((e, id) => (
                    <div class='flex max-w-xl my-10 bg-white shadow-md rounded-lg overflow-hidden mx-auto' key={e._id}>
                        <div class='flex items-center w-full'>
                            <div class='w-full'>
                                <div class="flex flex-row mt-2 px-2 py-3 mx-3">
                                    <div class="w-auto h-auto rounded-full ">
                                        <img class='w-12 h-12 object-cover rounded-full  cursor-pointer' alt='User avatar' src={user.avatar?.url} />
                                    </div>
                                    <div class="flex flex-col mb-2 ml-4 mt-1">
                                        <div class=' text-sm font-semibold'></div>
                                        <div class='flex w-full mt-1'>
                                            <div class='text-grey-900 font-base text-xx mr-1 cursor-pointer'>
                                                {user.name} <br />
                                                {user.position}
                                            </div>
                                            <div class='text-gray-400 font-thin text-xs'>
                                                {format(e.createdAt)}
                                            </div>
                                            <div>
                                                <button onClick={openDropdown}><MoreVertIcon /></button>
                                                {openDrop ?
                                                    <div class="dropdown">
                                                        <div onClick={() => Delete(e._id)}>
                                                            Delete <DeleteIcon />
                                                        </div>
                                                    </div>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-b border-gray-100"></div>
                                <div class='text-gray-800 font-medium text-sm mb-7 mt-6 mx-3 px-2'>
                                    {e.body}
                                    {e.image ? <img src={e.image.url} /> : ""}
                                </div>
                                <div class='text-gray-600 font-semibold text-lg mb-2 mx-3 px-2'></div>
                                <div class='text-gray-500 font-thin text-sm mb-6 mx-3 px-2'></div>
                                <div class="flex justify-start mb-4 border-t border-gray-100">
                                    <div class="flex w-full mt-1 pt-2 pl-5">
                                    </div>
                                    <div class="flex justify-end w-full mt-1 pt-2 pr-5">


                                        <span>
                                            <button onClick={() => Like(e._id)}><img src={like} className="like_P" /></button>
                                        </span>

                                    </div>
                                </div>
                                <div class="flex w-full border-t border-gray-100">
                                    {/* <div class="mt-3 mx-5 flex flex-row">
                                        <div class='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Comments:<div class="ml-1 text-gray-400 font-thin text-ms"> 30</div></div>
                                        <div class='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Views: <div class="ml-1 text-gray-400 font-thin text-ms"> 60k</div></div>
                                    </div>
                                    <div class="mt-3 mx-5 w-full flex justify-end">
                                        <div class='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Likes: <div class="ml-1 text-gray-400 font-thin text-ms"> 120k</div></div>
                                    </div> */}
                                </div>
                                <div class="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                                    <img class='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer' alt='User avatar' src={user.avatar?.url} />
                                    <span class="absolute inset-y-0 right-0 flex items-center pr-6">
                                        <button type="submit" onClick={() => PostComment(e._id)} class="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                                            <svg class="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                        </button>
                                    </span>
                                    <input type="search" style={{ width: "375px", color: "white" }} onChange={(e) => setComment(e.target.value)} class="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: "25px" }} placeholder="Post a comment..." autoComplete="off" />

                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default MyPost
