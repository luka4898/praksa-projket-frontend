import React, { Component } from 'react';
import './ticket.css';
import {Card} from 'react-bootstrap';
import dateFormat from 'dateformat';
import { variables } from "../../Variables";
class Ticket extends Component{

constructor(props){
    super(props);
    this.getTicket=this.getTicket.bind(this);
    this.state={
        tickets:[]
    }
}

getTicket(){
    fetch('https://localhost:7100/api/Ticket/getusersticket',{
        credentials:'include',
        headers:{
            'Accept':'application/json',
            'content-type': 'application/json'
        }
    })
   .then(res=>res.json())
    .then(data=>{
       this.setState({tickets:data})
    })
}
getKod(ticketId){
    fetch(`https://localhost:7100/api/Ticket/getticketqrcode?id=${ticketId}`,{
        credentials:'include',
        headers:{
            'Accept':'applciation/json',
           
        }
    })

}

componentDidMount(){
    this.getTicket();
}

render(){
    const{tickets}=this.state;
    return(
        <div className='container'>
            <h3>My tickets</h3>
            {tickets.map(tic=>
                  <div class="row" key={tic.ticketId}>
                      
                    <article class="card fl-left">
                      <section class="date">
                        
                       {this.getKod(tic.ticketId)}
                       
                       <Card.Img
                                variant="top"
                                className="card-body card-title img-card-event"
                                src={variables.PHOTO_URL + tic.qrPath}
                              />
                    
                      </section>
                      <section class="card-cont">
                        <h3>Event manager</h3>
                        <div class="even-date">
                         <i class="fa fa-calendar"></i>
                         <time>
                           <span>{dateFormat(tic.start, "dd. mm. yyyy.")}</span>
                           <span>{dateFormat(tic.start, "")}</span>
                        
                         </time>
                        </div>
                        <div class="even-info">
                          <i class="fa fa-map-marker"></i>
                          <p>
                          What you need, is an Event, to remember for a lifetime                          </p>
                        </div>
                        {tic.valid ? <a className='valid'>{tic.chargeId}</a> : <a className='novalid'>{tic.chargeId}</a>}
                        
                      </section>
                    </article>
                    </div>)}
                        
            
        </div>
    )

}
}
export default Ticket;