import React, { Component } from "react";
import { Card } from "react-bootstrap";
import dateFormat from "dateformat";
import { variables } from "../../Variables";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getTicket = this.getTicket.bind(this);
    this.state = {
      offset: 0,
      tableData: [],
      perPage: 4,
      currentPage: 0,
      tickets: [],
    };
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };
  loadMoreData() {
    const tickets = this.state.tickets;
    const slice = tickets.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(tickets.length / this.state.perPage),
      tableData: slice,
    });
  }
  getTicket = async () => {
    try {
      const [post1] = await Promise.all([
        fetch("https://localhost:7100/api/Ticket/getusersticket", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
      ]);
      const tickets = await post1.json();
      var slice = tickets.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(tickets.length / this.state.perPage),
        tableData: slice,
        tickets: tickets,
      });
    } catch (err) {
      this.setState({ isLoading: false });
      throw err;
    }
  };
  /*getTicket(){
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
};*/
  componentDidMount() {
    this.getTicket();
  }
  getRefound(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((response) => {
      if (response.isConfirmed) {
        fetch(`https://localhost:7100/api/CurrentEvents/refund?id=${id}`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response) => {
          let success = response.ok;
          response
            .json()
            .then((response) => {
              if (!success) {
                throw Error(response.message);
              }
              Swal.fire("Success!", response.message, "success");
              this.getTicket();
            })
            .catch((error) => {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: error,
                button: "OK!",
              });
            });
        });
      }
    });
  }

  render() {
    const { tickets, tableData } = this.state;
    return (
      <div className="container mt-4 ">
        <div className="content-panel min-vh-100">
          <h3 className="mb-5">My tickets</h3>
          {tableData.length > 0 ? (
            tableData.map((tic) => (
              <div className="row" key={tic.ticketId}>
                <article className="card-cust fl-left">
                  <section className="date">
                    <Card.Img
                      className="card-body card-title img-card-event"
                      src={variables.PHOTO_URL + tic.qrPath}
                    />
                    {console.log(variables.PHOTO_URL + tic.qrPath)}
                  </section>
                  <section className="card-cont">
                  {tic.currentEvent ? <h3>{tic.currentEvent["eventName"]}</h3> : <h3> Event</h3>}
                    <div className="even-date">
                      <i className="fa fa-calendar"></i>
                      <time>
                        <span>{dateFormat(tic.start, "dd. mm. yyyy.")}</span>
                        <span>{dateFormat(tic.start, "")}</span>
                      </time>
                    </div>
                    <div className="even-info">
                      <i className="bi bi-geo-alt-fill"></i>
                      <p>
                        What you need, is an Event, to remember for a lifetime
                      </p>
                    </div>
                    {tic.valid ? (
                      <>
                        <a className="valid">{tic.chargeId}</a>
                        <button
                          type="button"
                          className="btn-secondary dugme"
                          onClick={() => this.getRefound(tic.chargeId)}
                        >
                          Refund
                        </button>
                      </>
                    ) : (
                      <a className="novalid">{tic.chargeId}</a>
                    )}
                  </section>
                </article>
              </div>
            ))
          ) : (
            <div>No results</div>
          )}
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            initialPage={0}
          />
        </div>
      </div>
    );
  }
}
export default Ticket;
