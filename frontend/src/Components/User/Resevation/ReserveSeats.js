import react, {useEffect, useState} from 'react'
import axios from 'axios'
import FirstClassSeats from './FirstClassSeats'
const ReserveSeats = () => {
    const [flight, setFlight] = useState({})
    const [loading, setLoading] = useState(true)
    const id = '619e398b005b9f66e28c0591'
    useEffect(() => {
        const getFlight = async() => {
           const {data} =  await axios.get(`http://localhost:8000/get_flight/${id}`)
           setFlight(data)
           console.log(data)
           console.log(flight)
           console.log(flight.FirstClassSeats)
           setLoading(false)
        }
        getFlight()
        
    },[])
    if(!loading)
    return (
        <div>
            <h5 className='subtitle'>First Class ${flight.FirstClassPrice}</h5>
            <FirstClassSeats seats={flight.FirstClassSeats}/>
        </div>
    )
    return(<div></div>)
}

export default ReserveSeats