import {useEffect, useState} from 'react'
import axios from 'axios'
import Seats from './Seats'
import ReservationData from './ReservationData'
import '../../../Styles/ReserveSeats.scss'
import BoardingPass from '../BoardingPass'
import ReturnCard from '../ReturnCard'

const ReserveSeats = ({flightID, returnFlight}) => {
    const [flight, setFlight] = useState(null)
    const [FirstSeats, setFirstSeats] = useState(0)
    const [EconomySeats, setEconomySeats] = useState(0)
    const [BusinessSeats, setBusinessSeats] = useState(0)
    const [selectedSeats, setSelectedSeats]= useState([])
    const [price, setPrice] = useState(0)
    useEffect(() => {
        const getFlight = async () => {
          const { data } = await axios.get(
            "http://localhost:8000/admin/get_flight/619e5b03e877fda48de395e3"
          );
          setFlight(data);
        };
        getFlight();
    }, []);
    useEffect(() => {
        if(flight)
            setPrice(FirstSeats*flight.FirstClassPrice + BusinessSeats*flight.BusinessPrice + EconomySeats*flight.EconomyPrice)
    },[FirstSeats, EconomySeats, BusinessSeats])
    
    useEffect(() => {
        const body = document.querySelector('body')
        body.classList.add('seats')
          return () => {
            const body = document.querySelector('body')
            body.classList.remove('seats')
          }
      },[])


    return (
        flight ? 
        <>
        {!returnFlight ? <h3  className='subtitle'>Departure Flight Seats</h3> : <h3 className='subtitle'>Return Flight Seats</h3>}
        <div className="plane-container">
            
            <div className="plane">
                <div className="cockpit">
                <ReservationData returnFlight={returnFlight} from={flight.DepartureCity} to={flight.ArrivalCity} totalSeats={FirstSeats+EconomySeats+BusinessSeats} price={price} />
                </div>
                <div className="exit exit--front fuselage"></div>
                <div className="row-container body ">
                    <ul class="showcase">
                        <li>
                            <div class="seat"></div>
                            <small>N/A</small>
                        </li>
                        <li>
                            <div class="seat selected"></div>
                            <small>Selected</small>
                        </li>
                        <li>
                            <div class="seat occupied"></div>
                            <small>Occupied</small>
                        </li>
                    </ul>
                    <h5 className='subtitle'>First Class <b className="b">{flight.FirstClassPrice}L.E</b></h5>
                    <Seats 
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    numberOfSeats={FirstSeats}
                    setNumberOfSeats={setFirstSeats}
                    seats={flight.FirstClassSeats}
                      />

                    <h5 className='subtitle'>Bussiness Class <b className="b">{flight.BusinessPrice}L.E</b></h5>
                    <Seats 
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    numberOfSeats={BusinessSeats}
                    setNumberOfSeats={setBusinessSeats}
                    seats={flight.BusinessSeats}/>

                    <h5 className='subtitle'>Economy Class <b className="b">{flight.EconomyPrice}L.E</b></h5>
                    <Seats
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                    numberOfSeats={EconomySeats}
                    setNumberOfSeats={setEconomySeats} 
                    seats={flight.EconomySeats}/>
                </div>
                <div class="exit exit--front fuselage"></div>
            </div>
            <div className="plane-card">
                <ReturnCard />
            </div>

        </div>
        </>
        
        : <></>
    )
}

export default ReserveSeats