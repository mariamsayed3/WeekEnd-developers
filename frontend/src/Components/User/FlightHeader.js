import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../Styles/Filter.scss";
import { DatePicker } from "antd";

function FlightHeader({
  origin,
  setOrigin,
  destination,
  setDestination,
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  isReturn,
  booking
}) {
  const [overlay, setOverlay] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [flightDate, setFlightDate] = useState();
  const [returnFlight, setReturnFlight] = useState();
  const handleclick = () => {
    setOverlay(!overlay);
  }
  const handleFilter = () => {
    setOrigin(from);
    setDestination(to);
    if(!isReturn)
      setDepartureDate(flightDate);
    
  }
  return (
    <div>
      <div className="filter-header-container">
        <div className="filter-header">
        <section>
            <label>{booking && booking.DepartureAirport ? booking.DepartureAirport : from ? from : origin ? origin : "Not Specified Yet"}{" - "}{booking && booking.ArrivalAirport ? booking.ArrivalAirport :to ? to : destination ? destination : "Not Specified Yet"}</label>
            <label>{booking && booking.DepartureDate ? booking.DepartureDate.substring(0,10) :flightDate? flightDate : departureDate ? departureDate : "Not Specified Yet"}</label>
          </section>
          <section>
          <label>{booking && booking.ArrivalAirport ? booking.ArrivalAirport :to ? to : destination ? destination : "Not Specified Yet"}{" - "}{booking && booking.DepartureAirport ? booking.DepartureAirport : from ? from : origin ? origin : "Not Specified Yet"}</label>
            <label>{departureDate ? departureDate : returnFlight? returnFlight : "Not Specified Yet"}</label>
          </section>
          {/* <section>
            <label>{from ? from : origin ? origin : "Not Specified Yet"}</label>
            <label>
              {to ? to : destination ? destination : "Not Specified Yet"}
            </label>
          </section>
          <section>
            <label>{from ? from : origin ? origin : "Not Specified Yet"}</label>
            <label>
              {to ? to : destination ? destination : "Not Specified Yet"}
            </label>
          </section> */}
          <button onClick={handleclick}>Edit</button>
        </div>
        <div className={!overlay?"filter-footer none":"filter-footer"}>
          <section>
            <input
              type="text"
              placeholder="From"
              onChange={
                !isReturn ? ((x) => setFrom(x.target.value)) : ""
              }
            />
            <input
              type="text"
              placeholder="To"
              onChange={
               !isReturn ? ((x) => setTo(x.target.value)) : ""
              }
            />
             <DatePicker
              placeholder="Departure Date"
              onChange={(
                isReturn ? (x, y) => setReturnFlight(y) : (x, y) => setFlightDate(y))
              
            }
              style={{
                backgroundColor: "#fff",
                border: "none",
                borderRadius:"5px",
                maxWidth: "250px",
                height: "50px",
              }}
            />
            <button onClick={handleFilter}>Search</button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default FlightHeader;