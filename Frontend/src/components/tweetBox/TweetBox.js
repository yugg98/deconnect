import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector } from "react-redux";
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import IconButton from '@material-ui/core/IconButton';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import {url} from '../config'
import './TweetBox.css'
const TweetBox = () => {
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
  const user = useSelector((state) => state.user.state.data.user)

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      post()
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
      post(null);
    };
  };

  const post = (base64EncodedImage) => {
    let data;
    if (base64EncodedImage != null) {
      data = {
        "token": localStorage.getItem("token"),
        "body": caption,
        "img": base64EncodedImage
      }
    }
    else {
      data = {
        "token": localStorage.getItem("token"),
        "body": caption
      }
    }
    console.log(data)
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
    <div className="create">
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
              <p className="cp">Create Post </p>
              <hr />
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <textarea placeholder="What do you want to talk about" className="txp" onChange={(e) => setCaption(e.target.value)} />
              <div className="flex justify-between items-center">
                <div className="button_po">
                  <input accept="video/*" id="icon-button-video"
                    type="file" style={{ display: 'none' }} />
                  <label htmlFor="icon-button-video">
                    <IconButton  aria-label="upload picture"
                      component="span">
                      < VideoLibraryIcon />
                    </IconButton>
                  </label>
                  <input accept="image/*" id="icon-button-img"
                    type="file" style={{ display: 'none' }} onChange={handleFileInputChange}
                    value={fileInputState} />
                  <label htmlFor="icon-button-img">
                    <IconButton color="primary" aria-label="upload picture"
                      component="span">
                      < ImageIcon />
                    </IconButton>
                  </label>
                  <input id="icon-button-file"
                    type="file" style={{ display: 'none' }} />
                  <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture"
                      component="span">
                      < DescriptionIcon />
                    </IconButton>
                  </label>
                </div>
                <div>
                </div>
              </div>
              
                  <button className="p_b" onClick={handleSubmitFile}>Post</button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <div className="create__first">
        <div className="create__first-img">
          <span>
            <img src={user.avatar.url} alt="user" />
          </span>
        </div>
        <div className="create__first-input">
          <button className="mind" onClick={()=>handleOpen()}>Whats in your mind?</button>
        </div>
      </div>
      <div className="create__second">
        <span className="create__second-icon">
          <VideoLibraryIcon />
          <span className="text">Video</span>
        </span>
        <span className="create__second-icon">
          <ImageIcon className="greenColor" />{" "}
          <span className="text">Photo</span>
        </span>
        <span className="create__second-icon">
          <ImageIcon className="orangeColor" />{" "}
          <span className="text">Feeling</span>
        </span>
      </div>
    </div>
  );
};

export default TweetBox;
