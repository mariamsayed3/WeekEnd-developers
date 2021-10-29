import {BrowserRouter as Router, Switch,} from 'react-router-dom'
import './App.css';
import UpdateFlight from './Components/Admin/UpdateFlight'

function App() {
  return (
    <Router>
        <Switch>
          {/* <PrivateRouteAdmin path='/admin/update_flight/:FlightID' component={UpdateFlight}/>   */}
          <UpdateFlight />
        </Switch>
    </Router>
    
  );
}

export default App;