import React, { useState } from 'react';
import { Modal, Button, Radio, InputNumber } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

const ConfirmReservation = ({totalSeats}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState(2);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onRadioChange = (e) => {
    setValue(e.target.value)
  }

  const inputChange = () => {

  }

  return (
    <>
      <Button disabled={totalSeats === 0} style={{marginTop: '15px'}} type="primary" shape="round" icon={<CheckOutlined />} size="middle" type="primary" onClick={showModal}>
        Confirm Reservation
      </Button>
      <Modal title="Confirm Your Reservation" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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