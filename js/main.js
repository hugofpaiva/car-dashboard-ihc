console.log("ENTREI MAIN!");
let options = {
  linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
  debugMode: true,
  plugins: [new SwupBodyClassPlugin()],
};
var swup = new Swup(options);

function init() {
  if (document.querySelector("#index")) {
    getLocation();
  }

  if (document.querySelector("#phone")) {
    var recentcalls = [
      ["./img/pedro.jpeg", "Pedro<br>today"],
      ["./img/fabiana.jpeg", "Fabiana<br>yesterday"],
      ["./img/alberto.jpeg", "Alberto<br>yesterday"],
      ["./img/alfredo.jpeg", "Alfredo<br>yesterday"],
    ];

    for (i = 0; i < 4; i++) {
      document.getElementById("desc" + i).innerHTML = recentcalls[i][1];
      document.getElementById("im" + i).src = recentcalls[i][0];
    }
  }

  if (document.querySelector("#map")) {
    initAutocomplete();
  }

  if (document.querySelector("#car")) {
    var circles = [circle1, circle2];
    var perc = [0.5, 0.8];
    var count = 0;

    circles.forEach((el) => {
      console.log(el);
      var bar = new ProgressBar.Circle(el, {
        color: "#58C2F7",
        trailColor: "#fff",
        trailWidth: 8,
        duration: 1400,
        easing: "easeOut",
        strokeWidth: 8,
        from: { color: "#58C2F7", a: 0 },
        to: { color: "#58C2F7", a: 1 },
        // Set default step function for all animate calls
        step: function (state, circle) {
          circle.path.setAttribute("stroke", state.color);
        },
      });

      bar.animate(perc[count]);
      count++;
    }); // Number from 0.0 to 1.0
  }
}


// this event runs for every page view after initial load
swup.on("contentReplaced", init);
init();

// FUNÇÕES DE TEMPO
// get location
function getLocation() {
  console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Geolocalização");
        getWeather(position.coords.latitude, position.coords.longitude);
      },
      () => {},
      { timeout: 1000 }
    );
  } else if (sessionStorage.getItem("Weather") != null) {
    var data = JSON.parse(sessionStorage.getItem("Weather"));
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
        sessionStorage.setItem("Weather", JSON.stringify(data));
      } else if (sessionStorage.getItem("Weather") != null) {
        data = JSON.parse(sessionStorage.getItem("Weather"));
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
      document.getElementById("image-weather").src = "./img/weather/w/rain.svg";
      precipitation(50, 15);
      break;
    case "Clouds":
      document.getElementById("image-weather").src =
        "./img/weather/w/cloudy.svg";
      precipitation(20, 0);
      break;
    case "Rain":
      document.getElementById("image-weather").src = "./img/weather/w/rain.svg";
      precipitation(50, 50);
      break;
    case "Snow":
      document.getElementById("image-weather").src = "./img/weather/w/snow.svg";
      precipitation(20, 0);
      break;
    case "Clear":
      document.getElementById("image-weather").src = "./img/weather/w/sun.svg";
      precipitation(10, 0);
      break;
    case "Thunderstorm":
      document.getElementById("image-weather").src =
        "./img/weather/w/thunder.svg";
      precipitation(50, 50);
      break;
    case "Mist":
      document.getElementById("image-weather").src =
        "./img/weather/w/cloudy.svg";
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

function checkWeather(timer) {
  if (sessionStorage.getItem("Weather") != null) {
    clearInterval(timer);
  }
}

function main() {
  console.log("A correr o main");

  setInterval(updateTime, 20000);
  updateTime();

  if (sessionStorage.getItem("Weather") != null) {
    getLocation();
  } else {
    getLocation();
    var timer = setInterval(checkWeather, 5000);
  }
  setInterval(getLocation, 3600000);
}

main();

window.onbeforeunload = function (e) {
  document.getElementsByClassName("content").className = "out";
};

// FUNÇÕES DE CLICKS

function openAir() {
  var display = getComputedStyle(document.querySelector(".air-modal")).display;

  if (display === "flex") {
    document.getElementsByClassName("air-modal")[0].style.display = "none";
  } else if (display === "none") {
    airResize();
    document.getElementsByClassName("air-modal")[0].style.display = "flex";
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
