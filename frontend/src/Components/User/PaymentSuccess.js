import { Result, Button } from 'antd';
import axios from 'axios';
import {useState, useEffect} from 'react'
import Loader from '../General/Loader'
import {Link} from "react-router-dom"
const PaymentSuccess = () => {
    const [loading, setLoading] = useState(true)
    const booking = JSON.parse(sessionStorage.getItem('booking'))
    const book = async () => {
        if(booking){
            const {Token, Email, FirstName, LastName, FirstRequest, SecondRequest} = booking
            FirstRequest.from = booking.DepartureFlight.DepartureAirport
            FirstRequest.to = booking.DepartureFlight.ArrivalAirport

            SecondRequest.from = booking.ReturnFlight.DepartureAirport
            SecondRequest.to = booking.ReturnFlight.ArrivalAirport

            await axios.post(`/user/reserve/${booking.firstFlightID}`, booking.FirstRequest)
            await axios.post(`/user/reserve/${booking.secondFlightID}`, booking.SecondRequest)
            await axios.post(`/user/email_reservation`, {Token, Email , FirstName, LastName, FirstRequest, SecondRequest})
            await axios.post(`/user/summaries`,{Token,DepartureFlight: booking.DepartureFlight, ReturnFlight: booking.ReturnFlight, DepartureBooking: FirstRequest, ReturnBooking: SecondRequest})
            sessionStorage.removeItem("booking")
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
        title="Successfully Purchased Tickets!"
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

export default PaymentSuccess