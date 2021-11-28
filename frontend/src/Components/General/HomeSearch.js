import TextField from '@mui/material/TextField';
import { DatePicker, Button } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../Context';
import '../../Styles/Home.scss'

const HomeSearch = () =>{
    const {FirstName} = useContext(UserContext)
    const onChange = (e) =>{

    }
    return (
        <div className='search-form'>
            <span className="welcome-message">Welcome {FirstName ? `back ${FirstName}` : 'to Jet away! '}</span>
            <span> Looking for a trip?</span>
            <TextField style = {{backgroundColor: 'white', margin:'10px', width:'95%'}} id="outlined-basic" label="From" variant="outlined" />
            <TextField style = {{backgroundColor: 'white', margin:'10px',  width:'95%'}} id="outlined-basic" label="To" variant="outlined" />
            {/* <div style={{display:'flex', flexDirection:'row'}}> */}
            <DatePicker onChange={onChange} style = {{backgroundColor: 'white', margin:'10px',  width:'50%', height:'40px'}}  />
            <Button style={{ width:'50%', margin: '10px', marginLeft: '5px' , color:'white', backgroundColor: 'rgb(129, 122, 237'}} size='large'> Search </Button>
            {/* </div> */}
        </div>
    )

}

export default HomeSearch