import { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Collapse, Descriptions, Button } from 'antd';
import { Link } from 'react-router-dom';

function ViewCurrentFlights() {

    const id = "617ae39d75f5e23f35fe57c6"
    // const id = "618447eef3016df8c7b2e78e"
    // const [form] = Form.useForm();
    const { Panel } = Collapse;
    const [ReservationNumber, setReservationNumber] = useState("");
    const [TotalPrice, setTotalPrice] = useState();
    const [FlightNumber, setFlightNumber] = useState("");
    const [Seats, setSeats] = useState();

    const getCurrent = async () => {
        const { data } = await axios.get(`http://localhost:8000/admin/get_current_flights/${id}`)
        console.log(data)
        if (data) {
            const { ReservationNumber, TotalPrice, FlightNumber, Seats } = data
            // setReservationNumber = data.ReservationNumber
            // setReservationNumber.useState(data.ReservationNumber)
        }
    }
    getCurrent()


    return (
        <Collapse accordion
            style={{
                width: '60%',
                margin: '3% auto',
            }}
        >
            <Panel header="Reservation Number:" key="1">
                <Descriptions title="User Reservations"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    size='default'
                    extra={<Button type="primary">Delete</Button>}
                >
                    <Descriptions.Item label="Reservation Number:"
                        value={ReservationNumber}
                        onChange={(e) => setReservationNumber(e.target.value)}
                    >{ReservationNumber}</Descriptions.Item>
                    <Descriptions.Item label="Total Price:">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="Flight Number:">18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Seats:">$80.00</Descriptions.Item>
                </Descriptions>
            </Panel>
            <Panel header="Reservation Number:" key="2">
                <Descriptions title="User Reservations"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    size='default'
                    extra={<Button type="primary">Delete</Button>}
                >
                    <Descriptions.Item label="Reservation Number:"
                        value={ReservationNumber}
                        onChange={(e) => setReservationNumber(e.target.value)}
                    >{ReservationNumber}</Descriptions.Item>
                    <Descriptions.Item label="Total Price:">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="Flight Number:">18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Seats:">$80.00</Descriptions.Item>
                </Descriptions>
            </Panel>
            <Panel header="Reservation Number:" key="3">
                <Descriptions title="User Reservations"
                    bordered
                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                    size='default'
                    extra={<Button type="primary">Delete</Button>}
                >
                    <Descriptions.Item label="Reservation Number:"
                        value={ReservationNumber}
                        onChange={(e) => setReservationNumber(e.target.value)}
                    >{ReservationNumber}</Descriptions.Item>
                    <Descriptions.Item label="Total Price:">Prepaid</Descriptions.Item>
                    <Descriptions.Item label="Flight Number:">18:00:00</Descriptions.Item>
                    <Descriptions.Item label="Seats:">$80.00</Descriptions.Item>
                </Descriptions>
            </Panel>
        </Collapse>
    )
}

export default ViewCurrentFlights