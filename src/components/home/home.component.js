import { useEffect, useState } from "react";
import Search from "../search/search.component";
const Home = () => {
  /*const [name, setName]=useState("");
  useEffect(()=>{
    (
      async ()=>{
        const res=await fetch('https://localhost:7100/api/Authenticate/login', {
          headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",},
          credentials:"include"
        });
        const content = await res.json();

        setName(content.name);
      }
    )();
  });*/
  return (
    <>
      <div className="container">
        
        <h3>This is a home page</h3>
        
      </div>
    </>
  );
};

export default Home;
