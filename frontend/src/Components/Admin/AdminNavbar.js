import '../../Styles/navbar.scss'
import {GiAirplaneDeparture} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi";
import { useContext } from 'react';
import { UserContext } from '../../Context';
import { useHistory } from 'react-router';

function AdminNavbar (){
   let history = useHistory()
   const {setEmail} = useContext(UserContext) 
   const logout = () => {
    setEmail(null)
    sessionStorage.removeItem('user')
    history.push('/')
   }
    return (
    <>
      <nav>
        <GiAirplaneDeparture className="icon" size="40" />  
        <label class="logo">Jet Away</label>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/admin/flights">Available Flights</a></li>
          <li><a href="/admin/create_flight">Create Flight</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a onClick={logout} href=""><BiLogOut /></a></li>
        </ul>
    </nav>
  </>
    )
}
export default AdminNavbar;