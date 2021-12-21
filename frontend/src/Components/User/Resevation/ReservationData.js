import { Button } from 'antd'
import '../../../Styles/ReservationData.scss'
import { CheckOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ConfirmReservation from './ConfirmReservation'
const ReservationData = ({flight ,totalSeats, price, isReturn, selectedSeats, FirstBooking, returnDate}) => {
    return (
    <>
    <div className='flight-card--details body1'>
        <div>
            <div className='bc-from'>
                <span className='detail-code'>
                    {flight.DepartureAirport}
                </span>
            </div>
            <div className='bc-plane'>
                <img src='https://cdn.onlinewebfonts.com/svg/img_537856.svg'/>
            </div>
            <div className='bc-to'>
                <span className='detail-code'>
                    {flight.ArrivalAirport}
                </span>
            </div>
        </div>
        
            <div className='flight-card-details--text layout2'>
                <div className="margin">
                    <span className='text-hline'>
                    Chosen seats
                    </span>
                    <span className='text-actual'>
                    {totalSeats}
                    </span>
                </div>
                <div className="margin">
                    <span className='text-hline'>
                    Total Price
                    </span>
                    <span className='text-actual'>
                    {price} $
                    </span>
                </div>
            </div>
        
        <div>
            {
            !isReturn ?
            
                <Button disabled={totalSeats === 0} style={{marginTop: '15px'}} type="primary" icon={<CheckOutlined />} size="middle">
                    <Link style={{color: 'white'}}
                     to={{
                        pathname: `/available_flights`,
                        state: {
                          isReturn: true,
                          ReturnFlight: flight,
                          FirstBooking: {flight, Seats:selectedSeats, totalSeats: totalSeats, Price: price},
                          returnDate: returnDate
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