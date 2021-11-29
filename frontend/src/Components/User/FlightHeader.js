import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../../Styles/Filter.scss";
//import Ticket from "./Ticket";
import DepartureCard from "./DepartureCard";
import ReturnCard from "./ReturnCard";
import { Slider, InputNumber, Row, Col } from "antd";

function FlightHeader() {
  return (
    <>
      <div className="filter-header-container">
        
      </div>
    </>
  );
}

export default FlightHeader;
