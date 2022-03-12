import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Registrate = () => {
  const [username, setUserName] = useState("");
  const [firstname, setFristName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phonnumber, setPhonNumber] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    
    fetch(`https://localhost:7100/api/Authenticate/register`, {
      method: "POST",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        firstname,
        lastname,
        email,
        address,
        phonnumber,
        password,
      }),
    })
      setRedirect(true)
  };
  if(redirect)
    return <Redirect to="/login"></Redirect>;
  return (
    <div className="container">
      <form onSubmit={submit} className="p-2">
        <h1 className="h3 mb-3 fw-normal ">Please register</h1>

        <input
          type="text"
          className="form-control "
          placeholder="User name"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Frist name"
          required
          onChange={(e) => setFristName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          required
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          required
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          className="form-control"
          placeholder="Phone number"
          required
          onChange={(e) => setPhonNumber(e.target.value)}
        />
        <input
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

export default Registrate;
