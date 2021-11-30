import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {UserContext} from "../Context";

const PrivateRouteUser= ({path, component: Component, returnFlight, ...rest}) => {
  const {Admin, Email} = useContext(UserContext)
  return (
    <Route {...rest} path={path} render={() => {
      if(Email){ // Existing user
        if(Admin)
          return <Redirect to={'/unauthorized'}/>
        else
          return <Component returnFlight={returnFlight}/>
      }else{ // Guest user
        switch(path){
          case '/available_flights':
            return <Component returnFlight={returnFlight}/>
          default: 
            return <Redirect to={'/login'}/>
        }
      }
    }}/>)


}

export default PrivateRouteUser;