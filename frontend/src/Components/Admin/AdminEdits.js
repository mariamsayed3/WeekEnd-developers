import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import FlightDetails from "./FlightDetails";
import "antd/dist/antd.css";
import "../../Styles/search.scss";
import UserFilter from "../User/UserFilter";
import DepartureCard from "../User/DepartureCard";

export default function AdminEdits() {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [flightNumber, setFlightNumber] = useState("");
  const [dep, setDep] = useState("");
  const [arr, setArr] = useState("");
  const [depDate, setDepDate] = useState();
  const [price, setPrice] = useState([0, 100000]);
  const [children, setChildren] = useState(100);
  const [adults, setAdults] = useState(1000);
  const [duration, setDuration] = useState("24");
  const [arrivalTerminal, setArrivalTerminal] = useState("");
  const [departureTerminal, setDepartureTerminal] = useState("");
  const [departureTime, setDepartureTime] = useState({
    midnight: true,
    morning: true,
    noon: true,
    night: true,
  });
  const [cabinClass, setCabinClass] = useState({
    first: true,
    business: true,
    economy: true,
  });
  const getFlights = (
    flightNumber,
    dep,
    arr,
    depDate,
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
    if (!flight.FlightNumber.includes(flightNumber)) return false;
    if (
      !flight.Departure.toLowerCase().includes(dep.toLowerCase()) &&
      !flight.DepartureAirport.toLowerCase().includes(dep.toLowerCase()) &&
      !flight.DepartureCountry.toLowerCase().includes(dep.toLowerCase())
    )
      return false;
    if (
      !flight.Arrival.toLowerCase().includes(arr.toLowerCase()) &&
      !flight.ArrivalAirport.toLowerCase().includes(arr.toLowerCase()) &&
      !flight.ArrivalCountry.toLowerCase().includes(arr.toLowerCase())
    )
      return false;
    if (depDate && flight.DepartureDate.substring(0, 10) !== depDate)
      return false;
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
    if (cabinClass.first && flight.FirstClassAvailableSeats === 0) return false;
    if (cabinClass.business && flight.BusinessAvailableSeats === 0) return false;
    if (cabinClass.economy && flight.EconomyAvailableSeats === 0) return false;
    return true;
  };

  useEffect(() => {
    const getFlights = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/admin/get_all_flights"
      );
      setFlights(data);
    };
    getFlights();
  }, []);
  useEffect(() => {
    let common = flights.filter((flight) =>
      getFlights(
        flightNumber,
        dep,
        arr,
        depDate,
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
    setFilteredFlights(common);
  }, [
    flights,
    filteredFlights,
    flightNumber,
    dep,
    arr,
    depDate,
    price,
    departureTime,
    cabinClass,
    duration,
    children,
    adults,
    departureTerminal,
    arrivalTerminal,
  ]);

  return (
    <div className="flights-container">
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
        setFlightNumber={setFlightNumber}
        isAdmin={true}
        setDep={setDep}
        setArr={setArr}
        setDepDate={setDepDate}
      />
      <div>
        {filteredFlights.map((flight) => {
          let id = flight._id;
          // return <FlightDetails idkey={id} myFlight={flight} key={id} />;
          return <DepartureCard isAdmin={true} flight={flight} idKey={flight._id} />;
        })}
      </div>
    </div>
  );
}
