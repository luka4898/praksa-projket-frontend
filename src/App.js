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
import Event from "./components/events/event.component";
import EventDetails from "./components/events/eventdetails.component";
import ManageEvent from "./components/manageevent.component";
import { AccountView } from "./components/account/account-view.component";



function App() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
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
            setRole(content.role);
            fetchCurrentUser();
        }
    )();
}, [name]);

  const handleRefresh =(name)=>{
    setName(name);
  }
  
  return (
    <BrowserRouter>
       <Header name={name} setName={setName} role={role}></Header>
    <Switch>
        <Route path="/" exact component={() => <Home name={name}/>}/>
        <AdminRoute path="/manageevent" component={ManageEvent}/>
        <Route path="/login" component={() => <LogIn setName={handleRefresh}/>}/>
        <Route path="/registrate" component={Registrate} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/resetpassword" component={ResetPassword} />
        <AdminRoute path="/city" component={Cities} />
        <AdminRoute path="/venue" component={Venue} />
        <AdminRoute path="/eventType" component={eventTypes} />
        <Route path="/event" component={Event} />
        <Route path="/eventdetails/:id" component={EventDetails}/>
        <AdminRoute path="/acc" component={Accounts} />
        <AdminRoute path="/org" component={Org} />
        <Route path="/editacc" component={AccountView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
