import React, { Component } from "react";
import "../../../Styles/createFlight.scss";
import "antd/dist/antd.css";
import State from "./State";
import secondOne from "../../../Styles/secondOne.png";
import { Form, Input, DatePicker } from "antd";
import { useHistory, Link } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
const { RangePicker } = DatePicker;

export default function CreateFlightTwo() {
  let whichone = {
    first: true,
    second: false,
    third: false,
    fourth: false,
    nowFI: false,
    nowS: true,
    nowT: false,
    nowFO: false,
  };
  const [form] = Form.useForm();
  let history = useHistory();
  const Create = async () => {
    const values = await form.validateFields();
    let info = sessionStorage.getItem("Information");
    let correctInputs = true;
    info = JSON.parse(info);
    info["DepartureCity"] = values.DepartureAirport; //city
    info["DepartureCountry"] = values.DepartureCountry;
    info["DepartureTerminal"] = values.DepartureTerminal;
    info["DepartureAirport"] = values.Departure; //airport

    console.log(info);
    sessionStorage.setItem("Information", JSON.stringify(info));
    history.push("/admin/createFlightThree");
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
            name="DepartureCountry"
            label="Departure Country"
            rules={[
              {
                required: true,
                message: "Please enter the departure country",
              },
            ]}
          >
            <Input
              placeholder="Departure Country"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <Form.Item
            name="DepartureAirport"
            label="Departure City"
            rules={[
              { required: true, message: "Please enter the departure city" },
            ]}
          >
            <Input
              placeholder="Departure City"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <Form.Item
            name="Departure"
            label="Departure Airport"
            rules={[
              {
                required: true,
                message: "Please enter the departure airport",
              },
            ]}
          >
            <Input
              placeholder="Departure Airport"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <Form.Item
            name="DepartureTerminal"
            label="Departure Terminal"
            rules={[
              {
                required: true,
                message: "Please enter the departure terminal",
              },
            ]}
          >
            <Input
              placeholder="Departure Terminal"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <GrLinkNext
            style={{ marginLeft: "40%" }}
            size="40"
            onClick={Create}
          />
        </Form>
      </div>
      <div>
        <img className="imageStyle" src={secondOne} alt="secondOne" />
      </div>
    </div>
  );
}
