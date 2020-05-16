// FUNÇÕES DE TEMPO
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
      document.getElementById("temperature").innerHTML = data.main.temp.toFixed(
        0
      );
    })
    .catch(function (err) {
      console.error(err);
    });
}

getLocation();

// HORAS

function updateTime() {
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
  var date = new Date();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var day = date.getDay();
  var dayWeek = days[day];
  day = date.getUTCDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }

  document.getElementById("hours").innerHTML = hour + ":" + minutes;
  document.getElementById("date").innerHTML =
    dayWeek + ", " + day + " " + month + " " + year;
}

// FUNÇÕES DE MANUTENÇÃO

function main(){
    getLocation();
    updateTime();
}

setInterval(main(), 10000);
