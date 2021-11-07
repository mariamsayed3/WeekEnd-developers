
import axios from 'axios';
import 'antd/dist/antd.css';
import {useLocation} from "react-router-dom";
import {Button, message, Form, Input, DatePicker, Card, Row, Col, TimePicker} from 'antd';
import { getTripDuration } from './CreateFlight';
import './Admin.css';
require ('dotenv').config()



function UpdateFlight() {
  const location = useLocation()
  const { state } = location
    const id = state.id
    const [form] = Form.useForm();

    const getFlight = async () =>{
      const {data} = await axios.get (`http://localhost:8000/admin/get_flight/${id}`);
      if(data){
          const {FlightNumber,DepartureAirport,ArrivalAirport, EconomyAvailableSeats,EconomyPrice, BusinessAvailableSeats, BusinessPrice }=data

          form.setFieldsValue({FlightNumber, DepartureAirport,ArrivalAirport, EconomyAvailableSeats,EconomyPrice, BusinessAvailableSeats, BusinessPrice  });
        }
      }
      getFlight()
  

    const onSubmit = async () => {

        try {
          const values = await form.validateFields();
          console.log(values)
          if (values.DepartureDate) values.DepartureDate = new Date(Date.parse(values.DepartureDate._d)) 
          if (values.ArrivalDate) values.ArrivalDate = new Date(Date.parse(values.ArrivalDate._d))
          if (values.EconomyAvailableSeats) values.EconomyAvailableSeats = parseInt(values.EconomyAvailableSeats)
          if (values.EconomyPrice) values.EconomyPrice = parseInt(values.EconomyPrice)
          if (values.BusinessAvailableSeats) values.BusinessAvailableSeats = parseInt(values.BusinessAvailableSeats)
          if (values.BusinessPrice) values.BusinessPrice = parseInt(values.BusinessPrice)

          if(values.TripDuration){
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
      }
    
              await axios.patch (`http://localhost:8000/admin/update_flight/${id}`, values);
              message
              .loading('Action in progress..', 2.5)
              .then(() => message.success('Flight Updated Succesfully', 3));
          } catch (e) {
            message.error('Something went wrong. please try again.', 3);
          }
      };
    
      return(
        <div>
          <Card className='updateCard'>

          <div className='updateForm'> 
          <Form form={form} name="Update Flight" >
                <Row gutter={16,8}>
                  <Col span={6}>
                    <Form.Item
                      name="FlightNumber"
                      label="FlightNumber"
                    >
                      <Input/>
                    </Form.Item>
                </Col>
                  <Col span={6}>
                    <Form.Item
                      name="DepartureDate"
                      label="Departure Time"
                    >
                    <DatePicker />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item
                      name="ArrivalDate"
                      label="Arrival Time"
                    >
                    <DatePicker />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item
                        name="TripDuration"
                        label="Trip Duration"
                    >
                        <TimePicker.RangePicker order={false} format="HH:mm" size="small" />
                    </Form.Item>
            </Col>
                </Row>

                <Row gutter={16,8}>
                  <Col span={12}>
                    <Form.Item
                      name="DepartureAirport"
                      label="Departure Airport"
                    >
                      <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                      name="ArrivalAirport"
                      label="Arrival Airport"
                    >
                      <Input/>
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={8,8}> 
                  <Col span={12}>
                    <Form.Item
                      name="EconomyAvailableSeats"
                      label="Economy Class Available Seats"
                    >
                      <Input placeholder="Please"/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="EconomyPrice"
                      label="Economy Class Price"
                    >
                      <Input/>
                    </Form.Item>
                  </Col>
                  </Row>

                  <Row gutter={8,8}> 
                    <Col span={12}>
                      <Form.Item
                        name="BusinessAvailableSeats"
                        label="Business Class Available Seats"
                      >
                        <Input/>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="BusinessPrice"
                        label="Business Class Price"
                      >
                        <Input/>
                      </Form.Item>
                    </Col>  
                  </Row>
                {/* {error && <Alert message={error} type="error" /> } */}
                    <div style={{textAlign:'center'}}>
                      <Button type="primary" onClick={onSubmit} style={{ marginTop: '40px', width: '150px'}}>
                        Update Flight
                      </Button>
                      </div>
              </Form>
              </div>
          </Card>
        </div>
      )
}
export default UpdateFlight  ;  