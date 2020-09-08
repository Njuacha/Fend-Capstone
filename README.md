# Travel Planner 
This is a travel planning website. When you enter a planned date to travel and the destination to travel and submit then photos of the location are displayed together with some weather forcast.
In this project I learned things like:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls
- Using javascript ES6 syntax

## Getting Started
Fork this repo, clone the repo down to your computer.

### Prerequisites
The project uses 3 API's Geonames api, weatherbit api and Pixabay. So you need:
- a username from [Geonames](http://www.geonames.org/export/web-services.html)
- an api key from [Weatherbit](https://www.weatherbit.io/account/create)
- an api key from [Pixabay](https://pixabay.com/api/docs/)

After geting these values you should create a .env file in the root directory of the project and it should contain these three varaibles with the following names for consistency with the project code:
```
WEATHER_API_KEY = "your_weatherbit_api_key"
PIXA_BAY_API_kEY = "your_pixabay_api_key"
GEO_API_USERNAME = "your_geoname_api_username"
```
To run the project you should have node and npm installed.

### Installing
cd into the folder where you clone the repo and run:
- ``` npm install ``` to install all the project dependencies.
- ``` npm start  ``` to start the express server
- the server runs on port 8081
- In another command prompt window(or terminal) run either of the webpack scripts below. 
- ``` npm run build-dev  ``` to build the project with webpack for debug mode and to start the webpack server which enables the website to reload each time the changes in the code is saved. 
- ``` npm run build-prod  ``` to build the project with webpack for production mode.

## Acknowledgment
- I thank the Almighty God.
- I would like to thank Udacity team for the good job building and coordinating the Frontend developer nanodegree course. 
