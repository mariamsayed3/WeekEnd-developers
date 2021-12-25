import TextField from "@mui/material/TextField";
import { DatePicker, Button } from "antd";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context";
import { Link } from "react-router-dom";
import "../../Styles/Home.scss";
import moment from "moment";
import DropDown from "./DropDown";
import axios from "axios";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyB1Fe3YdKoCOe-duaOOlNF8PoEOyAYC5Pw");

// set response language. Defaults to english.
Geocode.setLanguage("en");

const HomeSearch = () => {
  const { FirstName, Admin } = useContext(UserContext);
  const [data, setData] = useState({});
  const [selectedFrom, setSelectedFrom] = useState();
  const [selectedTo, setSelectedTo] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  function disabledDate(current) {
    return current && current < moment().endOf("day");
  }
  useEffect(() => {
    console.log("hello");
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
     
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      console.log(position);
    })
    axios
    .get("https://maps.googleapis.com/maps/api/geocode/json?latlng=30,31&amp;key=AIzaSyB1Fe3YdKoCOe-duaOOlNF8PoEOyAYC5Pw")
    .then(function (response) {
      if (response) console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
  }, [navigator.geolocation]);
  return (
    <div className="search-form">
      <span className="welcome-message">
        Welcome {FirstName ? `back ${FirstName}` : "to Jet away! "}
      </span>
      <span> {Admin ? "Manage some flights?" : "Looking for a trip?"}</span>
      <TextField
        autoComplete="off"
        onClick={(e) => setSelectedFrom(false)}
        onChange={(e) => {
          setData({ ...data, origin: e.target.value });
        }}
        value={data.origin}
        style={{ backgroundColor: "white", margin: "10px", width: "95%" }}
        id="outlined-basic"
        label="From"
        variant="outlined"
      />
      <div>
        {data.origin && data.origin.length > 2 && (
          <DropDown
            component="origin"
            term={data.origin}
            selected={selectedFrom}
            setSelected={setSelectedFrom}
            setData={setData}
            data={data}
            setFrom={""}
            from={""}
            setTo={""}
            to={""}
          />
        )}
      </div>
      <TextField
        autoComplete="off"
        onClick={(e) => setSelectedTo(false)}
        onChange={(e) => setData({ ...data, destination: e.target.value })}
        value={data.destination}
        style={{ backgroundColor: "white", margin: "10px", width: "95%" }}
        id="outlined-basic"
        label="To"
        variant="outlined"
      />
      <div>
        {data.destination && data.destination.length > 2 && (
          <DropDown
            component="destination"
            term={data.destination}
            selected={selectedTo}
            setSelected={setSelectedTo}
            setData={setData}
            data={data}
            setFrom={""}
            from={""}
            setTo={""}
            to={""}
          />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <DatePicker
          placeholder="Departure Date"
          disabledDate={disabledDate}
          onChange={(date, dateString) => {
            setData({
              ...data,
              departureDate: dateString,
            });
          }}
          style={{
            backgroundColor: "white",
            margin: "10px",
            width: "100%",
            height: "40px",
          }}
        />

        <DatePicker
          placeholder="Return Date"
          disabledDate={disabledDate}
          onChange={(date, dateString) => {
            setData({
              ...data,
              returnDate: dateString,
            });
          }}
          style={{
            backgroundColor: "white",
            margin: "10px",
            width: "100%",
            height: "40px",
          }}
        />
      </div>
      <Button
        style={{
          width: "50%",
          margin: "10px",
          marginLeft: "20%",
          color: "white",
          backgroundColor: "#2193b0",
        }}
        size="large"
      >
        <Link to={{ pathname: "/available_flights", state: data }}>Search</Link>
      </Button>
    </div>
  );
};

export default HomeSearch;
