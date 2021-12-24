
import { useState, useEffect } from "react";
import axios from "axios";
import Sunny from './Sunny'
require("dotenv").config()

const Weather = () =>{

    const [weather, setWeather] = useState("");
    const base_url = "https://api.openweathermap.org/data/2.5/forecast?q="
    const city_name = "Cairo"
    const api_key = "68d40f12553da0869dd6c2629436f43f"
    const complete_url = base_url + city_name + "&appid=" + api_key + "&cnt=4"
  
    useEffect(() => {
        const getWeather = async () => {
            const {data}  = await axios.get(`${complete_url}`);
            setWeather(data);
            
        
        };
        getWeather();
        }, []);

      

    if(weather)
        return(
            <Sunny weather={weather} />
        )
    else
         return <> </>
    



}
export default Weather; 