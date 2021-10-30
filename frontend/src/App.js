import {BrowserRouter as Router, Switch,} from 'react-router-dom'
import './App.css';
import UpdateFlight from './Components/Admin/UpdateFlight'
import Navbar from './Components/General/Navbar';
import './styles/navbar.scss'

function App() {
  return (
    <Router>
      <Navbar admin={0}/>
      <UpdateFlight/>
    </Router>
    
  );
}

export default App;