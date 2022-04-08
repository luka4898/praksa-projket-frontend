import React, { Component } from "react";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import { variables } from "../../Variables";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import CreatePost from './createpost';
import ReactPaginate from "react-paginate";

class Post extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.getRole = this.getRole.bind(this);
    this.state = {
      posts: [],
      users:[],
      addModalShow: false,
      isLoading: true,
      postNameFilter: "",
      postsWithoutFilter: [],
    };
  }

  FilterFn() {
    var postNameFilter = this.state.postNameFilter;

    var filteredData = this.state.postsWithoutFilter.filter(
        function (el) {
            return el.title.toString().toLowerCase().includes(postNameFilter.toString().trim().toLowerCase())
        
    });
    this.setState({
        posts: filteredData,
    });
  }
  fetchData = async () => {
    try {
      const [post1] = await Promise.all([
        fetch("https://localhost:7100/api/Posts/getallposts", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }),
      ]);
      const posts = await post1.json();
      this.setState({
        posts: posts,
        isLoading: false,
        postsWithoutFilter: posts,
      });
    } catch (err) {
      this.setState({ isLoading: false });
      throw err;
    }
  };

  getRole() {
    setTimeout(() => {
        fetch('https://localhost:7100/api/Authenticate/loggeduser', {
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'})
            .then(response => {
                if (!response.ok) {
                    throw Error('Could not fetch that resource!')
                }
                return response.json();
            })
            .then(data => {
                this.setState({ users: data});
            })

    }, 1000);}


  deletePost(postId) {
    if (window.confirm("Are you sure?")) {
      fetch(`https://localhost:7100/api/Posts/${postId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((result) => {
        alert(result);
        this.fetchData();
      });
    }
  }

  componentDidMount() {
    this.fetchData();
    this.getRole();
  }

  changePostsNameFilter = (e) => {
    this.state.postNameFilter = e.target.value;
    this.FilterFn();
  };


  render() {
    const { posts, isLoading, users } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false })
    return (
    <>
        {isLoading && <div className="container">Loading...</div>}
           {posts && <div className='container mt-4'>
           <div className="d-flex">
               <input className="form-control m-2"
                   onChange={this.changePostsNameFilter}
                   placeholder="Filter" />
           </div>
          {(users.role =="Admin" || users.role == "Organizer") &&<Button variant="primary m-2 "
                onClick={() => this.setState({ addModalShow: true })}
                      >
                        Create Post
                      </Button>}
                      <hr/>
                      <CreatePost
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                        refreshlist={this.fetchData}
                      />
           {posts.map((pos)=>(
           <div class="col-md-12 col-lg-12 p-1" key={pos.postId}>
        <article class="post vt-post" >
            <div class="row">
                <div class="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                    <div class="post-type post-img">
                    <Card.Img
                                variant="top"
                                className="card-img-top img-card-event"
                                src={variables.PHOTO_URL + pos.imagePath}
                              />
                    </div>
                    <div class="author-info author-info-2">
                        <ul class="list-inline">
                            <li>
                                <div class="info">
                                    <p>Posted on:</p>
                                    <strong>{dateFormat(pos.createdDate, "dd.mm.yyyy")}</strong></div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                    <div class="caption">
                        <h3 class="md-heading">{pos.title}</h3>
                        <p> {pos.content}</p>
                         </div>
                </div>
            </div>
        </article>
      {(users.role == "Admin" || users.role == "Organizer") &&<Button
                 className="auto"
                 variant="danger"
                 onClick={() => this.deletePost(pos.postId)}
               >Delete Post</Button>}
                        <hr/>
        </div>
        
        ))}
  
       </div> }
    </>           
    );
  }
}


export default Post;