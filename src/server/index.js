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


  if (daysToTravelDate < 16) {

    getLongAndLatFromGeoNamesApi(place)
    .then((longAndLat) => {

      if (daysToTravelDate < 5) {
         getHourlyWeatherForcast(longAndLat).then((weather) =>

             getPicturesOfPlace(place).then((pictures) => {
               const weatherAndPictures = {weather: weather, pictures: pictures};

             })

         )
      } else {
         getDailyWeatherForcast(longAndLat).then((weather) =>

             getPicturesOfPlace(place).then((pictures) => {
               const weatherAndPictures = {weather: weather, pictures: pictures};

             })

         )
      }

      // Todo get the picture array and then combine with weather data array and send.

     }
    )

  } else {

    // Todo get the picture array and send.

  }



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
  const longAndLat = {longitude: longitude, latitude: latitude};
  return longAndLat;
}

const getHourlyWeatherForcast = async (longAndLat) => {
  const url = 'http://api.weatherbit.io/v2.0/forecast/hourly?lat='+longAndLat.latitude+'&lon='+longAndLat.longitude+'&key='+weatherbitApiKey;
  const data = await getDataFromUrl(url, {});
  const weather = [];

  for (const weatherData of data.data) {
    const temp = weatherData.temp;
    const weatherDescription = weatherData.weather.description;
    const tempAndWeatherDescription = {temp: temp, weatherDescription: weatherDescription};
    weather.push(tempAndWeatherDescription);
  }

  return {weather: weather};
}

const getDailyWeatherForcast = async (longAndLat) => {
  const url = 'http://api.weatherbit.io/v2.0/forecast/daily?lat='+longAndLat.latitude+'&lon='+longAndLat.longitude+'&key='+weatherbitApiKey;
  const data = await getDataFromUrl(url, {});
  const weather = [];

  for (const weatherData of data.data) {
    const temp = weatherData.temp;
    const weatherDescription = weatherData.weather.description;
    const tempAndWeatherDescription = {temp: temp, weatherDescription: weatherDescription};
    weather.push(tempAndWeatherDescription);
  }

  return {weather: weather};
}

const getPicturesOfPlace = async (place) => {
   const url = 'https://pixabay.com/api/?key=18082897-3502e121f4a3ed107776e8105&q=' + place + '&image_type=photo';
   const data = await getDataFromUrl(url, {});
   const pictures = [];

   for (const hit of data.hits) {
     const largeImageURL = hit.largeImageURL;
     pictures.push(largeImageURL);
   }

   return {pictures: pictures};
}
