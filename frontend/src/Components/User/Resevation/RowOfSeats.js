import Seat from './Seat'

const RowOfSeats = ({seats, setNumberOfSeats, numberOfSeats, setSelectedSeats, selectedSeats}) => {
    return (
        seats ?
        <div className="row">
             {seats.map(seat => <Seat selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} numberOfSeats={numberOfSeats} setNumberOfSeats={setNumberOfSeats} key={seat.number} seat={seat}/>)} 
        </div>
        : 
        <></>
    )
}

export default RowOfSeats