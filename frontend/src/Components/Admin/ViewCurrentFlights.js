import { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Collapse, Descriptions, Button, Popover, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import Item from 'antd/lib/list/Item';

function ViewCurrentFlights() {

    const id = "617ae39d75f5e23f35fe57c6"
    const { Panel } = Collapse;
    const [Reservation, setReservation] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        const getFlights = async () => {
            const { data } = await axios.get(
                `http://localhost:8000/admin/get_current_flights/${id}`
            );
            setReservation(data);
        };
        getFlights();
    }, []);
    console.log(Reservation)

    const onConfirm = async() => {
        try{
            const values = await form.validateFields();
           // await axios.patch (`http://localhost:8000/admin/update_flight/${id}`, values);
        }
        catch(e){
            console.log(e)
        }
    }
    


    return (
        <Collapse accordion
            bordered={false}
            style={{
                width: '60%',
                margin: '3% auto',
            }}>

            {Reservation.map((booking) => {
                return <Panel header="Reservation: ">
                    <Descriptions
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        size='default'
                        extra={
                            <Popover style={{ width: 500 }}
                                //content="Click to edit"
                                title="Click to edit"
                                trigger="hover"
                            >
                                <Popover
                                    style={{ width: 500 }}
                                    content={
                                        <div>
                                            <Form name="Edit Reservation">
                                                <Form.Item
                                                    name="ReservationNumber"
                                                    label="Reservation Number"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="TotalPrice"
                                                    label="Total Price"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="FlightNumber"
                                                    label="Flight Number"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    name="Seats"
                                                    label="Seats"
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Button type="primary" onClick={onConfirm} style={{ marginTop: '5px', width: '150px' }}>
                                                    Confirm
                                                </Button>
                                            </Form>
                                        </div>
                                    }
                                    title="Click title"
                                    trigger="click">
                                    <Button type="primary">Edit</Button></Popover></Popover>}
                    >
                        <Descriptions.Item label="Reservation Number:">
                            {booking.ReservationNumber}</Descriptions.Item>
                        <Descriptions.Item label="Total Price:"
                        >{booking.TotalPrice}</Descriptions.Item>
                        <Descriptions.Item label="Flight Number:">{booking.FlightNumber}</Descriptions.Item>
                        <Descriptions.Item label="Reserved Seats:">{booking.Seats.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            })}

        </Collapse>
    )
}

export default ViewCurrentFlights