import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import axios from "axios";
class Payment extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
       this.state={
         quantity:this.props.quantity,
         eventid:this.props.eventid,
       }
       
    }
    handleSubmit(event) {
      event.preventDefault();
     let fd=new FormData();
     var month=event.target.date.value.split('/')[0];
     var year=event.target.date.value.split('/')[1];
     fd.append("cardNumber", event.target.cardnumber.value);
     fd.append("month",month);
     fd.append("year","20"+year);
     fd.append("cvc",event.target.cvc.value);
     axios
      .post(`https://localhost:7100/api/CurrentEvents/pay?eventId=${this.state.eventid}&quantity=${this.state.quantity}`, fd, {
        withCredentials: true,
      })

      .then((response) => {
        alert("Payment successful");
        event.target.reset();
        this.props.fetchdata();
        return response.data;
      })
      .catch((error) => {
        alert(error);
      });
    }
      
    render() { 
      const { fetchdata, ...rest } = this.props;
        return (<div className="container mt-4 ">  <Modal
            {...rest}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            
          >
            <Modal.Header closeButton  >
              <Modal.Title id="contained-modal-title-vcenter">Payment</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.handleSubmit}>
            <Modal.Body  style={{ background: '#eee' }}>
            <div className="row justify-content-center">
        
        <div className="col-lg-9">
        <div className="accordion" >
         
          <div className="accordion-item mb-3">
            <h2 className="h5 px-4 py-3 accordion-header d-flex justify-content-between align-items-center">
              <div className="form-check w-100 collapsed">
               
                <label className="form-check-label pt-1" >
                <i className="bi bi-credit-card-2-front"></i>  Credit Card 
                </label>
              </div>
              
            </h2>
            <div className="accordion-collapse collapse show" data-bs-parent="#accordionPayment" >
              <div className="accordion-body">
                <div className="mb-3">
                  <label className="form-label">Card Number</label>
                  <input type="text" maxLength="20" name="cardnumber" className="form-control" placeholder="" required />
                </div>
                <div className="row">
               
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">Expiry date</label>
                      <input type="text" name="date" className="form-control" placeholder="MM/YY" required/>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-3">
                      <label className="form-label">CVC Code</label>
                      <input type="password" maxLength="4" name="cvc" className="form-control" required/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
     
      <div className="col-lg-3">
        <div className="card position-sticky top-0">
          <div className="p-3 bg-light bg-opacity-10">
            <h6><strong className="text-dark">Order Summary</strong></h6>
            <div className="d-flex justify-content-between mb-1 small">
              <b>Subtotal</b> <strong className="text-dark">{this.props.price} $</strong>
            </div>
            <div className="d-flex justify-content-between mb-1 small">
              <b>Quantity</b> <strong className="text-dark">{this.props.quantity}</strong>
            </div>
            <hr/>
            <div className="d-flex justify-content-between mb-4 small">
              <b>TOTAL</b> <strong className="text-dark">{(+this.props.price) * (+this.props.quantity)} $</strong>
            </div>
            <div>
             
              <p>
                For every order you get valid QR code on your email. If issue occurs you can send email to admin.
              </p>
            </div>
        
            <button className="btn btn-primary w-100 mt-2" type="submit">Place order</button>
          </div>
        </div>
        </div>
        </div>
              </Modal.Body>
              </form>
              <Modal.Footer  style={{ background: '#eee' }}>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
          </Modal></div>);
    }
}
 
export default Payment;