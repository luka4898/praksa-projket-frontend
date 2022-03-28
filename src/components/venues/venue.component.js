import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import AddVenue from './addvenue.component';
import EditVenue from './editvenue.component';


class Venue extends Component {

    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.state = {
            vens: null, addModalShow: false, editModalShow: false, isPending: true, error: null,
            venueName: "",
            venueNameFilter: "",
            venuesWithoutFilter: []
        };
    }

    FilterFn() {
        var venueNameFilter = this.state.venueNameFilter;

        var filteredData = this.state.venuesWithoutFilter.filter(
            function (el) {
                return el.venueName.toString().toLowerCase().includes(venueNameFilter.toString().trim().toLowerCase())
            }

        );
        this.setState({
            vens: filteredData
        });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.venuesWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            }
            else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });

        this.setState({ vens: sortedData });
    }

    refreshList() {
        setTimeout(() => {
            fetch('https://localhost:7100/api/Venues', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'})
                .then(response => {
                    if (!response.ok) {
                        throw Error('Could not fetch that resource!')
                    }
                    return response.json();
                })
                .then(data => {
                    this.setState({ vens: data, venuesWithoutFilter: data, isPending: false, error: null });
                })
                .catch(err => {
                    this.setState({ isPending: false, error: err.message });
                })

        }, 1000);
    }

    componentDidMount() {
        this.refreshList();
    }

    changeVenueNameFilter = (e) => {
        this.state.venueNameFilter = e.target.value;
        this.FilterFn();
    }


    deleteVen(venueId) {
        if (window.confirm('Are you sure?')) {
            fetch(`https://localhost:7100/api/Venues/${venueId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
                .then((result) => {
                    alert(result);
                    this.refreshList();

                })
        }

    }
    render() {
        const { vens, venueId, venueName, address,
            capacity, cityName, cityId, isPending, error } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <>
                {error && <div className='container'>{error}</div>}
                {isPending && <div className='container'>Loading...</div>}
                {vens && <div className='container mt-4'>
                    <div className="d-flex">
                        <input className="form-control m-2"
                            onChange={this.changeVenueNameFilter}
                            placeholder="Filter" />
                        <button type="button" className="btn btn-light"
                            onClick={() => this.sortResult('venueName', true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z" />
                            </svg>
                        </button>

                        <button type="button" className="btn btn-light"
                            onClick={() => this.sortResult('venueName', false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z" />
                            </svg>
                        </button>
                    </div>
                    <Table className="table table-striped" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>VenueId</th>
                                <th>Venue Name</th>
                                <th>Address</th>
                                <th>Capacity</th>
                                <th>Status</th>
                                <th>City Name</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vens.map((ven) =>
                                <tr key={ven.venueId}>
                                    <td>{ven.venueId}</td>
                                    <td>{ven.venueName}</td>
                                    <td>{ven.address}</td>
                                    <td>{ven.capacity}</td>
                                    <td>{ven.status + ''}</td>
                                    <td>{ven.city.cityName}</td>
                                    <td>
                                        <ButtonToolbar>

                                            <Button className='m-2' variant="info"
                                                onClick={() => this.setState({
                                                    editModalShow: true,
                                                    venueId: ven.venueId, venueName: ven.venueName, address: ven.address,
                                                    capacity: ven.capacity, cityName: ven.city.cityName, cityId: ven.cityId
                                                })}>
                                                Edit
                                            </Button>

                                            <Button className='m-2' variant="danger"
                                                onClick={() => this.deleteVen(ven.venueId)}>
                                                Delete
                                            </Button>

                                            <EditVenue show={this.state.editModalShow}
                                                refreshlist={this.refreshList}
                                                onHide={editModalClose}
                                                venueid={venueId}
                                                venuename={venueName}
                                                address={address}
                                                capacity={capacity}
                                                cityname={cityName}
                                                cityid={cityId}
                                            />
                                        </ButtonToolbar>
                                    </td>

                                </tr>)}
                        </tbody>

                    </Table>

                    <ButtonToolbar>
                        <Button variant='primary'
                            onClick={() => this.setState({ addModalShow: true })}>
                            Add Venue</Button>

                        <AddVenue show={this.state.addModalShow}
                            onHide={addModalClose}
                            refreshlist={this.refreshList} />
                    </ButtonToolbar>
                </div>}
            </>
        );
    }
}

export default Venue;