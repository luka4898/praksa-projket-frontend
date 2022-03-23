import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, role,...rest }) => {
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
                initialValue === "Admin" ? (
                     <Component {...props} />):(
                      <Redirect to ='/' />

        )} />
       );
                
};
export default AdminRoute;