import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const OrganizerRoute = ({ component: Component, role, ...rest }) => {
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
                initialValue.indexOf("Organizer") > -1 ? (
                    <Component {...props} />) : (
                    <Redirect to='/' />

                )} />
    );

};
export default OrganizerRoute;