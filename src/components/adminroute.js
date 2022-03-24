import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, role, ...rest }) => {
    if (role != null) {
        var initialValue = JSON.parse(role);
    }
    else {
        var initialValue = [];
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                initialValue.indexOf("Admin") > -1 ? (
                    <Component {...props} />) : (
                    <Redirect to='/' />

                )} />
    );

};
export default AdminRoute;