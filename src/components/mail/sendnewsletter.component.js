import React, { useState } from "react";
import {Form, Col, Button } from 'react-bootstrap';


const SendNewsletters =()=>{
    
    const [subject, setSubjet] = useState('');
    const [body, setBody] = useState('');
    

    const submit = async (e) => {
        e.preventDefault();

        const res = await fetch(`https://localhost:7100/api/Admin/sendnewslettertoallusers?subject=${subject}&body=${body}`, {
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
    }

       
        return(
            <div className="container">
            <h3>Send newsletter</h3>
            <Form onSubmit={submit}>
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

export default SendNewsletters;