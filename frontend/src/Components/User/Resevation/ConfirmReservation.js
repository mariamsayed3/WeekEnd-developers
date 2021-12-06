import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Radio, InputNumber, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { UserContext } from '../../../Context';
import { useHistory } from 'react-router';
import {Link} from 'react-router-dom'
import SmallCard from '../ResSummary/SmallCard';
import  Summary  from '@mui/material/Modal';

const ConfirmReservation = ({totalSeats, DepartureFlight, price, selectedSeats, FirstBooking}) => {
  const {Token} = useContext(UserContext)
  let history = useHistory()
  const [open, setOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [value, setValue] = useState(2);
  const [Children, setChildren] = useState(0);
  const [remaining, setRemaining] = useState(FirstBooking.Seats.length)
  const FirstRequest = {FlightNumber: FirstBooking.flight.FlightNumber, Token, TotalPrice: FirstBooking.Price, Seats: FirstBooking.Seats, Children}
  const SecondRequest = {FlightNumber: DepartureFlight.FlightNumber, Token, TotalPrice: price, Seats: selectedSeats, Children}

  useEffect(()=> {
    setRemaining(FirstBooking.Seats.length - totalSeats)
  },[totalSeats])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    setOpen(true)
  };

  const book = async () => {
    setOpen(false)
    await axios.post(`/user/reserve/${FirstBooking.flight._id}`, FirstRequest)
    await axios.post(`/user/reserve/${DepartureFlight._id}`, SecondRequest)
    await axios.post(`/user/summaries`,{Token,DepartureFlight: FirstBooking.flight, ReturnFlight: DepartureFlight, DepartureBooking: FirstRequest, ReturnBooking: SecondRequest})
    message.loading('Action in progress..', 2.5)
            .then(() => {
              message.success('Flight reserved successfully! You will be redirected to the reservations page.', 5)
              setTimeout(()=> {
                history.push(`/my_reservations`)
              }, 5000)    
    });
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const Close = () => {
    setOpen(false)
  }

  const Open = () =>{
    setOpen(true)
  }

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
      <div style={{display: 'flex', flexDirection:'column', }}>
            <Button  disabled={remaining} style={{marginTop: '15px'}} type="primary" shape="round" icon={<CheckOutlined />} size="middle" type="primary" onClick={showModal}>
              Confirm Reservation
            </Button>
                <div >
                    <span style={{color: 'red', fontSize:'15px', margin: '10px'}}>
                    {remaining ?`Please reserve ${remaining} more seat(s)`: null}
                    </span>
                </div>
        </div>
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

      
      <Summary
        open={open}
        onClose={Close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
       
        <div><SmallCard DepartureFlight={FirstBooking.flight} ReturnFlight={DepartureFlight} FirstBooking={FirstRequest} SecondBooking={SecondRequest} book={book}/></div>
      </Summary>



    </>
  );
};

export default ConfirmReservation