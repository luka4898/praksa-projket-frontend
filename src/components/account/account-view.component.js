import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";
import { AccountEdit } from "./edit-account";
import {ChangePassword} from './changepassword';
import { InfoAccount } from "../customer/infoaccount";

export class AccountView extends Component{
    
    constructor(props){
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.state={
           account:[], editModalShow: false, chnageModalShow:false, infoModalShow:false
         }
    }
    
    refreshList(){
        fetch("https://localhost:7100/api/Authenticate/editaccount",{
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({account:data})
        })
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
        const {account, id, username, firstname,lastname, email, address, phoneNumber}=this.state;
        let editModalClose = () => this.setState({ editModalShow: false })
        let chnageModalClose =()=>this.setState({chnageModalShow:false})
        let infoModalClose =()=>this.setState({infoModalShow:false})
        return(
            <div className="container">
                 <div class="bg-c-green counter-block m-t-10 p-20">
                        <div class="row">
                        <div class="col-auto">
                            <Button className="m-2" variant="info" onClick={() => this.setState({ infoModalShow: true, id: account.id, username: account.userName, firstname: account.firstName, lastname:account.lastName, email: account.email, address: account.address, phoneNumber: account.phoneNumber,  })}>
                                            Info
                     </Button>
                            </div>
                            <div class="col-auto">
                            <Button className="m-2" variant="info" onClick={() => this.setState({ editModalShow: true, id: account.id, username: account.userName, firstname: account.firstName, lastname:account.lastName, email: account.email, address: account.address, phoneNumber: account.phoneNumber,  })}>
                                            Edit
                     </Button>
                            </div>
                            <div class="col-auto">
                            <Button className="m-2" variant="info" onClick={() => this.setState({ chnageModalShow: true, id: account.id, username: account.userName })}>
                                            Change password
                     </Button>
                            </div>
                            <div class="col-auto">
                            <Button className="m-2" variant="danger" onClick={() => this.deleteAccount(account.id) }>
                                            Delete
                     </Button>
                            </div>
                        </div>
                    </div>
                <Table className="mt-4" striped bordered hover size="sm">
    
                            
                       <td>
                       <InfoAccount
                     refreshlist={this.refreshList}
                     show={this.state.infoModalShow}
                     onHide={infoModalClose}
                     id={id}
                     username={username} 
                     firstname={firstname}
                     lastname={lastname}
                     email={email}
                     address={address}
                     phonenumber={phoneNumber}
                    />
                    <AccountEdit
                     refreshlist={this.refreshList}
                     show={this.state.editModalShow}
                     onHide={editModalClose}
                     id={id}
                     username={username} 
                     firstname={firstname}
                     lastname={lastname}
                     email={email}
                     address={address}
                     phonenumber={phoneNumber}
                    />
                    <ChangePassword
                    refreshlist={this.refreshList}
                    username={username}
                    show={this.state.chnageModalShow}
                    onHide={chnageModalClose}
                    />
                    </td>
                </Table> 
                
                
    </div>
    
                 
        )
    }
}