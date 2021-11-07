import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../Context";
import jwt from 'jsonwebtoken'


const PrivateRouteAdmin = ({path, component: Component, ...rest}) => {
  const {Admin} = useContext(UserContext)

  return (
    <Route {...rest} path={path} render={() => {
      
        return Admin ? <Component/> : <Redirect to={'/unauthorized'}/>
    }}/>)


}

export default PrivateRouteAdmin;