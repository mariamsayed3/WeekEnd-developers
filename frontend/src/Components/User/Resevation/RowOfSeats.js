import Seat from './Seat'
import '../../../Styles/RowOfSeats.scss'
const RowOfSeats = ({seats}) => {
    //seats is an array of size 8.
    return (
        <div className="row">
            {seats.map(seat => <Seat seat={seat}/>)}
        </div>
    )
}

export default RowOfSeats