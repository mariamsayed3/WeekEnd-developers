import react from 'react'
import RowOfSeats from './RowOfSeats'

const FirstClassSeats = ({seats}) => {
    const rows = []
    const length = seats.length
    for(let i = 0 ; i < Math.ceil(length/8) ; i++)
        rows[i] = seats.splice(0,8)
    
    return(
        rows.map((row) => <RowOfSeats seats={row}/>)
    )
}

export default FirstClassSeats