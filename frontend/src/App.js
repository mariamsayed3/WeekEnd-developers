import {Layout} from 'antd';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/generics.scss";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import AdminEdits from "./Components/Admin/AdminEdits";
import CancelReservation from './Components/User/CancelReservation'
import ViewDetails from "./Components/Admin/ViewDetails";
import Login from "./Components/General/Login";
import Register from "./Components/General/Register";
import dotenv from 'dotenv'
import Home from "./Components/General/Home";
import Unauthorized from './Components/General/Unauthorized'
import AdminNavbar from './Components/Admin/Navbar'

import ReserveSeats from './Components/User/Resevation/ReserveSeats'

dotenv.config()
const { Header } = Layout;

function App() {
  return (
    <Router>

        <Header>
            <AdminNavbar />
        </Header> 
      <Switch>
        {/* <FlightDetails />
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/unauthorized" exact component={Unauthorized} />
        <Route path="/register" exact component={Register} />
        <Route path="/admin/create_flight" exact component={CreateFlight}/>
        <Route path="/admin/update_flight" exact component={UpdateFlight}/>
        <Route path="/admin/flights" exact component={AdminEdits}/>

        <Route path="/admin/view_details" exact component={ViewDetails}/>
         */}


         <BoardingPass/> 
        <Navigation/>
        {/* <EditUser/> */}
      </Switch>
    
      {/* <ReserveSeats/>     */}
    </Router>
  );
}

export default App;
