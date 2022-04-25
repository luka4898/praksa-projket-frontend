import { useState } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const ResetPassword = (props) => {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [redirect, setRedirect] = useState(false);
  const addErrors = (arr) => {
    let errors = "";
    arr.forEach((item) => {
      errors += item;
    });
    return errors;
  };
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
  const submit = async (e) => {
    e.preventDefault();
    axios("https://localhost:7100/api/Authenticate/resetpassword", {
      method: "POST",
      header: { "Context-type": "application/json" },
      data: {
        email: email,
        password: password,
        confirmPassword: confirmpassword,
        token: token,
      },
    })
      .then((response) => {
        setRedirect(true);
      })
      .catch((errors) => {
        if (errors.response.data.message) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: errors.response.data.message,
            button: "OK!",
          });
        } else {
          const err = errors.response.data.errors.ConfirmPassword;
          Swal.fire({
            icon: "error",
            title: "Error",
            text: addErrors(err),
            button: "OK!",
          });
        }
      });
  };
  if (redirect) {
    Toast.fire({
      icon: "success",
      title: "Password changed successfully",
    });
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
          value={email}
          disabled
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
};

export default ResetPassword;
