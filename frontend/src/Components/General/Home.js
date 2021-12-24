import  { useContext, useEffect, useState } from 'react'
import  { UserContext } from '../../Context';
import '../../Styles/Home.scss'
import axios from 'axios';
import {Redirect} from "react-router"
import HomeSearch from './HomeSearch'
import logo from '../../Assets/logo-blue.png'
import { useHistory } from 'react-router';
import cloud from '../../Assets/cloud.png'
import Profile from '../General/Profile';
import {LogoutOutlined} from '@ant-design/icons'
import plane from '../../Assets/plane.png'

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

   useEffect(() => {
    const found = document.querySelector('header')
    if(found)
      found.remove()
   }, [])
  
    return (
      <div>
      <div className="home-container1">
            
            <div className="box1">

              <div className='logo-container'>
                <img className='logo' src = {logo} /> 
               {Admin && <div className='tabs'>
                 <a > Home</a>
                
                 <a href='/admin/createFlightOne'> Create Flight</a>
                 <a href= '/admin/flights'> Available Flights</a>
                 {Email ? <a onClick={handleModalOpen}>Profile</a> : null}
                 <Profile
                  modalOpen={modalOpen}
                  handleModalOpen={setModalOpen}
                  />
                 <a onClick={logout}> <LogoutOutlined /> </a>
               </div>}

               {!Admin && <div className='tabs'>
                 <a> Home</a>
            
                 <a href= '/available_flights'> Flights</a>
                 <a href='my_reservations'> My Reservations</a>
                 <a href='my_summaries'> Summaries</a>
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
                  <div className="plane"><img src={plane}/></div> 
               </div> 

            </div>
            
            <div className="box2">
                  <div className="cloud1">
                  <img src = {cloud} />
                        </div>
                  <div className="cloud2">
                  <img src = {cloud} />
                  </div>
                  <div className="cloud3">
                  <img src = {cloud} />
                  </div>
                  <div className="cloud4">
                     <img src = {cloud} />
                  </div>
            </div> 
           </div> 
      </div>
    )
 }

export default Home