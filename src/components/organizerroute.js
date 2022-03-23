import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const OrganizerRoute = ({ component: Component, role,...rest }) => {
    if (role !== 'undefined') {
        var initialValue= JSON.parse(role);
      }
      else{
          var initialValue=role;
      }
    
    return (
        <Route
            {... rest}
            render={(props) =>
                initialValue === "Organizer" ? (
                     <Component {...props} />):(
                      <Redirect to ='/' />

        )} />
       );
                
};
export default OrganizerRoute;