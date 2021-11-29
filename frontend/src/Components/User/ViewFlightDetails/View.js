import { Row } from "antd";
import "../../../Styles/view.scss";
import PlaneMotion from "./PlaneMotion";

export default function View() {
  return (
    <div className="viewdetailscontainer">
      <div class="c-modal">
        <div id="left-popup" class="c-modal__content">
          <div id="hero-city" class="c-modal__hero">
            <PlaneMotion />
            <h1>LH 680</h1>
            <h2 style={{ right: "30%", bottom: "100%" }}>California, USA</h2>
            <h2 style={{ left: "30%", bottom: "100%" }}>Oslo, Norway</h2>
          </div>
          <div id="flight-details" class="c-flight-details">
            <div
              id="times"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div id="departure-time">
                  <label style={{ left: "-20%" }}>Departure Airport</label>
                  <p>08:30 AM</p>
                </div>
                <div id="arrival-time">
                  <label>Arrival Airport</label>
                  <p>08:30 AM</p>
                </div>
              </div>
              <br />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div id="departure-time">
                  <label>Departure</label>
                  <p>08:30 AM</p>
                </div>

                <div id="arrival-time">
                  <label>Arrival</label>
                  <p>04:45 PM</p>
                </div>
              </div>
            </div>
            <p>Flight time: 8h. 15min</p>
          </div>
        </div>
      </div>
    </div>
  );
}
