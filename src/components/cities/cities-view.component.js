import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";

import { AddCities } from "./addcities.comonent";
import { EditCities } from "./editcities.component";

import Search from "../search/search.component";

export class Cities extends Component{
    
    constructor(props){
        super(props);
        this.state={cities:[], addModalShow:false, editModalShow:false, searchField:"" }
    }

    refreshList(){
        fetch("https://localhost:7100/api/Cities")
        .then(res=>res.json())
        .then(data=>{
            this.setState({cities:data})
        })
    }

    componentDidMount(){
        this.refreshList();
    }

   /* componentDidUpdate(){
        this.refreshList();
    }*/

    deleteCity(citiid){
        if(window.confirm("Are you sure?")){
            fetch("https://localhost:7100/api/Cities/"+citiid, {
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
        const {cities, citiid, citiname, searchField}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let editModalClose=()=>this.setState({editModalShow:false})
        const filteredCities = cities.filter(citi =>
            citi.cityName.toLowerCase().includes(searchField.toLowerCase())
          );

        return(
            <div className="container">
                <Search
                 placeholder={'search city'}
                handleChange={this.onSearchChange}/>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody filter={()=>filteredCities}>
                        {cities.map(citi=>
                        <tr  key={citi.cityId} cities={cities} >
                            <td>{citi.cityId}</td>
                            <td>{citi.cityName}</td>
                            <td>
                                <ButtonToolbar >
                                    <Button className="mr-2" variant="info" onClick={()=>this.setState({editModalShow:true, citiid:citi.cityId, citiname:citi.cityName})}>
                                        Edit
                                    </Button>
                                    <Button className="mr-2" variant="danger" onClick={()=>this.deleteCity(citi.cityId)}>
                                        Delete 
                                    </Button>
                                    <EditCities show={this.state.editModalShow}
                                    onHide={editModalClose}
                                    citiid={citiid}
                                    citiname={citiname}/>
                                </ButtonToolbar>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table> 
                <ButtonToolbar>
                    <Button variant="primary"
                    onClick={()=>this.setState({addModalShow:true})}>
                        Add city
                    </Button>
                    <AddCities show={this.state.addModalShow} onHide={addModalClose}/>                </ButtonToolbar>
            </div>
        )
    }
}