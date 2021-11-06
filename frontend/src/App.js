import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import EditUser from "./Components/Admin/EditUser";
import AdminEdits from "./Components/Admin/AdminEdits";
import CancelReservation from './Components/User/CancelReservation'



function App() {
  return (
    <Router>
      {/* <PrivateRouteAdmin path='/admin/update_flight/:FlightID' component={UpdateFlight}/>   */}
      {/* <UpdateFlight /> */}
       {/* <CreateFlight /> 
      <AdminEdits /> */}
      <CancelReservation />
    </Router>
  );
}

export default App;
