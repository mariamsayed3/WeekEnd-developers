import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import DepartureCard from "./DepartureCard";
import ReturnCard from "./ReturnCard";
import UserFilter from "./UserFilter";
import "../../Styles/UserFilter.scss";

function AvailableFlights(props) {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    const getFlights = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/admin/get_all_flights"
      );
      setFlights(data);
    };
    getFlights();
  }, []);
  const { state } = useLocation();
  let isReturn, ReturnFlight, FirstBooking;
  if (state) {
    isReturn = state.isReturn;
    ReturnFlight = state.ReturnFlight;
    FirstBooking = state.FirstBooking;
  }

  useEffect(() => {
    let arr;
    if (filteredFlights.length === 0) arr = flights;
    else arr = filteredFlights;
    //return flight filter ones coming from destintion to origin
    if (state) {
      console.log("return");
      setFilteredFlights(
        arr.filter((flight) => flight.Departure.includes(ReturnFlight.Arrival))
      );
      //arrival date is the new destination date if coming from home search
      // if (searchCriteria.arrivalDate != "") {
      //   setFilteredFlights(
      //     arr.filter((flight) =>
      //       flight.DepartureDate.includes(searchCriteria.ArrivalDate)
      //     )
      //   );
      // }
    } else {
      console.log("departure");
      //All available flights
      setFilteredFlights(arr);
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
  }, [filteredFlights, flights]);

  console.log(filteredFlights);

  //   const location = useLocation();
  //   const [searchCriteria, setSearchCriteria] = useState(
  //     location.state.search.searchCriteria
  //   );
  //   const [flights, setFlights] = useState(location.state.flights.flights);
  //   const [filteredFlights, setFilteredFlights] = useState([]);

  // location.state.return
  //const [isReturn, setReturn] = useState(false);
  //const returnFlight = location.state.returnFlight

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
    <div className="available-container">
      <UserFilter />

      <div className="cards">
        {filteredFlights.map((flight) => {
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
