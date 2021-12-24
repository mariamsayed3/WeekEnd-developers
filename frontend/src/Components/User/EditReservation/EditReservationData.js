import ConfirmEditReservation from './ConfirmEditReservation'
const EditReservationData = ({flight, totalSeats, price, selectedSeats, booking, oldPrice}) => {

    return (
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
           
            
            <ConfirmEditReservation oldPrice={oldPrice} booking={booking} flight={flight} totalSeats={totalSeats} selectedSeats={selectedSeats} price={price}/>
            
        </div>
    
  </div>
    )
}

export default EditReservationData