import "./App.css";
import Header from "./components/header/header.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home.component";
import LogIn from "./components/login/login.component";
import Registrate from "./components/registrate/registarte.component";
import { Cities } from "./components/cities/cities-view.component";
import { eventTypes } from "./components/event-taypes/event-types.components";
import Forgot from "./components/login/forgot.component";
import ResetPassword from "./components/login/resetpassword.component";
import Venue from "./components/venues/venue.component";
import AdminRoute from "./components/adminroute";
import OrganizerRoute from "./components/adminroute";
import { useEffect } from "react";
import { useState } from "react";


function App() {
  const [role, setName] = useState(" ");
 
  useEffect(()=>{
    (
      async ()=>{
        const res=await fetch('https://localhost:7100/api/Authenticate/loggeduser', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const content = await res.json();

        setName(content.role);
        localStorage.setItem("role",JSON.stringify(role));
      }
    )();
  },[role]);


  const handleRole = (role) => {
    setName(role);
    
  };


  const handleRefresh = async () => {
    const res=await fetch('https://localhost:7100/api/Authenticate/loggeduser', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const content = await res.json();
        setName(content.role);
  };

  
  return (
    <BrowserRouter>
      <Header  name={role} setName={handleRole}/>
    <Switch>
        <Route path="/" exact component={() => <Home name={role}/>}/>
        <Route path="/login" component={() => <LogIn setName={handleRefresh}/>}/>
        <Route path="/registrate" component={Registrate} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/resetpassword" component={ResetPassword} />
        <AdminRoute path="/city" component={Cities} role={localStorage.getItem("role")} />
        <AdminRoute path="/venue" component={Venue} role={localStorage.getItem("role")} />
        <AdminRoute path="/eventType" component={eventTypes} role={localStorage.getItem("role")} />
        <AdminRoute path="event" component={Event} role={localStorage.getItem("role")}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
