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
      seats += ` ${seat.number},`
    seats = seats.slice(0, seats.length-1)

    let seats2 = ""
    for(let seat of this.props.SecondBooking.Seats)
      seats2 += ` ${seat.number},`
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
          <div class="section" style={{ float: "left" }}>
            <div class="tpd-plan">
              <div class="tp-flight-plan">
                <div class="container-fluid">
                  <div>
                    <div
                      class="context collapsed"
                      data-toggle="collapse"
                      data-target="#demo2"
                    ></div>
                    <div id="demo2" class="fly-wrap collapse">
                      <div class="fly-det">
                        <div class="f-item">
                          <div class="root-de">
                            <div class="times">{DepartureFlight.TripDuration} </div>
                            <div class="directs">
                              <div class="itin-time">
                                <div class="itin-lines"></div>
                              </div>

                              <div class="hour-sm">
                                <div class="hour-time-sm">{DepartureFlight.DepartureTime}</div>

                                <div class="hour-time-sm">{DepartureFlight.ArrivalTime}</div>
                              </div>
                            </div>

                            <div class="itin-target">
                              <div class="tar-label">{DepartureFlight.Departure}</div>
                              <div class="tar-label">{DepartureFlight.Arrival}</div>
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
            <div class="section" style={{float: "left" }}>
              <div class="tpd-plan">
                <div class="tp-flight-plan">
                  <div class="container-fluid">
                    <div>
                      <div
                        class="context collapsed"
                        data-toggle="collapse"
                        data-target="#demo2"
                      ></div>
                      <div style={{}} id="demo2" class="fly-wrap collapse">
                        <div class="fly-det">
                          <div class="f-item">
                            <div class="root-de">
                              <div class="times"> {ReturnFlight.TripDuration} </div>
                              <div class="directs">
                                <div class="itin-time">
                                  <div class="itin-lines"></div>
                                </div>

                                <div class="hour-sm">
                                  <div class="hour-time-sm">{ReturnFlight.DepartureTime}</div>

                                  <div class="hour-time-sm">{ReturnFlight.ArrivalTime}</div>
                                </div>
                              </div>

                              <div class="itin-target">
                                <div class="tar-label">
                                  {ReturnFlight.Departure}
                                </div>
                                <div class="tar-label">{ReturnFlight.Arrival}</div>
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
