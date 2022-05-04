import "./App.css";
import Header from "./components/header/header.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home.component";
import LogIn from "./components/login/login.component";
import Registrate from "./components/registrate/registarte.component";
import Forgot from "./components/login/forgot.component";
import ResetPassword from "./components/login/resetpassword.component";
import OrganizerRoute from "./components/organizerroute";
import { useEffect } from "react";
import { useState } from "react";
import { useCurrentUser } from "./CurrentUserContext";
import Event from "./components/events/event.component";
import CustomerOrganizerRoute from "./components/customerorganizerroute";

import EventDetails from "./components/events/eventdetails.component";
import Calendar from "./components/events/calendar.component";
import { Footer } from "./components/footer/footer.component";
import PostDetails from "./components/post/postdetails.component";
import SidebarLayout from "./components/sidebar/sidebarlayout";
import ManageEvent from "./components/events/manageevent.component";
import Ticket from "./components/ticket/ticket.componenet";
import Post from "./components/post/post.component";

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { fetchCurrentUser } = useCurrentUser();

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://localhost:7100/api/Authenticate/loggeduser",
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const content = await response.json();
      setName(content.username);
      setRole(content.role);
      fetchCurrentUser();
    })();
  }, [name]);

  const handleRefresh = (name) => {
    setName(name);
  };

  return (
    <BrowserRouter>
      <Header name={name} setName={setName} role={role}></Header>

      <Switch>
        {role != "Admin" ? (
          <Route path="/" exact component={() => <Home name={name} />} />
        ) : (
          <Route path="/" component={SidebarLayout} />
        )}

        <Route
          path="/login"
          component={() => <LogIn setName={handleRefresh} />}
        />
        <Route path="/registrate" component={Registrate} />
        <Route path="/forgot" component={Forgot} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/resetpassword" component={ResetPassword} />
        <CustomerOrganizerRoute path="/post" component={Post} />
        <OrganizerRoute path="/manageevent" component={ManageEvent} />
        <Route path="/event" component={Event} />
        <Route path="/ticket" component={Ticket} />
        <Route
          path="/eventdetails/:id"
          render={(props) => (
            <EventDetails key={props.match.params.id} {...props} />
          )}
        />
        <Route
          path="/postdetails/:id"
          render={(props) => (
            <PostDetails key={props.match.params.id} {...props} />
          )}
        />

        <Route component={SidebarLayout} />
      </Switch>

      <Route
        path="/"
        render={(props) =>
          props.location.pathname !== "/login" &&
          props.location.pathname !== "/registrate" &&
          props.location.pathname !== "/forgot" &&
          props.location.pathname !== "/resetpassword" && <Footer />
        }
      ></Route>
    </BrowserRouter>
  );
}

export default App;
