import React, { useState, useEffect } from 'react'
import './Profile.css'
import MyPost from './MyPost'
import { useSelector } from "react-redux";
import Accordian from './accordian'
import edit from '../img/edit.png'
import Navbar from '../Navbar/Navbar'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@material-ui/core/IconButton';
import {url} from '../config'
function Profile() {
    const [data, setData] = useState([]);
    const [change, setChange] = useState(false);
    const [pdata, setpData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState, setFileInputState] = useState('');
    const [img, setImg] = useState('');
   
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    const user = useSelector((state) => state.user.state.data.user)

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };



    const Avatar = () => {
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setImg(reader.result)
            avatar(reader.result)
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };
    const Banner = () => {
        console.log("hello")
        if (!selectedFile) return;
        console.log("hello")
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setImg(reader.result)
            banner(reader.result)
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
        setChange(true)
    };
    const avatar = (img) =>{
        const sdata = {
            "token":localStorage.getItem("token"),
            "avatar":img
        }
        fetch(url+'api/v1/me/updateAvatar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sdata),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const banner = (img) =>{
        const sdata = {
            "token":localStorage.getItem("token"),
            "banner":img
        }
        console.log(img)
        fetch(url+'api/v1/me/updateBanner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sdata),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const fetchProfileDetails = () => {
        const sdata = {
            "token":localStorage.getItem("token")
        }
        fetch(url+'api/v1/myPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sdata),
        }).then(response => response.json())
            .then(data => {
                setpData(data.posts);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        fetchProfileDetails()
    }, [])
    if(change){
        fetchProfileDetails();
        setChange(false)
    }
    return (
        <>
            <Navbar />
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
                <Fade in={open}>
                    <Box className="bx" >
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <p className="cp">Set Banner/Avatar </p>
                            <hr />
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div className="flex justify-between items-center">
                                <div className="button_p">
                                    <img src={img}/>
                                   
                                    <input accept="image/*" id="icon-button-img"
                                        type="file" style={{ display: 'none' }} onChange={handleFileInputChange}
                                        value={fileInputState} />
                                    <label htmlFor="icon-button-img">
                                        <IconButton color="primary" aria-label="upload picture"
                                            component="span">
                                            < ImageIcon />
                                        </IconButton>
                                    </label>
                                   
                                </div>
                                <div>
                                    <button className="p_b" onClick={()=>{Banner(); handleClose()}}>setBanner</button>
                                    <button className="p_b" onClick={()=>{Avatar();handleClose()}}>setAvatar</button>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            <div className="profile">

                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={user.banner.url}
                                alt=""
                            />

                            <button className="edit eimge" onClick={() =>  handleOpen()}><img src={edit} /></button>
                            <img
                                className="profileUserImg"
                                src={user.avatar.url}
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.name}</h4>
                            <span className="profileInfoDesc" styel={{textAlign:"center"}}>{user.position}</span>
                        </div>
                    </div>
                    {/* <div className="profileRightBottom"> */}
                    {/* </div> */}
                </div>
            </div>
            <Accordian />
            <MyPost props={{ post: pdata, user: data }} />
        </>
    )
}

export default Profile