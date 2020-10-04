import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//css
import classes from './Weather.module.css';
//media
import Clouds  from '../assets/Clouds.webp';


const Weather = () => {

    const [fiveDaysWeather, setFiveDaysWeather] = useState();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function(position) {
            let apiKey = '1bcc0795a92755240a52a51d802d234f';
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let daysWiseData = [];
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then(response => {
                return response.json()
            }).then(responseData => {
                console.log(responseData)
                let temp = '';
                let count = 0;
                responseData.list.map((item,index) => {
                    if(temp == '' || (new Date(item.dt_txt).getDate() !== temp && count < 5 )) {
                        temp = new Date(item.dt_txt).getDate();
                        daysWiseData.push(item)
                        count ++;
                    }
                })
                setFiveDaysWeather(() => daysWiseData)
            });
        });
    },[]) 
    // Dummy data 
    let weatherElements = (
        <div className={classes.flex_row}>
        <div className={classes.flex}>
                <img  src={Clouds} alt="weather_image"/>
                <div>
                    <span>Heigh &nbsp;</span>
                    <span>Low</span>
                </div>
            </div>
            <div className={classes.flex}>
                <img  src={Clouds} alt="weather_image"/>
                <div>
                    <span>Heigh &nbsp;</span>
                    <span>Low</span>
                </div>
            </div>
            <div className={classes.flex}>
                <img  src={Clouds} alt="weather_image"/>
                <div>
                    <span>Heigh &nbsp;</span>
                    <span>Low</span>
                </div>
            </div>
        </div>
    );

    let card = [classes.flex, classes.card];

    if(fiveDaysWeather) {
        weatherElements =  (
            fiveDaysWeather.map((item,index) => (   
            <Link to={{pathname: "/show/"+item.dt_txt}} className={classes.linkStyle} key={index}>
                <div className={card.join(" ")}> 
                    <span>{(new Date(item.dt_txt)+"").substr(0,3)}</span>
                    <img src={require("../assets/"+item.weather[0].main+".webp")} alt={item.weather[0].main}/>
                    <div>
                        <span><b>{Math.floor(item.main.temp_min - 273.15)}<span>&#176;</span></b>&nbsp;</span>
                        <span>{Math.floor(item.main.temp_max - 273.15)}<span>&#176;</span> &nbsp;</span>
                    </div>
                </div>
            </Link>
            ))
        )
    }
    

    return (
        <div className={classes.flex_row}>
            {weatherElements}
        </div>
    )
}

export default Weather 