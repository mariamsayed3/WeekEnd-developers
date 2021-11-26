import '../../Styles/navbar.scss'
import {GiAirplaneDeparture} from "react-icons/gi";

function UserNavbar (){
   
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
        </ul>
    </nav>
  </>
    )

}

export default UserNavbar;