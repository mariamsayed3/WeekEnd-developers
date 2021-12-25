import { Result, Button } from 'antd';
import axios from 'axios';
import {useState, useEffect} from 'react'
import Loader from '../General/Loader'
import {Link} from "react-router-dom"
const EditPaymentSuccess = () => {
    const [loading, setLoading] = useState(true)
    const edit = JSON.parse(sessionStorage.getItem('editBooking'))
    const book = async () => {
        if(edit){
            const {Token, changedSeats, newSeats, booking, oldChildren} = edit
            await axios.patch('http://localhost:8000/user/edit_reservation', {Token, changedSeats, newSeats, booking, oldChildren})
            sessionStorage.removeItem("editBooking")
        }
        setLoading(false)
    }
    useEffect(() => {
        book()
    }, [])
    if(loading)
        return <Loader/>

    return (

        <Result
        style={{marginTop: '10%'}}
        status="success"
        title="Successfully Edited Tickets!"
        subTitle="We are looking forward to having you again. Thank you for using Jet Away services!"
        extra={[
            <Link to="/my_reservations">
                <Button type="primary" key="console">
                    My Reservations
                </Button>
           </Link>
            
    ]}
  />
    )


}

export default EditPaymentSuccess