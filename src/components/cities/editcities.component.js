
import { Button } from "react-bootstrap";
import { Modal, Row, Col, Form } from "react-bootstrap";
import React, { Component } from "react";

export class EditCities extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault()
        fetch("https://localhost:7100/api/Cities/"+e.target.cityId.value,{
            method:"PUT",
            headers:{
                "Acept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                cityId:e.target.cityId.value,
                cityName:e.target.cityName.value,
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
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit City
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="cityId">
                                    <Form.Label>City Id</Form.Label>
                                    <Form.Control type="text" name="cityId" disabled  defaultValue={this.props.citiid} placeholder="City Id"/>
                                </Form.Group>
                                <Form.Group controlId="cityName">
                                    <Form.Label>City Name</Form.Label>
                                    <Form.Control type="text" name="cityName" required  defaultValue={this.props.citiname} placeholder="City Name"/>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary" type="submit">
                                        Update City
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