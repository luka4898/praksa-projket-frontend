import { useState } from "react";
import React from "react";
import { Redirect } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await fetch('https://localhost:7100/api/Authenticate/login', {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email,
        password,
      }),
    });
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="container">
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please log in</h1>
        <input
          type="emil"
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
      </form>
    </div>
  );
};

export default LogIn;
