import React, { useContext } from "react";
import "../../../Styles/summary.scss";
import { Badge, Button } from "antd";
import { UserContext } from "../../../Context";
const PassengerSum = () => {
  const {FirstName, LastName} = useContext(UserContext)
  return (
    <div className="small-card">
      <div class="wrapper">
        <div class="qr_code">
          <img src="https://i.imgur.com/vMisPqv.png" alt="QR_code" />
        </div>
        <div class="content">
          <div class="info">
            <div class="item">
              <h4>passenger</h4>
              <p>{`${FirstName}  ${LastName}`}</p>
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
export default PassengerSum;
