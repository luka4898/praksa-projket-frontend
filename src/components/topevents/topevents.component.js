import React, { Component } from 'react';
import {Card, Row, Col, Carousel} from 'react-bootstrap';
import dateFormat from 'dateformat';
import { variables } from '../../Variables';
import { Link } from "react-router-dom";

class TopEvents extends Component{
    constructor(props){
        super(props);
        this.getMostExp=this.getMostExp.bind(this);
        this.getMostSels=this.getMostSels(this);
        this.state={
            mostsels:[],
            mostexp:[],
        }
    }

    getMostExp(){
        fetch(`https://localhost:7100/api/CurrentEvents/getallcurrentevents?$filter=price gt 150`,{
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({mostexp:data})
        })
    }
    getMostSels(){
        fetch(`https://localhost:7100/api/CurrentEvents/getallcurrentevents?$filter=numberOfSeats lt 10`,{
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({mostsels:data})
        })
    }
    componentDidMount(){
        this.getMostExp();
        
    }
    render(){
        const {mostexp, mostsels}=this.state;
        return(
          <>
                
                    <Carousel  >
                    {mostexp.map(evn=>
                        <Carousel.Item key={evn.currentEventId}>
                            <Card.Img
                          
                            variant="top"
                            className="card-img-top img-card-event"
                            src={variables.PHOTO_URL + evn.imagePath}
                            />
                          <Carousel.Caption>
                            <h1 >Discover different events</h1>
                            <h2 >{evn.eventName}</h2>
                            <Link
                                  to={{
                                    pathname: `/eventdetails/${evn.currentEventId}`,
                                    state: { eventTypeId: evn.eventTypeId },
                                  }}
                                  className="btn btn-secondary"
                                >
                                  Read more →
                                </Link>
                          </Carousel.Caption>
                        </Carousel.Item>
                        )}
                    </Carousel>      
                    
                    
        </>
        )
    }
}

export default TopEvents;