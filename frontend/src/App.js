import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import EditUser from "./Components/Admin/EditUser";
import AdminEdits from "./Components/Admin/AdminEdits";
import ViewDetails from "./Components/Admin/ViewDetails";
import Login from "./Components/General/Login";
import Register from "./Components/General/Register";
import dotenv from 'dotenv'
import Home from "./Components/General/Home";
dotenv.config()

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />

          {/* <Route path="/ViewDetails" exact component={ViewDetails} />
          <Route path="/" exact component={AdminEdits} /> */}
          {/* <PrivateRouteAdmin path='/admin/update_flight/:FlightID' component={UpdateFlight}/>   */}
          {/* <UpdateFlight /> */}
          {/* <CreateFlight /> */}
          {/* <AdminEdits /> */}
          {/* <ViewDetails /> */}
          {/* <Register/> */}
        
      
      </Switch>
    </Router>
  );
}

export default App;
