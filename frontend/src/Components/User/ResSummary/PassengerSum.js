import React, { Component } from "react";
import "../../../Styles/summary.css";
import { Badge, Button } from "antd";

class PassengerSum extends Component {
  render() {
    return (
      <div>
        <div class="wrapper">
          <div class="qr_code">
            <img src="https://i.imgur.com/vMisPqv.png" alt="QR_code" />
          </div>
          <div class="content">
            <div class="info">
              <div class="item">
                <h4>passenger</h4>
                <p>Mariam Sayed</p>
                <h4>Refundable</h4>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10%",
                width: "50%",
                float: "right",
              }}
            >
              <Button type="primary">Send by Email</Button>
            </div>
          </div>
          <Badge.Ribbon
            text="Lowest Price"
            style={{ float: "right", right: "5%" }}
            color="green"
          />
        </div>
      </div>
    );
  }
}
export default PassengerSum;
