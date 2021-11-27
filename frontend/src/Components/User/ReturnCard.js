import "../../Styles/AvailableFlights.scss";
import { useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import { Link } from "react-router-dom";

const ReturnCard = (props) => {
  const [overlay, setOverlay] = useState(false);
  const display = () => {
    setOverlay(!overlay);
  };
  const getDate = (date) => {
    date = new Date(date);
    let res =
      date.toString().substring(0, 3) + ", " + date.toString().substring(4, 7);
    res += " " + date.getDate() + ", " + date.getFullYear();
    return res;
  };
  const getDeparture = (flight) => {
    return `Terminal ${flight.DepartureTerminal.toUpperCase()}, ${
      flight.Departure
    }`;
  };
  const getArrival = (flight) => {
    return `Terminal ${flight.ArrivalTerminal.toUpperCase()}, ${
      flight.Arrival
    } `;
  };
  return (
    <div>
      <button class="section" onClick={display}>
        <div class="tpd-plan">
          <div class="tp-flight-plan">
            <div class="container-fluid">
              <div class="crop return">
                <div class="item it-2 return-border">
                  <div class="take-tim">
                    {getDate(props.flight.DepartureDate)}
                  </div>
                </div>
                <div
                  class="context collapsed"
                  data-toggle="collapse"
                  data-target="#demo"
                >
                  <div class="item it-1">
                    <label class="trip-type return">Return</label>
                    <div class="route-dot"></div>
                    <div class="airline-image">
                      <div class="df-text">{props.flight.TripDuration}</div>
                      <span class="img-wrapper">
                        <svg class="anime-airplane">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink:href="#airplane"/>',
                            }}
                          />
                        </svg>
                        <span class="top-label">Direct</span>
                      </span>
                    </div>

                    <div class="port-seg">
                      <div class="flight-seg origin">
                        <div class="time">{props.flight.ArrivalTime}</div>
                        <div class="port">
                          {props.flight.ArrivalAirport.substring(
                            0,
                            3
                          ).toUpperCase()}
                        </div>
                        <div class="name">{`${props.flight.ArrivalAirport}, ${props.flight.ArrivalCountry}`}</div>
                      </div>
                      <div class="flight-seg destination">
                        <div class="time">{props.flight.DepartureTime}</div>
                        <div class="port">
                          {props.flight.DepartureAirport.substring(
                            0,
                            3
                          ).toUpperCase()}
                        </div>
                        <div class="name">{`${props.flight.DepartureAirport}, ${props.flight.DepartureCountry}`}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="demo"
                  class={
                    overlay ? "fly-wrap collapse" : "fly-wrap collapse none"
                  }
                >
                  <div class="fly-det">
                    <div class="f-item">
                      <div class="airway-title">
                        <GiAirplaneDeparture className="card-icon" size="40" />
                        <span>Jet Away</span>
                      </div>
                      <div class="root-de">
                        <div class="directs">
                          <div class="itin-time">
                            <div class="itin-lines"></div>
                          </div>

                          <div class="hour-sm">
                            <div class="hour-time-sm">
                              {getDeparture(props.flight)}
                            </div>

                            <div class="hour-time-sm">
                              {getArrival(props.flight)}
                            </div>
                          </div>
                          <div className="class-info">
                            <div>
                              <h1>First Class</h1>
                              <p>{"$" + props.flight.FirstClassPrice}</p>
                              <p>
                                {props.flight.FirstClassAvailableSeats +
                                  " seats left"}
                              </p>
                            </div>
                            <div>
                              <h1>Business</h1>
                              <p>{"$" + props.flight.BusinessPrice}</p>
                              <p>
                                {props.flight.BusinessAvailableSeats +
                                  " seats left"}
                              </p>
                            </div>
                            <div>
                              <h1>Economy</h1>
                              <p>{"$" + props.flight.EconomyPrice}</p>
                              <p>
                                {props.flight.EconomyAvailableSeats +
                                  " seats left"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="arrival-info">
                    <span class="sub-span">
                      <strong>Children on Board: </strong>
                      {props.flight.NumberOfPassengers.Children}
                    </span>

                    <span class="sub-span duration-info">
                      <strong>Adults on Board: </strong>
                      {props.flight.NumberOfPassengers.Adults}
                    </span>

                    <span class="sub-span duration-info">
                      <strong>Allowed Baggage: </strong>
                      {props.flight.AllowedBaggage}
                    </span>
                    <span class="sub-span duration-info book">
                      <Link>Book now</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        display="none"
      >
        <symbol id="airplane" viewBox="243.5 245.183 25 21.633">
          <g>
            <path
              d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                                c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                                c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                                "
            />
          </g>
        </symbol>
      </svg>
    </div>
  );
};

export default ReturnCard;
