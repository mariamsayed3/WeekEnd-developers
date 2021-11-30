import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DepartureCard from "./DepartureCard";
import ReturnCard from "./ReturnCard";
import UserFilter from "./UserFilter";
import "../../Styles/UserFilter.scss";
import { useContext } from "react";
import { UserContext } from "../../Context";
import FlightHeader from "./FlightHeader";
import Loader from "../General/Loader";

function AvailableFlights(props) {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [departureDate, setDepartureDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const { state } = useLocation();
  const { Token, Email } = useContext(UserContext);
  let isReturn, ReturnFlight, FirstBooking, FlightDetails;
  if (state) {
    isReturn = state.isReturn;
    ReturnFlight = state.ReturnFlight;
    FirstBooking = state.FirstBooking;
    FlightDetails = state.data;
  }
  const [price, setPrice] = useState([0, 100000]);
  const [children, setChildren] = useState(100);
  const [adults, setAdults] = useState(1000);
  const [duration, setDuration] = useState("24");
  const [arrivalTerminal, setArrivalTerminal] = useState("");
  const [departureTerminal, setDepartureTerminal] = useState("");
  const [departureTime, setDepartureTime] = useState({
    midnight: true,
    morning: false,
    noon: true,
    night: false,
  });
  const [cabinClass, setCabinClass] = useState({
    first: false,
    business: false,
    economy: true,
  });

  const getFlights = (
    price,
    departureTime,
    cabinClass,
    duration,
    children,
    adults,
    departureTerminal,
    arrivalTerminal,
    flight
  ) => {
    if (
      !(flight.EconomyPrice >= price[0] && flight.EconomyPrice < price[1]) ||
      !(flight.BusinessPrice >= price[0] && flight.BusinessPrice < price[1]) ||
      !(flight.FirstClassPrice >= price[0] && flight.FirstClassPrice < price[1])
    )
      return false;
    if (flight.TripDuration.substring(0, 2) >= duration) return false;
    if (flight.NumberOfPassengers.Children > children) return false;
    if (flight.NumberOfPassengers.Adults > adults) return false;
    if (
      departureTerminal !== "" &&
      !flight.DepartureTerminal.toLowerCase().includes(
        departureTerminal.toLowerCase()
      )
    )
      return false;
    if (
      arrivalTerminal !== "" &&
      !flight.ArrivalTerminal.toLowerCase().includes(
        arrivalTerminal.toLowerCase()
      )
    )
      return false;
    if (
      !departureTime.midnight &&
      parseInt(flight.DepartureTime) >= 0 &&
      parseInt(flight.DepartureTime) < 6
    )
      return false;
    if (
      !departureTime.morning &&
      parseInt(flight.DepartureTime) >= 6 &&
      parseInt(flight.DepartureTime) < 12
    )
      return false;
    if (
      !departureTime.noon &&
      parseInt(flight.DepartureTime) >= 12 &&
      parseInt(flight.DepartureTime) < 18
    )
      return false;
    if (
      !departureTime.night &&
      parseInt(flight.DepartureTime) >= 18 &&
      parseInt(flight.DepartureTime) < 24
    )
      return false;
    if (cabinClass.first && flight.FirstClassAvailableSeats == 0) return false;
    if (cabinClass.business && flight.BusinessAvailableSeats == 0) return false;
    if (cabinClass.economy && flight.EconomyAvailableSeats == 0) return false;
    else return true;
  };
  useEffect(() => {
    const getFlights = async () => {
      let data = [];
      if (isReturn) {
        data = (
          await axios.post(`http://localhost:8000/user/return_flights`, {
            Token,
            Departure: ReturnFlight.ArrivalAirport,
            Arrival: ReturnFlight.DepartureAirport,
            DepartureDate: ReturnFlight.DepartureDate,
          })
        ).data;
      } else {
        if (Email)
          data = (
            await axios.get(
              `http://localhost:8000/user/available_flights/${Token}`
            )
          ).data;
        else
          data = (await axios.get(`http://localhost:8000/user/all_flights/`))
            .data;
      }
      setFlights(data);
      setLoading(false);
    };
    getFlights();
  }, []);
  
  useEffect(() => {
    let arr = flights;
    //return filter ones coming from destintion to origin
    if (isReturn) {
      if (returnDate) {
        setFilteredFlights(
          arr.filter(
            (flight) =>
              flight.DepartureDate.substring(0, 10) == state.returnDate
          )
        );
      }
      setFilteredFlights(flights);
    } else {
      //All available flights
      setFilteredFlights(flights);
      if (!origin && state && state.origin) setOrigin(state.origin);
      if (!destination && state && state.destination)
        setDestination(state.destination);
      if (!departureDate && state && state.departureDate)
        setDepartureDate(state.departureDate);
      if (origin) {
        setFilteredFlights(
          arr.filter(
            (flight) =>
              flight.Departure.toLowerCase().includes(origin.toLowerCase()) ||
              flight.DepartureAirport.toLowerCase().includes(
                origin.toLowerCase()
              ) ||
              flight.DepartureCountry.toLowerCase().includes(
                origin.toLowerCase()
              )
          )
        );
      }
      if (destination) {
        setFilteredFlights(
          arr.filter(
            (flight) =>
              flight.Arrival.toLowerCase().includes(
                destination.toLowerCase()
              ) ||
              flight.ArrivalAirport.toLowerCase().includes(
                destination.toLowerCase()
              ) ||
              flight.ArrivalCountry.toLowerCase().includes(
                destination.toLowerCase()
              )
          )
        );
      }
      if (departureDate) {
        setFilteredFlights(
          arr.filter(
            (flight) => flight.DepartureDate.substring(0, 10) == departureDate
          )
        );
      }
      if (state && state.returnDate) {
        setReturnDate(state.returnDate);
      }
    }
  }, [flights, origin, destination, departureDate]);
  useEffect(() => {
    let common = filteredFlights.filter((flight) =>
      getFlights(
        price,
        departureTime,
        cabinClass,
        duration,
        children,
        adults,
        departureTerminal,
        arrivalTerminal,
        flight
      )
    );
    setFiltered(common);
  }, [
    filteredFlights,
    price,
    departureTime,
    cabinClass,
    duration,
    children,
    adults,
    departureTerminal,
    arrivalTerminal,
  ]);
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="mega-container">
        <FlightHeader
          origin={state && state.origin ? state.origin : undefined}
          setOrigin={setOrigin}
          destination={
            state && state.destination ? state.destination : undefined
          }
          setDestination={setDestination}
          departureDate={
            state && state.departureDate ? state.departureDate : undefined
          }
          setDepartureDate={setDepartureDate}
          returnDate={
            state && state.returnDate ? state.returnDate : undefined
          }
          setReturnDate={setReturnDate}
          isReturn={isReturn}
          booking = {ReturnFlight}
        />

        <div className="available-container">
          <UserFilter
            setPrice={setPrice}
            setDuration={setDuration}
            setArrivalTerminal={setArrivalTerminal}
            setDepartureTerminal={setDepartureTerminal}
            setChildren={setChildren}
            setAdults={setAdults}
            departureTime={departureTime}
            setDepartureTime={setDepartureTime}
            cabinClass={cabinClass}
            setCabinClass={setCabinClass}
          />

          <div className="cards">
            {filtered.map((flight) => {
              return (
                <>
                  {!isReturn && <DepartureCard flight={flight} />}
                  {isReturn && (
                    <ReturnCard FirstBooking={FirstBooking} flight={flight} />
                  )}
                </>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AvailableFlights;
