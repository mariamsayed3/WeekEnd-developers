import { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Collapse, Descriptions, Button } from 'antd';
import { Link } from 'react-router-dom';
import Item from 'antd/lib/list/Item';

function ViewCurrentFlights() {

    const id = "617ae39d75f5e23f35fe57c6"
    const { Panel } = Collapse;
    const [Reservation, setReservation] = useState("");

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


    return (
        <Collapse accordion
        bordered={false}
            style={{
                width: '60%',
                margin: '3% auto',
            }}>

            {Reservation.map((booking) => {
                return <Panel header="Reservation:" key="1">
                    <Descriptions title="Flight"
                        bordered
                        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                        size='default'
                        extra={<Button type="primary">Delete</Button>}
                    >
                        <Descriptions.Item label="Reservation Number:">
                            {booking.ReservationNumber}</Descriptions.Item>
                        <Descriptions.Item label="Total Price:"
                        >{booking.TotalPrice}</Descriptions.Item>
                        <Descriptions.Item label="Flight Number:">{booking.FlightNumber}</Descriptions.Item>
                        <Descriptions.Item label="Seats:">$80.00</Descriptions.Item>
                    </Descriptions>
                </Panel>
            })}

        </Collapse>
    )
}

export default ViewCurrentFlights