
import "../../../Styles/Weather.css"
const Sunny = ({weather}) =>{

    console.log(weather)
    return (
        <div class="w-container">
            <div class="weather-side">
            <div class="weather-gradient"></div>
            <div class="date-container">
            <h2 class="date-dayname"  style={{color: "white" }}>{(new Date(weather.list[0].dt_txt) + " ").slice(0,3)}</h2><span class="date-day">{(new Date(weather.list[0].dt_txt) + " ").slice(4,15)}</span><i class="location-icon" data-feather="map-pin"></i><span class="location">{weather.city.name}, {weather.city.country} </span>
            </div>
            <div class="weather-container"><i class="weather-icon" data-feather="sun"></i>
            <h1 class="weather-temp" style={{color: "white" }}>{Math.trunc(weather.list[0].main.temp -273)}°C</h1>
            <h3 class="weather-desc"  style={{color: "white" }}>{weather.list[0].weather[0].description}</h3>
            </div>
            </div>
            <div class="info-side">
            <div class="today-info-container">
            <div class="today-info">
            <div class="precipitation"> <span class="title">PRESSURE</span><span class="value"> {weather.list[0].main.pressure} mb</span>
            <div class="clear"></div>
            </div>
            <div class="humidity"> <span class="title">HUMIDITY</span><span class="value">{weather.list[0].main.humidity} %</span>
            <div class="clear"></div>
            </div>
            <div class="wind"> <span class="title">WIND</span><span class="value">{weather.list[2].wind.speed} km/h</span>
            <div class="clear"></div>
            </div>
            </div>
            </div>
            <div class="week-container">
            <ul class="week-list">
            <li class="active"><i class="day-icon" data-feather="sun"></i><span class="day-name">{(new Date(weather.list[0].dt_txt) + " ").slice(0,3)}</span><span class="day-temp">{Math.trunc(weather.list[0].main.temp -273)}°C</span></li>
            <li><i class="day-icon" data-feather="cloud"></i><span class="day-name">{(new Date(weather.list[1].dt_txt) + " ").slice(0,3)}</span><span class="day-temp">{Math.trunc(weather.list[1].main.temp -273)}°C</span></li>
            <li><i class="day-icon" data-feather="cloud-snow"></i><span class="day-name">{(new Date(weather.list[2].dt_txt) + " ").slice(0,3)}</span><span class="day-temp">{Math.trunc(weather.list[2].main.temp -273)}°C</span></li>
            <li><i class="day-icon" data-feather="cloud-rain"></i><span class="day-name">{(new Date(weather.list[3].dt_txt) + " ").slice(0,3)}</span><span class="day-temp">{Math.trunc(weather.list[3].main.temp -273)}°C</span></li>
            <div class="clear"></div>
            </ul>
            </div>
            
            </div>
        </div>
    )
}
export default Sunny;