import * as React from 'react';
import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import './Ac.css'
import edit from '../img/edit.png'
import { useSelector } from "react-redux";
import {url} from '../config'
import Accordion from 'react-bootstrap/Accordion'

export default function CustomizedAccordions() {
    const [open, setOpen] = React.useState(false);
    const [Aopen, setAOpen] = React.useState(false);
    const [Bopen, setBOpen] = React.useState(false);
    const [Copen, setCOpen] = React.useState(false);

    const [aabout, setaAbout] = React.useState(false);
    const [about, setAbout] = React.useState(false);
    const [babout, setbAbout] = React.useState(false);
    const [cabout, setcAbout] = React.useState(false);

    const [aboutd, setaboutd] = React.useState({})
    const [Experience, setExperience] = React.useState({})
    const [skills, setskills] = React.useState([])
    const [education, setEducation] = React.useState({})
    const [change, setChange] = React.useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleAOpen = () => setAOpen(true);
    const handleAClose = () => setAOpen(false);
    const handleBOpen = () => setBOpen(true);
    const handleBClose = () => setBOpen(false);
    const handleCOpen = () => setCOpen(true);
    const handleCClose = () => setCOpen(false);
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const user = useSelector((state) => state.user.state.data.user)
    const sendAbout = () => {
        const data = {
            "token": localStorage.getItem("token"),
            "about": about
        }
        fetch(url+'api/v1/about', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                setaboutd(data.user)
                setChange(true)

            })
            .catch((error) => {
                // console.error('Error:', error);
            })

        handleClose()
        // forceUpdate();
    }

    const sendExperience = () => {
        const data = {
            "token": localStorage.getItem("token"),
            "about": aabout
        }
        fetch(url+'api/v1/Experience', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                setExperience(data.user)
                setChange(true)

            })
            .catch((error) => {
            })

        handleAClose()
    }
    const sendEducation = () => {
        const data = {
            "token": localStorage.getItem("token"),
            "about": babout
        }
        fetch(url+'api/v1/Education', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                setChange(true)
            })
            .catch((error) => {
            })

        handleBClose()
    }
    const sendSkills = () => {
        const data = {
            "token": localStorage.getItem("token"),
            "skill": cabout
        }
        fetch(url+'api/v1/skill', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                setskills(data.user.skills)
                setChange(true)
            })
            .catch((error) => {
            })

        handleCClose()
    }
    const getProfile = () => {
        const data = {
            "token": localStorage.getItem("token"),
            "about": cabout
        }
        fetch(url+'api/v1/skill', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(data => {
                setskills(data.user.skills)
            })
            .catch((error) => {
            })


    }
    // getProfile();
    return (
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
                <Fade in={open}>
                    <Box className="bx" >
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <p className="cp">About </p>
                            <hr />
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <textarea placeholder="What do you want to talk about" className="txp" onChange={(e) => setAbout(e.target.value)} />
                            <div className="flex justify-between items-center">
                                <div>
                                    <Button className="p_b" variant="contained" onClick={sendAbout} >Save</Button>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={Aopen}
                onClose={handleAClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Aopen}>
                    <Box className="bx" >
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <p className="cp">Experience </p>
                            <hr />
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <textarea placeholder="What do you want to talk about" className="txp" onChange={(e) => setaAbout(e.target.value)} />
                            <div className="flex justify-between items-center">
                                <div>
                                    <Button className="p_b" variant="contained" onClick={() => sendExperience()} >Save</Button>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={Bopen}
                onClose={handleBClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Bopen}>
                    <Box className="bx" >
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <p className="cp">Education</p>
                            <hr />
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <textarea placeholder="What do you want to talk about" className="txp" onChange={(e) => setbAbout(e.target.value)} />
                            <div className="flex justify-between items-center">
                                <div>
                                    <Button className="p_b" variant="contained" onClick={sendEducation} >Save</Button>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={Copen}
                onClose={handleCClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={Copen}>
                    <Box className="bx" >
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            <p className="cp">Skills</p>
                            <hr />
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <textarea placeholder="What do you want to talk about" className="txp" onChange={(e) => setcAbout(e.target.value)} />
                            <div className="flex justify-between items-center">
                                <div>
                                    <Button className="p_b" variant="contained" onClick={sendSkills}>Save</Button>
                                </div>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
            <div className="skills">
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >About<button onClick={() => handleOpen()} className="himg"><img className="imge" src={edit} /></button></Accordion.Header>
                        <Accordion.Body>
                            {user.about}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header >Experience<button onClick={() => handleAOpen()} className="himg"><img className="imge" src={edit} /></button></Accordion.Header>
                        <Accordion.Body>
                            {user.Experience}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header >Education<button onClick={() => handleBOpen()} className="himg"><img className="imge" src={edit} /></button></Accordion.Header>

                        <Accordion.Body>
                            {user.Education}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header >Skills<button onClick={() => handleCOpen()} className="himg"><img className="imge" src={edit} /></button></Accordion.Header>

                        <Accordion.Body>
                            {user.skills.map((e)=>(
                                <a class="ui basic label">{e}</a>
                            ))}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}