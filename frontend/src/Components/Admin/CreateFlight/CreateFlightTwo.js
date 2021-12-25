import React, { Component } from "react";
import "../../../Styles/createFlight.scss";
import "antd/dist/antd.css";
import State from "./State";
import secondOne from "../../../Styles/secondOne.png";
import { Form, Input, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
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
    info["DepartureAirport"] = values.DepartureAirport; //city
    info["DepartureCountry"] = values.DepartureCountry;
    info["DepartureTerminal"] = values.DepartureTerminal;
    info["Departure"] = values.Departure; //airport


    sessionStorage.setItem("Information", JSON.stringify(info));
    history.push("/admin/createFlightThree");
  };
  return (
    <>
    <State decide={whichone} />
    
      
      <div id="createContainer" style={{ width: "40%" }}>
        <Form
          style={{ padding: '50px'}}
          form={form}
          onSubmit={Create}
        >
          <Form.Item
            name="DepartureCountry"
            label={
              <span style={{ fontSize: "20px" }}>
                Departure Country
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please enter the departure country",
              },
            ]}
          >
            <Input style={{width: "350px"}} placeholder="Departure Country"/>
          </Form.Item>
          <Form.Item
            name="DepartureAirport"
            label={
              <span style={{ fontSize: "20px" }}>
                Departure City
              </span>
            }
            rules={[
              { required: true, message: "Please enter the departure city" },
            ]}
          >
            <Input
              placeholder="Departure City"
            />
          </Form.Item>
          <Form.Item
            name="Departure"
            label={
              <span style={{ fontSize: "20px" }}>
                Departure Airport
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please enter the departure airport",
              },
            ]}
          >
            <Input
              placeholder="Departure Airport"
            />
          </Form.Item>
          <Form.Item
            name="DepartureTerminal"
            label={
              <span style={{ fontSize: "20px" }}>
                Departure Terminal
              </span>
            }
            rules={[
              {
                required: true,
                message: "Please enter the departure terminal",
              },
            ]}
          >
            <Input
              placeholder="Departure Terminal"
            />
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
        <img className="imageStyle2" src={secondOne} alt="secondOne" style={{marginTop: '-25%'}} />
      </div>
  
    </>
  );
}
