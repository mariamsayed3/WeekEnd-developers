import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import EditUser from "./Components/Admin/EditUser";
import AdminEdits from "./Components/Admin/AdminEdits";
import ViewDetails from "./Components/Admin/ViewDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/ViewDetails" exact component={ViewDetails} />
        <Route path="/" exact component={AdminEdits} />
        {/* <PrivateRouteAdmin path='/admin/update_flight/:FlightID' component={UpdateFlight}/>   */}
        {/* <UpdateFlight /> */}
        {/* <CreateFlight /> */}
        {/* <AdminEdits /> */}
        {/* <ViewDetails /> */}
      </Switch>
    </Router>
  );
}

export default App;
