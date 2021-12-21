import { Layout } from "antd";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./Styles/generics.scss";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import AdminEdits from "./Components/Admin/AdminEdits";
import ViewDetails from "./Components/Admin/ViewDetails";
import Login from "./Components/General/Login";
import Register from "./Components/General/Register";
import dotenv from "dotenv";
import Home from "./Components/General/Home";
import Unauthorized from "./Components/General/Unauthorized";
import AdminNavbar from "./Components/Admin/AdminNavbar";
import PrivateRouteAdmin from "./Router/PrivateRouteAdmin";
import PrivateRouteUser from "./Router/PrivateRouteUser";
import BoardingPass from "./Components/User/BoardingPass";
import ReserveSeats from "./Components/User/Resevation/ReserveSeats";
import { useContext } from "react";
import { UserContext } from "./Context";
import UserNavbar from "./Components/User/UserNavbar";
import NotFound from "./Components/General/NotFound";
import AvailableFlights from "./Components/User/AvailableFlights";
import EditUser from "./Components/User/EditUser";
import SmallCard from './Components/User/ResSummary/SmallCard'
import Summaries from "./Components/User/Summaries";
import ForgotPassword from "./Components/General/ForgotPassword"
import EditReservedSeats from './Components/User/EditReservation/EditReservedSeats'
import PaymentSuccess from './Components/User/PaymentSuccess'
dotenv.config();
const { Header, Content } = Layout;

function App() {
  const { Email, Admin } = useContext(UserContext);
  const path = window.location.pathname;

  const home = path === "/" || path === "/login";

  return (
    <Layout style={{ backgroundColor: "rgba(1,1,1,0)" }}>
      <Router>
        {(!home) && (
          <Header className="Header-navbar" style={{ backgroundColor: "rgba(1,1,1,0)", padding: 0 }}>
            {Email ?
                 Admin === true ? <AdminNavbar /> : <UserNavbar /> 
            : null}
          </Header>
        )}
        
        <Content>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/unauthorized" exact component={Unauthorized} />
            <Route path="/register" exact component={Register} />
            <Route path="/summary" exact component={SmallCard} />
            <Route path="/reset-password" exact component={ForgotPassword} />
            
            {/* Will Call Maryam Magdy's Change Password Component */}
            {/* <Route path='/resetPassword/:token' component={ResetPassword}/> */}


            <PrivateRouteAdmin
              path="/admin/create_flight"
              exact
              component={CreateFlight}
            />
            <PrivateRouteAdmin
              path="/admin/update_flight"
              exact
              component={UpdateFlight}
            />
            <PrivateRouteAdmin
              path="/admin/flights"
              exact
              component={AdminEdits}
            />
            <PrivateRouteAdmin
              path="/admin/view_details"
              exact
              component={ViewDetails}
            />

            <PrivateRouteUser
              path="/my_reservations"
              exact
              component={BoardingPass}
            />
             <PrivateRouteUser
              path="/my_summaries"
              exact
              component={Summaries}
            />
            <PrivateRouteUser
              path="/reserve_departure/:flight_id"
              exact
              component={ReserveSeats}
            />
            <PrivateRouteUser
              path="/reserve_return/:flight_id"
              exact
              component={ReserveSeats}
              returnFlight={true}
            />
            <PrivateRouteUser
              path="/available_flights"
              exact
              component={AvailableFlights}
            />

            <PrivateRouteUser
              path="/success"
              exact
              component={PaymentSuccess}
            />

            <PrivateRouteUser
              path="/edit_reservation"
              exact
              component={EditReservedSeats}
            />



            <PrivateRouteUser path="/edit_info" exact component={EditUser} />
            <Route component={NotFound} />
          </Switch>
        </Content>
      </Router>
    </Layout>
  );
}

export default App;
