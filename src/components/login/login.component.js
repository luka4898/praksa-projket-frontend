import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useCurrentUser } from "../../CurrentUserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "../forminput";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { currentUser, fetchCurrentUser } = useCurrentUser();

  const responseGoogleSuccess = async (response) => {
    try {
      const result = await axios({
        method: "POST",
        url: "https://localhost:7100/api/Authenticate/ExternalLogin",
        withCredentials: true,
        data: { idToken: response.tokenId, provider: "Google" },
      });
      setRedirect(true);
      fetchCurrentUser();
      props.setName("");
    } catch (e) {
      console.log(e);
    }
  };
  const responseGoogleError = (response) => {
    console.log(response);
  };

  const responseFacebook = async (response) => {
    try {
      const result = await axios({
        method: "POST",
        url: "https://localhost:7100/api/Authenticate/ExternalLoginFacebook",
        withCredentials: true,
        data: { idToken: response.accessToken, provider: "Facebook" },
      });
      setRedirect(true);
      fetchCurrentUser();
      props.setName("");
    } catch (e) {
      console.log(e);
    }
  };

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://localhost:7100/api/Authenticate/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((response) => {
      let statusCode = response.status;
      let success = response.ok;

      response.json().then((response) => {
        if (!success) {
          alert("Unešeni korisnik ne postoji");
          e.target.reset();
          return <Redirect to="/login" />;
        }
        setRedirect(true);
        fetchCurrentUser();
        props.setName("");
      });
    });
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <div className="container ">
        <form onSubmit={submit} className="text-center m-4">
          <h1 className="text-center">Please log in</h1>
          <div className="form-group form-inline">
            <label className="custom-label">Email</label>
            <input
              type="email"
              className="custom-input"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group form-inline">
            <label className="custom-label">Password</label>
            <input
              type="password"
              className="custom-input"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="custom-button" type="submit">
            Submit
          </button>
          <p className="forgot-password text-right">
            <Link to={"/forgot"}>Forgot password?</Link>
          </p>
        </form>
      </div>
      <div className="text-center m-4">
        <GoogleLogin
          clientId="115115841938-siocnn1d7h9cuvs209t0j1s3avnrmepm.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleError}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div className="text-center m-4">
        <FacebookLogin
          appId="1045579529361738"
          autoLoad={false}
          callback={responseFacebook}
        />
      </div>
    </>
  );
};

export default Login;
