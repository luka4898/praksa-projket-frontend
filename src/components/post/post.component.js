import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import { variables } from "../../Variables";
import dateFormat from "dateformat";
import CreatePost from "./createpost";
import ReactPaginate from "react-paginate";

class Post extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.getRole = this.getRole.bind(this);
    this.state = {
      offset: 0,
      tableData: [],
      perPage: 4,
      currentPage: 0,
      posts: [],
      users: [],
      addModalShow: false,
      isLoading: true,
      postNameFilter: "",
      postsWithoutFilter: [],
    };
    this.handlePageClick = this.handlePageClick.bind(this);
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
    const posts = this.state.posts;
    const slice = posts.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(posts.length / this.state.perPage),
      tableData: slice,
    });
  }

  FilterFn() {
    var postNameFilter = this.state.postNameFilter;

    var filteredData = this.state.postsWithoutFilter.filter(function (el) {
      return el.title
        .toString()
        .toLowerCase()
        .includes(postNameFilter.toString().trim().toLowerCase());
    });
    var slice = filteredData.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      posts: filteredData,
      pageCount: Math.ceil(filteredData.length / this.state.perPage),
      tableData: slice,
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
      var slice = posts.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      this.setState({
        pageCount: Math.ceil(posts.length / this.state.perPage),
        tableData: slice,
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
      fetch("https://localhost:7100/api/Authenticate/loggeduser", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not fetch that resource!");
          }
          return response.json();
        })
        .then((data) => {
          this.setState({ users: data });
        });
    }, 1000);
  }

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
    const { posts, isLoading, users, tableData } = this.state;
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <>
        {isLoading && <div className="container">Loading...</div>}
        {posts && (
          <div className="container mt-4">
            <h3 className="mb-5">Posts</h3>
            <div className="d-flex">
              <input
                className="form-control m-2"
                onChange={this.changePostsNameFilter}
                placeholder="Filter"
              />
            </div>
            {users.role == "Admin" && (
              <Button
                variant="primary m-2 "
                onClick={() => this.setState({ addModalShow: true })}
              >
                Create Post
              </Button>
            )}
            <hr />
            <CreatePost
              show={this.state.addModalShow}
              onHide={addModalClose}
              refreshlist={this.fetchData}
            />
            {tableData.length > 0 ? (
              tableData.map((pos) => (
                <div className="col-md-12 col-lg-12 p-1" key={pos.postId}>
                  <article className="post vt-post">
                    <div className="row">
                      <div className="col-xs-12 col-sm-5 col-md-5 col-lg-4">
                        <div className="post-type post-img">
                          <Card.Img
                            variant="top"
                            className="card-img-top img-card-event"
                            src={variables.PHOTO_URL + pos.imagePath}
                          />
                        </div>
                        <div className="author-info author-info-2">
                          <ul className="list-inline">
                            <li>
                              <div className="info">
                                <p>Posted on:</p>
                                <strong>
                                  {dateFormat(pos.createdDate, "dd.mm.yyyy")}
                                </strong>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-xs-12 col-sm-7 col-md-7 col-lg-8">
                        <div className="caption">
                          <h4 className="md-heading">{pos.title}</h4>
                          <p> {pos.content}</p>
                        </div>
                      </div>
                    </div>
                  </article>
                  {users.role == "Admin" && (
                    <Button
                      className="auto"
                      variant="danger"
                      onClick={() => this.deletePost(pos.postId)}
                    >
                      Delete Post
                    </Button>
                  )}
                  <hr />
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
        )}
      </>
    );
  }
}

export default Post;
