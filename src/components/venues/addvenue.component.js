import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

class AddVenue extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            selectedOption: '',
            clearable: true,
            cities: [],
        }
    }

    componentDidMount() {

        fetch('https://localhost:7100/api/Cities', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'})
            .then(response => response.json())
            .then(data => {
                this.setState({
                    cities: data
                })

            })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        fetch("https://localhost:7100/api/Venues",{
            method:"POST",
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                
            },
            credentials: 'include',
            body:JSON.stringify({

                venueName: event.target.venueName.value,
                address: event.target.address.value,
                capacity: event.target.capacity.value,
                cityId: event.target.cityName.value,

            })
        })
            .then((res) => {
                alert(res.data);
                event.target.reset();
                this.props.refreshlist();
            },
                (error) => {
                    alert(error);
                })


    }
    render() {
        const { refreshlist, ...rest } = this.props;
        return (
            <div className="container">

                <Modal
                    {...rest}
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
                                            placeholder="Venue Name" />
                                    </Form.Group>

                                    <Form.Group controlId="cityName">
                                        <Form.Label>City Name</Form.Label>
                                        <Form.Control as="select" defaultValue="">
                                            <option value="" disabled>--Select city name--</option>
                                            {this.state.cities.map(c =>
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
                                        <Button className='mt-4' variant="primary" type="submit">
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