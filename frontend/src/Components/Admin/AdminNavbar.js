import '../../Styles/navbar.scss'
import {GiAirplaneDeparture} from "react-icons/gi";
import {BiLogOut} from "react-icons/bi";
import { useContext } from 'react';
import { UserContext } from '../../Context';
import { useHistory } from 'react-router';
import Profile from '../General/Profile';
import { useState } from 'react';

function AdminNavbar (){
   let history = useHistory()
   const {setEmail} = useContext(UserContext) 
   const logout = () => {
    setEmail(null)
    sessionStorage.removeItem('user')
    history.push('/')
   }
   const [modalOpen,setModalOpen] = useState(false);
   
   const handleModalOpen = () => {
     setModalOpen(true);
  };
    return (
    <>
      <nav>
        <GiAirplaneDeparture className="icon" size="40" />  
        <label className="logo">Jet Away</label>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/admin/flights">Available Flights</a></li>
          <li><a href="/admin/createFlightOne">Create Flight</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a onClick={handleModalOpen}>Profile</a></li>
          <li><a onClick={logout} href=""><BiLogOut /></a></li>
        </ul>
    </nav>
    <Profile
    modalOpen={modalOpen}
    handleModalOpen={setModalOpen}
    />
  </>
    )
}
export default AdminNavbar;