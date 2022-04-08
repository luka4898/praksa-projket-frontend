import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";
import {AddAcountOrg} from './addorg';
import {InfoAccount} from './infoaccount';
import Search from "../search/search.component";

export class Accounts extends Component{
    
    constructor(props){
        super(props); 
        this.refreshList = this.refreshList.bind(this);
        this.state={accounts:[], addModalShow:false, infoModalShow:false,
            firstName: "",
            accountNameFilter: "",
            accountWithoutFilter: [] };
    }
    
    FilterFn() {
        var accountNameFilter = this.state.accountNameFilter;

        var filteredData = this.state.accountWithoutFilter.filter(
            function (el) {
                return el.firstName.toString().toLowerCase().includes(accountNameFilter.toString().trim().toLowerCase())
            }

        );
        this.setState({ accounts: filteredData });
    }

    refreshList(){
        fetch("https://localhost:7100/api/Admin/listcustomers",{
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({accounts:data, accountWithoutFilter: data})
        })
    }
    changeAccountNameFilter = (e) => {
        this.state.accountNameFilter = e.target.value;
        this.FilterFn();
    }
    componentDidMount(){
        this.refreshList();
    }

   /* componentDidUpdate(){
        this.refreshList();
    }*/

    deleteAccount(accountid) {
        if (window.confirm("Are you sure?")) {
            fetch("https://localhost:7100/api/Authenticate/deleteaccount?id="+accountid ,{
            method:'DELETE',    
            credentials:'include',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    
                },
            })
                .then((result) => {
                    alert(result);
                    this.refreshList();

                })
        }
    }
    render(){
        const {accounts, userName, phoneNumber, address, email}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false})
        let infoModalClose=()=>this.setState({infoModalShow:false})

        return(
            <div className="container">
                <div className="d-flex">
                    <input className="form-control m-2"
                        onChange={this.changeAccountNameFilter}
                        placeholder="Filter" />
                </div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(ac=>
                        <tr  key={ac.id}  >
                            <td>{ac.firstName}</td>
                            <td>{ac.lastName}</td>
                           
                            <td>
                                <ButtonToolbar >
                                <Button className="m-2" variant="info" onClick={()=>this.setState({infoModalShow:true, email:ac.email, phoneNumber:ac.phoneNumber, userName:ac.userName, address:ac.address,  })}>
                                        Info
                                    </Button>
                                    <Button className="m-2" variant="info" onClick={()=>this.setState({addModalShow:true, email:ac.email })}>
                                        Add to org 
                                    </Button>
                                    <Button className="m-2" variant="danger" onClick={()=>this.deleteAccount(ac.id)}>
                                        Delete
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