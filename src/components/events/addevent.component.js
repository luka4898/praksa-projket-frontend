import React, { Component } from 'react';
import {Modal,Button, Row, Col, Form, Image} from 'react-bootstrap';
import axios from "axios";

class AddEvent extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            selectedOption: '',
            clearable: true,
            eventtypes: [],
            venues:[]
        } 
    }

    componentDidMount() {
       
        fetch('https://localhost:7100/api/EventTypes')
        .then(response=>response.json())
            .then(data => {
                this.setState({
                    eventtypes: data
                })
                
            })
        
        fetch('https://localhost:7100/api/Venues')
        .then(response=>response.json())
            .then(data => {
                this.setState({
                    venues: data
                })
                
            })
    }

    handleSubmit(event){
        event.preventDefault();
        const formData = new FormData(event)
        axios("https://localhost:7100/api/CurrentEvents/createevent", formData, {
            method: "POST",
            header: { "Context-type": "multipart/form-data" },
            data: {
                eventName:event.target.eventName.value,
                content:event.target.content.value,
                price:event.target.price.value,
                numberOfSeats:event.target.numberOfSeats.value,
                eventImage:event.target.eventImage.value,
                begin:event.target.begin.value,
                end:event.target.end.value,
                eventTypeId:event.target.eventTypesId.values,
                venueId:event.target.venueId.value
               
            }
        })
        .then((result)=>{
            alert(result)
            this.props.refreshlist();
        },
        (error)=>{
            alert(error);
        })}

        
    
    render() { 
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Event
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="eventName">
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control name="eventName" required 
                        placeholder="Event Name"/>
                    </Form.Group>

                    <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control name="content" required 
                        placeholder="Content"/>
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" name="price" required 
                        placeholder="Price"/>
                    </Form.Group>

                    <Form.Group controlId="numberOfSeats">
                        <Form.Label>Number Of Seats</Form.Label>
                        <Form.Control type="number" name="numberOfSeats" required 
                        placeholder="Number Of Seats"/>
                    </Form.Group>

                    <Form.Group controlId="begin">
                        <Form.Label>Begin</Form.Label>
                        <Form.Control type="date" name="begin" required 
                        placeholder="Begin"/>
                    </Form.Group>

                    <Form.Group controlId="end">
                        <Form.Label>End</Form.Label>
                        <Form.Control type="date" name="end" required 
                        placeholder="End"/>
                    </Form.Group>

                    <Form.Group controlId="eventImage">
                        <Form.Label>Image Path</Form.Label>
                        <Form.Control type="File" name="eventImage" required 
                        placeholder="event image"/>
                    </Form.Group>

                    <Form.Group controlId="eventTypesId">
                        <Form.Label>Event type</Form.Label>
                        <Form.Control as="select"  defaultValue="">
                        {this.state.eventtypes.map(et=>
                            <option key={et.eventTypeId} value={et.eventTypeName}>{et.eventTypeName}</option>)}
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="venueId">
                        <Form.Label>Venue</Form.Label>
                        <Form.Control as="select"  defaultValue="">
                        {this.state.venues.map(v=>
                            <option key={v.venueId} value={v.venueName}>{v.venueName}</option>)}
                        </Form.Control>
                    </Form.Group>


                    <Form.Group>
                        <Button className='mt-4'variant="primary" type="submit">
                            Add Event
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
        );
    }
}
 
export default AddEvent;