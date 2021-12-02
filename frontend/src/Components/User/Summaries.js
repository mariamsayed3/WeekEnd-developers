import {useEffect, useState, useContext} from 'react'
import axios from 'axios';
import {UserContext} from '../../Context'
import Loader from '../General/Loader';
import EmptyList from './EmptyList'
import SmallCard from './ResSummary/SmallCard';


const Summaries = () =>{
    const [summaries, setSummaries] = useState(null)
    const [loading, setLoading] = useState(true)

    const {Token} = useContext(UserContext);
     useEffect (()=>{
         const getSummaries = async()=>{
            const {data} = await axios.get(`http://localhost:8000/user/summaries/${Token}`)
            setSummaries(data)
            setLoading(false)
         }
         getSummaries();
     },[])

     if(loading)
        return <Loader />
     
     if(summaries.length==0){
      return <EmptyList msg={`You did not reserve with Jet Away before. Would you like to reserve a flight?`} buttonText={`Yes!`} path={'/available_flights'} />
     }

     return(
         summaries.map((summary)=>{
             return <SmallCard DepartureFlight={summary.DepartureFlight} ReturnFlight={summary.ReturnFlight}  FirstBooking ={summary.DepartureBooking}  SecondBooking={summary.ReturnBooking} />
         })
     )
}

export default Summaries;