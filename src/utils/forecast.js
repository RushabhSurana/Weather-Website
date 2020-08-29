const request = require('postman-request');

const forecast = (lat, long, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=bb3888cb9c6f440b6204565d35bd2df9&query=' +
    lat +
    ',' +
    long +
    '';
  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Could not connect to the weather service!', undefined);
    } else if (body.error) {
      callback('Unable to connect to the weather API', undefined);
    } else {
      callback(undefined,body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. But it feels like ' + body.current.feelslike + '.')
       
        // location: response.body.location.name,
        // description: response.body.current.weather_descriptions[0],
        // current_temp: response.body.current.temperature,
        // feels_like: response.body.current.feelslike,
       
      
    }
  });
};

module.exports = forecast;
