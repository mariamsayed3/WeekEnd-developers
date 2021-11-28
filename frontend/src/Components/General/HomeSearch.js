import TextField from '@mui/material/TextField';
import { DatePicker, Button } from 'antd';
import '../../Styles/Test.scss'

const HomeSearch = () =>{
    const onChange = (e) =>{

    }
    return (
        <div className='search-form'>
            <span> Where would you like to go?</span>
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