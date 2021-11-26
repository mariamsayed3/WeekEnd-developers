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
import AdminNavbar from './Components/Admin/AdminNavbar'
import PrivateRouteAdmin from './Router/PrivateRouteAdmin'
import PrivateRouteUser from './Router/PrivateRouteUser'
import BoardingPass from './Components/User/BoardingPass'
import ReserveSeats from './Components/User/Resevation/ReserveSeats'
import { useContext } from 'react';
import { UserContext } from './Context';
import EmployeeNavbar from './Components/User/EmployeeNavbar';
dotenv.config()
const { Header } = Layout;


function App() {
  const {Admin} = useContext(UserContext)
  return (
    <Router>
        {/* <Header> */}
          {Admin ? <AdminNavbar /> : <EmployeeNavbar/>}
        {/* </Header>  */}
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/unauthorized" exact component={Unauthorized} />
        <Route path="/register" exact component={Register} />
        
        <PrivateRouteAdmin path="/admin/create_flight" exact component={CreateFlight}/>
        <PrivateRouteAdmin path="/admin/update_flight" exact component={UpdateFlight}/>
        <PrivateRouteAdmin path="/admin/flights" exact component={AdminEdits}/>
        <PrivateRouteAdmin path="/admin/view_details" exact component={ViewDetails}/>
        
        <PrivateRouteUser path="/my_reservations" exact component={BoardingPass}/>
        <PrivateRouteUser path="/reserve_seats/:flight_id" exact component={ReserveSeats}/>

        {/* <BoardingPass/> */}
      </Switch>


    </Router>
  );
}

export default App;
