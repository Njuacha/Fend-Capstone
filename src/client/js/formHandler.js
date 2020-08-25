function handleSubmit(event) {
  event.preventDefault();

  const place = document.getElementById('destination').value;
  console.log('destination: '+place);
  const url = 'http://api.geonames.org/searchJSON?q='+place+'&maxRows=1&username=Njuacha';
  const date = document.getElementById('date').valueAsDate;
  setCountDown(date);
  
  fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
    const geonames = data.geonames[0];
    const countryName = geonames.countryName;
    const longitude = geonames.lng;
    const latitude = geonames.lat;

    console.log('countryName: '+countryName);
    console.log('longitude: '+longitude);
    console.log('latitude: '+latitude);

  })
  .catch(function(error) {
    console.log('Error'+error);
  })
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
