
import axios from 'axios';
import 'antd/dist/antd.css';
import {useParams, useLocation} from "react-router-dom";
import {Button, Form, Input, DatePicker, Card, Row, Col} from 'antd';
import './Admin.css';
require ('dotenv').config()



function UpdateFlight() {
  const location = useLocation()
  const { state } = location
    console.log(location)
    const id ="1"
    const [form] = Form.useForm();

    const getFlight = async () =>{
      const {data} = await axios.get (`http://localhost:8000/admin/get_flight/${id}`);
      console.log(data)
      if(data){
          const {FlightNumber,DepartureAirport,ArrivalAirport, EconomyAvailableSeats,EconomyPrice, BusinessAvailableSeats, BusinessPrice }=data

          form.setFieldsValue({FlightNumber, DepartureAirport,ArrivalAirport, EconomyAvailableSeats,EconomyPrice, BusinessAvailableSeats, BusinessPrice  });
        }
      }
      getFlight()
  

    const onSubmit = async () => {

        try {
          const values = await form.validateFields();
          if (values.DepartureTime) values.DepartureTime = new Date(Date.parse(values.DepartureTime)) 
          if (values.ArrivalTime) values.ArrivalTime = new Date(Date.parse(values.ArrivalTime))
          if (values.EconomyAvailableSeats) values.EconomyAvailableSeats = parseInt(values.EconomyAvailableSeats)
          if (values.EconomyPrice) values.EconomyPrice = parseInt(values.EconomyPrice)
          if (values.BusinessAvailableSeats) values.BusinessAvailableSeats = parseInt(values.BusinessAvailableSeats)
          if (values.BusinessPrice) values.BusinessPrice = parseInt(values.BusinessPrice)
          await axios.patch (`http://localhost:8000/admin/update_flight/${id}`, values);
        } catch (e) {
          console.log(e)
        }
      };
    
      return(
        <div>
          <Card className='updateCard'>

          <div className='updateForm'> 
          <Form form={form} name="Update Flight" >
                <Row gutter={16,8}>
                  <Col span={8}>
                    <Form.Item
                      name="FlightNumber"
                      label="FlightNumber"
                    >
                      <Input/>
                    </Form.Item>
                </Col>
                  <Col span={8}>
                    <Form.Item
                      name="DepartureTime"
                      label="Departure Time"
                    >
                    <DatePicker />
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                      name="ArrivalTime"
                      label="Arrival Time"
                    >
                    <DatePicker />
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