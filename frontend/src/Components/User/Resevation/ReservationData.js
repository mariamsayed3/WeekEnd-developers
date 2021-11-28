import { Button, Popconfirm } from 'antd'
import '../../../Styles/ReservationData.scss'
import { CheckOutlined } from '@ant-design/icons'
import { useHistory, Link } from 'react-router-dom'
import ConfirmReservation from './ConfirmReservation'
const ReservationData = ({flight ,totalSeats, price, isReturn, selectedSeats, FirstBooking}) => {
    let history = useHistory()
    const confirm = () => {
       history.push('/new path')
    }
    return (
    <>
    <div class='flight-card--details body1'>
        <div>
            <div class='bc-from'>
                <span class='detail-code'>
                    {flight.DepartureAirport}
                </span>
            </div>
            <div class='bc-plane'>
                <img src='https://cdn.onlinewebfonts.com/svg/img_537856.svg'/>
            </div>
            <div class='bc-to'>
                <span class='detail-code'>
                    {flight.ArrivalAirport}
                </span>
            </div>
        </div>
        
            <div class='flight-card-details--text layout2'>
                <div class="margin">
                    <span class='text-hline'>
                    Chosen seats
                    </span>
                    <span class='text-actual'>
                    {totalSeats}
                    </span>
                </div>
                <div class="margin">
                    <span class='text-hline'>
                    Total Price
                    </span>
                    <span class='text-actual'>
                    {price} L.E
                    </span>
                </div>
            </div>
        
        <div>
            {
            !isReturn ?
            
                <Button disabled={totalSeats === 0} style={{marginTop: '15px'}} type="primary" shape="round" icon={<CheckOutlined />} size="middle">
                    <Link style={{color: 'white'}}
                     to={{
                        pathname: `/available_flights`,
                        state: {
                          isReturn: true,
                          ReturnFlight: flight,
                          FirstBooking: {flight, Seats:selectedSeats, totalSeats: totalSeats, Price: price}
                        },
                      }}
                     >
                        Confirm and reserve return flight
                    </Link>
                </Button>
           
            :
            <ConfirmReservation FirstBooking={FirstBooking} totalSeats={totalSeats} selectedSeats={selectedSeats} DepartureFlight={flight} totalSeats={totalSeats} price={price}/>
            }
        </div>
    
  </div>

        </>
    )



}

export default ReservationData