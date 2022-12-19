import React from "react";
import {Route,Redirect} from "react-router-dom";
import { isAuthenticated } from "./index";
// rest contain info coming from route.js basically the props so these props are passed to next component
const AdminRoutes=({ component:Component, ...rest }) =>{
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated() && isAuthenticated().user.role===1 ?
            (<Component {...props}/>)
            : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  export default AdminRoutes