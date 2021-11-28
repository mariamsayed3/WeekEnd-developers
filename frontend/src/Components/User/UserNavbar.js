import '../../Styles/navbar.scss'
import {GiAirplaneDeparture} from "react-icons/gi";
import {CgProfile} from "react-icons/cg";
import Profile from './Profile';
import { useState } from 'react';

function UserNavbar (){

  const [modalOpen,setModalOpen] = useState(false);
   
  const handleModalOpen = () => {
    setModalOpen(true);
 };

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
          <li><CgProfile className="profile" size="20"/><a onClick={handleModalOpen}>Profile</a></li>
        </ul>
    </nav>
    <Profile
    modalOpen={modalOpen}
    handleModalOpen={setModalOpen}
    />
  </>
    )

}

export default UserNavbar;