
import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";

export class AddEventType extends Component{
    
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault()
        fetch("https://localhost:7100/api/EventTypes",{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                eventTypeName:e.target.eventType.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result)
        },
        (error)=>{
            alert("Failed")
        })
    }
    render(){
        return(

            <div className="container">
                <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add City
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="eventType">
                                    <Form.Label>Event type Name</Form.Label>
                                    <Form.Control type="text" name="eventType" required placeholder="Event type Name"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Add Event Type
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