import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col , Divider} from 'antd';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { AiOutlineFieldNumber, AiFillDollarCircle, AiOutlineDollarCircle } from 'react-icons/ai';
import axios from 'axios';

const FlightDetailsPopup = (props) => {
  const [visible, setVisible] = useState(false);
  const [flight, setFlight] = useState({});
  
  useEffect (()=>{
    setFlight(props.flight)
  },[])
  
  return (
    <>
      <Button type="link" onClick={() => setVisible(true)}>
        View Details
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
          <Col>
         
             <p><b>  <AiOutlineFieldNumber/> Trip Duration: </b> {flight.TripDuration}</p>
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
             <p><b>   Departure Date </b> </p>
             <p> {flight.DepartureDate}</p>
          </Col>

        </Row>
        <Divider />
        <Row gutter={64,64}>
          <Col span={6}>
             <p><b> <FaPlaneArrival /> Arrival Airport: </b> </p>
             <p> {flight.ArrivalAirport}</p>
          </Col>
          <Col span={6}>
             <p><b>Arrival Terminal:  </b> </p>
             <p> {flight.ArrivalTerminal}</p>
          </Col>
          <Col span={12}>
             <p><b>Arrival Date </b> </p>
             <p> {flight.ArrivalDate}</p>
          </Col>
        </Row>
        <Divider />
        <Row gutter={64,64}>
          <Col span={12}>
             <p><b>  <AiFillDollarCircle/>  <AiFillDollarCircle/>  First Class Seat Price: </b> </p>
             <p> {flight.FirstClassPrice} LE</p>
          </Col>
    
          <Col span={12}>
             <p><b>Available First Class Seats </b> </p>
             <p> {flight.FirstClassAvailableSeats} Seats </p>
          </Col>

        </Row>
        <Row gutter={64,64}>
          <Col span={12}>
             <p><b>  <AiFillDollarCircle/> Business Seat Price: </b> </p>
             <p> {flight.BusinessPrice} LE</p>
          </Col>
    
          <Col span={12}>
             <p><b>Available Business Seats </b> </p>
             <p> {flight.BusinessAvailableSeats} Seats</p>
          </Col>

        </Row>
        <Row gutter={64,64}>
          <Col span={12}>
             <p><b> <AiOutlineDollarCircle />  Economy Seat Price: </b> </p>
             <p> {flight.EconomyPrice} LE</p>
          </Col>
    
          <Col span={12}>
             <p><b>Available Economy Seats </b> </p>
             <p> {flight.EconomyAvailableSeats} Seats</p>
          </Col>

        </Row>
       
      </Modal>
    </>
  );
};

export default FlightDetailsPopup