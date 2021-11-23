import { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Button, Form, Switch, Card } from 'antd';
import { CloseOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons';

function ViewCurrentFlights() {

    const id = "617ae39d75f5e23f35fe57c6" //needs to be removed
    const [Reservation, setReservation] = useState("");
    const [form] = Form.useForm();
    const [Loading, setLoading] = useState(true);

    const onChange = checked => {
        setLoading(!checked);
    };

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

    // const onConfirm = async () => {
    //     try {
    //         const values = await form.validateFields();
    //         // await axios.patch (`http://localhost:8000/admin/update_flight/${id}`, values);
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }



    return (
        <>
            <Switch checked={!Loading} onChange={onChange}
                style={{background:"#e7d1ff"}}
                size="default"
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />} />
            <Card
                title="Current Reserved Flights"
                style={{
                    width: '60%',
                }}
                loading={Loading}>

                {Reservation.map((booking) => {
                    return <Card type="inner"
                        title={"Reservation Number: "+ booking.ReservationNumber}
                        headStyle={{background:"#e7d1ff"}}
                        extra={<Button type="link" icon={<EditOutlined />} style={{ color:"black",marginTop: '5px', width: '100px' }}>
                            Edit
                         </Button>}
                    >
                        {/* <p><label>Reservation Number: </label>{booking.ReservationNumber}</p> */}
                        <p><label>Total Price: </label>{booking.TotalPrice}</p>
                        <p><label>Flight Number: </label>{booking.FlightNumber}</p>
                        <p><label>Reserved Seats: </label>{booking.Seats.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })}</p>
                    </Card>
                })}

            </Card>
        </>
    )
}

export default ViewCurrentFlights