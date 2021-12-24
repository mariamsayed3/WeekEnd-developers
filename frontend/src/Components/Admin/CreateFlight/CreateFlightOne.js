import React, { Component } from "react";
import "../../../Styles/createFlight.scss";
import "antd/dist/antd.css";
import State from "./State";
import firstOne from "../../../Styles/firstOne.png";
import { Form, Input, DatePicker, TimePicker, message } from "antd";
import { GrLinkNext } from "react-icons/gr";
import { useHistory, Link } from "react-router-dom";
import moment from "moment";
const { RangePicker } = DatePicker;

export function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}

export function disabledRangeTime(_, type) {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(24, 20),
      disabledMinutes: () => range(30, 60).splice(60, 60),
      disabledSeconds: () => [55, 56],
    };
  }
}

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
// bta3et moahmed
export const getTripDuration = (from, to) => {
  const fromTime = from.split(":");
  const toTime = to.split(":");

  let fromHours = parseInt(fromTime[0]);
  let fromMinutes = parseInt(fromTime[1]);

  let toHours = parseInt(toTime[0]);
  let toMinutes = parseInt(toTime[1]);

  let diffHours =
    toHours - fromHours < 0 ? toHours - fromHours + 24 : toHours - fromHours;
  let diffMinutes = toMinutes - fromMinutes;
  if (diffMinutes > 60) {
    diffHours++;
    diffMinutes -= 60;
  } else if (diffMinutes < 0) {
    diffHours--;
    diffMinutes += 60;
  }
  if (`${diffHours}`.length == 1) diffHours = "0" + diffHours;
  if (`${diffMinutes}`.length == 1) diffMinutes = "0" + diffMinutes;

  return `${diffHours}:${diffMinutes}`;
};

export default function CreateFlightOne() {
  let whichone = {
    first: false,
    second: false,
    third: false,
    fourth: false,
    nowFI: true,
    nowS: false,
    nowT: false,
    nowFO: false,
  };

  const [form] = Form.useForm();
  let history = useHistory();
  const Create = async () => {
    let correctInputs = true;
    const values = await form.validateFields();
    values.FlightNumber = values.FlightNumber.toString();
    values.ArrivalDate = new Date(Date.parse(values.DepartureDate[1]._d));
    values.DepartureDate = new Date(Date.parse(values.DepartureDate[0]._d));
    let info = {};
    if (Number.isNaN(parseInt(values.AllowedBaggage)) === true) {
      message.error("Please enter a number ", 1.5);
      correctInputs = false;
    } else {
      info["AllowedBaggage"] = parseInt(values.AllowedBaggage);
    }
    info["FlightNumber"] = values.FlightNumber.toString();
    info["DepartureDate"] = values.DepartureDate;
    info["ArrivalDate"] = values.ArrivalDate;

    //Mohamedddd
    const departureTimeHours =
      (values.TripDuration[0]._d.getHours() + "").length == 1
        ? "0" + values.TripDuration[0]._d.getHours()
        : values.TripDuration[0]._d.getHours();

    const departureTimeMin =
      (values.TripDuration[0]._d.getMinutes() + "").length == 1
        ? "0" + values.TripDuration[0]._d.getMinutes()
        : values.TripDuration[0]._d.getMinutes();

    const arrivalTimeHours =
      (values.TripDuration[1]._d.getHours() + "").length == 1
        ? "0" + values.TripDuration[1]._d.getHours()
        : values.TripDuration[1]._d.getHours();
    const arrivalTimeMin =
      (values.TripDuration[1]._d.getMinutes() + "").length == 1
        ? "0" + values.TripDuration[1]._d.getMinutes()
        : values.TripDuration[1]._d.getMinutes();

    values.DepartureTime = `${departureTimeHours}:${departureTimeMin}`;

    values.ArrivalTime = `${arrivalTimeHours}:${arrivalTimeMin}`;

    values.TripDuration = getTripDuration(
      values.DepartureTime,
      values.ArrivalTime
    );
    //Mohameddddd
    info["TripDuration"] = values.TripDuration;
    if (correctInputs == true) {
      sessionStorage.setItem("Information", JSON.stringify(info));
      console.log(info);
      history.push("/admin/createFlightTwo");
    }
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
            name="FlightNumber"
            label={
              <p style={{ "margin-top": "1em", fontSize: "20px" }}>
                Flight Number
              </p>
            }
            style={{ width: "60%" }}
            rules={[
              { required: true, message: "Please enter the flight number" },
            ]}
          >
            <Input
              placeholder="Flight No."
              style={{ "border-radius": "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="AllowedBaggage"
            label={
              <p style={{ "margin-top": "1em", fontSize: "20px" }}>
                Allowed Baggage
              </p>
            }
            style={{ width: "60%", "margin-top": "5em" }}
            rules={[
              {
                required: true,
                message: "Please specify the allowed baggage",
              },
            ]}
          >
            <Input
              placeholder="No. of Bags"
              style={{ "border-radius": "5px" }}
            />
          </Form.Item>
          <Form.Item
            name="DepartureDate"
            label={
              <p style={{ "margin-top": "1em", fontSize: "20px" }}>
                Departure Date and Arrival Date
              </p>
            }
            style={{ width: "60%", "margin-top": "5em" }}
            rules={[{ required: true, message: "Please enter the date" }]}
          >
            <RangePicker
              width="60%"
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              ranges={{
                Today: [moment(), moment()],
              }}
              format="YYYY-MM-DD"
              style={{ "margin-top": "2em" }}
            />
          </Form.Item>
          <Form.Item
            name="TripDuration"
            label="Trip Duration"
            rules={[
              { required: true, message: "Please enter the trip duration" },
            ]}
          >
            <TimePicker.RangePicker order={false} format="HH:mm" size="small" />
          </Form.Item>
          <div>
            <GrLinkNext
              style={{ marginLeft: "-40%" }}
              size="40"
              onClick={Create}
            />
          </div>
        </Form>
      </div>
      <div>
        <img className="imageStyle" src={firstOne} alt="firstOne" />
      </div>
    </div>
  );
}
