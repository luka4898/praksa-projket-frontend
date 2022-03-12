import "./App.css";
import Header from "./components/header/header.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home/home.component";
import LogIn from "./components/login/login.component";
import Registrate from "./components/registrate/registarte.component";


function App() {
 

  return (
    <BrowserRouter>
      <Header/>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LogIn} />
        <Route path="/registrate" component={Registrate} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
