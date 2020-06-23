const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=7923f770a7bcf03e491e9d64c3767d44&query=${latitude},${longitude}`
    request (
        {url,
        json: true},
        (error, { body })=>{
            if (error){
                callback('Unable to connect to the weather service!',undefined);
            }
            else if(body.success === false){
                callback('Unable to find location',undefined);
            } 
            else {
                const data = body.current;
                callback(undefined, `The current temperature is ${data.temperature}. It feels like ${data.feelslike}. ${data.weather_descriptions[0]}. The humidity is ${data.humidity}%`)
                }
        }
    )
}
module.exports = forecast;