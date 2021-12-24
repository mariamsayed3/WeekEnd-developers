import { CheckOutlined } from '@ant-design/icons';
import { Modal, Button, Radio, InputNumber, message } from 'antd';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../../Context';
const ConfirmEditReservation = ({booking, totalSeats, selectedSeats, price, oldPrice}) => {
    const { Token, FirstName, LastName, Email } = useContext(UserContext)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState(2);
    const [Children, setChildren] = useState(0);
    let history = useHistory()
    
    const editReservation = async () => {
        setIsModalVisible(false)
        const changedSeats = booking.Seats
        const oldChildren = booking.Children
        booking.TotalPrice = price
        booking.Children = Children
        booking.Seats = []
        for(let seat of selectedSeats)
            booking.Seats.push(seat.number)
        const newSeats =  booking.Seats
        if(oldPrice > price)
            await axios.post('http://localhost:8000/user/email_edit_refund', {FirstName, LastName, Email, price: oldPrice - price})
        if(oldPrice >= price){
            try{
                await axios.patch('http://localhost:8000/user/edit_reservation', {Token, changedSeats, newSeats, booking, oldChildren})
                message.loading('Action in progress..', 2.5)
                .then(() => {
                  message.success('Flight edited successfully! You will be redirected to the reservations page.', 5)
                  setTimeout(()=> {
                    history.push(`/my_reservations`)
                  }, 5000)    
            });
            }catch{
                message.loading('Action in progress..', 2.5)
                .then(() => {
                  message.error('Something went wrong. Please try again later.', 5)  
                });
            }
        } 
        else{
            sessionStorage.setItem('editBooking', JSON.stringify({Token, changedSeats, newSeats, booking, oldChildren}))
            pay();

        }
    }

    const pay = async () =>{
        const {data} = await axios.post("http://localhost:8000/user/edit_payement", { amount: price - oldPrice })
        window.location = data.url;
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