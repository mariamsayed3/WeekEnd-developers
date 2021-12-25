import React, { Component, useState } from "react";
import "../../../Styles/createFlight.scss";
import "antd/dist/antd.css";
import State from "./State";
import secondOne from "../../../Styles/secondOne.png";
import { Form, Input, DatePicker } from "antd";
import { useHistory } from "react-router-dom";
import { GrLinkNext } from "react-icons/gr";
import DropDown from "../../General/DropDown";
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
  const [selected, setSelected] = useState();
  const [dep, setDep] = useState();
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
  console.log(dep);
  return (
    <>
      <State decide={whichone} />

      <div id="createContainer" style={{ width: "30%" }}>
        <Form style={{ padding: "50px" }} form={form} onSubmit={Create}>
          <Form.Item
            name="Departure"
            label={<span style={{ fontSize: "20px" }}>Departure Airport</span>}
            rules={[
              {
                required: true,
                message: "Please enter the departure airport",
              },
            ]}
          >
            <Input
              autocomplete="off"
              onClick={(e) => setSelected(false)}
              placeholder="Departure Airport"
              onChange={(e) => setDep(e.target.value)}
              value={dep}
            />
          </Form.Item>
          <div>
            {dep && dep.length > 2 && (
              <DropDown
                component="depAirport"
                term={dep}
                selected={selected}
                setSelected={setSelected}
                setData={""}
                data={""}
                setFrom={setDep}
                from={dep}
                setTo={""}
                to={""}
              />
            )}
          </div>
          <Form.Item
            name="DepartureAirport"
            label={<span style={{ fontSize: "20px" }}>Departure City</span>}
            rules={[
              { required: true, message: "Please enter the departure city" },
            ]}
          >
            <Input placeholder="Departure City" />
          </Form.Item>
          <Form.Item
            name="DepartureCountry"
            label={<span style={{ fontSize: "20px" }}>Departure Country</span>}
            rules={[
              {
                required: true,
                message: "Please enter the departure country",
              },
            ]}
          >
            <Input placeholder="Departure Country" />
          </Form.Item>

          <Form.Item
            name="DepartureTerminal"
            label={<span style={{ fontSize: "20px" }}>Departure Terminal</span>}
            rules={[
              {
                required: true,
                message: "Please enter the departure terminal",
              },
            ]}
          >
            <Input placeholder="Departure Terminal" />
          </Form.Item>
          <div>
            <GrLinkNext
              style={{ float: "right", cursor: "pointer" }}
              size="40"
              onClick={Create}
            />
          </div>
        </Form>
      </div>
      <div>
        <img className="imageStyle" src={secondOne} alt="secondOne" />
      </div>
    </>
  );
}
