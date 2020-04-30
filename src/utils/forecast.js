const request = require('request');

const forecast = (lat,long,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d1271b2b03f130f532abdce75be6e05e&query='+ lat +','+ long +'&units=m';
    request({ url,json:true }, (error,{ body }) => {
        
        if (error) {
            callback('Unbale to connect to weather services due to internet connection interrupted!',undefined);
        }
        else if (body.error) {
            callback('Unbale to find the location. Try another search.',undefined);
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]} . It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike} degrees out.`);

        }
    })
}

module.exports=forecast