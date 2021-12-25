import React from "react";
import { Form, Button, InputNumber } from "antd";
import "../../../Styles/createFlight.scss";
import "../../../Styles/editflightadmin.scss";

import { message, Input, DatePicker, TimePicker} from "antd";
import fourthOne from "../../../Styles/fourthOne.png";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "antd/dist/antd.css";

import { Tabs } from "antd";
import { useLocation } from "react-router-dom";

const { TabPane } = Tabs;

export default function UpdateFlightadmin() {
  const [form] = Form.useForm();
  const history = useHistory()
  const location = useLocation()
  const { state } = location
  const id = state.id
  const baggage = state.baggage
  const getTripDuration = (from, to) => {
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

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      let lastNewValues = JSON.parse(sessionStorage.getItem("UpdatedInfo"));
      
      if (values.EconomyPrice)
        lastNewValues["EconomyPrice"] = parseInt(values.EconomyPrice);
      
      if (values.BusinessPrice)
        lastNewValues["BusinessPrice"] = parseInt(values.BusinessPrice);

      if (values.FirstClassPrice)
        lastNewValues["FirstClassPrice"] = parseInt(values.FirstClassPrice);
      await axios.patch(`http://localhost:8000/admin/update_flight/${id}`,lastNewValues);
      message
        .loading("Action in progress..", 2.5)
        .then(() => {message.success("Flight Updated Succesfully", 3); history.push('/admin/flights')});
    } catch (e) {
      console.log(e);
      message.error("Something went wrong. please try again.", 3);
    }
  };

  async function callback() {
    let updatedData = {};
    const values = await form.validateFields();
    try {
      updatedData["FlightNumber"] = values.FlightNumber;
      
      updatedData["AllowedBaggage"] = parseInt(values.AllowedBaggage);
      
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
                <Form.Item name="AllowedBaggage"
                 label="Allowed Baggage"
                 
                 >
                  <InputNumber defaultValue={baggage}/>
                </Form.Item>
                <Form.Item name="DepartureDate" label="Departure Time">
                  <DatePicker disabledDate={disabledDate} />
                </Form.Item>
                <Form.Item name="ArrivalDate" label="Arrival Time">
                  <DatePicker disabledDate={disabledDate}/>
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
              style={{ float: "left" }}
            >
              <Form
                form={form}
                style={{ display: "inline-block", marginTop: "2em",  }}
              >
                
                <Form.Item name="EconomyPrice" 
                label="Economy Class Price"
                
                >
                 <InputNumber />
                </Form.Item>
                
                <Form.Item name="BusinessPrice" 
                label="Business Class Price"
                
                >
                  <InputNumber/>
                </Form.Item>
                <Form.Item name="FirstClassPrice" 
                label="First Class Price"
                
                >
                  <InputNumber/>
                </Form.Item>
                
              </Form>
              <div style={{ textAlign: "center"}}>
                <Button

                  type="primary"
                  onClick={onSubmit}
                  style={{ margin: "30px", width: "150px" }}
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
