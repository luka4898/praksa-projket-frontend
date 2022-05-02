import { useState } from "react";
import React from "react";
import FormInput from "../forminput";
import axios from "axios";
import Swal from "sweetalert2";
import ResetPassword from "./resetpassword.component";

const Forgot = () => {
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    email: "",
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
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const submit = async (e) => {
    e.preventDefault();
    const { email } = values;
    axios("https://localhost:7100/api/Authenticate/forgotpassword", {
      method: "POST",
      header: { "Context-type": "application/json" },
      data: {
        ToEmail: email,
      },
    })
      .then((response) => {
        setRedirect(true);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
          button: "OK!",
        });
      });
  };
  if (redirect) {
    const { email } = values;
    return <ResetPassword email={email} />;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Forgot password
              </h5>
              <form onSubmit={submit} className="text-center m-3">
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}

                <button className="w-100 btn btn-primary " type="submit">
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

export default Forgot;
