import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCurrentUser } from "../CurrentUserContext";

const OrganizerRoute = ({ component: Component, ...rest }) => {  
    let organizerrole=false;
    const {currentUser, loading, authed}=useCurrentUser();
    if(authed){
         organizerrole=JSON.stringify(currentUser.role).indexOf("Organizer") > -1 
    }
    return (
        <Route
            {... rest}
            render={(props) =>(
                !loading ? (
                authed && organizerrole?  (
                     <Component {...props} />):(
                        <Redirect to="/"/>

        )):console.log("Loading...")) } />
       );
                
};
export default OrganizerRoute;