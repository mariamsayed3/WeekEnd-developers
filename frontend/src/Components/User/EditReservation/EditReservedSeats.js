import EditReservationData from './EditReservationData'
import { useLocation } from 'react-router-dom';
import {useEffect, useState} from 'react'
import Seats from './Seats'
import View from '../ViewFlightDetails/View'
const EditReservedSeats = () => {
    const {Booking, Flight} = useLocation().state
    const flight = Flight

    const [FirstSeats, setFirstSeats] = useState(0);
    const [EconomySeats, setEconomySeats] = useState(0);
    const [BusinessSeats, setBusinessSeats] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [previouslySelectedSeats, setPreviouslySelectedSeats] = useState(Booking.Seats);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        setPrice(
          FirstSeats * flight.FirstClassPrice +
            BusinessSeats * flight.BusinessPrice +
            EconomySeats * flight.EconomyPrice
        );
      }, [FirstSeats, EconomySeats, BusinessSeats]);

    return (
        <div className="plane-container">
        <div className="plane-body">
          <div className="cockpit">
            <EditReservationData
              selectedSeats={selectedSeats}
              flight={Flight}
              totalSeats={FirstSeats + EconomySeats + BusinessSeats}
              price={price}
              booking={Booking}

            />
          </div>
          <div className="exit exit--front fuselage"></div>
          <div className="row-container body ">
            <ul className="showcase">
              <li>
                <div className="seat"></div>
                <small>N/A</small>
              </li>
              <li>
                <div className="seat selected"></div>
                <small>Selected</small>
              </li>
              <li>
                <div className="seat occupied"></div>
                <small>Occupied</small>
              </li>
            </ul>
            <h5 className="subtitle">
              First Class <b className="b">{flight.FirstClassPrice}$</b>
            </h5>
            <Seats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              numberOfSeats={FirstSeats}
              setNumberOfSeats={setFirstSeats}
              seats={flight.FirstClassSeats}
              previouslySelectedSeats={previouslySelectedSeats}
            />

            <h5 className="subtitle">
              Bussiness Class <b className="b">{flight.BusinessPrice}$</b>
            </h5>
            <Seats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              numberOfSeats={BusinessSeats}
              setNumberOfSeats={setBusinessSeats}
              seats={flight.BusinessSeats}
              previouslySelectedSeats={previouslySelectedSeats}
            />

            <h5 className="subtitle">
              Economy Class <b className="b">{flight.EconomyPrice}$</b>
            </h5>
            <Seats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              numberOfSeats={EconomySeats}
              setNumberOfSeats={setEconomySeats}
              seats={flight.EconomySeats}
              previouslySelectedSeats={previouslySelectedSeats}
            />
          </div>
          <div className="exit exit--front fuselage"></div>
        </div>
        <div className="plane-card">
          <View flight={flight}/>
        </div>
      </div>
    )
}

export default EditReservedSeats