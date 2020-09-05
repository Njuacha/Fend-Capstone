

function handleSubmit(event) {
  event.preventDefault();

  const place = document.getElementById('destination').value;

  let date = document.getElementById('date').valueAsDate;

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
   // let travelDate = new Date(newData.date);
   // let temperatureTableFragment = document.createDocumentFragment();
   //
   // for(let i=0; i < 5; i++) {
   //   const temp = data.data[i].temp;
   //   const weatherDescription = data.data[i].weather.description;
   //   let weatherRow = document.createElement('tr');
   //   weatherRow.innerHTML = `<td>${temp}</td><td>${weatherDescription}</td>`;
   //   temperatureTableFragment.appendChild(weatherRow);
   // }

   // const length = data.hits.length;
   // let picturesFragment = document.createDocumentFragment();
   // if(length >= 4) {
   //
   //   for (let i=0; i<4; i++){
   //     // get image src url
   //     const largeImageURL = data.hits[i].largeImageURL;
   //     let pictureWrapper = document.createElement('div');
   //     pictureWrapper.innerHTML = `<div class="picture-wrapper"><img src="${largeImageURL}"></div>`;
   //     picturesFragment.appendChild(pictureWrapper);
   //   }
   //
   //   document.querySelector('.pictures-container').appendChild(picturesFragment);
   //
   // }


   //
   // document.querySelector('#temperature-forcast').appendChild(temperatureTableFragment);
   // setCountDown(newData.date);
}


function setCountDown(travelDay) {
  var deadline = travelDay.getTime();

  var x = setInterval(function() {

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
          clearInterval(x);
          document.getElementById("demo").innerHTML = "TIME UP";
          document.getElementById("day").innerHTML ='0';
          document.getElementById("hour").innerHTML ='0';
          document.getElementById("minute").innerHTML ='0' ;
          document.getElementById("second").innerHTML = '0'; }
  }, 1000);
}

export {
  handleSubmit
}
