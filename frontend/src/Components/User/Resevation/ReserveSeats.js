import {useEffect, useState} from 'react'
import axios from 'axios'
import Seats from './Seats'
import ReservationData from './ReservationData'
import '../../../Styles/ReserveSeats.scss'

const ReserveSeats = ({flightID}) => {
    const [flight, setFlight] = useState(null)
    const [FirstSeats, setFirstSeats] = useState(0)
    const [EconomySeats, setEconomySeats] = useState(0)
    const [BusinessSeats, setBusinessSeats] = useState(0)
    const [selectedSeats, setSelectedSeats]= useState([])
    const [price, setPrice] = useState(0)
    useEffect(() => {
        const getFlight = async () => {
          const { data } = await axios.get(
            "http://localhost:8000/admin/get_flight/619e7b767e5f6cbca1e419cb"
          );
          setFlight(data);
        };
        getFlight();
    }, []);
    useEffect(() => {
        if(flight)
            setPrice(FirstSeats*flight.FirstClassPrice + BusinessSeats*flight.BusinessPrice + EconomySeats*flight.EconomyPrice)
    },[FirstSeats, EconomySeats, BusinessSeats])
    
    return (
        flight ? 
        <>
        <div className="layout">
            
            <div className="plane">
                <div className="cockpit">
                <ReservationData from={"Barcelona"} to={'California'} totalSeats={FirstSeats+EconomySeats+BusinessSeats} price={price} />
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
            </div>
        </>
        : <></>
    )
}

export default ReserveSeats