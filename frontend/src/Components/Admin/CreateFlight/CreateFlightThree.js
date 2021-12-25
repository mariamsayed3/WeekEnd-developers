import React, { Component } from "react";
import "../../../Styles/createFlight.scss";
import "antd/dist/antd.css";
import State from "./State";
import thirdOne from "../../../Styles/thirdOne.png";
import { Form, Input, DatePicker } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { GrLinkNext } from "react-icons/gr";
import { useHistory, Link } from "react-router-dom";
const { RangePicker } = DatePicker;
export default function CreateFlightThree() {
  let whichone = {
    first: true,
    second: true,
    third: false,
    fourth: false,
    nowFI: false,
    nowS: false,
    nowT: true,
    nowFO: false,
  };
  const [form] = Form.useForm();
  let history = useHistory();
  const Create = async () => {
    const values = await form.validateFields();
    let info = sessionStorage.getItem("Information");
    info = JSON.parse(info);
    info["ArrivalAirport"] = values.ArrivalAirport; //city
    info["ArrivalCountry"] = values.ArrivalCountry;
    info["ArrivalTerminal"] = values.ArrivalTerminal;
    info["Arrival"] = values.Arrival; //airport
    sessionStorage.setItem("Information", JSON.stringify(info));
    history.push("/admin/createFlightFour");
  };
  return (
    <div>
      <State decide={whichone} />
      <div id="createContainer" style={{ width: "40%" }}>
        <Form
          style={{ padding: '40px'}}
          form={form}
          onSubmit={Create}
        >
          <Form.Item
            name="ArrivalCountry"
            label={
              <span style={{fontSize: "20px" }}>
                Arrival Country
              </span>
            }
            rules={[
              { required: true, message: "Please enter the arrival country" },
            ]}
          >
            <Input
              placeholder="Arrival Country"
              style={{width: "350px"}}
            />
          </Form.Item>
          <Form.Item
            name="ArrivalAirport"
            label={
              <span style={{fontSize: "20px" }}>
                Arrival City
              </span>
            }
            rules={[
              { required: true, message: "Please enter the arrival city" },
            ]}
          >
            <Input
              placeholder="Arrival City"
             
            />
          </Form.Item>
          <Form.Item
            name="ArrivalTerminal"
            label={
              <span style={{fontSize: "20px" }}>
                Arrival Terminal
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please enter the arrival terminal",
              },
            ]}
          >
            <Input
              placeholder="Arrival Terminal"
             
            />
          </Form.Item>
          <Form.Item
            name="Arrival"
            label={
              <span style={{fontSize: "20px" }}>
                Arrival Airport
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please enter the arrival airport",
              },
            ]}
          >
            <Input placeholder="Arrival Airport" />
          </Form.Item>
          <div>
            <GrLinkNext
              style={{ float: 'right', cursor: 'pointer'}}
              size="40"
              onClick={Create}
            />
          </div>
        </Form>
      </div>
      <div>
        <img className="imageStyle3" src={thirdOne} alt="thirdOne" style={{marginTop: '-25%'}}/>
      </div>
    </div>
  );
}
