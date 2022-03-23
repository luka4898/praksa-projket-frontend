import { useState } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import {Link} from 'react-router-dom';

const LogIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

 
  const submit = async (e) => {
    e.preventDefault();

     const res=await fetch('https://localhost:7100/api/Authenticate/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            email,
            password
        })
    });
    const content = res.json();
    setRedirect(true);
    props.setName();
    
}

if (redirect) {
    return <Redirect to="/"/>;
}

  return (
    
    <div className="container">
      
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please log in</h1>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
            type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
       <p className="forgot-password text-right">
         <Link to={'/forgot'}>Forgot password?</Link>
         </p> 
      </form>
    </div>
  );
};

export default LogIn;
