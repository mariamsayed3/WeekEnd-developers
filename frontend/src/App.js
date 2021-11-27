import { Layout } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/generics.scss";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import AdminEdits from "./Components/Admin/AdminEdits";
import CancelReservation from "./Components/User/CancelReservation";
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
import DepartureCard from "./Components/User/DepartureCard";
import ReturnCard from "./Components/User/ReturnCard";
import AvailableFlights from "./Components/User/AvailableFlights";
dotenv.config();
const { Header, Content, Footer } = Layout;

function App() {
  const { Email, Admin } = useContext(UserContext);
  return (
    <Layout style={{ backgroundColor: "rgba(1,1,1,0)" }}>
      <Router>
        <Header style={{ backgroundColor: "rgba(1,1,1,0)", padding: 0 }}>
          {Email ? Admin === true ? <AdminNavbar /> : <UserNavbar /> : null}
        </Header>
        <Content>
          <Switch>
            {Email ? (
              <Route path="/" exact component={Home} />
            ) : (
              <Route path="/" exact component={Login} />
            )}
            <Route path="/login" exact component={Login} />
            <Route path="/unauthorized" exact component={Unauthorized} />
            <Route path="/register" exact component={Register} />

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
            <Route component={NotFound} />
          </Switch>
        </Content>
      </Router>

      {/* <Footer>
        
      </Footer> */}
    </Layout>
  );
}

export default App;
