import {Layout, Menu} from 'antd';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/generics.scss";
import UpdateFlight from "./Components/Admin/UpdateFlight";
import CreateFlight from "./Components/Admin/CreateFlight";
import EditUser from "./Components/Admin/EditUser";
import AdminEdits from "./Components/Admin/AdminEdits";
import ViewDetails from "./Components/Admin/ViewDetails";
import Login from "./Components/General/Login";
import Register from "./Components/General/Register";
import dotenv from 'dotenv'
import Home from "./Components/General/Home";
import PrivateRouteAdmin from './Router/PrivateRouteAdmin'
import Unauthorized from './Components/General/Unauthorized'
import AdminNavbar from './Components/Admin/Navbar'
import FlightDetails from './Components/General/FlightDetailsPopup';
dotenv.config()
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>

  
        <Header>
            <AdminNavbar />
        </Header>
      <Switch>

        {/* <FlightDetails /> */}
        <Route path="/home" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/unauthorized" exact component={Unauthorized} />
        <Route path="/register" exact component={Register} />
        <Route path="/admin/create_flight" exact component={CreateFlight}/>
        <Route path="/admin/update_flight" exact component={UpdateFlight}/>
        <Route path="/admin/flights" exact component={AdminEdits}/>
        <Route path="/admin/view_details" exact component={ViewDetails}/>
       
        
      
      </Switch>
    
    </Router>
  );
}

export default App;
