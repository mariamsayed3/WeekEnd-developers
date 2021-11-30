import  { useContext, useState } from 'react'
import  { UserContext } from '../../Context';
import '../../Styles/Home.scss'
import HomeSearch from './HomeSearch'
import logo from '../../Assets/logo-blue.png'
import { useHistory } from 'react-router';
import cloud from '../../Assets/cloud.png'
import Profile from '../User/Profile';
import {LogoutOutlined} from '@ant-design/icons'

 const Home = () => {
   let history = useHistory()
   const [modalOpen,setModalOpen] = useState(false);
   const {setEmail} = useContext(UserContext) 
    const {Admin, Email} = useContext(UserContext);
    const logout = () => {
      setEmail(null)
      sessionStorage.removeItem('user')
      history.push('/login')
     }
     const handleModalOpen = () => {
      setModalOpen(true);
   };

    return (
      <div>
      <div class="home-container1">
            
            <div class="box1">

              <div className='logo-container'>
                <img className='logo' src = {logo} /> 
               {Admin && <div className='tabs'>
                 <a > Home</a>
                 <a href='/admin/create_flight'> Create Flight</a>
                 <a href= '/admin/flights'> Available Flights</a>
                 <a onClick={logout}> <LogoutOutlined /> </a>
               </div>}

               {!Admin && <div className='tabs'>
                 <a> Home</a>
                 <a href= '/available_flights'> Flights</a>
                 <a href='my_reservations'> My Reservations</a>
                 {Email ? <a onClick={handleModalOpen}>Profile</a> : null}
                 <Profile
                  modalOpen={modalOpen}
                  handleModalOpen={setModalOpen}
                  />
                 {Email ? <a onClick={logout}> <LogoutOutlined /> </a> : <a href="/login"> Login</a>}
               </div>}
                </div>
               <div style={{display: 'flex', flexDirection: 'row'}}>
                  <div className='home-search'>
                     <HomeSearch />
                  </div>
                  <div class="plane"><img src='https://pics.clipartpng.com/midle/Airplane_PNG_Clipart-421.png'/></div> 
               </div> 

            </div>
            
            <div class="box2">
                  <div class="cloud1">
                  <img src = {cloud} />
                        </div>
                  <div class="cloud2">
                  <img src = {cloud} />
                  </div>
                  <div class="cloud3">
                  <img src = {cloud} />
                  </div>
                  <div class="cloud4">
                     <img src = {cloud} />
                  </div>
            </div> 
           </div> 
      </div>
    )
 }

export default Home