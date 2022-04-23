import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCurrentUser } from "../CurrentUserContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  let adminrole = false;
  const { currentUser, loading, authed } = useCurrentUser();
  if (authed) {
    adminrole = JSON.stringify(currentUser.role).indexOf("Admin") > -1;
  }
  console.log(currentUser);
  return (
    <Route
      {...rest}
      render={(props) =>
        !loading ? (
          authed && adminrole ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        ) : (
          console.log("Loading...")
        )
      }
    />
  );
};
export default AdminRoute;
