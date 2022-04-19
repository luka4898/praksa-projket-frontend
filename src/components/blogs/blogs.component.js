import React, { Component } from 'react';
import { variables } from "../../Variables";
class Blogs extends Component {
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
                      <a href="blog-post-left-sidebar.html"><img className="d-flex" src={variables.PHOTO_URL + pos.imagePath} alt="Generic placeholder image"/></a>
                      <div className="circle">
                            <h5 className="day">04</h5>
                            <span className="month">sep</span>
                        </div>
                      <div className="media-body">
                        <a href=""><h5 className="mt-0">{pos.title}</h5></a>
                        {pos.content.split(".")[0]}.
                        <a href="blog-post-left-sidebar.html" className="post-link">Read More</a>
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
 
export default Blogs;