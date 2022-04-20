import TopEvents from "../topevents/topevents.component";
import { withRouter } from "react-router-dom";
import MultipleCarousel from "./multiplecarousel.component";
import { useEffect, useState } from "react";
import Posts from "../post/posts.component";
const Home = (props) => {

  const [similarevn, setData] = useState(null);
  const [loading, setLoading]= useState(true);
  useEffect(() => {
    (async () => {
      let res = await  fetch(`https://localhost:7100/api/CurrentEvents/getallcurrentevents?$filter=numberOfSeats lt 10`,{
        credentials:'include'
    })
      let response = await res.json();
      setData(response);
      setLoading(false);
    })();
  }, []);

  return (
    <>
        {loading && <div>Loading</div>}
        {similarevn &&
        (<>
        <TopEvents/>
        <Posts history={props.history}/>
        <div className="container">
            <h3 className="m-4">Trends</h3>
         <MultipleCarousel similarevn={similarevn} history={props.history}/></div></>)}
        
       
          
    </>
  );
};

export default withRouter(Home);
