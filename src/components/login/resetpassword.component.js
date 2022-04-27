import { useState } from "react";
import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import FormInput from "../forminput";
const ResetPassword = (props) => {
  const [email, setEmail] = useState(props.email);
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    token: "",
    password: "",
    confirmpassword: "",
  });
  const inputs = [
    {
      id: 1,
      name: "token",
      type: "text",
      placeholder: "Token",
      errorMessage: "Token is required!",
      label: "Token",
      pattern: ".{1,}",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be more than 8 characters and include at least 1 lowercase and uppercase letter, 1 number and 1 special character!",
      label: "Password*",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$`,
      required: true,
    },
    {
      id: 3,
      name: "confirmpassword",
      type: "password",
      placeholder: "Confirm password",
      errorMessage: "Confirm password is required!",
      label: "Confirm password",
      pattern: ".{1,}",
      required: true,
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
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
    const { password, confirmpassword, token } = values;
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
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Reset Password
              </h5>
              <form onSubmit={submit}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    value={email}
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}

                <button className="w-100 btn  btn-primary" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
