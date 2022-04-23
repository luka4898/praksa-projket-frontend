import { useState } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    axios("https://localhost:7100/api/Authenticate/forgotpassword", {
      method: "POST",
      header: { "Context-type": "application/json" },
      data: {
        ToEmail: email,
      },
    });

    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/resetpassword" />;
  }

  return (
    <div className="container">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Forgot password</h1>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Forgot;
