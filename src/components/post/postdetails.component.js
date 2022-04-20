import React, { Component } from 'react';
import { variables } from "../../Variables";
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";
class PostDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          post: null,
          other:null,
          isPending: true,
          postId: null,
        };
      }
      fetchData= async () => {
        try{
            const [post1, other1] = await Promise.all([
            fetch(
                `https://localhost:7100/api/Posts/${this.props.match.params.id}`,
                {
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                }
              ),
              fetch(
                `https://localhost:7100/api/Posts/getallposts?$top=3&$filter=postId ne ${this.props.match.params.id}&$orderby=createdDate asc`,
                {
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                }
              )])
              const post = await post1.json();
      const other = await other1.json();

      this.setState({
        post: post,
        other: other,
        isPending: false,
      });
    } catch (err) {
      this.setState({ isPending: false });
      throw err;
    }
              
    }

    componentDidMount() {
        this.fetchData();
    }
    render() { 
        const {post, isPending, other}=this.state;
        return (<div className="container pb50 mt-4">
        
                {isPending && <div className='container'>Loading...</div>}
        {post && 
            
        <div className="row" key={post.postId} >
            <div className="col-md-8 mb30 card">
                <article className='card-body'>
                    <img src={variables.PHOTO_URL + post.imagePath} alt="" height="450"className="card-img mb30"/>
                    <div className="post-content">
                        <h3 className='text-dark'>{post.title}</h3>
                        <ul className="post-meta list-inline">
                            <li className="list-inline-item">
                            <i className="bi bi-person-circle"></i>Admin
                            </li>
                            <li className="list-inline-item">
                            <i className="bi bi-calendar"></i> {dateFormat(post.createdDate, "dd.mm. yyyy.")}
                            </li>
                            
                        </ul>
                        <p>{post.content}</p>
                      
                        <hr className="mb40"/>
                       
                        <div
                        className="btn-group"
                        role="group"
                        aria-label="First group"
                      >
                        <button
                          onClick={this.props.history.goBack}
                          className="btn btn-secondary"
                        >
                          Go back
                        </button>
                      </div>
                    </div>
                </article>
                </div>
                <div className="col-md-3 mb30 card">
                <h5 className='text-dark m-3'>Other Posts</h5>
                {other && other.map((oth)=>(
                <div class="card-body">
                            <div class="row" key={oth.postId}>
                                <div class="col-lg-12">
                                    <div class="single_post">
                                    <Link
                     to={{
                       pathname: `/postdetails/${oth.postId}`,
                       
                     }}
                     
                     onClick={() =>
                       this.props.history.push(
                         `/postdetails/${oth.postId}`
                       )
                     }
                   >
                     <div class="img-post">
                                            <img src={variables.PHOTO_URL + oth.imagePath} alt="Awesome Image" />                                        
                                        </div>
                   </Link>
                                    
                                         <div className="media-body">
                                         {dateFormat(post.createdDate, "dd.mm. yyyy.")}
                        </div>
                                        <p class="mb-4"> {oth.content.split(",")[0]}...</p>
                                        
                                                                                  
                                    </div>
                                   
                                </div>
                            </div>
                        </div>))}
                <div>
                
                
            </div>
            </div>
                </div>}                </div>
    );
    }
}
 
export default PostDetails;