import React, { useState, useEffect } from "react";
import {Form, Col, Button } from 'react-bootstrap';


const SendMailHolders =()=>{
    
    const [subject, setSubjet] = useState('');
    const [body, setBody] = useState('');
    const [event, setEvent]= useState('');
    const [events, setData] = useState([]);

    const submit = async (e) => {
        e.preventDefault();

        const res = await fetch(`https://localhost:7100/api/Admin/sendmailtoticketholders?eventid=${event}&subject=${subject}&body=${body}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
    }

    const getData = ()=>{
        fetch('https://localhost:7100/api/CurrentEvents/getallcurrentevents',{
            credentials:'include'
        })
            .then((res)=>res.json())
            .then((res)=>{
                console.log(res)
                setData(res)
            })
    }

    useEffect(() => {
        getData()
      }, [])
    
       
        return(
           <div className="container">
                <h3>Set mail to all ticket holders</h3>
                <Form onSubmit={submit}>
                <Form.Group controlId="cityName">
                    <Form.Label>Event name</Form.Label>
                    <Form.Control as="select" onChange={(e) => setEvent(e.target.value)}>                                            
                        {events.map(c =>
                        <option key={c.currentEventId} value={c.currentEventId}>{c.eventName}</option>
                        )}
                    </Form.Control >
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Subject</Form.Label>
                    <Form.Control name="subject" type="input" placeholder="Subject" onChange={(e) => setSubjet(e.target.value)} />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Body</Form.Label>
                    <Form.Control name="body" as="textarea" rows={3} onChange={(e) => setBody(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
          )  }

export default SendMailHolders;
