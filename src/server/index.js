// used to hide api keys appearing ongithub
const dotenv = require('dotenv');
dotenv.config();


const weatherbitApiKey = process.env.WEATHER_API_KEY;
const pixabayApiKey = process.env.PIXA_BAY_API_KEY;
const geonameUserName = process.env.GEO_API_USERNAME;

const fetch = require('node-fetch');

const express = require('express');

const app = express();
// Configure express to use body-parser as middle-ware
const bodyParser = require('./../../node_modules/body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('./../../node_modules/cors');
app.use(cors());

app.use(express.static('dist'));

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
})

app.post('/getResults', function (req, res) {
  const place = req.body.place;
  const date = req.body.date;
  const daysToTravelDate = req.body.daysToTravelDate;

  // get lat, long and country
  getLongAndLatFromGeoNamesApi(place)
  .then((longLatCountry) =>
    getPicturesOfPlace(place, longLatCountry.country)
    .then((pictures) => {

        if (daysToTravelDate < 5) {
           getHourlyWeatherForcast(longLatCountry).then((weatherForcast) =>
               res.send({weatherForcast: weatherForcast, pictures: pictures})
           )
        } else if (daysToTravelDate >= 5 && daysToTravelDate < 16) {
           getDailyWeatherForcast(longLatCountry).then((weatherForcast) =>
               res.send({weatherForcast: weatherForcast, pictures: pictures})
           )
        } else {
          res.send({pictures: pictures});
        }

    })
  )

})

app.listen(8081, function () {
  console.log('app listening on port 8081 !');
})



const getDataFromUrl = async (url = '', data = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  }catch(error) {
    console.log('error', error);
  }
}

const getLongAndLatFromGeoNamesApi = async (place) => {
  const url = 'http://api.geonames.org/searchJSON?q='+place+'&maxRows=1&username='+geonameUserName;
  const data = await getDataFromUrl(url, {});
  const geonames = data.geonames[0];
  const longitude = geonames.lng;
  const latitude = geonames.lat;
  const country = geonames.countryName;
  console.log(country);
  const longLatCountry = {longitude: longitude, latitude: latitude, country: country};
  return longLatCountry;
}

const getHourlyWeatherForcast = async (longLatCountry) => {
  const url = 'http://api.weatherbit.io/v2.0/forecast/hourly?lat='+longLatCountry.latitude+'&lon='+longLatCountry.longitude+'&key='+weatherbitApiKey;
  const data = await getDataFromUrl(url, {});
  
  const weatherForcast = [];

  for (const weatherData of data.data) {
    const temp = weatherData.temp;
    const dateTime = weatherData.datetime;
    const weatherDescription = weatherData.weather.description;
    const tempDateTimeWeatherDescription = {temp: temp, dateTime: dateTime, weatherDescription: weatherDescription};
    weatherForcast.push(tempDateTimeWeatherDescription);
  }

  return weatherForcast;
}

const getDailyWeatherForcast = async (longLatCountry) => {
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily?lat='+longLatCountry.latitude+'&lon='+longLatCountry.longitude+'&key='+weatherbitApiKey;
  const data = await getDataFromUrl(url, {});
  const weatherForcast = [];

  for (const weatherData of data.data) {
    const temp = weatherData.temp;
    const dateTime = weatherData.datetime;
    const weatherDescription = weatherData.weather.description;
    const tempDateTimeWeatherDescription = {temp: temp, dateTime: dateTime, weatherDescription: weatherDescription};
    weatherForcast.push(tempDateTimeWeatherDescription);
  }

  return weatherForcast;
}

const getPicturesOfPlace = async (place, countryName) => {

   const url = 'https://pixabay.com/api/?key='+pixabayApiKey+'&q=' + place + '&image_type=photo';
   const data = await getDataFromUrl(url, {});
   const pictures = [];

   for (const hit of data.hits) {
     const largeImageURL = hit.largeImageURL;
     pictures.push(largeImageURL);
   }

   // if the there are no pictures for the place then try a wider search by searching for pictures from the country
   if (pictures.length == 0) {
     const url2 = 'https://pixabay.com/api/?key='+pixabayApiKey+'&q=' + countryName + '&image_type=photo';
     const data2 = await getDataFromUrl(url2, {});

     for (const hit of data2.hits) {
       const largeImageURL = hit.largeImageURL;
       pictures.push(largeImageURL);
     }
   }

   return pictures;
}

module.exports = {
   getLongAndLatFromGeoNamesApi
}
