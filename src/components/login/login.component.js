import React, { useState} from 'react';
import {Redirect} from "react-router-dom";
import { useCurrentUser } from "../../CurrentUserContext";
import { Link } from 'react-router-dom';
import "../forminput";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { currentUser, fetchCurrentUser } = useCurrentUser();


    const submit = async (e) => {
        e.preventDefault();

        const res = await fetch('https://localhost:7100/api/Authenticate/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        }).then((response) => {
            let statusCode = response.status,
                success = response.ok;

            response.json().then(response => {

                if (!success) {
                    alert("Unešeni korisnik ne postoji")
                    e.target.reset();
                    return <Redirect to="/login" />;
                }
                setRedirect(true);
                fetchCurrentUser();
                props.setName("");

            })
        })
    }

    if (redirect) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="container">

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
                <Link to={'/forgot'}>Forgot password?</Link>
            </p>
        </form>
    </div>
    );
};

export default Login;