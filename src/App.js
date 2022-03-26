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
import { Accounts } from "./components/customer/account";
import { Org } from "./components/organizers/organizers";
import { useCurrentUser } from "./CurrentUserContext";



function App() {
  const [name, setName] = useState('');
  const {fetchCurrentUser} = useCurrentUser();

  useEffect(() => {
    (
        async () => {
         
            const response = await fetch('https://localhost:7100/api/Authenticate/loggeduser', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
            })

            const content = await response.json();
            setName(content.username);
            fetchCurrentUser();
        }
    )();
}, [name]);

  const handleRefresh =(name)=>{
    setName(name);
    
  }
  
  return (
    <BrowserRouter>
       <Header name={name} setName={setName} ></Header>
    <Switch>
        <Route path="/" exact component={() => <Home name={name}/>}/>
        <Route path="/login" component={() => <LogIn setName={handleRefresh}/>}/>
        <Route path="/registrate" component={Registrate} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/resetpassword" component={ResetPassword} />
        <AdminRoute path="/city" component={Cities} />
        <AdminRoute path="/venue" component={Venue} />
        <AdminRoute path="/eventType" component={eventTypes} />
        <AdminRoute path="/event" component={Event} />
        <AdminRoute path="/acc" component={Accounts} />
        <AdminRoute path="/org" component={Org} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
