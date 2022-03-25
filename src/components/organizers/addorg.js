
import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";

export class AddAcountOrg extends Component{
    
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault()
        fetch("https://localhost:7100/api/Authenticate/removefromorganizeroradmin",{
            method:"POST",
            headers:{
                "Authorization":"Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IkFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvaGFzaCI6ImI3NGRkZDE0LTYzNDAtNDg0MC05NWMyLWRiMTI1NTQ4NDNlNSIsImp0aSI6ImRhZTE2OTQwLTE0YTUtNGU2Mi1hMGJkLWVkODg4YmRiN2IxZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjQ4MjEyMjYzLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAifQ.pLggmJHW8P9kNUMv9XNniLh1uDkniVfOYq48tNuketY",

                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                email:e.target.email.value
            })
        })
        .then((result)=>{
            alert(result)
            this.props.refreshlist();
        },
        (error)=>{
            alert(error);
        })
    }
    render(){
        return(

           <div>
               <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Remove form org
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Label>Account mail</Form.Label>
                                    <Form.Control type="text" name="emial" disabled placeholder="Event type Name" defaultValue={this.props.email}/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Remove from org
                                    </Button>
                                </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
           </div>
        )
    }
}