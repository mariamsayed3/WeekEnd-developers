import React, { Component } from "react";
import { Form, Button } from "antd";
import "../../../Styles/createFlight.scss";
import "../../../Styles/editflightadmin.scss";
import { useLocation } from "react-router-dom";
import { message, Input, DatePicker, TimePicker } from "antd";
import fourthOne from "../../../Styles/fourthOne.png";
import { getTripDuration } from "../CreateFlight/CreateFlightOne";
import axios from "axios";
import "antd/dist/antd.css";

import { Tabs } from "antd";

const { TabPane } = Tabs;

export default function UpdateFlightadmin() {
  const location = useLocation();
  const { state } = location;
  const id = "61c617863193a8565543094c";
  const [form] = Form.useForm();

  const getFlight = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/admin/get_flight/${id}`
    );
    if (data) {
      const {
        FlightNumber,
        DepartureAirport,
        ArrivalAirport,
        EconomyAvailableSeats,
        EconomyPrice,
        BusinessAvailableSeats,
        BusinessPrice,
        FirstClassAvailableSeats,
        FirstClassPrice,
        AllowedBaggage,
        DepartureTerminal,
        ArrivalTerminal,
        Departure,
        Arrival,
        ArrivalCountry,
        DepartureCountry,
      } = data;
      form.setFieldsValue({
        FlightNumber,
        DepartureAirport,
        ArrivalAirport,
        EconomyAvailableSeats,
        EconomyPrice,
        BusinessAvailableSeats,
        BusinessPrice,
        FirstClassAvailableSeats,
        FirstClassPrice,
        AllowedBaggage,
        DepartureTerminal,
        ArrivalTerminal,
        Departure,
        Arrival,
        ArrivalCountry,
        DepartureCountry,
      });
    }
  };
  getFlight();
  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      let lastNewValues = JSON.parse(sessionStorage.getItem("UpdatedInfo"));
      console.log(lastNewValues);
      if (values.EconomyAvailableSeats) {
        lastNewValues["EconomyAvailableSeats"] = parseInt(
          values.EconomyAvailableSeats
        );
      }
      if (values.EconomyPrice)
        lastNewValues["EconomyPrice"] = parseInt(values.EconomyPrice);
      if (values.BusinessAvailableSeats)
        lastNewValues["BusinessAvailableSeats"] = parseInt(
          values.BusinessAvailableSeats
        );
      if (values.BusinessPrice)
        lastNewValues["BusinessPrice"] = parseInt(values.BusinessPrice);
      if (values.FirstClassAvailableSeats)
        lastNewValues["FirstClassAvailableSeats"] = parseInt(
          values.FirstClassAvailableSeats
        );
      if (values.FirstClassPrice)
        lastNewValues["FirstClassPrice"] = parseInt(values.FirstClassPrice);
      await axios.patch(
        `http://localhost:8000/admin/update_flight/${id}`,
        lastNewValues
      );
      message
        .loading("Action in progress..", 2.5)
        .then(() => message.success("Flight Updated Succesfully", 3));
    } catch (e) {
      console.log(e);
      message.error("Something went wrong. please try again.", 3);
    }
  };

  async function callback(key) {
    let updatedData = {};
    const values = await form.validateFields();
    try {
      updatedData["FlightNumber"] = values.FlightNumber;
      if (Number.isNaN(parseInt(values.AllowedBaggage)) === true) {
        message.error("Please enter a number ", 1.5);
      } else {
        updatedData["AllowedBaggage"] = parseInt(values.AllowedBaggage);
      }
      if (values.DepartureDate) {
        values.DepartureDate = new Date(Date.parse(values.DepartureDate._d));
        updatedData["DepartureDate"] = values.DepartureDate;
      }
      if (values.ArrivalDate) {
        values.ArrivalDate = new Date(Date.parse(values.ArrivalDate._d));
        updatedData["ArrivalDate"] = values.ArrivalDate;
      }
      if (values.TripDuration) {
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
        updatedData["TripDuration"] = values.TripDuration;
      }
      if (values.DepartureAirport)
        updatedData["DepartureAirport"] = values.DepartureAirport;
      if (values.DepartureCountry)
        updatedData["DepartureCountry"] = values.DepartureCountry;
      if (values.DepartureCountry)
        updatedData["DepartureTerminal"] = values.DepartureTerminal;
      if (values.Departure) updatedData["Departure"] = values.Departure;
      if (values.ArrivalAirport)
        updatedData["ArrivalAirport"] = values.ArrivalAirport;
      if (values.ArrivalCountry)
        updatedData["ArrivalCountry"] = values.ArrivalCountry;
      if (values.ArrivalTerminal)
        updatedData["ArrivalTerminal"] = values.ArrivalTerminal;
      if (values.Arrival) updatedData["Arrival"] = values.Arrival;
      console.log(updatedData);
      sessionStorage.setItem("UpdatedInfo", JSON.stringify(updatedData));
    } catch (e) {}
    // console.log(key);
  }

  return (
    <div>
      <div id="createContainer" style={{ width: "40%" }}>
        <div style={{ width: "50%", height: "50%" }}>
          <Tabs
            defaultActiveKey="1"
            onChange={callback}
            style={{ marginLeft: "20px", width: "600px" }}
          >
            <TabPane
              tab="Flight Information"
              key="1"
              style={{ marginLeft: "-90px" }}
            >
              <Form
                form={form}
                style={{ display: "inline-block", marginTop: "2em" }}
              >
                <Form.Item name="FlightNumber" label="FlightNumber">
                  <Input />
                </Form.Item>
                <Form.Item name="AllowedBaggage" label="Allowed Baggage">
                  <Input />
                </Form.Item>
                <Form.Item name="DepartureDate" label="Departure Time">
                  <DatePicker />
                </Form.Item>
                <Form.Item name="ArrivalDate" label="Arrival Time">
                  <DatePicker />
                </Form.Item>
                <Form.Item name="TripDuration" label="Trip Duration">
                  <TimePicker.RangePicker
                    order={false}
                    format="HH:mm"
                    size="small"
                  />
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane
              tab="Departure Information"
              key="2"
              style={{ marginLeft: "-90px" }}
            >
              <Form
                form={form}
                style={{ display: "inline-block", marginTop: "2em" }}
              >
                <Form.Item name="Departure" label="Departure Airport">
                  <Input />
                </Form.Item>
                <Form.Item name="DepartureCountry" label="Departure Country">
                  <Input />
                </Form.Item>
                <Form.Item name="DepartureAirport" label="Departure City">
                  <Input />
                </Form.Item>
                <Form.Item name="DepartureTerminal" label="Departure Terminal">
                  <Input />
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane
              tab="Arrival Information"
              key="3"
              style={{ marginLeft: "-90px" }}
            >
              <Form
                form={form}
                style={{ display: "inline-block", marginTop: "2em" }}
              >
                <Form.Item name="Arrival" label="Arrival Airport">
                  <Input />
                </Form.Item>
                <Form.Item name="ArrivalCountry" label="Arrival Country">
                  <Input />
                </Form.Item>
                <Form.Item name="ArrivalAirport" label="Arrival City">
                  <Input />
                </Form.Item>
                <Form.Item name="ArrivalTerminal" label="Arrival Terminal">
                  <Input />
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane
              tab="Seats Information"
              key="4"
              style={{ marginLeft: "-90px" }}
            >
              <Form
                form={form}
                style={{ display: "inline-block", marginTop: "2em" }}
              >
                <Form.Item
                  name="EconomyAvailableSeats"
                  label="Economy Class Available Seats"
                >
                  <Input />
                </Form.Item>
                <Form.Item name="EconomyPrice" label="Economy Class Price">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="BusinessAvailableSeats"
                  label="Business Class Available Seats"
                >
                  <Input />
                </Form.Item>
                <Form.Item name="BusinessPrice" label="Business Class Price">
                  <Input />
                </Form.Item>
                <Form.Item name="FirstClassPrice" label="First Class Price">
                  <Input />
                </Form.Item>
                <Form.Item
                  name="FirstClassAvailableSeats"
                  label="First Class Available Seats"
                >
                  <Input />
                </Form.Item>
              </Form>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  onClick={onSubmit}
                  style={{ marginTop: "40px", width: "150px" }}
                >
                  Update Flight
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>

      <div>
        <img className="imageStyle" src={fourthOne} alt="fourthOne" />
      </div>
    </div>
  );
}
