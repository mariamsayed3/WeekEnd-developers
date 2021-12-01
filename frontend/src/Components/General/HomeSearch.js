import TextField from '@mui/material/TextField';
import { DatePicker, Button } from 'antd';
import { useContext, useState } from 'react';
import { UserContext } from '../../Context';
import {Link} from 'react-router-dom'
import '../../Styles/Home.scss'
import moment from 'moment';

const HomeSearch = () =>{
    const {FirstName, Admin} = useContext(UserContext)
    const [data, setData] = useState({})
    function disabledDate(current) {
        return current && current < moment().endOf('day');
    }

    return (
        <div className='search-form'>
            <span className="welcome-message">Welcome {FirstName ? `back ${FirstName}` : 'to Jet away! '}</span>
            <span> {Admin ? 'Manage some flights?' : 'Looking for a trip?'}</span>
            <TextField 
                onChange={(e) =>
                    setData({ ...data, origin: e.target.value })} 
                style = {{backgroundColor: 'white', margin:'10px', width:'95%'}} id="outlined-basic" label="From" variant="outlined" />
            <TextField 
                onChange={(e) =>
                    setData({ ...data, destination: e.target.value })} 
                style = {{backgroundColor: 'white', margin:'10px',  width:'95%'}} id="outlined-basic" label="To" variant="outlined" />
            <div style={{display:'flex', flexDirection:'row', width:'100%'}}>
         
            <DatePicker placeholder="Departure Date"
                di
                disabledDate={disabledDate}
                onChange={(date, dateString) => {
                    setData({
                      ...data,
                      departureDate: dateString
                    });
                  }}
                style = {{backgroundColor: 'white', margin:'10px',  width:'100%', height:'40px'}}  />
      
            <DatePicker placeholder="Return Date"  
            disabledDate={disabledDate}
            onChange={(date, dateString) => {
                setData({
                  ...data,
                  returnDate: dateString
                });
              }}
             style = {{backgroundColor: 'white', margin:'10px',  width:'100%', height:'40px'}}  />
            </div>
            <Button style={{ width:'50%', margin: '10px', marginLeft: '20%' , color:'white', backgroundColor: '#2193b0'}} size='large'> 
                <Link to={{ pathname: '/available_flights', state: data }} > 
                    Search 
                </Link>
          </Button>
        </div>
    )

}

export default HomeSearch