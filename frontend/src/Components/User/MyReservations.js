import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import "../../Styles/Boardingstyle.scss";
import { Button, Result , Divider, Popconfirm, Modal} from "antd";
import { UserContext } from "../../Context";
import Loader from '../General/Loader';
import BoardingPass from './BoardingPass';
import EmptyList from './EmptyList'
import Weather from './Weather/Weather'
import SummaryModal from './SummaryModal'

const MyReservations = () =>{
  const { Token, FirstName, LastName, Email } = useContext(UserContext);
  const [Reservation, setReservation] = useState(false);
  const[ReservationTrips, setReservationTrips] = useState([])
  const [success, setSuccess] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);



  const cancel_reservation = async (ReservationNumber) => {
    let ReturnReservation = {}
    for(let i = 0 ; i < Reservation.length ; i++){
      const currentReservationNumber = Reservation[i].Booking.ReservationNumber
      if(ReservationNumber === currentReservationNumber){
        if(i % 2 == 0)
          ReturnReservation = Reservation[i+1]
        else
          ReturnReservation = Reservation[i-1]
        break
      }
    }
    try {
      const { data } = await axios.patch(
        `http://localhost:8000/user/cancel_reservation/${ReservationNumber}`
      );
      const { data1 } = await axios.patch(
        `http://localhost:8000/user/cancel_reservation/${ReturnReservation.Booking.ReservationNumber}`
      );
      await axios({
        method: "post",
        url: "http://localhost:8000/user/email_cancellation",
        data: {
          email: Email,
          FirstName,
          LastName,
          ReturnPrice: ReturnReservation.Booking.TotalPrice,
          ...data[0],
        },
      });
      // showModal();
      window.location.reload()
  
    } catch (error) {
      console.log(error)
      setSuccess(false);
      setErrorMsg(null);
      // showModal();
    }
  };

  
   
    const GetPairs = (data) => {
        for (let i = 0; i < data.length; i+=2) {
            let Pair = { Departure: data[i], Return: data[i+1]}
            ReservationTrips.push(Pair);
            setReservationTrips(ReservationTrips);
            }
        }

    useEffect(() => {
        const getFlights = async () => {
            const { data } = await axios.get(
            `http://localhost:8000/user/get_current_flights/${Token}`
            );
            setReservation(data);
            GetPairs(data);
            setLoading(false);
        };
        getFlights();
        }, []);

    if(loading){
        return <Loader />
    }

    if(ReservationTrips.length==0)
      return <EmptyList msg={`You do not have any current reservations with Jet Away . Would you like to reserve a flight?`} buttonText={`Yes!`} path={'/available_flights'} />
       
    return ReservationTrips.length?
    (
     <div style={{display:'flex', alignItems:"center", justifyContent:"center",flexWrap:'wrap', marginTop:'5%', }}>
    <>
        {
       
        ReservationTrips.map(({ Departure, Return }, index) => {
            return (
                <>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <div style={{display: 'flex', flexDirection: 'row', margin: '20px', alignItems: 'center'}}>
                  <div id={`departure${index}`}>
                    <BoardingPass id={`departure${index}`} Booking={Departure.Booking} Flight={Departure.Flight} />
                  </div>
                  <div id={`return${index}`}>
                    <BoardingPass id={`return${index}`} Booking={Return.Booking} Flight={Return.Flight} />
                  </div>
                  </div>
                  <div style={{display:'flex', flexDirection:'row', top:'200px',  width:'300px'}}>
                <Popconfirm

                    title="Are you sure you want to cancel your reservation？"
                    onConfirm={() =>
                      cancel_reservation(Departure.Booking.ReservationNumber)
                    }
                    okText="Yes"
                    cancelText="No"
                    >
                    <Button  type="danger"> Cancel Reservation </Button>
                    </Popconfirm>
                    <SummaryModal Departure= {Departure} Return= {Return}/>
                </div>
                </div>
                
               
                <Weather City1={Departure.Flight.ArrivalAirport} City2={Return.Flight.ArrivalAirport} />
               
               
                <Divider style= {{backgroundColor: 'black'}}/>

               
                
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