import { CheckOutlined } from '@ant-design/icons';
import { Modal, Button, Radio, InputNumber, message } from 'antd';
import { useState } from 'react';
const ConfirmEditReservation = ({booking, flight, totalSeats, selectedSeats, price}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState(2);
    const [Children, setChildren] = useState(0);
    const editReservation = () => {
        const changedSeats = booking.Seats
        booking.TotalPrice = price
        booking.Children = Children
        booking.Seats = []
        for(let seat of selectedSeats)
            booking.Seats.push(seat.number)
        const newSeats =  booking.Seats
       

    }

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

    const showModal = () => {
        setIsModalVisible(true);
    };

    return(
        <div>
            <Button disabled={!selectedSeats.length} style={{marginTop: '15px'}} type="primary" icon={<CheckOutlined />} size="middle" type="primary" onClick={showModal}>
                Edit Reservation
            </Button>

            <Modal okText="Edit Reservation" title="Edit Your Reservation" visible={isModalVisible} onOk={editReservation} onCancel={handleCancel}>
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
        </div>
    )
}

export default ConfirmEditReservation