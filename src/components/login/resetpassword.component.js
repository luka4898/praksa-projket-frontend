import { useState } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState("");
    const [redirect, setRedirect] = useState(false);
    const submit = async (e) => {
        e.preventDefault();
        axios("https://localhost:7100/api/Authenticate/resetpassword", {
            method: "POST",
            header: { "Context-type": "application/json" },
            data: {
                email: email,
                password: password,
                confirmPassword: confirmpassword,
                token:token,
            }
        });
    
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/login" />;
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
                <input
                  type="password"
                className="form-control"
                placeholder="Confirm password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
                <input
                  type="text"
                className="form-control"
                placeholder="Token"
                required
                onChange={(e) => setToken(e.target.value)}
              />
      
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Submit
              </button>

            </form>
          </div>
        );

        }
    

 
export default ResetPassword;

