// FUNÇÕES DE TEMPO
// get location
function getLocation() {
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("Geolocalização")
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else if (localStorage.getItem("Weather") != null) {
    var data = JSON.parse(localStorage.getItem("Weather"));
    console.log("A ir buscar à cache!");
    updateDom(data);
  }
}

// get weather data according to the location
function getWeather(lat, long) {
  const root = "https://fcc-weather-api.glitch.me/api/current?";
  fetch(`${root}lat=${lat}&lon=${long}`, { method: "get" })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (data.name != "Shuzenji") {
        updateDom(data);
        localStorage.setItem("Weather", JSON.stringify(data));
      } else if (localStorage.getItem("Weather") != null) {
        data = JSON.parse(localStorage.getItem("Weather"));
        console.log("A ir buscar à cache!");
        updateDom(data);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}

function updateDom(data) {
  document.getElementById("temperature").innerHTML = data.main.temp.toFixed(0);
  document.getElementById("temperature2").innerHTML = data.main.temp.toFixed(0);
  document.getElementById("wind").innerHTML = data.wind.speed;
  document.getElementById("humidity").innerHTML = data.main.humidity;
  document.getElementById("weather").innerHTML = data.weather[0].main;

  switch (data.weather[0].main) {
    case "Drizzle":
      document.getElementById("image-weather").src =
        "../img/weather/w/rain.svg";
      precipitation(50, 15);
      break;
    case "Clouds":
      document.getElementById("image-weather").src =
        "../img/weather/w/cloudy.svg";
      precipitation(20, 0);
      break;
    case "Rain":
      document.getElementById("image-weather").src =
        "../img/weather/w/rain.svg";
      precipitation(50, 50);
      break;
    case "Snow":
      document.getElementById("image-weather").src =
        "../img/weather/w/snow.svg";
      precipitation(20, 0);
      break;
    case "Clear":
      document.getElementById("image-weather").src = "../img/weather/w/sun.svg";
      precipitation(10, 0);
      break;
    case "Thunderstorm":
      document.getElementById("image-weather").src =
        "../img/weather/w/thunder.svg";
      precipitation(50, 50);
      break;
    case "Mist":
      document.getElementById("image-weather").src =
        "../img/weather/w/cloudy.svg";
      precipitation(35, 15);
      break;
    default:
      break;
  }
}

function precipitation(top, down) {
  var preci = Math.floor(Math.random() * top) + down;
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

function main() {
  console.log("A correr o main")
  getLocation();
  updateTime();
}

main();

setInterval(main, 20000);

// FUNÇÕES DE CLICKS

function openAir() {
  var display = getComputedStyle(document.querySelector(".air-modal")).display;

  if (display === "block") {
    airResize();
    document.getElementsByClassName("air-modal")[0].style.display = "none";
  } else if (display === "none") {
    airResize();
    document.getElementsByClassName("air-modal")[0].style.display = "inline";
  } else {
    console.log("Erro ao abrir a modal!");
  }
}

function airResize() {
  var top = document.querySelector(".content").getBoundingClientRect().top;
  document.getElementsByClassName("air-modal")[0].style.top = top + "px";

  var heigth = document.querySelector(".content").offsetHeight;
  document.getElementsByClassName("air-modal")[0].style.height = heigth + "px";

  var width = document.querySelector(".content").offsetWidth;
  document.getElementsByClassName("air-modal")[0].style.left =
    width * 0.01 +
    document.querySelector(".content").getBoundingClientRect().left +
    "px";
  document.getElementsByClassName("air-modal")[0].style.width =
    width * 0.5 + "px";
}
