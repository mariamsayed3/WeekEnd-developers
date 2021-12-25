import React, { Component } from "react";
import axios from "axios";
import "../../../Styles/createFlight.scss";
import "antd/dist/antd.css";
import State from "./State";
import fourthOne from "../../../Styles/fourthOne.png";
import { Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
export default function CreateFlightFour() {
 
  let whichone = {
    first: true,
    second: true,
    third: true,
    fourth: false,
    nowFI: false,
    nowS: false,
    nowT: false,
    nowFO: true,
  };
  const [form] = Form.useForm();
  let history = useHistory();
  const Create = async () => {
    try {
      const values = await form.validateFields();

      values.EconomyPrice = parseInt(values.EconomyPrice);
      values.BusinessPrice = parseInt(values.BusinessPrice);
      values.FirstClassPrice = parseInt(values.FirstClassPrice);
      let info = sessionStorage.getItem("Information");
      info = JSON.parse(info);
      info["EconomyPrice"] = values.EconomyPrice;
      info["BusinessPrice"] = values.BusinessPrice;
      info["FirstClassPrice"] = values.FirstClassPrice;

      values.EconomyAvailableSeats = parseInt(values.EconomyTotalSeats);
      values.BusinessAvailableSeats = parseInt(values.BusinessTotalSeats);
      values.FirstClassAvailableSeats = parseInt(values.FirstClassTotalSeats);
      info["FirstClassAvailableSeats"] = values.FirstClassAvailableSeats;
      info["BusinessAvailableSeats"] = values.BusinessPrice;
      info["EconomyAvailableSeats"] = values.EconomyTotalSeats;

      values.BusinessSeats = new Array(parseInt(values.BusinessTotalSeats));
      values.EconomySeats = new Array(parseInt(values.EconomyTotalSeats));
      values.FirstClassSeats = new Array(parseInt(values.FirstClassTotalSeats));

      values.NumberOfPassengers = { Adults: 0, Children: 0 };

      for (let i = 0; i < values.BusinessSeats.length; i++)
        values.BusinessSeats[i] = {
          number: `B${i + 1}`,
          reserved: false,
          type: null,
        };

      for (let i = 0; i < values.EconomySeats.length; i++)
        values.EconomySeats[i] = {
          number: `C${i + 1}`,
          reserved: false,
          type: null,
        };

      for (let i = 0; i < values.FirstClassSeats.length; i++)
        values.FirstClassSeats[i] = {
          number: `A${i + 1}`,
          reserved: false,
          type: null,
        };

      info["FirstClassSeats"] = values.FirstClassSeats;
      info["EconomySeats"] = values.EconomySeats;
      info["BusinessSeats"] = values.BusinessSeats;

      info["NumberOfPassengers"] = values.NumberOfPassengers;

      sessionStorage.setItem("Information", JSON.stringify(info));

      info = JSON.parse(sessionStorage.getItem("Information"));
      await axios.post(`http://localhost:8000/admin/create_flight`, info);
      message
        .loading("Action in progress..", 2.5)
        .then(() => {message.success("Flight Created Succesfully", 3)
        sessionStorage.removeItem("Information")
        history.push('/admin/flights')
      });
    } catch {
      message
        .loading("Action in progress..", 2.5)
        .then(() => message.error("Something went wrong please try again. Make sure you entered a unique flight number", 3));
    }

  };
  return (
    <div>
      <State decide={whichone} />
      <div id="createContainer" style={{ width: "35%" }}>
        <Form
          style={{ padding: '50px'}}
          form={form}
          onSubmit={Create}
        >
          <Form.Item
            name="EconomyTotalSeats"
            label={
              <span style={{fontSize: "20px" }}>
                Economy Class Seats
              </span>
            }
            rules={[{ required: true, message: "Please enter a number" }]}
          >
            <Input
              placeholder="Please specify the number"
            />
          </Form.Item>

          <Form.Item
            name="EconomyPrice"
            label={
              <span style={{fontSize: "20px" }}>
                Economy Class Seats Price
              </span>
            }
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input
              placeholder="price"
            />
          </Form.Item>
          <Form.Item
            name="FirstClassTotalSeats"
            label={
              <span style={{fontSize: "20px" }}>
                First Class Seats 
              </span>
            }
            rules={[{ required: true, message: "Please enter a number" }]}
          >
            <Input
              placeholder="Please specify the number"
            />
          </Form.Item>

          <Form.Item
            name="FirstClassPrice"
            label={
              <span style={{fontSize: "20px" }}>
                First Class Seats Price
              </span>
            }
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input
              placeholder="price"
              style={{ width: "40%", marginLeft: "-60%" }}
            />
          </Form.Item>
          <Form.Item
            name="BusinessTotalSeats"
            label={
              <span style={{fontSize: "20px" }}>
                Business Class Seats 
              </span>
            }
            rules={[{ required: true, message: "Please enter a number" }]}
          >
            <Input
              placeholder="Please specify the number"
            />
          </Form.Item>

          <Form.Item
            name="BusinessPrice"
            label={
              <span style={{fontSize: "20px" }}>
                Business Class Seats Price
              </span>
            }
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input
              placeholder="price"
            />
          </Form.Item>
          <div>
            <GrLinkNext
              style={{ float: 'right', cursor: 'pointer' }}
              size="40"
              onClick={Create}
            />
          </div>
        </Form>
      </div>
      <div>
        <img className="imageStyle" src={fourthOne} alt="fourthOne" style={{marginTop: '-30%'}}/>
      </div>
    </div>
  );
}
