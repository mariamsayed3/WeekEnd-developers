import React, { useState, useContext } from 'react';
import { Modal, Button, Radio, InputNumber } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UserContext } from '../../../Context';

const ConfirmReservation = ({totalSeats, DepartureFlight, price, selectedSeats, FirstBooking}) => {
  const {Token} = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(2);
  const [Children, setChildren] = useState(0);
  const FirstRequest = {FlightNumber: FirstBooking.flight.FlightNumber, Token, TotalPrice: FirstBooking.Price, Seats: FirstBooking.Seats, Children}
  const SecondRequest = {FlightNumber: DepartureFlight.FlightNumber, Token, TotalPrice: price, Seats: selectedSeats, Children}

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await axios.post(`/user/reserve/${FirstBooking.flight._id}`, FirstRequest)
    await axios.post(`/user/reserve/${DepartureFlight._id}`, SecondRequest)

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onRadioChange = (e) => {
    setValue(e.target.value)
    if(e.target.value === 2)
      setChildren(0)
  }

  const inputChange = (e) => {
    setChildren(e)
  }
  return (
    <>
      <Button disabled={totalSeats === 0} style={{marginTop: '15px'}} type="primary" shape="round" icon={<CheckOutlined />} size="middle" type="primary" onClick={showModal}>
        Confirm Reservation
      </Button>
      <Modal okText="Reserve" title="Confirm Your Reservation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px', alignItems:"center"}}>
        <span style={{marginRight: '10px'}}>Are there children in your reservation ?</span> 
        <Radio.Group onChange={onRadioChange} value={value}>
            <Radio value={1}>Yes</Radio>
            <Radio value={2}>No</Radio>
        </Radio.Group>
        </div>
        {value === 1 ? <div style={{display: 'flex', flexDirection: 'row', marginBottom: '20px', alignItems:"center"}}>
            <span style={{marginRight: '10px'}}>Please specify the number of children: </span>
            <InputNumber max={totalSeats} min={1} onChange={inputChange}/>
        </div> : null}
      </Modal>
    </>
  );
};

export default ConfirmReservation