import  { useState , useContext} from 'react'
import  { UserContext } from '../../Context';

const Home = () => {
    const {FirstName} =useContext(UserContext);
    console.log(FirstName)
    return <div>Home Page</div>
}

export default Home