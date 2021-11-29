import React, { Component } from "react";
import SummaryReturn from "./SummaryReturn";
import TheOriginalCard from "./TheOriginalCard";
import FlightSummary from "./FlightSummary";
import SummaryOfRes from "./SummaryOfRes";
import PassengerSum from "./PassengerSum";

class SmallCard extends Component {
  render() {
    return (
      <div>
        <div id="containeroriginal">
          <PassengerSum />
          <TheOriginalCard />
          <SummaryReturn />
          <SummaryOfRes />
          <FlightSummary />
        </div>
      </div>
    );
  }
}
export default SmallCard;
