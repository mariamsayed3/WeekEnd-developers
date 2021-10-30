import { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './Admin.css';
import { useParams } from "react-router-dom";
import { Button, Modal, Form, Input, Row, Col, DatePicker, Radio, Card } from 'antd';
import { Mongoose } from 'mongoose';
require('dotenv').config('../../.env')

const getTimeHours = (time) => ((time / 1000) / 3600);


function CreateFlight() {
  const [form] = Form.useForm();
  const [FlightNumber, setFlightNumber] = useState("");
  const [DepartureTime, setDepartureTime] = useState("");
  const [ArrivalTime, setArrivalTime] = useState("");
  const [DepartureAirport, setDepartureAirport] = useState("");
  const [ArrivalAirport, setArrivalAirport] = useState("");
  const [DepartureTerminal, setDepartureTerminal] = useState("");
  const [ArrivalTerminal, setArrivalTerminal] = useState("");
  const [EconomyTotalSeats, setEconomyTotalSeats] = useState();
  const [BusinessTotalSeats, setBusinessTotalSeats] = useState();
  const [EconomyPrice, setEconomyPrice] = useState();
  const [BusinessPrice, setBusinessPrice] = useState();
  const [AllowedBaggage, setAllowedBaggage] = useState();

  const Create = async () => {
    try {
      const values = await form.validateFields();
      // console.log(values)
      if (values.DepartureTime) values.DepartureTime = new Date(Date.parse(values.DepartureTime))
      if (values.ArrivalTime) values.ArrivalTime = new Date(Date.parse(values.ArrivalTime))
      if (values.EconomyTotalSeats) values.EconomyTotalSeats = parseInt(values.EconomyTotalSeats)
      if (values.EconomyPrice) values.EconomyPrice = parseInt(values.EconomyPrice)
      if (values.BusinessTotalSeats) values.BusinessTotalSeats = parseInt(values.BusinessTotalSeats)
      if (values.BusinessPrice) values.BusinessPrice = parseInt(values.BusinessPrice)
      if (values.AllowedBaggage) values.AllowedBaggage = parseInt(values.AllowedBaggage)
      values.EconomyAvailableSeats = values.EconomyTotalSeats
      values.BusinessAvailableSeats = values.BusinessTotalSeats
      values.Seats = parseInt(values.EconomyTotalSeats) + parseInt(values.BusinessTotalSeats)
      values.TripDuration = getTimeHours(values.ArrivalTime - values.DepartureTime)
      values.NumberOfPassengers = 0
      await axios.post(`http://localhost:8000/admin/create_flight`, values);
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Card className="updateCard">
        <Form form={form} onSubmit={Create} name="Create Flight">
          <Form.Item
            name="FlightNumber"
            label="Flight Number"
            style={{ width: '60%' }}
            rules={[{ required: true, message: 'Please enter the flight number' }]}>
            <Input
              value={FlightNumber}
              onChange={(e) => setFlightNumber(e.target.value)}
              placeholder="Flight No." />
          </Form.Item>

          <Row gutter={16, 8}>
            <Col span={10}>
              <Form.Item
                name="DepartureTime"
                label="Departure Time"
                rules={[{ required: true, message: 'Please enter the departure time' }]}
              >
                <DatePicker
                  value={DepartureTime}
                // onChange={(e) => setDepartureTime(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="ArrivalTime"
                label="Arrival Time"
                rules={[{ required: true, message: 'Please enter the arrival time' }]}
              >
                <DatePicker
                  value={ArrivalTime}
                // onChange={(e) => setArrivalTime(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16, 8}>
            <Col span={10}>
              <Form.Item
                name="DepartureAirport"
                label="Departure Airport"
                rules={[{ required: true, message: 'Please enter the departure airport' }]}
              >
                <Input
                  value={DepartureAirport}
                  onChange={(e) => setDepartureAirport(e.target.value)}
                  placeholder="Departure Airport" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="ArrivalAirport"
                label="Arrival Airport"
                rules={[{ required: true, message: 'Please enter the arrival airport' }]}
              >
                <Input
                  value={ArrivalAirport}
                  onChange={(e) => setArrivalAirport(e.target.value)}
                  placeholder="Arrival Airport" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16, 8}>
            <Col span={10}>
              <Form.Item
                name="DepartureTerminal"
                label="Departure Terminal"
                rules={[{ required: true, message: 'Please enter the departure terminal' }]}
              >
                <Input
                  value={DepartureTerminal}
                  onChange={(e) => setDepartureTerminal(e.target.value)}
                  placeholder="Departure Terminal" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="ArrivalTerminal"
                label="Arrival Terminal"
                rules={[{ required: true, message: 'Please enter the arrival terminal' }]}
              >
                <Input
                  value={ArrivalTerminal}
                  onChange={(e) => setArrivalTerminal(e.target.value)}
                  placeholder="Arrival Terminal" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16, 14}>
            <div>
              <h4>Economy Class Section</h4>
              <Col span={14}>
                <Form.Item
                  name="EconomyTotalSeats"
                  label="Number of Economy Seats"
                  rules={[{ required: true, message: 'Please enter a number' }]}
                >
                  <Input
                    value={EconomyTotalSeats}
                    onChange={(e) => setEconomyTotalSeats(e.target.value)}
                    placeholder="Please specify the number" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="EconomyPrice"
                  label="Economy Seat Price"
                  rules={[{ required: true, message: 'Please enter a price' }]}
                >
                  <Input
                    value={EconomyPrice}
                    onChange={(e) => setEconomyPrice(e.target.value)}
                    placeholder="price" />
                </Form.Item>
              </Col>
            </div>
            <div>
              <h4>Business Class Section</h4>
              <Col span={14}>
                <Form.Item
                  name="BusinessTotalSeats"
                  label="Number of Business Class Seats"
                  rules={[{ required: true, message: 'Please enter a number' }]}
                >
                  <Input
                    value={BusinessTotalSeats}
                    onChange={(e) => setBusinessTotalSeats(e.target.value)}
                    placeholder="Please specify the number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="BusinessPrice"
                  label="Business Class Seat Price"
                  rules={[{ required: true, message: 'Please enter a price' }]}
                >
                  <Input
                    value={BusinessPrice}
                    onChange={(e) => setBusinessPrice(e.target.value)}
                    placeholder="price" />
                </Form.Item>
              </Col>
            </div>
          </Row>

          <Form.Item
            name="AllowedBaggage"
            label="Allowed Baggage"
            style={{width:'30%'}}
            rules={[{ required: true, message: 'Please specify the allowed baggage' }]}>
            <Input
              value={AllowedBaggage}
              onChange={(e) => setAllowedBaggage(e.target.value)}
              placeholder="No. of Bags" />
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={Create} style={{ marginTop: '40px', width: '150px' }}>
              Create Flight
                      </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateFlight;
