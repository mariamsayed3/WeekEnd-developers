
import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col} from "antd";
import WeatherGadget from './WeatherGadget'
require("dotenv").config()

const Weather = ({City1, City2}) =>{

    const [weather, setWeather] = useState("");
    const [weather2, setWeather2] = useState("");
    const base_url = "https://api.openweathermap.org/data/2.5/forecast?q="
    const api_key = "68d40f12553da0869dd6c2629436f43f"
    const complete_url = base_url + City1 + "&appid=" + api_key + "&cnt=4"
    const complete_url2 = base_url + City2 + "&appid=" + api_key + "&cnt=4"
    
  
    useEffect(() => {
        const getWeather = async () => {
            const country1  = await axios.get(`${complete_url}`);
            const country2  = await axios.get(`${complete_url2}`);
            setWeather(country1.data);
            setWeather2(country2.data);
        
        };
        getWeather();
        }, []);

    if(weather && weather2)
        return(<WeatherGadget weather={weather} /> )
    else
         return <> </>
    



}
export default Weather; 