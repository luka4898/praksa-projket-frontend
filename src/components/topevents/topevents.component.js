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
            <div className='container p-5'>
                <h3>Most expensiv events</h3>
                    <Carousel>
                    {mostexp.map(evn=>
                        <Carousel.Item>
                            <Card.Img
                            variant="top"
                            className="card-img-top img-card-event"
                            src={variables.PHOTO_URL + evn.imagePath}
                            />
                          <Carousel.Caption>
                            <h3 className='text-dark'>{evn.eventName}</h3>
                            <Link
                          to={{
                            pathname: `/eventdetails/${evn.currentEventId}`,
                            state: {
                              prevPath: window.location.pathname,
                            },
                          }}
                          className="btn btn-secondary"
                        >
                          Read more →
                        </Link>
                          </Carousel.Caption>
                        </Carousel.Item>
                        )}
                    </Carousel>      
                    <h3>Most expensiv events</h3>
                    <Carousel>
                    {mostsels.map(evn=>
                        <Carousel.Item>
                            <Card.Img
                            variant="top"
                            className="card-img-top img-card-event"
                            src={variables.PHOTO_URL + evn.imagePath}
                            />
                          <Carousel.Caption>
                            <h3 className='text-dark'>{evn.eventName}</h3>
                            <Link
                          to={{
                            pathname: `/eventdetails/${evn.currentEventId}`,
                            state: {
                              prevPath: window.location.pathname,
                            },
                          }}
                          className="btn btn-secondary"
                        >
                          Read more →
                        </Link>
                          </Carousel.Caption>
                        </Carousel.Item>
                        )}
                    </Carousel> 
            </div>
        )
    }
}

export default TopEvents;