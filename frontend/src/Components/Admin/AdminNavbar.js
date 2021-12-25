import '../../Styles/navbar.scss'
import {LogoutOutlined} from '@ant-design/icons'
import { useContext } from 'react';
import { UserContext } from '../../Context';
import { useHistory } from 'react-router';
import Profile from '../General/Profile';
import { useState } from 'react';
import logo from '../../Assets/small-logon.png'

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
        <img className="logo" src={logo}/>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/admin/createFlightOne">Create Flight</a></li>
          <li><a href="/admin/flights">Available Flights</a></li>
          
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
export default AdminNavbar;