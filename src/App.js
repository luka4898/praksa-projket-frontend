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


function App() {
 

  return (
    <BrowserRouter>
      <Header />
    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LogIn} />
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
