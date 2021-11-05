import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import FlightDetails from "./FlightDetails";

export default function AdminEdits() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const getFlights = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/admin/get_all_flights"
      );
      setFlights(data);
    };
    getFlights();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {flights &&
        flights.map((flight) => {
          let id = flight._id;
          return <FlightDetails idkey={id} myFlight={flight} key={id} />;
        })}
    </div>
  );
}
