var date = new Date();
var hour = date.getHours();
var minutes = date.getMinutes();
if (minutes.length < 2) {
  minutes = "0" + minutes;
}

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var day = date.getDay();
var dayWeek = days[date.getDay()];
var month = months[date.getMonth()];
var year = date.getFullYear();

document.getElementById("hours").innerHTML = hour + ":" + minutes;
document.getElementById("date").innerHTML =
  dayWeek + ", " + day + " " + month + " " + year;

// get location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    loc.innerHTML = "Geolocation is not supported by this browser.";
  }
}

// get weather data according to the location
function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data.name, data.weather, data.main.temp);    
    })
    .catch(function (err) {
      console.error(err);
    });
}
