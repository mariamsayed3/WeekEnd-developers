import react, { useEffect, useState } from 'react'
import RowOfSeats from './RowOfSeats'

const Seats = ({seats, setNumberOfSeats, numberOfSeats, setSelectedSeats, selectedSeats, previouslySelectedSeats}) => {

    const [rows, setRows] = useState([])
    useEffect(() => {
        const length = seats.length
        const tmp = []
        for(let i = 0 ; i < Math.ceil(length/8) ; i++)
            tmp[i] = seats.splice(0,8)
        setRows(tmp)
    },[])
    return(
        rows ? rows.map((row) => <RowOfSeats previouslySelectedSeats={previouslySelectedSeats} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} numberOfSeats={numberOfSeats} setNumberOfSeats={setNumberOfSeats}  seats={row}/>) : null
    )
}

export default Seats