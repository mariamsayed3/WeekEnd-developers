import  { useState , useContext} from 'react'
import  { UserContext } from '../../Context';
import Clouds from '../General/Clouds'
import '../../Styles/Test.scss'
import HomeSearch from './HomeSearch'
import logo from '../../Assets/logo.png'
// import '../../Styles/Clouds.css'

 const Home = () => {
    const {FirstName, Admin, Email} = useContext(UserContext);
    return (
       <div>
      {/* <div class="plane"><img src='https://pics.clipartpng.com/midle/Airplane_PNG_Clipart-421.png'/></div>  */}
      
      <div class="container">
            
            <div class="box1">
                {/* <img src = {logo} />  */}
               <div style={{display: 'flex', flexDirection: 'row'}}>
               <div className='home-search'>
                  <HomeSearch />
               </div>
               <div class="plane"><img src='https://pics.clipartpng.com/midle/Airplane_PNG_Clipart-421.png'/></div> 
               </div> 

            </div>
            
            <div class="box2">
                  <div class="cloud1">
                  <img src = 'https://assets.stickpng.com/images/580b585b2edbce24c47b263e.png' />
                        </div>
                  <div class="cloud2">
                  <img src = 'https://assets.stickpng.com/images/580b585b2edbce24c47b263e.png' />
                  </div>
                  <div class="cloud3">
                  <img src = 'https://assets.stickpng.com/images/580b585b2edbce24c47b263e.png' />
                  </div>
                  <div class="cloud4">
                     <img src = 'https://assets.stickpng.com/images/580b585b2edbce24c47b263e.png' />
                  </div>

            </div> 
           </div> 
        
      </div>
  
      
    )
 }

export default Home