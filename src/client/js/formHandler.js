let date;
let timerId;

const handleSubmit = (event) => {
  event.preventDefault();

  const place = document.getElementById('destination').value;
  date = document.getElementById('date').valueAsDate;


  // check if place input valid
  if(Client.isInputEmpty(place)) {
    alert('please enter a destination before submitting');
    return;
  }
  // check if date input is null
  if(Client.isInputNull(date)) {
    alert('please enter a date before submitting');
    return;
  }

  if(Client.isDateEarlierThanToday(date)) {
    alert('The date entered has already passed')
    return;
  }

  let daysToTravelDate = numberOfDaysToTravelDate(date);

  postData('http://localhost:8081/getResults', {place: place, date: date, daysToTravelDate: daysToTravelDate })
    .then((newData)  =>
      updateUI(newData)
  )

}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  form.addEventListener('submit', handleSubmit);
});


const numberOfDaysToTravelDate = (travelDate) => {
  let travelDay = travelDate.getDate();
  let today = (new Date()).getDate();
  return  travelDay - today ;
}

const postData = async (url = '', data = {}) => {
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

const updateUI = (newData) => {

   const pictures = newData.pictures;
   const weatherForcast = newData.weatherForcast;

   displayPictures(pictures);
   displayWeatherForcast(weatherForcast);
   setCountDown(date);
}

const displayPictures = (pictures) => {
  document.querySelector('.pictures-container').textContent = '';
  let picturesFragment = document.createDocumentFragment();

  for (const pictureUrl of pictures){

    let pictureWrapper = document.createElement('div');
    pictureWrapper.innerHTML = `<div class="picture-wrapper"><img src="${pictureUrl}"></div>`;
    picturesFragment.appendChild(pictureWrapper);
  }

  document.querySelector('.pictures-container').appendChild(picturesFragment);
}

const displayWeatherForcast = (weatherForcast) => {
  document.querySelector('#temperature-forcast').textContent = '';

  let temperatureTableFragment = document.createDocumentFragment();

  let weatherHeading = document.createElement('tr');
  weatherHeading.innerHTML = `<th>Temperature</th>
                   <th>DateTime</th>
                   <th>Weather Description</th>`;

  temperatureTableFragment.appendChild(weatherHeading);

  for(const weather of weatherForcast) {
    const temp = weather.temp;
    const dateTime = weather.dateTime;
    const weatherDescription = weather.weatherDescription;
    let weatherRow = document.createElement('tr');
    weatherRow.innerHTML = `<td>${temp}</td><td>${dateTime}</td><td>${weatherDescription}</td>`;
    temperatureTableFragment.appendChild(weatherRow);
  }

  document.querySelector('#temperature-forcast').appendChild(temperatureTableFragment);
}

const setCountDown = (travelDay) => {
  if(timerId) {
    clearInterval(timerId);
  }
  var deadline = travelDay.getTime();

  timerId = setInterval(function() {

  var now = new Date().getTime();
  var t = deadline - now;
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  var hours = Math.floor((t%(1000 * 60 * 60 * 24))/(1000 * 60 * 60));
  var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((t % (1000 * 60)) / 1000);
  document.getElementById("day").innerHTML =days ;
  document.getElementById("hour").innerHTML =hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML =seconds;
  if (t < 0) {
          clearInterval(timerId);
          document.getElementById("demo").innerHTML = "TIME UP";
          document.getElementById("day").innerHTML ='0';
          document.getElementById("hour").innerHTML ='0';
          document.getElementById("minute").innerHTML ='0' ;
          document.getElementById("second").innerHTML = '0'; }
  }, 1000);
}

export {
  handleSubmit,
  numberOfDaysToTravelDate
}
