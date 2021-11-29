import React, { Component } from "react";
import "../../../Styles/summary.css";

class SummaryReturn extends Component {
  render() {
    return (
      <div>
        <div
          className="section"
          style={{
            position: "relative",
            right: "250px",
          }}
        >
          <div className="tp-flight-plan">
            <div className="container-fluid">
              {/* the 2nd*/}
              <div className="crop return">
                <div
                  className="context collapsed"
                  data-toggle="collapse"
                  data-target="#demo"
                >
                  <div className="item it-1">
                    <div className="airline-image">
                      <div className="df-text">8 Hours</div>
                      <span className="img-wrapper">
                        <svg class="anime-airplane">
                          <svg
                            dangerouslySetInnerHTML={{
                              __html: '<use xlink:href="#airplane">',
                            }}
                          ></svg>
                        </svg>
                        <span className="top-label">Direct</span>
                      </span>
                    </div>

                    <div className="port-seg">
                      <div className="flight-seg origin">
                        <div className="time">02:00</div>
                        <div className="port">IST</div>
                        <div className="name">istan</div>
                      </div>
                      <div className="flight-seg destination">
                        <div className="time">10:20</div>
                        <div className="port">ESB</div>
                        <div className="name">Ankara</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
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
      </div>
    );
  }
}
export default SummaryReturn;
