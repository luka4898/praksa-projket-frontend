import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";
import {AddAcountOrg} from './addorg';
import {InfoAccount} from '../customer/infoaccount';


export class Org extends Component{
    
    constructor(props){
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.state={orgs:[], addModalShow:false, infoModalShow:false }
    }
    
    refreshList(){
        fetch("https://localhost:7100/api/Admin/listorganizers")
        .then(res=>res.json())
        .then(data=>{
            this.setState({orgs:data})
        })
    }

    componentDidMount(){
        this.refreshList();
    }

   /* componentDidUpdate(){
        this.refreshList();
    }*/

    render(){
        const {orgs, userName, email, address, phoneNumber}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let infoModalClose=()=>this.setState({infoModalShow:false})
        return(
            <div className="container">
                
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orgs.map(or=>
                        <tr  key={or.id}  >
                            <td>{or.firstName}</td>
                            <td>{or.lastName}</td>
                            <td>
                                <ButtonToolbar >
                                <Button className="m-2" variant="info" onClick={()=>this.setState({infoModalShow:true, address:or.address,phoneNumber:or.phoneNumber,userName:or.userName, email:or.email })}>
                                        Info 
                                    </Button>
                                    <Button className="m-2" variant="info" onClick={()=>this.setState({addModalShow:true, email:or.email })}>
                                        Remove from org 
                                    </Button>
                                    <InfoAccount show={this.state.infoModalShow}
                                    onHide={infoModalClose}
                                    email={email}
                                    username={userName}
                                    address={address}
                                    phonenumber={phoneNumber}
                                    />
                                    <AddAcountOrg show={this.state.addModalShow}
                                    onHide={addModalClose}
                                    email={email}
                                    refreshlist={this.refreshList}
                                    />
                                </ButtonToolbar>
                            </td>
                        </tr>
                        )}
                    </tbody>
                </Table> 
                 </div>
        )
    }
}