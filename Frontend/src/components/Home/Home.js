import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar'
import Post from './Post'
import './Main.css'
import TweetBox from '../tweetBox/TweetBox';
import { url } from '../config';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "500px",
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
    p: 2,
};

export default function Main() {
    const [open, setOpen] = React.useState(false);
    const [caption, setCaption] = useState(" ");
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };



    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) {
            post();
            return
        };
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            console.log(reader.result)
            post(reader.result)
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
        };
    };

    const post = (base64EncodedImage) => {
        let data;
        if(base64EncodedImage==null){
         data = {
            "token": localStorage.getItem("token"),
            "body": caption,
            "img": base64EncodedImage
        }
        }
        else{
            data = {
                "token": localStorage.getItem("token"),
                "body": caption
            }
        }
        fetch(url+'api/v1/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // console.log(res)
        handleClose();
    }
    return (
        <div>
            <Navbar />
            <TweetBox/>
            <Post />
        </div>
    );
}