import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import classes from './showWeatherDetails.module.css';

const ShowWeatherDetails = () => {
    const [hourlyWeather, setHourlyWeather] = useState();
    let { date } = useParams();
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            let api = '1bcc0795a92755240a52a51d802d234f';
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let hoursWiseData = [];
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`)
            .then(response => {
                return response.json()
            }).then(responseData => {
                console.log(responseData)
                hoursWiseData = responseData.list.filter(item => item.dt_txt.split(" ")[0] === date.split(" ")[0])
                console.log(hoursWiseData)
                setHourlyWeather(() => hoursWiseData)
            });
        });
    },[date]) 

    let card = [classes.flex, classes.card];
    let  weatherElements
    if(hourlyWeather) {
       weatherElements =  (
           
            hourlyWeather.map((item,index) => (   
                <div className={card.join(" ")} key={index}> 
                    <span>{(new Date(item.dt_txt).getHours()) < 12 ? (new Date(item.dt_txt).getHours() == 0 ? 12 : new Date(item.dt_txt).getHours())+' AM' : (new Date(item.dt_txt).getHours()-12 == 0 ? 12 : new Date(item.dt_txt).getHours()-12)+' PM' }</span>
                    <img  src={require("../assets/"+item.weather[0].main+".webp")} alt={item.weather[0].main}/>
                    <div>
                        <b><span>{Math.floor(item.main.temp_min - 273.15)}<span>&#176;</span> &nbsp;</span></b>
                        <span>{Math.floor(item.main.temp_max - 273.15)}<span>&#176;</span> &nbsp;</span>
                    </div>
                </div>
            ))
        )
    }

    const getDays = (dayNum) => {
        var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        return weekday[dayNum]
    }

    return (
        <div>
            <div>{getDays((new Date(date)).getDay())}</div>
            <div className={classes.flex_row}>
                {weatherElements}
            </div>
        </div>
    )
}

export default ShowWeatherDetails 