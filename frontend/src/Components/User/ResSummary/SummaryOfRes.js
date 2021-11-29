import { Divider } from "antd";
import React, { Component } from "react";
import "../../../Styles/summary.css";
import { MdChildCare } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { BsCurrencyDollar } from "react-icons/bs";
import { Button } from "antd";
import { FaRegBell } from "react-icons/fa";
class SummaryOfRes extends Component {
  render() {
    return (
      <div>
        <div>
          <div
            className="boarding-passnew"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div style={{ float: "left", marginTop: "10%", marginLeft: "10%" }}>
              <b>Fare Summary</b>:
            </div>
            <Divider style={{ width: "20px" }} />
            <div>
              <p
                style={{
                  fontsize: "10px",
                  float: "left",
                  marginLeft: "5%",
                }}
              >
                Fare Summary
              </p>
              <p
                style={{
                  fontsize: "10px",
                  float: "right",
                  marginRight: "5%",
                }}
              >
                Base Fare
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <MdChildCare style={{ marginLeft: "5%" }} />
              <b style={{ float: "left", marginLeft: "5%" }}>Child X 1</b>
              <BsCurrencyDollar style={{ marginLeft: "25%" }} />
              <b>10000</b>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <FiUsers style={{ marginLeft: "5%" }} />
              <b style={{ float: "left", marginLeft: "5%" }}>Adult X 1</b>
              <BsCurrencyDollar style={{ marginLeft: "25%" }} />
              <b>20000</b>
            </div>
            <Divider />
            <div>
              <p style={{ float: "left", marginLeft: "5%" }}>Total</p>

              <b style={{ float: "right", marginRight: "10%" }}>
                {" "}
                <BsCurrencyDollar /> 300000
              </b>
            </div>
            <div>
              <Button
                type="primary"
                style={{
                  backgroundColor: "rgb(141,200,0)",
                  width: "80%",
                }}
              >
                Book
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SummaryOfRes;
