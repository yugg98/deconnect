import React, { useState, useEffect } from 'react'
import './Post.css'
import like from '../img/like.png'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import { format } from 'timeago.js';
import {url} from '../config'
function Post() {
    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState([])
    const [comment, setComment] = useState("")
    const [commentData, setCommentData] = useState([])
    const [ModalData, setModalData] = useState({})
    const mu = useSelector((state) => state.user.state.data.user)
    const [truef,setTruef]= useState(false)

    const Share = (id) => {
        const data = {
            "pid": id,
            "token": localStorage.getItem("token")
        }
        fetch(url+'api/v1/share', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', JSON.stringify(data));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const Like = (id) => {
        console.log(id)
        const data = {
            "id": id,
            "token": localStorage.getItem("token")
        }
        // e.preventDefault();
        fetch(url+'api/v1/Like', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', JSON.stringify(data));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const PostComment = (id) => {
        const data = {
            "id": id,
            "token": localStorage.getItem("token"),
            "cbody": comment
        }
        fetch(url+'api/v1/Comment', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', JSON.stringify(data));
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const getPost = () => {
        const token = localStorage.getItem("token");
        const data = {
            "token": token
        }
        fetch(url+'api/v1/userFeed', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                console.log(data.Posta)
                setData(data.Posta)
                setUser(data.user)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const getComment = (id) => {
        fetch(url+`api/v1/getComment/${ModalData._id}`, {
            method: 'get', 
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data.Comments);
                setCommentData(data.Comments)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        getPost()
    }, [])
    const handleOpen = () => {
        setOpen(true);
        setTruef(true);
    };
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "60%",
        height: "70%",
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        p: 2,
    };
    
    return (
        <div>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open} className="m_f" sx={style} >
                        <Box className="bx" >
                            <Typography id="transition-modal-title" variant="h6" component="h2">

                            </Typography>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                                <div className="flex mf">
                                    <div className='flex max-w-xl my-10 bg-white shadow-md rounded-lg overflow-hidden mx-auto none'>
                                        <div className='flex items-center w-full'>
                                            <div className='w-full'>
                                                <div className="flex flex-row mt-2 px-2 py-3 mx-3">
                                                    <div className="w-auto h-auto rounded-full ">
                                                        <img className='w-12 h-12 object-cover rounded-full  cursor-pointer' alt='User avatar' src={ModalData?.user_id?.avatar?.url} />
                                                    </div>
                                                    <div className="flex flex-col mb-2 ml-4 mt-1">
                                                        <div className='text-gray-600 text-sm font-semibold'></div>
                                                        <div className='flex w-full mt-1'>
                                                            <div className='text-grey-700 font-base text-xx mr-1 cursor-pointer'>
                                                                {ModalData?.user_id?.name} <br />
                                                                {ModalData?.user_id?.position}
                                                            </div>
                                                            <div className='text-gray-400 font-thin text-xs'>
                                                                {format(ModalData?.createdAt)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-b border-gray-100"></div>
                                                <div className='text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2'>
                                                    {ModalData?.body}
                                                </div>
                                                <div className='text-gray-600 font-semibold text-lg mb-2 mx-3 px-2'></div>
                                                <div className='text-gray-500 font-thin text-sm mb-6 mx-3 px-2'></div>
                                                <div className="flex justify-start mb-4 border-t border-gray-100">
                                                    <div className="flex w-full mt-1 pt-2 pl-5">
                                                    </div>
                                                    <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                                                        <span onClick={() => Share(ModalData?._id)} className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                                                            <svg xmlns="https://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                                            </svg>
                                                        </span>

                                                        <span>
                                                            <button className="p_l" onClick={() => Like(ModalData?._id)}><img src={like} className="like_P" /></button>
                                                        </span>

                                                    </div>
                                                </div>
                                                {/* <div className="flex w-full border-t border-gray-100">
                                                    <div className="mt-3 mx-5 flex flex-row">
                                                        <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Comments:<div className="ml-1 text-gray-400 font-thin text-ms"> 30</div></div>
                                                        <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Views: <div className="ml-1 text-gray-400 font-thin text-ms"> 60k</div></div>
                                                    </div>
                                                    <div className="mt-3 mx-5 w-full flex justify-end">
                                                        <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Likes: <div className="ml-1 text-gray-400 font-thin text-ms"> 120k</div></div>
                                                    </div>
                                                </div> */}

                                            </div>
                                        </div>
                                    </div>
                                    <div class="ui comments ">
                                        <h3 class="ui dividing header">Comments</h3>

                                        <div className="scroll">
                                            {commentData.map((e) => (
                                                <div class="comment">
                                                    <a class="avatar">
                                                        <img src={e?.userId.avatar.url} />
                                                    </a>
                                                    <div class="content">
                                                        <a class="author">{e?.userId.name}</a>
                                                        <div class="metadata">
                                                            <span class="date">Today at 5:42PM</span>
                                                        </div>
                                                        <div class="text">
                                                            {e?.body}
                                                        </div>
                                                        <div class="actions">
                                                            {/* <a class="reply">Reply</a> */}
                                                        </div>
                                                    </div>
                                                </div>

                                            ))}
                                        </div>
                                        <form class="ui reply form">
                                            <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                                                <img className='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer' alt='User avatar' src={mu.avatar.url} />
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                                                    <button type="submit" onClick={() => PostComment()} className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                                                        <svg className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>

                                                    </button>
                                                </span>
                                                <input type="search" style={{ width: "375px", color: "white" }} onChange={(e) => setComment(e.target.value)} className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: "25px" }} placeholder="Post a comment..." autoComplete="off" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Typography>
                        </Box>
                    </Fade>
                </Modal>
                {data.map((e) => (
                    <div className='flex max-w-xl my-10 bg-white shadow-md rounded-lg overflow-hidden mx-auto' key={e._id} >
                        <div className='flex items-center w-full'>
                            <div className='w-full'>
                                <div className="flex flex-row mt-2 px-2 py-3 mx-3" >
                                    <div className="w-auto h-auto rounded-full ">
                                        <img className='w-12 h-12 object-cover rounded-full  cursor-pointer' alt='User avatar' src={e.user_id.avatar.url} />
                                    </div>
                                    <div className="flex flex-col mb-2 ml-4 mt-1">
                                        <div className='text-gray-600 text-sm font-semibold'></div>
                                        <div className='flex w-full mt-1'>
                                            <div className='text-grey-700 font-base text-xx mr-1 cursor-pointer'>
                                                {e.user_id.name}<br />
                                                {e.user_id.position}
                                            </div>
                                            <div className='text-gray-400 font-thin text-xs'>
                                                {format(e.createdAt)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-100"></div>

                                <div className='text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2' >
                                    {e.body}
                                    {e.image ? <img src={e.image.url} /> : ""}
                                </div>
                                <div className='text-gray-600 font-semibold text-lg mb-2 mx-3 px-2'></div>
                                <div className='text-gray-500 font-thin text-sm mb-6 mx-3 px-2'></div>
                                <div className="flex justify-start mb-4 border-t border-gray-100" onClick={() => { handleOpen(); setModalData(e); getComment() }}>
                                    <div className="flex w-full mt-1 pt-2 pl-5">
                                    </div>
                                    <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                                        <span onClick={() => Share(e._id)} className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                                            <svg xmlns="https://www.w3.org/2000/svg" fill="none" width="14px" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                            </svg>
                                        </span>

                                        <span>
                                            <button className="p_l" onClick={() => Like(e._id)}><img src={like} className="like_P" /></button>
                                        </span>

                                    </div>
                                </div>
                                {/* <div className="flex w-full border-t border-gray-100">
                                    <div className="mt-3 mx-5 flex flex-row">
                                        <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Comments:<div className="ml-1 text-gray-400 font-thin text-ms"> 30</div></div>
                                        <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Views: <div className="ml-1 text-gray-400 font-thin text-ms"> 60k</div></div>
                                    </div>
                                    <div className="mt-3 mx-5 w-full flex justify-end">
                                        <div className='flex text-gray-700 font-normal text-sm rounded-md mb-2 mr-4 items-center'>Likes: <div className="ml-1 text-gray-400 font-thin text-ms"> 120k</div></div>
                                    </div>
                                </div> */}
                                <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                                    <img className='w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer' alt='User avatar' src={mu.avatar.url} />
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                                        <button type="submit" onClick={() => PostComment(e._id)} className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
                                            <svg className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400" xmlns="https://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                        </button>
                                    </span>
                                    <input type="search" style={{ width: "375px", color: "white" }} onChange={(e) => setComment(e.target.value)} className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue" style={{ borderRadius: "25px" }} placeholder="Post a comment..." autoComplete="off" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}
export default Post