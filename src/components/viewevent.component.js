import React, { Component } from "react";
import { Modal} from "react-bootstrap";
import { variables } from "../Variables";
import dateFormat from "dateformat";
class ViewEvent extends Component {


  render() {
    const { refreshlist, ...rest } = this.props;
    return (
      <div className="container">
        <Modal
          {...rest}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container mt-4 ">
              <div className="row justify-content-center">
                <div className="col-md-5">
                  <div className="project-info-box  mb-2">
                    <h5>{this.props.eventname}</h5>
                    <p className="mb-0 mt-4">{this.props.content}</p>
                  </div>

                  <div className="project-info-box">
                    <p>
                      <b>Organizer: </b>
                      {this.props.organizersname}
                    </p>
                    <p>
                      <b>Date: </b>
                      {dateFormat(this.props.begin, "dd.mm.yyyy") +
                        " - " +
                        dateFormat(this.props.end, "dd.mm.yyyy")}
                     
                    </p>
                    <p>
                        <b>Start time: </b>
                        {dateFormat(this.props.begin, "HH:MM")}
                        <b> | End time: </b>
                        {dateFormat(this.props.end, "HH:MM")}
                    </p>

                    <p className="mb-0">
                      <b>Price: </b>
                      {this.props.price + " KM"}
                    </p>
                  </div>
                </div>

                <div className="col-md-5">
                  <img
                    src={variables.PHOTO_URL + this.props.imagepath}
                    alt=" "
                    className="rounded img-card-event"
                  />
                  <div className="project-info-box">
                    <p>
                      <b>Place: </b>
                      {this.props.venuename}
                    </p>
                    <p>
                      <b>Capacity: </b>
                      {this.props.capacity}
                    </p>
                    <p>
                      <b>Event Type: </b>
                      {this.props.eventtypename}
                    </p>
                  </div>
                </div>
              </div>
            </div>
       
            
            </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ViewEvent;
