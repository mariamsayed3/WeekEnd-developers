import { useEffect, useState } from "react";
import Seats from "./Seats";
import ReservationData from "./ReservationData";
import "../../../Styles/ReserveSeats.scss";
import { useLocation } from "react-router";
import View from "../ViewFlightDetails/View";

const ReserveSeats = () => {
  const { state } = useLocation();
  const flight = state.DepartureFlight;
  const isReturn = state.isReturn;
  const FirstBooking = state.FirstBooking;

  const [FirstSeats, setFirstSeats] = useState(0);
  const [EconomySeats, setEconomySeats] = useState(0);
  const [BusinessSeats, setBusinessSeats] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(
      FirstSeats * flight.FirstClassPrice +
        BusinessSeats * flight.BusinessPrice +
        EconomySeats * flight.EconomyPrice
    );
  }, [FirstSeats, EconomySeats, BusinessSeats]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("seats");
    return () => {
      const body = document.querySelector("body");
      body.classList.remove("seats");
    };
  }, []);

  return flight ? (
    <>
      {!isReturn ? (
        <h3 className="subtitle">Departure Flight Seats</h3>
      ) : (
        <h3 className="subtitle">Return Flight Seats</h3>
      )}
      <div className="plane-container">
        <div className="plane-body">
          <div className="cockpit">
            <ReservationData
              FirstBooking={FirstBooking}
              selectedSeats={selectedSeats}
              isReturn={isReturn}
              flight={flight}
              totalSeats={FirstSeats + EconomySeats + BusinessSeats}
              price={price}
            />
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
            <h5 className="subtitle">
              First Class <b className="b">{flight.FirstClassPrice}L.E</b>
            </h5>
            <Seats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              numberOfSeats={FirstSeats}
              setNumberOfSeats={setFirstSeats}
              seats={flight.FirstClassSeats}
              FirstBooking={FirstBooking}
            />

            <h5 className="subtitle">
              Bussiness Class <b className="b">{flight.BusinessPrice}L.E</b>
            </h5>
            <Seats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              numberOfSeats={BusinessSeats}
              setNumberOfSeats={setBusinessSeats}
              seats={flight.BusinessSeats}
              FirstBooking={FirstBooking}
            />

            <h5 className="subtitle">
              Economy Class <b className="b">{flight.EconomyPrice}L.E</b>
            </h5>
            <Seats
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              numberOfSeats={EconomySeats}
              setNumberOfSeats={setEconomySeats}
              seats={flight.EconomySeats}
              FirstBooking={FirstBooking}
            />
          </div>
          <div class="exit exit--front fuselage"></div>
        </div>
        <div className="plane-card">
          <View flight={flight}/>
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ReserveSeats;
