import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import FormInput from "../forminput";


const Registrate = () => {

    const [values, setValues] = useState({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        address: "",
        phoneNumber: "",
        password: ""
    });
    const inputs = [
        {
            id: 1,
            name: "username",
            type: "text",
            placeholder: "Username",
            errorMessage:
                "Username is required!",
            label: "Username*",
            pattern: ".{1,}",
            required: true,
        },
        {
            id: 2,
            name: "firstname",
            type: "text",
            placeholder: "First name",
            errorMessage:
                "Firstname is required!",
            label: "First name*",
            pattern: ".{1,}",
            required: true,
        },
        {
            id: 3,
            name: "lastname",
            type: "text",
            placeholder: "Last name",
            errorMessage:
                "Last name is required!",
            label: "Last name*",
            pattern: ".{1,}",
            required: true,
        },
        {
            id: 4,
            name: "address",
            type: "text",
            placeholder: "Address",
            errorMessage:
                "Address is required!",
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
            label: "Password",
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
        const { username, firstname, lastname, email, address, phoneNumber, password } = values;
        fetch(`https://localhost:7100/api/Authenticate/register`, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            
            body: JSON.stringify({
                username, firstname, lastname, email, address, phoneNumber, password,
            })
        })
        setRedirect(true)
    };
    if (redirect)
        return <Redirect to="/login"></Redirect>;
    return (
        <div className="container">
            <form onSubmit={submit} className="text-center m-4">
                <h1 className="text-center">Register</h1>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                    />
                ))}
                <button className="custom-button">Submit</button>
            </form>
        </div>
    );
};

export default Registrate;
