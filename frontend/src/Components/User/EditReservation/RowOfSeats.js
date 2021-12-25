import Seat from './Seat'

const RowOfSeats = ({seats, setNumberOfSeats, numberOfSeats, setSelectedSeats, selectedSeats, previouslySelectedSeats}) => {
    return (
        seats ?
        <div className="row">
             {seats.map(seat => <Seat previouslySelectedSeats={previouslySelectedSeats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} numberOfSeats={numberOfSeats} setNumberOfSeats={setNumberOfSeats} key={seat.number} seat={seat}/>)} 
        </div>
        : 
        <></>
    )
}

export default RowOfSeats