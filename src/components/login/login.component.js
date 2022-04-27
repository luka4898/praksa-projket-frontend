import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useCurrentUser } from "../../CurrentUserContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "../forminput";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import Swal from "sweetalert2";
import FormInput from "../forminput";

const Login = (props) => {
  const [redirect, setRedirect] = useState(false);
  const { currentUser, fetchCurrentUser } = useCurrentUser();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password is required!",
      label: "Password",
      pattern: ".{1,}",
      required: true,
    },
  ];
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
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
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { email, password } = values;
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
          Swal.fire({
            icon: "error",
            title: response.title,
            text: "User does not exist!",
            button: "OK!",
          });
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
    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });
    return <Redirect to="/" />;
  }
  const inStyle = { width: 50, height: 50 };
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card border-0 shadow rounded-3 my-5">
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">
                  Sign In
                </h5>
                <form onSubmit={submit} className="text-center m-4 ">
                  {inputs.map((input) => (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={values[input.name]}
                      onChange={onChange}
                    />
                  ))}

                  <div class="d-grid mt-4 mb-4">
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                  <div class="d-grid">
                    <small class="form-text text-muted text-right  ">
                      <Link to={"/forgot"}>Forgot password?</Link>
                    </small>
                  </div>
                </form>
                <div class="row m-2">
                  <div class="col">
                    <hr />
                  </div>
                  <div class="col-auto">OR</div>
                  <div class="col">
                    <hr />
                  </div>
                </div>
                <div class="row m-3">
                  <GoogleLogin
                    render={(renderProps) => (
                      <button
                        className="google-btn p-2 w-90"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <i class="bi bi-google " /> Sign in with Google
                      </button>
                    )}
                    clientId="115115841938-siocnn1d7h9cuvs209t0j1s3avnrmepm.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleError}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div class="row m-1">
                  <FacebookLogin
                    icon="fa-facebook p-1"
                    cssClass="btn-facebook w-100 p-2"
                    appId="1045579529361738"
                    autoLoad={false}
                    callback={responseFacebook}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
