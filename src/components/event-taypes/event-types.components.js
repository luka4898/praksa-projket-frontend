import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";

import {AddEventType} from './add-event-type.component'
import {EditEventType} from './edit-event-type.component'
import Search from "../search/search.component";

export class eventTypes extends Component{
    
    constructor(props){
        super(props);
        this.state={eventTypes:[], addModalShow:false, editModalShow:false, searchField:"" }
    }
    
    refreshList(){
        fetch("https://localhost:7100/api/EventTypes")
        .then(res=>res.json())
        .then(data=>{
            this.setState({eventTypes:data})
        })
    }

    componentDidMount(){
        this.refreshList();
    }

   /* componentDidUpdate(){
        this.refreshList();
    }*/

    deleteCity(eventTypeId){
        if(window.confirm("Are you sure?")){
            fetch("https://localhost:7100/api/EventTypes/"+eventTypeId, {
                method:"DELETE",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                }
            })
        }
      
    }
    onSearchChange = e => {
        this.setState({ searchField: e.target.value });
      };
    render(){
        const {eventTypes, eventTypeId, eventTypeName}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow:false})

        return(
            <div className="container">
                <Search
                 placeholder={'search event type'}
                handleChange={this.onSearchChange}/>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventTypes.map(et=>
                        <tr  key={et.eventTypeId}  >
                            <td>{et.eventTypeId}</td>
                            <td>{et.eventTypeName}</td>
                            <td>
                                <ButtonToolbar >
                                    <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true,eventTypeId:et.eventTypeId, eventTypeName:et.eventTypeName})}>
                                        Edit
                                    </Button>
                                    <Button className="mr-2" variant="danger" onClick={()=>this.deleteCity(et.eventTypeId)}>
                                        Delete 
                                    </Button>
                                   <EditEventType show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    eventtypeid={eventTypeId}
                                    eventtypename={eventTypeName}/>
                                </ButtonToolbar>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table> 
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add  event type
                    </Button>
                    <AddEventType show={this.state.addModalShow} onHide={addModalClose}/>                </ButtonToolbar>
            </div>
        )
    }
}