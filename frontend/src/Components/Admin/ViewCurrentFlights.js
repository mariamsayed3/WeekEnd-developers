import { useState } from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import { Collapse } from 'antd';
import { Link } from 'react-router-dom';

function ViewCurrentFlights() {

    const id = "617ae39d75f5e23f35fe57c6"
    // const id = "618447eef3016df8c7b2e78e"
    // const [form] = Form.useForm();
    const { Panel } = Collapse;
    const [ReservationNumber, setReservationNumber] = useState("");

    const getCurrent = async () => {
        const { data } = await axios.get(`http://localhost:8000/admin/get_current_flights/${id}`)
        // .then(res => {
        //     this.setReservationNumber = res.data
        // })
        console.log(data)
        if (data) {
            const { ReservationNumber, TotalPrice, FlightNumber, Seats } = data
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
                <p></p>
                <p
                value={ReservationNumber}
                //onChange={(e) => setReservationNumber(e.target.value)}
       name="ReservationNumber">{ReservationNumber}</p>
            </Panel>
            <Panel header="Reservation Number:" key="2">
                <p></p>
            </Panel>
            <Panel header="Reservation Number:" key="3">
                <p></p>
            </Panel>
        </Collapse>
    )
}

export default ViewCurrentFlights