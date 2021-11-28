import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../Context";

const PrivateRouteUser= ({path, component: Component, returnFlight, ...rest}) => {
  const {Admin, Email} = useContext(UserContext)
  return (
    <Route {...rest} path={path} render={() => {
        return !Admin ? <Component returnFlight={returnFlight}/> : <Redirect to={'/unauthorized'}/>
    }}/>)


}

export default PrivateRouteUser;