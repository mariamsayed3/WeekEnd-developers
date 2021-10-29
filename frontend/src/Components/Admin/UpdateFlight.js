import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import {Alert,Button, Form, Input, DatePicker,Cascader, InputNumber} from 'antd';
require ('dotenv').config()



function UpdateFlight() {
    console.log(process.env.URL)
    const id = "617adf4639bec94174c87305"
    const [form] = Form.useForm();
    const [flight, setFlight] = useState(null)
    const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
    // const [error, setError] = useState(null);

    useEffect(() => {
      
        if(flight){
            const {FlightNumber,Departure,Arrival,EconomyClass,BusinessClass,}=flight
            const {date: departure_date, airport: departure_airport} = Departure
            const {date: arrival_date, airport: arrival_airport } = Arrival
            const {available_seats: economy_seats,price: economy_price} = EconomyClass
            const {available_seats: business_seats, price: business_price} = BusinessClass
            form.setFieldsValue({
                FlightNumber,departure_date ,departure_airport, arrival_date, arrival_airport,
                economy_seats, economy_price, business_seats, business_price });
          }
      },[flight]);

    const onSubmit = async () => {

        try {
          const values = await form.validateFields();
          console.log(values)
          await axios.patch (`http://localhost:8000/admin/update_flight/${id}`, values);
        } catch (e) {
          console.log(e)
        }
      };
    
      // return(
      //   <div>

      //   <Form form={form} name="Update Flight">
      //       <Form.Item
      //         name="FlightNumber"
      //         label="FlightNumber"
      //       >
      //         <Input placeholder="Please input flight number"/>
      //       </Form.Item>

      //       <Form.Item
      //         name="departure_date"
      //         label="departure_date"
      //       >
      //        <DatePicker />
      //        </Form.Item>

      //        <Form.Item
      //         name="arrival_date"
      //         label="arrival_date"
      //       >
      //        <DatePicker />
      //       </Form.Item>

      //       <Form.Item
      //         name="departure_airport"
      //         label="departure_airport"
      //       >
      //         <Input placeholder="Please"/>
      //       </Form.Item>

      //       <Form.Item
      //         name="arrival_airport"
      //         label="arrival_airport"

      //       >
      //         <Input placeholder="Please"/>
      //       </Form.Item>

      //       <Form.Item
      //         name="economy_seats"
      //         label="economy_seats"
      //       >
      //         <Input placeholder="Please"/>
      //       </Form.Item>

      //       <Form.Item
      //         name="economy_price"
      //         label="economy_price"
      //       >
      //         <Input placeholder="Please"/>
      //       </Form.Item>

      //       <Form.Item
      //         name="business_seats"
      //         label="business_seats"
      //       >
      //         <Input placeholder="Please"/>
      //       </Form.Item>

      //       <Form.Item
      //         name="business_price"
      //         label="business_price"
      //       >
      //         <Input placeholder="Please"/>
      //       </Form.Item>
 
      //       {/* {error && <Alert message={error} type="error" /> } */}
      //           <div style={{textAlign:'center'}}>
      //             <Button type="primary" onClick={onSubmit} style={{ marginTop: '40px', width: '150px'}}>
      //               Update Flight
      //             </Button>
      //             </div>
      //     </Form>
      //   </div>
      // )
}
export default UpdateFlight    