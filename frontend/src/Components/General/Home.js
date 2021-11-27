import  { useState , useContext} from 'react'
import  { UserContext } from '../../Context';
import Clouds from '../General/Clouds'

 const Home = () => {
    const {FirstName, Admin, Email} = useContext(UserContext);
    return (
       <Clouds />
    )
 }

export default Home