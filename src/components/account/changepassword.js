import React, { useState } from "react";
import { Component } from "react";
import { Button, ButtonToolbar, Table } from "react-bootstrap";

import { Modal, Row, Col, Form } from "react-bootstrap";


export class ChangePassword extends Component{
    
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
   
    handleSubmit(e){
        e.preventDefault()
        fetch("https://localhost:7100/api/Authenticate/changepassword",{
            method:"POST",
            headers:{
                "Acept":"application/json",
                "Content-Type":"application/json",
                
            },
            credentials: 'include',
            body:JSON.stringify({
                username:e.target.username.value,
                currentPassword:e.target.currentPassword.value,
                newPassword:e.target.newPassword.value,
                confirmNewPassword:e.target.confirmNewPassword.value,
            })
        })
        .then((result)=>{
            alert(result)
            this.props.refreshlist();
        },
        (Error)=>{
            alert(Error);
        })
    }
   
   

   /* componentDidUpdate(){
        this.refreshList();
    }*/

    render(){
        return(
        <div className="container">
        <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                   Change password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="username">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" name="username" disabled  defaultValue={this.props.username} placeholder="User name"/>
                        </Form.Group>
                        <Form.Group controlId="currentPassword">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" name="currentPassword" required placeholder="Current password"/>
                        </Form.Group>
                        <Form.Group controlId="newPassword">
                            <Form.Label>New password</Form.Label>
                            <Form.Control type="password" name="newPassword" required placeholder="New password"/>
                        </Form.Group>
                        <Form.Group controlId="confirmNewPassword">
                            <Form.Label>Confirm new password</Form.Label>
                            <Form.Control type="password" name="confirmNewPassword" required placeholder="Confirme new password"/>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Change Password
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
        )}}