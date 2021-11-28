import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../Styles/Filter.scss";
//import Ticket from "./Ticket";
import DepartureCard from "./DepartureCard";
import ReturnCard from "./ReturnCard";
import { Slider, InputNumber, Row, Col } from "antd";

function UserFilter({setPrice}) {
  //const [price, setPrice] = useState(1);
  const [children, setChildren] = useState(100);
  const [adults, setAdults] = useState(1000);
  const [duration, setDuration] = useState(24);
  const [arrivalTerminal, setArrivalTerminal] = useState("");
  const [departureTerminal, setDepartureTerminal] = useState("");
  const [departureTime, setDepartureTime] = useState({
    midnight: false,
    morning: false,
    noon: true,
    night: false,
  });
  const [cabinClass, setCabinClass] = useState({
    first: false,
    business: false,
    economy: true,
  });

  return (
    <>
      <div className="filter-container">
        <h1>Filters</h1>
        <div>
          <h2>Price Range</h2>
          <Slider
            range
            defaultValue={[1000, 20000]}
            min={1000}
            step={1000}
            max={20000}
            onChange={(val) => setPrice(val)}
          />
        </div>

        <div>
          <h2>Depart Time</h2>

          <div class="inputGroup">
            <input
              id="option1"
              name="option1"
              type="checkbox"
              checked={departureTime.midnight}
              onClick={() => {setDepartureTime({...departureTime, midnight: !departureTime.midnight})}}
            />
            <label for="option1">12:00 am - 05:59am</label>
          </div>
          <div class="inputGroup">
            <input
              id="option2"
              name="option2"
              type="checkbox"
              checked={departureTime.morning}
              onClick={() => {setDepartureTime({...departureTime, morning: !departureTime.morning})}}
            />
            <label for="option2">06:00 am - 11:59 am</label>
          </div>
          <div class="inputGroup">
            <input
              id="option3"
              name="option3"
              type="checkbox"
              checked={departureTime.noon}
              onClick={() => {setDepartureTime({...departureTime, noon: !departureTime.noon})}}
            />
            <label for="option3">12:00 pm - 05:59 pm</label>
          </div>
          <div class="inputGroup">
            <input
              id="option4"
              name="option4"
              type="checkbox"
              checked={departureTime.night}
              onClick={() => {setDepartureTime({...departureTime, night: !departureTime.night})}}
            />
            <label for="option4">06:00 pm - 11:59 pm</label>
          </div>
        </div>
        <div>
          <h2>Available Cabin Class</h2>

          <div class="inputGroup">
            <input
              id="option5"
              name="option5"
              type="checkbox"
              checked={cabinClass.first}
              onClick={() => {setCabinClass({...cabinClass, first: !cabinClass.first})}}
            />
            <label for="option5">First Class</label>
          </div>
          <div class="inputGroup">
            <input
              id="option6"
              name="option6"
              type="checkbox"
              checked={cabinClass.business}
              onClick={() => {setCabinClass({...cabinClass, business: !cabinClass.business})}}
            />
            <label for="option6">Business</label>
          </div>
          <div class="inputGroup">
            <input
              id="option7"
              name="option7"
              type="checkbox"
              checked={cabinClass.economy}
              onClick={() => {setCabinClass({...cabinClass, economy: !cabinClass.economy})}}
            />
            <label for="option7">Economy</label>
          </div>
        </div>
        <div>
          <h2>Max Trip Duration</h2>
          <Slider
            defaultValue={duration}
            min={0}
            max={24}
            onChange={(val) => setDuration(val)}
          />
        </div>
        <div>
          <h2>Terminals</h2>
          <section>
            <p>Departure Terminal:</p>
            <input
              type="text"
              onChange={(e) => setDepartureTerminal(e.target.value)}
              placeholder="Enter Departure Terminal"
            />
            <p>Arrival Terminal:</p>
            <input
              type="text"
              onChange={(e) => setArrivalTerminal(e.target.value)}
              placeholder="Enter Arrival Terminal"
            />
          </section>
        </div>
        <div>
          <h2>Max number of Children On Board</h2>
          <Slider
            defaultValue={children}
            min={0}
            max={100}
            onChange={(val) => setChildren(val)}
          />
        </div>
        <div>
          <h2>Max Number of Adults On Board</h2>
          <Slider
            defaultValue={adults}
            min={0}
            max={1000}
            onChange={(val) => setAdults(val)}
          />
        </div>
      </div>
    </>
  );
}

export default UserFilter;
