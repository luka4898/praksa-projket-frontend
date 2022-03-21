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
import { useEffect } from "react";
import { useState } from "react";


function App() {
  const [name, setName] = useState(" ");

  useEffect(()=>{
    (
      async ()=>{
        const res=await fetch('https://localhost:7100/api/Authenticate/loggeduser', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const content = await res.json();

        setName(content.userName);
        
      }
    )();
  });

  const handleName = (name) => {
    setName(name);
    
  };

  const handleRefresh = async () => {
    const res=await fetch('https://localhost:7100/api/Authenticate/loggeduser', {
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        });
        const content = await res.json();

        setName(content.userName);
  };
  return (
    <BrowserRouter>
      <Header  name={name} setName={handleName}/>
    <Switch>
        <Route path="/" exact component={() => <Home name={name}/>}/>
        <Route path="/login" component={() => <LogIn setName={handleRefresh}/>}/>
        <Route path="/registrate" component={Registrate} />
        <Route path="/city" component={Cities} />
        <Route path="/eventType" component={eventTypes}/>
        <Route path="/forgot" component={Forgot} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/venue" component={Venue} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
