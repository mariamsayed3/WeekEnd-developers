import {BrowserRouter as Router, Switch,} from 'react-router-dom'
import './App.css';
import UpdateFlight from './Components/Admin/UpdateFlight'
import Navbar from './Components/General/Navbar'
import FlightDetails from './Components/General/FlightDetails'

function App() {
  return (
    <Router>
       
          
          {/* <Navbar />
           <UpdateFlight />  */}
           <FlightDetails />
          
        
     </Router>
    
  );
}

export default App;