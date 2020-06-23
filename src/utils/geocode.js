const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibmFuZGluaWRldmkiLCJhIjoiY2tibHZ0OGtmMHVvdTJxczRpYWxmbzZ4dCJ9.t0o2Zy0YAfwryFLoCDsSlw&limit=1`
    request ({
        url, 
        json: true
    }, (error, { body })=>{
        if (error){
            callback('Unable to retrive the site',undefined)
        }
        else if (body.features.length === 0){
            callback('Provide valid search',undefined)
        }
        else {     
        const data = body.features;
        const latitude = data[0].center[1];
        const longitude = data[0].center[0];
        const location = data[0].place_name;
        console.log(location)
        callback(undefined, {
            latitude, 
            longitude,
            location
        })
        }
    })
}


module.exports = geocode;