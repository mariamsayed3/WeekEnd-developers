import React, { useState } from "react";
import "../../../Styles/createFlight.scss";
import "antd/dist/antd.css";
import State from "./State";
import thirdOne from "../../../Styles/thirdOne.png";
import { Form, Input, DatePicker } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
import { GrLinkNext } from "react-icons/gr";
import { useHistory, Link } from "react-router-dom";
import DropDown from "../../General/DropDown";
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
  const [selected, setSelected] = useState();
  const [arrival, setArr] = useState();
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
  let arr2;
  const getLocation = (location) => {
    let res = [];
    res.push(location.substring(0, 3));
    let str = "";
    for (let i = 5; i < location.length; i++) {
      if (location.charAt(i) != ",") str += location.charAt(i);
      else {
        res.push(str);
        str = "";
        i += 1;
      }
    }
    res.push(str);
    return res;
  };
  if (arrival) {
    arr2 = getLocation(arrival);
  }
  return (
    <div>
      <State decide={whichone} />
      <div id="createContainer" style={{ width: "30%" }}>
        <Form style={{ padding: "40px" }} form={form} onSubmit={Create}>
          <Form.Item
            name="Arrival"
            label={<span style={{ fontSize: "20px" }}>Arrival Airport</span>}
            rules={[
              {
                required: true,
                message: "Please enter the arrival airport",
              },
            ]}
          >
            {console.log(arr2)}
            <Input
              autocomplete="off"
              onClick={(e) => setSelected(false)}
              placeholder="Arrival Airport"
              onChange={(e) => setArr(e.target.value)}
              value={arrival ? arrival : ""}
            />
          </Form.Item>
          <div>
            {arrival && arrival.length > 2 && (
              <DropDown
                component="arrAirport"
                term={arrival}
                selected={selected}
                setSelected={setSelected}
                setData={""}
                data={""}
                setFrom={""}
                from={""}
                setTo={setArr}
                to={arrival}
              />
            )}
          </div>
          <Form.Item
            name="ArrivalAirport"
            label={<span style={{ fontSize: "20px" }}>Arrival City</span>}
            rules={[
              { required: true, message: "Please enter the arrival city" },
            ]}
          >
            {console.log(arr2)}
            <Input placeholder="Arrival City" value={arr2 ? arr2[2] : ""}/>
          </Form.Item>
          <Form.Item
            name="ArrivalCountry"
            label={<span style={{ fontSize: "20px" }}>Arrival Country</span>}
            rules={[
              { required: true, message: "Please enter the arrival country" },
            ]}
          >
            {console.log(arr2)}
            <Input placeholder="Arrival Country" value={arr2 ? arr2[3] : ""} />
          </Form.Item>

          <Form.Item
            name="ArrivalTerminal"
            label={<span style={{ fontSize: "20px" }}>Arrival Terminal</span>}
            rules={[
              {
                required: true,
                message: "Please enter the arrival terminal",
              },
            ]}
          >
            <Input placeholder="Arrival Terminal" />
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
        <img className="imageStyle" src={thirdOne} alt="thirdOne" />
      </div>
    </div>
  );
}
