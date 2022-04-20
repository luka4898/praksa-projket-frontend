import React, { Component } from 'react';
import { variables } from "../../Variables";
import { Link } from 'react-router-dom';
class Posts extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      posts: [],
      isLoading: true,
     
    };
    
  }
  
    fetchData = async () => {
      try {
        const post1 = await 
          fetch("https://localhost:7100/api/Posts/getallposts?$top=4&$orderby=createdDate desc", {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          })
       
        const posts = await post1.json();
       
        this.setState({
         
          posts: posts,
          isLoading: false,
         
        });
      } catch (err) {
        this.setState({ isLoading: false });
        throw err;
      }
    };
    componentDidMount() {
      this.fetchData();
    }
    render() { 
      const {posts, isLoading}=this.state;
        return (
        
        <section className="home-blog bg-sand">
        
        <div className="container">
          
            <div className="row justify-content-md-center">
                <div className="col-xl-5 col-lg-6 col-md-8">
                    <div className="section-title text-center title-ex1">
                        <h2>Latest Posts</h2>
                       </div>
                </div>
            </div>
           
            <div className="row ">
            {isLoading && <div className="container">Loading...</div>}
        {posts && posts.map((pos)=>(
                <div className="col-md-6" key={pos.postId}>
                    <div className="media blog-media">
                    <Link
                     to={{
                       pathname: `/postdetails/${pos.postId}`,
                       
                     }}
                     
                     onClick={() =>
                       this.props.history.push(
                         `/postdetails/${pos.postId}`
                       )
                     }
                   >
                     <img className="d-flex img-post" src={variables.PHOTO_URL + pos.imagePath} alt="Generic placeholder image"/>
                   </Link>
                      
                      
                      <div className="media-body">
                      
                        <h5 className="mt-0">{pos.title}</h5>
                        {pos.content.split(".")[0]}.
                        <Link
                     to={{
                       pathname: `/postdetails/${pos.postId}`,
                       
                     }}
                     className="post-link"
                     onClick={() =>
                       this.props.history.push(
                         `/postdetails/${pos.postId}`
                       )
                     }
                   >
                     Read More
                   </Link>
                        <ul>
                            <li>by: Admin</li>
                            
                        </ul>
                      </div>
                    </div>
                </div>))}
            </div>
        </div>
    </section>);
    }
}
 
export default Posts;