import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./index.css";
import "./components/ticket/ticket.css";
import "./components/forminput.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CurrentUserProvider } from "./CurrentUserContext";

ReactDOM.render(
  
  <CurrentUserProvider>
    <App />
    </CurrentUserProvider>
,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
