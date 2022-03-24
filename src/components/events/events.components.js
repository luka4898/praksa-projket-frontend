import React, { Component } from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import AddEvent from './addevent.component';


class Event extends Component {

    constructor(props){
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.state={events:[], addModalShow:false, editModalShow:false, 
        eventName:"",
        eventNameFilter:"",
        eventWithoutFilter:[]};
    }

    FilterFn(){
       var eventNameFilter=this.state.eventNameFilter;

       var filteredData=this.state.eventWithoutFilter.filter(
        function(el){
            return el.eventName.toString().toLowerCase().includes(eventNameFilter.toString().trim().toLowerCase())
        } 
        
    );
    this.setState({events:filteredData});
}

sortResult(prop,asc){
    var sortedData=this.state.eventWithoutFilter.sort(function(a,b){
        if(asc){
            return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
        }
        else{
            return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
        }
    });

    this.setState({events:sortedData});
}

    refreshList(){
        fetch('https://localhost:7100/api/CurrentEvents/getallcurrentevents')
        .then(response=>response.json())
        .then(data=>{
            this.setState({events: data, eventsWithoutFilter:data});
            
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeEventsNameFilter =(e)=>{
        this.state.eventNameFilter=e.target.value;
        this.FilterFn();
    }

  /*componentDidUpdate(){
        this.refreshList();
    }*/

    deleteVen(eventId){
        if(window.confirm('Are you sure?')){
            fetch(`https://localhost:7100/api/CurrentEvents/${eventId}`,{
                method:'DELETE',
                headers:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
            .then((result)=>{
                alert(result);
                this.refreshList();
            
            })}
        
    }
    render() { 
        const {events, currenteventId, eventName, begin, numberofSeats, eventImage,
            end,content, eventTypeName, imagePath, price, evnentTypeId, venueName, venueId} = this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return (
            <div className='container mt-4'>
                 <div className="d-flex">
                        <input className="form-control m-2"
                        onChange={this.changeEventNameFilter}
                        placeholder="Filter"/>
                        <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('eventName',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>

            <button type="button" className="btn btn-light"
            onClick={()=>this.sortResult('eventName',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
                          </div>
                <Table className="table table-striped" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Event Id</th>
                        <th>Event Name</th>
                        <th>Begin</th>
                        <th>End</th>
                        <th>Price</th>
                        <th>Number of seats</th>
                        <th>Event Image</th>
                        <th>Content</th>
                        <th>Event Type</th>
                        <th>Venue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(evn=>
                            <tr key ={evn.currentEventId}>
                                <td>{evn.currentEventId}</td>
                                <td>{evn.eventName}</td>
                                <td>{evn.begin}</td>
                                <td>{evn.end}</td>
                                <td>{evn.price}</td>
                                <td>{evn.numberOfSeats}</td>
                                <td>{evn.imagePath}</td>
                                <td>{evn.content}</td>
                                <td>{evn.eventType.eventTypeName}</td>
                                <td>{evn.venue.venueName}</td>
                                <td>
                                <ButtonToolbar>
                                    
        
        <Button className='m-2' variant="danger"
    onClick={()=>this.deleteVen(evn.currentEventId)}>
            Delete
        </Button>

</ButtonToolbar>
                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Event</Button>

                    <AddEvent show={this.state.addModalShow}
                    onHide={addModalClose}
                    refreshlist={this.refreshList}/>
                </ButtonToolbar>
            </div>
        );
    }
}
 
export default Event;