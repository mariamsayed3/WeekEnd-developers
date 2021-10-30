import axios from 'axios';
import 'antd/dist/antd.css';
import { useParams } from "react-router-dom";
import { Button, Form, Input, Row, Col, DatePicker, Card, TimePicker } from 'antd';
require('dotenv').config('../../.env')

const getTripDuration = (from, to) => {
  const fromTime = from.split(':')
  const toTime = to.split(':')

  let fromHours = parseInt(fromTime[0])
  let fromMinutes  = parseInt(fromTime[1])

  let toHours = parseInt(toTime[0])
  let toMinutes  = parseInt(toTime[1])

  let diffHours = (toHours - fromHours < 0) ? toHours - fromHours + 24 : toHours - fromHours
  let diffMinutes = toMinutes - fromMinutes
  if(diffMinutes > 60){
    diffHours++
    diffMinutes -= 60
  }
  else if(diffMinutes < 0){
    diffHours--
    diffMinutes += 60
  }
  if(`${diffHours}`.length == 1) diffHours = '0' + diffHours
  if(`${diffMinutes}`.length == 1) diffMinutes = '0' + diffMinutes

  return `${diffHours}:${diffMinutes}`
}


function CreateFlight() {
  const [form] = Form.useForm();
  const Create = async () => {
    try {
      const values = await form.validateFields();
      values.DepartureDate = new Date(Date.parse(values.DepartureDate))
      values.ArrivalDate = new Date(Date.parse(values.ArrivalDate))
      values.EconomyTotalSeats = parseInt(values.EconomyTotalSeats)
      values.EconomyPrice = parseInt(values.EconomyPrice)
      values.BusinessTotalSeats = parseInt(values.BusinessTotalSeats)
      values.BusinessPrice = parseInt(values.BusinessPrice)
      values.AllowedBaggage = parseInt(values.AllowedBaggage)
      values.EconomyAvailableSeats = values.EconomyTotalSeats
      values.BusinessAvailableSeats = values.BusinessTotalSeats
      values.Seats = parseInt(values.EconomyTotalSeats) + parseInt(values.BusinessTotalSeats)

      const departureTimeHours = (values.TripDuration[0]._d.getHours()+'').length == 1 ?
       '0' + values.TripDuration[0]._d.getHours():
        values.TripDuration[0]._d.getHours()

      const departureTimeMin = (values.TripDuration[0]._d.getMinutes() + '').length == 1 ?
      '0' + values.TripDuration[0]._d.getMinutes():
      values.TripDuration[0]._d.getMinutes()

      const arrivalTimeHours = (values.TripDuration[1]._d.getHours() + '').length == 1 ?
       '0' + values.TripDuration[1]._d.getHours():
        values.TripDuration[1]._d.getHours()

      const arrivalTimeMin = (values.TripDuration[1]._d.getMinutes() + '').length == 1 ?
      '0' + values.TripDuration[1]._d.getMinutes():
      values.TripDuration[1]._d.getMinutes()

      values.DepartureTime = `${departureTimeHours}:${departureTimeMin}`

      values.ArrivalTime = `${arrivalTimeHours}:${arrivalTimeMin}`
      
      values.TripDuration = getTripDuration(values.DepartureTime, values.ArrivalTime)
      values.NumberOfPassengers = 0
    
      await axios.post(`http://localhost:8000/admin/create_flight`, values);
    }
    catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Card className="card" style={{ width: '60%', margin: '3% auto' }}>
        <Form form={form} onSubmit={Create} name="Create Flight">
          <Form.Item
            name="FlightNumber"
            label="Flight Number"
            style={{ width: '60%' }}
            rules={[{ required: true, message: 'Please enter the flight number' }]}>
            <Input     
              placeholder="Flight No." />
          </Form.Item>

          <Row gutter={16, 8}>
            <Col span={10}>
              <Form.Item
                name="DepartureDate"
                label="Departure Date"
                rules={[{ required: true, message: 'Please enter the departure date' }]}
              >
                <DatePicker/>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="ArrivalDate"
                label="Arrival Date"
                rules={[{ required: true, message: 'Please enter the arrival date' }]}
              >
                <DatePicker/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16, 8}>
            <Col span={8}>
              <Form.Item
                name="DepartureAirport"
                label="Departure Airport"
                rules={[{ required: true, message: 'Please enter the departure airport' }]}
              >
                <Input placeholder="Departure Airport" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="ArrivalAirport"
                label="Arrival Airport"
                rules={[{ required: true, message: 'Please enter the arrival airport' }]}
              >
                <Input placeholder="Arrival Airport" />
                
              </Form.Item>
            </Col>
            <Col span={8}>
            <Form.Item
                name="TripDuration"
                label="Trip Duration"
                rules={[{ required: true, message: 'Please enter the trip duration' },]}
              >
                <TimePicker.RangePicker order={false} format="HH:mm" size="small" />
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
                <Input placeholder="Departure Terminal" />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                name="ArrivalTerminal"
                label="Arrival Terminal"
                rules={[{ required: true, message: 'Please enter the arrival terminal' }]}
              >
                <Input placeholder="Arrival Terminal" />
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
                  <Input placeholder="Please specify the number" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  name="EconomyPrice"
                  label="Economy Seat Price"
                  rules={[{ required: true, message: 'Please enter a price' }]}
                >
                  <Input placeholder="price" />
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
                  <Input placeholder="Please specify the number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="BusinessPrice"
                  label="Business Class Seat Price"
                  rules={[{ required: true, message: 'Please enter a price' }]}
                >
                  <Input placeholder="price" />
                </Form.Item>
              </Col>
            </div>
          </Row>

          <Form.Item
            name="AllowedBaggage"
            label="Allowed Baggage"
            style={{width:'30%'}}
            rules={[{ required: true, message: 'Please specify the allowed baggage' }]}>
            <Input placeholder="No. of Bags" />
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
