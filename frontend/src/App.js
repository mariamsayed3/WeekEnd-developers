import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import EditUser from "./Components/Admin/EditUser";
import AdminEdits from "./Components/Admin/AdminEdits";



function App() {
  return (
    <Router>
      {/* <PrivateRouteAdmin path='/admin/update_flight/:FlightID' component={UpdateFlight}/>   */}
      {/* <UpdateFlight /> */}
      {/* <CreateFlight /> */}
      <AdminEdits />
    </Router>
  );
}

export default App;
