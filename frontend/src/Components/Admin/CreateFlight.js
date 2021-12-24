import axios from 'axios';
import 'antd/dist/antd.css';
import './Admin.css';
import moment from 'moment'
import { Button, message, Form, Input, Row, Col, DatePicker, Card,TimePicker  } from 'antd';
// import '../../Styles/background.scss';
const { RangePicker } = DatePicker;
require('dotenv').config('../../.env')

export const getTripDuration = (from, to) => {
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
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}
function disabledRangeTime(_, type) {
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 60).splice(24, 20),
      disabledMinutes: () => range(30, 60).splice(60, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
}

function CreateFlight() {
  const [form] = Form.useForm();
  const Create = async () => {
    try {
      const values = await form.validateFields();
      values.ArrivalDate = new Date(Date.parse(values.DepartureDate[1]._d))
      values.DepartureDate = new Date(Date.parse(values.DepartureDate[0]._d))
      values.EconomyPrice = parseInt(values.EconomyPrice)
      values.BusinessPrice = parseInt(values.BusinessPrice)
      values.FirstClassPrice = parseInt(values.FirstClassPrice)
      values.AllowedBaggage = parseInt(values.AllowedBaggage)
      values.EconomyAvailableSeats = parseInt(values.EconomyTotalSeats)
      values.BusinessAvailableSeats = parseInt(values.BusinessTotalSeats)
      values.FirstClassAvailableSeats = parseInt(values.FirstClassTotalSeats)
      values.BusinessSeats = new Array(parseInt(values.BusinessTotalSeats))
      values.EconomySeats = new Array(parseInt(values.EconomyTotalSeats))
      values.FirstClassSeats = new Array(parseInt(values.FirstClassTotalSeats))
      
      for(let i = 0 ; i < values.BusinessSeats.length ; i++)
        values.BusinessSeats[i] = {number: `B${i+1}`, reserved: false, type: null}

      for(let i = 0 ; i < values.EconomySeats.length ; i++)
        values.EconomySeats[i] = {number: `C${i+1}`, reserved: false, type: null}

      for(let i = 0 ; i < values.FirstClassSeats.length ; i++)
        values.FirstClassSeats[i] = {number: `A${i+1}`, reserved: false, type: null}
      
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
      values.NumberOfPassengers = {Adults: 0, Children: 0}
    
      await axios.post(`http://localhost:8000/admin/create_flight`, values);
      message
                .loading('Action in progress..', 2.5)
                .then(() => message.success('Flight Created Succesfully', 3));
    }
    catch (e) {
      console.log(e)
      message
      .loading('Action in progress..', 2.5)
      .then(() => message.error('Something went wrong please try again. Make sure you entered a unique flight number!', 3));
    }
  }

  return (
    <div>
      <Card title="Add a New Flight to the System"
       headStyle={{fontSize: '20px',color:'white',background:'#034f84'}}
       className="updateCard">
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
          <Col span={12}>
              <Form.Item
                name="DepartureDate"
                label="Departure Date and Arrival Date"
                rules={[{ required: true, message: 'Please enter the date' }]}
              >
                <RangePicker
                width='60%'
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                ranges={{
                  Today: [moment(), moment()],
                }}
                format="YYYY-MM-DD"
              />
              </Form.Item>
            </Col>
            
             <Col span={12}>
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
          <Col span={12}>
              <Form.Item
                name="DepartureCountry"
                label="Departure Country"
                rules={[{ required: true, message: 'Please enter the departure country' }]}
              >
                <Input placeholder="Departure Country" />
                
              </Form.Item>
              
            </Col>
            <Col span={12}>
              <Form.Item
                name="DepartureAirport"
                label="Departure City"
                rules={[{ required: true, message: 'Please enter the departure city' }]}
              >
                <Input placeholder="Departure City" />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item
                name="ArrivalCountry"
                label="Arrival Country"
                rules={[{ required: true, message: 'Please enter the arrival country' }]}
              >
                <Input placeholder="Arrival Country" />
                
              </Form.Item>
              </Col>
             
            <Col span={12}>
              <Form.Item
                name="ArrivalAirport"
                label="Arrival City"
                rules={[{ required: true, message: 'Please enter the arrival city' }]}
              >
                <Input placeholder="Arrival City" />
                
              </Form.Item>
              
            </Col>
            <Col span={12}>
            <Form.Item
                name="Departure"
                label="Departure Airport"
                rules={[{ required: true, message: 'Please enter the departure airport' }]}
              >
                <Input placeholder="Departure Airport" />
                
              </Form.Item>
              </Col>
              <Col span={12}>
            <Form.Item
                name="Arrival"
                label="Destination Airport"
                rules={[{ required: true, message: 'Please enter the arrival airport' }]}
              >
                <Input placeholder="Arrival Airport" />
                
              </Form.Item>
              </Col>
          </Row>

          <Row gutter={16, 8}>
            <Col span={12}>
              <Form.Item
                name="DepartureTerminal"
                label="Departure Terminal"
                rules={[{ required: true, message: 'Please enter the departure terminal' }]}
              >
                <Input placeholder="Departure Terminal" />
              </Form.Item>
            </Col>
            <Col span={12}>
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
              <Col span={12}>
                <Form.Item
                  name="EconomyTotalSeats"
                  label="Economy Class Seats"
                  rules={[{ required: true, message: 'Please enter a number' }]}
                >
                  <Input placeholder="Please specify the number" />
                </Form.Item>
              
                <Form.Item
                  name="EconomyPrice"
                  label="Economy Class Seat Price"
                  rules={[{ required: true, message: 'Please enter a price' }]}
                >
                  <Input placeholder="price" />
                </Form.Item>
              </Col>
            </div>
            <div>
              <h4>First Class Section</h4>
              <Col span={12}>
                <Form.Item
                  name="FirstClassTotalSeats"
                  label="First Class Class Seats"
                  rules={[{ required: true, message: 'Please enter a number' }]}
                >
                  <Input placeholder="Please specify the number" />
                </Form.Item>
              
                <Form.Item
                  name="FirstClassPrice"
                  label="First Class Seat Price"
                  rules={[{ required: true, message: 'Please enter a price' }]}
                >
                  <Input placeholder="price" />
                </Form.Item>
              </Col>
            </div>
            <div>
              <h4>Business Class Section</h4>
              <Col span={12}>
                <Form.Item
                  name="BusinessTotalSeats"
                  label="Business Class Seats"
                  rules={[{ required: true, message: 'Please enter a number' }]}
                >
                  <Input placeholder="Please specify the number" />
                </Form.Item>
              
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
            <Button type="primary" onClick={Create} style={{background: '#034f84', borderColor: '#034f84',marginTop: '40px', width: '150px' }}>
              Create Flight
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateFlight;
