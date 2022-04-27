import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FormInput from "../forminput";
import Swal from "sweetalert2";
const Registrate = () => {
  const [values, setValues] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  });
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
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username is required!",
      label: "Username*",
      pattern: ".{1,}",
      required: true,
    },
    {
      id: 2,
      name: "firstname",
      type: "text",
      placeholder: "First name",
      errorMessage: "Firstname is required!",
      label: "First name*",
      pattern: ".{1,}",
      required: true,
    },
    {
      id: 3,
      name: "lastname",
      type: "text",
      placeholder: "Last name",
      errorMessage: "Last name is required!",
      label: "Last name*",
      pattern: ".{1,}",
      required: true,
    },
    {
      id: 4,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorMessage: "Address is required!",
      label: "Address*",
      pattern: ".{1,}",
      required: true,
    },
    {
      id: 5,
      name: "phoneNumber",
      type: "text",
      placeholder: "Phone number",
      errorMessage:
        "Phone number should have more than 9 characters and only numbers!",
      label: "Phone*",
      pattern: "^[0-9]{9,}$",
      required: true,
    },
    {
      id: 6,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email*",
      required: true,
    },
    {
      id: 7,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be more than 8 characters and include at least 1 lowercase and uppercase letter, 1 number and 1 special character!",
      label: "Password*",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$`,
      required: true,
    },
  ];

  const [redirect, setRedirect] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const {
      username,
      firstname,
      lastname,
      email,
      address,
      phoneNumber,
      password,
    } = values;
    fetch(`https://localhost:7100/api/Authenticate/register`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        firstname,
        lastname,
        email,
        address,
        phoneNumber,
        password,
      }),
    });
    setRedirect(true);
  };
  if (redirect) {
    Toast.fire({
      icon: "success",
      title: "User registered successfully",
    });
    return <Redirect to="/login"></Redirect>;
  }
  return (
    <div class="container">
      <div class="row">
        <div class="col-sm-10 col-md-8 col-lg-6 mx-auto">
          <div class="card border-0 shadow rounded-3 my-5">
            <div class="card-body p-4 p-sm-5">
              <h5 class="card-title text-center mb-5 fw-light fs-5">
                Register
              </h5>
              <form onSubmit={submit} className="text-center m-5">
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}
                <div class="d-grid mt-5 mb-2">
                  <button className="btn btn-primary p-2" type="submit">
                    Register
                  </button>
                </div>
                <p class="text-center text-muted mt-3 mb-0">
                  Have already an account?{" "}
                  <a href="/login" class="fw-bold text-body">
                    <u>Login here</u>
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registrate;
