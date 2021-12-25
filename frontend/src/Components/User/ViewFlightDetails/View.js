import "../../../Styles/view.scss";
import PlaneMotion from "./PlaneMotion";

export default function View({flight}) {
  return (
    <div className="viewdetailscontainer">
      <div className="c-modal">
        <div id="left-popup" className="c-modal__content">
          <div id="hero-city" className="c-modal__hero">
            <PlaneMotion />
            <h1 style={{fontSize: '20px', marginLeft: '35%'}}>{`Flight: ${flight.FlightNumber}`}</h1>
            
           
            
            <h2 style={{ right: "30%", bottom: "100%" }}>{`${flight.DepartureAirport}, ${flight.DepartureCountry}`}</h2>
            <h2 style={{ left: "30%", bottom: "100%" }}>{`${flight.ArrivalAirport}, ${flight.ArrivalCountry}`}</h2>
          </div>
          <div id="flight-details" className="c-flight-details">
            <div
              id="times"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div id="departure-time">
                  <label style={{ left: "-20%" }}>Departure Time</label>
                  <p>{`${flight.DepartureTime}`}</p>
                </div>
                <div id="arrival-time">
                  <label>Arrival Time</label>
                  <p>{`${flight.ArrivalTime}`}</p>
                </div>
              </div>
              <br />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div id="departure-time">
                  <label>Trip Duration</label>
                  <p>{`${flight.TripDuration}`}</p>
                </div>
                
                <div id="arrival-time">
                  <label>Allowed Baggages</label>
                  <p>{flight.AllowedBaggage}</p>
                </div>
              </div>
            </div>
            <p>Departure Airport: {flight.Departure}</p>
            <p>Arrival Airport: {flight.Arrival}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
