import { Popover } from 'antd';
import { message } from 'antd';

const Seat = ({seat, setNumberOfSeats, numberOfSeats, setSelectedSeats, selectedSeats, FirstBooking}) => {
    const markAsChosen = (e) =>{
        if(FirstBooking){
            if(FirstBooking.Seats.length == selectedSeats.length && e.target.classList.length === 1){

                return (
                    message.warn("Sorry the reserved seats in the return trip cannot exceed the reserved seats in the departure trip ", 5)
                )
            }
        }
        if(e.target.classList.length === 1){
            let chosenSeats = selectedSeats
            chosenSeats.push(seat)
            setSelectedSeats(chosenSeats)
            setNumberOfSeats(numberOfSeats+1)

        }
        else{
            setNumberOfSeats(numberOfSeats-1)
            let chosenSeats = selectedSeats
            const index = chosenSeats.indexOf(seat)
            chosenSeats.splice(index, 1)
            setSelectedSeats(chosenSeats)
        }
        e.target.classList.toggle("selected")
    } 
    return (seat.reserved ? <div key={seat.number} className="seat occupied"></div> 
    : 
    <div key={seat.number} className="seat" onClick={markAsChosen}></div>
    )
}
export default Seat

