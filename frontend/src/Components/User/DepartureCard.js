import "../../Styles/AvailableFlights.scss";
import { useState } from "react";
import { GiAirplaneDeparture } from "react-icons/gi";
import { Link } from "react-router-dom";
import downArrow from '../../Assets/down-arrow.svg';
import upArrow from '../../Assets/up-arrow.svg';


const DepartureCard = (props) => {
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
    <div className="card-mega-container">
      <button className="section" onClick={display}>
        <div className="tpd-plan">
          <div className="tp-flight-plan">
            <div className="container-fluid">
              <div className="crop depart">
                <div className="item it-2 depart-border">
                  <label className="trip-type depart">Departure</label>
                  <div className="take-tim">
                    {getDate(props.flight.DepartureDate)}
                  </div>
                </div>
                <div
                  className="context collapsed"
                  data-toggle="collapse"
                  data-target="#demo"
                >
                  <div className="item it-1">
                    <div className="airline-image">
                      <div className="df-text">{props.flight.TripDuration}</div>
                      <span className="img-wrapper">
                        <svg className="anime-airplane">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink:href="#airplane"/>',
                            }}
                          />
                        </svg>
                        <span className="top-label">Direct</span>
                      </span>
                    </div>

                    <div className="port-seg">
                      <div className="flight-seg origin">
                        <div className="time">{props.flight.DepartureTime}</div>
                        <div className="port">
                          {props.flight.DepartureAirport.substring(
                            0,
                            3
                          ).toUpperCase()}
                        </div>
                        <div className="name">{`${props.flight.DepartureAirport}, ${props.flight.DepartureCountry}`}</div>
                      </div>
                      <div className="flight-seg destination">
                        <div className="time">{props.flight.ArrivalTime}</div>
                        <div className="port">
                          {props.flight.ArrivalAirport.substring(
                            0,
                            3
                          ).toUpperCase()}
                        </div>
                        <div className="name">{`${props.flight.ArrivalAirport}, ${props.flight.ArrivalCountry}`}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="demo"
                  className={
                    overlay ? "fly-wrap collapse" : "fly-wrap collapse none"
                  }
                >
                  <div className="fly-det">
                    <div className="f-item">
                      <div className="airway-title">
                        <GiAirplaneDeparture className="card-icon" size="40" />
                        <span>Jet Away</span>
                      </div>
                      <div className="root-de">
                        <div className="directs">
                          <div className="itin-time">
                            <div className="itin-lines"></div>
                          </div>

                          <div className="hour-sm">
                            <div className="hour-time-sm">
                              {getDeparture(props.flight)}
                            </div>

                            <div className="hour-time-sm">
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
                  <div className="arrival-info">
                    <span className="sub-span">
                      <strong>Children on Board: </strong>
                      {props.flight.NumberOfPassengers.Children}
                    </span>

                    <span className="sub-span duration-info">
                      <strong>Adults on Board: </strong>
                      {props.flight.NumberOfPassengers.Adults}
                    </span>

                    <span className="sub-span duration-info">
                      <strong>Allowed Baggage: </strong>
                      {props.flight.AllowedBaggage}
                    </span>
                    <span className="sub-span duration-info book">
                      {!props.flight.reserved ? <Link
                        to={{
                          pathname: `/reserve_departure/${props.flight._id}`,
                          state: {
                            DepartureFlight: props.flight,
                            flights: props.Allflights,
                            isReturn: false
                          },
                        }}
                      >
                        Book now
                      </Link> : <span style={{color: 'red', fontSize: "17px"}}>You already booked this flight!</span>}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img alt='down arrow' src={!overlay? downArrow: upArrow} className='arrow' />
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

export default DepartureCard;
