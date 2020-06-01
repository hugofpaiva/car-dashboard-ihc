window.addEventListener("resize", resize);

let options = {
  linkSelector:
    'a[href^="' +
    window.location.origin +
    '"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
  debugMode: true,
  plugins: [new SwupBodyClassPlugin()],
};
var swup = new Swup(options);
var timer;

sessionStorage.setItem("pressure", JSON.stringify(false));

function init() {
  try {
    if (document.querySelector("#index")) {
      playM();
      checkPlay();
      temp();
      if (sessionStorage.getItem("Weather") != null) {
        var data = JSON.parse(sessionStorage.getItem("Weather"));
        console.log("A ir buscar à cache!");
        updateDom(data);
      } else {
        getLocation();
        timer = setInterval(checkWeather, 5000);
      }
      setInterval(getLocation, 3600000);
    }

    if (document.querySelector("#phone")) {
      initialPhone();
    }

    if (document.querySelector("#map")) {
      initAutocomplete();
    }

    if (document.querySelector("#musics-inject")) {
      music();
      playM();
      checkPlay();
      changeVolume();
    }

    if (document.querySelector("#car")) {
      var circles = [circle1, circle2];
      var perc = [0.5, 0.8];
      var count = 0;
      circles.forEach((el) => {
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
            if (el == circle1) {
              circle.setText(
                '<span style="font-weight:bold">2</span> <span class="opacity-letters">bar</span>'
              );
            } else {
              circle.setText(
                '<span style="font-weight:bold">500</span> <span class="opacity-letters">km</span>'
              );
            }
          },
        });
        bar.text.style.margin = "30% 0";
        bar.text.style.color = "white";
        bar.text.style.fontFamily = "Montserrat";
        bar.animate(perc[count]);
        count++;
      });
    }
    if (document.querySelector("#janela1")) {
      try {
        changeWindows();
      } catch {}
      try {
        changeDoors();
      } catch {}
      try {
        doorResize();
      } catch {}
    }
  } catch (error) {
    console.error(error);
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
      (err) => {
        console.log(err);
      },
      { timeout: undefined }
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

function temp() {
  document.getElementsByClassName("interior-temp")[0].innerHTML = "20ºC";
  try {
    document.getElementsByClassName("interior-temp")[1].innerHTML =
      '20<span style="font-size: x-small;">ºC</span>';
  } catch {
    console.log("Cartão do Weather não presente no ecrã!");
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

function upTime(el) {
  if (el.value[0] == 0) {
    document.getElementById("hours").innerHTML = el.value.substring(1, 5);
  } else {
    document.getElementById("hours").innerHTML = el.value;
  }
}

function upDate(el) {
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
  var date = el.valueAsDate;
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var day = date.getDay();
  var dayWeek = days[day];
  day = date.getUTCDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  document.getElementById("date").innerHTML =
    dayWeek + ", " + day + " " + month + " " + year;
}

// FUNÇÕES DE MANUTENÇÃO

function checkWeather(timer) {
  if (sessionStorage.getItem("Weather") != null) {
    clearInterval(timer);
  } else {
    getLocation();
  }
}

function main() {
  console.log("A correr o main");

  setInterval(updateTime, 20000);
  updateTime();
}

main();

window.onbeforeunload = function (e) {
  document.getElementsByClassName("content").className = "out";
};

// FUNÇÕES DE CLICKS

function openAir() {
  temp();
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

function openSettings() {
  var display = getComputedStyle(document.querySelector(".settings-modal"))
    .display;

  if (display === "flex") {
    document.getElementsByClassName("settings-modal")[0].style.display = "none";
  } else if (display === "none") {
    settingsResize();
    document.getElementsByClassName("settings-modal")[0].style.display = "flex";
  } else {
    console.log("Erro ao abrir a modal!");
  }
}

function airResize() {
  var top = document.querySelector(".content").getBoundingClientRect().top;
  document.getElementsByClassName("air-modal")[0].style.top = top + "px";

  var height = document.querySelector(".content").offsetHeight;
  document.getElementsByClassName("air-modal")[0].style.height = height + "px";

  var width = document.querySelector(".content").offsetWidth;
  document.getElementsByClassName("air-modal")[0].style.left =
    width * 0.025 +
    document.querySelector(".content").getBoundingClientRect().left +
    "px";
  document.getElementsByClassName("air-modal")[0].style.width =
    width * 0.45 + "px";
}

function resize() {
  try {
    airResize();
  } catch {}
  try {
    settingsResize();
  } catch {}
  try {
    warningResize();
  } catch {}
  try {
    doorResize();
  } catch {}
}

function settingsResize() {
  var top = document.querySelector(".content").getBoundingClientRect().top;
  document.getElementsByClassName("settings-modal")[0].style.top = top + "px";

  var height = document.querySelector(".content").offsetHeight;
  document.getElementsByClassName("settings-modal")[0].style.height =
    height + "px";

  var width = document.querySelector(".content").offsetWidth;
  document.getElementsByClassName("settings-modal")[0].style.left =
    width * 0.525 +
    document.querySelector(".content").getBoundingClientRect().left +
    "px";
  document.getElementsByClassName("settings-modal")[0].style.width =
    width * 0.45 + "px";
}

function doorResize() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );

  if (vw < 1400) {
    var top = document.querySelector(".content").getBoundingClientRect().top;

    var height = document.querySelector(".content").offsetHeight;

    document.getElementsByClassName("door-modal")[0].style.top =
      top + height * 0.02 + "px";

    var width = document.querySelector(".content").offsetWidth;
    document.getElementsByClassName("door-modal")[0].style.left =
      width * 0.4325 +
      document.querySelector(".content").getBoundingClientRect().left +
      "px";
  } else {
    var top = document.querySelector(".content").getBoundingClientRect().top;

    var height = document.querySelector(".content").offsetHeight;

    document.getElementsByClassName("door-modal")[0].style.top =
      top + height * 0.045 + "px";

    var width = document.querySelector(".content").offsetWidth;
    document.getElementsByClassName("door-modal")[0].style.left =
      width * 0.445 +
      document.querySelector(".content").getBoundingClientRect().left +
      "px";
  }
}

function warningResize() {
  var top = document.querySelector(".content").getBoundingClientRect().top;
  var height = document.querySelector(".content").offsetHeight;
  document.getElementsByClassName("warning-modal")[0].style.top =
    top + 0.15 * height + "px";

  document.getElementsByClassName("warning-modal")[0].style.height =
    height / 1.5 + "px";

  var width = document.querySelector(".content").offsetWidth;
  document.getElementsByClassName("warning-modal")[0].style.left =
    width * 0.25 +
    document.querySelector(".content").getBoundingClientRect().left +
    "px";
  document.getElementsByClassName("warning-modal")[0].style.width =
    width * 0.45 + "px";
}

function tirePressure() {
  var display = getComputedStyle(document.querySelector(".tire")).display;

  if (display === "flex") {
    document.getElementsByClassName("tire")[0].style.display = "none";
    document.getElementsByClassName("info-car")[0].style.display = "flex";
  } else if (display === "none") {
    document.getElementsByClassName("info-car")[0].style.display = "none";
    document.getElementsByClassName("tire")[0].style.display = "flex";
  } else {
    console.log("Erro ao abrir a menu!");
  }

  if (JSON.parse(sessionStorage.getItem("pressure"))) {
    var el = document.getElementById("low-pressure");
    el.style.color = "red";
    el.innerHTML = "0.6" + " <span class='opacity-letters'>bar</span>";
  }
}

function turnOnOffAir(el) {
  var text = el.innerHTML;

  if (text === "OFF") {
    el.innerHTML = "ON";
    el.style.color = "black";
    el.style.backgroundColor = "#F2F3F4";
  } else if (text === "ON") {
    el.innerHTML = "OFF";
    el.style.color = "white";
    el.style.backgroundColor = "#1B224C";
    document.getElementById("fan-air").style.opacity = "1";
    document.getElementById("autoair").style.color = "white";
    document.getElementById("autoair").style.backgroundColor = "#1B224C";
  } else {
    console.log("ERRO!");
  }
}

function turnOnOffAuto(el) {
  if (
    window.getComputedStyle(el, null).getPropertyValue("background-color") ==
    "rgb(27, 34, 76)"
  ) {
    document.getElementById("main-air-con").innerHTML = "ON";
    document.getElementById("main-air-con").style.color = "black";
    document.getElementById("main-air-con").style.backgroundColor = "#F2F3F4";
    document.getElementById("fan-air").style.opacity = "0.25";
    el.style.color = "black";
    el.style.backgroundColor = "#F2F3F4";
  } else if (
    window.getComputedStyle(el, null).getPropertyValue("background-color") ==
    "rgb(242, 243, 244)"
  ) {
    document.getElementById("fan-air").style.opacity = "1";
    el.style.color = "white";
    el.style.backgroundColor = "#1B224C";
  } else {
    console.log("ERRO!");
  }
}

function turnOnOffBackDefroster(el) {
  if (
    window.getComputedStyle(el, null).getPropertyValue("background-color") ==
    "rgb(27, 34, 76)"
  ) {
    document.getElementById("backDefrosterImg").style.filter = "brightness(0)";
    el.style.backgroundColor = "#F2F3F4";
  } else if (
    window.getComputedStyle(el, null).getPropertyValue("background-color") ==
    "rgb(242, 243, 244)"
  ) {
    document.getElementById("backDefrosterImg").style.filter = "brightness(1)";
    el.style.backgroundColor = "#1B224C";
  } else {
    console.log("ERRO!");
  }
}

function turnOnOffFrontDefroster(el) {
  if (
    window.getComputedStyle(el, null).getPropertyValue("background-color") ==
    "rgb(27, 34, 76)"
  ) {
    document.getElementById("frontDefrosterImg").style.filter = "brightness(0)";
    el.style.backgroundColor = "#F2F3F4";
  } else if (
    window.getComputedStyle(el, null).getPropertyValue("background-color") ==
    "rgb(242, 243, 244)"
  ) {
    document.getElementById("frontDefrosterImg").style.filter = "brightness(1)";
    el.style.backgroundColor = "#1B224C";
  } else {
    console.log("ERRO!");
  }
}

function plusTemp(side) {
  var temp = parseInt(document.getElementById(`${side}-temp-air`).innerHTML);
  if (temp < 30) {
    temp += 1;
    document.getElementById(`${side}-temp-air`).innerHTML = temp;
    if (side === "left") {
      document.getElementById("airtemp").innerHTML = temp + "ºC";
    }
  }
}

function minusTemp(side) {
  var temp = parseInt(document.getElementById(`${side}-temp-air`).innerHTML);
  if (temp > 16) {
    temp -= 1;
    document.getElementById(`${side}-temp-air`).innerHTML = temp;
    if (side === "left") {
      document.getElementById("airtemp").innerHTML = temp + "ºC";
    }
  }
}

function showSound() {
  document.getElementById("clock").style.display = "none";
  document.getElementById("bluetooth").style.display = "none";
  document.getElementById("system").style.display = "none";

  document.getElementById("sound").style.display = "flex";
  changeVolume();
}

function showClock() {
  document.getElementById("sound").style.display = "none";
  document.getElementById("bluetooth").style.display = "none";
  document.getElementById("system").style.display = "none";

  document.getElementById("clock").style.display = "flex";
}

function showBluetooth() {
  document.getElementById("clock").style.display = "none";
  document.getElementById("sound").style.display = "none";
  document.getElementById("system").style.display = "none";

  document.getElementById("bluetooth").style.display = "flex";

  if (JSON.parse(sessionStorage.getItem("connected"))) {
    document.getElementById("iphone-not-connected").style.display = "none";
    document.getElementById("iphone-connected").style.display = "flex";
  } else {
    document.getElementById("iphone-connected").style.display = "none";
    document.getElementById("iphone-not-connected").style.display = "flex";
  }
}

function showSystem() {
  document.getElementById("clock").style.display = "none";
  document.getElementById("sound").style.display = "none";
  document.getElementById("bluetooth").style.display = "none";

  document.getElementById("system").style.display = "flex";
}

function connect(el) {
  if (el.innerHTML === "Connected") {
    sessionStorage.setItem("connected", JSON.stringify(false));
    playing = JSON.parse(sessionStorage.getItem("actualmusic"));
    if (musicDetail.find((music) => music.name == playing.name)) {
      playing = radioDetail[0];
      sessionStorage.setItem("actualmusic", JSON.stringify(playing));
    }
    showBluetooth();
    music();
    try {
      playM();
    } catch {}
  } else if (el.innerHTML === "Connect") {
    sessionStorage.setItem("connected", JSON.stringify(true));
    showBluetooth();
  } else {
    console.log("ERROR!");
  }
  initialPhone();
}

function seatRight(el) {
  var last = el.src.split("/");
  if (last[last.length - 1] === "seat-right.png") {
    el.src = "./img/down-info/heated-seats/seat-right1.png";
  } else if (last[last.length - 1] === "seat-right1.png") {
    el.src = "./img/down-info/heated-seats/seat-right.png";
  } else {
    console.log("ERROR!");
  }
}

function seatLeft(el) {
  var last = el.src.split("/");
  if (last[last.length - 1] === "seat-left.png") {
    el.src = "./img/down-info/heated-seats/seat-left1.png";
  } else if (last[last.length - 1] === "seat-left1.png") {
    el.src = "./img/down-info/heated-seats/seat-left.png";
  } else {
    console.log("ERROR!");
  }
}

function plusFan() {
  var src = document.getElementById("fanimage").src;
  var srclist = src.split(".");
  var last =
    srclist[srclist.length - 2][srclist[srclist.length - 2].length - 1];

  if (last === "n") {
    document.getElementById("fanimage").src = "./img/down-info/air/fan.png";
  } else {
    last = parseInt(last);
    last--;
    if (last > 0) {
      document.getElementById(
        "fanimage"
      ).src = `./img/down-info/air/fan${last}.png`;
    } else {
      document.getElementById("fanimage").src = "./img/down-info/air/fan.png";
    }
  }
}

function minusFan() {
  var src = document.getElementById("fanimage").src;
  var srclist = src.split(".");
  var last =
    srclist[srclist.length - 2][srclist[srclist.length - 2].length - 1];

  if (last === "n") {
    document.getElementById("fanimage").src = "./img/down-info/air/fan1.png";
  } else {
    last = parseInt(last);
    last++;
    if (last <= 4) {
      document.getElementById(
        "fanimage"
      ).src = `./img/down-info/air/fan${last}.png`;
      if (last == 4) {
        var air = document.getElementById("main-air-con");
        if (air.innerHTML == "ON") {
          turnOnOffAir(document.getElementById("main-air-con"));
        }
      }
    } else {
      document.getElementById("fanimage").src = "./img/down-info/air/fan4.png";
    }
  }
}

sessionStorage.setItem("door1", "./img/doors/lock.svg");
sessionStorage.setItem("door2", "./img/doors/lock.svg");
sessionStorage.setItem("door3", "./img/doors/lock.svg");
sessionStorage.setItem("door4", "./img/doors/lock.svg");
sessionStorage.setItem("alldoors", "./img/doors/lock.svg");

function door(el) {
  var id = el.className;
  el = document.getElementById(id);
  var src = el.src.split("/");

  if (src[src.length - 1] === "lock.svg") {
    el.src = "./img/doors/unlock.png";
    sessionStorage.setItem(id, "./img/doors/unlock.png");
  } else if (src[src.length - 1] === "unlock.png") {
    el.src = "./img/doors/lock.svg";
    sessionStorage.setItem(id, "./img/doors/lock.svg");
  } else {
    console.log("ERROR!");
  }
}

function lockDoors(el) {
  var el = el.children[0];
  var door1 = document.getElementById("door1");
  var door2 = document.getElementById("door2");
  var door3 = document.getElementById("door3");
  var door4 = document.getElementById("door4");
  var src = el.src.split("/");

  if (src[src.length - 1] === "lock.svg") {
    door1.src = "./img/doors/unlock.png";
    door2.src = "./img/doors/unlock.png";
    door3.src = "./img/doors/unlock.png";
    door4.src = "./img/doors/unlock.png";
    el.src = "./img/doors/unlock.png";
    sessionStorage.setItem("alldoors", "./img/doors/unlock.png");
    sessionStorage.setItem("door1", "./img/doors/unlock.png");
    sessionStorage.setItem("door2", "./img/doors/unlock.png");
    sessionStorage.setItem("door3", "./img/doors/unlock.png");
    sessionStorage.setItem("door4", "./img/doors/unlock.png");
  } else if (src[src.length - 1] === "unlock.png") {
    door1.src = "./img/doors/lock.svg";
    door2.src = "./img/doors/lock.svg";
    door3.src = "./img/doors/lock.svg";
    door4.src = "./img/doors/lock.svg";
    el.src = "./img/doors/lock.svg";
    sessionStorage.setItem("alldoors", "./img/doors/lock.svg");
    sessionStorage.setItem("door1", "./img/doors/lock.svg");
    sessionStorage.setItem("door2", "./img/doors/lock.svg");
    sessionStorage.setItem("door3", "./img/doors/lock.svg");
    sessionStorage.setItem("door4", "./img/doors/lock.svg");
  } else {
    console.log("ERROR!");
  }
}

function changeDoors() {
  document.getElementById("door1").src = sessionStorage.getItem("door1");
  document.getElementById("door2").src = sessionStorage.getItem("door2");
  document.getElementById("door3").src = sessionStorage.getItem("door3");
  document.getElementById("door4").src = sessionStorage.getItem("door4");

  document.getElementById("door9").src = sessionStorage.getItem("alldoors");
}

function changePage(el) {
  var list = document.getElementsByClassName("menu");
  for (i = 0; i < list.length; i++) {
    changee(list[i]);
  }
  el.style.textDecoration = "underline";
}
function changee(el) {
  el.style.textDecoration = "none";
}

function showWarning(text) {
  document.getElementsByClassName("warning-modal")[0].style.display = "flex";
  warningResize();
  document.getElementById("text-warning").innerHTML = text;
}

sessionStorage.setItem("janela1", "100");
sessionStorage.setItem("janela2", "100");
sessionStorage.setItem("janela3", "100");
sessionStorage.setItem("janela4", "100");

function windows(el) {
  sessionStorage.setItem(el.id, el.value);
  changeWindows();
}

function changeWindows() {
  document.getElementById("janela1").value = sessionStorage.getItem("janela1");
  document.getElementById("janela2").value = sessionStorage.getItem("janela2");
  document.getElementById("janela3").value = sessionStorage.getItem("janela3");
  document.getElementById("janela4").value = sessionStorage.getItem("janela4");
}

function warningPressure() {
  sessionStorage.setItem("pressure", JSON.stringify(true));
  showWarning(
    "WARNING:\n Driver's tire pressure outside the recommended limits"
  );
}

function okWarning() {
  document.getElementsByClassName("warning-modal")[0].style.display = "none";
  if (!JSON.parse(sessionStorage.getItem("connected"))) {
    openSettings();
  }
}
