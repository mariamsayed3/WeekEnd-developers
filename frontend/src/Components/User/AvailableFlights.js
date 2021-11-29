import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DepartureCard from "./DepartureCard";
import ReturnCard from "./ReturnCard";
import UserFilter from "./UserFilter";
import "../../Styles/UserFilter.scss";
import { useContext } from "react";
import { UserContext } from "../../Context";

function AvailableFlights(props) {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const { state } = useLocation();
  const { Token, Email } = useContext(UserContext);
  //const {Email} = useContext(UserContext);
  let isReturn, ReturnFlight, FirstBooking;
  if (state) {
    isReturn = state.isReturn;
    ReturnFlight = state.ReturnFlight;
    FirstBooking = state.FirstBooking;
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
  const [filteredLength, setFilteredLength] = useState(0);

  const getFlights = (price, departureTime, cabinClass, duration, children, adults, departureTerminal, arrivalTerminal, flight) => {
    // if((flight.EconomyPrice >= price[0] && flight.EconomyPrice < price[1]) || (flight.BusinessPrice >= price[0] && flight.BusinessPrice < price[1]) || (flight.FirstClassPrice >= price[0] && flight.FirstClassPrice < price[1])){
    //   return false;
      // }
    if((!(flight.EconomyPrice >= price[0] && flight.EconomyPrice < price[1]) || !(flight.BusinessPrice >= price[0] && flight.BusinessPrice < price[1]) || !(flight.FirstClassPrice >= price[0] && flight.FirstClassPrice < price[1])))
      return false;
    if(flight.TripDuration.substring(0,2) >= duration)
      return false;
    if(flight.NumberOfPassengers.Children > children)
      return false;
    if(flight.NumberOfPassengers.Adults > adults)
      return false;
    if(departureTerminal !== "" && !flight.DepartureTerminal.toLowerCase().includes(departureTerminal.toLowerCase()))
      return false;
    if(arrivalTerminal !== "" && !flight.ArrivalTerminal.toLowerCase().includes(arrivalTerminal.toLowerCase()))
      return false;
    if(!departureTime.midnight && (parseInt(flight.DepartureTime) >= 0 && parseInt(flight.DepartureTime) < 6))
      return false;
    if(!departureTime.morning && (parseInt(flight.DepartureTime) >= 6 && parseInt(flight.DepartureTime) < 12))
      return false;
    if(!departureTime.noon && (parseInt(flight.DepartureTime) >= 12 && parseInt(flight.DepartureTime) < 18))
      return false;
    if(!departureTime.night && (parseInt(flight.DepartureTime) >= 18 && parseInt(flight.DepartureTime) < 24))
      return false;
    if(cabinClass.first && flight.FirstClassAvailableSeats==0)
      return false;
    if(cabinClass.business && flight.BusinessAvailableSeats==0)
      return false;
    if(cabinClass.economy && flight.EconomyAvailableSeats==0)
      return false;
    else
      return true;
    
      

  }
  //console.log(flight.DepartureTime.parseInt());
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
      } 
      
      else {
        if(Email)
        data = (
          await axios.get(
            `http://localhost:8000/user/available_flights/${Token}`
          )
        ).data;
        else
        data = (
          await axios.get(
            `http://localhost:8000/user/all_flights/`
          )
        ).data;
      }
      setFlights(data);
    };
    getFlights();
  }, []);
  
  useEffect(() => {
    let arr;
    if (filteredFlights.length === 0) arr = flights;
    else arr = filteredFlights;
    //return filter ones coming from destintion to origin
    if (state) {
      //arrival date is the new destination date if coming from home search
      // if (searchCriteria.arrivalDate != "") {
      //   setFilteredFlights(
      //     arr.filter((flight) =>
      //       flight.DepartureDate.includes(searchCriteria.ArrivalDate)
      //     )
      //   );
      // }
    } else {
      
      //All available flights
      setFilteredFlights(flights);
      
      //home search flights
      // if (searchCriteria.origin != "") {
      //   setFilteredFlights(
      //     arr.filter((flight) =>
      //       flight.DepartureAirport.toLowerCase().includes(
      //         searchCriteria.origin.toLowerCase()
      //       )
      //     )
      //   );
      // }
      // if (searchCriteria.destination != "") {
      //   setFilteredFlights(
      //     arr.filter((flight) =>
      //       flight.ArrivalAirport.toLowerCase().includes(
      //         searchCriteria.destination.toLowerCase()
      //       )
      //     )
      //   );
      // }
      // if (searchCriteria.travelDate != "") {
      //   setFilteredFlights(
      //     arr.filter((flight) =>
      //       flight.DepartureDate.includes(searchCriteria.travelDate)
      //     )
      //   );
      // }
    } 
    setFilteredLength(filteredFlights.length)
    
  }, [flights, filteredFlights.length]);

  useEffect(() => {
    // let priceFilter = filteredFlights.filter((flight) => (flight.EconomyPrice >= price[0] && flight.EconomyPrice < price[1]) || (flight.BusinessPrice >= price[0] && flight.BusinessPrice < price[1]) || (flight.FirstClassPrice >= price[0] && flight.FirstClassPrice < price[1]));
    // let childrenFilter = filteredFlights.filter((flight) => (flight.NumberOfPassengers.Children <= children));
    // let adultsFilter = filteredFlights.filter((flight) => (flight.NumberOfPassengers.Adults <= adults));
    // let durationFilter = filteredFlights.filter((flight) => (flight.TripDuration.substring(0,2) < duration));

    //let common = priceFilter.filter(value => childrenFilter.includes(value) && adultsFilter.includes(value) && durationFilter.includes(value));
    
    let common = filteredFlights.filter((flight) => getFlights(price, departureTime, cabinClass, duration, children, adults, departureTerminal, arrivalTerminal, flight))
    filteredFlights.map((flight) => console.log(getFlights(price, departureTime, cabinClass, duration, children, adults, departureTerminal, arrivalTerminal, flight)))
    setFiltered(common);



  }, [filteredFlights, price, departureTime, cabinClass, duration, children, adults, departureTerminal, arrivalTerminal]);
  
  // //   const location = useLocation();
  // //   const [searchCriteria, setSearchCriteria] = useState(
  // //     location.state.search.searchCriteria
  // //   );
  // //   const [flights, setFlights] = useState(location.state.flights.flights);
  // //   const [filteredFlights, setFilteredFlights] = useState([]);

  // // location.state.return
  // //const [isReturn, setReturn] = useState(false);
  // //const returnFlight = location.state.returnFlight

  // //   useEffect(() => {
  // //     setFilteredFlights(flights);
  // //     let arr;
  // //     if (filteredFlights.length === 0) arr = flights;
  // //     else arr = filteredFlights;
  // //     if (searchCriteria.origin != "") {
  // //       setFilteredFlights(
  // //         arr.filter((flight) =>
  // //           flight.DepartureAirport.toLowerCase().includes(
  // //             searchCriteria.origin.toLowerCase()
  // //           )
  // //         )
  // //       );
  // //     }
  // //     if (searchCriteria.destination != "") {
  // //       setFilteredFlights(
  // //         arr.filter((flight) =>
  // //           flight.ArrivalAirport.toLowerCase().includes(
  // //             searchCriteria.destination.toLowerCase()
  // //           )
  // //         )
  // //       );
  // //     }
  // //     if (searchCriteria.travelDate != "") {
  // //       setFilteredFlights(
  // //         arr.filter((flight) =>
  // //           flight.DepartureDate.includes(searchCriteria.travelDate)
  // //         )
  // //       );
  // //     }
  // //   }, []);

  return (
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
  );
}

export default AvailableFlights;
