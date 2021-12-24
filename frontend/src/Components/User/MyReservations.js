import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "../../Styles/Boardingstyle.scss";
import { Button, Result } from "antd";
import { UserContext } from "../../Context";
import Loader from '../General/Loader';
import BoardingPass from './BoardingPass';
import EmptyList from './EmptyList'

const MyReservations = () =>{
    const { Token} = useContext(UserContext);
    const [Reservation, setReservation] = useState(false); 
    // const [ReservationTrips, setReservationTrips] = useState([]); 
    const [loading, setLoading] = useState(true);

   
    // const GetPairs= (data) =>{
    //     for (let i = 0; i < data.length; i+=2) {
    //         let Pair = { Departure: data[i], Return: data[i+1]}
    //         let updatedRes =  ReservationTrips.push(Pair);
    //         setReservationTrips(updatedRes);
    //         }
    //     }

    useEffect(() => {
        const getFlights = async () => {
            const { data } = await axios.get(
            `http://localhost:8000/user/get_current_flights/${Token}`
            );
            setReservation(data);
            console.log(data);
            // GetPai drs(data);
            setLoading(false);
        };
        getFlights();
        }, []);

    if(loading){
        return <Loader />
    }

    if(Reservation.length==0){
        return <EmptyList msg={`You do not have any current reservations with Jet Away . Would you like to reserve a flight?`} buttonText={`Yes!`} path={'/available_flights'} />
       }

    return Reservation?
 (

     <div style={{display:'flex', alignItems:"center", justifyContent:"center",flexWrap:'wrap', marginTop:'5%', width:'50%', marginLeft: '25%' }}>
    <>
        {
       
        Reservation.map(({ Booking, Flight }) => {
       
            return (
                <>
                <BoardingPass Booking={Booking} Flight={Flight} />
                {/* <BoardingPass Booking={Return.Booking} Flight={Return.Flight} /> */}
                </>
            );
        })}
   
    </>
   </div>
    ) : (
        <>
          <Result
            title="You have no Reservations"
            extra={
              <Button
                type="link"
                key="home"
                href="/home"
                style={{ color: "lilac" }}
              >
                Go Home
              </Button>
            }
          />
        </>
      );
}

export default MyReservations