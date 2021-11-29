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
          <TheOriginalCard DepartureFlight={this.props.DepartureFlight}/>
          <SummaryReturn ReturnFlight={this.props.ReturnFlight}/>
          <SummaryOfRes FirstBooking={this.props.FirstBooking} SecondBooking={this.props.SecondBooking} book={this.props.book}/>
          <FlightSummary DepartureFlight={this.props.DepartureFlight} ReturnFlight={this.props.ReturnFlight} FirstBooking={this.props.FirstBooking} SecondBooking={this.props.SecondBooking}/>
        </div>
      </div>
    );
  }
}
export default SmallCard;
