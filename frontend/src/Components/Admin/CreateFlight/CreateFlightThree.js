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
    console.log(info);
    sessionStorage.setItem("Information", JSON.stringify(info));
    history.push("/admin/createFlightFour");
  };
  return (
    <div>
      <State decide={whichone} />
      <div id="createContainer" style={{ width: "40%" }}>
        <Form
          style={{ "margin-left": "2em", "margin-top": "2em" }}
          form={form}
          onSubmit={Create}
        >
          <Form.Item
            name="ArrivalCountry"
            label="Arrival Country"
            rules={[
              { required: true, message: "Please enter the arrival country" },
            ]}
          >
            <Input
              placeholder="Arrival Country"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <Form.Item
            name="ArrivalAirport"
            label="Arrival City"
            rules={[
              { required: true, message: "Please enter the arrival city" },
            ]}
          >
            <Input
              placeholder="Arrival City"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <Form.Item
            name="ArrivalTerminal"
            label="Arrival Terminal"
            rules={[
              {
                required: true,
                message: "Please enter the arrival terminal",
              },
            ]}
          >
            <Input
              placeholder="Arrival Terminal"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <Form.Item
            name="Arrival"
            label="Arrival Airport"
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
              style={{ marginLeft: "40%" }}
              size="40"
              onClick={Create}
            />
          </div>
        </Form>
      </div>
      <div>
        <img className="imageStyle" src={thirdOne} alt="thirdOne" />
      </div>
    </div>
  );
}
