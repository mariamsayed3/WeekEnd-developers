import { useState } from "react";
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
  booking,
}) {
  const [overlay, setOverlay] = useState(false);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [fromAirport, setFromAirport] = useState();
  const [toAirport, setToAirport] = useState();
  const [flightDate, setFlightDate] = useState();
  const [returnFlight, setReturnFlight] = useState();
  let arr, arr2;
  const handleclick = () => {
    setOverlay(!overlay);
  };
  const getLocation = (location) => {
    let res = [];
    res.push(location.substring(0, 3));
    let str = "";
    for (let i = 5; i < location.length; i++) {
      if (location.charAt(i) != ",") str += location.charAt(i);
      else {
        res.push(str);
        str = "";
        i += 1;
      }
    }
    res.push(str);
    return res;
  };
  const handleFilter = () => {
    setOrigin(from);
    let arr = getLocation(origin);
    setFromAirport(arr[1]);
    setDestination(to);
    let arr2 = getLocation(destination);
    setToAirport(arr2[1]);
    if (!isReturn) setDepartureDate(flightDate);
    if (isReturn) {
      setReturnDate(returnFlight);
    }
  };
  if (origin) {
    arr = getLocation(origin);
  }
  if (destination) {
    arr2 = getLocation(destination);
  }

  return (
    <div className="filter-header-container">
      <div className="filter-header">
        <section>
          <label>
            {booking && booking.DepartureAirport
              ? booking.DepartureAirport
              : from
              ? from
              : arr
              ? arr[1]
              : "Not Specified Yet"}
            {" - "}
            {booking && booking.ArrivalAirport
              ? booking.ArrivalAirport
              : to
              ? to
              : arr2
              ? arr2[1]
              : "Not Specified Yet"}
          </label>
          <label>
            {booking && booking.DepartureDate
              ? booking.DepartureDate.substring(0, 10)
              : flightDate
              ? flightDate
              : departureDate
              ? departureDate
              : "Not Specified Yet"}
          </label>
        </section>
        <section>
          <label>
            {booking && booking.ArrivalAirport
              ? booking.ArrivalAirport
              : to
              ? to
              : arr2
              ? arr2[1]
              : "Not Specified Yet"}
            {" - "}
            {booking && booking.DepartureAirport
              ? booking.DepartureAirport
              : from
              ? from
              : arr
              ? arr[1]
              : "Not Specified Yet"}
          </label>
          <label>
            {returnFlight
              ? returnFlight
              : returnDate
              ? returnDate
              : "Not Specified Yet"}
          </label>
        </section>
        <button onClick={handleclick}>Edit</button>
      </div>
      <div className={!overlay ? "filter-footer none" : "filter-footer"}>
        <section>
          <input
            type="text"
            placeholder="From"
            onChange={!isReturn ? (x) => setFrom(x.target.value) : ""}
          />
          <input
            type="text"
            placeholder="To"
            onChange={!isReturn ? (x) => setTo(x.target.value) : ""}
          />
          <DatePicker
            placeholder="Departure Date"
            onChange={
              isReturn
                ? (x, y) => setReturnFlight(y)
                : (x, y) => setFlightDate(y)
            }
            style={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "5px",
              maxWidth: "250px",
              height: "50px",
            }}
          />
          <button onClick={handleFilter}>Search</button>
        </section>
      </div>
    </div>
  );
}

export default FlightHeader;
