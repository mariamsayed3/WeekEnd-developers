import { useHistory } from 'react-router';
import '../../Styles/navbar.scss'
import {GiAirplaneDeparture} from "react-icons/gi";
import { useContext } from 'react';
import { UserContext } from '../../Context';

function UserNavbar (){
  let history = useHistory()
   const {setEmail} = useContext(UserContext) 
   const logout = () => {
    setEmail(null)
    sessionStorage.removeItem('user')
    history.push('/login')
   }
    return (
    <>
      <nav>
        <GiAirplaneDeparture className="icon" size="40" />  
        <label class="logo">Jet Away</label>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="">Available Flights</a></li>
          <li><a href="/my_reservations">My Reservations</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a onClick={logout} href="">Log out</a></li>
        </ul>
    </nav>
  </>
    )

}

export default UserNavbar;