import React, { Component } from "react";
import { Carousel, Form } from "antd";
import { useLocation } from "react-router-dom";
import {
  Button,
  message,
  Input,
  DatePicker,
  Card,
  Row,
  Col,
  TimePicker,
} from "antd";
import RightCircleOutlined from "@ant-design/icons";
import fourthOne from "../../../Styles/fourthOne.png";
import { getTripDuration } from "../CreateFlight/CreateFlightOne";
import axios from "axios";
import "antd/dist/antd.css";
import "../../../Styles/editflightadmin.scss";
import airplane from "../../../Styles/airplane.jpg";
import { GrCaretNext } from "react-icons/gr";

export default function UpdateFlightadmin() {
  const location = useLocation();
  const { state } = location;
  const id = 112131;
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
      } = data;
      form.setFieldsValue({
        FlightNumber,
        DepartureAirport,
        ArrivalAirport,
        EconomyAvailableSeats,
        EconomyPrice,
        BusinessAvailableSeats,
        BusinessPrice,
      });
    }
  };
  getFlight();
  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (values.DepartureDate)
        values.DepartureDate = new Date(Date.parse(values.DepartureDate._d));
      if (values.ArrivalDate)
        values.ArrivalDate = new Date(Date.parse(values.ArrivalDate._d));
      if (values.EconomyAvailableSeats)
        values.EconomyAvailableSeats = parseInt(values.EconomyAvailableSeats);
      if (values.EconomyPrice)
        values.EconomyPrice = parseInt(values.EconomyPrice);
      if (values.BusinessAvailableSeats)
        values.BusinessAvailableSeats = parseInt(values.BusinessAvailableSeats);
      if (values.BusinessPrice)
        values.BusinessPrice = parseInt(values.BusinessPrice);

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
      }

      await axios.patch(
        `http://localhost:8000/admin/update_flight/${id}`,
        values
      );
      message
        .loading("Action in progress..", 2.5)
        .then(() => message.success("Flight Updated Succesfully", 3));
    } catch (e) {
      message.error("Something went wrong. please try again.", 3);
    }
  };
  const nextSlide = () => {
    this.carousel.next();
  };
  return <div></div>;
}
