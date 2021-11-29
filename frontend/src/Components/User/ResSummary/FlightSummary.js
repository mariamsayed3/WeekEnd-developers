import React, { Component } from "react";
import { Badge, Divider } from "antd";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { GiExitDoor } from "react-icons/gi";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";

class FlightSummary extends Component {
  render() {
    return (
      <div>
        <div
          id="container"
          style={{
            position: "relative",

            bottom: "50px",
          }}
        >
          <Badge.Ribbon
            text="Departure"
            style={{ float: "right", marginRight: "5px", marginTop: "15px" }}
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
                            <div class="times"> 4 Hour </div>
                            <div class="directs">
                              <div class="itin-time">
                                <div class="itin-lines"></div>
                              </div>

                              <div class="hour-sm">
                                <div class="hour-time-sm">02:10</div>

                                <div class="hour-time-sm">05:55</div>
                              </div>
                            </div>

                            <div class="itin-target">
                              <div class="tar-label">IST İstanbul Atatürk</div>
                              <div class="tar-label">BAH Bahreyn</div>
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
              <GiExitDoor /> <b>Terminal</b> : A1
            </span>
            <span>
              <MdOutlineAirlineSeatReclineExtra /> <b>Seats</b> : A1,B4,A7
            </span>
            <span>
              {" "}
              <FaPlaneDeparture /> <b>Departure</b> : Oslo,Norway
            </span>
            <span>
              {" "}
              <FaPlaneArrival /> <b>Arrival</b> : NYC,US
            </span>
          </div>
          <div>
            <Divider />

            <Badge.Ribbon
              text="Return"
              style={{ float: "right", marginRight: "5px", marginTop: "15px" }}
              color="#e91e63"
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
                              <div class="times"> 4 Hour </div>
                              <div class="directs">
                                <div class="itin-time">
                                  <div class="itin-lines"></div>
                                </div>

                                <div class="hour-sm">
                                  <div class="hour-time-sm">02:10</div>

                                  <div class="hour-time-sm">05:55</div>
                                </div>
                              </div>

                              <div class="itin-target">
                                <div class="tar-label">
                                  IST İstanbul Atatürk
                                </div>
                                <div class="tar-label">BAH Bahreyn</div>
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
                <GiExitDoor /> <b>Terminal</b> : A1
              </span>
              <span>
                <MdOutlineAirlineSeatReclineExtra /> <b>Seats</b> : A1,B4,A7
              </span>
              <span>
                {" "}
                <FaPlaneDeparture /> <b>Departure</b> : Oslo,Norway
              </span>
              <span>
                {" "}
                <FaPlaneArrival /> <b>Arrival</b> : NYC,US
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FlightSummary;
