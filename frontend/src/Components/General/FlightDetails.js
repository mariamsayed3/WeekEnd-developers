import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col , Divider} from 'antd';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { AiOutlineFieldNumber, AiFillDollarCircle, AiOutlineDollarCircle } from 'react-icons/ai';
import axios from 'axios';

const FlightDetails = () => {
  const id = "617e9b5c7f9ded543af599ba"
  const [visible, setVisible] = useState(false);
  const [flight, setFlight] = useState(false);
  
  useEffect (()=>{
    const getFlight = async () =>{
      const {data} = await axios.get (`http://localhost:8000/admin/get_flight/${id}`);
      console.log(data)
      setFlight(data)
      }
  
    getFlight()
  },[])
  
  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        View Flight Details
      </Button>

      <Modal
        title="Flight Details"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={900}
      >

        <Row gutter={64,64}>
          <Col>
         
             <p><b>  <AiOutlineFieldNumber/> Flight Number: </b> {flight.FlightNumber}</p>
          </Col>
        </Row>
        <Divider />
        <Row gutter={64,64}>
        <Col>
       
        </Col>
        </Row>
        <Row gutter={8,64}>
          <Col span={6}>
             <p><b>  <FaPlaneDeparture /> Departure Airport: </b> </p>
             <p> {flight.DepartureAirport}</p>
          </Col>
          <Col  span={6}>
             <p><b> Departure Terminal:  </b> </p>
             <p> {flight.DepartureTerminal}</p>
          </Col>
          <Col  span={12}>
             <p><b>   Departure Date and Time: </b> </p>
             <p> {flight.DepartureDate}</p>
          </Col>

        </Row>
        <Divider />
        <Row gutter={64,64}>
          <Col span={6}>
             <p><b> <FaPlaneArrival /> Airport: </b> </p>
             <p> {flight.ArrivalAirport}</p>
          </Col>
          <Col span={6}>
             <p><b>Departure Terminal:  </b> </p>
             <p> {flight.DepartureTerminal}</p>
          </Col>
          <Col span={12}>
             <p><b>Arrival Date and Time: </b> </p>
             <p> {flight.ArrivalDate}</p>
          </Col>

        </Row>

        <Divider />
        <Row gutter={64,64}>
          <Col span={12}>
             <p><b>  <AiFillDollarCircle/> Business Seat Price: </b> </p>
             <p> {flight.BusinessPrice}</p>
          </Col>
    
          <Col span={12}>
             <p><b>Available Business Seats </b> </p>
             <p> {flight.BusinessAvailableSeats}</p>
          </Col>

        </Row>
        <Row gutter={64,64}>
          <Col span={12}>
             <p><b> <AiOutlineDollarCircle />  Economy Seat Price: </b> </p>
             <p> {flight.EconomyPrice}</p>
          </Col>
    
          <Col span={12}>
             <p><b>Available Economy Seats </b> </p>
             <p> {flight.EconomyAvailableSeats}</p>
          </Col>

        </Row>
        
      </Modal>
    </>
  );
};

export default FlightDetails