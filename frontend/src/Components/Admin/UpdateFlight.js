import {useState} from 'react'
import axios from 'axios';
import 'antd/dist/antd.css';
import {useParams} from "react-router-dom";
import {Button, Form, Input, DatePicker, Card, Row, Col, Alert, Modal} from 'antd';
import '../../Styles/Admin.scss';
require ('dotenv').config('../../.env')


function UpdateFlight() {
    const id = "617bbcf6edf4585cfd4a5cca"
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getFlight = async () =>{
      const {data} = await axios.get (`http://localhost:8000/admin/get_flight/${id}`);
      if(data){
          const {FlightNumber,DepartureAirport,ArrivalAirport, EconomyAvailableSeats,EconomyPrice, BusinessAvailableSeats, BusinessPrice }=data
          form.setFieldsValue({FlightNumber, DepartureAirport,ArrivalAirport, EconomyAvailableSeats,EconomyPrice, BusinessAvailableSeats, BusinessPrice  });
        }
      }
      getFlight()
  
    // const showModal = () => {
    //     setIsModalVisible(true);
    //   };
    //   const handleOk = () => {
    //     setIsModalVisible(false);
    //     console.log("Hi")
    //     Submit();
    //     console.log("Hi")
    //   };
    // const handleCancel = () => {
    //     setIsModalVisible(false);
    //   };

    const Submit = async () => {
        try {
          const values = await form.validateFields();
          // const values =await form.getFieldsValue(true);
          console.log(values)
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
                      <Button type="primary" onClick={Submit} style={{ marginTop: '40px', width: '150px'}}>
                        Update Flight
                      </Button>
                      </div>
              </Form>
              </div>

              {/* <Modal title="Basic Modal" visible={isModalVisible} onCancel={handleCancel}
              footer={[
                <Button key="submit" type="primary" onClick={handleOk}>
                  Submit
                </Button>,
              ]}>
                <p>Are you sure you want to update this flight?</p>
                <p> This action cannot be undone!</p>
              </Modal> */}
          </Card>
        </div>
      )
}
export default UpdateFlight    