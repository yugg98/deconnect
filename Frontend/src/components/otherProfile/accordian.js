import Accordion from 'react-bootstrap/Accordion'
import * as React from 'react';
import './Ac.css'

export default function CustomizedAccordions(userp) {
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>

            <div className="skills">
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header >About</Accordion.Header>
                        <Accordion.Body>
                            {userp.data?.about}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >Experience</Accordion.Header>
                        <Accordion.Body>
                            {userp.data?.Experience}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Education</Accordion.Header>
                        <Accordion.Body>
                            {userp.data?.Education}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Skills</Accordion.Header>
                        <Accordion.Body>
                            {userp.data?.skills}
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>
            </div>
        </div>
    );
}