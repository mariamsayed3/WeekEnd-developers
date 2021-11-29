import { useHistory } from 'react-router';
import '../../Styles/navbar.scss'
import {GiAirplaneDeparture} from "react-icons/gi";
import {CgProfile} from "react-icons/cg";
import {BiLogOut} from "react-icons/bi";
import {LogoutOutlined} from '@ant-design/icons'
import Profile from './Profile';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../Context';
import logo from '../../Assets/small-logo.png'

function UserNavbar (){
  let history = useHistory()
   const {setEmail} = useContext(UserContext) 
   const logout = () => {
    setEmail(null)
    sessionStorage.removeItem('user')
    history.push('/login')
   }
   const [modalOpen,setModalOpen] = useState(false);
   
   const handleModalOpen = () => {
     setModalOpen(true);
  };
    return (
    <>
      <nav>
         
        <img className="logo" src={logo}/>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/available_flights">Available Flights</a></li>
          <li><a href="/my_reservations">My Reservations</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a onClick={handleModalOpen}>Profile</a></li>
          <li><a onClick={logout} href=""> <LogoutOutlined  /> </a></li>
        
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