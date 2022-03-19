import React, { Component } from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';
import axios from "axios";

class AddVenue extends Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state = {
            selectedOption: '',
            clearable: true,
            cities: [],
        } 
    }

    componentDidMount() {
       
        fetch('https://localhost:7100/api/Cities')
        .then(response=>response.json())
            .then(data => {
                this.setState({
                    cities: data
                })
                
            })
    }

    handleSubmit(event){
        event.preventDefault();
        axios("https://localhost:7100/api/Venues", {
            method: "POST",
            header: { "Context-type": "application/json" },
            data: {
               
                venueName:event.target.venueName.value,
                address:event.target.address.value,
                capacity:event.target.capacity.value,
                cityId:event.target.cityName.value,
               
            }
        })
        .then((result)=>{
            alert(result)
            this.props.refreshlist();
        },
        (error)=>{
            alert(error);
        })
     
        
    }
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
            Add Venue
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={8}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="venueName">
                        <Form.Label>Venue Name</Form.Label>
                        <Form.Control type="text" name="venueName" required 
                        placeholder="Venue Name"/>
                    </Form.Group>

                    <Form.Group controlId="cityName">
                        <Form.Label>City Name</Form.Label>
                        <Form.Control as="select"  defaultValue="">
                        {this.state.cities.map(c=>
                            <option key={c.cityId} value={c.cityId}>{c.cityName}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control 
                        type="text"
                        name="address"
                        required
                        placeholder="Address"
                        />
                        
                    </Form.Group>

                    <Form.Group controlId="capacity">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control 
                        type="number"
                        name="capacity"
                        required
                        placeholder="Capacity"
                        />
                        </Form.Group>

                    <Form.Group>
                        <Button className='mt-4'variant="primary" type="submit">
                            Add Venue
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
 
export default AddVenue;