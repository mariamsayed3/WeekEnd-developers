import  { useState , useContext} from 'react'
import  { UserContext } from '../../Context';
import Clouds from '../General/Clouds'
import '../../Styles/Test.scss'

 const Home = () => {
    const {FirstName, Admin, Email} = useContext(UserContext);
    return (
      
         <div id="square" className='home-card'>
               HII
         </div>
      
    )
 }

export default Home