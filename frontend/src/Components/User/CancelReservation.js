import { useState } from "react";
import axios from 'axios';
import 'antd/dist/antd.css';
import {useParams} from "react-router-dom";
import {Popconfirm, Form, Input, DatePicker, Card, Row, Col} from 'antd';
require ('dotenv').config()



function CancelReservation() {
    const reservation_no = "AA"
    const email ='allaaamr5876@gmail.com'

    const reservation = async () =>{
      const {data} = await axios.patch (`http://localhost:8000/user/cancel_reservation/${reservation_no}`);
      const post = await axios({
        method: 'post',
        url: 'http://localhost:8000/user/email_cancellation',
        data: {
          email: email,
          ...data[0]
        }
      });

      }
      
  
      return(
        <Popconfirm title="Are you sure you want to cancel your reservation？"  
        onConfirm={reservation}
        okText="Yes" 
        cancelText="No">
        <a href="#">Cancel Reservation</a>
        </Popconfirm>
      )
}
export default CancelReservation  ;  