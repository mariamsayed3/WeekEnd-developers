import { useState } from "react";
import "../../Styles/Filter.scss";
import { DatePicker } from "antd";
import DropDown from "../General/DropDown";

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
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();
  let arr1, arr2, arr3, arr4;
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
    setDestination(to);
    if (!isReturn) setDepartureDate(flightDate);
    if (isReturn) {
      setReturnDate(returnFlight);
    }
  };
  if (origin) {
    arr1 = getLocation(origin);
  }
  if (destination) {
    arr2 = getLocation(destination);
  }
  if (from && from.length > 3) {
    arr3 = getLocation(from);
  }
  if (to && to.length > 3) {
    arr4 = getLocation(to);
  }

  return (
    <div className="filter-header-container">
      <div className="filter-header">
        <section>
          <label style={{textAlign: 'center'}}>
            {booking && booking.DepartureAirport
              ? booking.DepartureAirport
              : arr3
              ? arr3[1]
              : from
              ? from
              : arr1
              ? arr1[1]
              : "Not Specified Yet"}
            {" - "}
            {booking && booking.ArrivalAirport
              ? booking.ArrivalAirport
              : arr4
              ? arr4[1]
              : to
              ? to
              : arr2
              ? arr2[1]
              : "Not Specified Yet"}
          </label>
          <label style={{textAlign: 'center'}}>
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
          <label style={{textAlign: 'center'}}>
            {booking && booking.ArrivalAirport
              ? booking.ArrivalAirport
              : arr4
              ? arr4[1]
              : to
              ? to
              : arr2
              ? arr2[1]
              : "Not Specified Yet"}
            {" - "}
            {booking && booking.DepartureAirport
              ? booking.DepartureAirport
              : arr3
              ? arr3[1]
              : from
              ? from
              : arr1
              ? arr1[1]
              : "Not Specified Yet"}
          </label>
          <label style={{textAlign: 'center'}}>
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
          <div>
            <input
            autoComplete="off"
              onClick={(e) => setSelectedFrom(false)}
              type="text"
              placeholder="From"
              value={from ? from : ""}
              onChange={!isReturn ? (x) => setFrom(x.target.value) : ""}
            />
            {from && from.length > 2 && (
              <DropDown
                component="from"
                term={from}
                selected={selectedFrom}
                setSelected={setSelectedFrom}
                setData={""}
                data={""}
                setFrom={setFrom}
                from={from}
                setTo={setTo}
                to={to}
              />
            )}
          </div>
          <div>
            <input
              autoComplete="off"
              onClick={(e) => setSelectedTo(false)}
              type="text"
              placeholder="To"
              value={to ? to : ""}
              onChange={!isReturn ? (x) => setTo(x.target.value) : ""}
            />
            {to && to.length > 2 && (
              <DropDown
                component="to"
                term={to}
                selected={selectedTo}
                setSelected={setSelectedTo}
                setData={""}
                data={""}
                setFrom={setFrom}
                from={from}
                setTo={setTo}
                to={to}
              />
            )}
          </div>
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
