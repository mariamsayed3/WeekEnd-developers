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
  const {state} = useLocation()
  const {Token} = useContext(UserContext)
  let isReturn, ReturnFlight, FirstBooking
  if(state){
    isReturn = state.isReturn
    ReturnFlight = state.ReturnFlight
    FirstBooking = state.FirstBooking
  }
    
  //   const location = useLocation();
  //   const [searchCriteria, setSearchCriteria] = useState(
  //     location.state.search.searchCriteria
  //   );
  //   const [flights, setFlights] = useState(location.state.flights.flights);
  //   const [filteredFlights, setFilteredFlights] = useState([]);

  // location.state.return
  //const [isReturn, setReturn] = useState(false);
  //const returnFlight = location.state.returnFlight

  const [flights, setFlights] = useState([]);

  if (isReturn) {
    //let x = searchCriteria.origin;
    //setSearchCriteria({ ...searchCriteria, origin: searchcriteria.destination, destination: x});
  }
  useEffect(() => {
    const getFlights = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/user/available_flights/${Token}`
      );
      setFlights(data);
    };
    getFlights();
  }, []);
  //   useEffect(() => {
  //     setFilteredFlights(flights);
  //     let arr;
  //     if (filteredFlights.length === 0) arr = flights;
  //     else arr = filteredFlights;
  //     if (searchCriteria.origin != "") {
  //       setFilteredFlights(
  //         arr.filter((flight) =>
  //           flight.DepartureAirport.toLowerCase().includes(
  //             searchCriteria.origin.toLowerCase()
  //           )
  //         )
  //       );
  //     }
  //     if (searchCriteria.destination != "") {
  //       setFilteredFlights(
  //         arr.filter((flight) =>
  //           flight.ArrivalAirport.toLowerCase().includes(
  //             searchCriteria.destination.toLowerCase()
  //           )
  //         )
  //       );
  //     }
  //     if (searchCriteria.travelDate != "") {
  //       setFilteredFlights(
  //         arr.filter((flight) =>
  //           flight.DepartureDate.includes(searchCriteria.travelDate)
  //         )
  //       );
  //     }
  //   }, []);

  return (
    <div>
      <div>
        {flights.map((flight) => {
          return (
            <>
              {!isReturn && <DepartureCard flight={flight} />}
              {isReturn && <ReturnCard FirstBooking={FirstBooking} flight={flight} />}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default AvailableFlights;
