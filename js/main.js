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
      console.log(data);
      document.getElementById("temperature").innerHTML = data.main.temp.toFixed(
        0
      );
      document.getElementById("temperature2").innerHTML = data.main.temp.toFixed(
        0
      );
      document.getElementById("wind").innerHTML = data.wind.speed;
      document.getElementById("humidity").innerHTML = data.main.humidity;
      document.getElementById("weather").innerHTML = data.weather[0].main;

      switch(data.weather[0].main) {
        case "Drizzle":
          document.getElementById("image-weather").src = "../img/weather/w/rain.svg";
          break;
        case "Clouds":
          document.getElementById("image-weather").src = "../img/weather/w/cloudy.svg";
          precipitation();
          break;
        case "Rain":
          document.getElementById("image-weather").src = "../img/weather/w/rain.svg";
          break;
        case "Snow":
          document.getElementById("image-weather").src = "../img/weather/w/snow.svg";
          break;
        case "Clear":
          document.getElementById("image-weather").src = "../img/weather/w/sun.svg";
          precipitation();
          break;
        case "Thunderstorm":
          document.getElementById("image-weather").src = "../img/weather/w/thunder.svg";
          precipitation();
          break;
        case "Mist":
          document.getElementById("image-weather").src = "../img/weather/w/cloudy.svg";
          precipitation();
          break;
        default:
          break;
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function precipitation() {
  var preci = Math.floor(Math.random() * 35) + 15;
  document.getElementById("precipitacion").innerHTML = preci;
}

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
  if (String(minutes).length < 2) {
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

main()

setInterval(main, 20000);
