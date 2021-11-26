import  { useState , useContext} from 'react'
import  { UserContext } from '../../Context';

 const Home = () => {
    const {FirstName, Admin, Email} = useContext(UserContext);
    return <div>Home Page</div>
 }

export default Home