import React, { Component } from "react";
import { Badge, Divider } from "antd";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

class FlightSummary extends Component {
  render() {
    const DepartureFlight = this.props.DepartureFlight
    const ReturnFlight = this.props.ReturnFlight
    let seats = ""
    for(let seat of this.props.FirstBooking.Seats)
      if(seat.number)
        seats += ` ${seat.number},`
      else
        seats += `${seat},`

    seats = seats.slice(0, seats.length-1)

    let seats2 = ""
    for(let seat of this.props.SecondBooking.Seats)
      if(seat.number)
        seats2 += ` ${seat.number},`
      else
        seats2 += `${seat},`
    seats2 = seats2.slice(0, seats2.length-1)

    return (
      <div className="small-card">
        <div
          id="container"
          style={{
            position: "relative",

            bottom: "50px",
          }}
        >
          <Badge.Ribbon
            text="Departure"
            style={{ float: "right", marginRight: "1.5%", marginTop: "15px" }}
            color="#3e67c0"
          />
          <div className="section" style={{ float: "left" }}>
            <div className="tpd-plan">
              <div className="tp-flight-plan">
                <div className="container-fluid">
                  <div>
                    <div
                      className="context collapsed"
                      data-toggle="collapse"
                      data-target="#demo2"
                    ></div>
                    <div id="demo2" className="fly-wrap collapse">
                      <div className="fly-det">
                        <div className="f-item">
                          <div className="root-de">
                            <div className="times">{DepartureFlight.TripDuration} </div>
                            <div className="directs">
                              <div className="itin-time">
                                <div className="itin-lines"></div>
                              </div>

                              <div className="hour-sm">
                                <div className="hour-time-sm">{DepartureFlight.DepartureTime}</div>

                                <div className="hour-time-sm">{DepartureFlight.ArrivalTime}</div>
                              </div>
                            </div>

                            <div className="itin-target">
                              <div className="tar-label">{DepartureFlight.Departure}</div>
                              <div className="tar-label">{DepartureFlight.Arrival}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="details">
            <span>
              <GiExitDoor /> <b>Terminal</b> : {DepartureFlight.DepartureTerminal}
            </span>
            <span>
              <MdOutlineAirlineSeatReclineExtra /> <b>Seats</b> : {seats}
            </span>
            <span>
              {" "}
              <FaPlaneDeparture /> <b>Departure</b> : {`${DepartureFlight.DepartureAirport}, ${DepartureFlight.DepartureCountry}`}
            </span>
            <span>
              {" "}
              <FaPlaneArrival /> <b>Arrival</b> : {`${DepartureFlight.ArrivalAirport}, ${DepartureFlight.ArrivalCountry}`}
            </span>
          </div>
          <div>
            <Divider />

            <Badge.Ribbon
              text="Return"
              style={{ float: "right", marginRight: "1.5%", marginTop: "15px" }}
              color="#e91e63"
            />
            <div className="section" style={{float: "left" }}>
              <div className="tpd-plan">
                <div className="tp-flight-plan">
                  <div className="container-fluid">
                    <div>
                      <div
                        className="context collapsed"
                        data-toggle="collapse"
                        data-target="#demo2"
                      ></div>
                      <div style={{}} id="demo2" className="fly-wrap collapse">
                        <div className="fly-det">
                          <div className="f-item">
                            <div className="root-de">
                              <div className="times"> {ReturnFlight.TripDuration} </div>
                              <div className="directs">
                                <div className="itin-time">
                                  <div className="itin-lines"></div>
                                </div>

                                <div className="hour-sm">
                                  <div className="hour-time-sm">{ReturnFlight.DepartureTime}</div>

                                  <div className="hour-time-sm">{ReturnFlight.ArrivalTime}</div>
                                </div>
                              </div>

                              <div className="itin-target">
                                <div className="tar-label">
                                  {ReturnFlight.Departure}
                                </div>
                                <div className="tar-label">{ReturnFlight.Arrival}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="details">
              <span>
                <GiExitDoor /> <b>Terminal</b> : {ReturnFlight.DepartureTerminal}
              </span>
              <span>
                <MdOutlineAirlineSeatReclineExtra /> <b>Seats</b> : {seats2}
              </span>
              <span>
                {" "}
                <FaPlaneDeparture /> <b>Departure</b> : {`${ReturnFlight.DepartureAirport}, ${ReturnFlight.DepartureCountry}`}
              </span>
              <span>
                {" "}
                <FaPlaneArrival /> <b>Arrival</b> : {`${ReturnFlight.ArrivalAirport}, ${ReturnFlight.ArrivalCountry}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FlightSummary;
